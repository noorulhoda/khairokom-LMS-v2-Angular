import {baseUrl} from'../config';

export const classController ={
    getAllClasses:baseUrl+'/api/class',
    addClass:baseUrl+'/api/class',
    putClass:baseUrl+'/api/class/:id',
    deleteClass:baseUrl+'/api/class/:id'
} 