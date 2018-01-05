export function $on(target, type, callback, capture = false) {
  target.addEventListener(type, callback, capture);
}

export function $onOutside(target, type, selector, callback, capture = false) {
  $on(
    target,
    type,
    (event) => {
      if (!event.target.closest(selector)) {
        callback(event);
      }
    },
    capture
  );
}

export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}
