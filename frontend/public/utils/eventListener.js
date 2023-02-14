const globalEvent = (eventType, selector, callback) => {
  document.addEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
};


module.ezports = globalEvent;