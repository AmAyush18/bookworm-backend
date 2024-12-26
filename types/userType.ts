import { UserRole, Transaction } from "./";

export interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    username?: string;
    phoneNumber?: string;
    accessToken?: string;
    refreshToken?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    Transactions?: Transaction[]; 
  }