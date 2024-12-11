import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'src/app/core/constants/CommonConstant';
import { ILogin } from 'src/app/core/Models/interfaces/ILogin';
import { IUserResponse } from 'src/app/core/Models/interfaces/IUser';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  loading = false;
  loginObj: ILogin = {
    email: '',
    password: '',
  };
  constructor(private userService: UserService, private router: Router) {}
  togglePassword() {
    const passField = this.passwordInput.nativeElement;
    if (passField.type === 'password') {
      passField.type = 'text';
    } else {
      passField.type = 'password';
    }
  }
  ngOnInit() {
    this.userService.logout();
    if (this.userService.IsLoggedIn()) {
      // User is already logged in
      let role = this.userService.getRoleFromStorage();
      if (role === 'Admin') {
        //this.router.navigate(['/admin']).then(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        // this.router.navigate(['/admin']);
      } else if (role === 'User') {
        //this.router.navigate(['/user']);
        this.router.navigate(['/']);
      }
    }
    const showBtn = document.querySelector('.show') as HTMLElement;
    if (showBtn != null) {
      showBtn.addEventListener('click', () => {
        this.togglePassword();
        if (showBtn.textContent === 'SHOW') {
          showBtn.textContent = 'HIDE';
          showBtn.style.color = '#3498db';
        } else {
          showBtn.textContent = 'SHOW';
          showBtn.style.color = '#222';
        }
      });
    }
  }

  login() {
    this.loading = true;
    this.userService.login(this.loginObj).subscribe(
      (res: any) => {
        this.loading = false;
        // Handle the response here
        // Example of accessing the statusCode, message, and data properties
        console.log('Status Code:', res.statusCode);
        console.log('Message:', res.message);
        console.log('Data:', res.data);
        // Example of accessing data properties
        if (res.message == CommonConstant.ApiMessage.ValidUser) {
          //alert(res.message);
          let userResponse: IUserResponse = {
            id: res.data[0].id,
            name: res.data[0].name,
            email: res.data[0].email,
            phoneNumber: res.data[0].phoneNumber,
            roles: res.data[0].roles,
            jwtToken: res.data[1].jwtToken,
            refreshToken: res.data[1].refreshToken,
          };
          // store refresh token into local storage
          localStorage.setItem(
            'jwtToken',
            userResponse.jwtToken == null ? '' : userResponse.jwtToken
          );
          localStorage.setItem(
            'refreshToken',
            userResponse.refreshToken == null ? '' : userResponse.refreshToken
          );
          localStorage.setItem('userData', JSON.stringify(userResponse));
          //this.router.navigateByUrl('/layout');
          if (userResponse.roles[0] === 'Admin') {
            location.href = '/index';
            //location.href = '/admin';
          } else if (userResponse.roles[0] === 'User') {
            location.href = '/index';
            //location.href = '/user';
          }

          //location.reload();
        } else if (
          res.message == CommonConstant.ApiMessage.IncorrectUserOrPassword
        ) {
          alert(res.message);
        } else if (res.message == CommonConstant.ApiMessage.ValidationFailed) {
          let messageAlert: String = res.message + ':\n\n';
          for (const validation of res.data) {
            messageAlert =
              messageAlert + ' * ' + validation.errorMessage + '\n';
          }
          alert(messageAlert);
        } else {
          alert('Error ' + res.message);
        }
      },
      (error) => {
        this.loading = false;
        // Handle any errors that occurred during the API call
        alert('Error: ' + error);
      }
    );
  }
  waitClick() {
    alert('Please wait we are validating.');
  }
}
