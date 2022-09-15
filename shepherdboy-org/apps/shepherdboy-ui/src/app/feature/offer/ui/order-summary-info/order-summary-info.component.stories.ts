import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { OrderSummaryInfoComponent } from './order-summary-info.component';
import * as testData from '@shepherdboy-org/test-utils';
import { OrderSummaryInfoModule } from './order-summary-info.module';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { getOrderView } from '../../data-access/state/offer.selectors';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'OfferModule/UI/OrderSummaryInfoComponent',
  component: OrderSummaryInfoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OrderSummaryInfoModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        OfferStateFacade,
        provideMockStore({
          initialState: initialOfferState,
          selectors: [
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
} as Meta<OrderSummaryInfoComponent>;

const Template: Story<OrderSummaryInfoComponent> = (
  args: OrderSummaryInfoComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
