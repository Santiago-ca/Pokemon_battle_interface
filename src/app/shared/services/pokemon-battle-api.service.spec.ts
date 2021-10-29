import { TestBed } from '@angular/core/testing';

import { PokemonBattleApiService } from './pokemon-battle-api.service';

describe('PokemonBattleApiService', () => {
  let service: PokemonBattleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonBattleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
