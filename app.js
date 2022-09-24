const express = require('express');
const res = require('express/lib/response');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

let staticData = [{
    id: "1",
    attributeA: "AAA AAAAA",
    attributeB: "BBBB BBBB",
    attributeC: 83.18,
    attributeD: 53655078,
    attributeE: true
}, ];

app.put('/api/:id', (req, res, next) => {
    try {

        let id = parseInt(req.params.id, 10) || false

        if (!id) {
            let err = new Error('ID Inválido!')
            err.status = 422
            throw err
        }

        let index = staticData.findIndex(v => v.id == id)
        if (index === -1) {
            let err = new Error('ID não encontrado!')
            err.status = 404
            throw err
        }

        let errors = {}

        if (!req.body.id) {
            errors.id = 'ID é um campo obrigatório!'
        } else if (isNaN(req.body.id)) {
            errors.id = 'ID inválido! Precisa ser um número!'
        }

        if (!req.body.attributeA) {
            errors.attributeA = 'O atributo A é um campo obrigatório!'
        } else if (req.body.attributeA.length <= 1) {
            errors.attributeA = 'O Atributo A está muito CURTO! Precisa ter no mínimo 2 caracteres!'
        } else if (req.body.attributeA.length > 256) {
            errors.attributeA = 'O Atributo A está muito LONGO! Precisa ter no máximo 256 caracteres!'
        }

        if (!req.body.attributeB) {
            errors.attributeB = 'O atributo B é um campo obrigatório!'
        } else if (req.body.attributeB.length <= 1) {
            errors.attributeB = 'O Atributo B está muito CURTO! Precisa ter no mínimo 2 caracteres!'
        } else if (req.body.attributeB.length > 256) {
            errors.attributeB = 'O Atributo B está muito LONGO! Precisa ter no máximo 256 caracteres!'
        }

        if (!req.body.attributeC) {
            errors.id = 'O atributo C é um campo obrigatório!'
        } else if (isNaN(req.body.attributeC)) {
            errors.id = 'O atributo C está inválido! Precisa ser um número!'
        }

        if (!req.body.attributeD) {
            errors.id = 'O atributo D é um campo obrigatório!'
        } else if (isNaN(req.body.attributeD)) {
            errors.id = 'O atributo D está inválido! Precisa ser um número!'
        }

        if (!req.body.attributeE) {
            errors.attributeE = 'O atributo E é um campo obrigatório'
        } else if (typeof req.body.attributeE != "boolean") {
            errors.attributeE = 'O atributo E está inválido! Precisa ser true ou false!'
        }

        staticData[index] = {
            id: req.body.id,
            attributeA: req.body.attributeA,
            attributeB: req.body.attributeB,
            attributeC: req.body.attributeC,
            attributeD: req.body.attributeD,
            attributeE: req.body.attributeE
        }

        res.send('Dados alterados!');
        return res.status(err).json({});

    } catch (err) {
        return res.status(err).json({});
    }
})

app.listen(port, () => console.log(`Servidor iniciado em http://localhost:${port}`));