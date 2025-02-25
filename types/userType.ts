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

export interface IActivationRequest {
    activation_token: string;
    activation_code: string;
}

export interface IRegistrationBody {
    email: string;
    password: string;
    fullName: string;
    username: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IUpdateUserInfo {
    fullName: string;
    username?: string;
    phoneNumber?: string;
}