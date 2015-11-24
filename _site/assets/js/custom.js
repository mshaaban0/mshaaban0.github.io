var appMaster = {
	waves: function(){
		/*
		 * Demo of https://github.com/isuttell/sine-waves
		 */
		var waves = new SineWaves({
		  el: document.getElementById('waves'),
		  
		  speed: 5,
		  
		  width: function() {
		    return $(window).width();
		  },
		  
		  height: function() {
		    return $(window).height();
		  },
		  
		  waves: [{}], // Default Wave
		  
		  set1: [
		    {
		      timeModifier: 4,
		      lineWidth: 1,
		      amplitude: -25,
		      wavelength: 25
		    },
		    {
		      timeModifier: 2,
		      lineWidth: 1,
		      amplitude: -50,
		      wavelength: 50
		    },
		    {
		      timeModifier: 1,
		      lineWidth: 1,
		      amplitude: 100,
		      wavelength: 100
		    },
		    {
		      timeModifier: 0.5,
		      lineWidth: 1,
		      amplitude: -200,
		      wavelength: 200
		    },
		    {
		      timeModifier: 0.25,
		      lineWidth: 1,
		      amplitude: -400,
		      wavelength: 400
		    }
		  ],
		  
		  set2: [
		    {
		      lineWidth: 3,
		      amplitude: 150,
		      wavelength: 200,
		      segmentLength: 20
		    },
		    {
		      lineWidth: 2,
		      amplitude: 150,
		      wavelength: 100
		    },
		    {
		      lineWidth: 1,
		      amplitude: -150,
		      wavelength: 50,
		      segmentLength: 10
		    },
		    {
		      lineWidth: 0.5,
		      amplitude: -100,
		      wavelength: 100,
		      segmentLength: 10
		    }
		  ], 
		  
		  // Called on load
		  initialize: function (){
			  this.options.switchToSet.call(this, 'set1');
		     var self = this;
		     $('#example1').click(function() {
		       self.options.switchToSet.call(self, 'set1');
		     });
		     $('#example2').click(function() {
		       self.options.switchToSet.call(self, 'set2');
		     });
		  },
		  
			switchToSet: function(set) {
		    this.waves = this.options[set];
		    this.options.resizeEvent.call(this);
		  },
		  
		  // Called on window resize
		  resizeEvent: function() {
		    var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
		    gradient.addColorStop(0,"rgba(186,200,227,0)");
		    gradient.addColorStop(0.5,"rgba(186,200,227,.06)");
		    gradient.addColorStop(1,"rgba(255, 255, 255, 0)");
		    
		    var index = -1;
		    var length = this.waves.length;
			  while(++index < length){
		      this.waves[index].strokeStyle = gradient;
		    }
		    
		    // Clean Up
		    index = void 0;
		    length = void 0;
		    gradient = void 0;
		  }
		});
	},
	commonPlayground: function() {
		$('[data-toggle="tooltip"]').tooltip();

		$('.navbar-toggle').on('click', function(){
			$(this).toggleClass('animate');
		});
	}
}