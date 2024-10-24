import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const modalTransitions = trigger('modalTransitions', [
  transition(':enter', [
    query('.order__modal', [
      style({ opacity: 0, scale: '0.8' }),
      animate(
        '400ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
        style({ opacity: 1, scale: '1' })
      ),
    ]),
  ]),
  transition(':leave', [
    query('.order__modal', [
      animate(
        '400ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
        style({ opacity: 0, scale: '0.8' })
      ),
    ]),
  ]),
]);
