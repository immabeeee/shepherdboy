import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OfferBrowserPageComponent } from './offer-browser.page';

export default {
  title: 'OfferBrowserPageComponent',
  component: OfferBrowserPageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OfferBrowserPageComponent>;

const Template: Story<OfferBrowserPageComponent> = (
  args: OfferBrowserPageComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
