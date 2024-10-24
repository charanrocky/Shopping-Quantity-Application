import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

export type GlobalState = {
  products: Product[];
  cart: CartItem[];
  orderConfirmed: boolean;
};

const initialState: GlobalState = {
  products: [],
  cart: [],
  orderConfirmed: false,
};

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  #http = inject(HttpClient);
  #store = signal<GlobalState>(initialState);

  // State
  products = computed(() => this.#store().products);
  cart = computed(() => this.#store().cart);
  orderConfirmed = computed(() => this.#store().orderConfirmed);

  // Derived State
  cartQuantity = computed(() =>
    this.cart().reduce((acc, el) => (acc += el.quantity), 0)
  );
  total = computed(() =>
    this.cart().reduce(
      (acc, item) => (acc += item.product.price * item.quantity),
      0
    )
  );

  constructor() {
    this.#http.get<Product[]>('data/data.json').subscribe((products) =>
      this.#store.update((state) => ({
        ...state,
        products,
      }))
    );
  }

  addCartItem(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: [...state.cart, { product, quantity: 1 }],
    }));
  }

  removeCartItem(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: state.cart.filter((el) => el.product.name !== product.name),
    }));
  }

  incrementQuantity(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: state.cart.map((el) =>
        el.product.name === product.name
          ? { ...el, quantity: el.quantity + 1 }
          : el
      ),
    }));
  }

  decrementQuantity(product: Product) {
    this.#store.update((state) => ({
      ...state,
      cart: state.cart
        .map((el) =>
          el.product.name === product.name
            ? { ...el, quantity: el.quantity - 1 }
            : el
        )
        .filter((el) => el.quantity > 0),
    }));
  }

  confirmOrder() {
    this.#store.update((state) => ({ ...state, orderConfirmed: true }));
  }

  startNewOrder() {
    this.#store.update((state) => ({
      ...state,
      cart: [],
      orderConfirmed: false,
    }));
  }
}
