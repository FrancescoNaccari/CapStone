import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() amount: number = 0;

  constructor(public activeModal: NgbActiveModal, private translate: TranslateService) {}

  ngOnInit(): void {
    // Mantieni la lingua attuale
    this.translate.use(this.translate.currentLang);
  }
}
