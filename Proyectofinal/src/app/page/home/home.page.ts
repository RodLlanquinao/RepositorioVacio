import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { GoogleMapsService } from 'src/app/servicio/google-maps.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  startingPoint: string = '';
  destinationPoint: string = ''; 
  center: google.maps.LatLngLiteral = { lat: -33.5024, lng: -70.6130 }; // Coordenadas por defecto
  zoom = 8; // Nivel de zoom por defecto
  map!: google.maps.Map;
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  constructor(private firebase: FirebaseService, private router: Router, private googleMapsService: GoogleMapsService ) { }

  ngOnInit() {
    // Inicialización del mapa
    
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom,
    };
    this.map = new google.maps.Map(document.getElementById("map-container") as HTMLElement, mapOptions);
  }

  

  

  async setStartingPointMarker() {
    if (this.startingPoint) {
      const coordinates = await this.googleMapsService.getCoordinates(this.startingPoint);
      if (coordinates) {
        this.addMarker(coordinates, 'Punto de Partida');
      }
    }
  }

  async setDestinationPointMarker() {
    if (this.destinationPoint) {
      const coordinates = await this.googleMapsService.getCoordinates(this.destinationPoint);
      if (coordinates) {
        this.addMarker(coordinates, 'Punto de Destino');
      }
    }
  }

  async addMarker(position: google.maps.LatLngLiteral, title: string) {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map: this.map,
      title,
    });
    this.markers.push(marker);
    this.center = position;
    this.zoom = 12;
  }

  async calculateRoute() {
    if (this.startingPoint && this.destinationPoint) {
      const route = await this.googleMapsService.getRoute(this.startingPoint, this.destinationPoint);
      this.router.navigateByUrl('/home');
      // Aquí puedes utilizar 'route' para dibujar la ruta en el mapa
    }
  }

  async logout() {
    await this.firebase.logout();
    this.router.navigateByUrl('/login');
  }


  goToCreateRide() {
    this.router.navigateByUrl('/create-ride');
  }

  goToRideList() {
    this.router.navigateByUrl('/ride-list');
  }

  goToProfile(){
    this.router.navigateByUrl('/profile')
  }

  goToHome(){
    this.router.navigateByUrl('/Home')
  }

}
