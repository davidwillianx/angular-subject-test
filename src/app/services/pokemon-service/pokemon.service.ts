import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Message } from 'src/app/models/message';

const API_ENDPOINT = `http://localhost:7777/pokemons`;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public pokemonsSubject: ReplaySubject<Pokemon[]> = new ReplaySubject(1);

  constructor(
    private http: HttpClient
  ) { }

  private load(resourceParameter: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${API_ENDPOINT}/${resourceParameter}`);
  }

  public loadReceived(): Observable<Pokemon[]> {
    return this.load('received');
  }

  public loadDeleted(): Observable<Pokemon[]> {
    return this.load('deleted');
  }

  public loadFavorited(): Observable<Pokemon[]> {
    return this.load('favorite');
  }

  public deletePokemon(pokemonId: number): Observable<Message> {
    return this.http.delete<Message>(`${API_ENDPOINT}/${pokemonId}`);
  }

  public receivePokemon(pokemonId: number): Observable<Message> {
    return this.http.get<Message>(`${API_ENDPOINT}/receive/${pokemonId}`);
  }

  public favoritePokemon(pokemonId: number): Observable<Message> {
    return this.http.get<Message>(`${API_ENDPOINT}/favorite/${pokemonId}`);
  }
}
