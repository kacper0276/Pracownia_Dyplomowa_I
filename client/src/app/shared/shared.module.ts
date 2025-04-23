import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SetTitleDirective } from './directives/set-title.directive';

@NgModule({
  declarations: [SpinnerComponent, SetTitleDirective],
  imports: [CommonModule],
  exports: [CommonModule, SpinnerComponent, SetTitleDirective],
})
export class SharedModule {}
