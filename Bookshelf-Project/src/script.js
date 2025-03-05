// Hamburger Menu
const hamburger = document.querySelector("#hamburger");
const Navmenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  Navmenu.classList.toggle("hidden");
});

// klik diluar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != Navmenu) {
    hamburger.classList.remove("hamburger-active");
    Navmenu.classList.add("hidden");
  }
});

// window.onscroll = function () {
//   const header = document.querySelector("header");
//   const fixednav = header.offsetTop;

//   if (window.pageYOffset > fixednav) {
//     header.classList.add("navbar-fixed", "lg:");
//   } else {
//     header.classList.remove("navbar-fixed");
//   }
// };

// Logika

const bookShelf = [
  //   {
  //     id: 1739926206791,
  //     kategori: "Komik.png",
  //     author: "Andrea Hirata",
  //     sinopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia iusto quae esse dolore. Hic voluptatibus rerum odit quis eligendi, nihil explicabo id cum, nobis eum optio quas tenetur quae facilis voluptatem sunt libero dolorem consequatur!",
  //     year: 2010,
  //     title: "koko",
  //     isComplete: false,
  //   },
  //   {
  //     id: 1739926206,
  //     kategori: "Jurnal.png",
  //     author: "Andrea Hirata",
  //     year: 2010,
  //     title: "koko",
  //     isComplete: true,
  //   },
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
  const list = document.getElementById("bookShelfList");
  list.innerHTML = "";

  const uncompleted = document.getElementById("incompleteBookshelfList");
  uncompleted.innerHTML = "";

  const completed = document.getElementById("completeBookshelfList");
  completed.innerHTML = "";

  for (const item of bookShelf) {
    const bookSelfElement = makeBookSelf(item);
    list.append(makeBookSelf(item));
    if (!item.isComplete) {
      uncompleted.append(bookSelfElement);
    } else {
      completed.append(bookSelfElement);
    }

    const total = document.querySelector(".judul");

    const completedBooks = bookShelf.filter((book) => book.isComplete == true);
    const total_done = document.querySelector(".judul-done");
    const uncompletedBooks = bookShelf.filter((book) => book.isComplete == false);
    const total_not = document.querySelector(".judul-not");
    total.innerText = "Koleksi Buku" + " (" + bookShelf.length + ")";
    total_done.innerText = "Sudah Selesai Dibaca" + " (" + completedBooks.length + ")";
    total_not.innerText = "Belum Selesai Dibaca" + " (" + uncompletedBooks.length + ")";
  }
});

const tambahButtons = document.querySelectorAll("#tambah");
const modal = document.querySelector("#modal");
const closeModal = document.querySelectorAll("#closeModal");
const inputJudul = document.querySelector("#inputBookTitle");
const card_detail = document.querySelector(".card_detail");
const edit_form = document.querySelector(".edit_form");

tambahButtons.forEach((tombol) => {
  tombol.addEventListener("click", function () {
    modal.classList.remove("hidden");
    inputJudul.focus();
  });
});

closeModal.forEach((tombol) => {
  tombol.addEventListener("click", function () {
    card_detail.classList.remove("hidden");
    modal.classList.add("hidden");
    edit_form.classList.add("hidden");
    location.reload();
  });
});

// Cari Buku
document.getElementById("searchBookDesktop").addEventListener("submit", function (event) {
  event.preventDefault();
  searchBooks("searchBookTitleDesktop");
  searchBookDesktop.reset();
});

document.getElementById("searchBookMobile").addEventListener("submit", function (event) {
  event.preventDefault();
  searchBooks("searchBookTitleMobile");
  searchBookMobile.reset();
});

function searchBooks(inputId) {
  const search = document.getElementById(inputId).value.trim();
  console.log("Mencari buku dengan kata kunci:", search);

  const filteredBooks = bookShelf.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toString().includes(search)
  );

  updateBookShelf(filteredBooks);
}

function updateBookShelf(filteredBooks) {
  const bookShelfList = document.getElementById("bookShelfList");
  bookShelfList.innerHTML = "";

  for (const item of filteredBooks) {
    const bookSelfElement = makeBookSelf(item);
    bookShelfList.append(bookSelfElement);
  }
}

//

function add() {
  const kategori = document.getElementById("categoriBook").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const title = document.getElementById("inputBookTitle").value;
  const sinopsis = document.getElementById("inputBookSinopsis").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  const id = +new Date();
  const bookShelfObjek = { id, kategori, author, year, title, sinopsis, isComplete };
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
  const picture = document.createElement("img");
  picture.src = "src/img/" + bookShelfObjek.kategori;

  const penulis = document.createElement("p");
  penulis.innerText = bookShelfObjek.author + " |";

  const tahun = document.createElement("p");
  tahun.innerText = bookShelfObjek.year;

  const textTitle = document.createElement("h1");
  textTitle.innerText = bookShelfObjek.title;

  const artikel = document.createElement("article");
  artikel.classList.add("book_items");
  artikel.setAttribute("id", `bookSelf-${bookShelfObjek.id}`);
  artikel.append(picture, penulis, tahun, textTitle);

  if (bookShelfObjek.isComplete) {
    const container = document.createElement("div");
    container.classList.add("label");
    container.innerText = "Sudah Dibaca";
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

    // container.append(checkButton, editButton, deleteButton);
    // artikel.append(container);
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

document.querySelectorAll("#bookShelfList, #completeBookshelfList, #incompleteBookshelfList").forEach((list) => {
  list.addEventListener("click", function (event) {
    const clickedItem = event.target.closest(".book_items");
    if (clickedItem) {
      const bookId = parseInt(clickedItem.id.replace("bookSelf-", ""), 10);
      const selectedBook = bookShelf.find((book) => book.id === bookId);

      if (selectedBook) {
        detail(selectedBook);
      }
    }
  });
});

function detail(bookShelf) {
  const details = document.querySelectorAll(".detail");
  details.forEach((detail) => {
    detail.classList.remove("hidden");
  });

  closeModal.forEach((tombol) => {
    tombol.addEventListener("click", function () {
      details.forEach((detail) => {
        detail.classList.add("hidden");
      });
    });
  });

  console.log(bookShelf);

  const detail_image = document.querySelector(".detail_image");
  const detail_judul = document.getElementById("detail_judul");
  const detail_penulis = document.getElementById("detail_penulis");
  const detail_tahun = document.getElementById("detail_tahun");
  const detail_sinopsis = document.getElementById("detail_sinopsis");

  detail_image.src = "src/img/" + bookShelf.kategori;
  detail_judul.innerText = bookShelf.title;
  detail_penulis.innerText = ": " + bookShelf.author;
  detail_tahun.innerText = ": " + bookShelf.year;
  detail_sinopsis.innerText = bookShelf.sinopsis;

  const card_detail = document.querySelector(".card_detail");
  const edit_form = document.querySelector(".edit_form");
  const editbutton = document.getElementById("edit");
  editbutton.addEventListener("click", function () {
    card_detail.classList.add("hidden");
    edit_form.classList.remove("hidden");
    edit(bookShelf);
  });

  const deletebutton = document.getElementById("delete");
  const modal = document.querySelector(".modal-aprov");
  deletebutton.addEventListener("click", function () {
    deleteButtonReq(bookShelf);
    modal.classList.remove("hidden");
  });
}

function edit(bookSelf) {
  const index = findBookIndex(bookSelf.id);

  document.getElementById("edit-inputBookTitle").value = bookSelf.title;
  document.getElementById("edit-inputBookAuthor").value = bookSelf.author;
  document.getElementById("edit-inputBookYear").value = bookSelf.year;
  document.getElementById("edit-inputBookSinopsis").value = bookSelf.sinopsis;
  document.getElementById("edit-categoriBook").value = bookSelf.kategori;
  document.getElementById("edit-inputBookIsComplete").checked = bookSelf.isComplete;

  const updateButton = document.getElementById("update");
  updateButton.addEventListener("click", function () {
    const updatedBook = {
      id: bookSelf.id, // Menambahkan kembali ID yang sama
      title: document.getElementById("edit-inputBookTitle").value,
      author: document.getElementById("edit-inputBookAuthor").value,
      year: parseInt(document.getElementById("edit-inputBookYear").value),
      sinopsis: document.getElementById("edit-inputBookSinopsis").value,
      kategori: document.getElementById("edit-categoriBook").value,
      isComplete: document.getElementById("edit-inputBookIsComplete").checked,
    };
    bookShelf.splice(index, 1, updatedBook);

    saveData();

    const detail = document.querySelector(".detail");
    card_detail.classList.remove("hidden");
    edit_form.classList.add("hidden");
    detail.classList.add("hidden");
  });

  const card_detail = document.querySelector(".card_detail");
  const edit_form = document.querySelector(".edit_form");
  const cancelbutton = document.getElementById("cancel");
  cancelbutton.addEventListener("click", function () {
    card_detail.classList.remove("hidden");
    edit_form.classList.add("hidden");
  });
}

function deleteButtonReq(BOOKSELF) {
  console.log(BOOKSELF);

  const inner = document.getElementById("judulBuku");
  inner.innerText = "'" + BOOKSELF.title + "'";
  const no = document.getElementById("no");
  const sure = document.getElementById("sure");
  const modaldelete = document.querySelector(".modal-aprov");
  const detail = document.querySelector(".detail");
  no.addEventListener("click", function () {
    modaldelete.style.display = "none";
    detail.classList.add("hidden");
    location.reload();
  });
  const bookSelfid = BOOKSELF.id;
  sure.addEventListener("click", function () {
    deleteTaskFromCompleted(bookSelfid);
    modaldelete.style.display = "none";
    detail.classList.add("hidden");
    location.reload();
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

// function loadDataFromStorage() {
//   const serializedData = localStorage.getItem(STORAGE_KEY);
//   let data = JSON.parse(serializedData);

//   if (data !== null) {
//     for (const book of data) {
//       bookShelf.push(book);
//     }
//   }

//   document.dispatchEvent(new Event(RENDER_EVENT));
// }

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  console.log(serializedData);

  let data = JSON.parse(serializedData);
  console.log(data);

  if (data === null) {
    // Jika localStorage kosong, isi dengan default data
    data = [
      {
        author: "Atomic Habits",
        id: 1739926206791,
        kategori: "Buku.png",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia iusto quae esse dolore. Hic voluptatibus rerum odit quis eligendi, nihil explicabo id cum, nobis eum optio quas tenetur quae facilis voluptatem sunt libero dolorem consequatur!",
        title: "James Clear",
        year: 2018,
        isComplete: false,
      },
      {
        kategori: "Buku.png",
        id: 1739926206654,
        author: "Pragmatic Programmer",
        sinopsis:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia iusto quae esse dolore. Hic voluptatibus rerum odit quis eligendi, nihil explicabo id cum, nobis eum optio quas tenetur quae facilis voluptatem sunt libero dolorem consequatur!",
        title: "Andy Hunt",
        year: 1999,
        isComplete: true,
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); // Simpan default data
  }

  // Masukkan data ke dalam bookShelf tanpa menghapus yang lama
  for (const book of data) {
    bookShelf.push(book);
  }

  document.dispatchEvent(new Event(RENDER_EVENT)); // Render ulang tampilan
}
