export interface ICreateProps {
  tagName: string;
  classNames?: string;
  children?: string | Array<string> | number | Array<HTMLElement>;
  parent?: Element | null;
  dataAttr?: string[][];
}

export function create({
  tagName,
  classNames,
  children,
  parent,
  dataAttr
}: ICreateProps): HTMLElement {
  let htmlElement = document.createElement('div') as HTMLElement;

  if (tagName) {
    htmlElement = document.createElement(tagName);
  } else {
    throw new Error(`Can't create ${tagName}, give a proper tag name!`);
  }

  if (children && Array.isArray(children)) {
    children.forEach((childElement) => childElement && htmlElement.append(childElement));
  } else if (children && typeof children === 'object') {
    htmlElement.appendChild(children);
  } else if (children && typeof children === 'string') {
    htmlElement.innerHTML = children;
  }

  if (parent) {
    parent.append(htmlElement);
  }

  if (classNames) htmlElement.classList.add(...classNames.split(' '));

  if (dataAttr && dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrName === '') {
        htmlElement.setAttribute(attrName, '');
      }
      if (attrName?.match(/value|id|placeholder|href|src|type|for|disabled|min|max|step/)) {
        htmlElement.setAttribute(attrName, attrValue);
      } else {
        htmlElement.dataset[attrName] = attrValue;
      }
    });
  }

  return htmlElement;
}
