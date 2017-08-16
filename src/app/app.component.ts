import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FCM } from '@ionic-native/fcm';

import {AngularFireAuth} from "angularfire2/auth";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild('myNav') navCtrl: NavController;
    rootPage:string;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
                fcm :FCM) {

        const authUnsubscribe = afAuth.authState.subscribe( user => {
            if (user) {
                this.rootPage = 'HomePage';
            } else {
                this.rootPage = 'LoginPage';
            }
        });

        platform.ready().then(() => {

            fcm.onNotification().subscribe( data => {
                if(data.wasTapped){
                    authUnsubscribe.unsubscribe();
                    //Notification was received on device tray and tapped by the user.
                    console.log( JSON.stringify(data) );
                    this.navCtrl.setRoot('ClientDetailPage', { 'clientId': data.clientId});
                }else{
                    //Notification was received in foreground. Maybe the user needs to be notified.
                    console.log( JSON.stringify(data) );
                    this.navCtrl.push('ClientDetailPage', { 'clientId': data.clientId});
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

