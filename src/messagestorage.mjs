export default class {
    static getMessage(codMsg, campo = null, minLen = null, maxLen = null) {

        let message;

        switch (codMsg) {
            case 'invalidId':
                message = 'id inválido'
                break;
            case 'notFoundId':
                message = 'id não encontrado'
                break;
            case 'requiredField':
                message = `o atributo '${campo}' é obrigatório`;
                break;
            case 'isInt':
                message = `o atributo '${campo}' deve ser um número inteiro`
                break;
            case 'higherThanZero':
                message = `o atributo '${campo}' deve ser maior ou igual a 0`
                break;
            case 'positiveNumber':
                message = `o atributo '${campo}' deve ser um número positivo`
                break;
            case 'lengthMoreThan':
                message = `o atributo '${campo}' deve conter ao menos ${minLen} dígitos`
                break;
            case 'lengthLessThan':
                message = `o atributo '${campo}' deve conter no máximo ${maxLen} dígitos`
                break;
            case 'onlyLetters':
                message = `o atributo '${campo}' deve conter apenas letras`
                break;
            case 'isNumber':
                message = `o atributo '${campo}' deve ser um número`
                break;
            case 'isBoolean':
                message = `o atributo '${campo}' deve ser 'true' ou 'false'`
                break;
            case 'invalidEmail':
                message = 'e-mail inválido'
                break;
            case 'onlyNumbers':
                message = 'telefone deve conter apenas números'
                break;
            case 'alterationSuccess':
                message = 'alteração realizada com sucesso'
                break;
            case 'postSuccess':
                message = 'inclusão realizada com sucesso'
                break;
            case 'delSuccess':
                message = 'exclusão realizada com sucesso'
                break;
            default:
                "erro nao definido"
        }
        return message;
    }
}