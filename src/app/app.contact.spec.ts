import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('Contact options', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('keeps email and CV links absent until configured', async () => {
    const fixture = TestBed.createComponent(App);
    Object.defineProperty(fixture.componentInstance, 'contact', {
      value: { email: null, cvUrl: null },
    });
    await fixture.whenStable();
    const section = (fixture.nativeElement as HTMLElement).querySelector('#contact');

    expect(section?.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(section?.querySelector('a[download]')).toBeNull();
    expect(section?.querySelectorAll('.contact__actions a')).toHaveLength(2);
  });

  it('renders configured contact options with bilingual labels and a PDF download', async () => {
    const fixture = TestBed.createComponent(App);
    Object.defineProperty(fixture.componentInstance, 'contact', {
      value: { email: 'approved@example.test', cvUrl: 'documents/final-cv.pdf' },
    });
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const email = element.querySelector<HTMLAnchorElement>('#contact a[href^="mailto:"]');
    const cv = element.querySelector<HTMLAnchorElement>('#contact a[download]');

    expect(email?.getAttribute('href')).toBe('mailto:approved@example.test');
    expect(email?.textContent).toContain('Email me');
    expect(cv?.getAttribute('href')).toBe('documents/final-cv.pdf');
    expect(cv?.getAttribute('download')).toBe('Ivo-Raimondi-CV.pdf');
    expect(cv?.getAttribute('type')).toBe('application/pdf');
    expect(cv?.textContent).toContain('Download CV (PDF)');

    element.querySelector<HTMLButtonElement>('button[lang="es"]')?.click();
    fixture.detectChanges();

    expect(email?.textContent).toContain('Escribime por email');
    expect(cv?.textContent).toContain('Descargar CV (PDF)');
  });
});
