define(['knockout','../accUtils','../utils/CommonUtils', '../utils/Constants',
        'ojs/ojradioset','oj-c/button',
        'oj-st-scroll-to-top/loader'
       ],
 function(ko,accUtils,CommonUtils, Constants) {
    function AnalysesViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.
      var self = this;

      this.connected = () => {
        accUtils.announce('Analyses page loaded.');
        document.title = "Learn";
        // Implement further logic if needed
        document.getElementById("appn-header").style.display = "none";
        document.getElementById("appn-short-header").style.display = "block";
      };

      self.selectedLearnOption = ko.observable("shots");
      self.currentIndex = ko.observable(0);


      self.selectedLearnOption.subscribe(function(newValue) {
        console.log(newValue);
        if(newValue=='shoots'){
          const cardsss = document.querySelectorAll('.card');
          self.currentIndex(3);
          cardsss[self.currentIndex()].classList.add('active');
        }
          
      });

      self.goToNextCard = function() {
        const cardsss = document.querySelectorAll('.card');
        cardsss[self.currentIndex()].classList.remove('active');
        self.currentIndex((self.currentIndex() + 1) % cardsss.length);
        cardsss[self.currentIndex()].classList.add('active');
        self.updateCarousel();
      }

      self.goToPrevCard = function() {
        const cardsss = document.querySelectorAll('.card');
        cardsss[self.currentIndex()].classList.remove('active');
        self.currentIndex((self.currentIndex() - 1 + cardsss.length) % cardsss.length);
        cardsss[self.currentIndex()].classList.add('active');
        self.updateCarousel();
      }

      self.updateCarousel = function(){
        const carousel = document.querySelector('.carousel');
        const cardsss = document.querySelectorAll('.card');
        const cardWidth = cardsss[self.currentIndex()].offsetWidth + 20; // +20 for margin
        const offset = -(self.currentIndex() - Math.floor(cardsss.length / 2)) * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
      }






      this.disconnected = () => {
        // Implement if needed
        document.getElementById("appn-short-header").style.display = "none";
        document.getElementById("appn-header").style.display = "flex";
      };

      this.transitionCompleted = () => {
        // Implement if needed
        document.getElementById('global-loader-progresscircle').style.display = "none";
        const cardsss = document.querySelectorAll('.card');
        self.currentIndex(Math.floor(cardsss.length / 2));
        cardsss[self.currentIndex()].classList.add('active');
      };
    }
    return AnalysesViewModel;
  }
);
