import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UiMessageComponent } from './ui-message.component';

export default {
  title: 'UiMessageComponent',
  component: UiMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<UiMessageComponent>;

const Template: Story<UiMessageComponent> = (args: UiMessageComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  message: 'default message',
};
