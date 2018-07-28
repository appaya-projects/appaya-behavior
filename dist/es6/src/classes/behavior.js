export class Behavior {
    constructor(element, _options, children) {
        this.element = element;
        this._options = _options;
        this.children = children;
        this.options = {};
    }
    beforeInit() {
        this.mergeOptions(this._options);
    }
    mergeOptions(_options) {
        for (let i in this.defaultOptions) {
            this.options[i] = this.defaultOptions[i];
        }
        for (let i in _options) {
            this.options[i] = _options[i];
        }
    }
    addChildren(childName, child) {
        this.children[childName] = child;
    }
    removeChildren(childName) {
        delete this.children[childName];
    }
}
//# sourceMappingURL=behavior.js.map