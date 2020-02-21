/**
 * Adapted from svelte 3
 */

/**
 *  Bind to the following properties:
 * clientWidth
 * clientHeight
 * offsetWidth
 * offsetHeight
 * scrollWidth
 * scrollHeight
 * scrollLeft
 * scrollTop
 */

let requireScroll = new Set(["scrollLeft", "scrollTop", "effect"]);

export function bindArea(el, value, ...args) {
  if (value["bind:area"] || value["bindArea"]) {
    let binding = value["bind:area"] || value["bindArea"];

    // scrollProps are also resizeProps
    let resizeProps = Object.keys(binding);
    let scrollProps = resizeProps.filter(prop => requireScroll.has(prop));
    let fn = prop => binding[prop](el[prop]);
    let resizeFn = () => resizeProps.forEach(fn);
    let scrollFn = () => scrollProps.forEach(fn);

    // Handle scroll event
    scrollProps.length &&
      el.addEventListener("scroll", () =>
        window.requestAnimationFrame(scrollFn)
      );

    // Handle resize event (adapted from svelte 3)
    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }
    const object = document.createElement("object");
    object.setAttribute(
      "style",
      "display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"
    );
    object.type = "text/html";
    let win;
    object.onload = () => {
      resizeFn();
      win = object.contentDocument.defaultView;
      win.addEventListener("resize", resizeFn);
    };
    if (/Trident/.test(navigator.userAgent)) {
      el.appendChild(object);
      object.data = "about:blank";
    } else {
      object.data = "about:blank";
      el.appendChild(object);
    }

    delete value["bind:group"];
    delete value["bindGroup"];
  }
  return [el, value, ...args];
}
