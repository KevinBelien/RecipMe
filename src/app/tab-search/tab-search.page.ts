import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {RecipeSearchResult} from '../types/apiTypeRecipe';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Plugins, KeyboardInfo } from '@capacitor/core';
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
    console.log(this.searchResults);
  }

  searchRecipes = (searchTerm: string) => {
    this.searchText.next(searchTerm);
  }

  closeKeyboard = async (): Promise<void> => {
    await Keyboard.hide();
  }
}
