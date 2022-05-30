class Element {
  constructor(children, className) {
  this.children = children;
  this.className = className;
  }

  rend(element) {
    if (this.className) {
      element.classList.add(this.className);
    }

    this.children.forEach(item => {
      let result;
      if (item instanceof Element) {
        result = item.rend();
      } else {
        result = item;
      }
      
      element.innerText = result;
    });
  }
}
 
 class Div extends Element {
  constructor({ className, onclick }, children) {
    super(children, className);
    this.onclick = onclick;
  }

  rend() {
    const div = document.createElement("div");

    if (this.onclick) {
      div.addEventListener('click', this.onclick);
    }

    super.rend(div);
    return div
  }
}

class Option extends Element {
  constructor({ className, value }, children) {
    super(children, className);
    this.value = value;
  }

  rend() {
    const option = document.createElement("option");
    option.value = this.value;
    super.rend(option);
    return option;
  }
}

export class ElementFactory {
  static list = {
    div: Div,
    option: Option,
  };

  create(type, params, children = []) {
    const Element = ElementFactory.list[type];
    const elem = new Element(params, children);
    return elem;
  }
}

