import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class ClientProvider {

    public userId: string;

    constructor(public afAuth: AngularFireAuth,
                public afDatabase: AngularFireDatabase) {
        this.userId = this.afAuth.auth.currentUser.uid;
    }

    clientCreate(fullName: string, email: string,
                 startingWeight: number): firebase.Promise<any> {
        return this.afDatabase.list(`userProfile/${this.userId}/clientList/`)
            .push({
                fullName,
                email,
                startingWeight: startingWeight * 1
            });
    }
    clientListShow(): FirebaseListObservable<any> {
        return this.afDatabase.list(`userProfile/${this.userId}/clientList/`);
    }

    clientDetailShow(clientId: string): FirebaseObjectObservable<any> {
        return this.afDatabase.object(`userProfile/${clientId}`);
    }

    clientTrackWeight(weight: number): firebase.Promise<any> {
        return this.afDatabase.list(`userProfile/${this.userId}/weightTrack/`)
            .push({
                weight: weight,
                date: firebase.database.ServerValue.TIMESTAMP
            });
    }

    clientWeightHistory(): FirebaseListObservable<any> {
        return this.afDatabase.list(`userProfile/${this.userId}/weightTrack`, {
            query: {
                orderByChild: 'date',
                limitToLast: 5
            }
        });
    }

    clientWeightHistoryCoach(clientId: string): FirebaseListObservable<any> {
        return this.afDatabase.list(`userProfile/${clientId}/weightTrack`, {
            query: {
                orderByChild: 'date',
                limitToLast: 5
            }
        });
    }
}
