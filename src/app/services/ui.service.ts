import { Injectable } from '@angular/core';
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
}
