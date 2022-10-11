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

app.get("/usuarios", (req, res) => {
    res.json(staticData);
});

app.get('/usuarios/:_id', (req, res) => {
    let _id = req.params._id

    let functionReturn = Params.checkerId(req)
    if (functionReturn) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    }

    for (let data of staticData) {
        if (data._id === _id) {
            res.json(data)
            return
        }
    }
});

app.post('/usuarios', (req, res) => {

    let errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        let tempId = uuid();

        staticData.push({
            _id: tempId,
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone_fixo: req.body.telefone_fixo,
            usuario_ouvidor: req.body.usuario_ouvidor
        });

        res.errors
        res.status(200).json({
            mensagem: messagestorage.getMessage('postSuccess'),
            _id: tempId
        });
        res.end();
        return;
    } else {
        res.status(400).json(errors)
    }
});

app.put('/usuarios/:_id', (req, res, next) => {

    let functionReturn = Params.checkerId(req)
    if (functionReturn.status != 0) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    }

    let errors = attributeChecker(req)

    if (Object.keys(errors).length === 0) {

        console.log(functionReturn.index)
        staticData[functionReturn.index] = {
            _id: req.body._id,
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone_fixo: req.body.telefone_fixo,
            usuario_ouvidor: req.body.usuario_ouvidor
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

app.patch('/usuarios/:_id', (req, res, next) => {

    let functionReturn = Params.checkerId(req)
    if (functionReturn.status != 0) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    } else {
        let index = functionReturn.index

        if (!req.body.nome) { req.body.nome = staticData[index].nome }
        if (!req.body.email) { req.body.email = staticData[index].email }
        if (!req.body.senha) { req.body.senha = staticData[index].senha }
        if (!req.body.telefone_fixo) { req.body.telefone_fixo = staticData[index].telefone_fixo }
        if (!req.body.usuario_ouvidor) { req.body.usuario_ouvidor = staticData[index].usuario_ouvidor }

        let errors = attributeChecker(req)

        if (Object.keys(errors).length === 0) {

            staticData[index] = {
                _id: staticData[index]._id,
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                telefone_fixo: req.body.telefone_fixo,
                usuario_ouvidor: req.body.usuario_ouvidor
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

app.delete('/usuarios/:_id', (req, res) => {

    let functionReturn = Params.checkerId(req)
    if (functionReturn.status != 0) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    } else {
        res.status(200).json({
            mensagem: messagestorage.getMessage('delSuccess')
        });
        staticData.splice(functionReturn.index)
    }
});

app.listen(port);