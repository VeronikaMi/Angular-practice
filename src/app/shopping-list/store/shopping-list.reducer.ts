import { Ingredient } from "../../shared/ingredient.model";
import *as SLActions from "./shopping-list.actions";


export interface State{
    ingredients:Ingredient[];
    updatedIngredient:Ingredient;
    updatedIngredientIndex : number;
}

const initialState = {
    ingredients: [
        new Ingredient('apples', 2),
        new Ingredient('bananas', 4),
    ],
    updatedIngredient:null,
    updatedIngredientIndex : -1
}

// will load initialState as a default if nothing is passed in
export function SLReducer(state:State = initialState, action: SLActions.ShoppingListActions) {
    switch (action.type) {
        case SLActions.ADD_INGREDIENT:
            return { //return object
                ...state,  //-copy prev state
                ingredients: [...state.ingredients, action.payload] //copy ingredients and add new to copy
            };

        case SLActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]//...spread array of new ingredients to not have a nested array
            };

        case SLActions.UPDATE_INGREDIENT:
            //find ingr to update
            const ingredient = state.ingredients[state.updatedIngredientIndex];

            //?
            const updatedIngredient = {
                ...ingredient, //old value
                ...action.payload //new overwrites old values
            }

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.updatedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                updatedIngredient:null,
                updatedIngredientIndex:-1
            };

        case SLActions.DELETE_INGREDIENT:
            const deletedIngredient = state.ingredients.filter((ig,igIndex)=>{
                return igIndex !== state.updatedIngredientIndex
            })
            return{
                ...state,
                ingredients:deletedIngredient,
                updatedIngredient:null,
                updatedIngredientIndex:-1
            };

        case SLActions.START_EDIT :
            return{
                ...state,
                updatedIngredient : {...state.ingredients[action.payload]},
                updatedIngredientIndex : action.payload
            };

        case SLActions.STOP_EDIT:
            return {
                ...state,
                updatedIngredient : null,
                updatedIngredientIndex:-1
            };

        default:
            return state; //unchanged state returned (ex. initial)
    }
}