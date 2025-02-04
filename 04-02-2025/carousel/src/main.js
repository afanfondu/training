import "./style.css";

const imageUrls = ["/3.jpg", "/4.jpg", "/1.jpg", "/2.jpg"];

const app = document.querySelector("#app");

const initialMarkups = (imageUrls) => {
  app.innerHTML = `
    <div>
      <div class="slider">
        ${imageUrls
          .map(
            (url) => `
              <div>
                <img src="${url}" />
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="btns">
        <button id="prev">previous</button>
        <button id="next">next</button>
      </div>
    </div>
  `;
};
initialMarkups(imageUrls);

const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const slider = document.querySelector(".slider");

// initial translate
const translateX = Math.floor(imageUrls.length / 2) * 100;
slider.style.transform = `translateX(-${translateX}%)`;

let nextRunning = false;
next.addEventListener("click", () => {
  if (nextRunning) return;

  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${translateX + 100}%)`;
  nextRunning = true;

  slider.addEventListener("transitionend", function handler() {
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${translateX}%)`;

    slider.appendChild(slider.firstElementChild);

    nextRunning = false;
    slider.removeEventListener("transitionend", handler);
  });
});

let prevRunning = false;
previous.addEventListener("click", () => {
  if (prevRunning) return;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${translateX - 100}%)`;
  prevRunning = true;

  slider.addEventListener("transitionend", function handler() {
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${translateX}%)`;
    slider.prepend(slider.lastElementChild);
    prevRunning = false;
    slider.removeEventListener("transitionend", handler);
  });
});
