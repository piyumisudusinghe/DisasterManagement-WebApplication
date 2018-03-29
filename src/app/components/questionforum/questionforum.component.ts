import {Component , OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth , AngularFireAuthModule} from "angularfire2/auth";
import {Router} from "@angular/router";



@Component ( {
  selector: 'app-questionforum' ,
  templateUrl: './questionforum.component.html' ,
  styleUrls: [ './questionforum.component.css' ]
} )
export class QuestionforumComponent implements OnInit {


  test: any[];
  userKey: string;


  constructor ( private db: AngularFireDatabase , private fireauth: AngularFireAuth , private router: Router ) {

  }

  ngOnInit () {
    // alert ( "i am here ngoninit" );
    this.showUserm ();
  }


  showUserm () {

    //alert ( "i am here showUserm" );

    function gotData ( data , test1 ) {
      var array = [];
      //alert ( "i am here gtdata1" );
      var users = data.val ();
      //alert ( "i am here gtdata users.........." + users );
      //alert ( "i am here gtdata2" );
      var keys = Object.keys ( users );
      //alert ( "i am here gtdata keys......." + keys );
      //alert ( "i am here gtdata3" );
      //alert ( "keys length" + keys.length );
      for (var i = 0 ; i < keys.length ; i++) {
        //alert ( "i am here gtdata for" + i );
        var k = keys[ i ];
        //alert ( "i am here gtdata k......" + k );
        var message = users[ k ].msg;
        //alert ( "i am here gtdata mesgggg......" + message );

        var reciever_id = users[ k ].reciever_id;
        //alert ( reciever_id );
        array.push ( reciever_id );
        //alert ( "alert lenght.........." + array.length );
        this.test.append ( message );
        //alert ( this.test );
      }
      //alert ( "test1mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.length" + this.test.length );
    }

    function errData ( data ) {
      // alert ( "i am here errData" );

    }

    this.userKey = this.fireauth.auth.currentUser.uid;
    var ref = this.db.database.ref ( 'messages/' + this.userKey );
    //alert ( "i am here gtdata4" + ref );
    ref.on ( 'value' , gotData , errData );

    //alert ( "i am here gtdata5" );
    //this.test = [ 'hhhhhh' , 'hhhhhhhhh' , 'jnwncwk' , 'duoe' ];

  }
}





