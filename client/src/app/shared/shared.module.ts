import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SetTitleDirective } from './directives/set-title.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SetTitleDirective,
    NotFoundComponent,
    TruncatePipe,
    ModalComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    CommonModule,
    SpinnerComponent,
    ModalComponent,
    SetTitleDirective,
    MatIconModule,
    TruncatePipe,
  ],
})
export class SharedModule {}
