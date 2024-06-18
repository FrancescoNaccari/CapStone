import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-custom-newsletter',
  templateUrl: './custom-newsletter.component.html',
  styleUrls: ['./custom-newsletter.component.scss']
})
export class CustomNewsletterComponent implements OnInit, OnDestroy {
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

  
  constructor(private profiloService: ProfiloService) {
    this.editor = new Editor();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit(form:NgForm) {
    if (form.valid) {
      const newsletter = {
        titolo: form.value.title,
        testo: form.value.editorContent
      };
      this.profiloService.inviaNewsletter(newsletter).subscribe(
        () => {
          console.log('Newsletter inviata con successo');
        },
        (error) => {
          console.error('Errore durante l\'invio della newsletter', error);
        }
      );
    }
  }

}
