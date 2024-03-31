// admin.js

async function main() {
    try {
        const response = await fetch('http://localhost:3001/listBooks');
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function renderBooks(books) {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = ''; // Clear existing content

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = book.title;
        bookDiv.appendChild(titleInput);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = book.quantity;
        bookDiv.appendChild(quantityInput);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => updateBook(book.id, titleInput.value, quantityInput.value));
        bookDiv.appendChild(updateButton);

        rootElement.appendChild(bookDiv);
    });
}

async function updateBook(id, title, quantity) {
    const updatedBook = {
        id: id,
        title: title,
        quantity: quantity
    };

    try {
        const response = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error('Failed to update book');
        }

        // Re-fetch and render books after updating
        main();
    } catch (error) {
        console.error('Error updating book:', error);
    }
}

// Fetch and render books when the page loads
main();

