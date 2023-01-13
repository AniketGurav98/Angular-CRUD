import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from '../employee-dashboard/employee-dash board.moel';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  department = [{id:1,name:"Doctor"},{id:2,name:"Admin"}]

  formValue ! : FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel ();
  employeeData ! :any;
  selectedCity: any;
  obj:any;
  
  
  
  


  constructor(private formbuilder: FormBuilder ,private api :ApiService,private router: Router,) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName :['',Validators.required],
      lastName :[''],
      email :['',Validators.required],
      mobile :['',Validators.required],
      salary :[''],
      address :[''],
      service :[''],
      // area :[''],
      city :[''],
      // check :[''],
      radio :[''],
      skill :[''],
      Game :[''],
      Politics :[''],
      Social :[''],
      Art :[''],
      role:['']
      

      
      
    })
    
  }

  onSubmit(){
    
    console.log(this.formValue.value);
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName =this.formValue.value.firstName;
    this.employeeModelObj.lastName =this.formValue.value.lastName;
    this.employeeModelObj.email =this.formValue.value.email;
    this.employeeModelObj.mobile =this.formValue.value.mobile;
    this.employeeModelObj.salary =this.formValue.value.salary;
    this.employeeModelObj.address =this.formValue.value.address;
    this.employeeModelObj.service =this.formValue.value.service;
    this.employeeModelObj.city =this.formValue.value.city;
    this.employeeModelObj.role =this.formValue.value.role;
    this.employeeModelObj.check =this.formValue.value.check;
    this.employeeModelObj.radio =this.formValue.value.radio;
    this.employeeModelObj.Game =this.formValue.value.Game;
    this.employeeModelObj.Politics =this.formValue.value.Politics;
    this.employeeModelObj.Social =this.formValue.value.Social;
    this.employeeModelObj.Art =this.formValue.value.Art;



    this.api.postEmployee(this.employeeModelObj)

    .subscribe(res=>{
      console.log(res);
      alert("added Sucessfully");
      let ref = document.getElementById('cancel')
      // ref?.click();
      this.formValue.reset();
      this.router.navigateByUrl('')

      this.getAllEmployee();

      
    },
    err=>{
      alert("failed")
    }
    )
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe((res)=>{
      this.employeeData = res

    }
    
    
    )
  }

  cities = ['Mumbai','Navi Mumbai','New Delhi','Chennai'];

  // food = [
  //   {id:1, select:false, name:"dumpling"},
  //   {id:2, select:false, name:"burger"},
  //   {id:3, select:false, name:"sandwich"},
  // ]
 
   
  

  
}


