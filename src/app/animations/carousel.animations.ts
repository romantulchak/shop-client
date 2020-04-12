import { animation, style, animate } from '@angular/animations';

export const scaleIn = animation([
    style({opacity:0, transform: "scale(0.5)"}),
    animate(
        "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        style({opacity: 1, transform: "scale(1)"})
    )
]);

export const scaleOut = animation([
    animate(
      "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ opacity: 0, transform: "scale(0.5)" })
    )
  ]);