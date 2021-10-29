import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { Observable } from 'rxjs';

import { Pokemon } from '@app/shared/interfaces/pokemon.interface';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { take } from 'rxjs/operators';
import { PokemonBattleApiService } from '@app/shared/services/pokemon-battle-api.service';
import { Battle } from '@app/shared/interfaces/battle.interface';

import { trigger, state, style, animate, transition, query, stagger} from '@angular/animations'

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  animations: [
    trigger('pokemon1Animation',[
      transition('* => *',[
        query('img',style({ transform: 'translateY(-100%)' })),
        query('img', animate('1900ms', style({ transform: 'translateY(0)'})))
      ])
    ])
  ]
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Pokemon;
  pokemon2$: Pokemon;
  showDiv : boolean=false;
  selectedPokemon1 : boolean=false;
  selectedPokemon2 : boolean=false;
  draw : boolean = false;
  battleInfo : Battle;
  moves : string[];
  winnerPoints : number;
  theresFight: boolean=false;
  winner: Pokemon;
  
  
  constructor(
    private route:ActivatedRoute,
    private pokemonSvc: PokemonService,
    private pokemonBattleSvc: PokemonBattleApiService,
    private location : Location,
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) =>{
      const id = params['id1'];
      if(id<0){
        this.selectedPokemon1=false;
        return;
      }
      this.selectedPokemon1=true;
      this.pokemonSvc.getDetails(id).pipe(take(1))
      .subscribe((res)=>{
        this.pokemon$ = this.pokemonSvc.getPokemon(res);
      });
    })
  }

  onGoBack():void{
    this.location.back();
  }

  fight(pokemon1: Pokemon, pokemon2: Pokemon){
    console.log('asdas');
    this.moves = [];
    this.pokemonBattleSvc.makeFight(pokemon1.name, pokemon2.name).pipe(take(1))
    .subscribe((res:any) => {
      this.battleInfo = res.battleResult;
      if(this.battleInfo){
        if(this.battleInfo.winner===''){
          this.draw = true;
          return;
        }
        if(this.battleInfo.winner===this.pokemon$.name){
          this.winner=this.pokemon$;
          this.winnerPoints=this.battleInfo.pokemon1Points;
          for(const move of this.battleInfo.pointsRecount){
            this.moves.push(move.pokemon1Move);
          }
        }else{
          this.winner=this.pokemon2$;
          this.winnerPoints=this.battleInfo.pokemon2Points;
          for(const move of this.battleInfo.pointsRecount){
            this.moves.push(move.pokemon2Move);
          }
        }
      }
      this.theresFight=true;
    });
  }

  onSetPokemon1(newPokemon : any){
    this.pokemon$=newPokemon;
    this.selectedPokemon1=true;
  }
  onSetPokemon2(newPokemon : any){
    this.pokemon2$=newPokemon;
    this.selectedPokemon2=true;
  }

  changePokemon1(){
    this.selectedPokemon1=false;
  }
  
  changePokemon2(){
    this.selectedPokemon2=false;
  }
}
