import {Component } from '@angular/core';
import {IonicPage, NavController, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthProvider } from '../../providers/auth/auth';
import {EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
    selector: 'page-password-reset',
    templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
    public passwordResetForm: FormGroup;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
                public formBuilder: FormBuilder, public authProvider: AuthProvider) {

        this.passwordResetForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,
                EmailValidator.isValid])]
        });
    }
    passwordReset(){
        if (!this.passwordResetForm.valid){
            console.log(this.passwordResetForm.value);
        } else {
            this.authProvider.passwordReset(this.passwordResetForm.value.email)
                .then((user) => {
                    const alert = this.alertCtrl.create({
                        message: "We just sent you a reset link to your email",
                        buttons: [{
                            text: "Ok",
                            role: 'cancel',
                            handler: () => {
                                this.navCtrl.pop();
                            }
                        }]
                    });
                    alert.present();
                }, (error) => {
                    const alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert.present();
                });
        }
    }
}
