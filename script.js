const image = document.getElementById("image");
const result = document.getElementById("result");
const imageDisplayed = document.getElementById("imageDisplayed");
const options = document.querySelectorAll("input[type='radio']");
const ex = document.getElementById("ex");
const types = {
  TEXTFROMIMAGES: 0,
  THEMELABELSFROMIMAGES: 1,
};

image.addEventListener("change", () => {
  const fileImage = image.files[0];
  if (fileImage) {
    if (fileImage.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        ex.style.display = "none";
        imageDisplayed.style.display = "block";
        imageDisplayed.src = e.target.result;
      };
      reader.readAsDataURL(fileImage);
      result.textContent = "Chargement...";

      uploadFile(fileImage)
        .then((res) => {
          const resultArraySplitJoined = res[0].description
            .split("\n")
            .join("<br/>");
          result.innerHTML = resultArraySplitJoined;
        })
        .catch((err) => {
          console.log(err);
          result.textContent = "Il n'y a pas de texte dans cette image";
        });
    }
  }
});

async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:9999/detectTextOnImage", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
