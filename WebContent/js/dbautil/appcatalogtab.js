function appCatalog() {
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForAPPCatalog/" + "client",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#clientSelectedForAPPCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForAPPCatalog/" + "host_loc",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostLocationForAPPCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForAPPCatalog/" + "host_name",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostNameForAPPCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="'
							+ response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForAPPCatalog/" + "vm_name",
		type : "GET"

	}).done(
			function(response) {

				var s = $('#vmNameForAPPCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="'
							+ response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
}

$(document)
		.ready(
				function() {

					$("#appFilterButton")
							.click(
									function() {

										var clientNameVal = $(
												'#clientSelectedForAPPCatalog')
												.val();
										var hostLocationVal = $(
												'#hostLocationForAPPCatalog')
												.val();
										var hostNameVal = $(
												'#hostNameForAPPCatalog').val();
										var vmNameVal = $(
												'#vmNameForAPPCatalog').val();
										var myGrid = $('#APPCatalogGrid');
										if (myGrid)
											myGrid.jqGrid('GridUnload');
										initAPPCatalogPage(clientNameVal,
												hostLocationVal, hostNameVal,
												vmNameVal);
										var myGrid = jQuery("#APPCatalogGrid");
										if (loginUserName == "dbadmin"
												|| loginUserName == "v3ops") {
											$("#add_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
											$("#edit_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
											$("#del_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
										} else {
											$("#add_" + myGrid[0].id).addClass(
													'ui-state-disabled');
											$("#edit_" + myGrid[0].id)
													.addClass(
															'ui-state-disabled');
											$("#del_" + myGrid[0].id).addClass(
													'ui-state-disabled');
										}
										myGrid.jqGrid("setFrozenColumns");
									});

					$("#appResetButton")
							.click(
									function() {
										$('#clientSelectedForAPPCatalog')[0].selectedIndex = 0;
										$('#hostLocationForAPPCatalog')[0].selectedIndex = 0;
										$('#hostNameForAPPCatalog')[0].selectedIndex = 0;
										$('#vmNameForAPPCatalog')[0].selectedIndex = 0;
										var myGrid = $('#APPCatalogGrid');
										if (myGrid)
											myGrid.jqGrid('GridUnload');
										initAPPCatalogPage("ALL", "ALL", "ALL",
												"ALL");
										var myGrid = jQuery("#APPCatalogGrid");
										if (loginUserName == "dbadmin"
												|| loginUserName == "v3ops") {
											$("#add_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
											$("#edit_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
											$("#del_" + myGrid[0].id)
													.removeClass(
															'ui-state-disabled');
										} else {
											$("#add_" + myGrid[0].id).addClass(
													'ui-state-disabled');
											$("#edit_" + myGrid[0].id)
													.addClass(
															'ui-state-disabled');
											$("#del_" + myGrid[0].id).addClass(
													'ui-state-disabled');
										}
										myGrid.jqGrid("setFrozenColumns");
									});
					
					$('#hostLocationForAPPCatalog').change(		
							function() {
								$("#appFilterButton").trigger( "click" );
					});
					$('#hostNameForAPPCatalog').change(		
							function() {
								$("#appFilterButton").trigger( "click" );
					});
					$('#clientSelectedForAPPCatalog').change(		
							function() {
								$("#appFilterButton").trigger( "click" );
					});
					$('#vmNameForAPPCatalog').change(		
							function() {
								$("#appFilterButton").trigger( "click" );
					});
					
				});