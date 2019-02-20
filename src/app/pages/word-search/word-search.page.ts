import { Component, OnInit } from '@angular/core';
import dicdata from '../../dicdata/dicdata';

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

  constructor() { }

  ngOnInit() {
    // console.log(dicdata);
    this.searchResults = dicdata;
  }

}
