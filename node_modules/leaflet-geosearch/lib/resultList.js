import { createElement, addClassName, removeClassName, cx } from './domUtils';
export default class ResultList {
    constructor({ handleClick, classNames = {} }) {
        this.selected = -1;
        this.results = [];
        this.onClick = (event) => {
            if (typeof this.handleClick !== 'function') {
                return;
            }
            const target = event.target;
            if (!target ||
                !this.container.contains(target) ||
                !target.hasAttribute('data-key')) {
                return;
            }
            const idx = Number(target.getAttribute('data-key'));
            this.handleClick({ result: this.results[idx] });
        };
        this.handleClick = handleClick;
        this.container = createElement('div', cx('results', classNames.container));
        this.container.addEventListener('click', this.onClick, true);
        this.resultItem = createElement('div', cx(classNames.item));
    }
    render(results = []) {
        this.clear();
        results.forEach((result, idx) => {
            const child = this.resultItem.cloneNode(true);
            child.setAttribute('data-key', `${idx}`);
            child.innerHTML = result.label;
            this.container.appendChild(child);
        });
        if (results.length > 0) {
            addClassName(this.container.parentElement, 'open');
            addClassName(this.container, 'active');
        }
        this.results = results;
    }
    select(index) {
        // eslint-disable-next-line no-confusing-arrow
        Array.from(this.container.children).forEach((child, idx) => idx === index
            ? addClassName(child, 'active')
            : removeClassName(child, 'active'));
        this.selected = index;
        return this.results[index];
    }
    count() {
        return this.results ? this.results.length : 0;
    }
    clear() {
        this.selected = -1;
        while (this.container.lastChild) {
            this.container.removeChild(this.container.lastChild);
        }
        removeClassName(this.container.parentElement, 'open');
        removeClassName(this.container, 'active');
    }
}
//# sourceMappingURL=resultList.js.map