import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { weatherData } from '../../interfaces/weatherData';
import { places } from '../../interfaces/places';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  places = signal<places | null>(null)
  data = signal<weatherData | null>(null);
  icon = signal<any>(null);

  constructor(private weatherService: WeatherService){}


  getWeather =  async (city: string) => {
    let weatherInfo = await this.weatherService.getWeather(city);
    this.data.set( weatherInfo.weather as weatherData );
    this.places.set(weatherInfo.city as places);
    this.icon.set(weatherInfo.icon);
    console.log(this.places());
    console.log(this.icon());
    
    console.log(this.data());
    this.data().daily.forEach((e)=> {
      console.log(
        new Date(e.dt * 1000).toString()
      );
      console.log(e.dt);
      
    })
    
  }

  getDate = (date : number) =>{
    return new Date(date).toDateString()
  }

  getTime = (date: number) => {
    return new Date(date).toLocaleTimeString()
  }

}
