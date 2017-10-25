function initSVNComparisonPage() {
	$("#DBSVNComparisonGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBSVNComparisonLogList',
						datatype : "json",
						colNames : [ ' SVN Version ', '  Client ',
								' Connect String', ' Start Time', ' Status',
								'Requested By ', 'Requested Time',
								' Email Notification', 'SVN DB Comparison ID' ],
						colModel : [
								{
									name : 'svnVersion',
									index : 'svnVersion',
									width : 150,
									frozen : true,
									editrules : {
										required : true
									},
									fixed : true,
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 1,
										colpos : 1
									},
									editoptions : {
										dataUrl : "rest/DBAUtilRestService/getSVNVersionList",
										buildSelect : function(data) {
											debugger;
											var response = jQuery
													.parseJSON(data);
											var s = '<select id="svnVersion" name="svnVersion">';
											var options = "<option value=''>Select</option>";
											for (var i = 0; i < response.length; i++) {
												options = options
														+ '<option value="'
														+ response[i] + '">'
														+ response[i]
														+ '</option>';
											}
											s = s + options + "</select>";

											return s;
										},

										dataInit : function(element) {
											debugger;

											$(element).attr('id', 'svnVersion');

										}

									}
								},
								{
									name : 'client',
									index : 'client',
									frozen : true,
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 2,
										colpos : 1
									},
									editoptions : {
										dataUrl : "rest/DBAUtilRestService/getClientList",
										buildSelect : function(data) {
											debugger;
											var response = jQuery
													.parseJSON(data);
											var s = '<select id="client" name="client">';
											var options = "<option value=''>Select</option>";
											for (var i = 0; i < response.length; i++) {
												options = options
														+ '<option value="'
														+ response[i] + '">'
														+ response[i]
														+ '</option>';
											}
											s = s + options + "</select>";

											return s;
										},

										dataInit : function(element) {
											debugger;

											$(element).attr('id', 'client');
											$(element).change(function() {
												debugger;
												var val = $(element).val();
												loadSrcDBValues(val);
												loadEmailValues(val);
											});

										}

									}
								},
								{
									name : 'connectString',
									index : 'connectString',
									width : 150,
									frozen : true,
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									edittype : "select",
									editoptions : {
										dataInit : function(element) {
											// debugger;
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id',
													'connectString');

										}
									}
								}, {

									name : 'startTime',
									index : 'startTime',
									// editrules : {
									// required : true
									// },
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
													
													dateFormat : 'yy-mm-dd',
													timeFormat : 'HH:mm',
													minDate : new Date(),
													autoSize : false,
													defaultValue : new Date(),
													height : 35,
													width : 250,
													maxDate : '+5Y',
													showOn : 'focus'

											});
										}
									},
									width : 200,
									fixed : true
								}, {
									name : 'status',
									index : 'status',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								}, {
									name : 'insertedBy',
									index : 'insertedBy',
									width : 180,
									shrinkToFit : false,
								// align : 'center'
								}, {
									name : 'insertedDate',
									index : 'insertedDate',
									width : 180,
									shrinkToFit : false,
								// align : 'center'
								}, {
									name : 'email',
									index : 'email',
									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										rowpos : 5,
										colpos : 1
									},
									editrules : {
										required : true
									},
									// align : 'center',
									editable : true
								}, {
									name : 'svnDBComparisonID',
									index : 'svnDBComparisonID',
									hidden : true,
									width : 170
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbSVNComparisonPager',
						paging : true,
						height : '225',
						width : $("#tabs-8").width(),
						// ondblClickRow : function(rowId) {
						// var rowData = jQuery(this).getRowData(rowId);
						// var svnVersion = rowData['svnVersion'];
						// var svnDBComparisonID = rowData['svnDBComparisonID'];
						//
						// svnReportInfo.svnVersion = svnVersion;
						// svnReportInfo.svnDBComparisonID = svnDBComparisonID;
						// svnReportInfo.isHist = "N";
						// debugger;
						// // alert('svnVersion : '+ svnVersion + '
						// // ,svnDBComparisonID : '+svnDBComparisonID);
						//
						// var grid = $('#DBSVNComparisonReportDetailsGrid');
						// if (grid)
						// grid.jqGrid('GridUnload');
						// var grid1 = $('#DBSVNComparisonReportSummaryGrid');
						// if (grid1)
						// grid1.jqGrid('GridUnload');
						// svnReportDialog.dialog("open");
						// },
						modal : true,
						jqModal : true,
						loadonce : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						reloadAfterSubmit : true,
						scroller : true,
						caption : "DB SVN Comparison",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[9],'y');
						}
					});

	$("#DBSVNComparisonGrid").jqGrid("setFrozenColumns");
	jQuery("#DBSVNComparisonGrid").jqGrid('navGrid', '#dbSVNComparisonPager', {
		del : true,
		deltext : ' Delete ',
		add : true,
		addtext : ' Add ',
		edit : true,
		edittext : '  Edit  ',
		search : false,
		refresh : true,
		refreshtext : '  Refresh ',
		beforeRefresh : function() {
			jQuery("#DBSVNComparisonGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBSVNComparisonGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {
		// edit SVNComparison
		width : 850,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBSVNComparison',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add SVNComparison
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBSVNComparison',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterAdd : true,

		beforeShowForm : callBeforeShowFormForAdd,
		// afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete SVNComparison
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBSVNComparison',

		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	});

	jQuery("#DBSVNComparisonGrid")
			.navGrid('#dbSVNComparisonPager', {})
			.navButtonAdd(
					'#dbSVNComparisonPager',
					{
						caption : "Report",
						buttonicon : "ui-icon-extlink",
						onClickButton : function() {
							debugger;
							var rowKey = jQuery("#DBSVNComparisonGrid").jqGrid(
									'getGridParam', "selrow");
							if (rowKey) {
								var rowData = jQuery("#DBSVNComparisonGrid")
										.getRowData(rowKey);
								var svnVersion = rowData['svnVersion'];
								var dbName = rowData['connectString'];
								var svnDBComparisonID = rowData['svnDBComparisonID'];

								svnReportInfo.svnVersion = svnVersion;
								svnReportInfo.svnDBComparisonID = svnDBComparisonID;
								svnReportInfo.isHist = "N";
								svnReportInfo.databaseName = dbName;
								
								// alert('svnVersion : '+ svnVersion + '
								// ,svnDBComparisonID
								// : '+svnDBComparisonID);

								var grid = $('#DBSVNComparisonReportDetailsGrid');
								if (grid)
									grid.jqGrid('GridUnload');
								var grid1 = $('#DBSVNComparisonReportSummaryGrid');
								if (grid1)
									grid1.jqGrid('GridUnload');

								$("#svnReportDialogForm").dialog(
										'option',
										'title',
										'SVN to DB Comparison Report of SVN Version : '
												+ svnVersion
												+ ' and Database : ' + dbName);
								svnReportDialog.dialog("open");
								var outerwidth = $('#svnReportDialogForm').width()-10;
								var outerheight= $('#svnReportDialogForm').height()-350;
								$('#DBSVNComparisonReportDetailsGrid').setGridWidth(outerwidth);
								$('#DBSVNComparisonReportDetailsGrid').setGridHeight(outerheight);
								
								
							} else {
								$("#popupdialogForm").dialog("open");
							}
						},
						position : "last"
					});
	function callAfterSubmitForDelete(response, postdata) {
		debugger;
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			// alert(" Exception while deleting : "+
			// responseObj.message );
			return [ false, responseObj.message, '' ];

		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBSVNComparisonGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		debugger;

		var myGrid = $('#DBSVNComparisonGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');

		loadSrcDBValues(clientValue, srcDBValue);
		
		var startTime=$("#startTime").val()+"";
		if(new Date(startTime) < new Date()) {
			$("#startTime").datetimepicker('setTime',new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-" +
			    ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
			    ("00" + d.getDate()).slice(-2) + " " + 
			    ("00" + d.getHours()).slice(-2) + ":" + 
			    ("00" + d.getMinutes()).slice(-2);
			$("#startTime").val(currDate);
		}


	}

	function callAfterShowFormForEdit(formid) {

		debugger;
		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");

		var svnVersionEle = $('#svnVersion');
		svnVersionEle.attr("disabled", "disabled");

	}

	function callAfterSubmitForEdit(response, postdata) {
		debugger;
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBSVNComparisonGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {
		// debugger;

		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
		
		$("#startTime").datetimepicker('setTime',new Date());

	}

	function callAfterSubmitForAdd(response, postdata) {
		debugger;
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBSVNComparisonGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		// debugger;
		var rowdata = $('#DBSVNComparisonGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			connectString : rowdata.connectString,
			analyzeFreq : rowdata.analyzeFreq
		};
	}

	function loadEmailValues(client) {
		debugger;
		var urlVal = "rest/DBAUtilRestService/getEmailValueForClient/" + client;
		var emailEle = $('#email');
		emailEle.attr('name', 'email');
		emailEle.empty();
		$.ajax({
			url : urlVal
		}).done(function(response) {
			debugger;
			$('#email').val(response.email);
		});

	}

	function loadSrcDBValues(client, srcDBValue) {
		// debugger;
		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			srcDBNameEle.append(option);

			srcDBNameEle.prop("disabled", true);
			loadTrgtDBValues(undefined, undefined);

		} else {
			srcDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getClientDBList/" + client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				srcDBNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (srcDBValue) {
						if (data[i] == srcDBValue) {
							debugger;
							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);

					srcDBNameEle.append(option);
				}

			});
		}

	}

}