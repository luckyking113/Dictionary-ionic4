import { Injectable } from '@angular/core';
import dicdata from '../dicdata/dicdata';


@Injectable({
  providedIn: 'root'
})
export class DicdatabaseService {

  Chmeaning: string;
  EngFontInCh:string;
  Kameaning: string;
  EngFontInKa: string;

  allWords = [];  
  allDicData = [];


  constructor(){
    this.allDicData = dicdata;
    this.initDataForSearch();  
  }

  initDataForSearch(){     
    let dataArray = this.allDicData[0].searchkeyword;   
    var loopCount = 0;
    if (dataArray.length > 100) loopCount = 15;
    else loopCount = dataArray.length;    

    this.allWords = Array();    
    for (var i = 0; i < loopCount; i++){            
      this.getEngWordsInCh(dataArray[i].Chmeaning);
      this.getEngWordsInKa(dataArray[i].Kameaning);

      //initialize dictionay data for showing after loading screen.
      let element = [];
      element["word_id"] = dataArray[i].word_id;
      element["word"] = dataArray[i].word;
      element["Engmeaning"] = dataArray[i].Engmeaning;      
      element["Chmeaning"] = this.Chmeaning;
      element["Kameaning"] = this.Kameaning;
      element["EngFontInCh"] = this.EngFontInCh;       
      element["EngFontInKa"] = this.EngFontInKa;
      element["open"] = false;
      this.allWords[i] = element;       
    }   
    return this.allWords;   
  }

  getSearchResults(searchIndex, searchword){    
    let words = Array();
    var count = this.allDicData[searchIndex].searchkeyword.length;
    var loopCount = 0;
    for (var i = 0; i<count;i++){
      if (this.allDicData[searchIndex].searchkeyword[i].word.toLowerCase().includes(searchword)) {
        if (loopCount<20) {
          words.push(this.allDicData[searchIndex].searchkeyword[i]);        
          loopCount = loopCount + 1;
        }
        else break;
      }      
    }        
    return this.getDataForSearch(0, words);    
  }

  getDataForSearch(index, dataArray){        
    var loopCount = 0;
    if (dataArray.length > 100) loopCount = 15;
    else loopCount = dataArray.length;    

    this.allWords = Array();    
    for (var i = index; i < loopCount; i++){            
      this.getEngWordsInCh(dataArray[i].Chmeaning);
      this.getEngWordsInKa(dataArray[i].Kameaning);

      //initialize dictionay data for showing after loading screen.
      let element = [];
      element["word_id"] = dataArray[i].word_id;
      element["word"] = dataArray[i].word;
      element["Engmeaning"] = dataArray[i].Engmeaning;      
      element["Chmeaning"] = this.Chmeaning;
      element["Kameaning"] = this.Kameaning;
      element["EngFontInCh"] = this.EngFontInCh;       
      element["EngFontInKa"] = this.EngFontInKa;
      element["open"] = false;
      this.allWords[i] = element;       
    }   
    return this.allWords;   
  }

  getEngWordsInCh(words){        
    var fullXIndex = words.lastIndexOf("<p class='eng'>");
    if (fullXIndex == -1) this.EngFontInCh = "";
    else {
      var fullengtext = words.slice(fullXIndex, -1);
      var xindex = fullengtext.indexOf('>');
      var yindex = fullengtext.lastIndexOf('<');
      this.EngFontInCh= fullengtext.slice(xindex+1, yindex);    

      // get chmeaning 
      this.Chmeaning = words.slice(0, fullXIndex);    
    }
  }

  getEngWordsInKa(words){
    var fullXIndex = words.lastIndexOf("<p class='eng'>");
    if (fullXIndex == -1) return " ";
    else {
      var fullengtext = words.slice(fullXIndex, -1);
      var xindex = fullengtext.indexOf('>');
      var yindex = fullengtext.lastIndexOf('<');
      this.EngFontInKa = fullengtext.slice(xindex+1, yindex);    

      // get Kameaning 
      this.Kameaning = words.slice(0, fullXIndex);     
    }    
  }
}
