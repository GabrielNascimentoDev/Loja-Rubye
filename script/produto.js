document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get("id");

  if (!produtoId) {
    document.body.innerHTML = "<h2>Produto não encontrado.</h2>";
    return;
  }

  try {
    const resposta = await fetch("produtos.json");
    const produtos = await resposta.json();

    const produto = produtos.find((p) => p.id === produtoId);

    if (!produto) {
      document.body.innerHTML = "<h2>Produto não encontrado.</h2>";
      return;
    }
    document.getElementById("produto-nome").textContent = produto.nome;
    document.getElementById("produto-preco").textContent = "R$" + produto.preco;
    document.getElementById("produto-descricao").textContent =
      produto.descricao;
    document.getElementById("produto-imagem").src = produto.imagem;
    document.getElementById("produto-medidas").src = produto.medidas;
    const detalhesElement = document.getElementById("produto-detalhes");
    produto.detalhes.forEach((detalhe) => {
      const detalheItem = document.createElement("li");
      detalheItem.textContent = detalhe;
      detalhesElement.appendChild(detalheItem);
    });
    const tamanhoSelect = document.getElementById("produto-tamanho");
    produto.tamanho.forEach((tamanho) => {
      const option = document.createElement("option");
      option.textContent = tamanho;
      option.value = tamanho;
      tamanhoSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar o produto:", error);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const botaoCarrinho = document.querySelector(".botao-carrinho");

  botaoCarrinho.addEventListener("click", () => {
    adicionarAoCarrinho();
  });
});

function adicionarAoCarrinho() {
  // Pegamos as informações do produto na tela
  const nome = document.getElementById("produto-nome").innerText;
  const preco = parseFloat(
    document.getElementById("produto-preco").innerText.replace("R$", "").trim()
  );
  const tamanhoSelecionado = document.getElementById("produto-tamanho").value;
  const imagem = document.getElementById("produto-imagem").src;

  // Verificamos se o usuário escolheu um tamanho
  if (tamanhoSelecionado === "Escolha uma opção") {
    alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
    return;
  }

  // Criamos o objeto do produto
  const produto = {
    nome: nome,
    preco: preco,
    tamanho: tamanhoSelecionado,
    imagem: imagem,
    quantidade: 1,
  };

  // Adicionamos ao carrinho
  salvarProdutoNoCarrinho(produto);
}

function salvarProdutoNoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Verifica se o produto já está no carrinho
  let produtoExistente = carrinho.find(
    (item) => item.nome === produto.nome && item.tamanho === produto.tamanho
  );

  if (produtoExistente) {
    produtoExistente.quantidade += 1; // Se já existe, aumenta a quantidade
  } else {
    carrinho.push(produto); // Se não existe, adiciona ao carrinho
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
