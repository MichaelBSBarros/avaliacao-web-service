import messagestorage from './messagestorage.mjs';
import * as EmailValidator from 'email-validator';
import staticData from './data.mjs';

function attributeChecker(req, userId = -1) {

    let errors = {};

    let nomeLengthMin = 3;
    let nomeLengthMax = 105;

    let emailLengthMin = 10;
    let emailLengthMax = 32;

    let senhaLengthMin = 8;
    let senhaLengthMax = 100;

    let telFixoLengthMin = 10;
    let telFixoLengthMax = 11;

    if (!req.body.nome) {
        errors["nome"] = (messagestorage.getMessage('requiredField', 'nome'))
    } else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(req.body.nome)) {
        errors["nome"] = (messagestorage.getMessage('onlyLetters', 'nome'))
    } else if (req.body.nome.length < nomeLengthMin) {
        errors["nome"] = (messagestorage.getMessage('lengthMoreThan', 'nome', nomeLengthMin))
    } else if (req.body.nome.length > nomeLengthMax) {
        errors["nome"] = (messagestorage.getMessage('lengthLessThan', 'nome', null, nomeLengthMax))
    };

    let index = staticData.findIndex(v => v.email == req.body.email)

    console.log("index: " + index)
    console.log("userID: " + index)
    console.log("static user id: " + indstaticData[index]._id)

    if (userId != staticData[index]._id || index > -1) {
        errors["email"] = (messagestorage.getMessage('emailExist'))
    } else if (!req.body.email) {
        errors["email"] = (messagestorage.getMessage('requiredField', 'email'))
    } else if (req.body.email.length < emailLengthMin) {
        errors["email"] = (messagestorage.getMessage('lengthMoreThan', 'email', emailLengthMin))
    } else if (req.body.email.length > emailLengthMax) {
        errors["email"] = (messagestorage.getMessage('lengthLessThan', 'email', null, emailLengthMax))
    } else if (!EmailValidator.validate(req.body.email)) {
        errors["email"] = (messagestorage.getMessage('invalidEmail', 'email'))
    };

    if (!req.body.senha) {
        errors["senha"] = (messagestorage.getMessage('requiredField', 'senha'))
    } else if (req.body.senha.length < senhaLengthMin) {
        errors["senha"] = (messagestorage.getMessage('lengthMoreThan', 'senha', senhaLengthMin))
    } else if (req.body.senha.length > senhaLengthMax) {
        errors["senha"] = (messagestorage.getMessage('lengthLessThan', 'senha', null, senhaLengthMax))
    };

    if (!req.body.telefone_fixo) {
        errors["telefone_fixo"] = (messagestorage.getMessage('requiredField', 'telefone_fixo'))
    } else if (!/^[0-9]+$/.test(req.body.telefone_fixo)) {
        errors["telefone_fixo"] = (messagestorage.getMessage('onlyNumbers', 'telefone_fixo'))
    } else if (req.body.telefone_fixo < 0) {
        errors["telefone_fixo"] = (messagestorage.getMessage('positiveNumber', 'telefone_fixo'))
    } else if (req.body.telefone_fixo.length < telFixoLengthMin) {
        errors["telefone_fixo"] = (messagestorage.getMessage('lengthMoreThan', 'telefone_fixo', telFixoLengthMin))
    } else if (req.body.telefone_fixo.length > telFixoLengthMax) {
        errors["telefone_fixo"] = (messagestorage.getMessage('lengthLessThan', 'telefone_fixo', null, telFixoLengthMax))
    };

    if (req.body.usuario_ouvidor === "") {
        errors["usuario_ouvidor"] = (messagestorage.getMessage('requiredField', 'usuario_ouvidor'))
    } else if (typeof req.body.usuario_ouvidor != "boolean") {
        errors["usuario_ouvidor"] = (messagestorage.getMessage('isBoolean', 'usuario_ouvidor'))
    };
    return errors;
}
export default attributeChecker;