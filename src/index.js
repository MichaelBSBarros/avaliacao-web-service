const express = require('express');
const res = require('express/lib/response');
const getMessage = require('./messagestorage');
const staticData = require('./data')
const attributeChecker = require('./attributechecker')
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
    res.json(staticData);
});

app.get('/api/:id', (req, res) => {
    const id = req.params.id

    for (let data of staticData) {
        if (data.id === id) {
            res.json(data)
            return
        }
    }
    res.status(404).json({ erro: getMessage('notFoundId') });
});

app.post('/api', (req, res) => {

    errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        staticData.push({
            id: uuidv4(),
            attributeA: req.body.attributeA,
            attributeB: req.body.attributeB,
            attributeC: req.body.attributeC,
            attributeD: req.body.attributeD,
            attributeE: req.body.attributeE
        });

        res.errors
        res.status(200).json({
            mensagem: getMessage('postSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
});

app.put('/api/:id', (req, res, next) => {

    let id = req.params.id || false

    if (!id) {
        res.status(442).json({ erro: getMessage('invalidId') })
    }

    let index = staticData.findIndex(v => v.id == id)
    if (index === -1) {
        res.status(404).json({ erro: getMessage('notFoundId') })
    }

    errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        staticData[index] = {
            id: req.body.id,
            attributeA: req.body.attributeA,
            attributeB: req.body.attributeB,
            attributeC: req.body.attributeC,
            attributeD: req.body.attributeD,
            attributeE: req.body.attributeE
        }
        res.errors
        res.status(200).json({
            mensagem: getMessage('putSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.delete('/api/:id', (req, res) => {

    let id = req.params.id || false
    let index = staticData.findIndex(v => v.id == id)

    if (!id) {
        res.status(442).json({ erro: getMessage('invalidId') })
    } else if (index === -1) {
        res.status(404).json({ erro: getMessage('notFoundId') })
    } else {
        res.status(200).json({
            mensagem: getMessage('delSuccess')
        });
        res.end();
        return;
    }
});

app.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`));