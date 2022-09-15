import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'shepherdboy-org-ui-message',
  templateUrl: './ui-message.component.html',
  styleUrls: ['./ui-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiMessageComponent {
  @Input() type: 'error' | 'warn' | 'info' | 'success' | 'primary' = 'primary'
  @Input() message?: string = 'default message'

  public isHidden = false

  public handleHideMessage(): void {
    this.isHidden = true
  }
}
