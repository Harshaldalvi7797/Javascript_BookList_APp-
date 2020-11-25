/** @format */

// Book class represents book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: "harshal",
    //     author: "Dalvi",
    //     isbn: "gf"
    //   },
    //   {
    //     title: "harshal",
    //     author: "Dalvi",
    //     isbn: "gf"
    //   }
    // ];
    // const books = storedBooks;
    // books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    console.log(list);

    row.innerHTML = `
    <td>${book.title}</td> 
    <td>${book.author}</td> 
    <td>${book.isbn}</td> 
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    const title = (document.querySelector("#title").value = "");
    const author = (document.querySelector("#author").value = "");
    const isbn = (document.querySelector("#isbn").value = "");
  }
}

//store class handle storage

//event: displays books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//event : add book
document.querySelector("#book-form").addEventListener("submit", e => {
  //get form values
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);
  console.log(book);

  //add book to Ui
  UI.addBookToList(book);

  UI.clearFields();

  //remove book
  document.querySelector("#book-list").addEventListener("click", e => {
    UI.deleteBook(e.target);
  });
});
