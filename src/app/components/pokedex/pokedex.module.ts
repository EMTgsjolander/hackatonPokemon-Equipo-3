import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    PokemonCardComponent,
    PokeListComponent,
    PokemonDetailComponent,
  ],
  exports: [
    PokemonCardComponent,
    PokeListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
  ],
})
export class PokedexModule { }
