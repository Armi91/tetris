import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  points = new BehaviorSubject(0);
  nick = new BehaviorSubject('');

  constructor() { }
}
