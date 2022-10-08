export default function attributeChecker(req) {

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