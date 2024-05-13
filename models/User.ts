import { ApiModel } from "./ApiModel";

export interface User extends ApiModel {
  name: string;
  email: string;
  role: string;
}
