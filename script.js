const myLibrary = [];

const librarySection = document.querySelector(".library-section");

// Book Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    const haveRead = this.read ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${haveRead}`;
  };
}

// Adds book to library Array and DOM
function addBookToLibrary(book) {
  // Create Elements
  let title = document.createElement("p");
  title.classList.add("title");

  let author = document.createElement("p");

  let pages = document.createElement("p");

  let read = document.createElement("div");
  read.classList.add("checkbox-container");
  read.innerHTML = `<input type="checkbox" class="checkbox" value="read" />Read`;

  let removeButton = document.createElement("button");
  removeButton.classList.add("del-book-btn");
  removeButton.textContent = "Remove";

  // Fill in textContent
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  if (book.read) {
    read.firstChild.checked = true;
  } else {
    read.firstChild.checked = false;
  }

  // Event Listenere for Read checkbox
  read.addEventListener("click", (event) => {
    let thisBook = event.target.parentElement.parentElement;
    let index = Array.from(librarySection.children).indexOf(thisBook);
    myLibrary[index].read = event.target.checked;
    console.log(myLibrary[index].read);
  });

  // Event Listener for Remove buttons
  removeButton.addEventListener("click", (event) => {
    let thisBook = event.target.parentElement;
    let index = Array.from(librarySection.children).indexOf(thisBook);
    console.log(index);
    librarySection.removeChild(thisBook);
    myLibrary.splice(index, 1);
  });

  // Create container and add elements
  let container = document.createElement("div");
  container.classList.add("book");
  container.appendChild(title);
  container.appendChild(author);
  container.appendChild(pages);
  container.appendChild(read);
  container.appendChild(removeButton);

  // Add to library Array and librarySection div
  myLibrary.push(book);
  librarySection.appendChild(container);
}

// Add Book button Event Listener
const addBookBtn = document.querySelector(".add-book-btn");
const bookForm = document.querySelector("#book-form");
addBookBtn.addEventListener("click", () => {
  bookForm.style.display = "flex";
});

// Submit form button
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", (event) => {
  if (bookForm.checkValidity()) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    bookForm.style.display = "none";
    bookForm.reset();
  }
});

// Close form button
const closeFormBtn = document.querySelector(".close-btn");
closeFormBtn.addEventListener("click", () => {
  bookForm.style.display = "none";
  bookForm.reset();
});

// Test

function displayBooks() {
  for (const book of myLibrary) {
    librarySection.appendChild(book);
  }
}

let hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
let hobbit1 = new Book("The Hobbit I", "J.R.R. Tolkien", 295, false);
let hobbit2 = new Book("The Hobbit II", "J.R.R. Tolkien", 295, false);

addBookToLibrary(hobbit);
addBookToLibrary(hobbit1);
addBookToLibrary(hobbit2);

displayBooks();
