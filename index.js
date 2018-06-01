let utils = require('ethereumjs-util');
let abi = require('ethereumjs-abi');
let _ = require('underscore');

function isArray (type) {
  return type.lastIndexOf(']') === type.length - 1;
}

function decoder(contractABI, bytecode) {
  // TODO: handle bytes
  try {
    const constructor = _.findWhere(contractABI, { 'type': 'constructor'});
    const inputNames = _.pluck(constructor.inputs, 'name');
    const inputTypes = _.pluck(constructor.inputs, 'type');
    let decoded = abi.rawDecode(inputTypes, new Buffer(bytecode, 'hex'));
    let decodedArgs = _.map(decoded, function(e, i) {
      let value = e.toString();
      if (isArray(inputTypes[i])) {
        value = value.split(',');
        // TODO: handle each array appropriately
      }
      return { 'name': inputNames[i], 'type': inputTypes[i], 'value': value };
    });
    return decodedArgs;
  } catch (e) {
    console.log(e);
  }
}

function encoder(inputs) {
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
  decoder: decoder,
  encoder: encoder
}
