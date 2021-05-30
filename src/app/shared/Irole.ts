import { Iuser } from 'src/app/shared/Iuser';
export interface Irole{
    type:string,
    users:Iuser[],
    
}