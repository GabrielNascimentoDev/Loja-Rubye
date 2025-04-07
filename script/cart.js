document.addEventListener("DOMContentLoaded", () => {
  exibirCarrinho();
});

function exibirCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoContainer = document.getElementById("carrinho-container");
  carrinhoContainer.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <p>${item.nome} - Tamanho: ${
      item.tamanho
    } - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
            <img src="${item.imagem}" class="img-cart">
            <button onclick="removerProduto(${index})" class="btn-remover"><img src="./assets/calcas/lata-de-lixo.png" width= "20px"></img></button>
        `;
    carrinhoContainer.appendChild(div);
    total += item.preco * item.quantidade;
  });

  document.getElementById("total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerProduto(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1); // Remove pelo índice
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  exibirCarrinho();
}

document.getElementById("finalizar-compra").addEventListener("click", () => {
  alert("Compra finalizada! Obrigado por comprar conosco.");
  localStorage.removeItem("carrinho");
  exibirCarrinho();
});
