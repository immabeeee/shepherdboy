import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderListComponent } from './order-list.component';

export default {
  title: 'OrderListComponent',
  component: OrderListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderListComponent>;

const Template: Story<OrderListComponent> = (args: OrderListComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
