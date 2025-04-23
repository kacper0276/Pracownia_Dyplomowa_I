import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SetTitleDirective } from './directives/set-title.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [SpinnerComponent, SetTitleDirective, NotFoundComponent],
  imports: [CommonModule],
  exports: [CommonModule, SpinnerComponent, SetTitleDirective],
})
export class SharedModule {}
