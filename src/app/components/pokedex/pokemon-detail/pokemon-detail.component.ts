import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { ModalController } from '@ionic/angular';
import { UtilitiesService } from '../../../services/utilities.service';
import { PokeApiService } from '../../../services/poke-api.service';

interface Evolution {
  pokemon: Pokemon | undefined;
  order: number;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, AfterViewInit {
  shiny = false;
  @Input() pokemon: Pokemon | undefined;
  evolutions: Evolution[] = [];

  constructor(
    public modalC: ModalController,
    private utilities: UtilitiesService,
    private api: PokeApiService
  ) {}

  ngOnInit() {
    this.getSpecies();
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('pokemon-detail');
    this.utilities.styleScrollbars(element);
  }

  async getSpecies(): Promise<void> {
    if (this.pokemon) {
      // Evolves
      const id = +this.pokemon.species.url.split('/')[6];
      const resp = await this.api.getSpecie(id);
      console.log(resp);
      if (resp) {
        // @ts-ignore
        const id = +resp.evolution_chain.url.split('/')[6];
        await this.getEvolutions(id);
      }
    }
  }

  async getSpeciesResp(id: number): Promise<void> {
    
  }

  async getEvolutions(id: number): Promise<void> {
    if (this.pokemon) {
      const resp = await this.api.getEvolutions(id);
      console.log(resp);
      if (resp) {
        let i = 0;
        for (const evolve of resp.chain.evolves_to) {
          i = i + 1;
          const id = +evolve.species.url.split('/')[6];
          const pokemon = await this.api.getPokemon(id);
          console.log(pokemon);
          this.evolutions.push({order: 0, pokemon});

          if (i === 1) {
            const specieId = +evolve.species.url.split('/')[6];
            const resp = await this.api.getSpecie(specieId);
            if (resp) {
              // @ts-ignore
              if (resp['evolves_from_species']) {
                // @ts-ignore
                const pokeId = +resp['evolves_from_species'].url.split('/')[6];
                const pokemon = await this.api.getPokemon(pokeId);
                console.log(pokemon);
                this.evolutions.unshift({order: 0, pokemon});
              }
            }
          }

          for (const ev of evolve.evolves_to) {
            const id = +ev.species.url.split('/')[6];
            const pokemon = await this.api.getPokemon(id);
            console.log(pokemon);
            this.evolutions.push({order: 0, pokemon});
          }
        }
      }
    }
  }

}
