import { Component, OnInit } from '@angular/core';
import {Favorite} from '../types/favorite';
import {FirestoreService} from '../services/firestore.service';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tab-favorites',
  templateUrl: './tab-favorites.page.html',
  styleUrls: ['./tab-favorites.page.scss'],
})
export class TabFavoritesPage implements OnInit {

  favorites: Favorite[];

  constructor(private fsService: FirestoreService, private authService: AuthService,
              public router: Router, public route: ActivatedRoute) {
    this.fsService.getFavorites('favorites', this.authService.getUserUID()).subscribe(s => {
      this.favorites = s;
    });
  }



  ngOnInit() {
  }

}
