import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  countdown: number = 7;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Timer per il conto alla rovescia e reindirizzamento
    const timer$ = interval(1000).pipe(take(this.countdown));

    timer$.subscribe({
      next: (value) => this.countdown -= 1,
      complete: () => this.router.navigate(['/'])
    });
  }
}
