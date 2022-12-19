let lib = [];
let templib;

let addBook = document.querySelector("#addBook");
let bookModal = document.querySelector(".book-modal");
let closeModal = document.querySelector(".close-modal");
let libContainer = document.querySelector(".lib-container");
let form = document.querySelector("#bookForm")

addBook.onclick = () => {
  bookModal.style.display = "block";
}

closeModal.onclick = () => {
  bookModal.style.display = "none";
}

//constructor
function Book (bookName, authorName, pages, read= "No"){
  this.bookName = bookName;
  this.authorName =authorName;
  this.pages = pages;
  this.read = read;
}


function addBookToLibrary(book){
  let bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  let bookName = document.createElement("div");
  bookName.classList.add("book-name")
  bookName.innerText = `Name of the book:  ${book.bookName}`;
  let authorName = document.createElement("div");
  authorName.classList.add("author-name");
  authorName.innerText = `Author: ${book.authorName}`;
  let pages = document.createElement("div");
  pages.classList.add("pages");
  pages.innerText = `No. of pages: ${book.pages}`;
  let readTag = document.createElement("div");
  readTag.classList.add("read-tag");
  readTag.innerText = `Have you read this book : ${book.read}`;
  let rmbutton = document.createElement("button");
  rmbutton.setAttribute("id", "remove-btn");
  rmbutton.innerText = `Remove`;
  bookContainer.appendChild(bookName);
  bookContainer.appendChild(authorName);
  bookContainer.appendChild(pages);
  bookContainer.appendChild(readTag);
  bookContainer.appendChild(rmbutton);
  libContainer.appendChild(bookContainer);

  //for remove buttn parse the local storage
  let localDB = JSON.parse(localStorage.getItem("lib"));

  rmbutton.addEventListener("click", ()=>{
    lib.map((value, index) => {
      let authorEle = bookContainer.childNodes[1].innerText;
      if (authorEle.includes(lib[index].authorName)){
        lib.splice(index, 1)
        localDB.splice(index, 1)
        bookContainer.remove();

        //stringify the localstorage before reading it
        templib = JSON.stringify(localDB);
        localStorage.setItem("lib", templib);
      }

      
    })
  })


}

form.addEventListener("submit", (event)=>{
  event.preventDefault()
  let formValue = event.target.elements
  // console.log(formValue);

  newBook = new Book(
    formValue.bookName.value,
    formValue.authorName.value,
    formValue.pages.value,
    formValue.readTag.value,
  )
  
  console.log(newBook);
  lib.push(newBook);
  addBookToLibrary(newBook);
  form.reset();
  bookModal.style.display = "none";
  window.localStorage.clear()
  window.localStorage.setItem("lib", JSON.stringify(lib))
  return false


})


// addBookToLibrary(lib);


// Render myLibrary through Localstorage when page is refreshed.
function renderLibraryStorage() {
  if(localStorage.lib) {
    // in local storage data will be stored in JSON so we have to parse it
      let getBooks = JSON.parse(localStorage.getItem("lib"))
      lib = getBooks
      // pass the data to addBookToLibrary function to render books
      lib.map((value) => {
          addBookToLibrary(value)
      })
  }
}

renderLibraryStorage()