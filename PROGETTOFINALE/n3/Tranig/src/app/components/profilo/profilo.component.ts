// import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { User } from 'src/app/interface/user.interface';
// import { AuthService } from 'src/app/service/auth.service';
// import { ProfiloService } from 'src/app/service/profilo.service';
// import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
// import { AuthData } from 'src/app/interface/auth-data.interface';
// import { CheckoutComponent } from '../stripe/checkout/checkout.component';
// import { Subscription } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';


// @Component({
//   selector: 'app-profilo',
//   templateUrl: './profilo.component.html',
//   styleUrls: ['./profilo.component.scss']
// })
// export class ProfiloComponent implements OnInit, OnDestroy  {

// //   profilo!:User | undefined  ;
// //   newPassword: string = '';
// //   newUsername: string = '';
// //   previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// //   onFileSelected(event: Event): void {
// //     const input = event.target as HTMLInputElement;
// //     if (input.files && input.files[0]) {
// //       const file = input.files[0];
// //       const reader = new FileReader();

// //       reader.onloadend = e => {
// //         this.previewUrl = reader.result;
// //         if (e.target && e.target.readyState == FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
// //           if (this.previewUrl) {
// //             const formData = new FormData();
// //             if (input.files) {
// //               formData.set('file', input.files[0], input.files[0].name);
// //             }
// //             this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
// //               this.authSrv.updateUser(data);
// //             })
// //           }
// //         }
// //       }

// //       reader.readAsDataURL(file)
// //     }
// //   }

// // constructor(private authSrv:AuthService, private profiloSrv:ProfiloService ){}


// // ngOnInit(): void {
// //     this.authSrv.user$.subscribe((data)=>{
// //       this.profilo=data?.user;
// //       this.newUsername = this.profilo?.username || '';
// //       this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
// //     })
// // }
// // updatePassword() {
// //   try {
// //     const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && newPassword) {
// //       this.profiloSrv.updateUser(this.profilo.idUtente, {password: newPassword}).subscribe(
// //         (response) => {
// //           window.alert('Password aggiornata con successo');
// //           this.authSrv.logout();
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della password', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // updateUsername() {
// //   try {
// //     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
// //     console.log(this.profilo, newUsername)
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
// //       console.log('entrato')
// //       this.profiloSrv.updateUser(this.profilo.idUtente, {username: newUsername}).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Username aggiornato con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento dell\'username', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }}
// // }

// // profilo!: User | undefined;
// // currentPassword: string = '';
// // newPassword: string = '';
// // confirmPassword: string = '';
// // newUsername: string = '';
// // previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// // passwordError: string | null = null;
// // successMessage: string | null = null;

// // constructor(private authSrv: AuthService, private profiloSrv: ProfiloService) { }

// // ngOnInit(): void {
// //   this.authSrv.user$.subscribe((data) => {
// //     this.profilo = data?.user;
// //     this.newUsername = this.profilo?.username || '';
// //     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
// //   })
// // }

// // onFileSelected(event: Event): void {
// //   const input = event.target as HTMLInputElement;
// //   if (input.files && input.files[0]) {
// //     const file = input.files[0];
// //     const reader = new FileReader();

// //     reader.onloadend = e => {
// //       this.previewUrl = reader.result;
// //       if (e.target && e.target.readyState == FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
// //         if (this.previewUrl) {
// //           const formData = new FormData();
// //           if (input.files) {
// //             formData.set('file', input.files[0], input.files[0].name);
// //           }
// //           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
// //             this.authSrv.updateUser(data);
// //           })
// //         }
// //       }
// //     }

// //     reader.readAsDataURL(file)
// //   }
// // }

// // validatePassword(password: string): string | null {
// //   if (password.length < 8) {
// //     return 'La password deve contenere almeno 8 caratteri.';
// //   }
// //   if (!/[A-Z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera maiuscola.';
// //   }
// //   if (!/[a-z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera minuscola.';
// //   }
// //   if (!/[0-9]/.test(password)) {
// //     return 'La password deve contenere almeno un numero.';
// //   }
// //   if (!/[!@#\$%\^&\*]/.test(password)) {
// //     return 'La password deve contenere almeno un carattere speciale.';
// //   }
// //   return null;
// // }

// // updatePassword() {
// //   try {
// //     const passwordError = this.validatePassword(this.newPassword);
// //     if (passwordError) {
// //       this.passwordError = passwordError;
// //       return;
// //     }
// //     if (this.newPassword !== this.confirmPassword) {
// //       this.passwordError = 'Le nuove password non corrispondono.';
// //       return;
// //     }
// //     this.passwordError = null;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
// //       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
// //         () => {
// //           this.successMessage = 'Password aggiornata con successo';
// //           this.currentPassword = '';
// //           this.newPassword = '';
// //           this.confirmPassword = '';
// //           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della password', error);
// //           this.passwordError = 'Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.';
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // updateUsername() {
// //   try {
// //     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
// //       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Username aggiornato con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento dell\'username', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }
// // }



// // @ViewChild('newPasswordField') newPasswordField!: ElementRef;

// // profilo!: User | undefined;
// // currentPassword: string = '';
// // newPassword: string = '';
// // confirmPassword: string = '';
// // newUsername: string = '';
// // previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// // passwordError: string | null = null;
// // successMessage: string | null = null;

// // constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2) { }

// // ngOnInit(): void {
// //   this.authSrv.user$.subscribe((data) => {
// //     this.profilo = data?.user;
// //     this.newUsername = this.profilo?.username || '';
// //     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
// //   });
// // }

// // onFileSelected(event: Event): void {
// //   const input = event.target as HTMLInputElement;
// //   if (input.files && input.files[0]) {
// //     const file = input.files[0];
// //     const reader = new FileReader();

// //     reader.onloadend = e => {
// //       this.previewUrl = reader.result;
// //       if (e.target && e.target.readyState === FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
// //         if (this.previewUrl) {
// //           const formData = new FormData();
// //           if (input.files) {
// //             formData.set('file', input.files[0], input.files[0].name);
// //           }
// //           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
// //             this.authSrv.updateUser(data);
// //           });
// //         }
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   }
// // }

// // validatePassword(password: string): string | null {
// //   if (password.length < 8) {
// //     return 'La password deve contenere almeno 8 caratteri.';
// //   }
// //   if (!/[A-Z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera maiuscola.';
// //   }
// //   if (!/[a-z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera minuscola.';
// //   }
// //   if (!/[0-9]/.test(password)) {
// //     return 'La password deve contenere almeno un numero.';
// //   }
// //   if (!/[!@#\$%\^&\*]/.test(password)) {
// //     return 'La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).';
// //   }
// //   return null;
// // }

// // showErrorPopover(message: string): void {
// //   this.passwordError = message;
// //   const newPasswordField = this.newPasswordField.nativeElement;
// //   const popover = new bootstrap.Popover(newPasswordField, {
// //     content: message,
// //     trigger: 'manual',
// //     placement: 'right'
// //   });
// //   // popover.show(); //POPUP DI ERRORE PER LA PASSWORD 
// //   setTimeout(() => {
// //     popover.hide();
// //     this.passwordError = null;
// //   }, 3000);
// // }

// // updatePassword() {
// //   try {
// //     const passwordError = this.validatePassword(this.newPassword);
// //     if (passwordError) {
// //       this.showErrorPopover(passwordError);
// //       return;
// //     }
// //     if (this.newPassword !== this.confirmPassword) {
// //       this.showErrorPopover('Le nuove password non corrispondono.');
// //       return;
// //     }
// //     this.passwordError = null;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
// //       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
// //         () => {
// //           this.successMessage = 'Password aggiornata con successo';
// //           this.currentPassword = '';
// //           this.newPassword = '';
// //           this.confirmPassword = '';
// //           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della password', error);
// //           this.showErrorPopover('Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.');
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // updateUsername() {
// //   try {
// //     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
// //       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Username aggiornato con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento dell\'username', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }
// // }


// // @ViewChild('newPasswordField') newPasswordField!: ElementRef;

// // profilo!: User | undefined;
// // currentPassword: string = '';
// // newPassword: string = '';
// // confirmPassword: string = '';
// // newUsername: string = '';
// // previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// // passwordError: string | null = null;
// // successMessage: string | null = null;

// // constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2) { }

// // ngOnInit(): void {
// //   this.authSrv.user$.subscribe((data) => {
// //     this.profilo = data?.user;
// //     this.newUsername = this.profilo?.username || '';
// //     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
// //   });
// // }

// // onFileSelected(event: Event): void {
// //   const input = event.target as HTMLInputElement;
// //   if (input.files && input.files[0]) {
// //     const file = input.files[0];
// //     const reader = new FileReader();

// //     reader.onloadend = e => {
// //       this.previewUrl = reader.result;
// //       if (e.target && e.target.readyState === FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
// //         if (this.previewUrl) {
// //           const formData = new FormData();
// //           if (input.files) {
// //             formData.set('file', input.files[0], input.files[0].name);
// //           }
// //           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
// //             this.authSrv.updateUser(data);
// //           });
// //         }
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   }
// // }

// // validatePassword(password: string): string | null {
// //   if (password.length < 8) {
// //     return 'La password deve contenere almeno 8 caratteri.';
// //   }
// //   if (!/[A-Z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera maiuscola.';
// //   }
// //   if (!/[a-z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera minuscola.';
// //   }
// //   if (!/[0-9]/.test(password)) {
// //     return 'La password deve contenere almeno un numero.';
// //   }
// //   if (!/[!@#\$%\^&\*]/.test(password)) {
// //     return 'La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).';
// //   }
// //   return null;
// // }

// // showErrorPopover(message: string): void {
// //   this.passwordError = message;
// //   const newPasswordField = this.newPasswordField.nativeElement;
// //   setTimeout(() => {
  
// //     this.passwordError = null;
// //   }, 3000);
// // }

// // updatePassword() {
// //   try {
// //     const passwordError = this.validatePassword(this.newPassword);
// //     if (passwordError) {
// //       this.showErrorPopover(passwordError);
// //       return;
// //     }
// //     if (this.newPassword !== this.confirmPassword) {
// //       this.showErrorPopover('Le nuove password non corrispondono.');
// //       return;
// //     }
// //     this.passwordError = null;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && this.currentPassword && this.newPassword) {
// //       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
// //         () => {
// //           this.successMessage = 'Password aggiornata con successo';
// //           this.currentPassword = '';
// //           this.newPassword = '';
// //           this.confirmPassword = '';
// //           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della password', error);
// //           this.showErrorPopover('Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.');
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // updateUsername() {
// //   try {
// //     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
// //     if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
// //       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Username aggiornato con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento dell\'username', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }
// // }

// // @ViewChild('newPasswordField') newPasswordField!: ElementRef;
// // profilo: User | undefined;
// // currentPassword: string = '';
// // newPassword: string = '';
// // confirmPassword: string = '';
// // newUsername: string = '';
// // previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// // passwordError: string | null = null;
// // successMessage: string | null = null;

// // constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2) { }

// // ngOnInit(): void {
// //   this.authSrv.user$.subscribe((data) => {
// //     this.profilo = data?.user;
// //     this.newUsername = this.profilo?.username || '';
// //     this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
// //   });
// // }

// // onFileSelected(event: Event): void {
// //   const input = event.target as HTMLInputElement;
// //   if (input.files && input.files[0]) {
// //     const file = input.files[0];
// //     const reader = new FileReader();

// //     reader.onloadend = e => {
// //       this.previewUrl = reader.result;
// //       if (e.target && e.target.readyState === FileReader.DONE && this.profilo?.idUtente) {
// //         if (this.previewUrl) {
// //           const formData = new FormData();
// //           if (input.files) {
// //             formData.set('file', input.files[0], input.files[0].name);
// //           }
// //           this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
// //             this.authSrv.updateUser(data);
// //           });
// //         }
// //       }
// //     };

// //     reader.readAsDataURL(file);
// //   }
// // }

// // validatePassword(password: string): string | null {
// //   if (password.length < 8) {
// //     return 'La password deve contenere almeno 8 caratteri.';
// //   }
// //   if (!/[A-Z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera maiuscola.';
// //   }
// //   if (!/[a-z]/.test(password)) {
// //     return 'La password deve contenere almeno una lettera minuscola.';
// //   }
// //   if (!/[0-9]/.test(password)) {
// //     return 'La password deve contenere almeno un numero.';
// //   }
// //   if (!/[!@#$%^&*]/.test(password)) {
// //     return 'La password deve contenere almeno un carattere speciale (!, @, #, $, %, ^, &, *).';
// //   }
// //   return null;
// // }

// // showErrorPopover(message: string): void {
// //   this.passwordError = message;
// //   setTimeout(() => {
// //     this.passwordError = null;
// //   }, 3000);
// // }

// // updatePassword() {
// //   try {
// //     const passwordError = this.validatePassword(this.newPassword);
// //     if (passwordError) {
// //       this.showErrorPopover(passwordError);
// //       return;
// //     }
// //     if (this.newPassword !== this.confirmPassword) {
// //       this.showErrorPopover('Le nuove password non corrispondono.');
// //       return;
// //     }
// //     this.passwordError = null;
// //     if (this.profilo?.idUtente && this.currentPassword && this.newPassword) {
// //       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
// //         () => {
// //           this.successMessage = 'Password aggiornata con successo';
// //           this.currentPassword = '';
// //           this.newPassword = '';
// //           this.confirmPassword = '';
// //           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della password', error);
// //           this.showErrorPopover('Errore durante l\'aggiornamento della password. Assicurati che la password attuale sia corretta.');
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // updateUsername() {
// //   try {
// //     const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
// //     if (this.profilo?.idUtente && newUsername) {
// //       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Username aggiornato con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento dell\'username', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }
// /**************************************************************************************************************************************************** */
// // updateNewsletter() {
// //   try {
// //     if (this.profilo?.idUtente) {
// //       this.profiloSrv.updateNewsletter(this.profilo.idUtente, this.profilo.newsletter).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           window.alert('Preferenza newsletter aggiornata con successo');
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento della preferenza newsletter', error);
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error(error);
// //   }
// // }

// // onNewsletterChange(event: Event) {
// //   const input = event.target as HTMLInputElement;
// //   if (this.profilo) {
// //     this.profilo.newsletter = input.checked;
// //     this.updateNewsletter();
// //   }
// // }



// @Input() userId: number | null = null;

// @ViewChild(CheckoutComponent) checkoutComponent!: CheckoutComponent;
// // @ViewChild('newPasswordField') newPasswordField!: ElementRef;
// profilo: User | undefined;
// currentPassword: string = '';
// newPassword: string = '';
// confirmPassword: string = '';
// newUsername: string = '';
// previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
// passwordError: string | null = null;
// successMessage: string | null = null;

// rechargeAmount: number = 0; // Importo della ricarica
// withdrawAmount: number = 0; // Importo del prelievo
// balance: number = 0; // Saldo dell'utente
// private intervalId: any;

// constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2, private translate: TranslateService) { }

// ngOnInit(): void {
//   this.authSrv.user$.subscribe((data) => {
//     console.log(data);
//     if (isAuthData(data)) {
//       this.profilo = data.user;
//       console.log(this.profilo.balance);
//       this.newUsername = this.profilo?.username || '';
//       this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
//       this.balance = this.profilo?.balance || 0;
//     }
//   });
//   this.startBalanceUpdateInterval();
// }

// ngOnDestroy(): void {
//   if (this.intervalId) {
//     clearInterval(this.intervalId);
//   }
// }
// startBalanceUpdateInterval(): void {
//   this.intervalId = setInterval(() => {
//     this.updateBalance();
//   }, 2000); // Aggiorna ogni 2 secondi
// }
// updateBalance(): void {
//   if (this.profilo?.idUtente !== undefined) {
//     this.profiloSrv.updateBalance(this.profilo.idUtente, 0).subscribe(
//       (updatedUser) => {
//         this.authSrv.updateUser(updatedUser);
//         this.balance = updatedUser.balance || 0;
//       },
//       (error) => {
//         console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
//       }
//     );
//   }
// }
// handlePaymentSuccess() {
//   if (this.rechargeAmount > 0 && this.profilo?.idUtente !== undefined) {
//     this.profiloSrv.updateBalance(this.profilo?.idUtente!, this.rechargeAmount).subscribe(
//       (updatedUser) => {
//         this.authSrv.updateUser(updatedUser);
//         this.balance = updatedUser.balance || 0;
//         this.rechargeAmount = 0; // Reset dell'importo della ricarica
//       },
//       (error) => {
//         console.error(this.translate.instant('profile.UPDATE_ERROR'), error);      }
//     );
//   }

//   if (this.withdrawAmount >0 && this.profilo?.idUtente !== undefined) {
//     this.profiloSrv.updateBalance(this.profilo?.idUtente!, -this.withdrawAmount).subscribe(
//       (updatedUser) => {
//         this.authSrv.updateUser(updatedUser);
//         this.balance = updatedUser.balance || 0;
//         this.withdrawAmount = 0; // Reset dell'importo del prelievo
//       },
//       (error) => {
//         console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
//       }
//     );
//   }

// }


// onFileSelected(event: Event): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files[0]) {
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onloadend = e => {
//       this.previewUrl = reader.result;
//       if (e.target && e.target.readyState === FileReader.DONE && this.profilo?.idUtente) {
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
//     return this.translate.instant('profile.PASSWORD_MIN_LENGTH');
//   }
//   if (!/[A-Z]/.test(password)) {
//     return this.translate.instant('profile.PASSWORD_UPPERCASE');
//   }
//   if (!/[a-z]/.test(password)) {
//     return this.translate.instant('profile.PASSWORD_LOWERCASE');
//   }
//   if (!/[0-9]/.test(password)) {
//     return this.translate.instant('profile.PASSWORD_NUMBER');
//   }
//   if (!/[!@#$%^&*]/.test(password)) {
//     return this.translate.instant('profile.PASSWORD_SPECIAL_CHAR');
//   }
//   return null;
// }
// showErrorPopover(message: string): void {
//   this.passwordError = message;
//   setTimeout(() => {
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
//       this.showErrorPopover(this.translate.instant('profile.PASSWORDS_NOT_MATCH'));
//       return;
//     }
//     this.passwordError = null;
//     if (this.profilo?.idUtente && this.currentPassword && this.newPassword) {
//       this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
//         () => {
//           this.successMessage = this.translate.instant('profile.PASSWORD_UPDATED_SUCCESS');
//           this.currentPassword = '';
//           this.newPassword = '';
//           this.confirmPassword = '';
//           setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
//         },
//         (error) => {
//           console.error(this.translate.instant('profile.PASSWORD_ERROR'), error);
//           this.showErrorPopover(this.translate.instant('profile.PASSWORD_ERROR'));
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
//     if (this.profilo?.idUtente && newUsername) {
//       this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
//         (updatedUser) => {
//           this.authSrv.updateUser(updatedUser);
//           window.alert(this.translate.instant('profile.UPDATE_SUCCESS'));
//         },
//         (error) => {
//           console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
//         }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }


// // initiateRecharge() {
// //     // L'importo della ricarica viene passato al componente di checkout

// //   if (this.checkoutComponent) {
// //     this.checkoutComponent.amount = this.rechargeAmount;
// //     this.checkoutComponent.pay();
// //   }
// // }

// // handlePaymentSuccess() {
// //   console.log(this.profilo?.idUtente)
// //   if (this.profilo?.idUtente) {
// //     console.log(this.rechargeAmount)
// //     this.profiloSrv.updateBalance(this.profilo.idUtente, this.rechargeAmount).subscribe((updatedUser) => {
// //       this.authSrv.updateUser(updatedUser);
// //       this.balance = updatedUser.balance || 0;
// //       this.rechargeAmount = 0;
// //     });
// //   }
// // }

// // }
// // initiateRecharge() {
// //   if (this.checkoutComponent) {
// //     this.checkoutComponent.amount = this.rechargeAmount;
// //     this.checkoutComponent.pay();
// //   }

// // initiateWithdraw() {
// //   if (this.profilo?.idUtente) {
// //     this.profiloSrv.updateBalance(this.profilo.idUtente, -this.withdrawAmount).subscribe(
// //       (updatedUser) => {
// //         this.authSrv.updateUser(updatedUser);
// //         this.balance = updatedUser.balance || 0;
// //         this.withdrawAmount = 0;
// //       },
// //       (error) => {
// //         console.error('Errore durante il prelievo', error);
// //       }
// //     );
// //   }
// // }


// // handlePaymentSuccess() {
// //   if (this.profilo?.idUtente) {
// //     const userId = this.profilo.idUtente;
// //     setTimeout(() => {
// //       this.profiloSrv.updateBalance(userId, this.rechargeAmount).subscribe(
// //         (updatedUser) => {
// //           this.authSrv.updateUser(updatedUser);
// //           this.balance = updatedUser.balance || 0;
// //           this.rechargeAmount = 0;
// //         },
// //         (error) => {
// //           console.error('Errore durante l\'aggiornamento del saldo', error);
// //         }
// //       );
// //     }, 2000); // Ritardo di 2 secondi
// //   }
// // }




// }
// function isAuthData(user: any): user is AuthData {
// return user && 'accessToken' in user && 'user' in user;
// }
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { CheckoutComponent } from '../stripe/checkout/checkout.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit, OnDestroy  {

  @Input() userId: number | null = null;

  @ViewChild(CheckoutComponent) checkoutComponent!: CheckoutComponent;
  profilo: User | undefined;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  newUsername: string = '';
  previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
  passwordError: string | null = null;
  successMessage: string | null = null;

  rechargeAmount: number = 0; // Importo della ricarica
  withdrawAmount: number = 0; // Importo del prelievo
  balance: number = 0; // Saldo dell'utente
  private intervalId: any;

  constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2, private translate: TranslateService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      console.log(data);
      if (isAuthData(data)) {
        this.profilo = data.user;
        console.log(this.profilo.balance);
        this.newUsername = this.profilo?.username || '';
        this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
        this.balance = this.profilo?.balance || 0;
      }
    });
    this.startBalanceUpdateInterval();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startBalanceUpdateInterval(): void {
    this.intervalId = setInterval(() => {
      this.updateBalance();
    }, 2000); // Aggiorna ogni 2 secondi
  }

  updateBalance(): void {
    if (this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo.idUtente, 0).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }
  }

  handlePaymentSuccess() {
    if (this.rechargeAmount > 0 && this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo?.idUtente!, this.rechargeAmount).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
          this.rechargeAmount = 0; // Reset dell'importo della ricarica
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }

    if (this.withdrawAmount > 0 && this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo?.idUtente!, -this.withdrawAmount).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
          this.withdrawAmount = 0; // Reset dell'importo del prelievo
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onloadend = e => {
        this.previewUrl = reader.result;
        if (e.target && e.target.readyState === FileReader.DONE && this.profilo?.idUtente) {
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
      return this.translate.instant('profile.PASSWORD_MIN_LENGTH');
    }
    if (!/[A-Z]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_UPPERCASE');
    }
    if (!/[a-z]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_LOWERCASE');
    }
    if (!/[0-9]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_NUMBER');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_SPECIAL_CHAR');
    }
    return null;
  }

  showErrorPopover(message: string): void {
    this.passwordError = message;
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
        this.showErrorPopover(this.translate.instant('profile.PASSWORDS_NOT_MATCH'));
        return;
      }
      this.passwordError = null;
      if (this.profilo?.idUtente && this.currentPassword && this.newPassword) {
        this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
          () => {
            this.successMessage = this.translate.instant('profile.PASSWORD_UPDATED_SUCCESS');
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            setTimeout(() => this.successMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
          },
          (error) => {
            console.error(this.translate.instant('profile.PASSWORD_ERROR'), error);
            this.showErrorPopover(this.translate.instant('profile.PASSWORD_ERROR'));
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
      if (this.profilo?.idUtente && newUsername) {
        this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
          (updatedUser) => {
            this.authSrv.updateUser(updatedUser);
            window.alert(this.translate.instant('profile.UPDATE_SUCCESS'));
          },
          (error) => {
            console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user && 'user' in user;
}