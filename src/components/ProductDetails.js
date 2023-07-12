import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

function ProductDetails({showModal , setShowModal ,data}) {
 
  const handleClose = () => {
    setShowModal(false)
};

     
  return (
    <>
     
{ showModal?
      <Modal show={showModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Header >
          <Modal.Title>Product Details</Modal.Title>
          <Button onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={data.name}
              />
            </Form.Group>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="input"
                value={data.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                type="input"
                value={data.category}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Company</Form.Label>
              <Form.Control
                type="input"
                value={data.company}
               
              />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        
      </Modal>: null
}
    </>
  );
}
export default ProductDetails;
