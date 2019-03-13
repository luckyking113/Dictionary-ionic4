import { Component, ViewChild, OnInit} from '@angular/core';
import { NavController , IonSlides } from '@ionic/angular';
import { DicdatabaseService } from '../../services/dicdatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.page.html',
  styleUrls: ['./searchresult.page.scss'],
})
export class SearchresultPage implements OnInit {


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
  searchResult=Array();

  constructor(public navCtrl: NavController, private router: Router, private DicData: DicdatabaseService) { 
       
  }

  ngOnInit(){}

  ionViewWillEnter(){    
    this.searchResult = Array();
    this.searchResult.push(this.DicData.result);   
    
    if (this.DicData.result.length > 0 ) {            
      this.resultCompare = true;      
    }
    else this.resultCompare = false;

    this.favoriteIcon = 'star-outline';
    this.visible = false;  
  }

  gotoMainScreen(){        
    this.router.navigate(['']);    
  }

  selectedTab(index){
    this.slider.slideTo(index); 
  }

  toggleFavorite(i){        
    var txtToAddClass = "."+"iconIndex"
    let shadesEl = document.querySelector(txtToAddClass);
    if (shadesEl.classList.contains('favoriteIconColor'))
    {      
      shadesEl.classList.remove('favoriteIconColor');
      this.DicData.deleteFavoriteData(this.searchResult[i]);
      this.visible = !this.visible;       
    } else {      
      shadesEl.classList.add('favoriteIconColor');   
      this.DicData.saveFavoriteData(this.searchResult[i]);
      this.visible = !this.visible;          
    }
  }
}
