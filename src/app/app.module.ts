import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FCM } from '@ionic-native/fcm';
import { MomentModule } from 'angular2-moment';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { ClientProvider } from '../providers/client/client';


export const firebaseConfig = {
  apiKey: "AIzaSyBu2IMwtshQwjZSapkaKSR9uHdWFMlkqEM",
  authDomain: "fitcoach-d0f7b.firebaseapp.com",
  databaseURL: "https://fitcoach-d0f7b.firebaseio.com",
  storageBucket: "fitcoach-d0f7b.appspot.com",
  messagingSenderId: "133813550558",
};
/*

 var config = {
 apiKey: "AIzaSyBu2IMwtshQwjZSapkaKSR9uHdWFMlkqEM",
 authDomain: "fitcoach-d0f7b.firebaseapp.com",
 databaseURL: "https://fitcoach-d0f7b.firebaseio.com",
 projectId: "fitcoach-d0f7b",
 storageBucket: "fitcoach-d0f7b.appspot.com",
 messagingSenderId: "133813550558"
 };

* */

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FCM,
    AuthProvider,
    ClientProvider
  ]
})
export class AppModule {}
