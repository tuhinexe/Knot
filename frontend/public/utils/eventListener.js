const globalEvent = (eventType, selector, callback) => {
  document.addEventListener(eventType, (e) => {
    if (e.target.parentElement.matches(selector)) callback(e);
  });
};


export  {globalEvent};