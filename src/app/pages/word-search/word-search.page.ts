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
    Eword: string,
    Engmeaning: string,
    Chimeaning: string,
    ChForEng: string,
    Kameaning: string,
    KaForEng: string
  }[];

  allWords = [];  
  keyword:string;   

  constructor(public navCtrl: NavController, public admobFree: AdMobFree,  private platform: Platform,private rd: Renderer2) { 
    this.allWords = dicdata[0].searchkeyword;    
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
        this.allWords = dicdata[0].searchkeyword;
      }
      else {     
        var searchword = ev.target.value.toLowerCase();      
          
        let words = _.filter(dicdata[searchIndex].searchkeyword, t=>(<any>t).word.toLowerCase().includes(searchword));
        var katchtextforeng = words[0].Kameaning;
        this.allWords = words;
        console.log(katchtextforeng);
        console.log(this.allWords);
      }
    } else {      
      console.log("insert correct word");
    }
  }

  selectedTab(index){
    this.slider.slideTo(index)
  }

  toggleSection(i) {
    console.log(i);
    this.allWords[i].open = !this.allWords[i].open;
    var txtForClass = "." + "changeColor" + i.toString();
    var txtForClass1 = "." + "changeColor1" + i.toString();  
    var txtForClass2 = "." + "changeColor2" + i.toString();      

    let shadesEl=document.querySelector(txtForClass); 
    let shadesEl1=document.querySelector(txtForClass1); 
    let shadesEl2=document.querySelector(txtForClass2);    

    console.log(shadesEl.classList);
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
    this.allWords[i].open = !this.allWords[i].open;
  }
}
