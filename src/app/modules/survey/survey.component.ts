import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  get responseList() {
    return this.f.responseList as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      responseList: new FormArray([], Validators.required)
    });

    for (let i = 1; i <= 4; i++) {
      this.responseList.push(
        this.fb.group({
          number: [i, Validators.required],
          rating: [i === 4 ? '' : String(1)]
        })
      )
    }
  }

  /**
   * Executed When Form Is Submitted
   */
  onSubmit() {
    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const response = {
      participantId: this.authService.currentUserValue.id,
      responseList: this.responseList.value
    };

    this.authService.saveResponse(response).toPromise().then(res => {
      this.authService.saveUser(res);
      this.toastService.showSuccess('Respuesta enviada');
      this.router.navigateByUrl('/');
    });
  }

}
