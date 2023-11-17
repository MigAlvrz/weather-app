import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WeatherService {
  API_KEY = '20b58af49127f9f81c48044b28627ca6'
  

  constructor(private http : HttpClient) { }

  getWeather = async (place:string) => {
    let city = await firstValueFrom(this.http.get(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${this.API_KEY}`))
    console.log(city);
    
    let weather : any = await firstValueFrom(this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${city[0]?.lat}&lon=${city[0]?.lon}&units=metric&lang=es&appid=${this.API_KEY}`))
    let icon = `https://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}.png`
    console.log(weather);
    console.log(icon);
    
    
    return {
      city : city,
      weather: weather,
      icon: icon
    }
  }

  getIcon = (icon: string) => {
    return this.http.get(`https://openweathermap.org/img/wn/${icon}.png`)
  }
}
