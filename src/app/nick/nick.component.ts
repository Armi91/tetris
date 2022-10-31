import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { HighscoreService } from '../highscore.service';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { BlockrainService } from '../game/blockrain.service';

@Component({
  selector: 'app-nick',
  templateUrl: './nick.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../../node_modules/simple-keyboard/build/css/index.css',
    './nick.component.scss'
  ]
})
export class NickComponent implements OnInit {


  value = '';
  keyboard: Keyboard;

  constructor(private highscore: HighscoreService,
              private router: Router,
              private electron: ElectronService,
              private blockrain: BlockrainService) { }

  ngOnInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      maxLength: 9,
      layout: {
        'default': [
          '1 2 3 4 5 6 7 8 9 0',
          'Q W E R T Y U I O P',
          'A S D F G H J K L',
          'Z X C V B N M',
          '- {space} {bksp}'
        ],
        'shift': [
          '! @ # $ % ^ & * ( ) _ +',
          'Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {shift}',
          '{space} {bksp}'
        ]
      }
    });
  }

  onChange = (input: string) => {
    this.value = input;
  }

  onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{lock}') {
      this.handleShift();
    }
  }

  handleShift = () => {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

  goTo(e) {
    e.preventDefault();
    if (this.value !== '') {
      this.highscore.nick.next(this.value);
      const result = {
        nick: this.value,
        score: this.blockrain.score.getValue()
      };
      this.electron.sendScore(result);
    }
    this.router.navigate(['/highscore']);
  }

  onInputChange(e) { }

}
