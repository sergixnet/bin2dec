import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConverterService } from '../services/converter.service';

type Origin = 'binary' | 'decimal';
@Component({
  selector: 'app-form',
  template: `
    <div class="text-center mt-7">
      <h2 class="text-4xl tracking-tight">Binary to Decimal converter</h2>
    </div>
    <div class="flex justify-center my-2 mx-4 md:mx-0">
      <form
        [formGroup]="converterForm"
        class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="binary"
              >Binary</label
            >
            <input
              id="binary"
              formControlName="binary"
              class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="text"
              (input)="updateOrigin('binary')"
            />
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="decimal"
              >Decimal</label
            >
            <input
              formControlName="decimal"
              class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              type="number"
              (input)="updateOrigin('decimal')"
            />
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
  private binarySubscription: Subscription | undefined;
  private origin: Origin = 'binary';

  constructor(private converter: ConverterService) {}

  ngOnInit(): void {
    this.converterForm = new FormGroup({
      binary: new FormControl(0, [Validators.required]),
      decimal: new FormControl(0, [Validators.required]),
    });

    this.binarySubscription = this.binary?.valueChanges.subscribe((value) => {
      const binaryValue = value.replace(/[^10]/g, '');
      this.binary?.setValue(binaryValue, { emitEvent: false });
    });
  }

  get binary() {
    return this.converterForm.get('binary');
  }

  get decimal() {
    return this.converterForm.get('decimal');
  }

  ngOnDestroy(): void {
    this.binarySubscription?.unsubscribe();
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
