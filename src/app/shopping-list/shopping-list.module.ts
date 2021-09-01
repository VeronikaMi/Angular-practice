import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

// dont forget to include this module in app.module imports array!!!

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        // CommonModule,
        FormsModule,
        RouterModule.forChild([
             { path: '', component: ShoppingListComponent },
        ]),
        SharedModule
        
    ],
})
export class SLModule{}