import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SavannahComponent } from './component/savannah/savannah.component';
import { SavannahService } from './component/savannah/savannah.service';

@NgModule({
  declarations: [SavannahComponent],
  // exports: [SavannahComponent],
  // providers: [SavannahService, HttpClient],
  imports: [CommonModule],
})
export class SavannahModule {}
