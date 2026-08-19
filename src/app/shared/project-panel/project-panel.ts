import { Component, input } from '@angular/core';
import { Language, Project, ProjectPanelLabels } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.html',
  styleUrl: './project-panel.scss',
})
export class ProjectPanel {
  readonly project = input.required<Project>();
  readonly index = input.required<number>();
  readonly language = input.required<Language>();
  readonly labels = input.required<ProjectPanelLabels>();
}
