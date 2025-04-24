import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SetTitleDirective } from './directives/set-title.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SpinnerComponent, SetTitleDirective, NotFoundComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule, SpinnerComponent, SetTitleDirective],
})
export class SharedModule {}
