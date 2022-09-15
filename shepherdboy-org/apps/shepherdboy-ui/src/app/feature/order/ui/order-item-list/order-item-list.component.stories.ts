import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderItemListComponent } from './order-item-list.component';

export default {
  title: 'OrderItemListComponent',
  component: OrderItemListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderItemListComponent>;

const Template: Story<OrderItemListComponent> = (
  args: OrderItemListComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
