import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderListFiltersComponent } from './order-list-filters.component';

export default {
  title: 'OrderListFiltersComponent',
  component: OrderListFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderListFiltersComponent>;

const Template: Story<OrderListFiltersComponent> = (
  args: OrderListFiltersComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
