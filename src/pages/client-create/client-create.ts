import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProvider } from '../../providers/client/client';
import {EmailValidator} from "../../validators/email";

@IonicPage()
@Component({
    selector: 'page-client-create',
    templateUrl: 'client-create.html',
})
export class ClientCreatePage {

    public clientCreateForm:FormGroup;

    constructor(public navCtrl: NavController, public clientProvider: ClientProvider, public formBuilder: FormBuilder) {

        this.clientCreateForm = formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            startingWeight: ['', Validators.required]
        });
    }

    clientCreate(): void {
        if (!this.clientCreateForm.valid){
            console.log(this.clientCreateForm.value);
        } else {
            this.clientProvider.clientCreate(
                    this.clientCreateForm.value.name, this.clientCreateForm.value.email, this.clientCreateForm.value.startingWeight)
                .then( () => {
                    this.navCtrl.pop();
                }, error => {
                    console.error(error);
                });
        }
    }
}
