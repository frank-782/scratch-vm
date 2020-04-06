/* eslint-disable */
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */

const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEyOCAxMjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTEwNy4xLDU2LjVoLTYuOVYzNy44YzAtNS00LjQtOS40LTkuNC05LjRINzIuMXYtNy41QzcxLjUsMTQsNjUuOSw5LDU5LjYsOQoJCWMtNi45LDAtMTEuOSw1LTExLjksMTEuOXY2LjlIMjljLTUuNiwwLTEwLDQuNC0xMCwxMHYxOC4xaDYuOUMzMi44LDU1LjksMzksNjEuNSwzOSw2OWMwLDYuOS01LjYsMTMuMS0xMy4xLDEzLjFIMTl2MTguMQoJCWMwLDQuNCw0LjQsOC44LDkuNCw4LjhoMTguMXYtNi45YzAtNi45LDUuNi0xMy4xLDEzLjEtMTMuMWM2LjksMCwxMy4xLDUuNiwxMy4xLDEzLjF2Ni45aDE4LjFjNSwwLDkuNC00LjQsOS40LTkuNFY4MC45aDYuOQoJCWM2LjksMCwxMS45LTUsMTEuOS0xMS45QzExOSw2MS41LDExNCw1Ni41LDEwNy4xLDU2LjVMMTA3LjEsNTYuNXoiLz4KPC9nPgo8L3N2Zz4K';
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDE4IDE4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxOCAxODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMxMjk2REI7IiBkPSJNMTYuMSw3LjZIMTV2LTNjMC0wLjgtMC43LTEuNS0xLjUtMS41aC0zVjEuOWMtMC4xLTEuMS0xLTEuOS0yLTEuOUM3LjQsMCw2LjYsMC44LDYuNiwxLjlWM2gtMwoJCUMyLjcsMywyLDMuNywyLDQuNnYyLjloMS4xYzEuMSwwLDIuMSwwLjksMi4xLDIuMWMwLDEuMS0wLjksMi4xLTIuMSwyLjFIMnYyLjlDMiwxNS4zLDIuNywxNiwzLjUsMTZoMi45di0xLjEKCQljMC0xLjEsMC45LTIuMSwyLjEtMi4xYzEuMSwwLDIuMSwwLjksMi4xLDIuMVYxNmgyLjljMC44LDAsMS41LTAuNywxLjUtMS41di0zaDEuMWMxLjEsMCwxLjktMC44LDEuOS0xLjkKCQlDMTgsOC40LDE3LjIsNy42LDE2LjEsNy42TDE2LjEsNy42eiIvPgo8L2c+Cjwvc3ZnPgo=';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3PuzzleBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'puzzle',
            name: 'Puzzle',
            blockIconURI: blockIconURI,
            menuIconURI: menuIconURI,
            blocks: [{
                opcode: 'convertPaintToWatermark',
                blockType: BlockType.COMMAND,
                text: '将画板保存为水印'
            },
            {
                opcode: 'showWatermark',
                blockType: BlockType.COMMAND,
                text: '显示水印'
            },
            {
                opcode: 'hideWatermark',
                blockType: BlockType.COMMAND,
                text: '隐藏水印'
            },
            {
                opcode: 'isPaintSameAsWatermark',
                blockType: BlockType.BOOLEAN,
                text: '画板与水印是否相同'
            },
            {
                opcode: 'attemptCount',
                blockType: BlockType.REPORTER,
                text: '重置次数'
            },
            {
                opcode: 'stepInterval',
                blockType: BlockType.REPORTER,
                text: '动作间隔'
            },
            {
                opcode: 'setResolved',
                blockType: BlockType.COMMAND,
                text: '将任务设定为已完成'
            },
            {
                opcode: 'setSpriteTracker',
                blockType: BlockType.COMMAND,
                text: '设置角色追踪器 [TRACKER]',
                arguments: {
                    TRACKER: {
                        type: ArgumentType.STRING,
                        defaultValue: ''
                    }
                }
            }
            ]
        };
    }

    convertPaintToWatermark (args, util) {
        if (this.runtime.penSkinId == undefined) return;

        const penSkin = this.runtime.renderer._allSkins[this.runtime.penSkinId];
        const watermarkSkin = this.runtime.renderer._allSkins[this.runtime.watermarkSkinId];

        penSkin.updateSilhouette();

        const size = penSkin.size;
        const w = size[0];
        const h = size[1];
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = w;
        tempCanvas.height = h;

        this.testScratch = tempCanvas.getContext('2d');
        this.testScratch.drawImage(penSkin._canvas, 0, 0);

        const canvasData = this.testScratch.getImageData(0, 0, w, h);
        for (let x = 0; x < canvasData.width; x++) {
            for (let y = 0; y < canvasData.height; y++) {
                // Index of the pixel in the array
                const idx = (x + y * canvasData.width) * 4;
                const r = canvasData.data[idx + 0];
                const g = canvasData.data[idx + 1];
                const b = canvasData.data[idx + 2];
                // calculate gray scale value
                const gray = 255 - ((255 - (.299 * r + .587 * g + .114 * b)) * 0.4);
                // assign gray scale value
                canvasData.data[idx + 0] = gray; // Red channel
                canvasData.data[idx + 1] = gray; // Green channel
                canvasData.data[idx + 2] = gray; // Blue channel
                // canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }

        penSkin.clear();
        watermarkSkin.clear();
        watermarkSkin._canvas.getContext('2d').putImageData(canvasData, 0, 0);
        watermarkSkin._canvasDirty = true;
    }

    _setWatermarkVisible (visible) {
        if (this.runtime.penSkinId == undefined) return;
        if (this.runtime.renderer) {
            this.runtime.renderer.updateDrawableProperties(this.runtime.watermarkDrawableId, {
                visible: visible
            });
            this.runtime.requestRedraw();
        }
    }

    showWatermark (args, util) {
        this._setWatermarkVisible(true);
    }

    hideWatermark (args, util) {
        this._setWatermarkVisible(false);
    }

    isPaintSameAsWatermark (args, util) {
        if (this.runtime.penSkinId == undefined || !this.testScratch) return false;

        const penSkin = this.runtime.renderer._allSkins[this.runtime.penSkinId];
        const watermarkSkin = this.runtime.renderer._allSkins[this.runtime.watermarkSkinId];

        penSkin.updateSilhouette();

        const size = penSkin.size;
        const w = size[0];
        const h = size[1];

        const data1 = this.testScratch.getImageData(0, 0, w, h).data;
        const data2 = penSkin._canvas.getContext('2d').getImageData(0, 0, w, h).data;
        let count = 0;
        for (let i = 0; i < data1.length; i++) {
            if (i % 4 == 3 && data1[i] != data2[i] && !(data1[i] > 0 && data2[i] > 0)) {
                count++;
            }
        }
        return (count == 0);
    }

    attemptCount (args, util) {
        return this.runtime.puzzle.attemptCount || 0;
    }

    stepInterval (args, util) {
        return this.runtime.puzzle.stepInterval / 1000;
    }

    setResolved (args, util) {
        return;
    }

    setSpriteTracker (args, util) {
        util.target._spriteTracker = args.TRACKER;
    }
}

module.exports = Scratch3PuzzleBlocks;
