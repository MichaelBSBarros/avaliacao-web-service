const express = require('express');
const res = require('express/lib/response');
const getMessage = require('./messagestorage');
const staticData = require('./data');
const { v4: uuidv4 } = require('uuid');
const attributeChecker = require('./attributechecker');

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

    let id = parseInt(req.params.id, 10) || false

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
        res.status(201).json({
            mensagem: getMessage('putSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.patch('/api/:id', (req, res, next) => {

    let id = req.params.id || false
    let index = staticData.findIndex(v => v.id == id)

    if (!id) {
        res.status(442).json({ erro: getMessage('invalidId') })
    } else if (index === -1) {
        res.status(404).json({ erro: getMessage('notFoundId') })
    } else {

        !req.body.attributeA ? attributeA = staticData[index].attributeA : attributeA = req.body.attributeA;
        !req.body.attributeB ? attributeB = staticData[index].attributeB : attributeB = req.body.attributeB;
        !req.body.attributeC ? attributeC = staticData[index].attributeC : attributeC = req.body.attributeC;
        !req.body.attributeD ? attributeD = staticData[index].attributeD : attributeD = req.body.attributeD;
        !req.body.attributeE ? attributeE = staticData[index].attributeE : attributeE = req.body.attributeE;

        staticData[index] = {
            id: staticData[index].id,
            attributeA: attributeA,
            attributeB: attributeB,
            attributeC: attributeC,
            attributeD: attributeD,
            attributeE: rattributeE
        };

        res.status(201).json({
            mensagem: getMessage('putSuccess')
        });
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
        staticData.splice(index)
    }
});

app.listen(port);