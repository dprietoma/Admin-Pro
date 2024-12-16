import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/enviroment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {


  constructor( 
    private http: HttpClient, 
    private router: Router,
    private ngZone: NgZone ) {
    this.googleInit();
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp['token']);
      }),
      map( resp => true),
      catchError( erro => of( false))
    )
  }

  crearUsuario( formData: RegisterForm ) {

    return  this.http.post(`${ base_url }/usuarios`, formData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp['token']);
              })
            )
  }

  login( formData: LoginForm ) {

    return  this.http.post(`${ base_url }/login`, formData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp['token']);
                // Navegar al dashboard
                this.router.navigateByUrl('/');
              })
            )

  }

  loginGoogle( token: string ) {
    return  this.http.post(`${ base_url }/login/google`, { token })
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp['token']);
        localStorage.setItem('email', resp['email']);
      })
    )
  }


  googleInit() {
    google.accounts.id.initialize({
      client_id: '949034051464-o74ns1sbcsl07vrobbio1fvgjh3c6sbs.apps.googleusercontent.com',
    });
  }

  logout() {
    const googleUser = localStorage.getItem('email');

    if(!googleUser){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');    
    } else {
      this.googleSignOut(googleUser);
    }
  }

  googleSignOut(googleUser: string){
    localStorage.removeItem('token');
    google.accounts.id.revoke(googleUser, () => {
      this.ngZone.run(() => {
            localStorage.removeItem('email');
            this.router.navigateByUrl('/login');
          });
    });  

  }

  




}
