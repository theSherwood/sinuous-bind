import { api } from "sinuous";

const pipe = (f, g) => (...args) => g(...f(...args));

api.property = pipe(registryWrap, api.property);

const identity = (el, value, ...args) => [el, value, ...args];

let registry = {
  property: identity
};

function registryWrap(el, value, ...args) {
  if (value && typeof value === "object") {
    return registry.property(el, value, ...args);
  }
  return [el, value, ...args];
}

export function registerProperty(propHandler) {
  if (registry.property === identity) {
    registry.property = propHandler;
  } else {
    registry.property = pipe(propHandler, registry.property);
  }
}
