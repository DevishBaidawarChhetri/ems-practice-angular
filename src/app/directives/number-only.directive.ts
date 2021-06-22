import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  private regEx: RegExp = new RegExp('^[0-9]*$');
  private specialKeys: Array<string> = ['Backspace'];
  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1 ||
      (event.key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
      // (event.key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
      // (event.key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
      (event.key === 'x' && event.ctrlKey === true)) { // Allow: Ctrl+V
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    if (inputValue.length > 10) {
      event.preventDefault();
    }
    if (inputValue && !String(inputValue).match(this.regEx)) {
      event.preventDefault();
    }
    return;
  }
}
