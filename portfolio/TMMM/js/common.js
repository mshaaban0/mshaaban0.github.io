var darwLayout = function(filters){
	var docHeight = $(document).height();
			$('#container').height(docHeight - 81);
			$('body').height(docHeight);


	filters = false;


	layoutSettings_Outer = {
		
		west: {
			onclose_end:			function () { myLayout2.sizePane("east", 500); },
			onopen_start:			function () { myLayout2.sizePane("east", 200); }
		}
	,	east: {
			initClosed: filters
		}
	};

	


	 myLayout = $('#container').layout(),
	 	myLayout2 = $('#paddingWrapper').layout(layoutSettings_Outer),
	 	centerHeaderHeight = $('.center-header').outerHeight(),
	 	centerHeight = $('.ui-layout-center').height(),
	 	rightHeight = $('.ui-layout-pane-east').height(),
	 	sortHeight = $('.sort').height();

	myLayout2.sizePane("west", 272);

	myLayout2.addPinBtn( ".filter-control", "east");
	myLayout2.addPinBtn( ".toggle-bar", "west");


	$('.list1-con, .filters-container').jScrollPane({
		autoReinitialise: true
	});

	$('.list1-con,.jspContainer').css('height', (centerHeight - centerHeaderHeight - sortHeight - 1) + 'px');
	$('.filters-container').css('height', (rightHeight - 56) + 'px');
	
	
};



$(document).ready(function(){
	$('.has-tooltip').tooltip();

	var splitterControl ={

	hideFiltersArea : function(){
		myLayout2.hide( "east", openPane = false )
	},

	showFiltersArea : function(){
		myLayout2.show( "east", openPane = true )
	}

	};

	
	darwLayout();
	splitterControl.hideFiltersArea();

	leftSize = function(leftSize){
		myLayout2.sizePane("west", leftSize);
	};

	leftSize(272);//function rightSize

	rightSize = function(rightSize){
		myLayout2.sizePane("east", rightSize);
	};

	rightSize();


	leftHide = function(){
		myLayout2.hide( "west", openPane = true )
	};

	/*leftShow = function(){
		myLayout2.show( "west", openPane = false )
	};*/


	

	// leftHide();

	

	

	

	
	

	$(".filterCollapse").collapse();


	
	// check boxes toggle event
	$(document).on("click", ".check-btn", function(){ 
		var checkSpan = $(this).find("span"),
		checkBox = checkSpan.find('input[type="checkbox"]');
		checkSpan.toggleClass("checked");
		if(checkSpan.hasClass("checked"))
		{
			checkBox.prop("checked", true);
		}
		else
		{
			checkBox.prop("checked", false);
		}
	});
	
	function getFilterTag(value, text, returnContainer)
	{
		return '<span class="itemCon" data-return-container="' + returnContainer + '" data-filter-value="' + value + '">\
					<span class="itemName">' + text + '</span>\
					<span class="itemDelete">x</span>\
				  </span>';
	}
	// add filters
	$(document).on("click", "[data-filter-target] .check-btn", function(){
		var $this = $(this),
		targetCintainer = $this.parent("[data-filter-target]").data("filter-target"),
		checkBox = $this.find('input[type="checkbox"]'),
		labelText = $this.find("label").text(),
		returnContainer = "[data-id='" + $this.parent("[data-filter-target]").data("id") + "']",
		value = checkBox.prop("value"),
		html = getFilterTag(value, labelText, returnContainer);
		if(checkBox.is(":checked") && $(targetCintainer).find('[data-filter-value="' + value + '"]').length == 0)
		{
			$(targetCintainer).append(html);
		}
		else
		{
			$(targetCintainer).find('[data-filter-value="' + value + '"]').remove();
		}
	});
	
	// add filters
	$(document).on("click", "[data-return-container] .itemDelete", function(){
		var $this = $(this),
		parent = $this.parent(),
		returnContainer = parent.data("return-container"),
		value = parent.data("filter-value");
		$(returnContainer).find("input[value='" + value + "']").closest(".check-btn").trigger("click");
	});
	
	var myFunction = function(selectorName, selectedValue, selectedText)
	{
		return '<span data-return="' + selectorName + '" data-value="' + selectedValue + '" class="itemCon selected-item">\
			<span class="itemName">' + selectedText + '</span>\
			<span class="itemDelete remove-item">x</span>\
		</span>';
	}
	
	$(".auto-1").plusSearchPosition({isSingle: false,
		selectToOptions: {
			formatNoMatches: function(term) {
				return "<div class='select2-result-label'><span class='select2-match'></span>No matches found for <b>" + term + " </b></div>";
			  }
		},
		position: "leftCenter", "targetContainer": ".selected-assigned-to", "drawCallback": myFunction});

	$(document).on("click", "[data-return]", function(){
		var targetContainer = $($(this).data("return"));
		
		if(targetContainer.find("select").length)
		{
			targetContainer.find("select")
				.css({"position": "fixed", "top": ( $(this).offset().top + 20 ) + "px", "left": $(this).offset().left + "px"})
				.addClass("belowItem").data("elementName", $(this).data("value"));
				console.log("button click: " + targetContainer.find("select").hasClass("belowItem"));
			targetContainer.find("select").select2().select2("open");
		}
		else($($(this).data("return")).find("select").length)
		{
			
		}
	});
	$('.pop-this-over').popover({ 
    	html : true,
    	title: function() {
      		return $(".popover-head").html();
    	},
    	content: function() {
    	  return $(".popover-content").html();
    	}
	});



});
//End of documentReady



// Bind to the resize event of the window object
$('.ui-layout-center').on("resize", function () {
    // Set .right's width to the window width minus 480 pixels
    resizeThing();
// Invoke the resize event immediately
}).resize();


