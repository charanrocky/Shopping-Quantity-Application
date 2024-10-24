import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

import { ButtonComponent } from './../button/button.component';
import { CartItem } from '../../models/cart.model';
import { modalTransitions } from '../../animations/modal-transitions';

@Component({
  selector: 'app-confirmed-modal',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent],
  template: `
    @if(open()) {
    <section class="order" @modalTransitions>
      <dialog class="order__modal">
        <div>
          <img
            src="images/icon-order-confirmed.svg"
            alt="Successful operation check mark"
          />
          <h1 class="text text--xl order__title">Order Confirmed</h1>
          <p class="text text--md text--regular text--rose-500">
            We hope you enjoy your food!
          </p>
        </div>

        <div class="order__cart">
          <ul class="order__items">
            @for (item of cart(); track $index) {
            <li>
              <article class="order__item">
                <div class="order__data-box">
                  <img
                    class="order__img"
                    [src]="item.product.image.thumbnail"
                    [alt]="item.product.name + ' thumbnail image'"
                  />

                  <div class="order__text-box">
                    <p class="text text--sm text--semibold order__item-name">
                      {{ item.product.name }}
                    </p>

                    <div class="order__amount">
                      <span
                        class="text text--sm text--semibold text--red-100 order__quantity"
                      >
                        {{ item.quantity }}x
                      </span>
                      <span class="text text--sm text--rose-500">
                        &commat; {{ item.product.price | currency : '$' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="order__subtotal">
                  <span class="text text--md">
                    {{ item.product.price * item.quantity | currency : '$' }}
                  </span>
                </div>
              </article>
            </li>
            }
          </ul>

          <div class="order__total">
            <span class="text text--sm"> Order Total </span>
            <span class="text text--lg">
              {{ total() | currency : '$' }}
            </span>
          </div>
        </div>

        <button
          app-button
          ariaLabel="Start new order resetting the cart."
          (onClick)="onStartNewOrder.emit()"
        >
          <span slot="label" class="text text--md">Start New Order</span>
        </button>
      </dialog>
    </section>
    }
  `,
  styleUrl: './confirmed-modal.component.scss',
  animations: [modalTransitions],
})
export class ConfirmedModalComponent {
  open = input.required<boolean>();
  cart = input.required<CartItem[]>();
  total = input.required<number>();

  protected onStartNewOrder = output();
}
