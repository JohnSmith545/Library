const myLibrary = [];

// Book constructor
function Book(title, author, pages) {
  if (!new.target) throw new Error("Use 'new' to create a Book");
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// Add book to library array
function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  displayLibrary();
}

// Display all books
function displayLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <button class="remove-book">Remove</button>
    `;

    bookCard.querySelector(".remove-book").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) myLibrary.splice(index, 1);
      displayLibrary();
    });

    libraryDiv.appendChild(bookCard);
  });
}

// Modal handling
const newBookBtn = document.getElementById("newBookBtn");
const modalOverlay = document.getElementById("modalOverlay");
const bookFormModal = document.getElementById("bookFormModal");

newBookBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// Close modal if clicked outside form
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

// Handle form submission
bookFormModal.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookFormModal);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));

  addBookToLibrary(title, author, pages);

  bookFormModal.reset();
  modalOverlay.style.display = "none";
});

// Initial books for display
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("1984", "George Orwell", 328);
