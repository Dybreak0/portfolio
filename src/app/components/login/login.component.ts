import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/Credentials.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(private auth: AuthService,
    private router: Router) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  public login(): void {
    if(this.loginFormGroup.valid) {
      const payload: Credentials = new Credentials(this.loginFormGroup.get("username")?.value, this.loginFormGroup.get("password")?.value);
      this.auth.login(payload)
      .then((result: any) => {
        this.router.navigateByUrl("home/index");
      })
      .catch((): void => {
        alert("Invalid username or password");
      });
    }
  }
}

