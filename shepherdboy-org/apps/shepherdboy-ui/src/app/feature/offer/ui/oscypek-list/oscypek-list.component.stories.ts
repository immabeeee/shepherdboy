import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import * as testData from '@shepherdboy-org/test-utils';
import { OfferStateFacade } from '../../data-access/state/offer.facade';
import { provideMockStore } from '@ngrx/store/testing';
import { initialOfferState } from '../../data-access/state/offer.reducer';
import { getAdditiveListView } from '../../data-access/state/offer.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { generateDefaultListQuery } from '@shepherdboy-org/api-interfaces';
import { OfferService } from '../../data-access/offer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OscypekListModule } from './oscypek-list.module';
import { OscypekListComponent } from './oscypek-list.component';
import { of } from 'rxjs';

export default {
  title: 'OfferModule/UI/OscypekListComponent',
  component: OscypekListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
        OscypekListModule,
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
} as Meta<OscypekListComponent>;

const Template: Story<OscypekListComponent> = (args: OscypekListComponent) => ({
  props: args,
});

export const WithList = Template.bind({});
WithList.args = {
  osycpekListView$: of({
    items: [
      testData.oscypek,
      testData.oscypek,
      testData.oscypek,
      testData.oscypek,
    ],
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  osycpekListView$: of({
    items: null,
    isLoading: true,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithEmptyList = Template.bind({});
WithLoading.args = {
  osycpekListView$: of({
    items: [],
    isLoading: false,
    error: null,
    listQuery: generateDefaultListQuery(),
  }),
};

export const WithError = Template.bind({});
WithError.args = {
  osycpekListView$: of({
    items: null,
    isLoading: false,
    error: 'test error',
    listQuery: generateDefaultListQuery(),
  }),
};
