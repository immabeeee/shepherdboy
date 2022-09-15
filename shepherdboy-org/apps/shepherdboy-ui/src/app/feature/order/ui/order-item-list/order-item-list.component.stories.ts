import { moduleMetadata, Story, Meta } from '@storybook/angular';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { OrderItemListComponent } from './order-item-list.component';
import { OrderItemListModule } from './order-item-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'OrderModule/UI/OrderItemListComponent',
  component: OrderItemListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        testData.StorybookWrapperModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OrderItemListModule,
        BrowserAnimationsModule,
      ],
    }),
    testData.addDefaultWrapper(),
  ],
} as Meta<OrderItemListComponent>;

const Template: Story<OrderItemListComponent> = (
  args: OrderItemListComponent
) => ({
  props: args,
});

export const WithEmptyOrderList = Template.bind({});
WithEmptyOrderList.args = {
  orderItems: [],
};

export const WithOrderList = Template.bind({});
WithOrderList.args = {
  orderItems: [testData.orderItem],
};

export const WithOrderListSecondary = Template.bind({});
WithOrderListSecondary.args = {
  orderItems: [{ ...testData.orderItem, additives: [] }],
};
