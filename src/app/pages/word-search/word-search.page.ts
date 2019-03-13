import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NavController , IonSlides, Platform} from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx'; 
import { DicdatabaseService } from '../../services/dicdatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.page.html',
  styleUrls: ['./word-search.page.scss'],
})
export class WordSearchPage implements OnInit{
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
  loopCount = Array();

  constructor(public navCtrl: NavController,public admobFree: AdMobFree, 
    private platform: Platform, private DicData: DicdatabaseService , private router: Router ) { 
    this.loopCount = Array(3).fill(0).map((x,i)=>i);
    this.favoriteIcon = 'star-outline';
    this.visible = false;
    this.searchResults = this.DicData.initDataForSearch(); 
    this.initialResults = this.searchResults;      
    this.getAdmobFree();      
  }

  ngOnInit(){    
  }

  ionViewDidEnter(){    
    this.DicData.getLocalStorage();    
  }

  ionViewWillLeave(){    
    this.DicData.saveLocalStorage();        
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
    this.DicData.result = this.searchResults[i];    
    this.router.navigate(['/searchresult']);    
  }

  toggleItem(i){            
  }

  
  toggleFavorite(i){        
    // var txtToAddClass = "."+"iconIndex"+i.toString();
    // this.searchResults[i].open = !this.searchResults[i].open;  
    // let shadesEl = document.querySelector(txtToAddClass);

    // if (shadesEl.classList.contains('favoriteIconColor'))
    // {
    //   shadesEl.classList.remove('favoriteIconColor');
    //   this.DicData.deleteFavoriteData(this.searchResults[i]);
    //   this.visible = !this.visible;       
    // } else {
    //   shadesEl.classList.add('favoriteIconColor');   
    //   this.DicData.saveFavoriteData(this.searchResults[i]);
    //   this.visible = !this.visible;          
    // }
  }
    
  getAdmobFree(){
    // OK
    if (this.platform.is('android')) {      
      let bannerConfig: AdMobFreeBannerConfig = {
          // isTesting: true, // Remove in production
          autoShow: false,//,
          // id: 'ca-app-pub-7403328130531745~9754019527'
          id:'ca-app-pub-7403328130531745/1109242741'
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare().then(() => { 
        this.admobFree.banner.show();
      }).catch(e => alert(e));
    } else {      
      let bannerConfig: AdMobFreeBannerConfig = {
        // isTesting: true, // Remove in production
        autoShow: false,//,
        id: 'ca-app-pub-7403328130531745/5268636143'
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare().then(() => {
        this.admobFree.banner.show();
      }).catch(e => alert(e));
    }
  } 
}
