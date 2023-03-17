import { User } from "./User";

export class UserListResponse{
    status:number | undefined;
    message:string | undefined;
    data:User[] | undefined;
}