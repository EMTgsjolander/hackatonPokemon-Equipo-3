import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { Pokemon, PokemonList } from 'src/app/interfaces/pokemon.interface';
import { InputCustomEvent, ModalController } from '@ionic/angular'
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import csvDownload from 'json-to-csv-export'

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {

  pokemonList: PokemonList[] = [];
  pokemons: Pokemon[] = [];
  searchField = '';
  loading = true;

  constructor(
    private pokeApiService: PokeApiService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getPokemonList();
  }

  async getPokemonList(url?: string) {
    this.loading = true;
    const list = await this.pokeApiService.getPokemonList(url);
    if (list) {
      for (const r of list.results) {
        const id = +r.url.split('/')[6];
        const pokemon = await this.pokeApiService.getPokemon(id);
        if (pokemon) this.pokemons.push(pokemon);
      }
      this.pokemonList.push(list)
    };
    this.loading = false;
  }

  async detailPokemon(pokemon: Pokemon):Promise<void>{
    try{
      const modal = await this.modalController.create({
        component: PokemonDetailComponent,
        componentProps: {
          pokemon
        }
      });
      await modal.present();
    }catch(err){
      
    }
  }

  async search(ev:any){
    const s = ev as InputCustomEvent
    this.searchField = s.detail.value as string;
  }

  async loadData(ev:any) {
    const list = this.pokemonList[this.pokemonList.length - 1];
    this.getPokemonList(list.next);
  }

  downloadCSV(): void{
    const data = this.pokemons.filter(p=>p.name.includes(this.searchField)).map(el=>{
      const altura = (el.height / 10);
      return { name: el.name, altura, peso: el.weight / 10 }
    });
    const dataToConvert = {
      data,
      filename: 'list-pokemon',
      delimiter: ',',
      headers: ['Name', 'Altura (m)', 'Peso (kg)']
    }
    csvDownload(dataToConvert);
  }

}
