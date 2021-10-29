import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';

import { filter, take } from 'rxjs/operators'

import { Pokemon } from '@app/shared/interfaces/pokemon.interface';
import { PokemonService } from '@app/shared/services/pokemon.service';

type RequestInfo = {
  next: string,
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Output() setPokemon = new EventEmitter;


  pokemons: Pokemon[] = [];
  info: RequestInfo = {
    next: '',
  }
  private pokemonLimit = 150;
  private query: string='';
  private hideScrollHeight=200;
  private showScrollHeight=500;

  constructor(
    private pokemonSvc: PokemonService, 
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.onUrlChanged();
    }

  ngOnInit(): void {
    this.getPokemonsByQuery();
  }

  private onUrlChanged():void{
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
        () =>{
          this.pokemons=[];
          this.pokemonLimit=150;
          this.getPokemonsByQuery();
        }
      )
  }

  private getPokemonsByQuery():void{
    this.route.queryParams.pipe(
      take(1)
    ).subscribe(params=>{
      this.query = params['q'];
      this.getDataFromService();
    })
  }

  private getDataFromService():void{
    this.pokemonSvc.searchPokemons(this.query,this.pokemonLimit)
    .pipe(
      take(1)
    ).subscribe( (res:any) => {
      if(res?.results?.length){
        const {info, results} = res;
        const auxPokemons = [...this.pokemons, ...results];
        this.pokemons = this.pokemonSvc.constructPokemons(auxPokemons);
        this.info = info;
        console.log('unor');
        console.log(this.pokemons);
       

        console.log('or');
        console.log(this.pokemons);
      }else{
        this.pokemons = [];
      }
      
    })
  }

  onSelectPokemon(selPokemon : any){
    this.setPokemon.emit(selPokemon);
  }
}
