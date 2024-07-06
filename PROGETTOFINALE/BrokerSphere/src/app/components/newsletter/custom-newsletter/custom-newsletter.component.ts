import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { TranslateService } from '@ngx-translate/core';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-custom-newsletter',
  templateUrl: './custom-newsletter.component.html',
  styleUrls: ['./custom-newsletter.component.scss']
})
export class CustomNewsletterComponent implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  alerts: { type: string, message: string }[] = [];

  constructor(private profiloService: ProfiloService, private translate: TranslateService) {
    this.editor = new Editor();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newsletter = {
        titolo: form.value.title,
        testo: form.value.editorContent
      };
      this.profiloService.inviaNewsletter(newsletter).subscribe(
        () => {
          this.alerts.push({ type: 'success', message: this.translate.instant('newsletter.NEWSLETTER_SENT') });
          this.resetForm();
        },
        (error) => {
          this.alerts.push({ type: 'danger', message: this.translate.instant('newsletter.NEWSLETTER_SEND_ERROR') });
        }
      );
    }
  }

  close(alert: { type: string, message: string }) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }

  resetForm() {
    this.form.resetForm();
    this.editor.setContent(''); // Metodo corretto per svuotare il contenuto dell'editor
  }

  trackByIndex(index: number): number {
    return index;
  }
}
