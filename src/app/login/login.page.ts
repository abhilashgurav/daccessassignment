import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras } from "@angular/router";
import { ToastService } from '../toast.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //role:any;
  user={
    role:"",
    username:"",
    password:""
  }
  public form: FormGroup;

  role: AbstractControl;
  username: AbstractControl;
  password:AbstractControl;
  validation_msg: any;

  constructor( private toast: ToastService, private fb: FormBuilder, public navCtrl: NavController,) {

    this.validation_msg = {

      'role': [
        { type: 'required', message: ' Role Required.' },

       


      ],
      'username': [
        { type: 'required', message: ' Username Required.' },

        { type: 'pattern', message: 'Please Enter Username in Correct Format. ' },


      ],
      'password': [
        { type: 'required', message: ' Password Required.' },

     


      ],
    }
    this.form = this.fb.group({

      role: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required,  Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
   
      password: ['', Validators.compose([Validators.required])],

   

    })
    this.username = this.form.controls['username'];
    this.role = this.form.controls['role'];
    this.password = this.form.controls['password'];
   }

   
  ngOnInit() {
  }
  signin()
  {
    if(this.form.valid)
    {
if(this.user.username=="user@gmail.com" && this.user.password=="123")
{
  Storage.set({
    key: 'user',
    value: JSON.stringify(this.user)
  });
  this.form.reset();
  this.toast.show("Login Success")
  this.navCtrl.navigateForward('/Dashboard')
}
    }else
    {
      this.toast.show("Please Enter All Required Data")
    }

  }


 async ionViewWillEnter(){
    const ret = await Storage.get({ key: 'user' });
   
    if(JSON.parse(ret.value)!=null)
    {
      this.navCtrl.setDirection('root');
      this.navCtrl.navigateRoot('/Dashboard')
    }
  }
}
