import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import countries from './countries';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [unitType, setUnitType] = useState('imperial'); // State for the unit type
  const [cityname, setCityName] = useState(''); // city name for the header

  const unitTypeSymbol = {
    'imperial': '°F',
    'metric': '°C',
    'standard': 'K',
  };

  async function getWeatherData() {
    if (!city) return; // Prevent request if no city is entered

    try {
      setError();
      setWeatherData([]);
      setLoading(true);

      // Make weather API call using axios
      const url = `https://weatherapp-api-ufow.onrender.com/api/weather?city=${city}&unit=${unitType}`;
      // const url = `http://localhost:8080/api/weather?city=${city}&unit=${unitType}`;

      const weatherResponse = await axios.get(url);

      if (weatherResponse.status === 200) {
        setWeatherData(weatherResponse.data.list);
        setCountry(weatherResponse.data.country);
        setCityName(weatherResponse.data.city.name);
        toast.success(`Weather data for ${weatherResponse.data.city.name} found!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      setError(e);
      toast.error("City not found or API error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  };

  // Automatically refresh weather data when unitType or city changes
  useEffect(() => {
    if (city) {
      getWeatherData(); // Fetch data if there's a city set
    }
  }, [unitType]); // Re-run when unitType changes

  // Show "Hello there" toast notification on first load
  useEffect(() => {
    toast.info("Due to limited resource 🛠 fetching might be slow ⏳..!😗😛    Thanks for visiting 🎉🕺💃", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []); // Empty dependency array for first-time load

  return (
    <>
      <ToastContainer /> {/* Toast Container for notifications */}

      {loading ? (
        <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container>
          <Row className="d-flex">
            <div className="text-center mt-5">
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
                placeholder="Enter city"
                onKeyDown={handleKeyDown}
                
              />
              <Button className="ms-2" onClick={getWeatherData} variant="primary">
                Submit
              </Button>{' '}
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="secondary" id="unit-toggle">
                  Unit: {unitType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setUnitType('imperial')}>
                    Imperial (°F)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setUnitType('metric')}>
                    Metric (°C)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setUnitType('standard')}>
                    Standard (K)
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {error ? (
                <div className="text-danger">
                  Can't find city or API key is invalid
                </div>
              ) : (
                <h3 className="mt-3">
                  {city && country ? `Weather info in ${cityname}, ${countries[country]}` : ''}
                </h3>
              )}
            </div>

            {weatherData.map((weather, index) => (
              <Col sm={4} className="mt-3" key={index}>
                <Card className="p-3 shadow border-0 mt-3 rounded">
                  <div className="d-flex justify-content-between">
                    <div>{weather.dt_txt}</div>
                    <div>
                      Current: {weather.main.temp} {unitTypeSymbol[unitType]}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>{weather.weather[0].main}</div>
                    <div>
                      Feels like {weather.main.feels_like} {unitTypeSymbol[unitType]}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default App;
