const chai = require('chai');  
const assert = chai.assert;
const { encoder, decoder } = require('../index.js');

/**Types:
 * bool
 * uint
 * int
 * fixed
 * address
 * bytes1, bytes2, bytes3, ..., bytes32
 * byte
 * string
 * mapping
 * struct*
 *
 * arrays
 **/

describe('single values', function() {

  it('should correctly decode bool', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bool',
              'type': 'bool',
              //'value': true
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000000000001';
    const result = decoder(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bool',
        'type': 'bool',
        'value': 'true'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode uint256', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'uint256',
              'type': 'uint256',
              //'value': 31419526535
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000750bfed87';
    const result = decoder(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'uint256',
        'type': 'uint256',
        'value': '31419526535'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode address', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'address',
              'type': 'address',
              //'value': '0xF1E48f13768bD8114A530070b43257a63f24bb12'
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb12';
    const result = decoder(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'address',
        'type': 'address',
        'value': 'f1e48f13768bd8114a530070b43257a63f24bb12'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

});

describe('arrays', function() {

  it('should correctly decode address array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'addresses',
              'type': 'address[]',
              //'value': ['0xF1E48f13768bD8114A530070b43257a63f24bb12', '0x0', '0x2']
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb1200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002';
    const result = decoder(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'addresses',
        'type': 'address[]',
        'value': ['f1e48f13768bd8114a530070b43257a63f24bb12', '0000000000000000000000000000000000000000', '0000000000000000000000000000000000000002']
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode uint256 array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'uint256s',
              'type': 'uint256[]',
              //'value': [1, 3, 5, 9, 99]
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000090000000000000000000000000000000000000000000000000000000000000063';
    const result = decoder(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'uint256s',
        'type': 'uint256[]',
        'value': ['1', '3', '5', '9', '99']
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

});
