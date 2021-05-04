import { Component } from '@angular/core';
import { NavigationExtras } from "@angular/router";
import { NavController, ModalController } from '@ionic/angular'
import { Plugins } from '@capacitor/core';
import { ThisReceiver } from '@angular/compiler';
import { ToastService } from '../toast.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menus=[];
userMenu=[
  {
    menuName:'Employee list' ,url:'/create-employee'
  },
  {
    menuName:'Vendors list' ,url:''
  }
]
adminMenu=[
  {
    menuName:'Users' ,url:''
  },
  {
    menuName:'Customers' ,url:''
  }
]
  constructor( private toast: ToastService,public navCtrl: NavController) {}

  async ionViewWillEnter(){
    const ret = await Storage.get({ key: 'user' });
   console.log(JSON.parse(ret.value));
    if(JSON.parse(ret.value)!=null)
    {
      let user=JSON.parse(ret.value)
if(user.role=="Admin")
{
 this.menus=this.adminMenu;
}else
{
  this.menus=this.userMenu;
}
     // this.navCtrl.setDirection('root');
    //  this.navCtrl.navigateRoot('/Dashboard')
    }
  }
  goTo(url){
    this.navCtrl.navigateForward(url)
  }


 async logOut(){
    await Storage.remove({ key: 'user' });
    this.toast.show("Logout Success")
    this.navCtrl.setDirection('root');
    this.navCtrl.navigateRoot('/login');
  }
}
