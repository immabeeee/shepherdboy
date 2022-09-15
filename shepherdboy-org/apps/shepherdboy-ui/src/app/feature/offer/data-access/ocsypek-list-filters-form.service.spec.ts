import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Filter,
  OscypekSize,
  OscypekType,
} from '@shepherdboy-org/api-interfaces';
import * as testData from '@shepherdboy-org/test-utils';
import { OscypekListFiltersFormService } from './ocsypek-list-filters-form.service';

describe('OscypekListFiltersFormService', () => {
  let service: OscypekListFiltersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule],
      providers: [OscypekListFiltersFormService, FormBuilder],
    }).compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(OscypekListFiltersFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an empty form', () => {
    // given

    // when
    const form = service.createEmptyForm();

    // then
    expect(form).toBeTruthy();
    expect(form.invalid).toBe(false);
    expect(form.get('size')).toBeTruthy();
    expect(form.get('size')?.value).toBe(null);
    expect(form.get('size')?.disabled).toBe(false);
    expect(form.get('size')?.valid).toBe(true);
    expect(form.get('size')?.errors).toEqual(null);
    expect(form.get('type')).toBeTruthy();
    expect(form.get('type')?.value).toBe(null);
    expect(form.get('type')?.disabled).toBe(false);
    expect(form.get('type')?.valid).toBe(true);
    expect(form.get('type')?.errors).toEqual(null);
  });

  it('should fill in an empty form', () => {
    // given
    const form1 = service.createEmptyForm();
    const form2 = service.createEmptyForm();
    const form3 = service.createEmptyForm();
    const filters1: Filter[] = [];
    const filters2: Filter[] = [
      new Filter('size', OscypekSize.LARGE),
      new Filter('type', OscypekType.NON_SMOKED),
    ];
    const filters3: Filter[] = [new Filter('size', OscypekSize.MEDIUM)];

    // when
    service.fillForm(form1, filters1);
    service.fillForm(form2, filters2);
    service.fillForm(form3, filters3);

    // then
    expect(form1).toBeTruthy();
    expect(form1.invalid).toBe(false);
    expect(form1.get('size')).toBeTruthy();
    expect(form1.get('size')?.value).toBe(undefined);
    expect(form1.get('size')?.disabled).toBe(false);
    expect(form1.get('size')?.valid).toBe(true);
    expect(form1.get('size')?.errors).toEqual(null);
    expect(form1.get('type')).toBeTruthy();
    expect(form1.get('type')?.value).toBe(undefined);
    expect(form1.get('type')?.disabled).toBe(false);
    expect(form1.get('type')?.valid).toBe(true);
    expect(form1.get('type')?.errors).toEqual(null);

    expect(form2.invalid).toBe(false);
    expect(form2.get('size')).toBeTruthy();
    expect(form2.get('size')?.value).toBe(OscypekSize.LARGE);
    expect(form2.get('size')?.disabled).toBe(false);
    expect(form2.get('size')?.valid).toBe(true);
    expect(form2.get('size')?.errors).toEqual(null);
    expect(form2.get('type')).toBeTruthy();
    expect(form2.get('type')?.value).toBe(OscypekType.NON_SMOKED);
    expect(form2.get('type')?.disabled).toBe(false);
    expect(form2.get('type')?.valid).toBe(true);
    expect(form2.get('type')?.errors).toEqual(null);

    expect(form3.invalid).toBe(false);
    expect(form3.get('size')).toBeTruthy();
    expect(form3.get('size')?.value).toBe(OscypekSize.MEDIUM);
    expect(form3.get('size')?.disabled).toBe(false);
    expect(form3.get('size')?.valid).toBe(true);
    expect(form3.get('size')?.errors).toEqual(null);
    expect(form3.get('type')).toBeTruthy();
    expect(form3.get('type')?.value).toBe(undefined);
    expect(form3.get('type')?.disabled).toBe(false);
    expect(form3.get('type')?.valid).toBe(true);
    expect(form3.get('type')?.errors).toEqual(null);
  });
});
