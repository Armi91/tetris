import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighscoreService } from '../highscore.service';
import { BlockrainService } from '../game/blockrain.service';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  constructor(private router: Router,
              private highscoreService: HighscoreService,
              private blockrainService: BlockrainService) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/nick']);
    }, 3000);
  }

}
