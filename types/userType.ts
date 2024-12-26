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

export interface IActivationToken {
    token: string;
    activationCode: string;
}
  
export interface IRegistrationBody {
    email: string;
    password: string;
    fullName: string;
    username: string;
  }