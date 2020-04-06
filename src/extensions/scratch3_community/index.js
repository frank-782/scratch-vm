/* eslint-disable no-alert,no-useless-escape */
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItMjMzIDM1Ni45IDEyOC4zIDEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjMzIDM1Ni45IDEyOC4zIDEyODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzdGM0Y5ODt9DQo8L3N0eWxlPg0KPHBhdGggY2xhc3M9InN0MCIgZD0iTS0xNDQuOCw0MjQuMWMtMiwwLTMuOCwwLjgtNS4yLDEuOWwtMTkuNi0xMS4xYzAuNC0xLjQsMC42LTIuOCwwLjYtNC4yYzAtMS4yLTAuMS0yLjMtMC41LTMuNWwxMy43LTYuOA0KCWMxLjQsMS40LDMuNSwyLjMsNS42LDIuM2M0LjUsMCw4LjEtMy42LDguMS04LjFjMC00LjUtMy42LTguMS04LjEtOC4xcy04LjEsMy42LTguMSw4LjF2MWwtMTMuNyw2LjhjLTIuNC0zLjEtNi4zLTUuMS0xMC42LTUuMQ0KCWMtNy40LDAtMTMuNCw2LTEzLjQsMTMuNGMwLDUuOCwzLjYsMTAuNiw4LjYsMTIuNWwtMS44LDExLjZjLTMuOCwwLjYtNi43LDQtNi43LDcuOWMwLDQuNSwzLjYsOC4xLDguMSw4LjFzOC4xLTMuNiw4LjEtOC4xDQoJYzAtMy4xLTEuNy01LjYtNC4yLTdsMS45LTExLjhjMy44LTAuMSw3LjMtMS45LDkuNi00LjZsMTkuNiwxMS4xYy0wLjEsMC41LTAuMSwwLjktMC4xLDEuNGMwLDQuNSwzLjYsOC4xLDguMSw4LjENCgljNC41LDAsOC4xLTMuNiw4LjEtOC4xQy0xMzYuNyw0MjcuOC0xNDAuNSw0MjQuMS0xNDQuOCw0MjQuMXoiLz4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMTM2LjksMzY0LjdILTIwMWwtMzIsNTUuNmwzMi4xLDU1LjZoNjRsMzIuMS01NS42TC0xMzYuOSwzNjQuN3ogTS0xNDIuOCw0NjUuNmgtNTIuNGwtMjYuMS00NS4zbDI2LjEtNDUuMw0KCWg1Mi40bDI2LjEsNDUuM0MtMTE2LjYsNDIwLjMtMTQyLjgsNDY1LjYtMTQyLjgsNDY1LjZ6Ii8+DQo8L3N2Zz4=';

/**
 * Host for the Pen-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3CommunityBlocks {
    constructor (runtime) {

        this.lastPayTime = 0;
        this._error = '';

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
            id: 'community',
            name: 'Community',
            blockIconURI: blockIconURI,
            blocks: [{
                opcode: 'getUserInfo',
                blockType: BlockType.REPORTER,
                text: '[USER_ATTR]',
                arguments: {
                    USER_ATTR: {
                        type: ArgumentType.STRING,
                        menu: 'USER_ATTR',
                        defaultValue: 'user level'
                    }
                }
            },
            {
                opcode: 'isFollower',
                blockType: BlockType.BOOLEAN,
                text: 'is follower?'
            },
            {
                opcode: 'isProjectLover',
                blockType: BlockType.BOOLEAN,
                text: 'love this project?'
            },
            {
                opcode: 'openUrl',
                blockType: BlockType.COMMAND,
                text: 'open [URL]',
                arguments: {
                    URL: {
                        type: ArgumentType.STRING,
                        defaultValue: 'http://mozhua.aerfaying.com'
                    }
                }
            },
            {
                opcode: 'redirectUrl',
                blockType: BlockType.COMMAND,
                text: 'redirect [URL]',
                arguments: {
                    URL: {
                        type: ArgumentType.STRING,
                        defaultValue: 'http://mozhua.aerfaying.com'
                    }
                }
            },
            {
                opcode: 'pay',
                blockType: BlockType.COMMAND,
                text: 'pay [AMOUNT] for [ITEM]',
                arguments: {
                    AMOUNT: {
                        type: ArgumentType.NUMBER,
                        defaultValue: '10'
                    },
                    ITEM: {
                        type: ArgumentType.STRING,
                        defaultValue: ''
                    }
                }
            },
            {
                opcode: 'getError',
                blockType: BlockType.REPORTER,
                text: 'error'
            }
            ],
            menus: {
                USER_ATTR: ['user id', 'username', 'user level']
            }
        };
    }

    getUserInfo (args, utli) {
        const loggedInUser = {
            id: 1,
            level: 60
        };
        if (!loggedInUser) return '';
        const attr = args.USER_ATTR;
        switch (attr) {
        case 'user id': return loggedInUser.id;
        case 'username': return this._getUsername(utli);
        case 'user level': return loggedInUser.level;
        default: return '';
        }
    }

    isFollower () {
        return true;
    }

    isProjectLover () {
        return true;
    }

    isValidUrl (url) {
        const regex = /^((https|http)?:\/\/(www\.aerfaying\.com|aerfaying\.com|mozhua\.aerfaying\.com)|(\/[^\/]))/;
        return regex.test(url.toLowerCase());
    }

    openUrl (args) {
        if (this.isValidUrl(args.URL)) {
            window.open(args.URL);
        } else {
            alert('该指令块只能用于打开魔抓社区的页面');
        }
    }

    redirectUrl (args) {
        if (this.isValidUrl(args.URL)) {
            // window.location = args.URL;
            window.open(args.URL);
        } else {
            alert('该指令块只能用于打开魔抓社区的页面');
        }
    }

    pay () {
        const self = this;
        self._error = '';
    }

    getError () {
        return this._error;
    }

    _getUsername (util) {
        return util.ioQuery('userData', 'getUsername');
    }

}

module.exports = Scratch3CommunityBlocks;
