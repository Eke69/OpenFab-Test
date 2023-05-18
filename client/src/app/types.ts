export interface Product {
    id: string;
    name: string;
    description: string;
    price: number | string;
}

export type ProductForm = Omit<Product, 'id'>;

export class User {
    id!:string;
    email!:string;
    name!:string;
    token!:string;
    isAdmin!:boolean;
}

export interface UserLogInData {
    email: string;
    password: string;
}

export interface UserSignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}