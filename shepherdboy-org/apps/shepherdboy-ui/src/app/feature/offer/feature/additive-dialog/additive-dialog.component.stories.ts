import { moduleMetadata, Story, Meta } from '@storybook/angular';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AdditiveDialogComponent } from './additive-dialog.component';
import { AdditiveDialogModule } from './additive-dialog.module';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

export default {
  title: 'OfferModule/Feature/AdditiveDialog',
  component: AdditiveDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        AdditiveDialogModule,
      ],
      providers: [
        OfferStateFacade,
        OfferService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { oscypek: testData.oscypek } },
        provideMockStore({
          initialState: initialOfferState,
          selectors: [
            {
              selector: getAdditiveListView,
              value: {
                items: [testData.additive],
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery(),
              },
            },
          ],
        }),
      ],
    }),
    testData.addDefaultWrapper(),
  ],
} as Meta<AdditiveDialogComponent>;

const Template: Story<AdditiveDialogComponent> = (
  args: AdditiveDialogComponent
) => ({
  props: args,
});

export const WithList = Template.bind({});
WithList.args = {
  additiveListView$: of({
    items: [testData.additive],
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithProgressBar = Template.bind({});
WithProgressBar.args = {
  additiveListView$: of({
    items: null,
    isLoading: true,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithError = Template.bind({});
WithError.args = {
  additiveListView$: of({
    items: null,
    isLoading: false,
    error: 'test data',
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithEmptyList = Template.bind({});
WithEmptyList.args = {
  additiveListView$: of({
    items: [],
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};
