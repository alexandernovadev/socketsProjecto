export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  online: boolean;
  id?: string; // Este campo lo añadimos luego de la conversión en toJSON
}
