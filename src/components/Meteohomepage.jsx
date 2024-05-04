import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Meteohomepage = () => {
  const [searchCity, setSearchCity] = useState("");
  const [notCity, setNotCity] = useState(false);
  const navigate = useNavigate();

  const fetchCity = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=91ea4b5d39619a30402a0b31b64e1a45`)
      .then((response) => {
        if (response.ok) {
          console.log("fetch conclusa");
          return response.json();
        } else {
          throw new Error("Errore nella richiesta delle prenotazioni al server");
        }
      })
      .then((city) => {
        console.log(city);

        if (city.length === 0) {
          setNotCity(true);
        } else {
          navigate(`/Meteopage/${city[0].lon}/${city[0].lat}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setNotCity(true);
      });
    // .finally(() => setIsLoading(false));
  };

  return (
    <div className="mainHomepage">
      <div className="homepageImput">
        <Container fluid className="divContainerHomepage">
          <h1 className="text-center text-light mt-5 titleHomepage">Benvenuto!</h1>
          <h3 className="text-center text-light">Inserisci il nome di una città e scopri che tempo fa.</h3>
          <Col xs={12} className="d-flex justify-content-center">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Cerca una città..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <Button className="btnSearch" onClick={() => fetchCity()}>
              <i className="bi bi-search"></i>
            </Button>
          </Col>
          {notCity && (
            <Alert className="mt-2" variant="info" onClose={() => setNotCity(false)} dismissible>
              <Alert.Heading>Non ho trovato una città con questo nome!</Alert.Heading>
            </Alert>
          )}
        </Container>
      </div>
    </div>
  );
};
export default Meteohomepage;
