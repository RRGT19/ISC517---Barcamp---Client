import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../modules/auth/auth.service";

@Component({
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
