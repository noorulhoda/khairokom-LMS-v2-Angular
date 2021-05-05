import {baseUrl} from'../config';

export const courseController ={
    GetAllCourses:baseUrl+'/api/course',
    AddCourse:baseUrl+'/api/course',
    putCourse:baseUrl+'/api/course/:id',
    delete:baseUrl+'/api/course/:id'
} 