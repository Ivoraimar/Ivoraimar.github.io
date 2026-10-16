import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
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
    expect(element.querySelector('.hero')?.nextElementSibling?.id).toBe('about');
    expect(element.querySelector('a[href="#main-content"]')).toBeTruthy();
    expect(element.querySelector('.thesis-panel__copy')?.textContent).toContain('CRIU');
    expect(element.querySelector('.thesis-panel__copy')?.textContent).toContain('WebAssembly');
    expect(element.textContent).toContain('React');
    expect(element.textContent).not.toContain('Frontend');
  });

  it('animates the page position when an internal navigation link is activated', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const workSection = element.querySelector<HTMLElement>('#work');
    const workLink = element.querySelector<HTMLAnchorElement>('nav a[href="#work"]');
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const getBoundingClientRect = vi
      .spyOn(workSection!, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(0, 900));
    const requestAnimationFrame = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(window.performance.now() + 1_000);
        return 1;
      });

    workLink?.click();

    expect(requestAnimationFrame).toHaveBeenCalled();
    expect(scrollTo).toHaveBeenLastCalledWith(0, 900);
    expect(window.location.hash).toBe('#work');
    expect(document.activeElement).toBe(workSection);

    requestAnimationFrame.mockRestore();
    getBoundingClientRect.mockRestore();
    scrollTo.mockRestore();
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('renders approved project, thesis, and contact links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(element.querySelectorAll('a'));
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs).toContain('documents/live-migration-thesis.pdf');
    expect(hrefs).toContain('documents/Final%20Report%20Rover%20-%20Group%20BOM.pdf');
    expect(hrefs).toContain(
      'https://balancer.bbb.rbg.tum.de/playback/video/43029df94cc085c4fbc2063bc08c0549bab493cd-1781698607530/',
    );
    expect(hrefs).toContain('https://github.com/Ivoraimar/Lunar-Lander-DQN');
    expect(hrefs).toContain('https://github.com/orgs/TUM-Edge-IoT/repositories');
    expect(hrefs).toContain('https://www.linkedin.com/in/ivo-raimondi-7a2a5b292/');
    expect(element.querySelector('.contact__email')?.getAttribute('aria-label')).toContain(
      'ivo40527@gmail.com',
    );
    expect(hrefs).toContain('documents/ivo-raimondi-cv.pdf');
  });

  it('respects reduced motion when navigating and still moves keyboard focus', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const target = element.querySelector<HTMLElement>('#projects')!;
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const bounds = vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 1200));
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia });

    try {
      element.querySelector<HTMLAnchorElement>('nav a[href="#projects"]')?.click();

      expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
      expect(scrollTo).toHaveBeenLastCalledWith(0, 1200);
      expect(document.activeElement).toBe(target);
      expect(window.location.hash).toBe('#projects');
    } finally {
      scrollTo.mockRestore();
      bounds.mockRestore();
      if (originalMatchMedia) {
        Object.defineProperty(window, 'matchMedia', originalMatchMedia);
      } else {
        Reflect.deleteProperty(window, 'matchMedia');
      }
      window.history.replaceState(null, '', window.location.pathname);
    }
  });

  it('presents Oakestra as cross-stack engineering work without decorative orbit circles', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const featuredWork = element.querySelector('.featured-work');

    expect(element.querySelector('.featured-work__identity p')?.textContent).toContain(
      'Lightweight orchestration across the edge–cloud continuum',
    );
    expect(featuredWork?.textContent).toContain('Angular dashboard');
    expect(featuredWork?.textContent).toContain('Prometheus');
    expect(featuredWork?.textContent).toContain('Grafana');
    expect(featuredWork?.textContent).toContain('Docker Compose');
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
