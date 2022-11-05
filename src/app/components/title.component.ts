import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div class="text-center mt-7">
      <h2 class="text-4xl tracking-tight">{{ title }}</h2>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
