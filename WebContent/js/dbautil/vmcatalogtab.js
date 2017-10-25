function vmCatalog() {
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForVMCatalog/" + "client",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#clientSelectedForVMCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForVMCatalog/" + "host_loc",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostLocationForVMCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});

	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForVMCatalog/" + "host_name",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostNameForVMCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForVMCatalog/" + "host_name",
		type : "GET"
	}).done(
			function(response) {
				var s = $('#hostNameForVMCatalog');
				var options = $("<option value='ALL'>ALL</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});	
	
	$.ajax({
		url : "rest/DBAUtilRestService/getFilterListForVMCatalog/" + "vm_name",
		type : "GET"

	}).done(
			function(response) {
				var s = $('#vmNameForVMCatalog');
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
		url : "rest/DBAUtilRestService/getUserName",
		type : "GET"

	}).done(
			function(data) {
				loginUserName = data.userName;
				var vmTypeForVersion;
				if (loginUserName == "v3ops") {
					vmTypeForVersion = "APP";
				} else {
					vmTypeForVersion = "DB";
				}
				getVersionFilter(vmTypeForVersion);
				getIPsForFilter(vmTypeForVersion);
			});
	
	$("#vmType").on('change', function(){
		var vmTypeForVersion = $("#vmType").val();
		
		$('#versionForVMCatalog').empty();
		getVersionFilter(vmTypeForVersion);
		
		$('#vmIP').empty();
		getIPsForFilter(vmTypeForVersion);
	});
	
}

function getVersionFilter(vmTypeForVersion) {
	$.ajax(
			{
				url : "rest/DBAUtilRestService/getVersionFilterListForVMCatalog/"
						+ vmTypeForVersion,
				type : "GET"

			})
	.done(
			function(response) {

				var s = $('#versionForVMCatalog');
				s.empty();
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

function getIPsForFilter(vmTypeForVersion) {
	$
	.ajax(
			{
				url : "rest/DBAUtilRestService/getIPsFilterListForVMCatalog/"
						+ vmTypeForVersion,
				type : "GET"

			})
	.done(
			function(response) {

				var s = $('#vmIP');
				s.empty();
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
					
					$("#vmFilterButton").click(
							function() {

								var clientNameVal = $(
										'#clientSelectedForVMCatalog').val();
								var hostLocationVal = $(
										'#hostLocationForVMCatalog').val();
								var hostNameVal = $('#hostNameForVMCatalog')
										.val();
								var vmNameVal = $('#vmNameForVMCatalog').val();
								var vmTypeVal = $('#vmType').val();
								var versionVal = $('#versionForVMCatalog').val();
								var vmIPVal = $('#vmIP').val();
								
								var myGrid = $('#VMCatalogForDBAGrid');
								if (myGrid)
									myGrid.jqGrid('GridUnload');
								initVMCatalogPage(clientNameVal,
										hostLocationVal, hostNameVal,
										vmNameVal, vmTypeVal, versionVal, vmIPVal);
								var myGrid = jQuery("#VMCatalogForDBAGrid");
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

					$("#vmResetButton")
							.click(
									function() {
										var vMTypeval;
										$('#clientSelectedForVMCatalog')[0].selectedIndex = 0;
										$('#hostLocationForVMCatalog')[0].selectedIndex = 0;
										$('#hostNameForVMCatalog')[0].selectedIndex = 0;
										$('#vmNameForVMCatalog')[0].selectedIndex = 0;
										 if (loginUserName == "v3ops") {
												vMTypeval = 'APP';
												$('#vmType')[0].selectedIndex = 1;
											} else {
												vMTypeval = 'DB';
												$('#vmType')[0].selectedIndex = 0;
											}
										 $('#versionForVMCatalog')[0].selectedIndex = 0;
										 $('#vmIP')[0].selectedIndex = 0;

										var myGrid = $('#VMCatalogForDBAGrid');
										if (myGrid)
											myGrid.jqGrid('GridUnload');
										initVMCatalogPage("ALL", "ALL",
												"ALL", "ALL", vMTypeval, "ALL", "ALL");
										var myGrid = jQuery("#VMCatalogForDBAGrid");
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
					
					$('#hostLocationForVMCatalog').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					$('#hostNameForVMCatalog').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					$('#vmType').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					$('#vmIP').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					$('#clientSelectedForVMCatalog').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					$('#vmNameForVMCatalog').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					}); 
					$('#versionForVMCatalog').change(		
							function() {
								$("#vmFilterButton").trigger( "click" );
					});
					  
				});