 class Div {
  constructor(name, className) {
    this.name = name;
    this.className = className;
  }

  rend(parrent) {
    const div = document.createElement("div");
    div.classList.add(this.className);
    parrent.appendChild(div);
    return div
  }
}

class Option {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  rend(parrent,name) {
    const option = document.createElement("option");
    option.value = this.value;
    option.innerText = name
    parrent.appendChild(option)
    return option;
  }
}

export class ElementFactory {
  static list = {
    div: Div,
    option: Option,
  };

  create(name, type = "div", className = "seat") {
    const Element = ElementFactory.list[type];
    const elem = new Element(name, className);
    return elem;
  }

  // on(eventName, callback) {
  //   return this.element.addEventListener(eventName, function (ev) {
  //     return callback(ev, this);
  //   });
  // }

  // addClass(className) {
  //   this.classList.add(className);
  // }

  // removeClass(className) {
  //   this.classList.remove(className);
  // }

  // toggleClass(className) {
  //   this.classList.toggle(className);
  // }
}

