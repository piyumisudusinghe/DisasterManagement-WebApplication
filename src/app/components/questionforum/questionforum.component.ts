import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth , AngularFireAuthModule} from "angularfire2/auth";
import {Router} from "@angular/router";
import ownKeys = Reflect.ownKeys;
import {log} from "util";

@Component({
  selector: 'app-questionforum',
  templateUrl: './questionforum.component.html',
  styleUrls: ['./questionforum.component.css']
})
export class QuestionforumComponent implements OnInit {

  chatUsers:any[];
  mobileUserdetails:any[];
  adminEmail:string;
  userKey:string;
  mobileUserId:string;
  constructor(private db:AngularFireDatabase,private fireauth:AngularFireAuth,private router: Router) { }

  ngOnInit() {
    this.showUser();
  }
  showUser(){

      this.userKey = this.fireauth.auth.currentUser.uid;
      this.db.list('messages',ref => ref.orderByKey().equalTo(this.userKey)). snapshotChanges().subscribe(item=>{
        this.chatUsers =[];
        item.forEach(element=>{
          var y = element.payload.toJSON();
          y['$keyname'] = element.key;
          this.chatUsers.push(y);
        })
      });




        for(let entry of this.chatUsers){

          for(let entry2 of entry.values()){
            this.chatUsers.push(entry2);
            this.db.list('mobile_user',ref => ref.orderByKey().equalTo(entry2)).snapshotChanges().subscribe(item=>{
              item.forEach(element=>{
                this.mobileUserdetails =[];
                var y = element.payload.toJSON();
                y['$keyUser'] = element.key;
                this.mobileUserdetails.push(y);
              })
            });
          }

        }

      }




}
