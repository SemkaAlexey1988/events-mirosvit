
import { Directive, ElementRef, OnInit, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
selector: '[appColor]'
}) 


export class ColorDirective implements OnInit {
  constructor(private element: ElementRef){} 
  
  @Input() selectedColor = "black";
  @Input() defaultColor = "red";

  private color : string;


  ngOnInit(){
    this.color = this.defaultColor;
    this.element.nativeElement.style.fontSize = "22px";
  }

  @HostBinding("style.color") get getColor(){
         
    return this.color;
}
 
 

 
@HostListener("mouseenter") onMouseEnter() {
    this.color = this.selectedColor;
}

@HostListener("mouseleave") onMouseLeave() {
    this.color = this.defaultColor;
}


}