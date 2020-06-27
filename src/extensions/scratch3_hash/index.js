const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const CryptoJS = window.CryptoJS;

/**
 * Class for the Hash blocks.
 * @constructor
 */

class Scratch3HashBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'hash',
            name: 'Hash',
            blocks: [
                {
                    opcode: 'encode_sha1',
                    blockType: BlockType.REPORTER,
                    text: '将[TEXT]转换成sha1',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello sha1!'
                        }
                    }
                },
                {
                    opcode: 'encode_sha256',
                    blockType: BlockType.REPORTER,
                    text: '将[TEXT]转换成sha256',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello sha256!'
                        }
                    }
                },
                {
                    opcode: 'encode_md5',
                    blockType: BlockType.REPORTER,
                    text: '将[TEXT]转换成md5',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello md5!'
                        }
                    }
                }
            ]
        };
    }
    encode_sha1 (args){
        return CryptoJS.SHA1(args.TEXT.toString()).toString();
    }
    encode_sha256 (args){
        return CryptoJS.SHA256(args.TEXT.toString()).toString();
    }
    encode_md5 (args){
        return CryptoJS.MD5(args.TEXT.toString()).toString();
    }

}

module.exports = Scratch3HashBlocks;
