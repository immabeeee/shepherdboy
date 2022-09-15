import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AdditiveItemComponent } from './additive-item.component';
import { AdditiveItemModule } from './additive-item.module';
import * as testData from '@shepherdboy-org/test-utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

let fixture: ComponentFixture<AdditiveItemComponent>;
let component: AdditiveItemComponent;

describe('AdditiveItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditiveItemComponent],
      imports: [
        AdditiveItemModule,
        TranslateTestingModule.withTranslations('us', testData.TRANSLATIONS_US),
      ],
      providers: [],
    })
      .overrideComponent(AdditiveItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AdditiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should not display an additive item', () => {
    // given
    component.additive = undefined;
    component.isActive = false;
    fixture.detectChanges();

    // when
    const additiveItem: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item"]')
    )?.nativeElement;
    const additiveItemImage: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item-image"]')
    )?.nativeElement;
    const additiveItemName: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h3[data-test-id="org-additive-item-name"]')
    )?.nativeElement;
    const additiveItemPrice: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h2[data-test-id="org-additive-item-price"]')
    )?.nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(additiveItem).not.toBeDefined();
    expect(additiveItemImage).not.toBeDefined();
    expect(additiveItemName).not.toBeDefined();
    expect(additiveItemPrice).not.toBeDefined();
  });

  it('should display an inactive additive item', () => {
    // given
    component.additive = testData.additive;
    component.isActive = false;
    fixture.detectChanges();

    // when
    const additiveItem: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item"]')
    ).nativeElement;
    const additiveItemImage: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item-image"]')
    ).nativeElement;
    const additiveItemName: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h3[data-test-id="org-additive-item-name"]')
    ).nativeElement;
    const additiveItemPrice: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h2[data-test-id="org-additive-item-price"]')
    ).nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(additiveItem).toBeDefined();
    expect(additiveItem.classList).not.toContain('active');
    expect(additiveItemImage).toBeDefined();
    expect(additiveItemImage.innerHTML).toContain('No image');
    expect(additiveItemName).toBeDefined();
    expect(additiveItemName.textContent).toContain(testData.additive.name);
    expect(additiveItemPrice).toBeDefined();
    expect(additiveItemPrice.textContent).toContain(
      testData.additive.price.toString()
    );
  });

  it('should display an active additive item', () => {
    // given
    component.additive = testData.additive;
    component.isActive = true;
    fixture.detectChanges();

    // when
    const additiveItem: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item"]')
    ).nativeElement;
    const additiveItemImage: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="org-additive-item-image"]')
    ).nativeElement;
    const additiveItemName: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h3[data-test-id="org-additive-item-name"]')
    ).nativeElement;
    const additiveItemPrice: HTMLHeadingElement = fixture.debugElement.query(
      By.css('h2[data-test-id="org-additive-item-price"]')
    ).nativeElement;

    // then
    expect(component).toBeTruthy();
    expect(additiveItem).toBeDefined();
    expect(additiveItem.classList).toContain('active');
    expect(additiveItemImage).toBeDefined();
    expect(additiveItemImage.innerHTML).toContain('No image');
    expect(additiveItemName).toBeDefined();
    expect(additiveItemName.textContent).toContain(testData.additive.name);
    expect(additiveItemPrice).toBeDefined();
    expect(additiveItemPrice.textContent).toContain(
      testData.additive.price.toString()
    );
  });
});
