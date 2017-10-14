import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth.service';
import { RequestsService } from './requests.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PracticeComponent } from './practice/practice.component';
import { CompetitionComponent } from './competition/competition.component';
import { FriendsComponent } from './friends/friends.component';

export const FIREBASE_CONFIG = {
	apiKey: "AIzaSyCEyDLByij1YuoGFF1WDEAMaOxwlQmAmTk",
	authDomain: "quiz-16864.firebaseapp.com",
	databaseURL: "https://quiz-16864.firebaseio.com",
	projectId: "quiz-16864",
	storageBucket: "quiz-16864.appspot.com",
	messagingSenderId: "200392188893"
	};

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    HomeComponent,
    NavbarComponent,
    PracticeComponent,
    CompetitionComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: HomeComponent
    },
    {
      path: 'practice',
      component: PracticeComponent
    },
    {
      path: 'afterSignup',
      component: NavbarComponent
    },
    {
      path: 'home',
      component: FriendsComponent
    },
    {
      path: '**',
      component: HomeComponent
    }
      ]),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [RequestsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
