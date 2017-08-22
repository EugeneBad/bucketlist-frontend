import { trigger, state, style, animate, transition } from '@angular/core';

export let faderAnimation = trigger('fader', [
                              state('in', style({ opacity: 1 })),
                              state('out', style({ opacity: 0 })),
                              transition('* => in', animate('1s 0.9s ease-out')),
                              transition('* => out', animate('1s 0.9s ease-out'))
                            ]);