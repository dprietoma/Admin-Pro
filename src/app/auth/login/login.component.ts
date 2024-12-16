import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private usarioServices: UsuarioService,
    private ngZone: NgZone ){

    this.loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '949034051464-o74ns1sbcsl07vrobbio1fvgjh3c6sbs.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usarioServices.loginGoogle( response.credential).subscribe( resp => {
      // console.log({ login: resp});
      this.router.navigateByUrl('/');
    })
  }

  login(){ 

    const loginData = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
      remember: this.loginForm.value.remember ?? false
    };

    this.usarioServices.login(loginData)
    .subscribe({
      next: (resp) => {
        if ( this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', loginData.email)
        } else {
          localStorage.removeItem('email');
        }
        // Navegar al dashboard
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  }
}
