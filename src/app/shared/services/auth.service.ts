import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, public router: Router) { 
    
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
        console.log('Success!', value);
        this.router.navigate(['/sign']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  async googleLogin(){
    await this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['/back-end']);
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['/back-end']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  
  logout() {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['/sign']);
  }
}
