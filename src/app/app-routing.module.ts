import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //have to specify full match
    // { path:'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
    { path:'recipes', loadChildren:()=>import('./recipes/recipes.module').then(m=>m.RecipesModule)},
    { path: 'auth', loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule) },
    { path:'shopping-list', loadChildren:()=>import('./shopping-list/shopping-list.module').then(m=>m.SLModule) }

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}