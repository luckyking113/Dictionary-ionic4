import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NavController , IonSlides, Platform} from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx'; 
import { DicdatabaseService } from '../../services/dicdatabase.service';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage implements OnInit {
  public noResult = [
    {
      content: 'No Result',      
    },
    {
      content: 'No Result',      
    },
    {
      content: 'No Result',     
    },
  ];

  @ViewChild('slider') slider: IonSlides;    
  
  page = 0;

  Chmeaning: string;
  EngFontInCh:string;
  Kameaning: string;
  EngFontInKa: string;

  searchResults = [];    
  initialResults = [];
  keyword:string;     
  favoriteIcon: string;
  visible: boolean;
  resultCompare:boolean = true;

  constructor(public navCtrl: NavController,public admobFree: AdMobFree, 
    private platform: Platform, private DicData: DicdatabaseService ) { 
    this.favoriteIcon = 'star-outline';
    this.visible = false;
    this.searchResults = this.DicData.initDataForSearch(); 
    this.initialResults = this.searchResults;      
    this.getAdmobFree();      

   
  }

  ngOnInit(){ }


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

      var searchword = ev.target.value.toLowerCase();                      
      this.searchResults = this.DicData.getSearchResults(searchIndex, searchword);   
      if (this.searchResults.length == 0 ) {this.resultCompare = false}
      else this.resultCompare = true;          

    } else {      
      this.searchResults = this.initialResults;
    }    
  }  

  selectedTab(index){
    this.slider.slideTo(index)
  }

  toggleSection(i) {   
    this.searchResults[i].open = !this.searchResults[i].open;   
  }

  toggleItem(i){    
    this.searchResults[i].open = !this.searchResults[i].open;
  }

  
  toggleFavorite(i){    
    var txtToAddClass = "."+"iconIndex"+i.toString();
    var txtToAddClass1 = "."+"iconIndex3"+i.toString();
    var txtToAddClass2 = "."+"iconIndex2"+i.toString();
    this.searchResults[i].open = !this.searchResults[i].open;  

    let shadesEl = document.querySelector(txtToAddClass);
    let shadesEl3 = document.querySelector(txtToAddClass1);
    let shadesEl2 = document.querySelector(txtToAddClass2);

    if (shadesEl.classList.contains('favoriteIconColor'))
    {
      shadesEl.classList.remove('favoriteIconColor');
      shadesEl3.classList.remove('favoriteIconColor');
      shadesEl2.classList.remove('favoriteIconColor');
      this.DicData.deleteFavoriteData(this.searchResults[i]);
      this.visible = !this.visible;       
    } else {
      shadesEl.classList.add('favoriteIconColor');   
      shadesEl3.classList.add('favoriteIconColor');   
      shadesEl2.classList.add('favoriteIconColor');   
      this.DicData.saveFavoriteData(this.searchResults[i]);
      this.visible = !this.visible;          
    }
  }
    
  getAdmobFree(){
    if (this.platform.is('android')) {      
      let bannerConfig: AdMobFreeBannerConfig = {
          isTesting: true, // Remove in production
          autoShow: true,//,
          id: 'ca-app-pub-7403328130531745~9754019527'
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {       
      }).catch(e => alert(e));
    } else {      
      let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // Remove in production
        autoShow: true,//,
        id: 'ca-app-pub-7403328130531745~3025616186'
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {
      }).catch(e => alert(e));
    }
  } 
}
