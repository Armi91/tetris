import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { HomeComponent } from './home/home.component';
import { PlayAgainComponent } from './play-again/play-again.component';
import { GameComponent } from './game/game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { NickComponent } from './nick/nick.component';
import { HighscoreComponent } from './highscore/highscore.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'play-again',
    component: PlayAgainComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'game-over',
    component: GameOverComponent
  },
  {
    path: 'nick',
    component: NickComponent
  },
  {
    path: 'highscore',
    component: HighscoreComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
