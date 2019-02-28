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
    ChFont: string,
    KhFont: string,
    open:boolean,
  }[];

  allWords = [];  
  keyword:string;       

  constructor(public navCtrl: NavController, public admobFree: AdMobFree,  private platform: Platform,private rd: Renderer2) { 
    this.allWords = dicdata[0].searchkeyword;  
    this.searchResults = this.allWords;
    this.generateSearchData(this.allWords); //generate dic data for showing in the first screen.        
    this.getAdmobFree();
  }

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

  ngOnInit() { }

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
        this.generateSearchData(this.allWords);
      }
      else {  
        var searchword = ev.target.value.toLowerCase();              
        let words = _.filter(dicdata[searchIndex].searchkeyword, t=>(<any>t).word.toLowerCase().includes(searchword));
        this.searchResults = words;                
        
        for (var i=0;i<this.searchResults.length;i++){
          this.searchResults[i].EngFontInCh = this.getEngWordsInCh(words[i].Chmeaning, i);
          this.searchResults[i].EngFontInKa = this.getEngWordsInKa(words[i].Chmeaning, i);
        }  
      }
    } else {      
      console.log("insert correct word");
    }
  }

  getEngWordsInCh(words, i){
    var chfullword = words;
    var fullXIndex = chfullword.lastIndexOf("<p class='eng'>");

    if (fullXIndex == -1) return " ";
    else {
      var fullengtext = chfullword.slice(fullXIndex, -1);
      var xindex = fullengtext.indexOf('>');
      var yindex = fullengtext.lastIndexOf('<');
      var result = fullengtext.slice(xindex+1, yindex);    

      // get chmeaning 
      var chimeaningresult = chfullword.slice(0, fullXIndex);
      //set chinese meaning 
      this.searchResults[i].Chmeaning = chimeaningresult;
      return result;
    }
  }

  getEngWordsInKa(words , i){
    var Kameaning = words;
    var fullXIndex = Kameaning.lastIndexOf("<p class='eng'>");
    if (fullXIndex == -1) return " ";
    else {
      var fullengtext = Kameaning.slice(fullXIndex, -1);
      var xindex = fullengtext.indexOf('>');
      var yindex = fullengtext.lastIndexOf('<');
      var result = fullengtext.slice(xindex+1, yindex);    

      // get Kameaning 
      var kameaningresult = Kameaning.slice(0, fullXIndex);
      //set katch meaning 
      this.searchResults[i].Kameaning = kameaningresult;
      return result;
    }    
  }

  generateSearchData(searchDatas){
    for(var i=0; i<searchDatas.length;i++){
      this.searchResults[i].EngFontInCh = this.getEngWordsInCh(searchDatas[i].Chmeaning, i);
      this.searchResults[i].EngFontInKa = this.getEngWordsInKa(searchDatas[i].Kameaning, i);
      this.searchResults[i].open = false; 
    }
  }

  selectedTab(index){
    this.slider.slideTo(index)
  }

  toggleSection(i) {   
    this.searchResults[i].open = !this.searchResults[i].open;
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
    this.searchResults[i].open = !this.searchResults[i].open;
  }
}
