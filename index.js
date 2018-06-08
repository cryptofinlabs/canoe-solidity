let utils = require('ethereumjs-util');
let abi = require('ethereumjs-abi');
let _ = require('underscore');

function isArray(type) {
  return type.lastIndexOf(']') === type.length - 1;
}

function getElementType(type) {
  const i = type.lastIndexOf('[');
  return type.substring(0, i);
}

function formatSingle(type, data) {
  let decodedData;
  if (isArray(type)) {
    // TODO: handle each array appropriately
    const elementType = getElementType(type);
    decodedData = _.map(data, function(data) {
      return formatSingle(elementType, data);
    });
  } else if (type.includes('bytes')) {
    const dataBuffer = Buffer.from(data, 'utf8');
    decodedData = dataBuffer.toString('hex');
  } else {
    decodedData = data.toString();
  }
  return decodedData;
}

function decodeConstructorArgs(contractABI, bytecode) {
  try {
    const constructor = _.findWhere(contractABI, { 'type': 'constructor'});
    const inputNames = _.pluck(constructor.inputs, 'name');
    const inputTypes = _.pluck(constructor.inputs, 'type');
    let decoded = abi.rawDecode(inputTypes, new Buffer(bytecode, 'hex'));
    let decodedArgs = _.map(decoded, function(e, i) {
      const data = formatSingle(inputTypes[i], e);
      return { 'name': inputNames[i], 'type': inputTypes[i], 'value': data };
    });
    return decodedArgs;
  } catch (e) {
    console.log(e);
  }
}

function encodeConstructorArgs(inputs) {
  try {
    const inputTypes = _.pluck(inputs, 'type')
    const values = _.pluck(inputs, 'value')
    const encoded = abi.rawEncode(inputTypes, values);
    const bytecode = encoded.toString('hex');
    return bytecode;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  decodeConstructorArgs: decodeConstructorArgs,
  encodeConstructorArgs: encodeConstructorArgs
};
