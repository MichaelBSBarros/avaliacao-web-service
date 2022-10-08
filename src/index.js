const express = require('express');
const res = require('express/lib/response');
const getMessage = require('./messagestorage');
const staticData = require('./data')
    //const attributeChecker = require('./attributechecker')
const { v4: uuidv4 } = require("uuid");

const app = express();

function attributeChecker(req) {
    let errors = {}

    if (!req.body.attributeA || req.body.attributeA === null) {
        errors["attributeA"] = (getMessage('requiredField', 'attributeA'))
    } else if (!/^[a-zA-Z]+$/.test(req.body.attributeA)) {
        errors["attributeA"] = (getMessage('onlyLetters', 'attributeA'))
    } else if (req.body.attributeA.length <= 1) {
        errors["attributeA"] = (getMessage('lengthMoreThan', 'attributeA', 2))
    } else if (req.body.attributeA.length > 100) {
        errors["attributeA"] = (getMessage('lengthLessThan', 'attributeA', null, 100))
    }

    if (!req.body.attributeB || req.body.attributeB === null) {
        errors["attributeB"] = (getMessage('requiredField', 'attributeB'))
    } else if (req.body.attributeB.length <= 8) {
        errors["attributeB"] = (getMessage('lengthMoreThan', 'attributeB', 8))
    } else if (req.body.attributeB.length > 40) {
        errors["attributeB"] = (getMessage('lengthLessThan', 'attributeB', null, 40))
    }

    if (!req.body.attributeC || req.body.attributeC === null) {
        errors["attributeC"] = (getMessage('requiredField', 'attributeC'))
    } else if (isNaN(req.body.attributeC)) {
        errors["attributeC"] = (getMessage('isNumber', 'attributeC'))
    }

    if (!req.body.attributeD || req.body.attributeD === null) {
        errors["attributeD"] = (getMessage('requiredField', 'attributeD'))
    } else if (isNaN(req.body.attributeD) || !Number.isInteger(req.body.attributeD)) {
        errors["attributeD"] = (getMessage('isInt', 'attributeD'))
    } else if (req.body.attributeD < 0) {
        errors["attributeD"] = (getMessage('positiveNumber', 'attributeD'))
    }

    if (req.body.attributeE === "" || req.body.attributeE === null) {
        errors["attributeE"] = (getMessage('requiredField', 'attributeE'))
    } else if (typeof req.body.attributeE != "boolean") {
        errors["attributeE"] = (getMessage('isBoolean', 'attributeE'))
    }
    return errors;
}

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
        res.status(200).json({
            mensagem: getMessage('putSuccess')
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
})

app.listen(port);