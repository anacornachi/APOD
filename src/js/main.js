const API_KEY = "VVcxs18uZqlolX2LzY8Si8IzFWqmeVOeoEb09dg5";
const sectionMedia = document.querySelector("[data-section-media]");
const picDate = document.querySelector("[data-date]");
const copyright = document.querySelector("[data-copyright]");
const description = document.querySelector("[data-description]");
const datePicker = document.querySelector("[data-date-picker]");

function getData(date) {
  $.get(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`,
    function (data) {
      if (data.media_type == "video") {
        sectionMedia.innerHTML = ` <iframe width="560" height="320" src="${data.url}" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen data-apod></iframe>
      <h1 class="image__title" data-apod-title>${data.title}</h1>`;
      } else {
        sectionMedia.innerHTML = `
      <img class="apod" src="${data.url}" alt="" data-apod />
      <h1 class="image__title" data-apod-title>${data.title}</h1>`;
      }
      picDate.innerText = `${data.date}`;
      copyright.innerText = data.copyright ?? "Autor desconhecido";
      description.innerText = `${data.explanation}`;
    }
  );
}

const today = new Date();
const todayDate = today
  .toLocaleDateString("pt-BR")
  .split("/")
  .reverse()
  .join("-");

datePicker.value = todayDate;
getData(todayDate);

datePicker.addEventListener("change", () => getData(datePicker.value));
