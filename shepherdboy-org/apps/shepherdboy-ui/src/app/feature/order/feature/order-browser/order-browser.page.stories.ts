import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OrderBrowserPageComponent } from './order-browser.page';

export default {
  title: 'OrderBrowserPageComponent',
  component: OrderBrowserPageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OrderBrowserPageComponent>;

const Template: Story<OrderBrowserPageComponent> = (
  args: OrderBrowserPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
