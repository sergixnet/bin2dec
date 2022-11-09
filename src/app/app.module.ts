import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';
import { TitleComponent } from './components/title.component';
import { FormControlComponent } from './components/form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TitleComponent,
    FormControlComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
