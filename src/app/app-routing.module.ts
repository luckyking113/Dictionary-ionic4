import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'word-search', pathMatch: 'full' },  
  { path: 'word-search', loadChildren: './pages/word-search/word-search.module#WordSearchPageModule' },
  { path: 'favorite', loadChildren: './pages/favorite/favorite.module#FavoritePageModule' },
  { path: 'searchresult', loadChildren: './pages/searchresult/searchresult.module#SearchresultPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
