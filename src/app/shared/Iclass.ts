import { Iuser } from 'src/app/shared/Iuser';
export interface Iclass{
    Number:string,
    StudentsMinAge:Number,
    StudentsMaxAge:Number,
    StudentGender:string,
    ClassLink:string,
    ClassLinkPassword:string,
    StartDate:Date,
    EndDate:Date,
    CourseId:string,
    TeacherId:string,
    Students:Iuser[]
     }