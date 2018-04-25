import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from "../../app_services/firebase-auth/firebase-auth.service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications:any[];
  userid:string;
  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase) { }

  ngOnInit() {
    alert("i am in the notification");
    this.userid =  this.afAuth.auth.currentUser.uid;
    alert("usrid"+this.userid);
    this.showNotifications();


  }

  closeNotification(key:String){
    this.db.object('/web_notifications/'+this.userid+'/'+key).update({visibility:false});
    this.showNotifications();

  }

  showNotifications(){
    this.db.list('notifications/'+this.userid,ref => ref.orderByKey()).snapshotChanges().subscribe(item=>{
      this.notifications =[];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y['$keyname'] = element.key;

        this.notifications.push(y);
      })
    });
    alert(this.notifications.entries());
  }

}
