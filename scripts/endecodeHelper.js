let { decodeConstructorArgs, encodeConstructorArgs } = require('./index.js');

const ENCODE = true;

/**
 * ENCODE
 */

let inputs = [
  {
    'name': 'addresses',
    'type': 'address[]',
    'data': ['0xffffffffffffffffffffffffffffffffffffffff', '0xF1E48f13768bD8114A530070b43257a63f24bb12']
  },
  {
    'name': 'bytes32s',
    'type': 'bytes32[]',
    'data': ['0xffffffffffffffffffffffffffffffffffffffff', '0xF1E48f13768bD8114A530070b43257a63f24bb12', '0xcccccccccccccccccccccccccccccccccccccccc']
  },
  {
    'name': 'bytes4s',
    'type': 'bytes4[]',
    'data': ['0xff', '0xF1E48f13']
  },
  {
    'name': 'strings',
    'type': 'string[]',
    'data': ['0xaa', '0xbb', '0xcc', '0xdd']
  }
  {
    'name': 'bytes',
    'type': 'bytes',
    'data': ['0xaa', '0xbb', '0xcc', '0xdd']
  }
];

if (ENCODE) {
  const result = encodeConstructorArgs(inputs);
  console.log('encodeConstructorArgs result', result);
  const words = splitWords256(result);
  console.log('words', words);
}

function splitWords256(bytecode) {
  let words = [];
  for(let i = 0; i < bytecode.length / 64; i++) {
    words.push(bytecode.substring(64 * i, 64 * (i + 1)));
  }
  return words;
}

/**
 * DECODE
 */

let BsktTokenABIMock = {
  'abi': [
    {
      'inputs': [
        {
          'name': 'addresses',
          'type': 'address[]'
        },
        {
          'name': 'quantities',
          'type': 'uint256[]'
        },
        {
          'name': '_creationUnit',
          'type': 'uint256'
        },
        {
          'name': '_name',
          'type': 'string'
        },
        {
          'name': '_symbol',
          'type': 'string'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    }
  ]
};

let abiMock = {
  'abi': [
    {
      'anonymous': false,
      'inputs': inputs,
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    }
  ]
};
let bytecodeMock = '00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ffffffffffffffffffffffffffffffffffffffff000000000000000000000000f1e48f13768bd8114a530070b43257a63f24bb1200000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000012457468657265756d31302051322d32303138000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034531300000000000000000000000000000000000000000000000000000000000';

if (!ENCODE) {
  let result = decodeConstructorArgs(abiMock.abi, bytecodeMock);
  console.log('decodeConstructorArgs result', result);
}
