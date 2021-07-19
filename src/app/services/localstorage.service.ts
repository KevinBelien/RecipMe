import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {Ingredient} from '../types/ingredient';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setIngredient = async (ingredients: Ingredient[]): Promise<void> => {
      await Storage.set({
        key: 'ingredients',
        value: JSON.stringify(ingredients)
      });
    }


  getIngredients = async (): Promise<Ingredient[]> => {
    const item = await Storage.get({ key: 'ingredients' });
    return JSON.parse(item.value);
  }

  removeIngredients = async (): Promise<void> => {
    await Storage.remove({ key: 'ingredients' });
  }

  /*async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }*/

  clearAll = async (): Promise<void> => {
    await Storage.clear();
  }
}
