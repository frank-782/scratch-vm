const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');

/**
 * Class for the FPS blocks.
 * @constructor
 */

class Scratch3FPSBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'fps',
            name: 'FPS',
            blocks: [
                {
                    opcode: 'isCompatibilityMode',
                    blockType: BlockType.BOOLEAN,
                    text: '是否为兼容模式？'
            
                },
                {
                    opcode: 'setCompatibilityMode',
                    blockType: BlockType.COMMAND,
                    text: '将兼容模式[MENU]',
                    arguments: {
                        MENU: {
                            type: ArgumentType.STRING,
                            menu: 'setCompatibilityMode_MENU',
                            defaultValue: 'on'
                        }
                    }
                },
                {
                    opcode: 'SET_FPS',
                    blockType: BlockType.COMMAND,
                    text: '设置运行速度为[FPS]帧',
                    arguments: {
                        FPS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 30
                        }
                    }
            
                }
            ],
            menus: {
                setCompatibilityMode_MENU: ['on', 'off']
            }
        };
    }
    isCompatibilityMode (){
        return Boolean(this.runtime.compatibilityMode);
    }
    setCompatibilityMode (args){
        if (args.MENU === 'off') {
            this.runtime.setCompatibilityMode(false);
        } else {
            this.runtime.setCompatibilityMode(true);
        }
    }

    SET_FPS (args) {
        if (args.FPS >= 1 && args.FPS <= 120){
            return this.runtime.setTPS(1000 / args.FPS);
        }
        // return this.runtime.setCompatibilityMode(false);
        log.info(`数字${args.FPS}不合法！`);
    }

}

module.exports = Scratch3FPSBlocks;
