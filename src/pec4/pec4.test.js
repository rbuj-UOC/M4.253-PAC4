import {
  addListeners,
  addToCart,
  createCartElement,
  emptyCart,
  item,
  queryDOM,
  updateCartTotal
} from './pec4.js';

const SAMPLE_INITIAL_HTML = `
 <div class="row">
        <nav class="top-bar" data-topbar>
            <ul class="title-area">
                <li class="name">
                </li>
            </ul>
        </nav>
        <div class="medium-4  columns">
            <div class="cart">
                <h2>Cart items</h2>
                <div class="row">
                    <div class="medium-6 columns">
                        <button class="tiny secondary" id="clear">Clear cart</button>
                    </div>
                    <div class="medium-6 columns">
                        <button class="tiny" title="Update total" id="update">Update total</button>
                    </div>
                </div>
                <div id="cartItems">
                    <div class="panel"><h3>Orange</h3>  <span class="label">1 piece for 12 €</span></div>
                </div>
                Total price: <strong id="totalPrice">12 €</strong>
            </div>

        </div>
        <div class="medium-8 columns">
            <h2>Some products</h2>
            <div class="products">
                <div class="product medium-4 columns" data-name="Orange" data-price="12" data-id="0">
                    <h3>Orange</h3>
                    <p class="price">Price 12 €</p>
                    <input type="text" class="count" value="1"/>
                    <button class="tiny">Add to cart</button>
                </div>
                <div class="product medium-4 columns" data-name="Apple" data-price="10" data-id="1">

                    <h3>Apple</h3>
                    <p class="price">Price 8 €</p>
                    <input type="text" class="count" value="1"/>
                    <button class="tiny">Add to cart</button>
                </div>
                <div class="product medium-4 columns" data-name="Peach" data-price="20" data-id="2">
                    <h3>Peach</h3>
                    <p class="price">Price 19 €</p>
                    <input type="text" class="count" value="1"/>
                    <button class="tiny">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
`;

const SAMPLE_CART_WITH_ITEMS_HTML = `
 <div class="row">
        <nav class="top-bar" data-topbar>
            <ul class="title-area">
                <li class="name">
                </li>
            </ul>
        </nav>
        <div class="medium-4  columns">
            <div class="cart">
                <h2>Cart items</h2>
                <div class="row">
                    <div class="medium-6 columns">
                        <button class="tiny secondary" id="clear">Clear cart</button>
                    </div>
                    <div class="medium-6 columns">
                        <button class="tiny" title="Update total" id="update">Update total</button>
                    </div>
                </div>
                <div id="cartItems">
                    <div class="panel"><h3>Orange</h3>  <span class="label">1 piece for 12 €</span></div>
                    <div class="panel"><h3>Apple</h3>  <span class="label">2 piece for 12 €</span></div>
                </div>
                Total price: <strong id="totalPrice">36 €</strong>
            </div>
        </div>
    </div>
`;

const SAMPLE_EMPTY_CART_HTML = `
 <div class="row">
        <nav class="top-bar" data-topbar>
            <ul class="title-area">
                <li class="name">
                </li>
            </ul>
        </nav>
        <div class="medium-4  columns">
            <div class="cart">
                <h2>Cart items</h2>
                <div class="row">
                    <div class="medium-6 columns">
                        <button class="tiny secondary" id="clear">Clear cart</button>
                    </div>
                    <div class="medium-6 columns">
                        <button class="tiny" title="Update total" id="update">Update total</button>
                    </div>
                </div>
                <div id="cartItems">
                </div>
                Total price: <strong id="totalPrice">0 €</strong>
            </div>
        </div>
    </div>
`;

const SAMPLE_SINGLE_APPLE_ITEM = new item('Apple', 10, 1);
const SAMPLE_TWO_APPLES_ITEM = new item('Apple', 20, 2);
const SAMPLE_SINGLE_ORANGE_ITEM = new item('Orange', 7, 1);

const SAMPLE_SINGLE_PEACH_ITEM = new item('Peach', 14, 2);

function resetDOM() {
  document.body.innerHTML = SAMPLE_INITIAL_HTML;
}

const checkAttrValue = (n, id, v) => {
  if (!n.hasAttribute(id)) {
    throw `Attribute ${id} not found`;
  }
  if (v !== n.attributes.getNamedItem(id).value) {
    throw `Attribute ${id} != ${v}`;
  }
};

beforeEach(resetDOM);

// Tests.
describe('Ex1', () => {
  it('should not fail when no DOM is present', () => {
    try {
      queryDOM();
    } catch (e) {
      fail(e);
    }
  });

  it('should return an array', () => {
    expect(queryDOM()).toBeInstanceOf(Array);
  });

  it('should return 5 items', () => {
    expect(queryDOM().length).toBe(5);
  });

  it('should return the right node types', () => {
    const result = queryDOM();

    expect(result[0]).toBeInstanceOf(Element);
    expect(result[0]).toHaveTextContent('12 €');
    checkAttrValue(result[0], 'id', 'totalPrice');

    expect(result[1]).toBeInstanceOf(NodeList);
    expect(result[1].length).toBe(2);
    [...result[1].values()].forEach((node) => {
      expect(node.nodeName.toLowerCase()).toBe('h2');
    });

    expect(result[2]).toBeInstanceOf(NodeList);
    expect(result[2].length).toBe(3);
    [...result[2].values()].forEach((node) => {
      expect(node.nodeName.toLowerCase()).toBe('div');
      expect(node).toHaveClass('product');
    });

    expect(result[3]).toBeInstanceOf(NodeList);
    expect(result[3].length).toBe(3);
    [...result[3].values()].forEach((node) => {
      expect(node.nodeName.toLowerCase()).toBe('p');
      expect(node).toHaveClass('price');
    });

    expect(result[4]).toBeInstanceOf(Element);
    expect(result[4]).toHaveTextContent('Add to cart');
  });
});

describe('Ex2', () => {
  it('should return a DOM node', () => {
    const node = createCartElement(SAMPLE_SINGLE_APPLE_ITEM);
    expect(node).toBeInstanceOf(Node);
  });
  it('should have the panel class', () => {
    const node = createCartElement(SAMPLE_SINGLE_APPLE_ITEM);
    expect(node).toHaveClass('panel');
  });
  it('should have the correct name', () => {
    const node = createCartElement(SAMPLE_SINGLE_APPLE_ITEM);
    expect(node.querySelector('h3')).toHaveTextContent('Apple');
  });

  it('should have the correct price', () => {
    const node = createCartElement(SAMPLE_TWO_APPLES_ITEM);
    expect(node.querySelector('span')).toHaveTextContent('2 pieces for 20 €');
  });

  it('should have the correct HTML', () => {
    let node = createCartElement(SAMPLE_TWO_APPLES_ITEM);
    expect(node.outerHTML).toBe(
      '<div class="panel"><h3>Apple</h3><span class="label">2 pieces for 20 €</span></div>'
    );

    node = createCartElement(new item('Title', 0, 10));
    expect(node.outerHTML).toBe(
      '<div class="panel"><h3>Title</h3><span class="label">10 pieces for 0 €</span></div>'
    );
  });
});

describe('Ex3', () => {
  it('Should empty cart properly with a single item.', () => {
    emptyCart();
    let nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(0);

    document.body.innerHTML = SAMPLE_EMPTY_CART_HTML;
    nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(0);
  });

  it('Should empty cart properly with a several items.', () => {
    document.body.innerHTML = SAMPLE_CART_WITH_ITEMS_HTML;
    emptyCart();
    let nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(0);
  });

  it('Should empty cart properly if it is called several times.', () => {
    emptyCart();
    emptyCart();
    emptyCart();
    let nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(0);
  });
});

describe('Ex4', () => {
  it('The total price is updated properly with a single item.', () => {
    updateCartTotal();
    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('12 €');
  });

  it('The total price is updated properly with an empty cart.', () => {
    document.body.innerHTML = SAMPLE_EMPTY_CART_HTML;
    document.querySelector('#totalPrice').textContent = '10 €';
    updateCartTotal();
    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('0 €');
  });

  it('The total price is updated properly with several items.', () => {
    document.body.innerHTML = SAMPLE_CART_WITH_ITEMS_HTML;
    document.querySelector('#totalPrice').textContent = '0 €';
    updateCartTotal();
    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('24 €');
  });

  it('The total is calculated of a idempotent way.', () => {
    document.body.innerHTML = SAMPLE_CART_WITH_ITEMS_HTML;
    document.querySelector('#totalPrice').textContent = '0 €';
    updateCartTotal();
    updateCartTotal();
    updateCartTotal();
    updateCartTotal();
    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('24 €');
  });
});

describe('Ex5', () => {
  it('A single product is added properly to the cart.', () => {
    addToCart(SAMPLE_SINGLE_APPLE_ITEM);
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(2);
  });

  it('Several products are added properly to the cart if they are equals.', () => {
    addToCart(SAMPLE_SINGLE_ORANGE_ITEM);
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(1);
  });

  it('Several products are added properly to the cart if they are equals with different quantities.', () => {
    addToCart(SAMPLE_SINGLE_APPLE_ITEM);
    addToCart(SAMPLE_TWO_APPLES_ITEM);
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(2);
  });

  it('Several products are added properly to the cart if they are different.', () => {
    addToCart(SAMPLE_SINGLE_APPLE_ITEM);
    addToCart(SAMPLE_SINGLE_PEACH_ITEM);
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(3);
  });

  it('A single product is added properly to the cart on empty carts.', () => {
    document.body.innerHTML = SAMPLE_EMPTY_CART_HTML;
    addToCart(SAMPLE_SINGLE_APPLE_ITEM);
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(1);
  });

  it('Elements are added with correct values.', () => {
    document.body.innerHTML = SAMPLE_EMPTY_CART_HTML;
    addToCart(SAMPLE_TWO_APPLES_ITEM);
    addToCart(SAMPLE_TWO_APPLES_ITEM);
    addToCart(SAMPLE_SINGLE_APPLE_ITEM);

    const node = document.querySelector('#cartItems .panel');
    expect(node.querySelector('h3')).toHaveTextContent('Apple');
    expect(node.querySelector('.label')).toHaveTextContent('5 pieces for 50 €');
  });
});

/**
 * The functions emptyCart(), updateCart() and addToCart() should work as expected to pass this tests.
 */
describe('Ex6', () => {
  it('The clear button empty the cart', () => {
    addListeners();
    const clearButton = document.getElementById('clear');
    clearButton.dispatchEvent(new Event('click'));
    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(0);
  });

  it('The update cart button calculates the total once', () => {
    document.body.innerHTML = SAMPLE_CART_WITH_ITEMS_HTML;
    document.querySelector('#totalPrice').textContent = '0 €';

    addListeners();

    const updateButton = document.getElementById('update');
    updateButton.dispatchEvent(new Event('click'));

    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('24 €');
  });

  it('The update cart button calculates the total several times', () => {
    document.body.innerHTML = SAMPLE_CART_WITH_ITEMS_HTML;
    document.querySelector('#totalPrice').textContent = '0 €';

    addListeners();

    const updateButton = document.getElementById('update');
    updateButton.dispatchEvent(new Event('click'));
    updateButton.dispatchEvent(new Event('click'));
    updateButton.dispatchEvent(new Event('click'));
    updateButton.dispatchEvent(new Event('click'));

    const totalPrice = document.querySelector('#totalPrice');
    expect(totalPrice).toHaveTextContent('24 €');
  });

  it('The add to cart button works once', () => {
    addListeners();

    const addToCartButton = document.querySelector(
      ".products [data-name='Apple'] button"
    );
    addToCartButton.dispatchEvent(new Event('click'));

    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(2);
  });

  it('The add to cart button works twice', () => {
    addListeners();

    const addToCartButton = document.querySelector(
      ".products [data-name='Apple'] button"
    );
    addToCartButton.dispatchEvent(new Event('click'));
    addToCartButton.dispatchEvent(new Event('click'));

    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(2);
  });

  it('The add to cart button works with different products', () => {
    addListeners();

    const appleAddToCartButton = document.querySelector(
      ".products [data-name='Apple'] button"
    );
    appleAddToCartButton.dispatchEvent(new Event('click'));

    const peachAddToCartButton = document.querySelector(
      ".products [data-name='Peach'] button"
    );
    peachAddToCartButton.dispatchEvent(new Event('click'));

    const nodeList = document.querySelectorAll('#cartItems .panel');
    expect(nodeList.length).toBe(3);
  });
});
