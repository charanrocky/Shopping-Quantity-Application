import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartItem } from '../../models/cart.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent],
  template: `
    <aside class="cart">
      <h2 class="text text--lg text--red-100">Your Cart ({{ quantity() }})</h2>

      <ul class="cart__items">
        @for (item of cart(); track $index) {
        <li>
          <div class="cart__item">
            <div class="cart__item-info">
              <p class="text text--sm text--semibold">
                {{ item.product.name }}
              </p>

              <div class="cart__item-stats">
                <span class="text text--sm text--semibold text--red-100">
                  {{ item.quantity }}x
                </span>

                <span class="text text--sm text--rose-500">
                  &commat; {{ item.product.price | currency : '$' }}
                </span>

                <span class="text text--sm text--semibold text--rose-500">
                  {{ item.product.price * item.quantity | currency : '$' }}
                </span>
              </div>
            </div>

            <button
              app-button
              severity="icon"
              styleClass="btn--icon--remove"
              [ariaLabel]="'Remove ' + item.product.name + ' from the cart.'"
              (onClick)="onRemoveCartItem.emit(item)"
            >
              <svg
                slot="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="8.75"
                height="8.75"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </button>
          </div>
        </li>
        } @empty {
        <li class="cart__empty">
          <img src="images/illustration-empty-cart.svg" alt="Empty cart icon" />

          <p class="text text--sm text--semibold">
            Your added items will appear here
          </p>
        </li>
        }
      </ul>

      @if (cart().length > 0) {
      <div class="cart__total">
        <span class="text text--sm">Order Total</span>
        <span class="text text--lg">{{ total() | currency : '$' }}</span>
      </div>

      <div class="cart__delivery">
        <img src="images/icon-carbon-neutral.svg" alt="Green tree icon" />
        <p class="text text--sm">
          This is a
          <span class="text--semibold">carbon-neutral</span> delivery
        </p>
      </div>

      <button
        app-button
        ariaLabel="Confirm the order in the cart."
        (onClick)="onConfirmOrder.emit()"
      >
        <span slot="label" class="text text--md text--semibold">
          Confirm Order
        </span>
      </button>
      }
    </aside>
  `,
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart = input.required<CartItem[]>();
  quantity = input.required<number>();
  total = input.required<number>();

  onRemoveCartItem = output<CartItem>();
  onConfirmOrder = output();
}
