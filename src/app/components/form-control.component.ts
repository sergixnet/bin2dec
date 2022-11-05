import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Origin } from '../models';

@Component({
  selector: 'app-form-control',
  template: `
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >{{ label }}</label
    >
    <input
      type="text"
      [formControl]="input"
      (blur)="onTouch()"
      (keydown)="onKeyDown($event)"
      class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
    />
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true }) formControlDirective:
    | FormControlDirective
    | undefined;
  @Input() label: string = '';
  @Input() formControlName!: string;
  @Input() numberType!: Origin;

  input!: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  onChange: any = () => {};

  onTouch: any = () => {};


  ngOnInit(): void {
    this.input = this.controlContainer.control?.get(
      this.formControlName
    ) as FormControl;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(input: string) {
    // this.input.setValue(input);
    this.formControlDirective?.valueAccessor?.writeValue(input);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.numberType === 'binary') {
      return ['0', '1', 'Backspace'].includes(event.key);
    }

    if (this.numberType === 'decimal') {
      return [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'Backspace',
      ].includes(event.key);
    }

    return false;
  }
}
