var svnReportDialog;
var loginUserName;
var svnReportInfo = {};
$(document)
		.ready(
				function() {

					$(document)
							.ajaxSuccess(
									function(event, xhr, settings) {

										if (typeof xhr != "undefined") {
											if (typeof xhr.responseJSON!= "undefined") {
											if (xhr.responseJSON.status === "SessionExpired") {
												window.location
														.assign("/dbautility/connect.html");
											}
											}
										}
									});
					$("#tabs").tabs().addClass(
							"ui-tabs-vertical ui-helper-clearfix");
					$("#tabs li").removeClass("ui-corner-top").addClass(
							"ui-corner-left");
					$("#menu-1").menu();

					$.ajax({
						url : "rest/DBAUtilRestService/getUserName",
						type : "GET"

					}).done(function(data) {
						debugger;
						loginUserName = data.userName;
						if(loginUserName!= "undefined") {
							$('#loginAs').text(loginUserName);
							isNewUser(loginUserName);
							hideTabs(loginUserName);
						}
					});
					
					initRefreshPage();
					initRefreshHistoryPage();

					$
							.sessionTimeout({
								warnAfter : 900000, // 15 minutes
								redirAfter : 1200000, // 20 minutes
								// warnAfter : 60000, // 15 minutes
								// redirAfter : 70000, // 20 minutes
								logoutUrl : 'rest/DBAUtilRestService/logout',
								redirUrl : 'rest/DBAUtilRestService/logout',
								keepAliveUrl : 'rest/DBAUtilRestService/keepSessionAlive',
								keepAliveAjaxRequestType : 'GET'
							});

					svnReportDialog = $("#svnReportDialogForm").dialog({
						autoOpen : false,
						height : 630,
						width : $("#tabs-8").width()+40,
						modal : true,
						resize: function() {
							var outerwidth = $('#svnReportDialogForm').width()-10;
							var outerheight= $('#svnReportDialogForm').height()-350;
							$('#DBSVNComparisonReportDetailsGrid').setGridWidth(outerwidth);
							$('#DBSVNComparisonReportDetailsGrid').setGridHeight(outerheight);
						},
						close : function() {
							svnReportDialog.dialog("close");
							$('#svnDBComparisonReportType')[0].selectedIndex = 0;
						}
					});
					
					$('#clientName')
							.change(
									function() {

										var val = $('#clientName').val();
										$
												.ajax(
														{
															url : "rest/DBAUtilRestService/getEmailValueForClient/"
																	+ val,
															type : "GET"
														})
												.done(
														function(response) {

															$('#emailVal')
																	.val(
																			response.email);
														});
									});

					$('#svnDBComparisonReportType')
							.change(
									function() {

										$
												.ajax()
												.done(
														function(response) {

															var grid = $('#DBSVNComparisonReportDetailsGrid');
															if (grid)
																grid
																		.jqGrid('GridUnload');
															var grid1 = $('#DBSVNComparisonReportSummaryGrid');
															if (grid1)
																grid1
																		.jqGrid('GridUnload');
															initSVNComparisonReportDetailsPage(
																	$(
																			'#svnDBComparisonReportType')
																			.val(),
																	svnReportInfo.svnVersion,
																	svnReportInfo.svnDBComparisonID,
																	svnReportInfo.isHist,
																	svnReportInfo.databaseName);
															initSVNComparisonReportSummaryPage(
																	$(
																			'#svnDBComparisonReportType')
																			.val(),
																	svnReportInfo.svnVersion,
																	svnReportInfo.svnDBComparisonID,
																	svnReportInfo.isHist);

														});
									});

					popupdialog = $("#popupdialogForm").dialog({
						autoOpen : false,
						height : 110,
						width : 220,
						modal : true,
						close : function() {
							popupdialog.dialog("close");
						}
					});

					$("#logout1").click(function() {

						$.ajax({
							url : "rest/DBAUtilRestService/logout",
							type : "GET"

						}).done(function(data) {

							if (data.status == "Success") {
							} else {
								$("#loginErrorMessage").text(data.message);
							}
						});
					});

					 $("#createDB_memory").spinner({
						 step: 512, 
			             min: 1024, 
			             max: 4096
					 });
					 
					 $("#createDB_startTime").datetimepicker({
						 	dateFormat : 'yy-mm-dd',
							timeFormat : 'HH:mm',
							minDate : new Date(),
							autoSize : false,
							defaultValue : new Date(),
							width : 250,
							maxDate : '+5Y',
							showOn : 'focus'
					});	
					 
					 $("#cpuResourceManager_startTime").datetimepicker({
						 	dateFormat : 'yy-mm-dd',
							timeFormat : 'HH:mm',
							minDate : new Date(),
					        maxDate: '+5Y',
					        autoSize : false,
							defaultValue : new Date(),
							width : 250,
							showOn: 'focus'
					 });
					 
					 $("#v3DataModel_scheduledTime").datetimepicker({
						 	dateFormat : 'yy-mm-dd',
							timeFormat : 'HH:mm',
							minDate : new Date(),
							autoSize : false,
							defaultValue : new Date(),
							width : 250,
							maxDate : '+5Y',
							showOn : 'focus'
					});	
					 
					 function hideTabs(currentUser){
							$.ajax({
								url : "rest/DBAUtilRestService/getDisabledTabIds/"+currentUser,
								type : "GET"
							}).done(function(response) {
								debugger;
								
								var menuTabs = ["menu_vmCatalog", "menu_dbCatalog", "menu_appCatalog", "menu_dbReports", "menu_storageReports",
								                "menu_password", "menu_email", "menu_conversionDB", "menu_managePermissions", "menu_releaseNotes", 
								                "menu_manageClients", "menu_createUser" ]
								
								for (var i = 0; i < response.length; i++) {
									if ($.inArray(response[i], menuTabs) != -1){
										var str1 = '#';
										var id = str1.concat(response[i]);
										$($('#menuDiv').find(id)).hide();
									} else {
										var str1 = '#';
										var id = str1.concat(response[i]);
										$($('#tabs').find(id)).hide();
									}
								}
							});
						}
					 
					 function isNewUser(currentUser) {
						 debugger;
						 $.ajax({
								url : "rest/DBAUtilRestService/isNewUser/"+currentUser,
								type : "GET"
							}).done(function(response) {
								if (response == 'Y') {
									$("#password").trigger( "click" );
								}
							});
					 }
					 
					 $("#releaseNotes_subVersion_1001").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1002").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1010").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1011").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1012").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1013").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1014").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 $("#releaseNotes_subVersion_1015").click(function(){
						 showOrHide('#'+$(this).attr('id')+'_div');
					 });
					 
					 function showOrHide(divId) {
						 if ($(divId).css('display') == 'none') {
							 $(divId).show();
					     } else {
					    	 $(divId).hide(); 
					     }
					 }
					 
});

function rowPopup(grid, rowId, skipArray, isMain) {
	var columnTitles = grid.jqGrid('getGridParam', 'colNames');
	var columnNames = grid.jqGrid("getGridParam", "colModel");
	var rowData = grid.getRowData(rowId);
	var skipArr = skipArray;
	var myTable='';
	var typeOfPopup='';
	var typeOfTable='';
	var title='';
	
	if(isMain=='y') {
		$("#mainPopup").empty();
		typeOfPopup="#mainPopup";
		typeOfTable="#mainTable";
		title="Row " + rowId + " Data";
		myTable = $('<table></table>').attr({id : "mainTable"});
	} else {
		$("#histPopup").empty();
		typeOfPopup="#histPopup";
		typeOfTable="#histTable";
		title="History Data of Row " + rowId;
		myTable = $('<table></table>').attr({id : "histTable"});
	}
	
	var headerRow = $('<tr></tr>').appendTo(myTable);
	$('<th></th>').text("Column Name").appendTo(headerRow);
	$('<th></th>').text("Value").appendTo(headerRow);

	var rows = columnTitles.length;
	var cols = 2;
	var insertRow = "false";

	for (var i = 1; i < rows; i++) {
		
		if (skipArr.length != 0) {
			if (skipArr.indexOf(i) == -1)
				insertRow = "true";
			else
				insertRow = "false";
		} else {
			insertRow = "true";
		}
		
		if (insertRow == "true") {
			var row = $('<tr></tr>').appendTo(myTable);
			for (var j = 0; j < cols; j++) {
				if (j == 0)
					$('<td></td>').text(columnTitles[i]).appendTo(row);
				else
					$('<td></td>').text("  " + rowData[columnNames[i].name]).appendTo(row);
			}
		}
	}
	
	myTable.appendTo(typeOfPopup);

	$(typeOfPopup).dialog({
		autoOpen : false,
		buttons : {
			"Ok" : function() {
				$(typeOfPopup).empty();
				$(typeOfPopup).dialog("close");
			}
		},
		close : function() {
			$(typeOfPopup).empty();
			$(typeOfPopup).dialog("close");
		}
	});

	$(typeOfPopup).dialog("open");

	var tblWidth = $(typeOfTable).width();
	var tblHeight = $(typeOfTable).height();
	$(typeOfPopup).dialog("option", "width", tblWidth + 35);
	$(typeOfPopup).dialog("option", "height", tblHeight + 135);
	$(typeOfPopup).dialog("option", "title", title);
	 
}
