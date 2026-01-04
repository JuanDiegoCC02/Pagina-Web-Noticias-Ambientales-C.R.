import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/CardNoticias.css"

function CardsNoticias({ title, text, imgSrc, getId }) {
  // Card en el que se contiene la informacion principal que viene del formulario de Noticias
  // su funcionalidad se encuentra en la página de Home
    return (
    <Card className="card-noticia" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imgSrc} className="card-noticia-img" />
      <Card.Body>
        <Card.Title className="card-noticia-title">{title}</Card.Title>
        <Card.Text className="card-noticia-text">{text}</Card.Text>
        <Button variant="primary" onClick={getId}>Ver más</Button>
      </Card.Body>
    </Card>
  );
}

export default CardsNoticias;