import { asNumber } from "./utils";

export function getBind({ subscribe }) {
  return function bind(el, value, ...args) {
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
  };
}

// All the following is for registering bind in the case
// that it is consumed as a cdn

const pipe = (f, g) => (...args) => g(...f(...args));

let registry = [];

export function register(getProp) {
  registry.push(getProp);
}

function registryWrap(deps) {
  // Set up a branch of the api
  let apiBranch = { property: getBind(deps) };
  // Compose registry functions around apiBranch while injecting deps
  registry.forEach(
    getProp => (apiBranch.property = pipe(getProp(deps), apiBranch.property))
  );
  
  // The return function gets composed around api.property
  return function(el, value, ...args) {
    if (value && typeof value === "object") {
      // Take the apiBranch
      return apiBranch.property(el, value, ...args);
    }
    // Else bypass the apiBranch
    return [el, value, ...args];
  };
}

export function enableBind(deps) {
  deps.api.property = pipe(registryWrap(deps), deps.api.property);
}
