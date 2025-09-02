const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const produtos = [
    {
        id: 1,
        nome: 'Arroz',
        preco: 10.0,
        imagem: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        nome: 'Feijão',
        preco: 8.0,
        imagem: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        nome: 'Óleo',
        preco: 5.0,
        imagem: 'https://images.unsplash.com/photo-1464306076886-debede1a7c94?auto=format&fit=crop&w=400&q=80'
    }
];

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = produtos.length + 1;
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    produtos[index] = { id, ...req.body };
    res.json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    produtos.splice(index, 1);
    res.status(204).send();
});

app.listen(8082, () => {
    console.log('Servidor rodando na porta 8082');
});
