import { moduleMetadata, Story, Meta } from '@storybook/angular';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { OfferService } from '../../data-access/offer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferBrowserPageModule } from './offer-browser.page.module';
import { OfferBrowserPageComponent } from './offer-browser.page';
import {
  getAdditiveListView,
  getOrderView,
  getOscypekListView,
} from '../../data-access/state/offer.selectors';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'OfferModule/Feature/OfferBrowserPageComponent',
  component: OfferBrowserPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OfferBrowserPageModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule
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
              selector: getOscypekListView,
              value: {
                items: [testData.oscypek],
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery(),
              },
            },
            {
              selector: getAdditiveListView,
              value: {
                items: [testData.additive],
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery(),
              },
            },
            {
              selector: getOrderView,
              value: {
                items: [testData.orderItem],
                totalCost: 233.44,
              },
            },
          ],
        }),
      ],
    }),
    testData.addDefaultWrapper(),
  ],
} as Meta<OfferBrowserPageComponent>;

const Template: Story<OfferBrowserPageComponent> = (
  args: OfferBrowserPageComponent
) => ({
  props: args,
});

export const PrimaryF = Template.bind({});
PrimaryF.args = {};
