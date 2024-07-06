import { Component, EventEmitter, Output, inject, ViewEncapsulation } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent {

  @Output() dateRangeSelected = new EventEmitter<{ fromDate: string, toDate: string }>();

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  translate = inject(TranslateService);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else if (this.fromDate && this.toDate) {
      this.toDate = null;
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.equals(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.filterDataByDate();
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  getDaysPerMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  filterDataByDate(): void {
    if (this.fromDate) {
      const fromDateStr = `${this.fromDate.year}-${String(this.fromDate.month).padStart(2, '0')}-${String(this.fromDate.day).padStart(2, '0')}`;
      let toDate = this.toDate ? new NgbDate(this.toDate.year, this.toDate.month, this.toDate.day) : this.fromDate;
      if (this.toDate) {
        toDate = this.addOneDay(toDate);
      }
      const toDateStr = `${toDate.year}-${String(toDate.month).padStart(2, '0')}-${String(toDate.day).padStart(2, '0')}`;
      this.dateRangeSelected.emit({ fromDate: fromDateStr, toDate: toDateStr });
    }
  }

  addOneDay(date: NgbDate): NgbDate {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    const daysInMonth = this.getDaysPerMonth(month, year);

    if (day > daysInMonth) {
      day = 1;
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
    return new NgbDate(year, month, day);
  }
}
