import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Origin } from '../models';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-form',
  template: `
    <div class="flex justify-center my-2 mx-4 md:mx-0">
      <form
        [formGroup]="converterForm"
        class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-full px-3 mb-6">
            <app-form-control
              label="Binary"
              formControlName="binary"
              numberType="binary"
              (input)="updateOrigin('binary')"
            ></app-form-control>
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <app-form-control
              label="Decimal"
              formControlName="decimal"
              numberType="decimal"
              (input)="updateOrigin('decimal')"
            ></app-form-control>
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <button
              [disabled]="!canConvert()"
              (click)="onConvert()"
              class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500 focus:text-pink-700"
            >
              Convert!
            </button>
          </div>
          <p *ngIf="!canConvert()" class="text-center text-red-500 w-full">
            You must enter some value!
          </p>
        </div>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  converterForm!: FormGroup;
  private origin: Origin = 'binary';

  constructor(private converter: ConverterService) {}

  ngOnInit(): void {
    this.converterForm = new FormGroup({
      binary: new FormControl('0', [Validators.required]),
      decimal: new FormControl('0', [Validators.required]),
    });
  }

  get binary() {
    return this.converterForm.get('binary');
  }

  get decimal() {
    return this.converterForm.get('decimal');
  }

  onConvert(): void {
    if (this.origin === 'binary') {
      const decimalValue = this.converter.binaryToDecimal(this.binary?.value);
      this.converterForm.get('decimal')?.setValue(`${decimalValue}`);
    } else {
      const binaryValue = this.converter.decimalToBinary(+this.decimal?.value);
      this.converterForm.get('binary')?.setValue(`${binaryValue}`);
    }
  }

  updateOrigin(origin: Origin) {
    this.origin = origin;
  }

  canConvert(): boolean {
    return this.binary!?.valid || this.decimal!?.valid;
  }
}
