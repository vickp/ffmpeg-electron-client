const url = document.getElementById("url");
const convertBtn = document.getElementById("convertBtn");
const convert = document.getElementById("convert");

convertBtn.addEventListener("click", (e) => {
  console.log(e);
  console.log(url.value);
  convert.innerText = url.value;
});
