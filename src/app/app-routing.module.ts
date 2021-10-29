import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'pokemon-list', loadChildren: () => import('./components/pages/pokemons/pokemon-list/pokemon-list.module').then(m => m.PokemonListModule) }, 
  { path: 'pokemon-details/:id1', loadChildren: () => import('./components/pages/pokemons/pokemon-details/pokemon-details.module').then(m => m.PokemonDetailsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
