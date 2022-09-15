import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shepherdboy-org-ui-icon-button',
  templateUrl: './ui-icon-button.component.html',
  styleUrls: ['./ui-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconButtonComponent {
  @Input() icon!: 'gg-sun' | 'gg-moon' | 'gg-shopping-cart';
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() isSecondary = false;
}
