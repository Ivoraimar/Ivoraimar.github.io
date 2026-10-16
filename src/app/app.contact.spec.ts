import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';

describe('Contact options', () => {
  let originalClipboard: PropertyDescriptor | undefined;

  beforeEach(async () => {
    originalClipboard = Object.getOwnPropertyDescriptor(window.navigator, 'clipboard');
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(window.navigator, 'clipboard', originalClipboard);
    } else {
      Reflect.deleteProperty(window.navigator, 'clipboard');
    }
    document.documentElement.lang = 'en';
  });

  it('keeps email and CV links absent until configured', async () => {
    const fixture = TestBed.createComponent(App);
    Object.defineProperty(fixture.componentInstance, 'contact', {
      value: { email: null, cvUrl: null },
    });
    await fixture.whenStable();
    const section = (fixture.nativeElement as HTMLElement).querySelector('#contact');

    expect(section?.querySelector('.contact__email')).toBeNull();
    expect(section?.querySelector('[role="status"]')).toBeNull();
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
    const email = element.querySelector<HTMLButtonElement>('.contact__email');
    const cv = element.querySelector<HTMLAnchorElement>('#contact a[download]');

    expect(email?.type).toBe('button');
    expect(email?.getAttribute('aria-label')).toContain('approved@example.test');
    expect(email?.textContent).toContain('Copy email');
    expect(cv?.getAttribute('href')).toBe('documents/final-cv.pdf');
    expect(cv?.getAttribute('download')).toBe('Ivo-Raimondi-CV.pdf');
    expect(cv?.getAttribute('type')).toBe('application/pdf');
    expect(cv?.textContent).toContain('Download CV (PDF)');

    element.querySelector<HTMLButtonElement>('button[lang="es"]')?.click();
    fixture.detectChanges();

    expect(email?.textContent).toContain('Copiar email');
    expect(cv?.textContent).toContain('Descargar CV (PDF en inglés)');
  });

  it('copies the configured email and announces success only after the write completes', async () => {
    let finishCopy: (() => void) | undefined;
    const writeText = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finishCopy = resolve;
        }),
    );
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector<HTMLButtonElement>('.contact__email')!;
    const status = element.querySelector('[role="status"]');

    button.click();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledExactlyOnceWith('ivo40527@gmail.com');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(status?.textContent?.trim()).toBe('');
    button.click();
    expect(writeText).toHaveBeenCalledTimes(1);

    finishCopy?.();
    await Promise.resolve();
    await fixture.whenStable();

    expect(button.getAttribute('aria-disabled')).toBe('false');
    expect(status?.textContent).toContain('Email copied to clipboard.');
    expect(status?.getAttribute('aria-live')).toBe('polite');

    element.querySelector<HTMLButtonElement>('button[lang="es"]')?.click();
    fixture.detectChanges();
    expect(status?.textContent).toContain('Email copiado al portapapeles.');
  });

  it.each(['unavailable', 'denied'] as const)(
    'shows the address for manual copying when clipboard access is %s',
    async (failure) => {
      Object.defineProperty(window.navigator, 'clipboard', {
        configurable: true,
        value:
          failure === 'unavailable'
            ? undefined
            : { writeText: vi.fn().mockRejectedValue(new Error('Clipboard access denied')) },
      });
      const fixture = TestBed.createComponent(App);
      await fixture.whenStable();
      const element = fixture.nativeElement as HTMLElement;
      const button = element.querySelector<HTMLButtonElement>('.contact__email')!;

      button.click();
      await fixture.whenStable();

      const status = element.querySelector('[role="status"]');
      expect(button.getAttribute('aria-disabled')).toBe('false');
      expect(status?.textContent).toContain('Couldn’t copy automatically.');
      expect(status?.textContent).toContain('ivo40527@gmail.com');
      expect(status?.textContent).not.toContain('Email copied to clipboard.');

      element.querySelector<HTMLButtonElement>('button[lang="es"]')?.click();
      fixture.detectChanges();
      expect(status?.textContent).toContain('No se pudo copiar automáticamente.');
    },
  );
});
