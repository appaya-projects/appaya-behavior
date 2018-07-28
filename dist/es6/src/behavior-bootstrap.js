import { BehaviorsParser } from "./core/behaviors-parser";
export function BehaviorBootstrap(behaviors, options = {}) {
    const behaviorsParser = new BehaviorsParser(behaviors, options), instances = behaviorsParser.initializeBehaviors();
    behaviorsParser.checkBehaviors();
    for (let instance of instances) {
        instance.beforeInit();
        instance.init();
    }
    console.log(instances);
    return instances;
}
//# sourceMappingURL=behavior-bootstrap.js.map