import {AfterContentInit ,Component ,ElementRef ,OnInit} from '@angular/core';
import * as angular from 'angular';
import {AngularFireDatabase ,AngularFireList} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {element} from "protractor";
import {NgForm} from "@angular/forms";
import * as firebase from "firebase/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import {Router} from "@angular/router";
import {and} from "@angular/router/src/utils/collection";


@Component ( {
  selector: 'app-userprofile' ,
  templateUrl: './userprofile.component.html' ,
  styleUrls: [ './userprofile.component.css' ]
} )
export class UserprofileComponent implements OnInit {

  admin_detail: any[];
  uss: any[];
  s: AngularFireList<string>;
  userid: string;
  email:string;
  first_name:string;
  last_name:string;
  position:string;
  attach_company:string;
  oldPwd:string;
  newPwd:string;
  conPwd:string;
  errorMsg:string;
  constructor ( private db: AngularFireDatabase ,private fireauth: AngularFireAuth ,private router:Router) {

  }

  ngOnInit () {
    this.getAdminDetails();

  }

  getAdminDetails(){
    this.userid = this.fireauth.auth.currentUser.uid;

    this.db.list ( 'admin_user' ,ref => ref.orderByKey ().equalTo ( this.userid ) ).snapshotChanges ().subscribe ( item => {
      this.admin_detail = [];
      item.forEach ( element => {
        var y = element.payload.toJSON ();
        y[ '$d' ] = element.key;
        this.admin_detail.push ( y );
        this.position = y['position'];
        this.first_name = y['first_name'];
        this.last_name = y['last_name'];
        this.email = y['email'];
        this.attach_company = y['attach_company'];
      } )
    } );

  }

  updateAdminDetails(formData:NgForm){
       if(formData.valid){
         this.db.object('admin_user/'+this.userid).update({first_name:formData.value.first_name,
           last_name:formData.value.last_name, position:formData.value.position});
         this.getAdminDetails();
       }
  }

  changePwd(pwdData:NgForm){

    if(pwdData.valid){

      const  user = this.fireauth.auth.currentUser;
      this.oldPwd = pwdData.value.oldPwd;
      this.newPwd = pwdData.value.newPwd;
      this.conPwd = pwdData.value.conPwd;
      const credential = EmailAuthProvider.credential(user.email,this.oldPwd);
      user.reauthenticateWithCredential(credential).then(
        ()=>{
          if((this.newPwd.length ==8) && (/^[0-9A-Za-z]+$/.test(this.newPwd))){
            if(this.newPwd == this.conPwd){
              user.updatePassword(this.newPwd);
              this.errorMsg = 'Sucessfully changed the password';
            }else{
              this.errorMsg = 'please enter same password in new password field and confirm password field';
            }

          }else{
            this.errorMsg = 'please enter eight character password with allowed characters'
          }


        }
      ).catch(error=>{
            this.errorMsg = 'Your old password is incorrect';
      });
    }
  }


}




