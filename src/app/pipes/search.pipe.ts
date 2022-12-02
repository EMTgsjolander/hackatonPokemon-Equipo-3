import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';

@Pipe({
    name: 'search',
  })
  export class SearchPipe implements PipeTransform {
    transform(pokemons: Pokemon[], search: string): Pokemon[] {
      if (search === '' || !search) return pokemons;
      return pokemons.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
    }
  }
