import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';

import dicdata from '../../dicdata/dicdata';
import * as _ from 'lodash';
import { NavController , IonSlides, Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx'; 

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage implements OnInit {

  @ViewChild('slider') slider: IonSlides;    
  page = 0;
  searchResults:{
    word_id: number,
    word: string,
    Engmeaning: string,
    Chmeaning: string,
    Kameaning: string,
    EngFontInCh: string,
    EngFontInKa: string,
    open:boolean,
  }[];

  Chmeaning: string;
  EngFontInCh:string;
  Kameaning: string;
  EngFontInKa: string;

  allWords = [];  
  keyword:string;     

  constructor(public navCtrl: NavController, public admobFree: AdMobFree,  private platform: Platform,private rd: Renderer2) { 
    
    //initialize dictionay data for showing after loading screen.
    this.getDataForSearch(0, dicdata[0].searchkeyword);           
    // console.log(this.allWords);
    this.getAdmobFree();   
  }

  ngOnInit() { }
  
  getAdmobFree(){
    if (this.platform.is('android')) {
      console.log('this.is android');
      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: true,//,
          id: 'ca-app-pub-7403328130531745~9754019527'
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {
        console.log("success get admob");

      }).catch(e => alert(e));
    } else {
      console.log('this is ios');
      let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // Remove in production
        autoShow: true,//,
        id: 'ca-app-pub-7403328130531745~3025616186'
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {
        console.log("success get admob");

      }).catch(e => alert(e));
    }
  }

 

  searchkeyword(ev){    
    //65 ~ 90  97~122             
    if (((ev.target.value.charCodeAt(0) >= 97) && (ev.target.value.charCodeAt(0) <= 122))
        ||((ev.target.value.charCodeAt(0) >= 65) && (ev.target.value.charCodeAt(0) <= 90))){
      var asciicode = ev.target.value.charCodeAt(0);      
      if (asciicode > 90) {
        var searchIndex = asciicode - 97;    // integer for search word            
      }
      else {
        var searchIndex = asciicode - 65;    // integer for search word     
      }          
        
      if (ev.target.value === ''){
        console.log("insert data for search");
      }
      else {  
        var searchword = ev.target.value.toLowerCase();                      
        let words = this.getSearchResults(searchIndex, searchword);
        
        this.getDataForSearch(0, words); 
        // _.filter(dicdata[searchIndex].searchkeyword, t=>(<any>t).word.toLowerCase().includes(searchword));                                     
        
      }
    } else {      
      console.log("insert correct word");
    }    
  }

  getSearchResults(searchIndex, searchword){    
    let words = Array();
    var count = dicdata[searchIndex].searchkeyword.length;
    var loopCount = 0;
    for (var i = 0; i<count;i++){
      if (dicdata[searchIndex].searchkeyword[i].word.toLowerCase().includes(searchword)) {
        if (loopCount<20) {
          words.push(dicdata[searchIndex].searchkeyword[i]);        
          loopCount = loopCount + 1;
        }
        else break;
      }      
    }    
    return words;     
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

  selectedTab(index){
    this.slider.slideTo(index)
  }

  toggleSection(i) {   
    this.allWords[i].open = !this.allWords[i].open;
    var txtForClass = "." + "changeColor" + i.toString();
    var txtForClass1 = "." + "changeColor1" + i.toString();  
    var txtForClass2 = "." + "changeColor2" + i.toString();      

    let shadesEl=document.querySelector(txtForClass); 
    let shadesEl1=document.querySelector(txtForClass1); 
    let shadesEl2=document.querySelector(txtForClass2);    
    
    if (shadesEl.classList.contains('changeColor')) {
      shadesEl.classList.remove('changeColor');
      shadesEl1.classList.remove('changeColor');
      shadesEl2.classList.remove('changeColor');
    } else {
      shadesEl.classList.add('changeColor');
      shadesEl1.classList.add('changeColor');
      shadesEl2.classList.add('changeColor');
    }
  }

  toggleItem(i){
    console.log("test toggle");
    this.allWords[i].open = !this.allWords[i].open;
  }

  // showMoreResult(){
  //   console.log("showMoreIndex");         
  // }
}
