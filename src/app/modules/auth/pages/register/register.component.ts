import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * Executed When Form Is Submitted
   */
  onSubmit() {
    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(res => {
        this.toastService.showSuccess('Cuenta creada');
        this.router.navigate(['/auth/login']);
      });
  }

}
