import mongoose, { Types } from 'mongoose';

import { IBook } from './book.interface';
const bookSchema = new mongoose.Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'A book must have a title!'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'A book must have an author!'],
      ref: 'Author',
    },
    category: {
      type: String,
      enum: {
        values: ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'History'],
        message: '{VALUE} is not a valid category!',
      },
      required: [true, 'A book must have a category!'],
    },
    price: {
      type: Number,
      required: [true, 'A book must have a price!'],
      min: [0, 'Price must be a positive number!'],
    },
    available: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      required: [true, 'A book must have an image!'],
    },
    description: {
      type: String,
      required: [true, 'A book must have a description!'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'A book must have a quantity!'],
      min: [0, 'Quantity cannot be negative!'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.isDeleted; // Remove `isDeleted` from JSON output
      },
    },
  },
);

// Pre-save middleware to update availability based on quantity
bookSchema.pre('save', function (next) {
  this.available = this.quantity > 0;
  next();
});

// Pre-find middleware to filter out deleted books
bookSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: false });
  next();
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
