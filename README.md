# 🛶 Canoe Solidity 
Lightweight Javascript library for decoding constructor arguments.

## Summary
Canoe works by reading a contract's ABI and decoding the constructor bytecode with the argument types provided.

## Install

    npm install canoe-soldity

## Requirements
- ABI schema 2.0

## Documentation
### Functions

<dl>
<dt><a href="#decodeConstructorArgs">decodeConstructorArgs(contractABI, bytecode)</a> ⇒ <code>Object</code></dt>
<dd><p>Decodes constructor args.</p>
</dd>
<dt><a href="#encodeConstructorArgs">encodeConstructorArgs(inputs)</a> ⇒ <code>string</code></dt>
<dd><p>Generates constructor args bytecode based on input data.</p>
</dd>
</dl>

<a name="decodeConstructorArgs"></a>

### decodeConstructorArgs(contractABI, bytecode) ⇒ <code>Object</code>
Decodes constructor args.

**Kind**: global function  
**Returns**: <code>Object</code> - decodedArgs - Object representing decoded args with name, type, and data fields  

| Param | Type | Description |
| --- | --- | --- |
| contractABI | <code>Object</code> | ABI of contract whose args to decode |
| bytecode | <code>string</code> | Constructor args bytecode |

<a name="encodeConstructorArgs"></a>

### encodeConstructorArgs(inputs) ⇒ <code>string</code>
Generates constructor args bytecode based on input data.

**Kind**: global function  
**Returns**: <code>string</code> - bytecode - Constructor args bytecode  

| Param | Type | Description |
| --- | --- | --- |
| inputs | <code>Array.&lt;Object&gt;</code> | Array of objects with name, and type fields |
| inputs[].name | <code>string</code> | Name of argument |
| inputs[].type | <code>string</code> | Type of argument |


### Supported Types
- [x] bool
- [x] uint
- [x] int
- [ ] fixed
- [x] address
- [x] bytes1, bytes2, bytes3, ..., bytes32
- [x] byte
- [x] string
- [x] arrays
- [ ] multi-dimensional arrays
- [ ] mapping
- [ ] struct

## Example

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
        "data": [
          "ffffffffffffffffffffffffffffffffffffffff",
          "f1e48f13768bd8114a530070b43257a63f24bb12"
        ]
      },
      {
        "name": "quantities",
        "type": "uint256[]",
        "data": [
          "5",
          "10"
        ]
      },
      {
        "name": "_creationUnit",
        "type": "uint256",
        "data": "10000000000000000000"
      },
      {
        "name": "_name",
        "type": "string",
        "data": "Ethereum10 Q2-2018"
      },
      {
        "name": "_symbol",
        "type": "string",
        "data": "E10"
      }
    ]
