import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as testData from '@shepherdboy-org/test-utils';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { getOscypekListView } from '../../data-access/state/offer.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OscypekListFiltersComponent } from './oscypek-list-filters.component';
import { OscypekListFiltersModule } from './oscypek-list-filters.module';

export default {
  title: 'OfferModule/UI/OscypekListFiltersComponent',
  component: OscypekListFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OscypekListFiltersModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers: [
        OfferService,
        OfferStateFacade,
        provideMockStore({
          initialState: initialOfferState,
          selectors: [
            {
              selector: getOscypekListView,
              value: {
                items: [testData.oscypek],
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
} as Meta<OscypekListFiltersComponent>;

const Template: Story<OscypekListFiltersComponent> = (
  args: OscypekListFiltersComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
