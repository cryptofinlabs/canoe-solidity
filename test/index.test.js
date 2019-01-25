const chai = require('chai');
const assert = chai.assert;
const { encodeConstructorArgs, decodeConstructorArgs, decodeFunctionArgs } = require('../index.js');


describe('single values', function() {

  it('should correctly decode bool', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bool',
              'type': 'bool',
              //'data': true
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000000000001';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bool',
        'type': 'bool',
        'data': 'true'
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
              //'data': 31419526535
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000750bfed87';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'uint256',
        'type': 'uint256',
        'data': '31419526535'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode int256', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'int256',
              'type': 'int256',
              //'data': -14
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'int256',
        'type': 'int256',
        'data': '-14'
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
              //'data': '0xF1E48f13768bD8114A530070b43257a63f24bb12'
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb12';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'address',
        'type': 'address',
        'data': 'f1e48f13768bd8114a530070b43257a63f24bb12'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode bytes16', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bytes16',
              'type': 'bytes16',
              //'data': '0xaaaabbbbccccdddd'
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = 'aaaabbbbccccdddd000000000000000000000000000000000000000000000000';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bytes16',
        'type': 'bytes16',
        'data': 'aaaabbbbccccdddd0000000000000000'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });


  it('should correctly decode string', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'string',
              'type': 'string',
              //'data': 'Bskt is the best!'
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001142736b7420697320746865206265737421000000000000000000000000000000';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'string',
        'type': 'string',
        'data': 'Bskt is the best!'
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });


});

describe('arrays', function() {

  it('should correctly decode uint256 array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'uint256s',
              'type': 'uint256[]',
              //'data': [1, 3, 5, 9, 99]
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000090000000000000000000000000000000000000000000000000000000000000063';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'uint256s',
        'type': 'uint256[]',
        'data': ['1', '3', '5', '9', '99']
      }
    ];
    assert.deepEqual(result, expected, 'result should match expected');
  });

  it('should correctly decode address array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'addresses',
              'type': 'address[]',
              //'data': ['0xF1E48f13768bD8114A530070b43257a63f24bb12', '0x0', '0x2']
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb1200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'addresses',
        'type': 'address[]',
        'data': [
          'f1e48f13768bd8114a530070b43257a63f24bb12',
          '0000000000000000000000000000000000000000',
          '0000000000000000000000000000000000000002']
      }
    ];
    assert.deepEqual(result, expected, 'output should match expected');
  });

  it('should correctly decode bytes32 array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bytes32s',
              'type': 'bytes32[]',
              //'data': [
                //'0xffffffffffffffffffffffffffffffffffffffff',
                //'0xF1E48f13768bD8114A530070b43257a63f24bb12',
                //'0xcccccccccccccccccccccccccccccccccccccccc'
              //]
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003ffffffffffffffffffffffffffffffffffffffff000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb12000000000000000000000000cccccccccccccccccccccccccccccccccccccccc000000000000000000000000';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bytes32s',
        'type': 'bytes32[]',
        'data': [
          'ffffffffffffffffffffffffffffffffffffffff000000000000000000000000',
          'f1e48f13768bd8114a530070b43257a63f24bb12000000000000000000000000',
          'cccccccccccccccccccccccccccccccccccccccc000000000000000000000000'
        ]
      },
    ];
    assert.deepEqual(result, expected, 'result should match expected');
  });

  it('should correctly decode bytes4 array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bytes4s',
              'type': 'bytes4[]',
              //'data': [
                //'0xff',
                //'0xF1E48f13'
              //]
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002ff00000000000000000000000000000000000000000000000000000000000000f1e48f1300000000000000000000000000000000000000000000000000000000';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bytes4s',
        'type': 'bytes4[]',
        'data': [
          'ff000000',
          'f1e48f13'
        ]
      },
    ];
    assert.deepEqual(result, expected, 'result should match expected');
  });

  it('should correctly decode bytes array', function() {
    const contractABI = {
      'abi': [
        {
          'inputs': [
            {
              'name': 'bytes',
              'type': 'bytes',
              //'data': [
                //'0xaa',
                //'0xbb',
                //'0xcc',
                //'0xdd'
              //]
            },
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        },
      ]
    };
    const bytecode = '00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004aabbccdd00000000000000000000000000000000000000000000000000000000';
    const result = decodeConstructorArgs(contractABI.abi, bytecode);
    const expected = [
      {
        'name': 'bytes',
        'type': 'bytes',
        'data': 'aabbccdd'
      },
    ];
    assert.deepEqual(result, expected, 'result should match expected');
  });


});

describe('real world contracts', function() {

  it('should correctly decode MintableNFT', function() {
    const abi = require('../data/abis/MintableNFT.json');
    const bytecode = require('../data/bytecodes/MintableNFT.json')['constructor-bytecode'];
    const expected = [
      { name: '_name', type: 'string', data: 'ExperimentalNFT' },
      { name: '_symbol', type: 'string', data: 'e11nft' },
      { name: '_bytesMask', type: 'uint8', data: '12' }
    ];
    const result = decodeConstructorArgs(abi, bytecode);
    assert.deepEqual(result, expected, 'result should match expected')
  });

  it('should correctly decode EnclavesDEXProxy', function() {
    const abi = require('../data/abis/EnclavesDEXProxy.json');
    const bytecode = require('../data/bytecodes/EnclavesDEXProxy.json')['constructor-bytecode'];
    const expected = [
      {
        'name': '_storageAddress',
        'type': 'address',
        'data': '129caf12c70fe9633fe24b15497adafc913c842c'
      },
      {
        'name': '_implementation',
        'type': 'address',
        'data': 'ed06d46ffb309128c4458a270c99c824dc127f5d'
      },
      {
        'name': '_admin',
        'type': 'address',
        'data': 'e03793e63776cf69fe42414ed03bb924d4d9157e'
      },
      {
        'name': '_feeAccount',
        'type': 'address',
        'data': 'e03793e63776cf69fe42414ed03bb924d4d9157e'
      },
      {
        'name': '_feeTake',
        'type': 'uint256',
        'data': '2000000000000000'
      },
      {
        'name': '_feeAmountThreshold',
        'type': 'uint256',
        'data': '100000000000000000'
      },
      {
        'name': '_etherDelta',
        'type': 'address',
        'data': '8d12a197cb00d4747a1fe03395095ce2a5cc6819'
      },
      {
        'name': '_tradeABIHash',
        'type': 'bytes32',
        'data': '57d54158692b43b05f55462695c3dc04b0217afddfda3f27a07ec31ee46b9c20'
      },
      {
        'name': '_withdrawABIHash',
        'type': 'bytes32',
        'data': '369521fb20e3cff93d515dad43dc9f9f23dfdbb8d0ca564c480634d401bf9aa1'
      }
    ];
    const result = decodeConstructorArgs(abi, bytecode);
    assert.deepEqual(result, expected, 'result should match expected')
  });

});

describe('decode function', function() {

  it('should correctly decode erc20 transfer', function() {
    const contractABI = {
      'abi': [
        {
          "constant": true,
          "inputs": [

          ],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "spender",
              "type": "address"
            },
            {
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "totalSupply",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "from",
              "type": "address"
            },
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "spender",
              "type": "address"
            },
            {
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "name": "success",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [

          ],
          "name": "unpause",
          "outputs": [

          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [

          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "paused",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [

          ],
          "name": "pause",
          "outputs": [

          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "owner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "isOwner",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [

          ],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "spender",
              "type": "address"
            },
            {
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "name": "success",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [

          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "name": "initialSupply",
              "type": "uint256"
            },
            {
              "name": "tokenName",
              "type": "string"
            },
            {
              "name": "decimalUnits",
              "type": "uint256"
            },
            {
              "name": "tokenSymbol",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [

          ],
          "name": "Paused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [

          ],
          "name": "Unpaused",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        }
      ]
    };
    const argsData = 'a9059cbb000000000000000000000000b5dc69f37dc69f559b6931defefca2e67ab7645500000000000000000000000000000000000000000000152d02c7e14af6800000';
    const result = decodeFunctionArgs(contractABI.abi, argsData);
    const expected = [
      {
        'name': 'to',
        'type': 'address',
        'data': 'b5dc69f37dc69f559b6931defefca2e67ab76455'
      },
      {
        'name': 'value',
        'type': 'uint256',
        'data': '100000000000000000000000'
      }
    ];
    assert.deepEqual(result, expected, 'result should match expected');
  });  
})