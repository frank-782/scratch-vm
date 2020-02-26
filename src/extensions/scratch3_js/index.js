const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const Variable = require('../../engine/variable');

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEyOCAxMjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwNy4xLDU2LjVoLTYuOVYzNy44YzAtNS00LjQtOS40LTkuNC05LjRINzIuMXYtNy41QzcxLjUsMTQsNjUuOSw5LDU5LjYsOWMtNi45LDAtMTEuOSw1LTExLjksMTEuOXY2LjlIMjkKCWMtNS42LDAtMTAsNC40LTEwLDEwdjE4LjFoNi45QzMyLjgsNTUuOSwzOSw2MS41LDM5LDY5YzAsNi45LTUuNiwxMy4xLTEzLjEsMTMuMUgxOXYxOC4xYzAsNC40LDQuNCw4LjgsOS40LDguOGgxOC4xdi02LjkKCWMwLTYuOSw1LjYtMTMuMSwxMy4xLTEzLjFjNi45LDAsMTMuMSw1LjYsMTMuMSwxMy4xdjYuOWgxOC4xYzUsMCw5LjQtNC40LDkuNC05LjRWODAuOWg2LjljNi45LDAsMTEuOS01LDExLjktMTEuOQoJQzExOSw2MS41LDExNCw1Ni41LDEwNy4xLDU2LjV6IE02NS43LDgyLjNoLTUuNWMtMTAuMiwwLTE0LjctNS4yLTE1LjEtNS43bDYuOC02LjZjMC4xLDAuMSwyLjQsMi42LDguMywyLjZoMS4zCgljMywwLDYuMi0wLjQsNi4yLTIuMWMwLTEuOS01LjItMi44LTcuNy0zLjFjLTMuMS0wLjQtNi4zLTAuOS05LjEtMi4yYy0xLjgtMC45LTMuMy0yLjEtNC4zLTMuNmMtMS4yLTEuNy0xLjgtMy43LTEuOC01LjkKCWMwLTcuMiw3LjMtMTEuOSwxNy45LTExLjloMS44YzYuMiwwLDExLjMsMi41LDE1LjQsNy4ybC02LjcsNi41Yy0yLjItMi43LTQuOS0zLjktOC41LTMuOWgtMC40Yy0xLjksMC02LjItMC40LTYuMiwyLjEKCWMwLDEuOCw0LjksMi42LDcuNCwyLjljMy4xLDAuNCw2LjUsMSw5LjIsMi4yYzEuOCwwLjksMy4zLDIuMSw0LjQsMy43YzEuMSwxLjcsMS44LDMuOCwxLjgsNi4xQzgwLjksODAuNSw2OS42LDgyLjMsNjUuNyw4Mi4zeiIvPgo8L3N2Zz4=';

/**
 * Url of icon to be displayed in the toolbox menu for the extension category.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDEyOCAxMjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyOCAxMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMTI5NmRiO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwNy4xLDU2LjVoLTYuOVYzNy44YzAtNS00LjQtOS40LTkuNC05LjRINzIuMXYtNy41QzcxLjUsMTQsNjUuOSw5LDU5LjYsOWMtNi45LDAtMTEuOSw1LTExLjksMTEuOXY2LjlIMjkKCWMtNS42LDAtMTAsNC40LTEwLDEwdjE4LjFoNi45QzMyLjgsNTUuOSwzOSw2MS41LDM5LDY5YzAsNi45LTUuNiwxMy4xLTEzLjEsMTMuMUgxOXYxOC4xYzAsNC40LDQuNCw4LjgsOS40LDguOGgxOC4xdi02LjkKCWMwLTYuOSw1LjYtMTMuMSwxMy4xLTEzLjFjNi45LDAsMTMuMSw1LjYsMTMuMSwxMy4xdjYuOWgxOC4xYzUsMCw5LjQtNC40LDkuNC05LjRWODAuOWg2LjljNi45LDAsMTEuOS01LDExLjktMTEuOQoJQzExOSw2MS41LDExNCw1Ni41LDEwNy4xLDU2LjV6IE02NS43LDgyLjNoLTUuNWMtMTAuMiwwLTE0LjctNS4yLTE1LjEtNS43bDYuOC02LjZjMC4xLDAuMSwyLjQsMi42LDguMywyLjZoMS4zCgljMywwLDYuMi0wLjQsNi4yLTIuMWMwLTEuOS01LjItMi44LTcuNy0zLjFjLTMuMS0wLjQtNi4zLTAuOS05LjEtMi4yYy0xLjgtMC45LTMuMy0yLjEtNC4zLTMuNmMtMS4yLTEuNy0xLjgtMy43LTEuOC01LjkKCWMwLTcuMiw3LjMtMTEuOSwxNy45LTExLjloMS44YzYuMiwwLDExLjMsMi41LDE1LjQsNy4ybC02LjcsNi41Yy0yLjItMi43LTQuOS0zLjktOC41LTMuOWgtMC40Yy0xLjksMC02LjItMC40LTYuMiwyLjEKCWMwLDEuOCw0LjksMi42LDcuNCwyLjljMy4xLDAuNCw2LjUsMSw5LjIsMi4yYzEuOCwwLjksMy4zLDIuMSw0LjQsMy43YzEuMSwxLjcsMS44LDMuOCwxLjgsNi4xQzgwLjksODAuNSw2OS42LDgyLjMsNjUuNyw4Mi4zeiIvPgo8L3N2Zz4='

/**
 * Class for the JS blocks.
 * @constructor
 */
class Scratch3JSBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }
    getInfo () {
        return {
            id: 'js',
            name: 'Javascript Extensions',
            blockIconURI: blockIconURL,
            menuIconURI: menuIconURI,
            blocks: [
                {
                    opcode: 'serializeToJson',
                    blockType: BlockType.REPORTER,
                    text: '将[PREFIX]开头的变量转换为JSON',
                    arguments: {
                        PREFIX: {
                            type: ArgumentType.STRING,
                            defaultValue: '.'
                        }
                    }
                },
                {
                    opcode: 'deserializeFromJson',
                    blockType: BlockType.COMMAND,
                    text: '将[PREFIX]开头的变量设为JSON[JSON]',
                    arguments: {
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: '{}'
                        },
                        PREFIX: {
                            type: ArgumentType.STRING,
                            defaultValue: '.'
                        }
                    }
                },
                {
                    opcode: 'callWorker',
                    blockType: BlockType.REPORTER,
                    text: 'callWorker([WORKER_ID],[MESSAGE])',
                    arguments: {
                        WORKER_ID: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        },
                        MESSAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '{}'
                        }
                    }
                }
            ]
        };
    }
    serializeToJson (args, vm) {
        const t = args.PREFIX.toString().trim();
        const n = {};
        const r = vm.target.variables;
        for (const i in r) {
            const o = r[i];
            // eslint-disable-next-line max-len,eqeqeq,no-mixed-operators,no-unused-expressions
            o.type != Variable.SCALAR_TYPE && o.type != Variable.LIST_TYPE || o.name.indexOf(t) == 0 && (n[o.name.substr(t.length)] = o.value);
        }
        return JSON.stringify(n);
    }

    deserializeFromJson (args, vm) {
        const t = args.PREFIX.toString();
        const js = args.JSON;
        let r;
        try {
            r = JSON.parse(js);
            // eslint-disable-next-line no-empty
        } catch (e) { }
        if (r) {
            const i = vm.target.variable;
            /* eslint-disable */
            for (let o in i) {
                let u = i[o]
                let s;
                if (0 == u.name.indexOf(t) && (s = r[u.name.substr(t.length)]),
                null != s)
                    if (u.type == Variable.LIST_TYPE && Array.isArray(s)) {
                        for (let c = 0; c < s.length; c++)
                            null == s[c] && (s[c] = '');
                        u.value = s
                    } else
                        u.type == Variable.SCALAR_TYPE && (u.value = String(s));
            }
            /* eslint-enable */
        }

    }

    callWorker (args, vm){
        if (typeof Worker !== 'undefined') {
            const WorkId = args.WORKER_ID;
            const Message = args.MESSAGE;
            return new Promise((A => {
                let worker;
                try {
                    (worker = new Worker(`/static/Worker/${WorkId}.js`)).onmessage = d => {
                        worker.terminate();
                        A(JSON.stringify(d.data));
                    };

                    worker.onerror = err => {
                        worker.terminate();
                        log.error(`Worker Error: ${err.message}`);
                        A('');
                    };
                    worker.postMessage(JSON.parse(Message));
                } catch (t) {
                    log.error(t);
                    worker.terminate();
                    A('');
                }
            })
            );
        }
        // eslint-disable-next-line no-alert
        alert('你的浏览器不支持Worker');

    }

}


module.exports = Scratch3JSBlocks;
