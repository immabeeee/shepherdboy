import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderItem, Oscypek } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { AdditiveDialogComponent } from '../../feature/additive-dialog/additive-dialog.component';

@Component({
  selector: 'shepherdboy-org-offer-oscypek-item',
  templateUrl: './oscypek-item.component.html',
  styleUrls: ['./oscypek-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OscypekItemComponent {
  @Input() oscypek?: Oscypek;

  constructor(public dialog: MatDialog, private offerService: OfferService) {}

  public openDialog() {
    const dialogRef = this.dialog.open(AdditiveDialogComponent, {
      panelClass: 'org-dialog-container',
      data: { oscypek: this.oscypek },
    });

    dialogRef.afterClosed().subscribe((orderItem: OrderItem) => {
      if (!orderItem){return}
      this.offerService.addOrderItem(orderItem);
    });
  }
}
