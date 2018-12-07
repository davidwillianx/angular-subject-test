import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  /**
   * Reffrente state of pokemon list
   */
  protected pokemons: Pokemon[];


  /**
   * Show the quantity of current pokemons state
   */
  protected amountOfPokemons: number;

  /**
   * Attack average
   */
  protected attackAverage: number;

  /**
   * Deff average
   */
  protected deffenseAverage: number;

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.pokemonService.pokemonsSubject
      .subscribe((pokemons: Pokemon[]) => {
        this.amountOfPokemons = pokemons.length;

        this.attackAverage = pokemons
          .map(pokemon => pokemon.attack)
          .reduce(attack => attack);

        this.deffenseAverage = pokemons
          .map(pokemon => pokemon.defense)
          .reduce(deffense => deffense);
      });
  }

}
