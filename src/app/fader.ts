import { trigger, state, style, animate, transition } from '@angular/core';

// variable that calls the trigger method to animate features.
export let faderAnimation = trigger('fader', [
                              state('in', style({ opacity: 1 })),
                              state('out', style({ opacity: 0 })),
                              transition('* => in', animate('1s 0.7s ease-out')),
                              transition('* => out', animate('1s 0.7s ease-out'))
                            ]);
