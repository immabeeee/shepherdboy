import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as testData from '@shepherdboy-org/test-utils';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import {
  getAdditiveListView,
} from '../../data-access/state/offer.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { OscypekItemComponent } from './oscypek-item.component';
import { OscypekItemModule } from './oscypek-item.module';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'OfferModule/UI/OscypekItemComponent',
  component: OscypekItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OscypekItemModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule
      ],
      providers: [
        OfferService,
        OfferStateFacade,
        provideMockStore({
          initialState: initialOfferState,
          selectors: [
            {
              selector: getAdditiveListView,
              value: {
                items: [testData.additive],
                isLoading: false,
                error: null,
                listQuery: generateDefaultListQuery(),
              },
            },
          ],
        }),
      ],
    }),
  ],
} as Meta<OscypekItemComponent>;

const Template: Story<OscypekItemComponent> = (args: OscypekItemComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  oscypek: testData.oscypek,
};
