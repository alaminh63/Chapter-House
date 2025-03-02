import { Types } from 'mongoose';

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  author: Types.ObjectId;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  price: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  img?: string;
  description: string;
  quantity: number;
  model: string;
}
