import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ArrayUtils } from '../utils/array.utils';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private readonly _overlayRef: OverlayRef = this._initOverlay();

  private _activeSpinners: string[] = [];

  constructor(private readonly _overlay: Overlay) {}

  private _initOverlay(): OverlayRef {
    return this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  public show(id?: string): void {
    this._activeSpinners.push(id ?? 'default');
    this._attachOverlay();
  }

  public hide(id?: string): void {
    if (id) {
      ArrayUtils.removeSelectedElement(this._activeSpinners, id);
    } else {
      this._activeSpinners = [];
    }

    if (!this._activeSpinners?.length) this._detachOverlay();
  }

  private _attachOverlay(): void {
    if (this._overlayRef.hasAttached()) return;

    this._overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  private _detachOverlay(): void {
    if (!this._overlayRef.hasAttached()) return;

    this._overlayRef.detach();
  }
}
