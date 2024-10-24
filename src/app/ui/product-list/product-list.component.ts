import { Component, input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
    <main class="products">
      <h1 class="text text--xl">Shopping Quantity Application</h1>

      <ul class="products__list">
        
        @for (product of products(); track $index) {
       
        <li>
          <app-product-item [product]="product" />
        </li>
        }
      </ul>

    </main>
  `,

  styleUrl: './product-list.component.scss',

  
})
export class ProductListComponent {
  products = input.required<Product[]>();
}


