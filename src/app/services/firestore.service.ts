import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Recipe} from '../types/recipe';
import {Favorite} from '../types/favorite';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

  addToFavorites = (rec: Recipe): void => {
    const favorite = {
      user: this.authService.getUserUID(),
      recipe: rec
    };
    this.afs.collection<Favorite>('favorites').add(favorite);
  }

  getFavorites = (favoritesChannel: string, userID: string): Observable<Favorite[]> => {
    return this.afs.collection<Favorite>(favoritesChannel,
            ref => ref.where('user', '==', userID))
        .snapshotChanges()
        .pipe(
            map(changes => changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()})))
        );
  }

  deleteFavorite = (favorite: Favorite): void => {
    this.afs.collection<Favorite>('favorites').doc(favorite.key).delete();
  }
}
