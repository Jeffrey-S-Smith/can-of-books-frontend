import React from 'react';
import axios from 'axios';
import UpdateModal from './UpdateModal'
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button  from 'react-bootstrap/Button';
import "./BestBooks.css"

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      showUpdateForm: false,
      selectedBook: {},
    }
  }

  waitToUpDate = () => {console.log('Done UpdatingBooks');}

  upDateBook = async (book)=>{
    console.log(this.state.books);
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${book._id}` 
      let upDatedBook = await axios.put(url, book);
      let bookArr = this.state.books.map(singleBook => {
        return singleBook._id === upDatedBook.data._id ? upDatedBook.data: singleBook;
      })
      console.log(bookArr);
      this.setState({books: bookArr}, this.waitToUpDate)
    

    } catch(err) {
      console.log(err);

    }
  }

  closeUpdateForm =()=>{
    this.setState({showUpdateForm: false});
  }

  handleShowModal =() => {
    this.setState({show:true});
  }

  handleCloseModal =() => {
    this.setState({show:false});
  }

  handleCreateBook = async(e) =>{
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.formBasicCheckbox.checked ? 'available': 'unavailable'   
    }
   
    try{
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`,newBook);
      let createdBook = response.data;
      this.setState({books: [...this.state.books, createdBook]});

      
    }catch(err){
      console.log(err);


    }
  }

  handleDeleteBook = async(id) => {
    try{
      let url = `${process.env.REACT_APP_SERVER}/books/${id}` 
      await axios.delete(url);
      let newArr = this.state.books.filter(book => book._id !== id);
      this.setState({books: newArr});
    } catch(err) {
      console.log(err);
    }
   
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getAllBooks = async() => {
    
    try {
      const books = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      

      this.setState({books: books.data})
    } catch (err) {
      console.log(err);
    }
  }

  showUpdateModal =(selectedBook) =>{
    this.setState({showUpdateForm: true, selectedBook: selectedBook})

  }

  componentDidMount(){
    this.getAllBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <div id='bestBooks'>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.handleShowModal}>Add Book</Button>
        {this.state.books.length ? (
          <Carousel>
            { this.state.books.map(book => {
             return <Carousel.Item key={book._id}>
             <img
               className="d-block w-100"
               src="https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
               alt="First slide"
             />
             <Carousel.Caption className="square border border-white border-5 ">
               <h3>{book.title}</h3>
               <p>{book.description}</p>
               <Button onClick={()=> {this.handleDeleteBook(book._id)}}>Delete</Button>
               <Button onClick={()=> {this.showUpdateModal(book)}}>Update</Button>
             </Carousel.Caption>
           </Carousel.Item>  
}) }
          </Carousel>
        
        ) : (
          <h3>No Books Found :(</h3>
        )}

        <FormModal show = {this.state.show} handleShowModal={this.handleShowModal} handleCloseModal={this.handleCloseModal} handleCreateBook={this.handleCreateBook}/>

        <UpdateModal showUpdateModal={this.showUpdateModal} closeUpdateForm={this.closeUpdateForm} showUpdateForm={this.state.showUpdateForm} selectedBook={this.state.selectedBook} upDateBook={this.upDateBook}/>
      </div>
    )
  }
}

class FormModal extends React.Component{
  render() {
    return (
      <>
      <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.props.handleCreateBook}>
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
      <Button variant="primary" type="submit" onClick={this.props.handleCloseModal}>
        Submit
      </Button>
    </Form> 
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      </>    
    )
  
  }
}

export default BestBooks;
