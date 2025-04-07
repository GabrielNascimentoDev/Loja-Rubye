document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get("id");

  if (!produtoId) {
    document.body.innerHTML = "<h2>Produto não encontrado.</h2>";
    return;
  }

  try {
    const resposta = await fetch("./produtos.json");
    const produtos = await resposta.json();

    const produto = produtos.find((p) => p.id === produtoId);

    if (!produto) {
      document.body.innerHTML = "<h2>Produto não encontrado.</h2>";
      return;
    }

    // Definir imagem principal
    const imagem = document.getElementById("produto-imagem");
    imagem.src = produto.imagem;

    function trocarImagem(novaSrc, thumbElement) {
      document.getElementById("produto-imagem").src = novaSrc;

      // Remover classe "ativo" de todas as miniaturas
      document
        .querySelectorAll(".thumb")
        .forEach((img) => img.classList.remove("ativo"));

      // Adicionar classe "ativo" na miniatura clicada
      thumbElement.classList.add("ativo");
    }

    // Gerar thumbnails dinamicamente
    const thumbnailsContainer = document.getElementById("thumbnails-container");
    produto.thumbnails.forEach((thumbUrl, index) => {
      const thumb = document.createElement("img");
      thumb.src = thumbUrl;
      thumb.classList.add("thumb");
      if (index === 0) thumb.classList.add("ativo"); // Primeira miniatura ativa
      thumb.onclick = function () {
        trocarImagem(thumbUrl, thumb);
      };
      thumbnailsContainer.appendChild(thumb);
    });
  } catch (error) {
    console.error("Erro ao carregar o produto:", error);
  }
});
