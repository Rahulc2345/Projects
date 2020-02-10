import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "src/app/user/user.service";
import { Router } from "@angular/router";
import { first } from 'rxjs/operators'
import { AuthenticationService } from "src/app/authentication/authentication.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  role: string = 'user';
  status: string = 'active';
  message:string;
  dupId:string="duplicate key error";

  constructor(
    private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.role, Validators.required],
      status: [this.status, Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.registerUser(this.registerForm.value).
      pipe(first()).subscribe(
      data => {
        console.log("data" + data);
        this.message=JSON.stringify(data)
        this.router.navigate(['/login']);
      },
      error => {
        console.log("error" + JSON.stringify(error.error));
        this.message=error.error;
      }
      );
  }

}
