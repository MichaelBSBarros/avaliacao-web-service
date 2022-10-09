import express from "express";
import res from "express/lib/response.js"

import staticData from './data.mjs';
import { uuid } from 'uuidv4';
import senhahecker from './checker.mjs';
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

app.post('/api', (req, res) => {

    let errors = senhahecker(req)

    if (Object.keys(errors).length === 0) {

        staticData.push({
            _id: uuid(),
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone_fixo: req.body.telefone_fixo,
            usuario_ouvidor: req.body.usuario_ouvidor
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

    let functionReturn = Params.checkerId(req)
    if (functionReturn) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    }

    let errors = senhahecker(req)

    if (Object.keys(errors).length === 0) {

        staticData[index] = {
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

app.patch('/api/:_id', (req, res, next) => {

    let functionReturn = Params.checkerId(req)
    if (functionReturn) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    } else {

        if (!req.body.nome) { req.body.nome = staticData[index].nome }
        if (!req.body.email) { req.body.email = staticData[index].email }
        if (!req.body.senha) { req.body.senha = staticData[index].senha }
        if (!req.body.telefone_fixo) { req.body.telefone_fixo = staticData[index].telefone_fixo }
        if (!req.body.usuario_ouvidor) { req.body.usuario_ouvidor = staticData[index].usuario_ouvidor }

        let errors = senhahecker(req)

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

app.delete('/api/:_id', (req, res) => {

    let functionReturn = Params.checkerId(req)
    if (functionReturn) {
        res.status(functionReturn.status).json({
            erro: messagestorage.getMessage(functionReturn.msg)
        })
    } else {
        res.status(200).json({
            mensagem: messagestorage.getMessage('delSuccess')
        });
        staticData.splice(index)
    }
});

app.listen(port);