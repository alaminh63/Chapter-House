import { FilterQuery, Query, Document } from 'mongoose';

class QueryBuilder<T extends Document> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj: Record<string, unknown> = { ...this.query };

    // Convert inStock to boolean if it's a string
    if (typeof queryObj.inStock === 'string') {
      if (queryObj.inStock.toLowerCase() === 'true') {
        queryObj.inStock = true;
      } else if (queryObj.inStock.toLowerCase() === 'false') {
        queryObj.inStock = false;
      } else {
        delete queryObj.inStock; // Remove invalid boolean values
      }
    }

    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filters: FilterQuery<T> = {}; // Explicitly type 'filters'

    for (const key in queryObj) {
      if (queryObj.hasOwnProperty(key)) {
        filters[key] = queryObj[key] as any; // Add other filters
      }
    }

    // Price range filtering
    const minPrice = this.query.minPrice as string;
    const maxPrice = this.query.maxPrice as string;

    if (minPrice !== undefined || maxPrice !== undefined) {
      filters['price'] = {
        ...(minPrice !== undefined && { $gte: Number(minPrice) }),
        ...(maxPrice !== undefined && { $lte: Number(maxPrice) }),
      } as any;
    }

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    // Use Book.countDocuments instead of this.modelQuery.model.countDocuments
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
