import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit  {

  profilo!:User | undefined  ;
  newPassword: string = '';
  newUsername: string = '';
  previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onloadend = e => {
        this.previewUrl = reader.result;
        if (e.target && e.target.readyState == FileReader.DONE && this.profilo !== null && this.profilo?.idUtente) {
          if (this.previewUrl) {
            const formData = new FormData();
            if (input.files) {
              formData.set('file', input.files[0], input.files[0].name);
            }
            this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
              this.authSrv.updateUser(data);
            })
          }
        }
      }

      reader.readAsDataURL(file)
    }
  }

constructor(private authSrv:AuthService, private profiloSrv:ProfiloService ){}


ngOnInit(): void {
    this.authSrv.user$.subscribe((data)=>{
      this.profilo=data?.user;
      this.newUsername = this.profilo?.username || '';
      this.previewUrl = this.profilo?.avatar || "assets/img/ominoverde.png";
    })
}
updatePassword() {
  try {
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    if (this.profilo && typeof this.profilo.idUtente === 'number' && newPassword) {
      this.profiloSrv.updateUser(this.profilo.idUtente, {password: newPassword}).subscribe(
        (response) => {
          window.alert('Password aggiornata con successo');
          this.authSrv.logout();
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento della password', error);
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
    console.log(this.profilo, newUsername)
    if (this.profilo && typeof this.profilo.idUtente === 'number' && newUsername) {
      console.log('entrato')
      this.profiloSrv.updateUser(this.profilo.idUtente, {username: newUsername}).subscribe(
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
  }}
}
