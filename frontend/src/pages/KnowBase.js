import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Сократ сказал</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>«Я знаю, что ничего не знаю» </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Ладно.</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;