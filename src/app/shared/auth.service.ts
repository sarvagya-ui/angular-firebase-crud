import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public fireAuth: AngularFireAuth, public router: Router) { }

  //login method
  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login'])
    })
  }
//another way to do it
// login(email : string, password : string) {
//   this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
//       localStorage.setItem('token','true');

//       if(res.user?.emailVerified == true) {
//         this.router.navigate(['dashboard']);
//       } else {
//         this.router.navigate(['/varify-email']);
//       }

//   }, err => {
//       alert(err.message);
//       this.router.navigate(['/login']);
//   })
// }


  // register method
  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  //sign out
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  // email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

}
