let count = 1;

setInterval(function () {
  proximaImagem();
}, 4000);

function proximaImagem() {
  count++;
  if (count > 4) {
    count = 1;
  }

  document.getElementById("radio" + count).checked = true;
}
