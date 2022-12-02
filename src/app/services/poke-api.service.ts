import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonList } from 'src/app/interfaces/pokemon.interface';
import { EvolveResp } from '../interfaces/respEvolves.interface';
// const log = new Logger('poke-api-service');

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(
    private http: HttpClient,
  ) { }
  
  async getPokemonList(url?: string){
    if (!url) url = `${environment.api}`;

    const resp = await this.http.get<PokemonList | undefined>(url).toPromise();
    return resp;
  }

  async getPokemon(id: number): Promise<Pokemon | undefined>{
    const $resp = await this.http.get<Pokemon | undefined>(`${environment.api}/${id}`).toPromise();
    return $resp;
  }

  async getEvolutions(id: number): Promise<EvolveResp | undefined> {
    const $resp = await this.http.get<EvolveResp | undefined>(`https://pokeapi.co/api/v2/evolution-chain/${id}`).toPromise();
    return $resp;
  }

  async getSpecie(id: number): Promise<unknown | undefined> {
    const $resp = await this.http.get<EvolveResp | undefined>(`https://pokeapi.co/api/v2/pokemon-species/${id}`).toPromise();
    return $resp;
  }
}
