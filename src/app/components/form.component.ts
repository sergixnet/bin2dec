import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
              [readonly]="true"
              class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            />
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <button
              (click)="onConvert()"
              class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500 focus:text-pink-700"
            >
              Convert!
            </button>
          </div>
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

  constructor() {}

  ngOnInit(): void {
    this.converterForm = new FormGroup({
      binary: new FormControl('', [Validators.required]),
      decimal: new FormControl(''),
    });

    this.binarySubscription = this.binary?.valueChanges.subscribe((value) => {
      const binaryValue = value.replace(/[^10]+/g, '');
      this.binary?.setValue(binaryValue);
    });
  }

  get binary() {
    return this.converterForm.get('binary');
  }

  ngOnDestroy(): void {
    this.binarySubscription?.unsubscribe();
  }

  onConvert(): void {
    const binaryValue = this.binary?.value;
    const decimalValue = parseInt(binaryValue!, 2);

    this.converterForm.get('decimal')?.setValue(`${decimalValue}`);
  }
}
