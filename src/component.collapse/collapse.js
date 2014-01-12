$(function(){

	// Add click
	$('.sa-collapse .sa-click').click(function(){

		$(this).parents('.sa-collapse').find('.sa-content').collapse('toggle');

	});

	// Add listeners
	$('.sa-collapse .sa-content').on('hide.bs.collapse',function(){

  		$(this).parents('.sa-collapse').removeClass('active');

	}).on('show.bs.collapse',function(){

  		$(this).parents('.sa-collapse').addClass('active');

	});

	// Add BS collapse class
	$('.sa-collapse .sa-content').each(function(){

		$(this).addClass('collapse');

	});

  // Check for collapses starting open
  $('.sa-collapse.active .sa-content').each(function(){

    $(this).addClass('in');

  });

});
