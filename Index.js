const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'src')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
app.get('/',async(req,res)=>{
    res.send("Página Inicial!");
});
app.listen(8082,()=>{
    console.log("Servidor rodando na url http://localhost:8082");
});
