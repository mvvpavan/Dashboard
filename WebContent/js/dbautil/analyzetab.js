function initAnalyzePage() {
	$("#DBAnalyzeGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBAnalyzeLogList',
						datatype : "json",
						colNames : [ '  Client ', ' Connect String',
								' Analyze Freq ', ' Analyze Start Time',
								' Analyze End Time', 'Requested By ',
								' Email Notification', 'Delete Statistics ' ],

						colModel : [
								{
									name : 'client',
									index : 'client',
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
										dataUrl : "rest/DBAUtilRestService/getClientList",
										buildSelect : function(data) {

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

											$(element).attr('id', 'client');
											$(element).change(function() {

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
										rowpos : 2,
										colpos : 1
									},
									editable : true,
									edittype : "select",
									editoptions : {
										dataInit : function(element) {
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id',
													'connectString');
										}
									}
								},
								{
									name : 'analyzeFreq',
									index : 'analyzeFreq',
									frozen : true,
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									width : 150,
									edittype : "select",
									editoptions : {
										value : "WEEKEND:WEEKEND;DAILY:DAILY;ADHOC:ADHOC",
										dataInit : function(element) {

											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.val();
																var startTimeEle = $('#startTime');

																if (val == 'ADHOC') {

																	startTimeEle
																			.prop(
																					"disabled",
																					false);
																		startTimeEle.prop("disabled", false);
																		var d = new Date();
																		currDate = d.getFullYear() + "-" +
																			    ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
																			    ("00" + d.getDate()).slice(-2) + " " + 
																			    ("00" + d.getHours()).slice(-2) + ":" + 
																			    ("00" + d.getMinutes()).slice(-2);
																		$('#startTime').datetimepicker('setTime',new Date());
																		$("#startTime").val(currDate);
																		
																} else {
																	startTimeEle.val("");
																	startTimeEle
																			.prop(
																					"disabled",
																					true);
																}
															});

										}
									}
								}, {

									name : 'startTime',
									index : 'startTime',
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
//													defaultValue : new Date(),
													height:35,	
													width : 250,
//													maxDate : new Date(2020, 0, 1),
													maxDate : '+5Y',
													showOn : 'focus'
											});
										}
									},
									width : 200,
									fixed : true
								}, {
									name : 'endTime',
									index : 'endTime',
									width : 180,
									shrinkToFit : false,
								}, {
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false,
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
									editable : true
								}, {
									name : 'delStat',
									index : 'delStat',
									width : 170,
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									formoptions : {
										rowpos : 6,
										colpos : 1
									},
									align : 'center',
									editable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbAnalyzePager',
						paging : true,
						height : '225',
						width : $("#tabs-4").width(),
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
						caption : "DB Analyze",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
						
	$("#DBAnalyzeGrid").jqGrid("setFrozenColumns");
	jQuery("#DBAnalyzeGrid").jqGrid('navGrid', '#dbAnalyzePager', {
		del : true,
		deltext : ' Delete ',
		add : true,
		addtext : ' Add ',
		edit : true,
		edittext : '  Edit  ',
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : '  Refresh ',
		beforeRefresh : function() {
			// alert('In beforeRefresh');
			jQuery("#DBAnalyzeGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBAnalyzeGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {
		// edit Analyze
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBAnalyze',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add Analyze
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBAnalyze',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		// afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete Analyze
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBAnalyze',
		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	}, {
		// search options
		width : 900,
		modal : true,
		jqModal : true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Find")','#dbAnalyzePager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbAnalyzePager').css('color','white');
		}
	}, {});
	
	jQuery('.ui-pg-div:contains("Refresh")', '#dbAnalyzePager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbAnalyzePager').css('color','white');
	});

	function callAfterSubmitForDelete(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			// alert(" Exception while deleting : "+
			// responseObj.message );
			return [ false, responseObj.message, '' ];

		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBAnalyzeGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {

		var myGrid = $('#DBAnalyzeGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');
		var analyzeFreqval = myGrid.jqGrid('getCell', selRowId, 'analyzeFreq');
		var startTimeEle = $('#startTime');

		if (analyzeFreqval == 'ADHOC') {
			startTimeEle.prop("disabled", false);
		} else {
			startTimeEle.prop("disabled", true);
		}
		
		loadSrcDBValues(clientValue, srcDBValue);
	}

	function callAfterShowFormForEdit(formid) {

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");

	}

	function callAfterSubmitForEdit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBAnalyzeGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {

		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
		var analyzeFreqEle = $('#analyzeFreq');

		var startTimeEle = $('#startTime');
		
		if (analyzeFreqEle == 'ADHOC') {
			startTimeEle.prop("disabled", false);
		} else {
			startTimeEle.prop("disabled", true);
		}
	}

	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBAnalyzeGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBAnalyzeGrid').getRowData(postdata.id);
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
		var urlVal = "rest/DBAUtilRestService/getEmailValueForClient/" + client;
		var emailEle = $('#email');
		emailEle.attr('name', 'email');
		emailEle.empty();
		$.ajax({
			url : urlVal
		}).done(function(response) {

			$('#email').val(response.email);
		});

	}

	function loadSrcDBValues(client, srcDBValue) {
		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			srcDBNameEle.append(option);

			srcDBNameEle.prop("disabled", true);

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