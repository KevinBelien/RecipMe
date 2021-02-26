export interface Recipe {
    id: number;
    image: string;
    title: string;
    readyInMinutes: string;
    instructions?: [];
    ingredients: object[];
}
