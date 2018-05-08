import {Component , OnInit} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth , AngularFireAuthModule} from "angularfire2/auth";
import {NavigationExtras ,Router} from "@angular/router";
import {element} from "protractor";



@Component ( {
  selector: 'app-questionforum' ,
  templateUrl: './questionforum.component.html' ,
  styleUrls: [ './questionforum.component.css' ]
} )
export class QuestionforumComponent implements OnInit {


  test: any[];
  userKey: string;
  chatList:any[];
  userid:string;
  recievers:any[];
  userkeys:any[];
  constructor ( private db: AngularFireDatabase , private fireauth: AngularFireAuth , private router: Router ) {

  }

  ngOnInit () {
    if(this.fireauth.auth.currentUser == null){
      this.router.navigateByUrl('/home');
    }else{

      alert("user has logged");
      this.userid =  this.fireauth.auth.currentUser.uid;
      this.showUserm ();
      this.showChatList();
  }
    // alert ( "i am here ngoninit" );

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



  }

  closeNotification(key:String){
    this.db.object('/qa_messages/'+this.userid+'/'+key).update({visibility:"false"});
    this.showChatList();

  }
  showChatList(){
    const now = new Date();
    const milis_now = now.getTime();
    //alert("now------"+now);
    //alert("milisnow==="+milis_now);
    var start = new Date();
    start.setTime(now.getTime()- (30*24*60* 60 * 1000));
    //alert("start-------"+start);
    const start_mills = start.getTime();
    //alert("start_mills--------"+start_mills);

    this.db.list('qa_messages/'+this.userid,ref => ref.orderByKey().limitToLast(20)).snapshotChanges().subscribe(item=>{
      this.userkeys = [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y['$keyname'] = element.key;
        this.userkeys.push(element.key);
        alert("element key"+element.key);
        alert("uerkey length------"+this.userkeys.length);
        this.recievers=[];
        this.db.list('mobile_user',ref=>ref.orderByKey().equalTo(element.key)).snapshotChanges().subscribe(item1=>{
          item1.forEach(element1=>{
            var h = element1.payload.toJSON();
            h['$key'] = element1.key;
            alert("h key------"+h["$key"]);
            this.recievers.push(h);
            alert(this.recievers.length);
          })
        });
          });


    });


  }



  goToSingleChat(key:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "key": key,

      }
    };
    this.router.navigate(["main_admin/questionroom"], navigationExtras);

  }
}





