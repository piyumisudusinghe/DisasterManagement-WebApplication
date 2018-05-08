import {Component ,ElementRef ,EventEmitter ,OnInit ,Output} from '@angular/core';
import {FirebaseAuthService} from "../../app_services/firebase-auth/firebase-auth.service";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {NavigationExtras ,Router} from "@angular/router";
import {element} from "protractor";
import {HighlightDirective} from "../../directives/highlight.directive";
import {MainAdminComponent} from "../main-admin/main-admin.component";


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications:any[];
  userid:string;
  admin_type:any[];


  constructor(private afAuth:AngularFireAuth,private db:AngularFireDatabase,private router:Router,private elm:ElementRef) { }

  ngOnInit() {
    //alert("i am in the notification");
    if(this.afAuth.auth.currentUser == null){
      this.router.navigateByUrl('/home');
    }else{
      this.userid =  this.afAuth.auth.currentUser.uid;
      this.db.list('admin_user/'+this.userid).snapshotChanges().subscribe(item=>{
        this.admin_type=[];
        item.forEach(element=>{
          var y = element.payload.toJSON();
          this.admin_type.push(y);

        })
      });

      alert("usrid"+this.userid);
      this.showNotifications();
    }



  }

  closeNotification(key:String){
    alert("key-------"+key);
    this.db.object('/web_notifications/'+this.userid+'/'+key).update({visibility:"false"});
    this.showNotifications();

  }

  showNotifications(){
    this.db.list('web_notifications/'+this.userid,ref => ref.orderByChild('visibility').equalTo("true")).snapshotChanges().subscribe(item=>{
      this.notifications =[];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y['$keyname'] = element.key;
        alert("y---"+y['$keyname']);
        this.notifications.push(y);
      })
    });
    alert(this.notifications.entries());
  }
  naviagateToQA(key:String){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "key": key,

      }
    };


    alert("key----"+key);
    if(this.admin_type[0]=="first"){
      this.router.navigate(['main_admin/questionforum'],navigationExtras);
    }else{
      this.router.navigate(['admin/questionforum'],navigationExtras);
    }


}

}
