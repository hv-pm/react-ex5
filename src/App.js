import { useState, useEffect } from "react";
import axios from 'axios';
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const handleFetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    useEffect(() => { //chama o que estiver dentro quando inicia e as vezes quando re-renderiza dependendo dos argumentos em []
        handleFetchBooks();
    }, []);

    const handleBookCreate = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title, 
        });

        const updatedBooks = [
            ...books, 
            response.data
            //{ id: response.id, title: response.title } esse aqui é sem o server JSON
        ];
        setBooks(updatedBooks);
    };

    const handleEditBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle 
            });

        const updatedBooks = books.map((book) => {
            if ( book.id === id){
                return {...book,...response.data}; //aqui nesse caso ela vai fazer update de todas as keys e n só o titulo
                //return {...book, title: newTitle};
            }

            return book;
        });
        setBooks(updatedBooks);
    };

    const handleDeleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList books={books} onDelete={handleDeleteBookById} onEdit={handleEditBookById}/>
            <BookCreate onCreate={handleBookCreate} />
        </div>
    );
}

export default App;