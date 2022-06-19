import { Car } from "./carmodule.js";

export class FlyCar extends Car {
    canFly = true;
    
    toString() {
        return super.toString() + ' and I can fly'
    }
}