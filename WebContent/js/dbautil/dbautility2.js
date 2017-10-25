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
					$
							.ajax({
								url : "rest/DBAUtilRestService/getClientList",
								type : "GET"

							})
							.done(
									function(response) {

										var s = $('#clientName');
										var options = $("<option value=''>Select</option>");
										s.append(options);
										for (var i = 0; i < response.length; i++) {
											options = $('<option value="'
													+ response[i] + '">'
													+ response[i] + '</option>');
											s.append(options);
										}
									});

					$.ajax({
						url : "rest/DBAUtilRestService/getLastReportGenDate",
						type : "GET"

					}).done(function(response) {

						$('#dbReportGeneratedDate').text(response.date);
					});

					$.ajax(
									{
										url : "rest/DBAUtilRestService/getLastStorageReportGenDate",
										type : "GET"

									}).done(
									function(response) {

										$('#storageReportGeneratedDate').text(
												response.date);
									});

					$
							.ajax(
									{
										url : "rest/DBAUtilRestService/getStorageReportGeneratedDateList",
										type : "GET"

									})
							.done(
									function(response) {

										var s = $('#selectedStorageReportDate');
										var options;
										for (var i = 0; i < response.length; i++) {
											options = $('<option value="'
													+ response[i] + '">'
													+ response[i] + '</option>');
											s.append(options);
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

					var urlVal = "rest/DBAUtilRestService/getUserName";

					$.ajax({
						url : urlVal,
						type : "GET"

					}).done(function(data) {

						loginUserName = data.userName;
						// alert("loginUserName :"+loginUserName);
						$('#loginAs').text(loginUserName);
						if (loginUserName != "dbadmin") {
//							$($("#menuDiv").find('#storageReports')).hide(); // if you know id of list element, you can find using it's id
							$($("#menuDiv").find("li")[6]).hide(); // storageReports 
							$($("#tabs").find("li")[13]).hide(); // create db
							$($("#tabs").find("li")[14]).hide(); // drop db
							
						}
						if(loginUserName == "v3ops") {
							 $($("#tabs").find("li")[8]).hide(); // os to ih
							 $($("#tabs").find("li")[9]).hide(); // ih to ih
							 $($("#tabs").find("li")[15]).hide(); // cpu rsrc mgr
						 }
						
						if(loginUserName == "demo") {
							$($("#tabs").find("li")[14]).hide(); // drop db
							
//							$($("#menuDiv").find('#storageReports')).show();
							$($("#menuDiv").find("li")[6]).show(); // storageReports 
							$($("#tabs").find("li")[13]).show(); // create db	
							 
						 }
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
});
