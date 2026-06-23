import type { Rol } from "./Rol";

export interface IUser {
  id:number;
  nombre:string;
  apellido:string;
  email: string;
  celular:string;
  rol:Rol;
  loggedIn?: boolean;//opcional
}