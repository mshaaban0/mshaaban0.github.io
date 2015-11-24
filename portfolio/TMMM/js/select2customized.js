$.fn.plusSearchPosition = function(options, callback)
{
	var options = options || {},
		isSingle = options.isSingle ? options.isSingle : false,
		isAjax = ( options.selectToOptions && options.selectToOptions.ajax )? true : false,
		containerName = $(this),
		SelectList =  isAjax ? containerName : containerName.find("select"),
		selectionsContainer = !isAjax ? containerName.find(".selections") : containerName.prevAll(".selections"),
		selectToOptions = options.selectToOptions || {},
		lookupContainer = isAjax ? containerName.parent("div") : containerName,
		position = options.position ? options.position : "right",
		targetContainer = options.targetContainer ? $(options.targetContainer) : false,
		selectorName = containerName.selector;
		drawCallback = options.drawCallback ? options.drawCallback : false;
		
	var generateItemTag = function(e)
	{
		var temptargetContainer = targetContainer ? targetContainer : selectionsContainer;
		
		if(isSingle)
		{
			var expression = '';
			if(targetContainer)
			{
				expression = '[data-return="' + selectorName + '"]';
			}
			if(temptargetContainer.find(".selected-item" + expression).length == 0)
			{
				if(isAjax)
				{
					var ajaxobject = e.object,
					selectedValue = ajaxobject.id,
					selectedText = ajaxobject.name;
				}
				else
				{
					var selectedValue = e.val,
						selectedOption = SelectList.find("option[value='" + selectedValue + "']"),
						selectedText = selectedOption.text();
					selectedOption.replaceWith("<x_option value='" + selectedValue + "'>" + selectedText + "</x_option>");
				}
				
				if(drawCallback != false)
				{
					temptargetContainer.append( drawCallback(selectorName, selectedValue, selectedText) );
				}
				else
				{
					temptargetContainer.append("<span data-return='" + selectorName + "' class='selected-item selected-item-default' data-value='" + selectedValue + "'><i class='remove-item'>&times;</i><b class='item-text'>" + selectedText + "</b></span>");
				}
			}
			
			lookupContainer.find(".add-item").hide();
		}
		else
		{
			if(isAjax)
			{
				var ajaxobject = e.object,
					selectedValue = ajaxobject.id,
					selectedText = ajaxobject.name;
			}
			else
			{
				var selectedValue = e.val,
					selectedOption = SelectList.find("option[value='" + selectedValue + "']"),
					selectedText = selectedOption.text();
				selectedOption.replaceWith("<x_option value='" + selectedValue + "'>" + selectedText + "</x_option>");
			}
			
			if(drawCallback != false)
			{
				if( SelectList.hasClass("belowItem") )
				{
					temptargetContainer.find( "[data-value='" + SelectList.data("elementName") + "']" ).replaceWith( ( drawCallback(selectorName, selectedValue, selectedText) ) );
					selectedOption = SelectList.find("x_option[value='" + SelectList.data("elementName") + "']"),
					selectedText = selectedOption.text();
					selectedOption.replaceWith("<option value='" + SelectList.data("elementName") + "'>" + selectedText + "</option>");
					SelectList.removeClass("belowItem").removeAttr("elementName");
				}
				else
				{
					temptargetContainer.append( drawCallback(selectorName, selectedValue, selectedText) );
				}
			}
			else
			{
				temptargetContainer.append("<span data-return='" + selectorName + "' class='selected-item selected-item-default' data-value='" + selectedValue + "'><i class='remove-item'>&times;</i><b class='item-text'>" + selectedText + "</b></span>");
			}
				
			lookupContainer.find(".add-item").show();
		}
	} // End generate tag
	
	SelectList.select2(selectToOptions)
	.on("select2-selecting", function(e) {
		generateItemTag(e);
		// console.log($(this).hasClass("belowItem"));
		// data("elementName")).length 
	});
	
	if(!isAjax)
	{
		containerName.find(".add-item").on("click", function(){
			switch(position)
			{
				case "leftCenter":
					SelectList.css({"position": "fixed", "left": $(this).offset().left  - 220 + "px", 
						"top": $(this).offset().top - parseInt( SelectList.find("option").length * 27 / 2 ) + "px"});
					break;
				case "rightCenter":
					var menuHeight = parseInt( SelectList.find("option").length * 27 / 2 );
					SelectList.css({"position": "fixed", "top": $(this).offset().top - (menuHeight > 117 ? 117 : menuHeight) + "px",
						"left": ($(this).offset().left + 20) + "px"});
				
					if( ( $(window).width() - ($(this).offset().left + 225) ) < 0 )
					{
						SelectList.css({"left": ($(this).offset().left - 200) + "px", "top": ( $(this).offset().top + 20 ) + "px"});
					}
					console.log( parseInt( SelectList.css("top") ) );
					if( parseInt( SelectList.css("top") ) < 0 )
					{
						SelectList.css({"position": "fixed", "top": "0px"});
					}
					break;
			}
			SelectList.select2(selectToOptions);
			SelectList.select2("open");
		});
	}
	else
	{
		containerName.parent("div").find(".add-item").on("click", function(){
			switch(position)
			{
				case "leftCenter":
					SelectList.prevAll(".select2-container").css({"position": "fixed", "left": $(this).offset().left  - 220 + "px", 
						"top": $(this).offset().top - 117+ "px"});
					if( (($(this).offset().left - 225) ) < 0 )
					{
						SelectList.prevAll(".select2-container").css({"position": "fixed", "left": $(this).offset().left + "px", 
						"top": $(this).offset().top + 20+ "px"});
					}
					if( parseInt( SelectList.prevAll(".select2-container").css("top") ) < 0 )
					{
						SelectList.prevAll(".select2-container").css("top", "0")
					}
					break;
				case "rightCenter":
					SelectList.prevAll(".select2-container").css({"position": "fixed", "top": $(this).offset().top - 117+ "px",
					"left": ($(this).offset().left + 20) + "px"});
					if( ( $(window).width() - ($(this).offset().left + 225) ) < 0 )
					{
						SelectList.prevAll(".select2-container").css({"left": ($(this).offset().left - 200) + "px", 
						"top": ( $(this).offset().top + 20 ) + "px"});
					}
					
					if( parseInt( SelectList.prevAll(".select2-container").css("top") ) < 0 )
					{
						SelectList.prevAll(".select2-container").css("top", "0")
					}
					break;						
			}
			SelectList.select2("open");
		});
	}
}

$(document).on("click", ".remove-item", function(e){
	var $this = $(this),
		container = $this.closest(".selected-item"),
		returnArea = container.data("return");
		
		selectList = $(returnArea).find("select"),
		value = $this.closest(".selected-item").data("value"),
		tempOption = selectList.find("x_option[value='" + value + "']"),
		text = tempOption.text();
		tempOption.replaceWith("<option value='" + value + "'>" + text + "</option>");
		
	if( $(returnArea).find(".add-item").length )
	{
		$(returnArea).find(".add-item").show();	
	}
	else
	{
		$(returnArea).closest(".auto-complete").find(".add-item").show();
	}
	container.remove();
	e.stopPropagation()
});