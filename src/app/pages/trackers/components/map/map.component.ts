import { Component, OnInit, ViewEncapsulation, ElementRef, NgZone,ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
import { MapsAPILoader, AgmMarker, MarkerManager } from '@agm/core';

@Component({
  selector: 'app-tracker-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;

  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom= 4;
  public searchControl: FormControl;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private markerManager: MarkerManager) { 

  }

  ngOnInit() {
    this.lat = 39.8282;
    this.lng = -98.5795;

    this.searchControl = new FormControl();

    this.setCurrentPosition();

    // load Places autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify
          if(place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set lat, lng, zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;

          // make a marker at location
          let mark = new AgmMarker(this.markerManager);
          mark.latitude = this.lat;
          mark.longitude = this.lng;
          mark.visible = true;
          mark.openInfoWindow = true;
        });
      });
    });
  }

  setCurrentPosition() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 10;
      })
    }
  }

  findMe() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.showPosition(position);
        // console.log("position", position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
      })
    } else {
      alert("Geolocation not supported by this browser");
    }
  }

}
