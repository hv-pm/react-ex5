import { useState } from "react";

function BookEdit({book, onSubmit}) {
    const [title, setTitle] = useState(book.title);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(book.id, title); //onEdit antes, mas como ele tá dentro do onSubmit a gente passa pro onSubmit entregar pra ele s2 isso é só pra n confundir os dois handlers e deixar mais organizado

    };

    return (
        <form onSubmit={handleSubmit} className="book-edit">
            <label value={title}>Title</label>
            <input className="input" onChange={handleChange} value={title} />
            <button className="button is-primary">Save</button>
        </form>
    );
}

export default BookEdit;