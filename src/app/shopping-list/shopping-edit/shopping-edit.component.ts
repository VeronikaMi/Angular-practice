import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as SLActions from '../store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('ingredientName')  Name:ElementRef;
  // @ViewChild('ingredientAmount')  Amount:ElementRef;
  // @Output() add = new EventEmitter<Ingredient>();

  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(data => {
      if (data.updatedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = data.updatedIngredient;
        // this.editedItemIndex = data.updatedIngredientIndex;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else {
        this.editMode = false;
      }
    })
    // this.subscription = this.slService.startedEdtiting.subscribe((index)=>{
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.slService.getIngredient(index);
    //   this.form.setValue({
    //     name: this.editedItem.name,
    //     amount:this.editedItem.amount
    //   })
    // })
  }

  onSubmit(form: NgForm) {
    // console.log(a);
    // const iName = this.Name.nativeElement.value;
    // const iAmount = this.Amount.nativeElement.value;
    const values = form.value;
    const ingr = new Ingredient(values.name, values.amount);

    // this.add.emit(ingr);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex,ingr);
      this.store.dispatch(new SLActions.UpdateIngredient(ingr ));
    }
    else {
      // this.slService.addIngredient(ingr);
      this.store.dispatch(new SLActions.AddIngredient(ingr));
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new SLActions.StopEditing);
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


}
