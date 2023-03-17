import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from './Models/ServiceModels/AddUser';
import { User } from './Models/ServiceModels/User';
import { UserListResponse } from './Models/ServiceModels/UserListResponse';
import { UserResponse } from './Models/UserResponse';
import { UserService } from './Services/user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
    registrationForm!:FormGroup;
    isFormSubmitted = false;
    addUser:AddUser | undefined;
    isLoad:boolean= false;
    displayGrid:boolean= false;

    getData:User[] | undefined;

  constructor(
    private _formBuilder: FormBuilder,  
    private _userService:UserService,
    private datePipe: DatePipe 
  ){ }
  ngOnInit(): void {
    
    this.registrationForm = this._formBuilder.group({    
      Name: ['', [Validators.required, Validators.maxLength(30)]],
      sys: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      dia: ['', [Validators.required,Validators.pattern('^[0-9]*$')]], 
      pulse: ['', [Validators.required,Validators.pattern('^[0-9]*$')]]   
     });

     //this.onLoadData();
  }
      //Methods for validation
  isFieldValid(field: string) {
      return (
            (!this.registrationForm.get(field)!.valid && this.registrationForm.get(field)!.touched) ||
            (this.registrationForm.get(field)!.untouched && this.isFormSubmitted)
        );
      
    }
     onSubmit(){
      this.isLoad=true;
      this.addUser=new AddUser();
      this.addUser.Name=this.registrationForm.controls["Name"].value;      
      this.addUser.SYS=this.registrationForm.controls["sys"].value == "" ? 0 : parseInt(this.registrationForm.controls["sys"].value);
      this.addUser.DIA= this.registrationForm.controls["dia"].value == "" ? 0 : parseInt(this.registrationForm.controls["dia"].value);
      this.addUser.PULSE= this.registrationForm.controls["pulse"].value == "" ? 0 : parseInt(this.registrationForm.controls["pulse"].value);
      console.log(this.addUser);
        this._userService.addUserDetails(this.addUser).subscribe((x:UserResponse)=>{
          console.log(x)
          if(x.status==1){
            this.isLoad=false;
            this.registrationForm.reset();
            //this.onLoadData();
            alert(x.message);
            
          }
          else{
            this.isLoad=false;
            alert(x.message);
          }
        })
        }

 onLoadData(){
  this.isLoad=true;
  this.displayGrid=true;
  this._userService.fetchUserData().subscribe((x:UserListResponse)=>{
     if(x.status==1){      
      this.isLoad=false;        
          console.log(x);
          this.getData=x.data;
          this.getData?.forEach((x:User)=>{
            x.IST=this.datePipe.transform( x.IST, 'dd-MM-yyyy hh:mm a')?.toString();
          })
        }
    else{
      this.isLoad=false;
      console.log(x);
       }
      })
   }

}
