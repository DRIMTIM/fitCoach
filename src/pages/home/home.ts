import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ClientProvider } from '../../providers/client/client';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public isAdmin: boolean = false;
    public weightTrackForm: FormGroup;
    public weightHistory: any;

    constructor(public navCtrl: NavController, public authProvider: AuthProvider,
                public formBuilder: FormBuilder, public clientProvider: ClientProvider) {
        this.weightTrackForm = formBuilder.group({weight: [ Validators.required ]});
    }

    ionViewDidEnter(){
        this.authProvider.isAsdmin().then( adminStatus => {
            this.isAdmin = adminStatus;
        });
        this.weightHistory = this.clientProvider.clientWeightHistory();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

    clientCreatePage(): void { this.navCtrl.push('ClientCreatePage'); }
    clientListPage(): void { this.navCtrl.push('ClientListPage'); }

    weightTrack(): void {
        this.clientProvider.clientTrackWeight(this.weightTrackForm.value.weight);
        this.weightTrackForm.reset();
    }

}
