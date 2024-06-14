import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit  {

//   profilo!:User | undefined  ;
//   newPassword: string = '';
//   newUsername: string = '';
//   previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files[0]) {
//       const file = input.files[0];
//       const reader = new FileReader();

//       reader.onloadend = e => {
//         this.previewUrl = reader.result;
//         if (e.target && e.target.readyState == FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
//           if (this.previewUrl) {
//             const formData = new FormData();
//             if (input.files) {
//               formData.set('file', input.files[0], input.files[0].name);
//             }
//             this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
//               this.authSrv.updateUser(data);
//             })
//           }
//         }
//       }

//       reader.readAsDataURL(file)
//     }
//   }

// constructor(private authSrv:AuthService, private profiloSrv:ProfiloService ){}


// ngOnInit(): void {
//     this.authSrv.user$.subscribe((data)=>{
//       this.profilo=data?.user;
//       this.newUsername = this.profilo?.username || '';
//       this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
//     })
// }
// updatePassword() {
//   try {
//     const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && newPassword) {
//       this.profiloSrv.updateUser(this.profilo.idUtente, {password: newPassword}).subscribe(
//         (response) => {
//           window.alert('Password aggiornata con successo');
//           this.authSrv.logout();
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento della password', error);
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// updateUsername() {
//   try {
//     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
//     console.log(this.profilo, newUsername)
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
//       console.log('entrato')
//       this.profiloSrv.updateUser(this.profilo.idUtente, {username: newUsername}).subscribe(
//         (updatedUser) => {
//           this.authSrv.updateUser(updatedUser);
//           window.alert('Username aggiornato con successo');
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento dell\'username', error);
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }}
// }

// profilo!: User | undefined;
// currentPassword: string = '';
// newPassword: string = '';
// confirmPassword: string = '';
// newUsername: string = '';
// previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// passwordError: string | null = null;
// successMessage: string | null = null;

// constructor(private authSrv: AuthService, private profiloSrv: ProfiloService) { }

// ngOnInit(): void {
//   this.authSrv.user$.subscribe((data) => {
//     this.profilo = data?.user;
//     this.newUsername = this.profilo?.username || '';
//     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
//   })
// }

// onFileSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files[0]) {
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onloadend = e => {
//       this.previewUrl = reader.result;
//       if (e.target && e.target.readyState == FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
//         if (this.previewUrl) {
//           const formData = new FormData();
//           if (input.files) {
//             formData.set('file', input.files[0], input.files[0].name);
//           }
//           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
//             this.authSrv.updateUser(data);
//           })
//         }
//       }
//     }

//     reader.readAsDataURL(file)
//   }
// }

// validatePassword(password: string): string | null {
//   if (password.length < 8) {
//     return 'La password deve contenere almeno 8 caratteri.';
//   }
//   if (!/[A-Z]/.test(password)) {
//     return 'La password deve contenere almeno una lettera maiuscola.';
//   }
//   if (!/[a-z]/.test(password)) {
//     return 'La password deve contenere almeno una lettera minuscola.';
//   }
//   if (!/[0-9]/.test(password)) {
//     return 'La password deve contenere almeno un numero.';
//   }
//   if (!/[!@#\$%\^&\*]/.test(password)) {
//     return 'La password deve contenere almeno un carattere speciale.';
//   }
//   return null;
// }

// updatePassword() {
//   try {
//     const passwordError = this.validatePassword(this.newPassword);
//     if (passwordError) {
//       this.passwordError = passwordError;
//       return;
//     }
//     if (this.newPassword !== this.confirmPassword) {
//       this.passwordError = 'Le nuove password non corrispondono.';
//       return;
//     }
//     this.passwordError = null;
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
//       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
//         () => {
//           this.successMessage = 'Password aggiornata con successo';
//           this.currentPassword = '';
//           this.newPassword = '';
//           this.confirmPassword = '';
//           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento della password', error);
//           this.passwordError = 'Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.';
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// updateUsername() {
//   try {
//     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
//       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
//         (updatedUser) => {
//           this.authSrv.updateUser(updatedUser);
//           window.alert('Username aggiornato con successo');
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento dell\'username', error);
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
// }



// @ViewChild('newPasswordField') newPasswordField!: ElementRef;

// profilo!: User | undefined;
// currentPassword: string = '';
// newPassword: string = '';
// confirmPassword: string = '';
// newUsername: string = '';
// previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// passwordError: string | null = null;
// successMessage: string | null = null;

// constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2) { }

// ngOnInit(): void {
//   this.authSrv.user$.subscribe((data) => {
//     this.profilo = data?.user;
//     this.newUsername = this.profilo?.username || '';
//     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
//   });
// }

// onFileSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files[0]) {
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onloadend = e => {
//       this.previewUrl = reader.result;
//       if (e.target && e.target.readyState === FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
//         if (this.previewUrl) {
//           const formData = new FormData();
//           if (input.files) {
//             formData.set('file', input.files[0], input.files[0].name);
//           }
//           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
//             this.authSrv.updateUser(data);
//           });
//         }
//       }
//     };

//     reader.readAsDataURL(file);
//   }
// }

// validatePassword(password: string): string | null {
//   if (password.length < 8) {
//     return 'La password deve contenere almeno 8 caratteri.';
//   }
//   if (!/[A-Z]/.test(password)) {
//     return 'La password deve contenere almeno una lettera maiuscola.';
//   }
//   if (!/[a-z]/.test(password)) {
//     return 'La password deve contenere almeno una lettera minuscola.';
//   }
//   if (!/[0-9]/.test(password)) {
//     return 'La password deve contenere almeno un numero.';
//   }
//   if (!/[!@#\$%\^&\*]/.test(password)) {
//     return 'La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).';
//   }
//   return null;
// }

// showErrorPopover(message: string): void {
//   this.passwordError = message;
//   const newPasswordField = this.newPasswordField.nativeElement;
//   const popover = new bootstrap.Popover(newPasswordField, {
//     content: message,
//     trigger: 'manual',
//     placement: 'right'
//   });
//   // popover.show(); //POPUP DI ERRORE PER LA PASSWORD 
//   setTimeout(() => {
//     popover.hide();
//     this.passwordError = null;
//   }, 3000);
// }

// updatePassword() {
//   try {
//     const passwordError = this.validatePassword(this.newPassword);
//     if (passwordError) {
//       this.showErrorPopover(passwordError);
//       return;
//     }
//     if (this.newPassword !== this.confirmPassword) {
//       this.showErrorPopover('Le nuove password non corrispondono.');
//       return;
//     }
//     this.passwordError = null;
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
//       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
//         () => {
//           this.successMessage = 'Password aggiornata con successo';
//           this.currentPassword = '';
//           this.newPassword = '';
//           this.confirmPassword = '';
//           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento della password', error);
//           this.showErrorPopover('Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.');
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// updateUsername() {
//   try {
//     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
//     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
//       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
//         (updatedUser) => {
//           this.authSrv.updateUser(updatedUser);
//           window.alert('Username aggiornato con successo');
//         },
//         (error) => {
//           console.error('Errore durante l\'aggiornamento dell\'username', error);
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
// }


@ViewChild('newPasswordField') newPasswordField!: ElementRef;

profilo!: User | undefined;
currentPassword: string = '';
newPassword: string = '';
confirmPassword: string = '';
newUsername: string = '';
previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
passwordError: string | null = null;
successMessage: string | null = null;

constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2) { }

ngOnInit(): void {
  this.authSrv.user$.subscribe((data) => {
    this.profilo = data?.user;
    this.newUsername = this.profilo?.username || '';
    this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
  });
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = e => {
      this.previewUrl = reader.result;
      if (e.target && e.target.readyState === FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
        if (this.previewUrl) {
          const formData = new FormData();
          if (input.files) {
            formData.set('file', input.files[0], input.files[0].name);
          }
          this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
            this.authSrv.updateUser(data);
          });
        }
      }
    };

    reader.readAsDataURL(file);
  }
}

validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'La password deve contenere almeno 8 caratteri.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La password deve contenere almeno una lettera maiuscola.';
  }
  if (!/[a-z]/.test(password)) {
    return 'La password deve contenere almeno una lettera minuscola.';
  }
  if (!/[0-9]/.test(password)) {
    return 'La password deve contenere almeno un numero.';
  }
  if (!/[!@#\$%\^&\*]/.test(password)) {
    return 'La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).';
  }
  return null;
}

showErrorPopover(message: string): void {
  this.passwordError = message;
  const newPasswordField = this.newPasswordField.nativeElement;
  setTimeout(() => {
  
    this.passwordError = null;
  }, 3000);
}

updatePassword() {
  try {
    const passwordError = this.validatePassword(this.newPassword);
    if (passwordError) {
      this.showErrorPopover(passwordError);
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.showErrorPopover('Le nuove password non corrispondono.');
      return;
    }
    this.passwordError = null;
    if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
      this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
        () => {
          this.successMessage = 'Password aggiornata con successo';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
          setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento della password', error);
          this.showErrorPopover('Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.');
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}

updateUsername() {
  try {
    const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
    if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
      this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          window.alert('Username aggiornato con successo');
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento dell\'username', error);
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
}