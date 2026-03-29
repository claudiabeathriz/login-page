import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  } // 👈 FECHOU O CONSTRUCTOR

  submit() {
    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      this.toastService.warning('Preencha todos os campos!');
      return;
    }

    this.loginService.login(email, password).subscribe({
      next: () => this.toastService.success('Login feito com sucesso!'),
      error: () =>
        this.toastService.error('Erro inesperado! Tente novamente mais tarde'),
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }
}
