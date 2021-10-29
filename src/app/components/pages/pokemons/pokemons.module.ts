import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokemonDetailsComponent } from '@pokemons/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from '@pokemons/pokemon-list/pokemon-list.component';
import { PokemonComponent } from '@pokemons/pokemon.component';

const myComponents = [ 
  PokemonDetailsComponent,
  PokemonListComponent,
  PokemonComponent
]

@NgModule({
  declarations: [ ...myComponents ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ ...myComponents ]
})
export class PokemonsModule { }
