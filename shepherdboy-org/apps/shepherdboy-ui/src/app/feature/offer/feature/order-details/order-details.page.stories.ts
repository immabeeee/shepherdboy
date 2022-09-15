import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderDetailsPageComponent } from './order-details.page';

export default {
  title: 'OrderDetailsPageComponent',
  component: OrderDetailsPageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderDetailsPageComponent>;

const Template: Story<OrderDetailsPageComponent> = (
  args: OrderDetailsPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
