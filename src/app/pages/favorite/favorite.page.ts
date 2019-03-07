import { Component, ViewChild } from '@angular/core';
import { NavController , IonSlides } from '@ionic/angular';
import { DicdatabaseService } from '../../services/dicdatabase.service';

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


  constructor(public navCtrl: NavController, private DicData: DicdatabaseService ) {        
    if (this.DicData.favoriteData.length > 0 ) {            
      this.resultCompare = true;      
      this.favoritesData = this.DicData.favoriteData;      
    }
    else this.resultCompare = false;

    this.favoriteIcon = 'star-outline';
    this.visible = false;    
       
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
}
