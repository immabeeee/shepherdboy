import { moduleMetadata, Story, Meta } from '@storybook/angular';
import * as testData from '@shepherdboy-org/test-utils';
import { OrderItemComponent } from './order-item.component';
import { OfferService } from '../../data-access/offer.service';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { OrderItemModule } from './order-item.module';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { TranslateTestingModule } from 'ngx-translate-testing';

export default {
  title: 'OfferModule/UI/OrderItemComponent',
  component: OrderItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OrderItemModule,
        BrowserAnimationsModule,
      ],
      providers: [
        OfferService,
        OfferStateFacade,
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
} as Meta<OrderItemComponent>;

const Template: Story<OrderItemComponent> = (args: OrderItemComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  isSecondary: false,
  orderItem: testData.orderItem,
};

export const Secondary = Template.bind({});
Secondary.args = {
  isSecondary: true,
  orderItem: testData.orderItem,
};
