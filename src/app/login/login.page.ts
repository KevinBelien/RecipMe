import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ModalController, Platform} from '@ionic/angular';
import {PhoneVerificationComponent} from './phone-verification/phone-verification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hybrid = this.platform.is('hybrid');

  constructor(public authService: AuthService, private platform: Platform, private modalController: ModalController) { }

  showPhoneVerification = async (): Promise<void> => {
    const modal = await this.modalController.create({
      component: PhoneVerificationComponent
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
