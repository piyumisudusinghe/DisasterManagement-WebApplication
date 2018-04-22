import {Component , ElementRef , HostListener , NgModule , NgZone , OnInit , ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {} from '@types/googlemaps'
import {AngularFireDatabase} from 'angularfire2/database';
import {Reference} from "angularfire2/firestore";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import{AngularFireList} from "angularfire2/database";
import * as angular from "angular";
import {element} from "protractor";
import {query} from "@angular/core/src/animation/dsl";
import {NgForm} from "@angular/forms";
import {delay} from "q";





@Component({
  selector: 'gmap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('search') public searchElement:ElementRef;
  @ViewChild('setValue') public refElement:ElementRef;
  @ViewChild('setDisaster') public elementCombobox:ElementRef;
  public latitudeMap:number;
  public longitudeMap:number;
  public latitude:number;
  public longitude:number;
  public zoom: number;
  public place_name:string;
  public disaster:string;
  items: AngularFireList<any>;
  locations: any[];
  errorMsg:string;
  location:string;
  hazard:string;
  constructor(private mapsAPILoader:MapsAPILoader,private ngZone:NgZone,private db:AngularFireDatabase) {
    this.hazard='Disaster';

  }






ngOnInit() {

    this.latitudeMap = 7.8731;
    this.longitudeMap = 80.7718;
    this.zoom = 4;
    this.mapsAPILoader.load().then(
      ()=>{
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement,{types:["address"]});
        autocomplete.addListener("place_changed",()=>{
          this.ngZone.run(()=>{
            let place : google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry===undefined || place.geometry == null){
              return
            }
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.place_name = place.name;
            this.zoom = 12;
            this.location = this.place_name;
          });
        });

      }
    );
    this.showLocationsInTable();
  }
  addLocation(formData:NgForm){
    this.disaster = formData.value.hazard;
    if(this.disaster != 'Disaster'){
      if(this.location!=null){
        const message = "There is a " + this.disaster + " condition near the " + this.location + " area. Please go to a safty place";
        const updates = {lat:this.latitude,long:this.longitude,visibility:'true',disaster:this.disaster};
        this.db.database.ref('/mapview').child(this.location).update(updates);
        const now = new Date();
        const date = now.getUTCFullYear()+'-'+(now.getUTCMonth()+1)+'-'+now.getUTCDate();
        const time = now.getUTCHours()+':'+now.getUTCMinutes()+':'+now.getUTCSeconds();
        const key = date + ' ' + time;
        this.db.database.ref('/notifications').child(key).update({body:message,visibility:"true"});
        this.displayError('You have add the place successfully',true);
        setTimeout(() =>
          {
            formData.resetForm();
            this.searchElement.nativeElement.value='';
          },
          2000);


      }else {
        this.displayError('Select a place to add',true);
        setTimeout(() =>
          {
            this.displayError('',false);
          },
          2000);
      }


    }else{
      this.displayError('Add the name of the disaster to the location',true);
      setTimeout(() =>
        {
          this.displayError('',false);
        },
        2000);



    }
  }


  showLocationsInTable(){
    this.db.list('mapview',ref => ref.orderByChild('visibility').equalTo('true')).snapshotChanges().subscribe(item=>{
       this.locations =[];
       item.forEach(element=>{
         var y = element.payload.toJSON();
         y['$keyname'] = element.key;
         this.locations.push(y);
       })
    });
  }

  removeLocations(location:string){
    this.db.object('/mapview/'+location).update({visibility:false});
    this.showLocationsInTable();
  }

  displayError(msg:string,isShow:boolean){
    if(isShow){
      this.errorMsg = msg;
    }else{
      this.errorMsg ='';
    }

  }

  clearSearchBar(){
    this.searchElement.nativeElement.value='';
    this.latitude=0;
    this.longitude=0;
    this.location='';
  }




}



