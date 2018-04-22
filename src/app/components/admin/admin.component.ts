import {Component ,ElementRef ,OnChanges ,OnInit ,ViewChild} from '@angular/core';
import index from "@angular/cli/lib/cli";
import {NgForm} from "@angular/forms";
import {FirebaseAuthService} from "../../app_services/firebase-auth/firebase-auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
   @ViewChild('modallogout') private  element:ElementRef;
  menuItem = 'dashboard';
  //sideBarNames:any[];
  static index:number;
  num:number;
  uid:string;
  constructor(private  firebaseAuth:AngularFireAuth,private router:Router,private  db:AngularFireDatabase) {
    /*this.sideBarNames=[{feature_name:'DASHBOARD'},{feature_name:'USERGUIDE'},{feature_name:'MAPS'},{feature_name:'NOTIFICATIONS'},{feature_name:'USER PROFILE'},
      {feature_name:'TABLE LIST'},{feature_name:'QUESTION FORUM'},{feature_name:'UPGRADE TO PRO'}];*/
  }

  ngOnInit() {
    if(this.firebaseAuth.auth.currentUser == null){
      this.router.navigateByUrl('/home');
    }else{
      this.uid = this.firebaseAuth.auth.currentUser.uid;
    }
  }
  setClass(item:string){
    this.menuItem = item;
  }


  logout(form:NgForm){
    this.firebaseAuth.auth.signOut();
    this.element.nativeElement.style.display = "none";
    alert('user id'+this.uid);
    this.db.database.ref('admin_user/'+this.uid).update({availability:"false"}).then(
      value => {

        this.router.navigateByUrl('/home');
      }
    ).catch(error=>{
      this.router.navigateByUrl('/error-message');
    });

  }

  closeModallogout(form:NgForm){
    this.element.nativeElement.style.display = "none";
  }

  closeModalDelete(){
    this.element.nativeElement.style.display = "none";
  }
  showModal(){
    this.element.nativeElement.style.display = "block";
  }







}
