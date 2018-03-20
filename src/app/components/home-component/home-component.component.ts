import {Component , OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {catchError} from "rxjs/operators";

@Component ( {
  selector: 'app-home-component' ,
  templateUrl: './home-component.component.html' ,
  styleUrls: [ './home-component.component.css' ]
} )
export class HomeComponentComponent implements OnInit {

  state: string = '';
  error: any;
  mystate = 'signup';
  email: string;
  password: string;
  colorstate:string;

  constructor ( public afAuth: AngularFireAuth , private router: Router ) {

  }

  ngOnInit () {
  }

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
    }else{
      console.log("invalid data");
    }
  }

  loginUser(email,password){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(value => {
        console.log ( 'Sucess' , value );
        this.router.navigateByUrl ( '/admin' );
      }


      ).catch( error => {
        console.log ( 'Something went wrong: ' , error );
        this.router.navigateByUrl('/error-message');
      }
    );


  }

}
