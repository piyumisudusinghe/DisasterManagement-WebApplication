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





@Component({
  selector: 'gmap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('search') public searchElement:ElementRef;
  @ViewChild('setValue') public refElement:ElementRef;
  @ViewChild('setDisaster') public elementCombobox:ElementRef;
  public latitude:number;
  public longitude:number;
  public zoom: number;
  public place_name:string;
  public disaster:string;
  items: AngularFireList<any>;
  locations: any[];
  constructor(private mapsAPILoader:MapsAPILoader,private ngZone:NgZone,private db:AngularFireDatabase) { }






ngOnInit() {

    this.latitude = 7.8731;
    this.longitude = 80.7718;
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
            this.refElement.nativeElement.value = this.place_name;
          });
        });

      }
    );
    this.showLocationsInTable();
  }
  addLocation(){
    this.disaster= this.elementCombobox.nativeElement.options[this.elementCombobox.nativeElement.selectedIndex].value;
    const updates = {lat:this.latitude,long:this.longitude,visibility:'true',disaster:this.disaster};
    this.db.database.ref('/mapview').child(this.place_name).update(updates);

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




}



