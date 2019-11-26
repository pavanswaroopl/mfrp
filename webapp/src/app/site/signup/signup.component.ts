import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  
  constructor(private formBuilder:FormBuilder,private userService:UserServiceService,private authService:AuthServiceService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      memberId: ['',[
        Validators.required,
        this.isMemberIdTaken
      ]],
      firstname:['',[
        Validators.required
      ]],
      lastname:['',[
        Validators.required
      ]],
      password:['',[
        Validators.required
      ]],
      confirmPassword:['',[
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]],
      gender:['',[
        Validators.required
      ]],
      age:['',[
        Validators.required
      ]],
      branch:['',[
        Validators.required
      ]],
      contactNo:['',[
        Validators.required
      ]],
      email:['',[
        Validators.required
      ]],
      roles:['',[
        Validators.required
      ]],
    })
  }
  get memberId() {
    return this.signUpForm.get('memberId');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get gender(){
    return this.signUpForm.get('gender');
  }
  get roles(){
    return this.signUpForm.get('roles');
  }
  get age(){
    return this.signUpForm.get('age');
  }
  get branch(){
    return this.signUpForm.get('branch');
  }
  get contactNo(){
    return this.signUpForm.get('contactNo');
  }
  get email(){
    return this.signUpForm.get('email');
  }

  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }
  isMemberIdTaken(formControl: FormControl): { [s: string]: boolean } {
      if (formControl.value === 'admin') {
          return { 'userNameTaken': true };
        } else {
          return null;
        }
      }
  

}

