import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
                        // Se reciben dos funciones por props: confirmarEliminar y denegarEliminar
function AlertaEliminarRespuesta({confirmarEliminar,denegarEliminar}){ 
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header onClick={denegarEliminar} closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>¿Seguro que quieres eliminar esta respuesta?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button  onClick={denegarEliminar} variant="secondary">NO</Button>
          <Button  onClick={confirmarEliminar} variant="primary">Sí</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default AlertaEliminarRespuesta