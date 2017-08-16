import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';

@IonicPage({
    segment: 'client/:clientId'
})
@Component({
    selector: 'page-client-detail',
    templateUrl: 'client-detail.html',
})
export class ClientDetailPage {

    public client: any;
    public clientWeightTrack: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public clientProvider: ClientProvider) {}
                
    ionViewDidEnter() {
        this.client = this.clientProvider
            .clientDetailShow(this.navParams.get('clientId'));
        this.clientWeightTrack = this.clientProvider
            .clientWeightHistoryCoach(this.navParams.get('clientId'));
    }
}
