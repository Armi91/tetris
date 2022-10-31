import { Component, OnInit } from '@angular/core';
import { HighscoreService } from '../highscore.service';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  results;

  constructor(private highscore: HighscoreService, private electron: ElectronService) {
    // for (let i = 0; i < 10; i++) {
    //   this.results[i] = {
    //     nick: 'TWÓJ NICK',
    //     score: 99999
    //   };
    // }
    this.results = this.electron.results;
  }

  ngOnInit() {
    this.electron.getScoreList();
  }

}
