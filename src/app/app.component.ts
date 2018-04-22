import { Component,OnInit } from '@angular/core';
import {MessagingService} from "./app_services/messaging/messaging.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  message;

  constructor(private msgService: MessagingService) {}

  ngOnInit() {
    alert("i am in the appngonint");
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    alert(this.message.toString());
  }
}

