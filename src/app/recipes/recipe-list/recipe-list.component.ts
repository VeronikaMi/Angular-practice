import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes.model';
import * as fromApp from "../../store/app.reducer";
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  subscription : Subscription;
  
  constructor(private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(map(resData=>resData.recipes)).subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  onNewAdd(){
    this.router.navigate(['new'],{relativeTo : this.route});
  }
}
