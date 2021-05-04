import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras } from "@angular/router";
import { ToastService } from '../toast.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.page.html',
  styleUrls: ['./create-employee.page.scss'],
})
export class CreateEmployeePage implements OnInit {
  showTable=0;
  employee={
    employeeName:"",
    employeeEmail:"",
    employeeAddress:"",
    employeeDesignation:""
  }
  maxEmployee=10;
  employees:any[]=[];
  public form: FormGroup;

  employeeName: AbstractControl;
  employeeEmail: AbstractControl;
  employeeAddress:AbstractControl;
  employeeDesignation:AbstractControl;
  validation_msg: any;

  constructor( private toast: ToastService, private fb: FormBuilder, public navCtrl: NavController,) {
this.employees=[];
    this.validation_msg = {

      'employeeName': [
        { type: 'required', message: 'Employee Name Required.' },

        { type: 'pattern', message: 'Please Enter only Characters ' },


      ],
      'employeeEmail': [
        { type: 'required', message: ' Employee email Required.' },

        { type: 'pattern', message: 'Please enter Employee email in Correct Format. ' },


      ],
      'employeeAddress': [
        { type: 'required', message: ' Employee address Required.' },
      ],
        'employeeDesignation': [
          { type: 'required', message: 'Employee designation Required.' }
  

        ]
     
    }
    this.form = this.fb.group({

      employeeName: ['', Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]+")])],
      employeeEmail: ['', Validators.compose([Validators.required,  Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
   
      employeeAddress: ['', Validators.compose([Validators.required])],
      employeeDesignation: ['', Validators.compose([Validators.required])],
   

    })
    this.employeeName = this.form.controls['employeeName'];
    this.employeeEmail = this.form.controls['employeeEmail'];
    this.employeeAddress = this.form.controls['employeeAddress'];
    this.employeeDesignation = this.form.controls['employeeDesignation'];
   }

   
  ngOnInit() {
  }


 async Save(form)
  {
if(form.valid)
{
  const ret = await Storage.get({ key: 'employees' });
  if(JSON.parse(ret.value)==null)
  {
    this.employees.push(form.value);
    Storage.set({
      key: 'employees',
      value: JSON.stringify(this.employees)
    });

  }else
  {
    this.employees=JSON.parse(ret.value);
    this.employees.push(form.value);
    Storage.set({
      key: 'employees',
      value: JSON.stringify(this.employees)
    });

  }
  this.form.reset();
  this.showTable=1;
  this.toast.show("Employee created SuccessFully")
}else
{
  this.toast.show("Please Enter All Required Data")
}
  }

 async ionViewWillEnter(){
    const ret = await Storage.get({ key: 'employees' });
    if(JSON.parse(ret.value)!=null)
    {
    this.employees=JSON.parse(ret.value)
    }
    else
    {
      this.employees=[];
    }
  }


  async clear(){
    console.log("hi")
    await Storage.remove({ key: 'employees' });
    this.employees=[];
  }
}
