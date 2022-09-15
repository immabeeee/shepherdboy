import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AdditiveDialogComponent } from './additive-dialog.component';

export default {
  title: 'AdditiveDialogComponent',
  component: AdditiveDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<AdditiveDialogComponent>;

const Template: Story<AdditiveDialogComponent> = (
  args: AdditiveDialogComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
