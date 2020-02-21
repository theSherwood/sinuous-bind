import { subscribe } from "sinuous/observable";
import { asNumber } from "./utils";

export function bind(el, value, ...args) {
  if (value.bind) {
    let binding = Array.isArray(value.bind) ? value.bind : [value.bind];
    let prop = binding[1] || "value";
    // Use subscribe rather than setting the property directly to add flexibility
    subscribe(() => {
      let newContent = binding[0]();
      if (el[prop] != newContent) {
        el[prop] = newContent;
      }
    });
    value[binding[2] || "oninput"] = e =>
      binding[0](
        // Cast as a number if possible (unless empty string)
        asNumber(e.target[binding[1] || "value"])
      );
    delete value.bind;
  }
  if (value.ref) {
    value.ref(el);
    delete value.ref;
  }
  return [el, value, ...args];
}

// All the following is for registering bind in the case
// that it is consumed as a cdn

const pipe = (f, g) => (...args) => g(...f(...args));

let registry = {
  property: bind
};

function registryWrap(el, value, ...args) {
  if (value && typeof value === "object") {
    return registry.property(el, value, ...args);
  }
  return [el, value, ...args];
}

export function registerProperty(propHandler) {
  registry.property = pipe(propHandler, registry.property);
}

export function enableBind(api) {
  api.property = pipe(registryWrap, api.property);
}