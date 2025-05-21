import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
  @Input() options: any[] = [];
  @Input() labelKey: string = 'label';
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = 'Wyszukaj...';
  @Input() selectAllLabel: string = 'Zaznacz wszystkie';

  @Output() selectionChange = new EventEmitter<any[]>();

  search = '';
  selected: any[] = [];
  dropdownOpen = false;

  get filteredOptions() {
    return this.options.filter(
      (opt) =>
        !this.selected.some(
          (sel) => sel[this.valueKey] === opt[this.valueKey]
        ) &&
        (!this.search ||
          (opt[this.labelKey]?.toLowerCase?.() ?? '').includes(
            this.search.toLowerCase()
          ))
    );
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.search = '';
  }

  selectOption(option: any) {
    this.selected = [...this.selected, option];
    this.selectionChange.emit(this.selected);
    this.search = '';
  }

  removeSelected(option: any) {
    this.selected = this.selected.filter(
      (sel) => sel[this.valueKey] !== option[this.valueKey]
    );
    this.selectionChange.emit(this.selected);
  }

  selectAll() {
    this.selected = [...this.options];
    this.selectionChange.emit(this.selected);
  }
}
