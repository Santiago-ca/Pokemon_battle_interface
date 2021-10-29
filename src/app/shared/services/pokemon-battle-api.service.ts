import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Battle } from '../interfaces/battle.interface';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonBattleApiService {

  constructor(private http: HttpClient) { }

  makeFight(pokemon1name: string, pokemon2name: string){
    let url = `${environment.baseUrlBattlePokeApi}`+`pokemon1=${pokemon1name}&pokemon2=${pokemon2name}`;
    return this.http.get<Battle>(url);
  }
}
