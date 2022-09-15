import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { NavbarModule } from './navbar.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as testData from '@shepherdboy-org/test-utils';

export default {
  title: 'UI/NavbarComponent',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        NavbarModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        RouterTestingModule.withRoutes([]),
      ],
    }),
  ],
} as Meta<NavbarComponent>;

const Template: Story<NavbarComponent> = (args: NavbarComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
