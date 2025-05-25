import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SetTitleDirective } from './directives/set-title.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SpinnerComponent,
    SetTitleDirective,
    NotFoundComponent,
    TruncatePipe,
    ModalComponent,
    TimeAgoPipe,
    PostComponent,
    CommentComponent,
    OrderByPipe,
    MultiSelectComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    ModalComponent,
    SetTitleDirective,
    MatIconModule,
    TruncatePipe,
    TimeAgoPipe,
    PostComponent,
    MultiSelectComponent,
    MatIconModule,
    TranslateModule,
  ],
})
export class SharedModule {}
