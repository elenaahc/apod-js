import { api_key } from "./key";

function hide_content() {
    document.getElementById("text-vis").style.visibility = "visible";
}

function show_content() {
    document.getElementById("text-vis").style.visibility = "hidden";
}

// hide_content()

const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

//// Simple way without error catching
// async function getData() {
//     const response = await fetch(url)
//     const data = await response.json()
//     console.log(data);
// }
// getData()

// search_data(selected_date)

// Secure and reviewed way
function search_data(selected) {
    final_url = `${url}&date=${selected}`
  fetch(final_url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network Response ERROR");
      }
    })
    .then((data) => {
    //   console.log(data);
      displayData(data);
    })
    .catch((error) => console.error("Fetch error: ", error));
}

function displayData(data) {
  const p_date = data.date;
  const url_image = data.hdurl;
  const card_title = data.title;
  const card_exp = data.explanation;
  document.getElementById("date").innerHTML = `${p_date}`;
  document.getElementById("image").src = `${url_image}`;
  document.getElementById("title").innerText = `${card_title}`;
  document.getElementById("explan").innerText = `${card_exp}`;
}

const date_search = document.getElementById("datepicker");

date_search.addEventListener("change" , (event) => {
    // console.log(event.target.value);
    search_data(event.target.value);
    show_content();
});
