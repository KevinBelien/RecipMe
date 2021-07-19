import {Component, OnInit} from '@angular/core';
import {callingCountries} from 'country-data';
import {AuthService} from '../../services/auth.service';
import {LoadingController, ModalController} from '@ionic/angular';
import firebase from 'firebase/app';


@Component({
    selector: 'app-phone-verification',
    templateUrl: './phone-verification.component.html',
    styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent implements OnInit {

    // De landcodes voor alle landen.
    countryCodes: any[];

    // De geselecteerde landcode
    code = '+32';

    // Het ingegeven GSM nummer.
    phone: number;

    // Het volledige GSM nummer = code + phone.
    phoneNumber: string;

    // True als de verificatiecode verstuurd is.
    codeSent = false;

    // De ingegeven verificatiecode.
    verificationCode: string;

    // True als de gebruiker een ongeldige verificatiecode heeft ingegeven.
    failed = false;

    // Gebruikt voor de eerste login van een gebruiker. De gebruiker moet een displayName kiezen aangezien Google deze
    // niet kan aflezen uit een GSM nummer. Bij Google, Facebook of Twitter authenticatie gaat dit wel.
    gettingDisplayName = false;

    // De ingegeven displayName.
    displayName: string;

    constructor(private authService: AuthService, private modalController: ModalController, private loadingController: LoadingController) {
        // De bibliotheek bevat geen types.
        this.countryCodes = Object
            .entries(callingCountries.all)          // Object.entries() maakt een array van het object met landen.
            .map(e => e[1] as any)                  // Op positie 0 staat een volgnummer dat we niet nodig hebben.
            .filter(c => c.status === 'assigned');  // Hou enkel de "echte" landen over, dus niet de EU.
    }

    ngOnInit() {
    }

    /**
     * Verstuur een verificatie code naar het ingegeven GSM nummer.
     */
    sendCode = (): void => {
        this.phoneNumber = this.code + this.phone;
        this.authService.sendVerificationCode(this.phoneNumber);
        this.codeSent = true;
    }

    /**
     * Valideer de ingegeven code.
     */
    validate = (): void => {
        this.authService.verifyPhoneNumber(this.phoneNumber, this.verificationCode, this.verifyCallback);

        // Reset als de gebruiker na 1 minuut nog niets heeft ingegeven.
        setTimeout(() => {
            this.verificationCode = undefined;
            this.failed = true;
            this.codeSent = false;
        }, 60000);
    }

    private verifyCallback = (user: firebase.User | null) => {
        // De eerste waarde is altijd null, want de gebruiker was nog niet ingelogd.
        if (user === null) {
            return;
        }
        if (this.authService.getDisplayName() && this.authService.getDisplayName().length > 0) {
            this.modalController.dismiss();
        } else {
            this.gettingDisplayName = true;
        }
    }

    /**
     * Update de gebruikersnaam.
     */
    setUserName = () => {
        this.authService.setDisplayName(this.displayName);
        this.modalController.dismiss();
    }

}
