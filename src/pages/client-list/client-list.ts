import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
    selector: 'page-client-list',
    templateUrl: 'client-list.html',
})
export class ClientListPage {

    public clientList:any;

    constructor(public navCtrl: NavController,
                public clientProvider: ClientProvider) {}

    ionViewDidEnter(){
        this.clientList = this.clientProvider.clientListShow();
    }

    goToClientDetail(clientId: string): void {
        this.navCtrl.push('ClientDetailPage', { 'clientId': clientId });
    }
}
