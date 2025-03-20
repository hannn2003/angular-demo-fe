import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { FilterFieldConfig } from './filter-common.config';
import { CardModule } from 'primeng/card';
import { Ripple } from 'primeng/ripple';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { KeyAction } from '@vks/app/shared/models';
import { UtilitiesService } from '@vks/app/services/utilities.service';

@Component({
  selector: 'vks-filter-common',
  templateUrl: './filter-common.component.html',
  styleUrl: './filter-common.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    Ripple,
    AccordionModule,
    AvatarModule,
    BadgeModule,
  ],
})
export class FilterCommonComponent implements OnChanges, OnInit {
  @Input() fieldsConfig: FilterFieldConfig[] = [];
  @Input() title = 'Bộ lọc tìm kiếm';

  @Output() filterEvent: EventEmitter<any> = new EventEmitter();
  @Output() clearFilterEvent: EventEmitter<any> = new EventEmitter();
  readonly KeyAction = KeyAction;

  filterForm: FormGroup;
  isFilterWhenInit = false;
  defaultFilterForm!: Record<string, string | Date>;

  constructor(
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.filterForm = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.fieldsConfig) {
    //     this.initializeForm()
    // }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    const formGroup: { [key: string]: any } = {};
    this.fieldsConfig.forEach((field) => {
      formGroup[field.name] = '';
      if (field.defaultValue) {
        this.isFilterWhenInit = true;
        formGroup[field.name] = field.defaultValue;
      }
    });
    this.filterForm = this.fb.group(formGroup);
    this.defaultFilterForm = formGroup;
  }

  onFilter() {
    this.utilitiesService.trimFormValues(this.filterForm);
    this.filterEvent.emit(this.filterForm.value);
  }

  onClearFilter() {
    this.filterForm.setValue(this.defaultFilterForm);
    this.clearFilterEvent.emit(this.filterForm.getRawValue());
  }
}
