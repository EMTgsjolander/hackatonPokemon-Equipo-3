import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { ModalController } from '@ionic/angular';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  @Input() pokemonId: number | undefined;

  constructor(
    private modalC: ModalController
  ) {}

  ngOnInit() {}

  async detail(pokemon: Pokemon | undefined): Promise<void> {
    const modal = await this.modalC.create({
      component: PokemonDetailComponent,
      cssClass: 'modal-80',
      componentProps: { pokemon }
    });
    await modal.present();
  }

}
