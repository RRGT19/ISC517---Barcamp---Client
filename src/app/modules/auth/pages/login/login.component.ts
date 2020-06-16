import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {first} from "rxjs/operators";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
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
      .subscribe(res => this.router.navigate(['/']));
  }

}
