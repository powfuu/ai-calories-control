import { DataInterceptorService } from './interceptors/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: DataInterceptorService, multi: true,
    },
  ],
})
export class CoreModule { }
