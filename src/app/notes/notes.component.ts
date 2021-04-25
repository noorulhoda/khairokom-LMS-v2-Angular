import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from '../misMatch.validator';
import { ForbiddenNameValidator } from '../username.validatior';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  
      constructor(private fb:FormBuilder) { }
      ngOnInit(): void {}
      registerForm=this.fb.group({
        userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
        comment:[''],
        comments:this.fb.array([]),
        hasDiscount:[false],
        discount:[''],
      });
    
      get userName()
      {
        return this.registerForm.get('userName');
      }
      get comment()
      {
        return this.registerForm.get('comment');
      }
      
      get comments()
      {
        return this.registerForm.get('comments') as FormArray;
      }
      get discount()
      {
        return this.registerForm.get('discount');
      }
      get hasDiscount()
      {
        return this.registerForm.get('hasDiscount');
      }
      addNewComment()
      {
        this.comments.push(this.fb.control(''));
      }
      removeComment(commentIndex)
      {
        this.comments.removeAt(commentIndex);
      }
      
      setValidationToDiscountInput()
      {
        this.registerForm.get('hasDiscount').valueChanges.subscribe(checkedVlaue=>
          {
            const discount=this.registerForm.get('discount');
            if(checkedVlaue)
            {
              discount.setValidators(Validators.required); 
            }
            else
            {
              discount.clearValidators();
            }
            discount.updateValueAndValidity();
          })
      }

    }
  
    
    
  
