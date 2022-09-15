import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderDetailsDialogComponent } from './order-details-dialog.component';

export default {
  title: 'OrderDetailsDialogComponent',
  component: OrderDetailsDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderDetailsDialogComponent>;

const Template: Story<OrderDetailsDialogComponent> = (
  args: OrderDetailsDialogComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
