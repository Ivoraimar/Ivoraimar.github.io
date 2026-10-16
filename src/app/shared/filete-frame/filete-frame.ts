import { Component } from '@angular/core';

@Component({
  selector: 'app-filete-frame',
  host: { 'aria-hidden': 'true' },
  template: `
    @for (edge of edges; track edge) {
      <div class="filete-edge" [class.filete-edge--bottom]="edge === 'bottom'">
        <svg class="filete-corner" viewBox="0 0 200 160" focusable="false">
          <path
            class="filete-stem"
            d="M8 154C43 148 48 110 52 82C58 45 82 8 124 6C145 5 171 5 200 5V9C171 9 146 9 124 10C87 12 66 46 60 83C54 117 44 148 8 154Z"
          />
          <path
            d="M54 103C56 72 42 62 28 71C21 77 25 88 35 87C17 97 7 77 20 66C34 54 49 63 54 78C52 55 50 40 42 31C55 30 58 38 59 48C63 34 64 19 58 10C74 20 76 34 66 53C84 33 98 37 100 48C82 46 66 72 54 103Z"
          />
          <path d="M61 18C49 14 48 8 54 1C62 6 65 12 61 18Z" />
          <path
            d="M77 43C101 20 124 22 143 31C162 41 178 35 177 27C176 23 172 22 171 21C185 14 192 32 179 40C164 50 147 39 133 32C113 22 93 31 77 43Z"
          />
          <path d="M61 101C69 73 91 52 111 45C125 40 127 52 118 58C98 64 78 77 61 101Z" />
        </svg>
        <div class="filete-rule">
          <span class="filete-line filete-line--joined"></span>
          <span class="filete-diamonds"><i></i><b></b><i></i></span>
          <span class="filete-line filete-line--tail"></span>
        </div>
      </div>
    }
  `,
  styleUrl: './filete-frame.scss',
})
export class FileteFrame {
  protected readonly edges = ['top', 'bottom'] as const;
}
