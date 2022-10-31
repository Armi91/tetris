import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  results = new BehaviorSubject([]);

  get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      webFrame.setVisualZoomLevelLimits(1, 1);
      webFrame.setLayoutZoomLevelLimits(0, 0);
    }
  }

  sendScore(result) {
    this.ipcRenderer.sendSync('score', result);
  }

  getScoreList() {
    this.ipcRenderer.sendSync('getScore');
    ipcRenderer.on('getScore-reply', (e, arg) => {
      console.log(arg);
    });

    ipcRenderer.on('asynchronous-reply', (e, arg) => {
      this.results.next(arg);
      console.log(arg);
      e.returnValue = true;
    });
  }
}
