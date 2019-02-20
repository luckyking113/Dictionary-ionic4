import { Component, OnInit } from '@angular/core';
import dicdata from '../../dicdata/dicdata';
// import { forEach } from '@angular/router/src/utils/collection';
import * as _ from 'lodash';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage implements OnInit {

  searchResults:{
    id: number,
    word: string,
    meaning: string,
  }[];

  queryText: '';

  constructor() { 
    this.searchResults = dicdata
  }

  ngOnInit() {}

  updateTeams(ev){    
    let searchword = ev.target.value;
    let words = _.filter(dicdata, t=>(<any>t).word.toLowerCase().includes(searchword));
    this.searchResults = words;
  }
}
