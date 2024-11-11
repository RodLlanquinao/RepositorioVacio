import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private apiKey = 'AIzaSyATpuS-tpxxIcujFFl7yg3q8HcHcd21Gy4';

  constructor(private http: HttpClient) { }

  getCoordinates(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else {
          return null;
        }
      })
    ).toPromise();
  }

   

  getRoute(start: { lat: number, lng: number }, end: { lat: number, lng: number }) {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${this.apiKey}`;
    
    const requestBody = {
      origin: { location: { latLng: { latitude: start.lat, longitude: start.lng } } },
      destination: { location: { latLng: { latitude: end.lat, longitude: end.lng } } },
      travelMode: "DRIVE",
      polylineEncoding: "ENCODED_POLYLINE"
    };

    return this.http.post(url, requestBody);
  }
}