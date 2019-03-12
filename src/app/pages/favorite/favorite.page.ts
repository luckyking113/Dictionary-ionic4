import { Component, ViewChild} from '@angular/core';
import { NavController , IonSlides } from '@ionic/angular';
import { DicdatabaseService } from '../../services/dicdatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {

  @ViewChild('slider') slider: IonSlides;        

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

  favoriteIcon: string;
  visible: boolean;
  resultCompare:boolean;
  favoritesData=[];

  constructor(public navCtrl: NavController, private router: Router, private DicData: DicdatabaseService) { 
    if (this.DicData.favoriteData.length > 0 ) {            
      this.resultCompare = true;      
      this.favoritesData = this.DicData.favoriteData;      
    }
    else this.resultCompare = false;

    this.favoriteIcon = 'star-outline';
    this.visible = false;    
       
  }

  ionViewWillEnter(){    
    this.favoritesData = this.DicData.favoriteData;        
    if (this.favoritesData.length>0) {
      this.resultCompare = true;
    } else this.resultCompare = false;
  }  

  ionViewWillLeave(){
    console.log("test save data into localstorage");
    this.DicData.saveLocalStorage();
  }

  gotoMainScreen(){        
    this.router.navigate(['']);    
  }

  selectedTab(index){
    this.slider.slideTo(index); 
  }

  toggleSection(i) {   
    this.favoritesData[i].open = !this.favoritesData[i].open;   
  }

  toggleItem(i){    
    this.favoritesData[i].open = !this.favoritesData[i].open;
  }
  toggleFavorite(i){    
    this.DicData.deleteFavoriteData(this.favoritesData[i]);        
    this.favoritesData = this.DicData.favoriteData;
    if (this.favoritesData.length == 0) this.resultCompare = false;    
  }
}
