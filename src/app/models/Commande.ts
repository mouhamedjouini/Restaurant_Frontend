import { Menu } from "./Menu";
import { User } from "./User";
export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    // Add other status values as per your application requirements
  }
export class Commande {
    id?: number;
    date?: Date;
    status?: Status;
   // payments?: Payment[];
   userId?: number;
    menuId?: number;
  }