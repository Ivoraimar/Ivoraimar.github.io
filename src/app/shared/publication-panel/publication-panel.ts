import { Component, input } from '@angular/core';
import { Language, LocalizedText, Publication } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-publication-panel',
  templateUrl: './publication-panel.html',
  styleUrl: './publication-panel.scss',
})
export class PublicationPanel {
  readonly publication = input.required<Publication>();
  readonly language = input.required<Language>();
  readonly opensNewTab = input.required<string>();

  protected localize(value: LocalizedText): string {
    return value[this.language()];
  }
}
