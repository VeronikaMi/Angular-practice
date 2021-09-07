import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipes.actions";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  id:number;
  editMode:boolean =false;
  recipeForm:FormGroup;
  storeSub:Subscription;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState> ) { }


    get controls() { // a getter!
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  onSubmit(){
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      this.store.dispatch(new RecipesActions.UpdadateRecipe({index:this.id,newRecipe:this.recipeForm.value}));
    }
    else{
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

    this.onCancel();
  }

  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes').pipe(
        map(recipesState=>{
          return recipesState.recipes.find((recipe,index)=>{
            return index === this.id;
          }) 
        })
      ).subscribe(recipe=>{
        recipeName = recipe.name;
        recipeImgPath = recipe.imagePath;
        recipeDesc = recipe.description;
  
        console.log("Before   " + recipe.description);

        if(recipe['ingredients']){
          for(let ingredient of recipe.ingredients){
            recipeIngredients.push(
              new FormGroup({
                'name' : new FormControl(ingredient.name, Validators.required),
                'amount' : new FormControl(ingredient.amount,[
                 Validators.required,
                 Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      })
     

      
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImgPath, Validators.required),
      'description' : new FormControl(recipeDesc, Validators.required),
      'ingredients' : recipeIngredients
    })

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push( //dont forget to cast it !!
      new FormGroup({
       'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
         ])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(){
    if(this.storeSub){

      this.storeSub.unsubscribe();
    }
  }
}
