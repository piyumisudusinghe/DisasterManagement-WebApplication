import {Component ,ElementRef ,OnInit ,ViewChild} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {log} from "util";
import {assertLessThan} from "@angular/core/src/render3/assert";
import {FirebaseAuthService} from "../../app_services/firebase-auth/firebase-auth.service";
import {FcmPushService} from "../../app_services/fcm-push/fcm-push.service";
import {and} from "@angular/router/src/utils/collection";
import {AuthService} from "../../app_services/auth/auth.service";

@Component ( {
  selector: 'app-home-component' ,
  templateUrl: './home-component.component.html' ,
  styleUrls: [ './home-component.component.css' ]
} )
export class HomeComponentComponent implements OnInit {


  @ViewChild('modal') private email_modal:ElementRef;
  state: string = '';
  error: any;
  mystate = 'signup';
  email: string;
  password: string;
  colorstate:string;
  admin_type:string;
  message;
  forget_email:string;
  errorMsg:string;
  public static admin_pwd:string;

  constructor ( public afAuth: AngularFireAuth , private router: Router,private db:AngularFireDatabase,private _fcmPushService: FcmPushService, private _auth: FirebaseAuthService,private auth:AuthService) {

  }

  ngOnInit () {}

  setState ( prefered: string ) {
    this.mystate = prefered;
    console.log("i am here");
  }

  onSubmit (form:NgForm) {

    if (form.valid) {
      console.log ( form.value );
      console.log("form data is valid");
      this.emailSignup (
        form.value.email ,
        form.value.password
      );
    }else{
      console.log("invalid data");
    }
  }

  emailSignup ( email: string , password: string ) {
    HomeComponentComponent.admin_pwd=password;
    this.afAuth.auth.createUserWithEmailAndPassword ( email , password )
      .then ( value => {
        console.log ( 'Sucess' , value );
        this.router.navigateByUrl ( '/admin' );
      } )
      .catch ( error => {
        console.log ( 'Something went wrong: ' , error );
        this.router.navigateByUrl('/error-message');
      } );
  }

  onSubmitLoginForm(form:NgForm){
    if (form.valid) {
      console.log ( form.value );
      console.log("form data is valid");
      this.loginUser (
        form.value.email ,
        form.value.password
      );
      setTimeout(() =>
        {
          form.resetForm();
        },
        2000);

    }else{
      console.log("invalid data");
    }
  }

  loginUser(email:string,password:string){
   // alert(" i am in the login user");
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(value => {
          this._fcmPushService.getPermission();
          this._fcmPushService.receiveMessage();
          this._fcmPushService.currentMessage.subscribe(message => this.message = message);
          console.log ( 'Sucess' , value );
          this.db.list('admin_user',ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().subscribe(item=>{
            if(item.length != 0){
              item.forEach(element=>{
                var y = element.payload.toJSON();
                y['$key'] = element.key;
                this.checkAdminType(y['admin_type'],y['$key']);
              });

            }else{
              this.router.navigateByUrl('/error-message');
            }

          });



      }


      ).catch( error => {
        console.log ( 'Something went wrong: ' , error );
        this.router.navigateByUrl('/error-message');
      }
    );


  }

  checkAdminType(admin_type:string,id:string){
   // alert(" i am in the admin type");
    if((admin_type=="first") && ( id != null)){
      //alert(" i am in the  main admin type");
      this.router.navigateByUrl ( '/main_admin' );
      this.db.object('/admin_user/'+id).update({availability:"true"});

      //alert("i am in if");
    }else if((admin_type=="second")&& ( id != null)){
      //alert("i am in else if");
      alert(" i am in the normal admin type");
      this.router.navigateByUrl ( '/admin' );
      this.db.object('/admin_user/'+id).update({availability:"true"});
    }


  }


  forgotPwd(){
    this.email_modal.nativeElement.style.display = "block";

  }
  sendEmail(form:NgForm){
    if(form.valid){
      if(form.value.forget_email.length != 0){
        this.email_modal.nativeElement.style.display = "none";
        this.auth.resetPassword(form.value.forget_email);
      }else{
        setTimeout(() =>
          {
            this.errorMsg = "Email format is incorrect";
          },
          2000);
      }

    }else{
      setTimeout(() =>
        {
          this.errorMsg = "Please enter valid data";
        },
        2000);
    }


  }
  closeModal(){
    this.email_modal.nativeElement.style.display = "none";
  }

}
