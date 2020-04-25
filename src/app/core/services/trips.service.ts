import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators'
import {TripsList} from '../../components/shared/models/trips-list.model';
import {TripCreate} from '../../components/shared/models/trips-create.model';

const baseUrl = 'https://trips-d41d1.firebaseio.com/trips'

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  
  constructor(
    private http:HttpClient,
    ) { }

  getAllTrips() {
    //за да не закачаме token-а на всяка заявка го правим с interceptor
    return this.http.get(`${baseUrl}.json`)
    .pipe(map((res : Response)=>{
      const ids= Object.keys(res)
      const trips: TripsList[]=[];
      for (let id of ids) {
        trips.push(new TripsList(id,res[id].name,res[id].imagePath,res[id].description))
      } 
    return trips
    }))
  }

  createTrip(body: TripCreate){
return this.http.post(`${baseUrl}.json`,body)
  }

getById(tripId:string){
  //console.log('here')
return this.http.get<TripsList>(`${baseUrl}/${tripId}/.json`)
}

editTrip(body){
  return this.http.patch(`${baseUrl}.json`,body)
}

delete (tripId:string){
return this.http.delete(`${baseUrl}/${tripId}/.json`)
}
}
