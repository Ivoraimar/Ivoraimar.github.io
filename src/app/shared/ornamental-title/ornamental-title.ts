import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ornamental-title',
  template: `
    <div class="heading-lockup">
      <svg class="heading-flourish heading-flourish--left" viewBox="0 0 152 48" aria-hidden="true">
        <path class="flourish-stem" d="M148 25C112 8 105 42 73 23 51 10 42 7 25 13 10 18 7 32 18 38 30 44 43 35 39 27" />
        <path class="flourish-leaf" d="M73 23C60 25 52 36 51 44 62 44 71 35 73 23ZM48 11C40 4 34 1 31 1 33 8 39 13 48 11Z" />
        <circle cx="19" cy="27" r="3" />
      </svg>
      <div class="heading-copy">
        <p class="eyebrow">{{ eyebrow() }}</p>
        <h2 [id]="headingId()">{{ title() }}</h2>
      </div>
      <svg class="heading-flourish heading-flourish--right" viewBox="0 0 152 48" aria-hidden="true">
        <path class="flourish-stem" d="M148 25C112 8 105 42 73 23 51 10 42 7 25 13 10 18 7 32 18 38 30 44 43 35 39 27" />
        <path class="flourish-leaf" d="M73 23C60 25 52 36 51 44 62 44 71 35 73 23ZM48 11C40 4 34 1 31 1 33 8 39 13 48 11Z" />
        <circle cx="19" cy="27" r="3" />
      </svg>
    </div>
  `,
  styleUrl: './ornamental-title.scss',
})
export class OrnamentalTitle {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly headingId = input.required<string>();
}
