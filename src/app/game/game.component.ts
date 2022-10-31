import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { BlockrainService } from './blockrain.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game;
  pause = false;
  level: BehaviorSubject<any>;
  score: BehaviorSubject<any>;
  time = 0;
  nextShape: BehaviorSubject<any>;
  tInterval;
  tStart;
  audio: HTMLAudioElement;

  constructor(private blockrainService: BlockrainService) {
    this.score = this.blockrainService.score;
    this.nextShape = this.blockrainService.nextShape;
    this.level = this.blockrainService.level;
  }

  ngOnInit() {
    this.game = $('#game-board').blockrain({
      theme: 'segro',
      touchControls: true,
      speed: 10,
      onStart: () => {
        this.tStart = new Date().getTime();
        this.tInterval = setInterval(() => {
          this.startTimer();
        }, 1);
      },
      onLine: () => {
        this.playSound('line');
      },
      onGameOver: () => {
        this.playSound('gameover');
      }
    });
    this.audio = new Audio();
  }

  playSound = (type) => {
    switch (type) {
      case 'line':
        this.audio.src = './assets/sounds/win-level.wav';
        this.audio.play();
        break;
      case 'gameover':
        this.audio.src = './assets/sounds/game-over.wav';
        this.audio.play();
        break;
    }
  }

  startTimer = () => {
    const currentTime = new Date().getTime();
    this.time = currentTime - this.tStart;
  }

  togglePause(e) {
    e.preventDefault();
    if (!this.pause) {
      this.game.blockrain('pause');
    } else {
      this.game.blockrain('resume');
    }
    this.pause = !this.pause;
  }

  clickLeft(e) {
    e.preventDefault();
  }

  clickRight(e) {
    e.preventDefault();
  }

  clickRotate(e) {
    e.preventDefault();
  }

  clickDown(e) {
    e.preventDefault();
  }

}
