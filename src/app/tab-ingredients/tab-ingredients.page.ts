import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../types/ingredient';
import {LocalstorageService} from '../services/localstorage.service';
import {AlertController} from '@ionic/angular';
import {NotificationsService} from '../services/notifications.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tab-ingredients',
  templateUrl: './tab-ingredients.page.html',
  styleUrls: ['./tab-ingredients.page.scss'],
})
export class TabIngredientsPage implements OnInit {

  newIngredient: Ingredient;
  ingredients: Ingredient[];

  title = '';
  constructor(public localstorageService: LocalstorageService,
              public alertController: AlertController,
              public notService: NotificationsService,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ingredients = [];
    this.getIngredients().then();
  }

  getIngredients = async (): Promise<void> => {
      this.localstorageService.getIngredients().then(result => {
        this.ingredients = result;
      });
}

  AddIngredient = async  (ingredientName: string): Promise<void> => {
    await this.getIngredients();
    if (this.ingredients == null){
      this.ingredients = [];
    }
    if (ingredientName !== ''){
      if (!this.ingredients.find(({name}) => name.toLowerCase() === ingredientName.toLowerCase())){
        this.newIngredient = new Ingredient({name: ingredientName});
        this.ingredients.push(this.newIngredient);
        await this.localstorageService.setIngredient(this.ingredients);
        this.newIngredient = {name: ''};
      }
      else{
        await this.notService.showToast('this item has already been add');
      }
    }
    else{
      await this.notService.showToast('name is required!');
    }

    await this.getIngredients();
  }

  removeIngredient = async (name: string): Promise<void> => {
    await this.localstorageService.removeIngredients();
    this.ingredients = this.ingredients.filter(item => item.name !== name);
    await this.localstorageService.setIngredient(this.ingredients);
    await this.getIngredients();
  }

  removeAllIngredients = async (): Promise<void> => {
    await this.localstorageService.clearAll();
    this.ingredients = [];
    await this.localstorageService.setIngredient(this.ingredients);
  }

  presentLabelAlert = async (): Promise<void> => {
    const alert = await this.alertController.create({
      header: 'New ingredient',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.AddIngredient(data.name);
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Ingredient'
        }
      ],
    });
    await alert.present();
  }
}
