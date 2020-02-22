import { api } from "sinuous";
import { subscribe } from 'sinuous/observable';

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

export function register(getProp) {
  if (registry.property === identity) {
    registry.property = getProp({subscribe});
  } else {
    registry.property = pipe(getProp({subscribe}), registry.property);
  }
}
