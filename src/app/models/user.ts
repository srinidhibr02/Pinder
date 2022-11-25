export interface User {
    userEmail: string;
    emailVerified?:boolean;
    userPhone: string;
    phoneVerified?:boolean;
    password:string;
    createdAt?: number;
}