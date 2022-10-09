import messagestorage from './messagestorage.mjs';
import * as EmailValidator from 'email-validator';

function attributeChecker(req) {

    let errors = {}

    if (!req.body.nome) {
        errors["nome"] = (messagestorage.getMessage('requiredField', 'nome'))
    } else if (!/^[a-zA-Z ^~-`´¨çÇ]+$/.test(req.body.nome)) {
        errors["nome"] = (messagestorage.getMessage('onlyLetters', 'nome'))
    } else if (req.body.nome.length <= 1) {
        errors["nome"] = (messagestorage.getMessage('lengthMoreThan', 'nome', 2))
    } else if (req.body.nome.length > 100) {
        errors["nome"] = (messagestorage.getMessage('lengthLessThan', 'nome', null, 100))
    }

    if (!req.body.email) {
        errors["email"] = (messagestorage.getMessage('requiredField', 'email'))
    } else if (req.body.email.length < 8) {
        errors["email"] = (messagestorage.getMessage('lengthMoreThan', 'email', 8))
    } else if (req.body.email.length > 40) {
        errors["email"] = (messagestorage.getMessage('lengthLessThan', 'email', null, 40))
    } else if (!EmailValidator.validate(req.body.email)) {
        errors["email"] = (messagestorage.getMessage('invalidEmail', 'email'))
    }

    if (!req.body.senha) {
        errors["senha"] = (messagestorage.getMessage('requiredField', 'senha'))
    } else if (req.body.senha.length < 8) {
        errors["senha"] = (messagestorage.getMessage('lengthMoreThan', 'senha', 8))
    } else if (req.body.senha.length > 40) {
        errors["senha"] = (messagestorage.getMessage('lengthLessThan', 'senha', null, 40))
    }

    if (!req.body.telefone_fixo) {
        errors["telefone_fixo"] = (messagestorage.getMessage('requiredField', 'telefone_fixo'))
    } else if (!/^[0-9]+$/.test(req.body.telefone_fixo)) {
        errors["telefone_fixo"] = (messagestorage.getMessage('onlyNumbers', 'telefone_fixo'))
    } else if (req.body.telefone_fixo < 0) {
        errors["telefone_fixo"] = (messagestorage.getMessage('positiveNumber', 'telefone_fixo'))
    } else if (req.body.telefone_fixo.length < 10) {
        errors["telefone_fixo"] = (messagestorage.getMessage('lengthMoreThan', 'telefone_fixo', 10))
    } else if (req.body.telefone_fixo.length > 11) {
        errors["telefone_fixo"] = (messagestorage.getMessage('lengthLessThan', 'telefone_fixo', null, 11))
    }

    if (req.body.usuario_ouvidor === "") {
        errors["usuario_ouvidor"] = (messagestorage.getMessage('requiredField', 'usuario_ouvidor'))
    } else if (typeof req.body.usuario_ouvidor != "boolean") {
        errors["usuario_ouvidor"] = (messagestorage.getMessage('isBoolean', 'usuario_ouvidor'))
    }
    return errors;
}
export default attributeChecker;