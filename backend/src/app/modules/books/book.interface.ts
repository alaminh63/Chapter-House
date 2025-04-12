import { Types } from 'mongoose';

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  category: 'Fiction' | 'Non-Fiction' | 'Science' | 'Biography' | 'History';
  price: number;
  available: boolean;
  img?: string;
  description: string;
  quantity: number;
  isDeleted?: boolean;
}
