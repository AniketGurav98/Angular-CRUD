import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from "@angular/forms";
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.moel';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  department = [{id:1,name:"Doctor"},{id:2,name:"Admin"}]
  
  formValue ! : FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel ();
  employeeData ! :any;
  
  constructor(private formbuilder: FormBuilder ,private api :ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName :[''],
      lastName :[''],
      email :[''],
      mobile :[''],
      salary :[''],
      address :[''],
      city :[''],
      radio :[''],
      Game :[''],
      Politics :[''],
      Social :[''],
      Art :[''],
      role:['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName =this.formValue.value.firstName;
    this.employeeModelObj.lastName =this.formValue.value.lastName;
    this.employeeModelObj.email =this.formValue.value.email;
    this.employeeModelObj.mobile =this.formValue.value.mobile;
    this.employeeModelObj.salary =this.formValue.value.salary;
    this.employeeModelObj.address =this.formValue.value.address;
    

    this.api.postEmployee(this.employeeModelObj)

    .subscribe(res=>{
      console.log(res);
      alert("added Sucessfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
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

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("deleted")
      this.getAllEmployee();
    })
  }

  onedit(row:any){
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['role'].setValue(row.role);
    this.formValue.controls['radio'].setValue(row.radio);
    this.formValue.controls['Game'].setValue(row.Game);
    this.formValue.controls['Politics'].setValue(row.Politics);
    this.formValue.controls['Social'].setValue(row.Social);
    this.formValue.controls['Art'].setValue(row.Art);

  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName =this.formValue.value.firstName;
    this.employeeModelObj.lastName =this.formValue.value.lastName;
    this.employeeModelObj.email =this.formValue.value.email;
    this.employeeModelObj.mobile =this.formValue.value.mobile;
    this.employeeModelObj.salary =this.formValue.value.salary;
    this.employeeModelObj.city =this.formValue.value.city;
    this.employeeModelObj.address =this.formValue.value.address;
    this.employeeModelObj.role =this.formValue.value.role;
    this.employeeModelObj.radio =this.formValue.value.radio;
    this.employeeModelObj.Game =this.formValue.value.Game;
    this.employeeModelObj.Politics =this.formValue.value.Politics;
    this.employeeModelObj.Social =this.formValue.value.Social;
    this.employeeModelObj.Art =this.formValue.value.Art;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  cities = ['Mumbai','Navi Mumbai','New Delhi','Chennai'];

}
