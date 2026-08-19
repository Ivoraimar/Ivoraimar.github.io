import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('creates the portfolio', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the primary sections and accessible navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Ivo');
    expect(element.querySelector('nav[aria-label="Primary navigation"]')).toBeTruthy();
    expect(element.querySelectorAll('main section').length).toBeGreaterThanOrEqual(5);
    expect(element.querySelector('a[href="#main-content"]')).toBeTruthy();
    expect(element.textContent).toContain('React');
    expect(element.textContent).not.toContain('Frontend');
  });

  it('renders approved project, thesis, and contact links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a'));
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('documents/live-migration-thesis.pdf');
    expect(hrefs).toContain('https://github.com/Ivoraimar/Lunar-Lander-DQN');
    expect(hrefs).toContain('https://github.com/orgs/TUM-Edge-IoT/repositories');
    expect(hrefs).toContain('https://www.linkedin.com/in/ivo-raimondi-7a2a5b292/');
    expect(hrefs.some((href) => href?.startsWith('mailto:'))).toBe(false);
  });

  it('uses Oakestra-specific positioning without decorative orbit circles', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.featured-work__identity p')?.textContent).toContain(
      'Lightweight orchestration across the edge–cloud continuum',
    );
    expect(element.querySelector('.featured-work__orbit')).toBeNull();
  });

  it('switches all visible content and the document language to Spanish', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const spanishButton = element.querySelector<HTMLButtonElement>('button[lang="es"]');

    spanishButton?.click();
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('es');
    expect(element.querySelector('.hero__kicker')?.textContent).toContain('Ingeniero de software');
    expect(element.querySelector('.hero__positioning')?.textContent).toContain(
      'sistemas distribuidos en el edge',
    );
    expect(element.querySelector('.featured-work__identity p')?.textContent).toContain(
      'Orquestación ligera de workloads',
    );
    expect(element.querySelector('#contact-title')?.textContent).toContain(
      'algo interesante entre manos',
    );
    expect(spanishButton?.getAttribute('aria-pressed')).toBe('true');

    document.documentElement.lang = 'en';
  });
});
