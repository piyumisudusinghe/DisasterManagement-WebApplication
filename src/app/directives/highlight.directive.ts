import {Directive ,ElementRef ,HostListener ,Input ,ViewChild} from '@angular/core';
import {AdminComponent} from "../components/admin/admin.component";
import {MainAdminComponent} from "../components/main-admin/main-admin.component";

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  public  static previousEl:ElementRef;
  el:ElementRef;

  constructor( el: ElementRef) {
    this.el = el;

  }

  @HostListener('click') setClass(){
   this.setListClass('black','white');
  }

 private setListClass(color1:string,color2:string){

      this.el.nativeElement.style.color = color1;
      this.el.nativeElement.style.background = color2;
      if(HighlightDirective.previousEl!=null){
        HighlightDirective.previousEl.nativeElement.style.color=color2;
        HighlightDirective.previousEl.nativeElement.style.background='none';
      }
      HighlightDirective.previousEl = this.el;




   if(this.el.nativeElement.name='Dashboard') {
     AdminComponent.index = 0;
   }else if(this.el.nativeElement.name == 'Userguide'){
     AdminComponent.index = 1;
   }else if(this.el.nativeElement.name == 'Maps'){
     AdminComponent.index = 2;
   }else if(this.el.nativeElement.name == 'Notifications'){
     AdminComponent.index = 3;
   }else if(this.el.nativeElement.name == 'UserProfle'){
     AdminComponent.index = 4;
   }else if(this.el.nativeElement.name == 'TableList'){
     AdminComponent.index = 5;
   }else if(this.el.nativeElement.name == 'QuestionForum'){
     AdminComponent.index = 6;
   }else if(this.el.nativeElement.name == 'UpgradetoPro'){
     AdminComponent.index = 7;
   }

 }


}
