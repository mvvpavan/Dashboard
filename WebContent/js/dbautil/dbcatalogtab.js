function dbCatalog(){
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForDBCatalog/" + "client",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#clientSelectedForDBCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForDBCatalog/" + "sid",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#sidForDBCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForDBCatalog/" + "host_loc",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostLocationForDBCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForDBCatalog/" + "host_name",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostNameForDBCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForDBCatalog/" + "vm_name",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#vmNameForDBCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
}

$(document)
		.ready(
				function() {
					
					$("#dbFilterButton").click(
							function() {

								var clientNameVal = $(
										'#clientSelectedForDBCatalog').val();
								var dbStatusVal = $('#dbStatus').val();
								var sidVal = $('#sidForDBCatalog').val();
								var hostLocationVal = $(
										'#hostLocationForDBCatalog').val();
								var hostNameVal = $('#hostNameForDBCatalog')
										.val();
								var vmNameVal = $('#vmNameForDBCatalog').val();
								var grid = $('#DBCatalogForDBAGrid');
								if (grid)
									grid.jqGrid('GridUnload');
								initDBCatalogPageForDBA(clientNameVal,
										dbStatusVal, sidVal, hostLocationVal,
										hostNameVal, vmNameVal);
								var myGrid = jQuery("#DBCatalogForDBAGrid");
								if (loginUserName == "dbadmin") {
									$("#add_" + myGrid[0].id).removeClass(
											'ui-state-disabled');
									$("#edit_" + myGrid[0].id).removeClass(
											'ui-state-disabled');
									$("#del_" + myGrid[0].id).removeClass(
											'ui-state-disabled');
								} else {
									$("#add_" + myGrid[0].id).addClass(
											'ui-state-disabled');
									$("#edit_" + myGrid[0].id).addClass(
											'ui-state-disabled');
									$("#del_" + myGrid[0].id).addClass(
											'ui-state-disabled');
								}
								myGrid.jqGrid("setFrozenColumns");
							});

					$("#dbResetButton")
							.click(
									function() {
										$('#clientSelectedForDBCatalog')[0].selectedIndex = 0;
										$('#dbStatus')[0].selectedIndex = 0;
										$('#sidForDBCatalog')[0].selectedIndex = 0;
										$('#hostLocationForDBCatalog')[0].selectedIndex = 0;
										$('#hostNameForDBCatalog')[0].selectedIndex = 0;
										$('#vmNameForDBCatalog')[0].selectedIndex = 0;
										var myGrid = $('#DBCatalogForDBAGrid');
										if (myGrid)
											myGrid.jqGrid('GridUnload');
										initDBCatalogPageForDBA("ALL", "ALL",
												"ALL", "ALL", "ALL", "ALL");
										var myGrid = jQuery("#DBCatalogForDBAGrid");
										if (loginUserName == "dbadmin") {
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
					
					$('#hostLocationForDBCatalog').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});
					$('#hostNameForDBCatalog').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});
					$('#vmNameForDBCatalog').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});
					$('#clientSelectedForDBCatalog').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});
					$('#sidForDBCatalog').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});
					$('#dbStatus').change(		
							function() {
								$("#dbFilterButton").trigger( "click" );
					});  
				
				});