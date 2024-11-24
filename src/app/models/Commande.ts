import { Menu } from "./Menu";
import { User } from "./User";
export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    PROCESSING = 'PROCESSING',
    

  }
export class Commande {
    id?: number;
    date?: Date;
    status?: Status;
    userName?: string;
    menuName?: string;
    menuPrice?: number;
   userId?: number;
   livreurId?:number
    menuId?: number;
    livreurName?:string
  }