import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { AddPostComponent } from './components/add-post/add-post.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPostComponent],
  imports: [SharedModule, PostsRoutingModule, ReactiveFormsModule],
  exports: [AddPostComponent],
})
export class PostsModule {}
