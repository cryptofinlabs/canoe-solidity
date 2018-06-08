# Canoe Solidity
Lightweight Javascript library for decoding constructor arguments.

## Summary
Canoe works by reading a contract's ABI and decoding the constructor bytecode with the argument types provided.

## Usage

    const { decodeConstructorArgs } = require('canoe-solidity');
    let abiExample = {
      'abi': [
        {
          'anonymous': false,
          'inputs': [
            {
              'name': 'addresses',
              'type': 'address[]',
            },
            {
              'name': 'quantities',
              'type': 'uint256[]',
            },
            {
              'name': '_creationUnit',
              'type': 'uint256',
            },
            {
              'name': '_name',
              'type': 'string',
            },
            {
              'name': '_symbol',
              'type': 'string',
            }
          ],
          'payable': false,
          'stateMutability': 'nonpayable',
          'type': 'constructor'
        }
      ];
    };
    let bytecodeExample = '00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ffffffffffffffffffffffffffffffffffffffff000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb1200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000012457468657265756d31302051322d32303138000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034531300000000000000000000000000000000000000000000000000000000000';
    decodeConstructorArgs(abiExample.abi, bytecodeExample);

Output:

    [
      {
        "name": "addresses",
        "type": "address[]",
        "value": [
          "ffffffffffffffffffffffffffffffffffffffff",
          "f1e48f13768bd8114a530070b43257a63f24bb12"
        ]
      },
      {
        "name": "quantities",
        "type": "uint256[]",
        "value": [
          "5",
          "10"
        ]
      },
      {
        "name": "_creationUnit",
        "type": "uint256",
        "value": "10000000000000000000"
      },
      {
        "name": "_name",
        "type": "string",
        "value": "Ethereum10 Q2-2018"
      },
      {
        "name": "_symbol",
        "type": "string",
        "value": "E10"
      }
    ]

## Requirements
- ABI schema 2.0

## Documentation
Supported Types:
- [x] bool
- [x] uint
- [x] int
- [] fixed
- [x] address
- [x] arrays
- [x] bytes1, bytes2, bytes3, ..., bytes32
- [x] byte
- [x] string
- [] mapping
- [] struct
