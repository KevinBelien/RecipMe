export interface RecipeSearch {
    searchType: string;
    expression: string;
    results: RecipeSearchResult[];
    errorMessage: string;
}

export interface RecipeSearchResult {
    id: number;
    image: string;
    title: string;
    summary: string;
}
