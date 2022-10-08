const express = require('express');
const res = require('express/lib/response');
const manipulacaoDeMsg = require('./mensagens');
const staticData = require('./data')
const { v4: uuidv4 } = require("uuid");
module.exports = uuidv4

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
    res.status(404).json({ erro: manipulacaoDeMsg('notFoundId') });
});

app.post('/api', (req, res) => {
    //res.send(req.body)
    const { attributeA, attributeB, attributeC, attributeD, attributeE } = req.body;
    //res.send(attributeA)
    //
    //console.log(data);
    staticData.push({
        id: uuidv4,
        attributeA,
        attributeB,
        attributeC,
        attributeD,
        attributeE
    });
    res.send('ok');
});

app.put('/api/:id', (req, res, next) => {

    let errors = {}

    let id = parseInt(req.params.id, 10) || false

    if (!id) {
        res.status(442).json({ erro: manipulacaoDeMsg('invalidId') })
    }

    let index = staticData.findIndex(v => v.id == id)
    if (index === -1) {
        res.status(404).json({ erro: manipulacaoDeMsg('notFoundId') })
    }

    if (!req.body.id) {
        errors["ID"] = (manipulacaoDeMsg('requiredField', 'ID'))
    } else if (isNaN(req.body.id) || !Number.isInteger(req.body.id)) {
        errors["ID"] = (manipulacaoDeMsg('isInt', "ID"))
    } else if (req.body.id < 0) {
        errors["ID"] = (manipulacaoDeMsg('positiveNumber', 'ID'))
    }

    if (!req.body.attributeA) {
        errors["attributeA"] = (manipulacaoDeMsg('requiredField', 'attributeA'))
    } else if (!/^[a-zA-Z]+$/.test(req.body.attributeA)) {
        errors["attributeA"] = (manipulacaoDeMsg('onlyLetters', 'attributeA'))
    } else if (req.body.attributeA.length <= 1) {
        errors["attributeA"] = (manipulacaoDeMsg('lengthMoreThan', 'attributeA', 2))
    } else if (req.body.attributeA.length > 100) {
        errors["attributeA"] = (manipulacaoDeMsg('lengthLessThan', 'attributeA', null, 100))
    }

    if (!req.body.attributeB) {
        errors["attributeB"] = (manipulacaoDeMsg('requiredField', 'attributeB'))
    } else if (req.body.attributeB.length <= 8) {
        errors["attributeB"] = (manipulacaoDeMsg('lengthMoreThan', 'attributeB', 8))
    } else if (req.body.attributeB.length > 40) {
        errors["attributeB"] = (manipulacaoDeMsg('lengthLessThan', 'attributeB', null, 40))
    }

    if (!req.body.attributeC) {
        errors["attributeC"] = (manipulacaoDeMsg('requiredField', 'attributeC'))
    } else if (isNaN(req.body.attributeC)) {
        errors["attributeC"] = (manipulacaoDeMsg('isNumber', 'attributeC'))
    }

    if (!req.body.attributeD) {
        errors["attributeD"] = (manipulacaoDeMsg('requiredField', 'attributeD'))
    } else if (isNaN(req.body.attributeD) || !Number.isInteger(req.body.attributeD)) {
        errors["attributeD"] = (manipulacaoDeMsg('isInt', 'attributeD'))
    } else if (req.body.attributeD < 0) {
        errors["attributeD"] = (manipulacaoDeMsg('positiveNumber', 'attributeD'))
    }

    if (!req.body.attributeE) {
        errors["attributeE"] = (manipulacaoDeMsg('requiredField', 'attributeE'))
    } else if (typeof req.body.attributeE != "boolean") {
        errors["attributeE"] = (manipulacaoDeMsg('isBoolean', 'attributeD'))
    }
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
            mensagem: manipulacaoDeMsg('putSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`));