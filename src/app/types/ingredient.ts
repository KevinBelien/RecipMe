export interface IngredientI {
    name: string;
}

export class Ingredient {
    name: string;

    constructor(obj: IngredientI) {
        Object.assign(this, obj);
    }
}

