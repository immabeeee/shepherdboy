import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Additive,
  generateDefaultListQuery,
  Oscypek,
} from '@shepherdboy-org/api-interfaces';
import { Observable } from 'rxjs';
import { OfferService } from '../../data-access/offer.service';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { AdditiveListView } from '../../data-access/state/offer.models';

export interface DialogData {
  oscypek: Oscypek;
}

@Component({
  selector: 'shepherdboy-org-additive-dialog',
  templateUrl: './additive-dialog.component.html',
  styleUrls: ['./additive-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditiveDialogComponent {
  public additiveListView$: Observable<AdditiveListView> =
    this.offerStateFacade.additiveListView$;
  public selectedAdditives: Additive[] = [];

  get isAddButtonDisabled(): boolean {
    return !this.selectedAdditives || this.selectedAdditives.length === 0;
  }

  get selectedAdditiveIds(): string[] {
    return this.selectedAdditives.map((e) => (e.id ? e.id : ''));
  }

  constructor(
    private offerStateFacade: OfferStateFacade,
    private offerService: OfferService,
    private dialogRef: MatDialogRef<AdditiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.offerService.fetchAdditiveList(generateDefaultListQuery());
  }

  selectAdditive(additive: Additive): void {
    if (this.selectedAdditives.includes(additive)) {
      this.selectedAdditives = this.selectedAdditives.filter(
        (e) => e.id !== additive.id
      );
    } else {
      this.selectedAdditives = [...this.selectedAdditives, additive];
    }
  }

  submit(): void {
    this.dialogRef.close({
      oscypek: {
        quantity: 1,
        ...this.data.oscypek,
      },
      additives: this.selectedAdditives.map((e) => {
        return {
          quantity: 1,
          ...e,
        };
      }),
    });
  }
}
