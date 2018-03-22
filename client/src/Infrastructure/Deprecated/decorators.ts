// Due to https://github.com/angular/angular/blob/master/docs/PUBLIC_API.md
// we cannot import internal angular class
declare var global;
const Reflect = global['Reflect'];
// tslint:disable:no-any
function makeMetadataCtor(props: ([string, any] | { [key: string]: any })[]): any {
  return function ctor(...args: any[]): void {
    props.forEach((prop, i) => {
      const argVal = args[i];
      if (Array.isArray(prop)) {
        // plain parameter
        this[prop[0]] = argVal === undefined ? prop[1] : argVal;
      } else {
        for (const propName in prop) {
          this[propName] =
            argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
        }
      }
    });
  };
}
export function makePropDecorator(
  name: string, props: ([string, any] | { [key: string]: any })[], parentClass?: any): any {
  const metaCtor = makeMetadataCtor(props);

  function PropDecoratorFactory(...args: any[]): any {
    if (this instanceof PropDecoratorFactory) {
      metaCtor.apply(this, args);
      return this;
    }

    const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

    return function PropDecorator(target: any, name: string): void {
      const meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
      meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
      meta[name].unshift(decoratorInstance);
      Reflect.defineMetadata('propMetadata', meta, target.constructor);
    };
  }

  if (parentClass) {
    PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
  }

  PropDecoratorFactory.prototype.toString = () => `@${name}`;
  (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
  return PropDecoratorFactory;
}
