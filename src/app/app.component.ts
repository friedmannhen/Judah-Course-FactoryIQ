import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FactoryIQ';
  public isSidebarOpen: boolean = false;

  private sub: Subscription = new Subscription();

  constructor(private uiService: UiService) {}
  ngOnInit() {
    this.sub.add(
      this.uiService.getSidebarOpen().subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public toggleSidebar(): void {
    if (this.isSidebarOpen) {
      this.uiService.toggleSidebar(!this.isSidebarOpen);
    }
  }
}
