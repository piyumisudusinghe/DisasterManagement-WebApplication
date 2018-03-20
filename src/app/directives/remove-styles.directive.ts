import {Directive , ElementRef , HostListener} from '@angular/core';

@Directive({
  selector: '[appRemoveStyles]'
})
export class RemoveStylesDirective {

  constructor(private el:ElementRef) { }
  @HostListener('document:click') setClass(){
    this.setListClass('white','none');
  }

  private setListClass(color1:string,color2:string){
    if(this.el.nativeElement.style.color == 'black'){
      this.el.nativeElement.style.color = color1;
      this.el.nativeElement.style.background = color2;
    }


  }

}
