export interface User {
    email: string;
    emailVerified?:boolean;
    phone: string;
    phoneVerified?:boolean;
    password:string;
    createdAt?: Date;
}