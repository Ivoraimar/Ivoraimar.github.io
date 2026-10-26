import { TestBed } from '@angular/core/testing';
import { App } from './app';

const authors = [
  'Alessandro Amato',
  'Giovanni Bartolomeo',
  'Harrie Bastiaansen',
  'Willem Datema',
  'Mattia Fogli',
  'Thomas Kudla',
  'Ivo Raimondi',
  'Pablo Sanchez',
  'Niranjan Suri',
];
const title = 'An Analysis of Stateful Service Migration for Tactical Edge Environments';

describe('Research publication integration', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  afterEach(() => {
    document.documentElement.lang = 'en';
  });

  it('places a separately labelled publication immediately after the thesis and before projects', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const panel = element.querySelector('.thesis-panel')?.nextElementSibling;

    expect(panel?.tagName).toBe('APP-PUBLICATION-PANEL');
    expect(panel?.nextElementSibling).toBeNull();
    expect(panel?.parentElement?.nextElementSibling?.id).toBe('projects');
    const publication = panel?.querySelector('article');
    expect(publication?.getAttribute('aria-labelledby')).toBe('milcom-2026-title');
    expect(publication?.querySelector('h3')?.textContent).toBe(title);
    expect(publication?.textContent).toContain('Research publication');
    expect(publication?.textContent).toContain('Accepted for publication · 2026');
    expect(publication?.textContent).toContain('Accepted manuscript · © 2026 IEEE');
    expect(element.querySelectorAll('nav a')).toHaveLength(4);
  });

  it('preserves the complete author order and subtly emphasizes only Ivo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(
      Array.from(element.querySelectorAll('.publication__author-name'), (author) =>
        author.textContent?.trim().replace(/,$/, ''),
      ),
    ).toEqual(authors);
    const emphasized = element.querySelectorAll('.publication__authors strong');
    expect(emphasized).toHaveLength(1);
    expect(emphasized[0].textContent?.replace(/,$/, '')).toBe('Ivo Raimondi');
  });

  it('opens the exact local accepted manuscript and official announcement safely in new tabs', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      element.querySelectorAll<HTMLAnchorElement>('.publication__actions a'),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'documents/milcom-2026-stateful-migration.pdf',
      'https://www.ce.cit.tum.de/cm/news-single-view/article/paper-on-analysis-of-stateful-service-migration-for-tactical-edge-environments-accepted-at-milcom-2026-workshop-on-disruptive-and-enabling-technologies-for-nato-and-other-coalition-operations/',
    ]);
    expect(links[0].hasAttribute('download')).toBe(false);
    expect(links[0].type).toBe('application/pdf');
    for (const link of links) {
      expect(link.target).toBe('_blank');
      expect(link.relList.contains('noopener')).toBe(true);
      expect(link.relList.contains('noreferrer')).toBe(true);
      expect(link.querySelector('.sr-only')?.textContent).toContain('(opens in a new tab)');
    }
  });

  it('localizes the publication in Spanish while preserving the official English title, venue and authors', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('button[lang="es"]')!.click();
    fixture.detectChanges();
    const publication = element.querySelector('.publication')!;

    expect(publication.textContent).toContain('Publicación científica');
    expect(publication.textContent).toContain('Aceptado para publicación · 2026');
    expect(publication.textContent).toContain('Investigación en coautoría');
    expect(publication.textContent).toContain('Leer artículo (PDF)');
    expect(publication.textContent).toContain('Comunicado de TUM');
    expect(publication.textContent).toContain('Manuscrito aceptado · © 2026 IEEE');
    expect(publication.querySelector('h3[lang="en"]')?.textContent).toBe(title);
    expect(publication.querySelector('.publication__venue[lang="en"]')?.textContent).toContain(
      'IEEE MILCOM 2026',
    );
    expect(publication.querySelector('.publication__venue')?.textContent).toContain(
      'Workshop on Disruptive and Enabling Technologies for NATO and other Coalition Operations',
    );
    expect(
      Array.from(publication.querySelectorAll('.publication__author-name'), (author) =>
        author.textContent?.trim().replace(/,$/, ''),
      ),
    ).toEqual(authors);
    for (const hint of publication.querySelectorAll('.sr-only')) {
      expect(hint.textContent).toContain('(se abre en una pestaña nueva)');
    }
  });

  it('corrects only the TUM employment range in both languages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('#work')?.textContent).toContain('Jan–Sep 2026');
    expect(element.querySelector('#about')?.textContent).toContain('January–September 2026');
    expect(element.querySelector('#about')?.textContent).toContain('October 2025–August 2026');
    expect(element.querySelector('#about')?.textContent).toContain('November 2026');
    element.querySelector<HTMLButtonElement>('button[lang="es"]')!.click();
    fixture.detectChanges();
    expect(element.querySelector('#work')?.textContent).toContain('ene–sep 2026');
    expect(element.querySelector('#about')?.textContent).toContain('enero–septiembre de 2026');
    expect(element.querySelector('#about')?.textContent).toContain(
      'octubre de 2025–agosto de 2026',
    );
    expect(element.querySelector('#about')?.textContent).toContain('noviembre de 2026');
  });
});
