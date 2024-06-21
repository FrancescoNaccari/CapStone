import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {
// 	calendar = inject(NgbCalendar);
// 	formatter = inject(NgbDateParserFormatter);

// 	hoveredDate: NgbDate | null = null;
// 	fromDate: NgbDate | null = this.calendar.getToday();
// 	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

// 	onDateSelection(date: NgbDate) {
// 		if (!this.fromDate && !this.toDate) {
// 			this.fromDate = date;
// 		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
// 			this.toDate = date;
// 		} else {
// 			this.toDate = null;
// 			this.fromDate = date;
// 		}
// 	}

// 	isHovered(date: NgbDate) {
// 		return (
// 			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
// 		);
// 	}

// 	isInside(date: NgbDate) {
// 		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
// 	}

// 	isRange(date: NgbDate) {
// 		return (
// 			date.equals(this.fromDate) ||
// 			(this.toDate && date.equals(this.toDate)) ||
// 			this.isInside(date) ||
// 			this.isHovered(date)
// 		);
// 	}

// 	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
// 		const parsed = this.formatter.parse(input);
// 		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
// 	}
// }
@Output() dateRangeSelected = new EventEmitter<{ fromDate: string, toDate: string }>();

calendar = inject(NgbCalendar);
formatter = inject(NgbDateParserFormatter);

hoveredDate: NgbDate | null = null;
fromDate: NgbDate | null = this.calendar.getToday();
toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

onDateSelection(date: NgbDate) {
  if (!this.fromDate && !this.toDate) {
	this.fromDate = date;
  } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
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

filterDataByDate(): void {
  if (this.fromDate && this.toDate) {
	const fromDateStr = `${this.fromDate.year}-${String(this.fromDate.month).padStart(2, '0')}-${String(this.fromDate.day).padStart(2, '0')}`;
	const toDateStr = `${this.toDate.year}-${String(this.toDate.month).padStart(2, '0')}-${String(this.toDate.day).padStart(2, '0')}`;
	console.log(`Emitting date range: from ${fromDateStr} to ${toDateStr}`);
	this.dateRangeSelected.emit({ fromDate: fromDateStr, toDate: toDateStr });
  }
}
}