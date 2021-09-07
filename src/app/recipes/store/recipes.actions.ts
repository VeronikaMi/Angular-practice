import { Action } from "@ngrx/store";
import { Recipe } from "../recipes.model";

export const SET_RECIPES = "[Recipes] SET RECIPES";
export const FETCH_RECIPES = "[Recipes] FETCH RECIPES";
export const ADD_RECIPE = "[Recipes] ADD RECIPE";
export const UPDATE_RECIPE = "[Recipes] UPDATE RECIPE";
export const DELETE_RECIPE = "[Recipes] DELETE RECIPE";
export const STORE_RECIPES = "[Recipes] STORE RECIPES";


export class SetRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload:Recipe[]){}
}

export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload:Recipe){}
}

export class UpdadateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload:{index:number, newRecipe:Recipe}){}
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload:number){}
}

export class StoreRecipes implements Action{
    readonly type = STORE_RECIPES;
}

export type RecipeActions = SetRecipes | FetchRecipes | AddRecipe | UpdadateRecipe | DeleteRecipe |StoreRecipes;