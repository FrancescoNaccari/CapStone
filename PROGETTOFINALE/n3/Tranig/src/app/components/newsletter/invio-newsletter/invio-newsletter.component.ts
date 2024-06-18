import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Newsletter } from 'src/app/interface/newsletter.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-invio-newsletter',
  templateUrl: './invio-newsletter.component.html',
  styleUrls: ['./invio-newsletter.component.scss']
})
export class InvioNewsletterComponent {
//   titolo: string = '';
//   testo: string = '';
//   successMessage: string | null = null;
//   errorMessage: string | null = null;
//   user: User | null = null;

//   constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private router: Router) { }

//   ngOnInit(): void {
//     this.authSrv.user$.subscribe((data) => {
//       this.user = data?.user || null;
//       if (!this.isAdmin()) {
//         this.router.navigate(['/profilo']);
//       }
//     });
//   }

//   isAdmin(): boolean {
//     return this.user ? this.user.tipoUtente.includes('ADMIN') : false;
//   }

//   inviaNewsletter() {
//     if (this.titolo && this.testo) {
//       const newsletter: Newsletter = { titolo: this.titolo, testo: this.testo };
//       this.profiloSrv.inviaNewsletter(newsletter).subscribe(
//         () => {
//           this.successMessage = 'Newsletter inviata con successo';
//           this.titolo = '';
//           this.testo = '';
//           setTimeout(() => this.successMessage = null, 3000);
//         },
//         (error) => {
//           console.error('Errore durante l\'invio della newsletter', error);
//           this.errorMessage = 'Errore durante l\'invio della newsletter';
//           setTimeout(() => this.errorMessage = null, 3000);
//         }
//       );
//     } else {
//       this.errorMessage = 'Titolo e testo sono obbligatori';
//       setTimeout(() => this.errorMessage = null, 3000);
//     }
//   }
// }


//-----------------------------------------------------------------//



titolo: string = '';
testo: string = '';
successMessage: string | null = null;
errorMessage: string | null = null;
user: User | null = null;
quillModules: any;

constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private router: Router) {
  this.quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };
}

ngOnInit(): void {
  this.authSrv.user$.subscribe((data) => {
    this.user = data?.user || null;
    if (!this.isAdmin()) {
      this.router.navigate(['/profilo']);
    }
  });
}

isAdmin(): boolean {
  return this.user ? this.user.tipoUtente.includes('ADMIN') : false;
}

inviaNewsletter() {
  if (this.titolo && this.testo) {
    const newsletter: Newsletter = { titolo: this.titolo, testo: this.testo };
    this.profiloSrv.inviaNewsletter(newsletter).subscribe(
      () => {
        this.successMessage = 'Newsletter inviata con successo';
        this.titolo = '';
        this.testo = '';
        setTimeout(() => this.successMessage = null, 3000);
      },
      (error) => {
        console.error('Errore durante l\'invio della newsletter', error);
        this.errorMessage = 'Errore durante l\'invio della newsletter';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    );
  } else {
    this.errorMessage = 'Titolo e testo sono obbligatori';
    setTimeout(() => this.errorMessage = null, 3000);
  }
}
htmlContent: string = '';
onChangedEditor(event: any):void{
  if(event.html){
    this.htmlContent=event.html;
   
  }
}
}

//  titolo: string = '';
// testo: string = '';
// successMessage: string | null = null;
// errorMessage: string | null = null;
// user: User | null = null;
// files: File[] = [];
// htmlContent: string = '';

// constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private router: Router) {}

// ngOnInit(): void {
//     this.authSrv.user$.subscribe((data) => {
//       this.user = data?.user || null;
//       if (!this.isAdmin()) {
//         this.router.navigate(['/profilo']);
//       }
//     });
//   }
  
//   isAdmin(): boolean {
//     return this.user ? this.user.tipoUtente.includes('ADMIN') : false;
//   }

  
//   onFilesSelected(event: any): void {
//     this.files = Array.from(event.target.files);
//   }

//   inviaNewsletter() {
//     if (this.titolo && this.htmlContent && this.files.length > 0) {
//       const formData = new FormData();
//       formData.append('titolo', this.titolo);
//       formData.append('testo', this.htmlContent);
//       this.files.forEach((file, index) => {
//         formData.append(`file`, file);

//       });

//       this.profiloSrv.inviaNewsletter(formData).subscribe(
//         () => {
//           this.successMessage = 'Newsletter inviata con successo';
//           this.titolo = '';
//           this.htmlContent = '';
//           this.files = [];
//           setTimeout(() => this.successMessage = null, 3000);
//         },
//         (error) => {
//           console.error('Errore durante l\'invio della newsletter', error);
//           this.errorMessage = 'Errore durante l\'invio della newsletter';
//           setTimeout(() => this.errorMessage = null, 3000);
//         }
//       );
//     } else {
//       this.errorMessage = 'Titolo, testo e almeno un file sono obbligatori';
//       setTimeout(() => this.errorMessage = null, 3000);
//     }
//   }
// mudulesQuill={
//   toolbar: [
//           ['bold', 'italic', 'underline', 'strike'],      
//           [{font:[]}],
//           [{ color: [] },{ background: [] }],
//           [{ size: ['small', false, 'large', 'huge'] }],
//           [{ header: [1,2,3,4,5,6, false]}],               
//          [{ align: [] }], 
//          ['blackquote', 'code-block'],
         
//          [{ list: 'ordered'}, { list: 'bullet' }],
//           ['link', 'image', 'video'] , 
//           ['clean'],                                                
//         ]
//       }


// // blog={
// //   titolo: 'Oggetto',
// //   descrizione:"Descrizione"
// // }


// guardar(forma:NgForm){
//   console.log(forma.value);


// }

// onChangedEditor(event: any):void{
//   if(event.html){
//     this.htmlContent=event.html;
   
//   }
// }

// }