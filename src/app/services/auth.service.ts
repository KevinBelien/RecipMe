import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import {cfaSignIn, cfaSignOut} from 'capacitor-firebase-auth';
import {SignInOptions} from 'capacitor-firebase-auth/dist/esm/definitions';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../types/user';

enum Provider {
  GOOGLE = 'google.com',
  TWITTER = 'twitter.com',
  FACEBOOK = 'facebook.com',
  PHONE = 'phone'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.UserInfo;
  private userRef: AngularFirestoreDocument;
  Provider = Provider;

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    afAuth.user.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.userRef = this.afs.doc<User>('users/' + this.user.uid);
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Log de gebruiker in met de gekozen provider.
   * @param provider De service waarmee ingelogd moet worden.
   * @param data Gebruik voor phone authentication, heeft twee keys: phone en verificationCode.
   */
  signIn = (provider: Provider, data?: SignInOptions) => {
    // Subscribe is nodig, anders gebeurd er niets als deze functie opgeroepen wordt.
    cfaSignIn(provider, data).subscribe((u) => {
    }, (error => console.log(error)));
  }

  signOut = (): void => {
    cfaSignOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  getDisplayName = (): string => {
    return this.user ? this.user.displayName : 'Niet aangemeld';
  }

  getEmail = (): string => {
    return this.user ? this.user.email : '';
  }

  getProfilePic() {
    if (this.user && this.user.photoURL) {
      return this.user.photoURL;
    }
    return '/assets/avatar.svg';
  }

  /**
   * Verstuur een verificatiecode naar het opgegeven GSM nummer.
   * @param phoneNumber GSM Nummer.
   */
  sendVerificationCode = (phoneNumber: string): void => {
    this.signIn(Provider.PHONE, {phone: phoneNumber});
  }

  /**
   * Verifieer een GSM nummer en verificatiecode.
   * @param phoneNumber Het nummer.
   * @param code De verificatiecode.
   * @param doneCallback De functie om uit te voeren op het moment dat de gebruiker wijzigt.
   */
  verifyPhoneNumber = (
      phoneNumber: string, code: string, doneCallback = (user: firebase.User | null) => {
      }): void => {

    this.signIn(Provider.PHONE, {phone: phoneNumber, verificationCode: code});

    // Registreer een functie die opgeroepen wordt als de login pogin afgerond is.
    this.afAuth.user.subscribe(doneCallback);
  }

  isLoggedIn = (): boolean => {
    return this.user !== null && this.user !== undefined;
  }

  getUserUID = (): string => {
    if (this.user) {
      return this.user.uid;
    }
    return undefined;
  }

  setDisplayName = async (displayName: string): Promise<void> => {
    const user = await this.afAuth.currentUser;
    if (!user) {
      console.error('Can\'t set the display name when nobody is logged in');
      return;
    }
    await user.updateProfile({displayName});
    await this.userRef.update({displayName: this.getDisplayName()});
  }
}
