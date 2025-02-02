declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
      // localhost
      // client_id: '447498725600-802d3k8toijn1saqsq31hkc63804pt54.apps.googleusercontent.com',
      // Server netlify
      // client_id: '447498725600-fkrfbr74pd77s4ed6d8malohid255ug0.apps.googleusercontent.com',
      // Server versel
      client_id: '447498725600-li4golsjtnakt9suvbigv116g0emuh0a.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'dark',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    })

  }

  guestUser() {
    console.log("tetetet");
    this.router.navigate(['browse']);
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }
  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem("loggenInUser", JSON.stringify(payLoad));
      this.router.navigate(['browse']);
    } else {
      alert("Somthing went wrong!");
    }
  }

}
