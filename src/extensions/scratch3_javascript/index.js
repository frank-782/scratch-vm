const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');


/**
 * Class for the Javasript blocks.
 * @constructor
 */
class Scratch3JavaScriptBlocks {
    constructor (runtime) {
        /**
         * Store this for later communication with the Scratch VM runtime.
         * If this extension is running in a sandbox then `runtime` is an async proxy object.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'javascript',
            name: 'JavaScript',
            color1: '#FF8C1A',
            color2: '#FF8C1A',
            blocks: [
                {
                    opcode: 'runjs',
                    blockType: BlockType.COMMAND,
                    text: '运行JavaSrcipt [JS]',
                    arguments: {
                        JS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'alert(\'你好世界\')'
                        }
                    }
                },
                {
                    opcode: 'alert',
                    blockType: BlockType.COMMAND,
                    text: 'alert [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '你好世界'
                        }
                    }
                },
                {
                    opcode: 'confirm',
                    blockType: BlockType.COMMAND,
                    text: 'confirm [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '确认执行此操作？'
                        }
                    }
                },
                {
                    opcode: 'getconfirm',
                    blockType: BlockType.BOOLEAN,
                    text: 'confirm: result'
                },
                {
                    opcode: 'prompt',
                    blockType: BlockType.COMMAND,
                    text: 'prompt [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '你叫什么名字？'
                        }
                    }
                },
                {
                    opcode: 'getprompt',
                    blockType: BlockType.REPORTER,
                    text: 'prompt: result'
                },
                {
                    opcode: 'GetJSreturn',
                    blockType: BlockType.REPORTER,
                    text: 'js执行返回结果'
                },
                {
                    opcode: 'userAgent',
                    blockType: BlockType.REPORTER,
                    text: 'userAgent'
                }
            ]
        };
    }
    runjs (args) {
        this._JSreturn = eval(args.JS);
    }
    alert (args){
        alert(args.TEXT);
    }
    confirm (args){
        this._confirm = confirm(args.TEXT);
    }
    getconfirm (){
        return this._confirm;
    }
    prompt (args){
        // eslint-disable-next-line no-alert
        this._prompt = prompt(args.TEXT);
    }
    getprompt (){
        return this._prompt;
    }

    userAgent (){
        return navigator.userAgent.toString();
    }

    GetJSreturn (){
        return this._JSreturn;
    }
}


module.exports = Scratch3JavaScriptBlocks;
