export class BehaviorsParser {
    constructor(behaviors, options = {}) {
        this.behaviors = behaviors;
        this.options = options;
    }
    initializeBehaviors() {
        const behaviorElements = document.querySelectorAll('[appaya-behavior]'), behaviorInstances = [];
        for (let i = 0; i < behaviorElements.length; i++) {
            const element = behaviorElements[i], attrs = element.getAttribute('appaya-behavior');
            if (attrs == null) {
                continue;
            }
            const attrsArray = attrs.split(';');
            for (const behavior of this.behaviors.filter(b => attrsArray.indexOf(b.behaviorName) >= 0)) {
                const behaviorInstance = this.createInstance(element, behavior);
                behaviorInstances.push(behaviorInstance);
            }
            element.removeAttribute('appaya-behavior');
        }
        return behaviorInstances;
    }
    checkBehaviors() {
        for (const behavior of this.behaviors) {
            if (behavior.behaviorName == null) {
                console.warn('Null "behaviorName" on ' + behavior.name);
            }
        }
    }
    createInstance(element, behavior) {
        const options = this.parseOptions(element);
        const children = this.parseChildren(element, behavior);
        return new behavior(element, options, children);
    }
    parseOptions(element) {
        const dataset = element.dataset, datasetOptions = dataset['options'];
        let options = {};
        if (datasetOptions) {
            if (this.options[datasetOptions]) {
                options = this.options[datasetOptions];
            }
        }
        for (let i in dataset) {
            const data = dataset[i];
            let parsedData = data;
            switch (data) {
                case 'true':
                    parsedData = true;
                    break;
                case 'false':
                    parsedData = false;
                    break;
                default:
                    if (!isNaN(parseInt(parsedData))) {
                        parsedData = parseInt(parsedData);
                    }
            }
            options[i] = parsedData;
            try {
                delete element.dataset[i];
            }
            catch (e) {
                console.warn(e);
            }
        }
        return options;
    }
    parseChildren(element, behavior) {
        let childrenObject = {};
        const children = element.querySelectorAll(`[${behavior.behaviorName}-child]`);
        for (let i = 0; i < children.length; i++) {
            const child = children[i], childName = child.getAttribute(`${behavior.behaviorName}-child`);
            if (!childName)
                continue;
            const childObject = childrenObject[childName];
            if (childObject) {
                if (Array.isArray(childObject)) {
                    childObject.push(child);
                }
                else {
                    childrenObject[childName] = [childObject, child];
                }
            }
            else {
                childrenObject[childName] = child;
            }
            child.removeAttribute(`${behavior.behaviorName}-child`);
        }
        return childrenObject;
    }
}
//# sourceMappingURL=behaviors-parser.js.map