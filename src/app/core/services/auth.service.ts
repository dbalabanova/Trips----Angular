import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import * as firebase from 'firebase'
import {Observable} from 'rxjs'
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string
  constructor(
    
    private toastr: ToastrService,
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) {
   }

   signUp(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        //console.log(value)
        this.router.navigate(['/auth/login'])
        this.toastr.success('Signed Up', 'Success')
        //console.log('Success!', value);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Warning')
        //console.log('Something went wrong:',err.message);
      });    
    }
    
    signIn(email: string, password: string) {
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(value)
        
        firebase.auth().currentUser.getIdToken()
        .then((token:string)=>{
          this.token=token
         // console.log(this.token)
        })
        this.router.navigate(['/trips/list'])
        this.toastr.success('Logged in', 'Success')
      })
      .catch(err => {
        //console.log('Something went wrong:',err.message);
        this.toastr.error(err.message, 'Warning')
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
    .then(()=>{
      this.toastr.success('Logged out successfully','Success')
      this.router.navigate([''])
    })
    .catch(err=>{
      this.toastr.error(err.message,'Warning')
    })
    this.token=null
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
    .then((token:string)=>{
      this.token=token;
    })
    return this.token
  }

  isAuthenticated(): boolean{
    return this.token!=null
  }
}
