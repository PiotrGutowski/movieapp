import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[watchSize]',
  standalone: true,
})
export class WatchSizeDirective implements AfterViewInit, OnDestroy {
  private _resizeObserver: ResizeObserver | undefined;
  constructor(private readonly _elementRef: ElementRef) {}

  @Output() public sizeChange: EventEmitter<DOMRectReadOnly> =
    new EventEmitter<DOMRectReadOnly>();

  public ngAfterViewInit(): void {
    this._resizeObserver = new ResizeObserver((element) => {
      this.sizeChange.emit(element[0].contentRect);
    });

    this._resizeObserver.observe(this._elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this._elementRef.nativeElement);
      this._resizeObserver.disconnect();
    }
  }
}
