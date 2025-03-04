const bookShelf = [
  {
    id: 1739926206791,
    title: "koko",
    author: "koko",
    year: 90,
    isComplete: true,
  },
];
const RENDER_EVENT = "render-bookshelf";
const SAVED_EVENT = "saved";
const STORAGE_KEY = "keyOfBookSelf";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    add();
    submitForm.reset();
  });
  loadDataFromStorage();
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompleted = document.getElementById("incompleteBookshelfList");
  uncompleted.innerHTML = "";

  const completed = document.getElementById("completeBookshelfList");
  completed.innerHTML = "";

  for (const item of bookShelf) {
    const bookSelfElement = makeBookSelf(item);
    if (!item.isComplete) {
      uncompleted.append(bookSelfElement);
    } else {
      completed.append(bookSelfElement);
    }
  }
});

const searchForm = document.getElementById("searchBook");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchBooks();
  searchForm.reset();
});

function searchBooks() {
  const search = document.getElementById("searchBookTitle").value.trim();
  const filteredBooks = bookShelf.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toString().includes(search)
    );
  });
  const uncompleted = document.getElementById("incompleteBookshelfList");
  uncompleted.innerHTML = "";

  const completed = document.getElementById("completeBookshelfList");
  completed.innerHTML = "";
  for (const item of filteredBooks) {
    const bookSelfElement = makeBookSelf(item);
    if (!item.isComplete) {
      uncompleted.append(bookSelfElement);
    } else {
      completed.append(bookSelfElement);
    }
  }
}

function add() {
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  const id = +new Date();
  const bookShelfObjek = { id, title, author, year, isComplete };
  bookShelf.push(bookShelfObjek);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function saveData() {
  const parsed = JSON.stringify(bookShelf);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event(SAVED_EVENT));
}

function makeBookSelf(bookShelfObjek) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = bookShelfObjek.title;

  const penulis = document.createElement("p");
  penulis.innerText = "Penulis : " + bookShelfObjek.author;

  const tahun = document.createElement("p");
  tahun.innerText = "Tahun : " + bookShelfObjek.year;

  const artikel = document.createElement("article");
  artikel.classList.add("book_item");
  artikel.setAttribute("id", `bookSelf-${bookShelfObjek.id}`);
  artikel.append(textTitle, penulis, tahun);

  if (bookShelfObjek.isComplete) {
    const container = document.createElement("div");
    container.classList.add("action");

    const undoButton = document.createElement("button");
    undoButton.innerText = "Belum selesai di baca";
    undoButton.classList.add("green");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(bookShelfObjek.id);
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("green");

    editButton.addEventListener("click", function () {
      edit(bookShelfObjek);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.classList.add("red");

    deleteButton.addEventListener("click", function () {
      deleteButtonReq(bookShelfObjek);
    });

    container.append(undoButton, editButton, deleteButton);
    artikel.append(container);
  } else {
    const container = document.createElement("div");
    container.classList.add("action");

    const checkButton = document.createElement("button");
    checkButton.innerText = "Selesai di baca";
    checkButton.classList.add("green");

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(bookShelfObjek.id);
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("green");

    editButton.addEventListener("click", function () {
      edit(bookShelfObjek);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus Buku";
    deleteButton.classList.add("red");

    deleteButton.addEventListener("click", function () {
      deleteButtonReq(bookShelfObjek);
    });

    container.append(checkButton, editButton, deleteButton);
    artikel.append(container);
  }

  return artikel;
}

function addTaskToCompleted(bookSelfid) {
  const bookSelfTarget = findBook(bookSelfid);

  if (bookSelfTarget == null) return;

  bookSelfTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(bookSelfid) {
  for (const bookitem of bookShelf) {
    if (bookitem.id === bookSelfid) {
      return bookitem;
    }
  }
  return null;
}

function findBookIndex(bookSelfid) {
  for (const index in bookShelf) {
    if (bookShelf[index].id === bookSelfid) {
      return index;
    }
  }

  return -1;
}

function edit(bookSelf) {
  console.log(bookSelf);
  const index = findBookIndex(bookSelf.id);
  console.log(bookSelf.title);
  const modal = document.querySelector(".modal-edit");
  modal.style.display = "block";
  document.getElementById("edit-inputBookTitle").value = bookSelf.title;
  document.getElementById("edit-inputBookAuthor").value = bookSelf.author;
  document.getElementById("edit-inputBookYear").value = bookSelf.year;
  document.getElementById("edit-inputBookIsComplete").checked = bookSelf.isComplete;

  const updateButton = document.getElementById("updateButton");
  updateButton.addEventListener("click", function () {
    const updatedBook = {
      id: bookSelf.id, // Menambahkan kembali ID yang sama
      title: document.getElementById("edit-inputBookTitle").value,
      author: document.getElementById("edit-inputBookAuthor").value,
      year: parseInt(document.getElementById("edit-inputBookYear").value),
      isComplete: document.getElementById("edit-inputBookIsComplete").checked,
    };
    bookShelf.splice(index, 1, updatedBook);

    saveData();
    modal.style.display = "none";
  });

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

function deleteButtonReq(BOOKSELF) {
  const modal = document.querySelector(".modal-aprov");
  modal.style.display = "block";
  const inner = document.getElementById("judulBuku");
  inner.innerText = BOOKSELF.title;
  const no = document.querySelector(".no");
  const sure = document.querySelector(".sure");
  no.addEventListener("click", function () {
    modal.style.display = "none";
  });
  const bookSelfid = BOOKSELF.id;
  sure.addEventListener("click", function () {
    deleteTaskFromCompleted(bookSelfid);
    modal.style.display = "none";
  });
}

function deleteTaskFromCompleted(bookSelfid) {
  const bookSelfTarget = findBookIndex(bookSelfid);

  if (bookSelfTarget === -1) return;

  bookShelf.splice(bookSelfTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoTaskFromCompleted(bookSelfid) {
  const bookSelfTarget = findBook(bookSelfid);

  if (bookSelfTarget == null) return;

  bookSelfTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      bookShelf.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
