import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsService } from 'src/app/servicio/google-maps.service';

declare const google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  map!: any;
  startingAddress: string = '';
  destinationAddress: string = '';
  autocomplete: any;
  autocompleteDestination: any;

  
  
  @ViewChild('startingInput', { static: false, read: ElementRef }) startingInput!: ElementRef;
  @ViewChild('destinationInput', { static: false, read: ElementRef }) destinationInput!: ElementRef;

  constructor(private firebase: FirebaseService, private router: Router, private googleMapsService: GoogleMapsService) { }
  

  ngOnInit() {
    this.loadMap();
    this.watchAddressChanges();
  }

  loadMap() {
    const mapContainer = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapContainer, {
      center: { lat: -33.4569, lng: -70.6483 },
      zoom: 12,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

  }

  
  setStartingMarker() {
    if (this.startingAddress.trim() !== '') {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.startingAddress }, (results: any, status: any) => {
        if (status === 'OK') {
          const position = results[0].geometry.location;
          this.map.setCenter(position);
          new google.maps.Marker({
            position: position,
            map: this.map,
            title: 'Partida',
          });

          if (this.destinationAddress.trim() !== '') {
            this.drawRoute();
          }


        } else {
          alert('No se encontró la dirección: ' + status);
        }
      });
    } else {
      alert('Por favor, ingresa una dirección de partida.');
    }
  }

  setDestinationMarker() {
    if (this.destinationAddress.trim() !== '') {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: this.destinationAddress }, (results: any, status: any) => {
        if (status === 'OK') {
          const position = results[0].geometry.location;
          this.map.setCenter(position);

          new google.maps.Marker({
            position: position,
            map: this.map,
            title: 'Destino',
          });

          // Intentar trazar la ruta si ambas direcciones están definidas
          if (this.startingAddress.trim() !== '') {
            this.drawRoute();
          }

        } else {
          alert('No se encontró la dirección: ' + status);
        }
      });
    } else {
      alert('Por favor, ingresa una dirección.');
    }
  }

  drawRoute() {
    if (this.startingAddress.trim() === '' || this.destinationAddress.trim() === '') {
      return; // No se hace nada si no hay direcciones completas
    }
  
    const request = {
      origin: this.startingAddress,
      destination: this.destinationAddress,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
  
        // Calcular el costo de la ruta
        const route = result.routes[0];
        const distanceInMeters = route.legs[0].distance.value; // Distancia en metros
        const distanceInKm = distanceInMeters / 1000; // Convertir a kilómetros
        const ratePerKm = 1; // Tarifa fija por kilómetro (ejemplo: 2 USD por kilómetro)
        const totalCost = distanceInKm * ratePerKm;
  
        // Mostrar el costo en la consola (puedes cambiar esto para mostrarlo en la UI)
        console.log(`Distancia: ${distanceInKm.toFixed(2)} km`);
        console.log(`Costo estimado: $${totalCost.toFixed(2)}`);
        alert(`Costo estimado del viaje: $${totalCost.toFixed(2)}`);
      } else {
        console.error('Error trazando la ruta: ', status);
      }
    });
  }

  //para agregar dirección al momento de marcar la segunda dirección
  watchAddressChanges() {
    const interval = setInterval(() => {
      // Si ambas direcciones están completas, trazar la ruta
      if (this.startingAddress.trim() !== '' && this.destinationAddress.trim() !== '') {
        this.drawRoute();
        clearInterval(interval); // Detener el monitoreo después de trazar la ruta
      }
    }, 1000); // Verificar cada segundo
  }


  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
  
          // Centrar el mapa en la ubicación actual
          this.map.setCenter(currentLocation);
  
          // Agregar un marcador en la ubicación actual
          new google.maps.Marker({
            position: currentLocation,
            map: this.map,
            title: 'Ubicación Actual',
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación: ', error);
          alert('No se pudo obtener la ubicación actual.');
        }
      );
    } else {
      alert('La geolocalización no está soportada por este navegador.');
    }
  }

  initAutocomplete() {
    // Obtén el campo de entrada dentro del ion-input
    const inputElement = this.destinationInput.nativeElement.querySelector('input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(inputElement);
    
    // Escucha el cambio de selección de dirección
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry) {
        this.destinationAddress = place.formatted_address;
        this.map.setCenter(place.geometry.location);

        // Agregar marcador en la ubicación seleccionada
        new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: 'Destino', 
        });
      }
    });
  }


  initStartingAutocomplete() {
    const inputElement = this.startingInput.nativeElement.querySelector('input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(inputElement);
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry) {
        this.startingAddress = place.formatted_address;
        this.map.setCenter(place.geometry.location);
        new google.maps.Marker({
          position: place.geometry.location,
          map: this.map,
          title: 'Partida',
        });
      }
    });
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
    this.router.navigateByUrl('/home')
  }

  

}
