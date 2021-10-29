import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '@app/shared/interfaces/pokemon.interface';


@Component({
    selector:'app-pokemon',
    template: `
    <div class="card" (click)="select(pokemon)" >
        <div class="image">
            <a >
                <img 
                [src]="pokemon.image"
                [alt]="pokemon.name"
                class="card-img-top"
                />
            </a> 
        </div>
        <div class="card-inner">
            <div class="header ">
                <a  style="font-weight: bold;">
                    <p>{{pokemon.name | slice:0:15}}</p>
                </a>
            </div>
        </div>
        <ul class="list-group list-group-flush" *ngFor="let type of pokemon.types">
            <li class="list-group-item">{{type}}</li>
        </ul>
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PokemonComponent{
    @Input() pokemon: Pokemon;
    @Output() selectPokemon = new EventEmitter<any>();

    public select(pokemon : Pokemon):void{
        this.selectPokemon.emit(pokemon);
    }
    
}