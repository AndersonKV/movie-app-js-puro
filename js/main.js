// import UserController from "./controller.js";
let item = new Array();
let movie = new Array();

const templateHtml = (val, data) => {
  const initModal = () => {
    const stringHtml = `
    <div id="init-modal" class=" ">
        <div class="container">
          <div class="input-field">
            <input id="user" type="text" class="validate"/>
            <label for="user">Usúario</label>
            <a class="waves-effect waves-light btn">Confirma</a>
          </div>
      </div>
    </div>`;
    const dom = document.createElement("div");
    dom.innerHTML = stringHtml;
    dom.querySelector(".btn").addEventListener("click", handleUser);
    document.querySelector("body").append(dom);
  };
  const createIndexHTML = () => {
    try {
      const getUser = localStorage.getItem("user");
      const user = JSON.parse(getUser || "[]");
      if (user.name === undefined) {
        localStorage.clear();
        document.location.reload();
        return;
      }
      const stringHeader = ` 
      <div class="nav-wrapper   container">
        <ul id="nav-mobile" class="left  ">
          <li><a class="black home">Bem vindo</a></li>
          <li><a class="black-text name">${user.name}</a></li>
        </ul id="nav-mobile" class="left">
 
        <ul id="nav-mobile" class="right  ">
          <li class="list-liked"><a class="black-text">Filmes curtidos</a></li>
          <li class="list-disliked"><a class="black-text  ">Filmes não curtidos</a></li>
        </ul>
      </div>
     `;

      //<ul id="nav-mobile" class="right hide-on-med-and-down">

      const stringDom = `<div class="container pink accent-2  ">
      <div class="row" id="main-index">
        <form class="col s12">
          <div class="row white">
            <i class="material-icons large col s12 center">movie</i>
            <div class="input-field col s12 m12 l12 xl12 valign-wrapper">
              <input
                id="icon_movie"
                type="text"
                class="validate col s10 m11 l11 xl11"
              />
              <label for="icon_movie">Digite o nome do filme</label>
              <a class="waves-effect waves-light btn-small col s2 m1 l1 xl1 button">
                <i class="material-icons large">search</i>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>`;
      const dom = document.createElement("div");
      const nav = document.createElement("nav");

      dom.innerHTML = stringDom;
      nav.innerHTML = stringHeader;
      nav.classList.add("white");

      dom.querySelector("input").addEventListener("keyup", handleKeyUp);

      nav.querySelector(".home").addEventListener("click", () => {
        document.querySelectorAll(".container")[1].remove();
        document.querySelector("nav").remove();
        createIndexHTML();
      });

      nav.querySelector(".list-liked").addEventListener("click", () => {
        document.querySelectorAll(".container")[1].remove();
        ListLikedHtml();
      });

      nav.querySelector(".list-disliked").addEventListener("click", () => {
        document.querySelectorAll(".container")[1].remove();
        DislikedHtml();
      });

      document.querySelector("body").append(nav);
      document.querySelector("body").append(dom);
      //dom.querySelector(".button")as).addEventListener("click", handleSubmit);
    } catch (err) {
      console.log(err);
    }
  };
  const screenMovieHTML = () => {
    const stringDom = `
    <div class="container screen-movie">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}"/>
              <div class="text-inside col row">
                <div >
                  <h2>${data.original_title}</h2>
                </div>
               <div class="row my-center  ">
                <h5 class="  ">${data.overview}</h5>
                <!-- Modal Trigger -->
                <a class="col m2 red-text sinopse   modal-trigger" href="#modal1">Ver sinopse</a>
              </div>
          </div>
 

          
 
  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content center-align">
      <div>
        <img  class="center" src="https://image.tmdb.org/t/p/w500/${data.poster_path}"/>
      </div>
      <p>${data.overview}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
    </div>
  </div>



         </div>
        <div class="card-content custom-btn   ">
        <a class="btn-dislike waves-effect white black-text  waves-light btn-small  button">
         <i class="material-icons large">thumb_down</i>
         <span>Não curtir</span>
      </a>
        <a class="waves-effect white black-text  btn-small btn-back button">Voltar</a>
        <a class="btn-like waves-effect white red-text  waves-light btn-small  button">
          <i class="material-icons large">thumb_up</i>
         <span>Curtir</span>
       </a>
        
          </div>
        
      </div>
    </div>
    
  </div>`;

    const dom = document.createElement("div");
    dom.innerHTML = stringDom;

    dom.addEventListener("click", function () {
      var elems = this.querySelectorAll(".modal");

      elems[0].classList.forEach((element) => {
        if (element === "open") {
          elems[0].classList.remove("open");
        }
      });

      var instances = M.Modal.init(elems);
    });

    dom.querySelector(".btn-back").addEventListener("click", function () {
      document.querySelector(".screen-movie").remove();
      document.querySelector("nav").remove();
      createIndexHTML("index");
    });

    dom.querySelector(".btn-like").addEventListener("click", function () {
      console.log("liked");
      const dataStorage = localStorage.getItem("liked");
      const getData = JSON.parse(dataStorage || "[]");

      console.log(getData.length);
      if (getData.length === 0) {
        const dataStringfy = JSON.stringify(movie);
        localStorage.setItem("liked", dataStringfy);
        return;
      }

      const dataFinal = getData.concat(movie[0]);
      console.log("dataFinal");
      console.log(dataFinal);
      const arr = [];
      let validate = false;

      getData.forEach((element) => {
        if (element.id !== movie[0].id) {
          arr.push(element);
        } else {
          validate = true;
        }
      });

      if (validate === false) {
        arr.push(movie[0]);
      }

      validate = false;
      const dataStringfy = JSON.stringify(arr);
      localStorage.setItem("liked", dataStringfy);
    });

    dom.querySelector(".btn-dislike").addEventListener("click", function () {
      console.log("liked");
      const dataStorage = localStorage.getItem("disliked");
      const getData = JSON.parse(dataStorage || "[]");

      console.log(getData.length);
      if (getData.length === 0) {
        const dataStringfy = JSON.stringify(movie);
        localStorage.setItem("disliked", dataStringfy);
        return;
      }

      const dataFinal = getData.concat(movie[0]);
      console.log("dataFinal");
      console.log(dataFinal);
      const arr = [];
      let validate = false;

      getData.forEach((element) => {
        if (element.id !== movie[0].id) {
          arr.push(element);
        } else {
          validate = true;
        }
      });

      if (validate === false) {
        arr.push(movie[0]);
      }

      validate = false;
      const dataStringfy = JSON.stringify(arr);
      localStorage.setItem("disliked", dataStringfy);
    });

    document.querySelector("body").append(dom);
  };

  const ListLikedHtml = () => {
    const dataStorage = localStorage.getItem("liked");
    const getData = JSON.parse(dataStorage || "[]");

    let output = getData.map((i) => {
      return `
      <div class="list-like  " id=${i.id}>
        <figure>
          <img src="https://image.tmdb.org/t/p/w500${
            i.poster_path
          }" alt="poster do filme ${i.original_title}"/>
        </figure>
        <div>
          <span class="black-text">${verifyDate(i.release_date)}</span>
          <span class="black-text">${i.original_title}</span>
        </div>
      </div>
        `;
    });

    const dom = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerHTML = "Lista de filmes curtidos";
    h3.classList.add("white-text", "black");

    dom.innerHTML = output.join("");

    dom.classList.add("container", "white");
    dom.insertBefore(h3, dom.firstChild);

    document.querySelector("body").append(dom);
  };

  const DislikedHtml = () => {
    const dataStorage = localStorage.getItem("disliked");
    const getData = JSON.parse(dataStorage || "[]");

    let output = getData.map((i) => {
      return `
      <div class="list-like  " id=${i.id}>
        <figure>
          <img src="https://image.tmdb.org/t/p/w500${
            i.poster_path
          }" alt="poster do filme ${i.original_title}"/>
        </figure>
        <div>
          <span class="black-text">${verifyDate(i.release_date)}</span>
          <span class="black-text">${i.original_title}</span>
        </div>
      </div>
        `;
    });

    const dom = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.innerHTML = "Lista de filmes não curtidos";
    h3.classList.add("white-text", "black");

    dom.innerHTML = output.join("");

    dom.classList.add("container", "white");
    dom.insertBefore(h3, dom.firstChild);

    document.querySelector("body").append(dom);
  };

  switch (val) {
    case "index":
      createIndexHTML();
      break;
    case "movie":
      screenMovieHTML();
      break;
    case "modal":
      initModal();
      break;
    default:
      return null;
    // code block
  }
};
window.addEventListener("load", function () {
  //se ja estive gravado os dados no localStorage
  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser || "[]");
  if (user.length !== 0) {
    console.log("sim");
    templateHtml("index");
  } else {
    console.log("nao");
    templateHtml("modal");
  }
});
const handleUser = () => {
  const input = document.querySelector("input");
  if (input && input.value.trim().length !== 0) {
    const user = { name: input.value };
    const dataStringfy = JSON.stringify(user);
    localStorage.setItem("user", dataStringfy);
    document.querySelector("#init-modal").remove();
    templateHtml("index");
  } else {
    alert("digite um nome");
  }
};
async function handleKeyUp(event) {
  movie = [];
  const target = event.target;
  const text = target.value;
  const API_KEY = "8c6791c6ea9891f29fc5aa707f18e4c8";
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}`
  );
  let data = await response.json();
  const { results } = data;
  if (document.querySelector(".container-search")) {
    document.querySelector(".container-search").remove();
  }
  if (results) {
    item = [];
    results.forEach((element) => {
      item.push(element);
    });
    containerBoxSearch(results);
  }
}
function containerBoxSearch(data) {
  movie = [];
  const dom = document.createElement("div");
  let output = data.map((i) => {
    return `
    <div class="list-section" id=${i.id}>
      <figure>
        <img src="https://image.tmdb.org/t/p/w500${
          i.poster_path
        }" alt="poster do filme ${i.original_title}"/>
      </figure>
      <div>
        <span>${verifyDate(i.release_date)}</span>
        <span>${i.original_title}</span>
      </div>
    </div>
      `;
  });

  dom.innerHTML = output.join("");

  dom.classList.add("container-search", "row");

  dom.querySelectorAll(".list-section").forEach((element) => {
    element.querySelector(`img`).addEventListener("error", handleErrorImage);
    element.addEventListener("click", enterInMovieLabel);
  });

  document.querySelector("form .row").append(dom);
}
const verifyDate = (value) => {
  if (value) {
    return value.split("-")[0];
  }
  return "Não encontrado";
};
const handleErrorImage = (event) => {
  const img =
    "https://image.freepik.com/free-vector/404-error-sign_23-2147508325.jpg";
  event.target.src = img;
};
const enterInMovieLabel = async (event) => {
  movie = [];
  for (let i = 0; i < item.length; i++) {
    if (parseInt(item[i].id) === parseInt(event.target.id)) {
      movie.push(item[i]);
      templateHtml("movie", item[i]);
      document.querySelectorAll(".container")[1].remove();
      break;
    }
  }
};
async function handleSubmit(event) {
  const word = document.querySelector("input");
  const API_KEY = "8c6791c6ea9891f29fc5aa707f18e4c8";
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${word.value}`
  );
  let data = await response.json();
  console.log(data);
  console.log(word.value);
}
const openModal = (event) => {
  const stringDom = `   <div id="modal1" class="modal">
  <div class="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
  </div>
</div>`;
  const dom = document.createElement("div");
  dom.innerHTML = stringDom;
  document.querySelector("body").append(dom);
  console.log(event.target);
};
