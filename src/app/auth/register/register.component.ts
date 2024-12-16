import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerForm;
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder, 
    private usarioServices: UsuarioService, 
    private router: Router ) {

    
    this.registerForm = this.fb.group({
      nombre: ['test17', [Validators.required, Validators.minLength(3)]],
      email: ['test17@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      confirmPassword: ['123456', [Validators.required]],
      terminos: [true, [Validators.required]],
    },  {
      validator: this.passwordIguales('password', 'confirmPassword')
    });
    
  }


  crearUsuario(){
    this.formSubmitted = true;

    if ( !this.registerForm.valid ) {
      return
    } 

    // Realizar posteo de formulario
    this.usarioServices.crearUsuario(this.registerForm.value)
    .subscribe({
      next: (resp) => {
        console.log('Usuario creado:', resp);
        // Navegar al dashboard
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    });

  }

  campoNoValido( campo: string ): boolean {

    if (this.registerForm.get(campo)?.invalid  && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value  && this.formSubmitted
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('confirmPassword')?.value;

    if ( (pass1 !== pass2 ) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(password: string, confiPass: string){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(confiPass);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noIguales: true });
      }
    }

  }
}
