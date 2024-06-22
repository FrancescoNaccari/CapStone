import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent {

  @Output() dateRangeSelected = new EventEmitter<{ fromDate: string, toDate: string }>();

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);

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
      this.toDate = date;  // Seleziona la stessa data come intervallo di un giorno
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    console.log('fromDate:', this.fromDate);
    console.log('toDate:', this.toDate);
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

  // Funzione per ottenere il numero di giorni in un mese specifico
  getDaysPerMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  filterDataByDate(): void {
    if (this.fromDate) {
      const fromDateStr = `${this.fromDate.year}-${String(this.fromDate.month).padStart(2, '0')}-${String(this.fromDate.day).padStart(2, '0')}`;
      
      // Aggiungi un giorno alla toDate per includere il giorno finale nel range, solo se c'è una toDate
      let toDate = this.toDate ? new NgbDate(this.toDate.year, this.toDate.month, this.toDate.day) : this.fromDate;
      if (this.toDate) {
        toDate = this.addOneDay(toDate);
      }

      const toDateStr = `${toDate.year}-${String(toDate.month).padStart(2, '0')}-${String(toDate.day).padStart(2, '0')}`;
      console.log(`Emettendo intervallo di date: da ${fromDateStr} a ${toDateStr}`);
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
// @Output() dateRangeSelected = new EventEmitter<{ fromDate: string, toDate: string }>();

// calendar = inject(NgbCalendar);
// formatter = inject(NgbDateParserFormatter);

// hoveredDate: NgbDate | null = null;
// fromDate: NgbDate | null = this.calendar.getToday();
// toDate: NgbDate | null = null;

// onDateSelection(date: NgbDate) {
//   if (!this.fromDate && !this.toDate) {
//     this.fromDate = date;
//   } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
//     this.toDate = date;
//   } else if (this.fromDate && this.toDate) {
//     this.toDate = null;
//     this.fromDate = date;
//   } else if (this.fromDate && !this.toDate && date.equals(this.fromDate)) {
//     this.toDate = null;
//   } else {
//     this.toDate = null;
//     this.fromDate = date;
//   }
//   console.log('fromDate:', this.fromDate);
//   console.log('toDate:', this.toDate);
//   this.filterDataByDate();
// }

// isHovered(date: NgbDate) {
//   return (
//     this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
//   );
// }

// isInside(date: NgbDate) {
//   return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
// }

// isRange(date: NgbDate) {
//   return (
//     date.equals(this.fromDate) ||
//     (this.toDate && date.equals(this.toDate)) ||
//     this.isInside(date) ||
//     this.isHovered(date)
//   );
// }

// validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
//   const parsed = this.formatter.parse(input);
//   return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
// }

// filterDataByDate(): void {
//   if (this.fromDate) {
//     const fromDateStr = `${this.fromDate.year}-${String(this.fromDate.month).padStart(2, '0')}-${String(this.fromDate.day).padStart(2, '0')}`;
//     const toDateStr = this.toDate ? `${this.toDate.year}-${String(this.toDate.month).padStart(2, '0')}-${String(this.toDate.day).padStart(2, '0')}` : fromDateStr;
//     console.log(`Emettendo intervallo di date: da ${fromDateStr} a ${toDateStr}`);
//     this.dateRangeSelected.emit({ fromDate: fromDateStr, toDate: toDateStr });
//   }
// }
// }