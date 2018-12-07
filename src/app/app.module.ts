import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TablePokemonsComponent } from './pages/table-pokemons/table-pokemons.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { DashComponent } from './pages/dash/dash.component';
import { RouterRoutingModule } from './router/router-routing.module';
import { PokemonService } from './services/pokemon-service/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    TablePokemonsComponent,
    SideMenuComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterRoutingModule,
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
