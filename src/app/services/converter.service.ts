import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  constructor() {}

  binaryToDecimal(binaryValue: string): string {
    const decimalValue = parseInt(binaryValue!, 2);
    return `${decimalValue}`;
  }

  decimalToBinary(decimalValue: number): string {
    let binary = '';

    while (decimalValue > 0) {
      if (decimalValue & 1) {
        binary = '1' + binary;
      } else {
        binary = '0' + binary;
      }
      decimalValue = decimalValue >> 1;
    }

    return binary;
  }
}
