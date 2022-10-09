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

app.get('/api/:_id', (req, res) => {
    const _id = req.params._id

    for (let data of staticData) {
        if (data._id === _id) {
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
            _id: uuidv4(),
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

app.put('/api/:_id', (req, res, next) => {

    let _id = parseInt(req.params._id, 10) || false

    if (!_id) {
        res.status(442).json({ erro: getMessage('invalidId') })
    }

    let index = staticData.findIndex(v => v._id == _id)
    if (index === -1) {
        res.status(404).json({ erro: getMessage('notFoundId') })
    }

    errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        staticData[index] = {
            _id: req.body._id,
            attributeA: req.body.attributeA,
            attributeB: req.body.attributeB,
            attributeC: req.body.attributeC,
            attributeD: req.body.attributeD,
            attributeE: req.body.attributeE
        }
        res.errors
        res.status(201).json({
            mensagem: getMessage('alterationSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.patch('/api/:_id', (req, res, next) => {

    let _id = req.params._id || false
    let index = staticData.findIndex(v => v._id == _id)

    if (!_id) {
        res.status(442).json({ erro: getMessage('invalidId') })
    } else if (index === -1) {
        res.status(404).json({ erro: getMessage('notFoundId') })
    } else {

        if (!req.body.attributeA) { req.body.attributeA = staticData[index].attributeA }
        if (!req.body.attributeB) { req.body.attributeB = staticData[index].attributeB }
        if (!req.body.attributeC) { req.body.attributeC = staticData[index].attributeC }
        if (!req.body.attributeD) { req.body.attributeD = staticData[index].attributeD }
        if (!req.body.attributeE) { req.body.attributeE = staticData[index].attributeE }

        errors = attributeChecker(req)

        if (Object.keys(errors).length === 0) {

            staticData[index] = {
                _id: staticData[index]._id,
                attributeA: req.body.attributeA,
                attributeB: req.body.attributeB,
                attributeC: req.body.attributeC,
                attributeD: req.body.attributeD,
                attributeE: req.body.attributeE
            }
            res.errors
            res.status(201).json({
                mensagem: getMessage('alterationSuccess')
            });
            res.end();
            return;
        } else {
            res.status(400).json(errors)
        }
    }
})

app.delete('/api/:_id', (req, res) => {

    let _id = req.params._id || false
    let index = staticData.findIndex(v => v._id == _id)

    if (!_id) {
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