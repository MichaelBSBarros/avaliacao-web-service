import express from "express";
import res from "express/lib/response.js"

import staticData from './data.mjs';
import { uuid } from 'uuidv4';
import attributeChecker from './checker.mjs';
import Params from './paramschecker.mjs';
import messagestorage from './messagestorage.mjs';

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
    res.status(404).json({ erro: messagestorage.getMessage('notFoundId') });
});

app.post('/api', (req, res) => {

    errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        staticData.push({
            _id: uuid(),
            attributeA: req.body.attributeA,
            attributeB: req.body.attributeB,
            attributeC: req.body.attributeC,
            attributeD: req.body.attributeD,
            attributeE: req.body.attributeE
        });

        res.errors
        res.status(200).json({
            mensagem: messagestorage.getMessage('postSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
});

app.put('/api/:_id', (req, res, next) => {

    Params.checkerId(req)

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
            mensagem: messagestorage.getMessage('alterationSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.patch('/api/:_id', (req, res, next) => {

    let _id = (req.params._id).replace(/[^a-zA-Z-]/g, "") || false
    let index = staticData.findIndex(v => v._id == _id)

    if (!_id) {
        res.status(442).json({ erro: messagestorage.getMessage('invalidId') })
    } else if (index === -1) {
        res.status(404).json({ erro: messagestorage.getMessage('notFoundId') })
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
                mensagem: messagestorage.getMessage('alterationSuccess')
            });
            res.end();
            return;
        } else {
            res.status(400).json(errors)
        }
    }
})

app.delete('/api/:_id', (req, res) => {

    let _id = (req.params._id).replace(/[^a-zA-Z-]/g, "") || false
    let index = staticData.findIndex(v => v._id == _id)

    if (!_id) {
        res.status(442).json({ erro: messagestorage.getMessage('invalidId') })
    } else if (index === -1) {
        res.status(404).json({ erro: messagestorage.getMessage('notFoundId') })
    } else {
        res.status(200).json({
            mensagem: messagestorage.getMessage('delSuccess')
        });
        staticData.splice(index)
    }
});

app.listen(port);