import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Ripple, RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Button, ButtonDirective, ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { UpperCaseInputDisplayDirective } from './shared/directive/uppercase-input-display.directive';
import { InputOtpModule } from 'primeng/inputotp';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ToastModule,
    HttpClientModule,
    RippleModule,
    SidebarModule,
    ButtonModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    Button,
    DialogModule,
    Ripple,
    ButtonDirective,
    InputNumberModule,
    InputOtpModule,
    UpperCaseInputDisplayDirective,
    SelectButtonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
