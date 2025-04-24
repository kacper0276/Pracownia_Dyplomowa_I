import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
