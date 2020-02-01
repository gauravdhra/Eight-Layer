$(window).resize(function(){
    var contentHeight = $('#main').height();
    $('#left-panel').css('min-height',contentHeight+100);
});
 // Date Range Picker
			// $("#from").datepicker({
			//     defaultDate: "+1w",
			//     changeMonth: true,
			//     numberOfMonths: 1,
			//     prevText: '<i class="fa fa-chevron-left"></i>',
			//     nextText: '<i class="fa fa-chevron-right"></i>',
			//     onClose: function (selectedDate) {
			//         $("#to").datepicker("option", "maxDate", selectedDate);
			//     }
		
			// });
			// $("#to").datepicker({
			//     defaultDate: "+1w",
			//     changeMonth: true,
			//     numberOfMonths: 1,
			//     prevText: '<i class="fa fa-chevron-left"></i>',
			//     nextText: '<i class="fa fa-chevron-right"></i>',
			//     onClose: function (selectedDate) {
			//         $("#from").datepicker("option", "minDate", selectedDate);
			//     }
			// });