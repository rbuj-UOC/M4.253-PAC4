export class item {
  constructor(name, price, units) {
    this.name = name;
    this.price = parseInt(price);
    this.units = parseInt(units);
  }
}

// Exercise 1. (2p)
export function queryDOM() {
  return [
    document.getElementById('totalPrice'),
    document.querySelectorAll('h2'),
    document.querySelectorAll('.product'),
    document.querySelectorAll('p.price'),
    document.querySelector(".products [data-name='Peach'] button")
  ];
}

// Exercise 2. (2p)
export function createCartElement(item) {
  const newDiv = document.createElement('div');
  const newHeader = document.createElement('h3');
  const newSpan = document.createElement('span');
  newDiv.className = 'panel';
  newHeader.appendChild(document.createTextNode(item.name));
  newSpan.className = 'label';
  newSpan.appendChild(
    document.createTextNode(
      item.units === 1
        ? `${item.units} piece for ${item.price} €`
        : `${item.units} pieces for ${item.price} €`
    )
  );
  newDiv.appendChild(newHeader);
  newDiv.appendChild(newSpan);
  return newDiv;
}

// Exercise 3 (1p)
export function emptyCart() {
  document
    .querySelectorAll('#cartItems div.panel')
    .forEach((item) => item.remove());
}

// Exercise 4 (1p)
export function updateCartTotal() {
  let totalPrice = 0;
  for (const span of document.querySelectorAll('#cartItems div.panel span')) {
    const number = span.textContent.match(/\d+/g);
    if (number.length === 2) {
      totalPrice += Number.parseInt(number[1]);
    }
  }
  document.querySelector('#totalPrice').textContent = `${totalPrice} €`;
}

// Exercise 5. (2p)
export function addToCart(itemAdded) {
  const cartItems = document.getElementById('cartItems');
  let exist = false;
  for (const panel of cartItems.querySelectorAll('div.panel')) {
    if (itemAdded.name === panel.querySelector('h3').textContent) {
      const span = panel.querySelector('span');
      const number = span.textContent.match(/\d+/g);
      if (number.length === 2) {
        const units = itemAdded.units + Number.parseInt(number[0]);
        const price = itemAdded.price + Number.parseInt(number[1]);
        span.textContent =
          units === 1
            ? `${units} piece for ${price} €`
            : `${units} pieces for ${price} €`;
      }
      exist = true;
    }
  }
  if (!exist) {
    cartItems.appendChild(createCartElement(itemAdded));
  }
}

// Exercise 6. (2p)
export function addListeners() {
  document.querySelector('#clear').addEventListener('click', emptyCart);
  document.querySelector('#update').addEventListener('click', updateCartTotal);
  for (const product of document.querySelectorAll('div.products div.product')) {
    product.querySelector('button').addEventListener('click', () => {
      const units = Number.parseInt(product.querySelector('input').value);
      if (units > 0) {
        addToCart(
          new item(
            product.querySelector('h3').textContent,
            units *
              Number.parseInt(
                product.querySelector('p').textContent.match(/\d+/g)[0]
              ),
            units
          )
        );
      }
    });
  }
}
