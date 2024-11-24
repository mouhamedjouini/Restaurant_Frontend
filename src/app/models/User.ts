import { Role } from "./Role";

export class User{
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    adresse?: string;
    enabled?: boolean; 

    roles?: Role[];  
}