import {Recipe} from './recipe';

export interface Favorite {
    user: string;
    recipe: Recipe;
    key?: string;
}
