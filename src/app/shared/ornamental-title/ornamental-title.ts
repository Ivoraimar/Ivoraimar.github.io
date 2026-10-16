import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ornamental-title',
  template: `
    <div class="heading-lockup">
      <div class="heading-copy">
        <p class="eyebrow">
          <span class="heading-number" aria-hidden="true">{{ number() }}</span
          >{{ eyebrow() }}
        </p>
        <h2 [id]="headingId()">{{ title() }}</h2>
      </div>
      <svg class="heading-accent" viewBox="0 0 104 16" aria-hidden="true" focusable="false">
        <path d="M0 7.5h84v1H0Z" />
        <path d="m96 2 6 6-6 6-6-6Z" />
      </svg>
    </div>
  `,
  styleUrl: './ornamental-title.scss',
})
export class OrnamentalTitle {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
  readonly number = input('');
}
