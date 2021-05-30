import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';
import { Irole } from 'src/app/shared/Irole';
export interface Iuser{
    firstName:string;
    lastName:string;
    userName:string;
    password:string;
    email:string;
    img:string;
    gender:string;
    age:number;
    roles:Irole[];
    joinedClasses?:Iclass[],
    teachedCourses?:Icourse[]
}