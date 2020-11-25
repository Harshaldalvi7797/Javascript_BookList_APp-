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
    const books = Store.getBook();
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
    books.forEach(book => UI.addBookToList(book));
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
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    const title = (document.querySelector("#title").value = "");
    const author = (document.querySelector("#author").value = "");
    const isbn = (document.querySelector("#isbn").value = "");
  }
}

//store class handle storage
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//event: displays books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//event : add book
document.querySelector("#book-form").addEventListener("submit", e => {
  //get form values
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validation
  if (title === " " || author === "" || isbn === "") {
    //alert("plaese fill");
    UI.showAlert("please add data", "danger");
  } else {
    const book = new Book(title, author, isbn);
    console.log(book);

    //add book to Ui
    UI.addBookToList(book);
    //add book to local storage
    Store.addBook(book);
    UI.showAlert("Book addedd", "success");

    UI.clearFields();
  }

  //remove book
  document.querySelector("#book-list").addEventListener("click", e => {
    UI.deleteBook(e.target);
    //remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("remove successfully", "success");
  });
});
