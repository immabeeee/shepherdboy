import { moduleMetadata, Story, Meta } from '@storybook/angular';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { OfferService } from '../../data-access/offer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  getCreateOrderView,
  getOrderView,
  getShippingDetailsView,
} from '../../data-access/state/offer.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailsPageModule } from './order-details.page.module';
import { OrderDetailsPageComponent } from './order-details.page';

export default {
  title: 'OfferModule/Feature/OrderDetailsPageComponent',
  component: OrderDetailsPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OrderDetailsPageModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
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
              selector: getCreateOrderView,
              value: {
                isSuccess: false,
                isLoading: false,
                error: null,
              },
            },
            {
              selector: getOrderView,
              value: {
                items: [testData.orderItem],
                totalCost: 233.44,
              },
            },
            {
              selector: getShippingDetailsView,
              value: {
                details: testData.shippingDetails,
              },
            },
          ],
        }),
      ],
    }),
    testData.addDefaultWrapper(),
  ],
} as Meta<OrderDetailsPageComponent>;

const Template: Story<OrderDetailsPageComponent> = (
  args: OrderDetailsPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
