import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  static previousEl:ElementRef;
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

 }
}
