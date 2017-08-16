import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    LoadingController,
    Loading,
    AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loginForm:FormGroup;
    loading:Loading;
    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController, public alertCtrl: AlertController,
                public formBuilder: FormBuilder, public authProvider: AuthProvider) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }
    userLogin(): void {
        if (!this.loginForm.valid){
            console.log(this.loginForm.value);
        } else {
            this.authProvider.userLogin(this.loginForm.value.email,
                this.loginForm.value.password).then( authProvider => {
                this.loading.dismiss().then( () => {
                    this.navCtrl.setRoot('HomePage');
                });
            }, error => {
                this.loading.dismiss().then( () => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [{ text: "Ok", role: 'cancel' }]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }
    goToSignup(): void {
        this.navCtrl.push('SignupPage');
    }
    goToResetPassword(): void {
        this.navCtrl.push('PasswordResetPage');
    }
}
