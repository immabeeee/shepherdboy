import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Additive } from '@shepherdboy-org/api-interfaces';

@Component({
  selector: 'shepherdboy-org-offer-additive-item',
  templateUrl: './additive-item.component.html',
  styleUrls: ['./additive-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditiveItemComponent {
  @Input() additive?: Additive;
  @Input() isActive = false;
}
