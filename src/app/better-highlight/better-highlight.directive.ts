import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  @HostBinding('style.Color') Color: string = 'black'; //The value of the property is optional.

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {}

  @HostListener('mouseenter') mouseover(evenData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = 'blue';
    this.Color = 'white';
  }

  @HostListener('mouseleave') mouseleave(evenData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = 'transparent';
    this.Color = 'black';
  }

}
