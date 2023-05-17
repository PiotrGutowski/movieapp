import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  selector: '[watchSize]',
  standalone: true,
})
export class WatchSizeDirective implements AfterViewInit {
  constructor(private readonly _elementRef: ElementRef) {}

  @Output() public sizeChange: EventEmitter<DOMRectReadOnly> =
    new EventEmitter<DOMRectReadOnly>();

  public ngAfterViewInit(): void {
    const observer = new ResizeObserver((element) => {
      this.sizeChange.emit(element[0].contentRect);
    });

    observer.observe(this._elementRef.nativeElement);
  }
}
