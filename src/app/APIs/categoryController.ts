import {baseUrl} from'../config';

export const categoryController ={
    getAllCategories:baseUrl+'/api/cateogry',
    addCategory:baseUrl+'/api/cateogry',
    putCategory:baseUrl+'/api/cateogry/:id',
    deleteCateogry:baseUrl+'/api/cateogry/:id'
} 