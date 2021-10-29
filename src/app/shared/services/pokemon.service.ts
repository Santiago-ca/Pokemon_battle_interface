import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Pokemon } from '@shared/interfaces/pokemon.interface';

import {HttpClient} from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  searchPokemons(pokemon='', limit=150){
    let url = `${environment.baseUrlPokeApi}`;
    if(pokemon.length>0){
      url+=pokemon;
    }else{
      url+=`?limit=${limit}`;
    }
    return this.http.get<Pokemon[]>(url);
  }

  constructPokemons(pokemons:Pokemon[]):Pokemon[]{
    let allPokemons : Pokemon[] = [];
    for(const actPokemon of pokemons){
      this.getDetailsByName(actPokemon.name).pipe(
        take(1)
      ).subscribe((res:any) => {
        let allTypes: string[] = [];
        for(const slot of res.types){
          allTypes.push(slot.type.name);
        }
        if(res){
          allPokemons.push({
            id: res.id,
            name: res.name,
            image : this.getImageById(res.id.toString()),
            types: allTypes
          });
        }
      })
    }
    allPokemons = allPokemons.sort((p1,p2)=>{
      if(p1.id > p2.id){
        return 1;
      }else if(p1.id < p2.id){
        return -1;
      }
      return 0
    });
    return allPokemons;
  }

  getImageById(id: string):string{
    let base = "/assets/pokemon_images/";
    if(id.length===1){
      base+="00"+id;
    }else if(id.length===2){
      base+="0"+id;  
    }else {
      base+=id;
    }
    base+=".png"
    return base;
  }

  getDetails(id: number){
    return this.http.get<Pokemon>(`${environment.baseUrlPokeApi}${id}`)
  }


  getPokemon(res: any): Pokemon{
    let pokemon : Pokemon={
      id:-1,
      name:'',
      image:'',
      types:[]
    };
    if(res){
      let allTypes: string[] = [];
      for(const slot of res.types){
        allTypes.push(slot.type.name);
      }
      pokemon = {
        id: res.id,
        name: res.name,
        image : this.getImageById(res.id.toString()),
        types: allTypes
      };
     
    }
    return pokemon;
  }

  getDetailsByName(name: string){
    return this.http.get<Pokemon>(`${environment.baseUrlPokeApi}${name}`);
  }
}
