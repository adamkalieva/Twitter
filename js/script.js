const API = "http://localhost:8000/users";

//  ! CREATE

let inpNickname = $(".inp-nickname");
let inpEmail = $(".inp-email");
let inpPassword = $(".inp-password");
let inpPhoneNumber = $(".inp-phonenumber");
let inpPhoto = $(".inp-image");
let addForm = $(".add-form");

async function addUsers(event) {
  event.preventDefault();
  let nickname = inpNickname.val().trim();
  let email = inpEmail.val().trim();
  let password = inpPassword.val().trim();
  let phonenumber = inpPhoneNumber.val().trim();
  let photo = inpPhoto.val().trim();
  let newUsers = {
    nickname,
    email,
    password,
    phonenumber,
    photo,
  };

  for (let key in newUsers) {
    if (!newUsers[key]) {
      alert("Sign in");
      return;
    }
  }
  let response = await axios.post(API, newUsers);
  getUsers(API);
  console.log(response);
}
addForm.on("submit");

// ! READ
let usersList = $(".users-list");
let users = [];
async function getUsers(API, showLoader = true) {
  if (showLoader) {
    $(".loader").css("display", "flex");
  }
  let response = await axios(API);
  if (showLoader) {
    $(".loader").css("display", "none");
  }
  users = response.data;
}

function render(data) {
  usersList.html("");
  console.log("i am data", data);
  data.forEach((item) => {
    usersList.append(`<div class="card m-3" style="width: 18rem;">
         <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
             <h5 class="card-title">${item.nickname}</h5>
             <p class="card-text card-email ">${item.email}</p>
    
             <h6>${item.password}</h6>
             <a href="#" class="btn btn-primary">Go somewhere</a>
             <button class="btn-like" id="${item.id}">
             <img src="https://cdn-icons.flaticon.com/png/512/1944/premium/1944515.png?token=exp=1639136806~hmac=6e90896daf7706356167f8c6b6130481"
             </button>
             <button id=${item.id} class="btn-retweet" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <img src="https://cdn-icons.flaticon.com/png/512/3905/premium/3905866.png?token=exp=1639136976~hmac=5eba1c21f5a64df476990a6d6c0d06aa">
             </button>
             <button id=${item.id} class="btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal">
             <img src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png">
             </button>
        </div>
  </div>
      `);
  });
}
getUsers(API);

// ! DELETE

async function deleteUsers(event) {
  let id = event.currentTarget.id;
  await axios.delete(`${API}/${id}`);
  showMessage("Successfully delete");
  getUsers(API);
}

$(document).on("click", ".btn-delete", deleteUsers);

// ! Toastify

function showMessage(message) {
  Toastify({
    text: messsage,
    duration: 1000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, black, white)",
    },
  }).showToast();
}

// ! UPDATE

let editForm = $(".edit-form");
let editInpNickname = $(".edit-inp-nickname");
let editInpEmail = $(".edit-inp-email");
let editInpPassword = $(".edit-inp-password");
let editInpPhoneNumber = $(".edit-inp-phonenumber");
let editInpPhoto = $(".edit-inp-image");

async function getUsersToEdit(event) {
  let id = event.currentTarget.id;
  let response = await axios(`${API}/${id}`);
  console.log(response);
  let { data } = response;
  console.log(data);
  editInpNickname.val(data.nickname);
  editInpEmail.val(data.email);
  editInpPassword.val(data.password);
  editInpPhoneNumber.val(data.phonenumber);
  editInpPhoto.val(data.image);

  editForm.attr("id", id);
}
$(document).on("click", ".btn-edit", getUsersToEdit);

async function saveEditedUsers(event) {
  event.preventDefault();
  let id = event.currentTarget.id;
  let nickname = editInpNickname.val();
  let email = editInpEmail.val();
  let password = editInpPassword.val();
  let phonenumber = editInpPhoneNumber.val();
  let photo = editInpImage.val();
  let editedUsers = {
    name,
    email,
    password,
    phonenumber,
    photo,
  };
  for (let key in editedUsers) {
    if (!editedUsers[key]) {
      alert("Sign in");
      return;
    }
  }
  await axios.patch(`${API}/${id}`, editedUsers);
  getUsers(API);
  $(".modal").modal("hide");
  showMessage("Information is saved");
}
editForm.on("submit", saveEditedUsers);

let searchInp = $(".search-inp");

async function liveSearch(event) {
  let value = event.target.value;
  let newAPI = `${API}?q=${value}`;
  currentPage = 1;
  getUsers(newAPI, false);
}
searchInp.on("input", liveSearch);
