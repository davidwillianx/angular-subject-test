import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

const FAVORITED_URL = 'favorited';
const RECEIVED_URL = 'received';
const DELETED_URL = 'deleted';

@Component({
  selector: 'app-table-pokemons',
  templateUrl: './table-pokemons.component.html',
  styleUrls: ['./table-pokemons.component.css']
})
export class TablePokemonsComponent implements OnInit, OnDestroy {

  /**
   * Lista de pokemons que vais exibida
   */
  protected pokemons: Pokemon[];

  /**
   * Quantidade de pokemons exibidos no momento
   */
  protected pokemonsCurrentSize: number;

  /**
   * Poke type param (favorite / deleted/ received)
   */
  private pokeType: string;



  /**
   * Pokemon subscription reference
   */
  private pokemonSubscription: Subscription;

  /**
   * Router subscription reference
   */
  private paramSubscription: Subscription;

  /**
   * Start pokemons based on the type selected on the URL
   * @param activatedRoute current route to get the type of pokemons to show
   * @param pokemonService request pokemons based on this service
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.params.subscribe(params => {
      this.pokeType = params['pokeType'];
      this.loadContent();
    });

    this.pokemonSubscription = this.pokemonService.pokemonsSubject
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      });

  }

  public ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
    this.paramSubscription.unsubscribe();
  }

  public loadContent(): void {

    if (this.pokeType === FAVORITED_URL) {
      this.favoritedPokemons();
    }

    if (this.pokeType === RECEIVED_URL) {
      this.receivedPokemons();
    }

    if (this.pokeType === DELETED_URL) {
      this.deletedPokemons();
    }

  }

  private favoritedPokemons(): void {
    this.pokemonService.loadFavorited()
      .subscribe((favoritePokemons: Pokemon[]) => {
        this.pokemonsCurrentSize = favoritePokemons.length;
        this.pokemonService.pokemonsSubject.next(favoritePokemons);
      });
  }

  public deletedPokemons(): void {
    this.pokemonService.loadDeleted()
      .subscribe((favoritePokemons: Pokemon[]) => {
        this.pokemonsCurrentSize = favoritePokemons.length;
        this.pokemonService.pokemonsSubject.next(favoritePokemons);
      });
  }

  public receivedPokemons(): void {
    this.pokemonService.loadReceived()
      .subscribe((favoritePokemons: Pokemon[]) => {
        this.pokemonsCurrentSize = favoritePokemons.length;
        this.pokemonService.pokemonsSubject.next(favoritePokemons);
      });
  }

  public deletePokemon(pokemon: Pokemon): void {
    this.pokemonService.deletePokemon(pokemon.id)
      .subscribe((message: Message) => {
        this.loadContent();
      });
  }

  public favoritePokemon(pokemon: Pokemon): void {
    this.pokemonService.favoritePokemon(pokemon.id)
      .subscribe((message: Message) => {
        this.loadContent();
      });
  }

  public receivePokemon(pokemon: Pokemon): void {
    this.pokemonService.receivePokemon(pokemon.id)
      .subscribe((message: Message) => {
        this.loadContent();
      });
  }

}
