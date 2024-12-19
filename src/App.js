
// Watch my tutorial video here: https://youtu.be/p-k2CdAz104 - Weather App Project Tutorial Using React | OpenWeatherMap API

import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const unitTypeSymbol = {
    'imperial': '°F',
    'metric': '°C',
    '': 'K',
  };

  //set unit type
  const unitType = 'imperial';

  //Make api call to openweathermap api
  async function getWeatherData() {
    try {
      setError();
      setWeatherData([]);
      setLoading(true);

      //set your api key here
      // Watch my tutorial video here: https://youtu.be/p-k2CdAz104 to get your own API key for free!
      const apiKey = '71b2dc2c1f422cea58eb7d6687d92314';

      //get longitude and latitude based on city that user inputs
      let resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
      const lat = resp.data[0].lat;
      const long = resp.data[0].lon;


      //Make weather api call using axios
      const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unitType}`);
      setWeatherData(weatherData.data.list);

    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }

  }



  return (
    <>

      {loading ?
        <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        : <Container>
          <Row className="d-flex">
            <div className='text-center mt-5'>
              <input onChange={(e) => { setCity(e.target.value) }} />
              <Button className='ms-2' onClick={getWeatherData} variant="primary">Submit</Button>{' '}

              {error ?
                <div className='text-danger'>
                  Can't find city or api key is invalid
                </div> : <h3 className='mt-3'>  Weather in {city}
                </h3>}
            </div>

            {weatherData.map((weatherData, index) =>
              <Col sm={4} className="mt-3" key={index}>
                <Card className="p-3 shadow border-0 mt-3 rounded">
                  <div className='d-flex justify-content-between'>
                    <div>
                      {weatherData.dt_txt}
                    </div>
                    <div>

                      Current: {weatherData.main.temp} {unitTypeSymbol[unitType]}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div>
                      {weatherData.weather[0].main}
                    </div>
                    <div>
                      Feels like  {weatherData.main.feels_like} {unitTypeSymbol[unitType]}
                    </div>
                  </div>
                </Card>
              </Col>
            )}
          </Row>

        </Container>
      }

    </>
  );
}

export default App;