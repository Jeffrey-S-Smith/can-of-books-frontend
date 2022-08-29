import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import "./BestBooks.css"

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getAllBooks = async() => {
    console.log(`${process.env.REACT_APP_SERVER}/books`);
    try {
      const books = await axios.get(`${process.env.REACT_APP_SERVER}/books`)
      console.log(books.data);

      this.setState({books: books.data})
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount(){
    this.getAllBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */

    console.log('hello');
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            { this.state.books.map(book => {
            return <Carousel.Item key={book._id}>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </Carousel.Caption>
          </Carousel.Item>  
}) }
          </Carousel>
        
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
