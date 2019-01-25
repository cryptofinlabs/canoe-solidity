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

/**
 * Decodes constructor args.
 *
 * @param {Object} contractABI - ABI of contract whose args to decode
 * @param {string} bytecode - Constructor args bytecode
 * @returns {Object} decodedArgs - Object representing decoded args with name, type, and data fields
 */
function decodeConstructorArgs(contractABI, bytecode) {
  const constructor = _.findWhere(contractABI, { 'type': 'constructor'});
  const inputNames = _.pluck(constructor.inputs, 'name');
  const inputTypes = _.pluck(constructor.inputs, 'type');
  let decoded = abi.rawDecode(inputTypes, new Buffer(bytecode, 'hex'));
  let decodedArgs = _.map(decoded, function(e, i) {
    const data = formatSingle(inputTypes[i], e);
    return { 'name': inputNames[i], 'type': inputTypes[i], 'data': data };
  });
  return decodedArgs;
}

/**
 * Generates constructor args bytecode based on input data.
 *
 * @param {Object[]} inputs - Array of objects with name, and type fields
 * @param {string} inputs[].name - Name of argument
 * @param {string} inputs[].type - Type of argument
 * @returns {string} bytecode - Constructor args bytecode
 */
function encodeConstructorArgs(inputs) {
  const inputTypes = _.pluck(inputs, 'type')
  const args = _.pluck(inputs, 'data')
  const encoded = abi.rawEncode(inputTypes, args);
  const bytecode = encoded.toString('hex');
  return bytecode;
}

/**
 * Decodes function args.
 *
 * @param {Object} contractABI - ABI of contract whose args to decode
 * @param {string} bytecode - full call args bytecode
 * @returns {Object} decodedArgs - Object representing decoded args with name, type, and data fields
 */
function decodeFunctionArgs(contractABI, bytecode) {
  const argsBuffer = new Buffer(bytecode, 'hex');
  const methodID = argsBuffer.slice(0, 4);
  const argsData = argsBuffer.slice(4);
  const func = _.find(contractABI,  function(o) {
    if (o.type === 'function') {
      const inputTypes = _.pluck(o.inputs, 'type');
      return methodID.compare(abi.methodID(o.name, inputTypes)) === 0;
    }
    return false;
  });
  
  if (!func) {
    return null;
  }

  const inputNames = _.pluck(func.inputs, 'name');
  const inputTypes = _.pluck(func.inputs, 'type');
  let decoded = abi.rawDecode(inputTypes, argsData);
  let decodedArgs = _.map(decoded, function(e, i) {
    const data = formatSingle(inputTypes[i], e);
    return { 'name': inputNames[i], 'type': inputTypes[i], 'data': data };
  });
  return decodedArgs;
}

module.exports = {
  decodeConstructorArgs: decodeConstructorArgs,
  encodeConstructorArgs: encodeConstructorArgs,
  decodeFunctionArgs: decodeFunctionArgs
};
