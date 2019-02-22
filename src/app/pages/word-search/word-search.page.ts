import { Component, OnInit, ViewChild } from '@angular/core';

import dicdata from '../../dicdata/dicdata';
import * as _ from 'lodash';
import { NavController , IonSlides } from '@ionic/angular';
// import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs';



@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage implements OnInit {

  @ViewChild('slider') slider: IonSlides; 
  page = 0;
  searchResults:{
    word_id: string,
    Eword: string,
    Engmeaning: string,
    Chimeaning: string,
    Kameaning: string,
  }[];

  allWords = [];     

  constructor(public navCtrl: NavController) { 
    this.allWords = dicdata[0].searchkeyword;
  }

  ngOnInit() { }

  searchkeyword(ev){
    if ((ev.target.value.toLowerCase().charCodeAt(0) < 97) || (ev.target.value.toLowerCase().charCodeAt(0) > 122)){
      console.log("insert correct word");      
    } else {      
      var asciicode = ev.target.value.toLowerCase().charCodeAt(0);
      var searchIndex = asciicode - 97;    // integer for search word      
       
      if (ev.target.value === ''){
        this.allWords = dicdata[0].searchkeyword;
      }
      else {        
        // console.log(dicdata[searchIndex].searchkeyword);       
        
        let words = _.filter(dicdata[searchIndex].searchkeyword, t=>(<any>t).word.toLowerCase().includes(ev.target.value));
        this.allWords = words;
      }      
    }
    
    // let searchword = ev.target.value;
    // let words = _.filter(dicdata, t=>(<any>t).word.toLowerCase().includes(searchword));
    // this.allWords = words;
  }

  selectedTab(index){
    this.slider.slideTo(index)
  }
}
