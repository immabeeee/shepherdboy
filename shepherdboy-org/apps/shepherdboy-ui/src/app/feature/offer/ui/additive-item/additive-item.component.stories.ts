import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AdditiveItemComponent } from './additive-item.component';
import { AdditiveItemModule } from './additive-item.module';
import * as testData from '@shepherdboy-org/test-utils';
import { TranslateTestingModule } from 'ngx-translate-testing';

export default {
  title: 'OfferModule/UI/AdditiveItemComponent',
  component: AdditiveItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        AdditiveItemModule,
      ],
    }),
  ],
} as Meta<AdditiveItemComponent>;

const Template: Story<AdditiveItemComponent> = (
  args: AdditiveItemComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  isActive: false,
  additive: testData.additive,
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  additive: testData.additive,
};
