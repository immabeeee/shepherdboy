import { Component } from '@angular/core';
import { initTheme } from '@shepherdboy-org/theme';

@Component({
  selector: 'shepherdboy-org-remote-root',
  templateUrl: './app-remote.component.html',
  styleUrls: ['./app-remote.component.scss'],
})
export class AppRemoteComponent {
  constructor() {
    initTheme();
  }
}
