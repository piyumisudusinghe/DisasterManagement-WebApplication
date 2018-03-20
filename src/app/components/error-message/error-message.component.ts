import { Component, OnInit } from '@angular/core';
import {RouterModule,Router} from "@angular/router";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {


  constructor( private router: Router ) { }

  ngOnInit() {
  }
  closeMsg(){
    this.router.navigateByUrl ( '/home' );
  }





}
