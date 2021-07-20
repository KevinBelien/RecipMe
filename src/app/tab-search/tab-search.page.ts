import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RecipeSearchResult} from '../types/apiTypeRecipe';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Plugins } from '@capacitor/core';
import {IonSearchbar} from '@ionic/angular';
const { Keyboard } = Plugins;

@Component({
  selector: 'app-tab-search',
  templateUrl: './tab-search.page.html',
  styleUrls: ['./tab-search.page.scss'],
})
export class TabSearchPage implements OnInit {

  private searchText = new Subject<string>();

  searchResults: Observable<RecipeSearchResult[]>;
  amountResults: number;
  constructor(public apiService: ApiService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.searchResults = this.apiService.debounceRequest(this.searchText, this.apiService.getSearchRecipesResult);
    this.searchResults.subscribe(res => {
      this.amountResults = res.length;
    });
  }

  searchRecipes = (searchTerm: string) => {
    this.searchText.next(searchTerm);
  }

  closeKeyboard = async (): Promise<void> => {
    await Keyboard.hide();
  }

  async blurInput(input: IonSearchbar) {
    const nativeEl = await input.getInputElement();
    nativeEl.blur();
  }
}
