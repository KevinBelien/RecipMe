import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../types/recipe';
import {Observable} from 'rxjs';

enum MealType {
  BREAKFAST = 'breakfast',
  DESSERT = 'dessert',
  SAUCE = 'sauce',
  APPETIZER = 'appetizer',
  MAIN = 'main course',
  SALAD = 'salad',
  SOUP = 'soup',
  BEVERAGE = 'beverage'
}

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit{
  mealTypes: MealType[] = Object.values(MealType).map(t => t as MealType).sort();
  selectedMealType: MealType = MealType.MAIN;
  amountHits = 5;
  recipes: Observable<Recipe[]>;

  constructor(public apiService: ApiService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(){
    this.recipes = this.getRecipeResults();
  }
  mealTypeChanged = () => {
    this.recipes = this.getRecipeResults();
  }

  getRecipeResults = (): Observable<Recipe[]> => {
    return this.apiService.getFeaturedTypesRecipesResults(this.selectedMealType, this.amountHits);
  }

}
