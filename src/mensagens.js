  let message;

  function manipulacaoDeMsg(codMsg, campo = null, minLen = null, maxLen = null) {
      switch (codMsg) {
          case 'invalidId':
              message = 'id inválido'
              break;
          case 'notFoundId':
              message = 'id não encontrado'
              break;
          case 'requiredField':
              message = `o campo '${campo}' é obrigatório`;
              break;
          case 'isInt':
              message = `o campo '${campo}' deve ser um número inteiro`
              break;
          case 'higherThanZero':
              message = `o campo '${campo}' deve ser maior ou igual a 0`
              break;
          case 'positiveNumber':
              message = `o campo '${campo}' deve ser um número positivo`
              break;
          case 'lengthMoreThan':
              message = `o campo '${campo}' deve conter ao menos ${minLen} dígitos`
              break;
          case 'lengthLessThan':
              message = `o campo '${campo}' deve conter no máximo ${maxLen} dígitos`
              break;
          case 'onlyLetters':
              message = `o campo '${campo}' deve conter apenas letras`
              break;
          case 'isNumber':
              message = `o campo '${campo}' deve ser um número`
              break;
          case 'isBoolean':
              message = `o campo '${campo}' deve ser 'true' ou 'false'`
              break;
          case 'putSuccess':
              message = 'alteração realizada com sucesso'
          default:
              "erro nao definido"
      }
      return message;
  }
  module.exports = manipulacaoDeMsg