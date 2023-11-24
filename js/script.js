const fetchJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

fetchJoke.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      let joke = data.value;
      let jokeItem = document.createElement("li");
      jokeItem.textContent = joke;
      jokeList.appendChild(jokeItem);
      //Parse transforma un string en objeto para que pueda leerlo el localstorage
      const storedJokes = JSON.parse(localStorage.getItem("storedJokes")) || [];
      storedJokes.push(joke);
      localStorage.setItem("storedJokes", JSON.stringify(storedJokes));
      // jokeList.innerText += (data.value);
      console.log(joke);
    })
    .catch((error) => {
      jokeList.innerText = "No se puede  cargar la broma";
      console.error(error);
    });
});

const loadJokes = () => {
  const storedJokes = JSON.parse(localStorage.getItem("storedJokes")) || [];
  const jokeList = document.getElementById("jokeList");
  jokeList.innerHTML = "";
  storedJokes.forEach((joke, index) => {
    const jokeItem = document.createElement("li");
    jokeItem.textContent = joke;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Borrar";
    deleteBtn.addEventListener("click", () => {
      storedJokes.splice(index, 1);
      localStorage.setItem("storedJokes", JSON.stringify(storedJokes));
      jokeList.removeChild(jokeItem);
    });

    jokeItem.appendChild(deleteBtn);
    jokeList.appendChild(jokeItem);
    console.log(index);
  });
};

document.addEventListener("DOMContentLoaded", loadJokes);
