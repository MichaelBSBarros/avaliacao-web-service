import messagestorage from './messagestorage.mjs';

function attributeChecker(req) {

    let errors = {}

    if (!req.body.attributeA) {
        errors["attributeA"] = (messagestorage.messagestorage.getMessage('requiredField', 'attributeA'))
    } else if (!/^[a-zA-Z]+$/.test(req.body.attributeA)) {
        errors["attributeA"] = (messagestorage.getMessage('onlyLetters', 'attributeA'))
    } else if (req.body.attributeA.length <= 1) {
        errors["attributeA"] = (messagestorage.getMessage('lengthMoreThan', 'attributeA', 2))
    } else if (req.body.attributeA.length > 100) {
        errors["attributeA"] = (messagestorage.getMessage('lengthLessThan', 'attributeA', null, 100))
    }

    if (!req.body.attributeB) {
        errors["attributeB"] = (messagestorage.getMessage('requiredField', 'attributeB'))
    } else if (req.body.attributeB.length < 8) {
        errors["attributeB"] = (messagestorage.getMessage('lengthMoreThan', 'attributeB', 8))
    } else if (req.body.attributeB.length > 40) {
        errors["attributeB"] = (messagestorage.getMessage('lengthLessThan', 'attributeB', null, 40))
    }

    if (!req.body.attributeC) {
        errors["attributeC"] = (messagestorage.getMessage('requiredField', 'attributeC'))
    } else if (isNaN(req.body.attributeC)) {
        errors["attributeC"] = (messagestorage.getMessage('isNumber', 'attributeC'))
    }

    if (!req.body.attributeD) {
        errors["attributeD"] = (messagestorage.getMessage('requiredField', 'attributeD'))
    } else if (isNaN(req.body.attributeD) || !Number.isInteger(req.body.attributeD)) {
        errors["attributeD"] = (messagestorage.getMessage('isInt', 'attributeD'))
    } else if (req.body.attributeD < 0) {
        errors["attributeD"] = (messagestorage.getMessage('positiveNumber', 'attributeD'))
    }

    if (req.body.attributeE === "") {
        errors["attributeE"] = (messagestorage.getMessage('requiredField', 'attributeE'))
    } else if (typeof req.body.attributeE != "boolean") {
        errors["attributeE"] = (messagestorage.getMessage('isBoolean', 'attributeE'))
    }
    return errors;
}
export default attributeChecker;