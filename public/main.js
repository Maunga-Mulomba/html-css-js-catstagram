export const createMainContent = () => {
  // Create h1
  const h1 = document.createElement("h1");
  h1.innerText = "Catstagram";

  // Create img
  const img = document.createElement("img");
  img.id = "cat-image";

  // create button
  const newCatBtn = document.createElement("button");
  newCatBtn.id = "newCatBtn";
  newCatBtn.textContent = "Next Cat";

  // add components to container
  const container = document.querySelector(".container");
  container.appendChild(h1);
  container.appendChild(img);
  container.appendChild(newCatBtn);

  // restore image
  const savedImage = localStorage.getItem("image");
  if (savedImage) {
    img.src = savedImage;
  } else {
    fetchImage();
  }

  // add event to button

  newCatBtn.addEventListener("click", () => {
    localStorage.removeItem("listState"); // Remove comments from storage

    fetchImage();

    const listOfComments = document.getElementById("listOfComments");
    if (listOfComments) {
      listOfComments.innerHTML = "";
    }
  });
};

const fetchImage = async () => {
  // Fetch image from API and set img url
  score.textContent = 0;
  localStorage.setItem("score", 0);

  try {
    const kittenResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=small"
    );
    const kittenData = await kittenResponse.json();
    const kittenImg = document.querySelector("img");
    kittenImg.src = kittenData[0].url;

    localStorage.setItem("image", kittenData[0].url);
  } catch (e) {
    console.log("Failed to fetch image", e);
  }
};
