import {Directive , ElementRef , HostListener} from '@angular/core';

@Directive({
  selector: '[appHideElement]'
})
export class HideElementDirective {

  constructor(private label: ElementRef) { }
  @HostListener('mouseenter') hideLabel(){
    this.setVisibility(false);

  }
  @HostListener('mouseleave') showLabel(){
    this.setVisibility(true);
  }

  private setVisibility(visible:boolean){
    this.label.nativeElement.visibility= visible;
  }

}
