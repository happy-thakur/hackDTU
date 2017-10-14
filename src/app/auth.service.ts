import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var logout: any;

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }



  login(str) {
    var provider;
    switch (str) {
      case 0:
        provider = new firebase.auth.GoogleAuthProvider();
        // console.log("thre");
        break;

      case 1:
        provider = new firebase.auth.GithubAuthProvider();
        break;
      case 2:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 3:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
        
      default:
        provider = null
        break;
    }

    if(provider) {
      return this.afAuth.auth.signInWithPopup(provider);
    }
    // console.log(this.items);

    logout = this.logout;
  }

  logout() {
    if(localStorage.getItem("email") != null || localStorage.getItem("email") != undefined || localStorage.getItem("uid") != null  || localStorage.getItem("uid") != undefined ) {
      this.afAuth.auth.signOut().then((data) => {
        document.cookie = "dataMe=''";
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        // navigate..
      }).catch((err) =>{
        // alert(err);
        console.log(err);
      });
    }
  }

}
