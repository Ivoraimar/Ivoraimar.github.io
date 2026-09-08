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
  private activeScrollFrame: number | undefined;

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
    if (!browserWindow) {
      return;
    }

    const reduceMotion =
      browserWindow.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const startTop = browserWindow.scrollY;
    const targetTop = target.getBoundingClientRect().top + startTop;
    const distance = targetTop - startTop;

    if (this.activeScrollFrame !== undefined) {
      browserWindow.cancelAnimationFrame(this.activeScrollFrame);
      this.activeScrollFrame = undefined;
    }

    if (reduceMotion || Math.abs(distance) < 1) {
      browserWindow.scrollTo(0, targetTop);
    } else {
      const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.25));
      const startTime = browserWindow.performance.now();

      const animateScroll = (currentTime: number): void => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        browserWindow.scrollTo(0, startTop + distance * easedProgress);

        if (progress < 1) {
          this.activeScrollFrame = browserWindow.requestAnimationFrame(animateScroll);
        } else {
          this.activeScrollFrame = undefined;
        }
      };

      this.activeScrollFrame = browserWindow.requestAnimationFrame(animateScroll);
    }

    browserWindow.history.pushState(null, '', `#${sectionId}`);
  }

  protected setLanguage(language: Language): void {
    this.language.set(language);
    this.document.documentElement.lang = language;
  }
}
