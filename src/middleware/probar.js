function evalParamToAddProduct(objBody, { paths }) {
    let incorrectlyEnteredFields
    for (const item in paths) {
        let currentValue = objBody[item]
        if (!currentValue && paths[item].isRequired) {
            if (!incorrectlyEnteredFields) incorrectlyEnteredFields = {}
            incorrectlyEnteredFields[item] = `Key ${item.toUpperCase()} is REQUIRED but received field empty (${currentValue})`
        } else if (paths[item].path != '_id') {
            let requiredDataType = (paths[item].instance).toLowerCase()
            if (requiredDataType == 'array') requiredDataType = 'object'

            if (requiredDataType != typeof currentValue) {
                if (!incorrectlyEnteredFields) incorrectlyEnteredFields = {}
                incorrectlyEnteredFields[item] = `Key ${item.toUpperCase()} needs to datatype ${requiredDataType.toUpperCase()}, received value '${currentValue}' of type ${(typeof currentValue).toUpperCase()}`
            }
        }
    }
    return incorrectlyEnteredFields
}