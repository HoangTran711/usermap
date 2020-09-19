import React from 'react';
import Weather from './WeatherRes/weather';
import 'weather-icons/css/weather-icons.css';

const API_key = "3daeebf9d8726d3a26ec61b6a29f2e3e";

export class WeatherContainer extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    }
    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
    
  }
  getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=1566083&appid=${API_key}`);
    const response = await api_call.json();
    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      icon: this.weatherIcon.Thunderstorm
    })
    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    
  }
  get_WeatherIcon(weatherIcon,rangeId) {
    switch(true) {
      case rangeId>=200&& rangeId <=232:
        this.setState({icon:weatherIcon.Thunderstorm});
        break;
      case rangeId>=300&& rangeId <=321:
        this.setState({icon:weatherIcon.Drizzle});
        break;
      case rangeId>=500&& rangeId <=531:
        this.setState({icon:weatherIcon.Rain});
        break;
      case rangeId>=600&& rangeId <=622:
        this.setState({icon:weatherIcon.Snow});
        break;
      case rangeId>=700&& rangeId <=781:
        this.setState({icon:weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon:weatherIcon.Thunderstorm});
        break;
      case rangeId>=801&& rangeId <=804:
        this.setState({icon:weatherIcon.Clouds});
        break;
      default:
        this.setState({icon:weatherIcon.Clouds});
    }
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell
  }
  componentDidMount(){ 
    this.getWeather();
  }
  
  render() {
    return (
      <React.Fragment>
        <Weather 
        city={this.state.city} 
        country={ this.state.country}
        temp_celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
    </React.Fragment>
    )
  }
}

export default WeatherContainer;