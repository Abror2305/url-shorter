import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
