export default class Section {
  constructor({
    items,
    renderer
  }, containerSelector) {

    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    const itemsToRender = this._renderedItems;
    Array.prototype.forEach.call(itemsToRender, item => this._renderer(item));
  }
}
