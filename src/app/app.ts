import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FEATURED_PROJECT, LINKS, PORTFOLIO_COPY, SELECTED_PROJECTS } from './core/portfolio.data';
import { Language, LocalizedText } from './core/models/portfolio.models';
import { OrnamentalTitle } from './shared/ornamental-title/ornamental-title';
import { ProjectPanel } from './shared/project-panel/project-panel';

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage, OrnamentalTitle, ProjectPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);

  protected readonly featuredProject = FEATURED_PROJECT;
  protected readonly projects = SELECTED_PROJECTS;
  protected readonly links = LINKS;
  protected readonly language = signal<Language>('en');
  protected readonly copy = computed(() => PORTFOLIO_COPY[this.language()]);

  protected localize(value: LocalizedText): string {
    return value[this.language()];
  }

  protected scrollToSection(event: MouseEvent, sectionId: string): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const target = this.document.getElementById(sectionId);
    if (!target) {
      return;
    }

    event.preventDefault();

    const browserWindow = this.document.defaultView;
    const reduceMotion =
      browserWindow?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const targetTop = target.getBoundingClientRect().top + (browserWindow?.scrollY ?? 0);

    browserWindow?.scrollTo({
      top: targetTop,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
    browserWindow?.history.pushState(null, '', `#${sectionId}`);
  }

  protected setLanguage(language: Language): void {
    this.language.set(language);
    this.document.documentElement.lang = language;
  }
}
