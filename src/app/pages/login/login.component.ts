declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '447498725600-802d3k8toijn1saqsq31hkc63804pt54.apps.googleusercontent.com',
      // client_id: '447498725600-fkrfbr74pd77s4ed6d8malohid255ug0.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'dark',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    })
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggenInUser", JSON.stringify(payLoad));
      this.router.navigate(['browse']);
    }
  }
}
