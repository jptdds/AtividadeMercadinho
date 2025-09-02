async function carregarProdutos() {
    const resposta = await fetch('http://localhost:8082/produtos');
    const produtos = await resposta.json();
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = "";
    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.className = 'produto';
        item.innerHTML = `
            <img src="${produto.imagem || 'https://via.placeholder.com/60'}" alt="${produto.nome}">
            <div class="produto-info">
                <span class="produto-nome">${produto.nome}</span><br>
                <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
            </div>
            <button onclick="excluirProduto(${produto.id})">Excluir</button>
        `;
        listaProdutos.appendChild(item);
    });
}

window.onload = carregarProdutos;

async function excluirProduto(id) {
    await fetch(`http://localhost:8082/produtos/${id}`, { method: 'DELETE' });
    carregarProdutos();
}

document.getElementById('form-produto').onsubmit = async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;
    await fetch('http://localhost:8082/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco, imagem })
    });
    carregarProdutos();
    this.reset();
};