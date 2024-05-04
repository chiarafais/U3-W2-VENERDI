import { useEffect, useState } from "react";
import { Badge, Button, Card, CardGroup, Spinner } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
// import { sole } from "../assets/01d.png";
const Meteopage = () => {
  const [meteo, setMeteo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [meteoDays, setMeteoDays] = useState();
  const { lat } = useParams();

  const { lon } = useParams();

  const fetchMeteo = () => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=91ea4b5d39619a30402a0b31b64e1a45`
    )
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((meteo) => {
        setMeteo(meteo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const fetchMeteo5Days = () => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91ea4b5d39619a30402a0b31b64e1a45`
    )
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((meteo) => {
        let fiveDays = [];
        fiveDays.push(meteo.list[0], meteo.list[8], meteo.list[16], meteo.list[24], meteo.list[32]);
        setMeteoDays(fiveDays);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMeteo();
    fetchMeteo5Days();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="text-center mainMeteo ">
          <Spinner className="spinnerLoading" animation="border" variant="light" />
        </div>
      )}

      {meteo && !isLoading && (
        <div className={meteo.weather[0].icon.includes("n") ? "mainMeteoPageNight" : "mainMeteoPage"}>
          <>
            <NavLink to={`/`}>
              <Button className="btnExit">
                <i className="bi bi-arrow-left"></i>
              </Button>
            </NavLink>

            <Card className="text-center cardMeteo">
              <h1 className="cardMeteoTitle">{meteo.name}</h1>
              <div className="textCardMeteo mt-4 mb-4">
                <Card.Img src={require(`/src/assets/${meteo.weather[0].icon}.png`)} />
                <Card.Body>
                  <Card.Text className="tempCard">{Math.floor(meteo.main.temp - 273)}°</Card.Text>

                  <Badge bg="info">
                    <i className="bi bi-thermometer-snow"></i>MIN: {Math.floor(meteo.main.temp_min - 273)}°
                  </Badge>
                  <Badge bg="warning">
                    <i className="bi bi-thermometer-sun"></i>MAX: {Math.floor(meteo.main.temp_max - 273)}°
                  </Badge>
                </Card.Body>
              </div>
              <Card.Text>
                <i className="bi bi-thermometer-half"></i> <span className="spanLabel">Temperatura percepita: </span>
                {Math.floor(meteo.main.feels_like - 273)}°
              </Card.Text>
              <Card.Text>
                <i className="bi bi-cloud-haze2"></i> <span className="spanLabel">Umidità nell'aria:</span>{" "}
                {meteo.main.humidity}%
              </Card.Text>
              <Card.Text className="mb-3">
                <i className="bi bi-wind"></i> <span className="spanLabel">Vento: </span>
                {meteo.wind.speed} km/h
              </Card.Text>
            </Card>
            {meteoDays && (
              <div className="cardsDaysMeteo d-flex flex-wrap">
                {meteoDays.map((day) => {
                  return (
                    <Card key={day.dt} className="cardSingleDay">
                      <Card.Img variant="top" src={require(`/src/assets/${day.weather[0].icon}.png`)} />
                      <Card.Body className="text-center">
                        <Card.Title className="font-w">{new Date(day.dt * 1000).toLocaleDateString()}</Card.Title>
                        <Card.Text className="font-w tempCardDay">{Math.floor(day.main.temp - 273)}°</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        <Badge bg="info">
                          <i className="bi bi-thermometer-snow"></i>MIN: {Math.floor(day.main.temp_min - 273)}°
                        </Badge>
                        <Badge bg="warning">
                          <i className="bi bi-thermometer-sun"></i>MAX: {Math.floor(day.main.temp_max - 273)}°
                        </Badge>
                      </Card.Footer>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};
export default Meteopage;
