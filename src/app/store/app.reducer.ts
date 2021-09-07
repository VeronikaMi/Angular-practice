import { ActionReducerMap } from "@ngrx/store";

import * as fromSL from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipe from "../recipes/store/recipes.reducer";

export interface AppState{
    shoppingList: fromSL.State, 
    auth: fromAuth.State,
    recipes:fromRecipe.State
}

export const AppReducer:ActionReducerMap<AppState> = { //gets added in StoreModule.forRoot(...)
    shoppingList: fromSL.SLReducer, 
    auth: fromAuth.AuthReducer,
    recipes:fromRecipe.RecipesReducer
}