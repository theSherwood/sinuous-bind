import { asNumber } from "./utils";

export function getBindGroup({ subscribe }) {
  return function bindGroup(el, value, ...args) {
    if (value["bind:group"] || value["bindGroup"]) {
      let binding = value["bind:group"] || value["bindGroup"];
      if (el.nodeName === "SELECT") {
        let observer = new MutationObserver(function(mutations) {
          let selected = binding();
          let addedNodes = [];
          let addedNodesVals = new Set([]);
          let removedNodesVals = new Set([]);
          mutations.forEach(function(mutation) {
            for (let node of mutation.addedNodes) {
              if (node.nodeName === "OPTION") {
                addedNodes.push(node);
                addedNodesVals.add(asNumber(node.value));
              }
            }
            for (let node of mutation.removedNodes) {
              if (node.nodeName === "OPTION") {
                removedNodesVals.add(asNumber(node.value));
              }
            }
          });
          if (!Array.isArray(selected)) {
            selected = [selected];
          }
          let toSelect = selected.filter(val => {
            if (addedNodesVals.has(val)) return true;
            if (removedNodesVals.has(val)) return false;
            return true;
          });
          for (let option of addedNodes) {
            option.selected = toSelect.includes(option.value) ? true : false;
          }
          binding(toSelect);
        });
        let observerConfig = {
          childList: true
        };
        observer.observe(el, observerConfig);
        if (value.multiple) {
          value.oninput = e =>
            binding(
              Array.from(e.target.selectedOptions, elem => asNumber(elem.value))
            );
          subscribe(() => {
            let selected = binding();
            for (let option of el.options) {
              option.selected = selected.includes(asNumber(option.value))
                ? true
                : false;
            }
          });
        } else {
          value.value = binding;
          value["oninput"] = e => binding(asNumber(e.target.value));
        }
      } else if (el.nodeName === "INPUT" && value.type === "radio") {
        subscribe(() =>
          value.value == binding() ? (el.checked = true) : (el.checked = false)
        );
        value["onchange"] = e => binding(asNumber(e.target.value));
      } else if (el.nodeName === "INPUT" && value.type === "checkbox") {
        subscribe(() =>
          binding().includes(asNumber(value.value))
            ? (el.checked = true)
            : (el.checked = false)
        );
        value["onchange"] = e => {
          let newValue = binding();
          let val = asNumber(e.target.value);
          if (newValue.includes(val)) {
            binding(newValue.filter(v => v != val));
          } else {
            newValue.push(asNumber(e.target.value));
            binding(newValue);
          }
        };
      }
      delete value["bind:group"];
      delete value["bindGroup"];
    }
    return [el, value, ...args];
  };
}
