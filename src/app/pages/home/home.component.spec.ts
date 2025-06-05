import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('More Information Section', () => {
    let moreInfoButton: HTMLButtonElement;
    let moreInfoCollapseDiv: HTMLElement | null;

    beforeEach(() => {
      moreInfoButton = nativeElement.querySelector('button[data-bs-target="#moreInfoCollapse"]') as HTMLButtonElement;
      moreInfoCollapseDiv = nativeElement.querySelector('#moreInfoCollapse');
    });

    it(`should display the "Plus d'information" button`, () => {
      expect(moreInfoButton).toBeTruthy();
      expect(moreInfoButton.textContent).toContain("Plus d'information");
    });

    it('should have the collapsible div for more information', () => {
      expect(moreInfoCollapseDiv).toBeTruthy();
    });

    it('collapsible div should be initially collapsed', () => {
      expect(moreInfoCollapseDiv?.classList.contains('collapse')).toBe(true);
      expect(moreInfoCollapseDiv?.classList.contains('show')).toBe(false);
      expect(moreInfoButton.getAttribute('aria-expanded')).toBe('false');
    });

    it(`clicking "Plus d'information" button should toggle aria-expanded attribute`, () => {
      expect(moreInfoButton.getAttribute('aria-expanded')).toBe('false');
      moreInfoButton.click();
      fixture.detectChanges();
      // Note: We check aria-expanded as direct class manipulation by Bootstrap JS might not reflect immediately in test environment
      // For full JS behavior, e2e tests are more suitable.
      expect(moreInfoButton.getAttribute('aria-expanded')).toBe('true');

      moreInfoButton.click();
      fixture.detectChanges();
      expect(moreInfoButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('collapsible content should include the correct text and "Approfondir" button', () => {
      const paragraph = moreInfoCollapseDiv?.querySelector('p');
      const deepenButton = moreInfoCollapseDiv?.querySelector('button.btn-secondary');

      expect(paragraph).toBeTruthy();
      expect(paragraph?.textContent).toContain('Cette application vous permet de consulter les données météorologiques de différentes villes.');
      expect(deepenButton).toBeTruthy();
      expect(deepenButton?.textContent).toBe('Approfondir');
    });
  });
});
