import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {IonSlides} from '@ionic/angular';
import {FirestoreService} from '../services/firestore.service';
import {Recipe} from '../types/recipe';
import {AuthService} from '../services/auth.service';
import {Favorite} from '../types/favorite';
import {NotificationsService} from '../services/notifications.service';


enum Segment {
  INGREDIENTS = 'Ingredients',
  INSTRUCTIONS = 'Instructions',
}

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  id: string;
  recipe: Recipe;
  segments: Segment[] = Object.values(Segment).map(s => s as Segment);
  selectedSegment: Segment = Segment.INGREDIENTS;
  Segment = Segment;
  ingredients: [];
  isFavorite = false;
  favorites: Favorite[];
  buttonText: string;
  icon: string;

  @ViewChild(IonSlides) slides: IonSlides;

  constructor(public route: ActivatedRoute, public router: Router, public apiService: ApiService,
              public fsService: FirestoreService, public authService: AuthService,
              public notService: NotificationsService) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.apiService.getRecipeIngredientsResult(this.id).subscribe(result => {
      this.recipe = result;

      if (this.recipe){
        this.handleFavorites();
      }
    });
  }


  handleFavorites = (): void => {
    this.fsService.getFavorites('favorites', this.authService.getUserUID()).subscribe(s => {
      this.favorites = s;
      if (this.favorites){
        const checkFavorite = this.findFavorite(this.favorites);
        if (checkFavorite){
          this.buttonText = 'Remove';
          this.icon = 'heart';
        }
        else{
          this.buttonText = 'Add';
          this.icon = 'heart-outline';
        }
      }
    });
  }

  segmentChanged() {
    this.slides.slideTo(this.segments.indexOf(this.selectedSegment));
  }

  GetInstructions(recipeString: string): string[] {
    return recipeString.split(/<ol>|<\/ol>|<\/li>/)
        .join('')
        .replace('<li>', '')
        .split('<li>');
  }



  manageFavorite = async (): Promise<void> => {
    let checkFavorite = this.findFavorite(this.favorites);
    if (checkFavorite) {
      /*favorite*/
      await this.fsService.deleteFavorite(checkFavorite);
      this.buttonText = 'Add';
      this.icon = 'heart-outline';
      await this.notService.showToast('Recipe has been deleted from your favorites!');
    }
    else{
      await this.fsService.addToFavorites(this.recipe);
      this.buttonText = 'Remove';
      this.icon = 'heart';
      await this.notService.showToast('Recipe is added to your favorites!');
    }
    checkFavorite = null;

    this.getFavorites();
  }

  findFavorite = (favoriteList: Favorite[]): Favorite => {
    return favoriteList.find(({recipe}) => recipe.id === this.recipe.id);
}

getFavorites = (): void => {
  this.fsService.getFavorites('favorites', this.authService.getUserUID()).subscribe(s => {
    this.favorites = s;
  });
}

}

