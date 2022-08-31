import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button';

class UpdateModal extends React.Component {

  getFormInfo=(e)=> {
    e.preventDefault();
    
    let updatedBook = {
      title: e.target.title.value || this.props.selectedBook.title,
      description: e.target.description.value || this.props.selectedBook.description,
      status: e.target.formBasicCheckbox.checked ? 'available': 'unavailable',
      _id: this.props.selectedBook._id,
      __v: this.props.selectedBook.__v,  
    }
   this.props.upDateBook(updatedBook);
  }

  render () {
  return (
    <Modal show={this.props.showUpdateForm} onHide={this.props.closeUpdateForm}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.getFormInfo}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
          </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Available" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={this.props.closeUpdateForm}>
        Submit
      </Button>
    </Form> 
        </Modal.Body>
        
      </Modal>

  )
}

}

export default UpdateModal;