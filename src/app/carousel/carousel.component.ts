import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { scaleIn, scaleOut } from '../animations/carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger("slideAnimation", [
      transition("void => *", [useAnimation(scaleIn, {params: {time: '500ms'}})]),
      transition("* => void", [useAnimation(scaleOut, {params: {time: '500ms'}})]),
    ])
  ]
})
export class CarouselComponent implements OnInit {


  @Input() slides: any;

  public currentSlide = 0;

  constructor() { }

  ngOnInit(): void {
  }
  onPreviousClick(){
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }
  onNextClick(){
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

}
