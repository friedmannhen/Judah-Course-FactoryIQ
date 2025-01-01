import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  private sidebarOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public getSidebarOpen(): Observable<boolean> {
    return this.sidebarOpen$.asObservable();
  }

  toggleSidebar(isOpen: boolean): void {
    this.sidebarOpen$.next(isOpen);
  }

  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;
  async openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
