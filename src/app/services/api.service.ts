import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject, UnaryFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, retry, switchMap, tap} from 'rxjs/operators';
import {RecipeSearch, RecipeSearchResult} from '../types/apiTypeRecipe';
import {Recipe} from '../types/recipe';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'https://api.spoonacular.com/recipes';
  // <editor-fold desc="Verberg de API key tijdens projecties">
    private readonly API_KEY = environment.spoonacularConfig.apiKey;
  // </editor-fold>

    data: any[] = [];

  constructor(private http: HttpClient) { }

  getSearchRecipesResult = (searchTerm: string): Observable<RecipeSearchResult[]> => {

      return this.http
        .get<RecipeSearch>(
            this.BASE_URL + '/complexSearch' +  '?apiKey=' + this.API_KEY + '&query=' + searchTerm + '&addRecipeInformation=true'
        )
        .pipe(
            map<RecipeSearch, RecipeSearchResult[]>(rs => rs.results),
            catchError(error => {
              console.log(error);
              return of (null);
            }),
            retry(3)
        );
  }

    getFeaturedTypesRecipesResults = (type: string, amountHits: number): Observable<Recipe[]> => {
        return this.http
            .get<RecipeSearch>(
                this.BASE_URL + '/complexSearch' +  '?apiKey=' + this.API_KEY + '&type=' + type + '&addRecipeInformation=true'
            )
            .pipe(
                map<RecipeSearch, RecipeSearchResult[]>(rs => rs.results.slice(0, amountHits)),
                catchError(error => {
                    console.log(error);
                    return of (null);
                }),
                retry(3)
            );
    }



    getRecipeIngredientsResult = (id: string): Observable<Recipe> => {
        return this.http.get<any>(
            this.BASE_URL + '/' + id + '/information' +  '?apiKey=' + this.API_KEY + '&includeNutrition=false'
        )
            .pipe(
                map<any, Recipe>(r => this.convertRecipe(r)),
                catchError(error => {
                    console.log(error);
                    return of (null);
                }),
                retry(3)
            );
    }

    /*getRecipeIngredientsResult = (id: string) => {
        return this.http.get(this.BASE_URL + '/' + id + '/information' +  '?apiKey=' + this.API_KEY + '&includeNutrition=false');
    }*/

  debounceRequest = <T, R>(subject: Subject<T>, fn: UnaryFunction<T, Observable<R>>): Observable<R> => {
    return subject
        .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(s => fn(s))
        );
  }
    convertRecipe = (obj: any): Recipe => {
        return {
            id: obj.id,
            image: obj.image,
            title: obj.title,
            readyInMinutes: obj.readyInMinutes,
            instructions: obj.analyzedInstructions[0]?.steps || [],
            ingredients: obj.extendedIngredients
        };
    }
}
