import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase/app';

import { FCM } from '@ionic-native/fcm';

@Injectable()
export class AuthProvider {

    public userId:string = null;

    constructor(public afAuth: AngularFireAuth, public fcm : FCM,
                public afDatabase: AngularFireDatabase) {
        afAuth.authState.subscribe( user => {
            if(user){ this.userId = user.uid; }
        });
    }

    userLogin(email: string, password: string): firebase.Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    userSignupOld(email: string, password: string,
               fullName: string): firebase.Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then( user => {
                this.afDatabase.object(`/userProfile/${user.uid}/`).set({
                    admin: true,
                    email,
                    fullName
                });
            });
    }

    userSignup(email: string, password: string, fullName: string):
    firebase.Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then( user => {
                this.fcm.getToken()
                    .then(token => {
                        this.afDatabase.object(`/userProfile/${user.uid}/`).set({
                            admin: true,
                            email,
                            fullName,
                            token: token
                        });
                    });
            });
    }

    userLogout(): firebase.Promise<void> {
        return this.afAuth.auth.signOut();
    }

    passwordReset(email: string): firebase.Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    isAsdmin(): Promise<any> {
        return new Promise( (resolve, reject ) => {
            firebase.database().ref(`userProfile/${this.userId}/admin`)
                .once('value', adminSnapshot => {
                    resolve(adminSnapshot.val());
                });
        });
    }
}
