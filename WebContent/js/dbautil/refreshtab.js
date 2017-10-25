function initRefreshPage() {
	$("#DBRefreshGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBRefreshLogList',
						datatype : "json",
						colNames : [ ' Source Client ', ' Source DB',
								'Target Client', ' Target DB',
								' Refresh Start Time', ' Status',
								'Backup Target DB', ' Recurring Refresh',
								' Recurring Frequency', ' Requested By',
								' Requested Date ', ' Email Notification ',
								' Skip Precheck ', 'rowid' ],

						colModel : [
								{
									name : 'srcClient',
									index : 'srcClient',
									frozen : true,
									width : 150,
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
										width : 250,
										dataUrl : "rest/DBAUtilRestService/getClientList",
										buildSelect : function(data) {

											var response = jQuery
													.parseJSON(data);
											var s = '<select id="srcClient" name="srcClient">';
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

											$(element).attr('id', 'srcClient');
											$(element).change(function() {
												debugger;
												var client = $(element).val();
												if (client) {

													loadEmailValues(client);
													loadSrcDBValues(client);

													 $("#trgClient").prop("disabled", false);
													 $("#trgClient").val(client);
													 $('#trgClient').trigger("change");

												}
											});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'srcDB',
									index : 'srcDB',
									frozen : true,
									width : 150,

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
										width : 250,
										dataInit : function(element) {
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id', 'srcDB');
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'trgClient',
									index : 'trgClient',
									frozen : true,
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 3,
										colpos : 1
									},
									editoptions : {
										width : 250,
										dataUrl : "rest/DBAUtilRestService/getClientList",
										buildSelect : function(data) {

											var response = jQuery
													.parseJSON(data);
											var s = '<select id="trgClient" name="trgClient">';
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

											$(element).attr('id', 'trgClient');
											$(element).change(
													function() {
														debugger;
														var clientVal = $('#trgClient').val();
														loadTrgtDBValuesForClient(clientVal);
													});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'trgtDB',
									index : 'trgtDB',
									frozen : true,
									width : 150,
									fixed : true,
									editrules : {
										required : true
									},
									editable : true,
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									edittype : "select",
									editoptions : {
										width : 250,
										dataInit : function(element) {
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id', 'trgtDB');
										}
									},
									fixed : true,
									sortable : true,
								},
								{
									name : 'rfrshStartTime',
									index : 'rfrshStartTime',
									editrules : {
										required : true
									},
									formoptions : {
										rowpos : 5,
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
												// height:20,
												width : 250,
												maxDate : '+5Y',
												showOn : 'focus'
											});

										}
									},
									width : 200,
									fixed : true
								},
								{
									name : 'status',
									index : 'status',
									width : 200
								},
								{
									name : 'bckupTrgtDB',
									index : 'bckupTrgtDB',
									width : 200,
									height : 80,
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									formoptions : {
										rowpos : 7,
										colpos : 1
									},
									editable : true,
								},
								{
									name : 'recurRefresh',
									index : 'recurRefresh',
									width : 180,
									height : 40,
									edittype : "checkbox",
									editable : true,
									formoptions : {
										rowpos : 9,
										colpos : 1
									},
									editoptions : {
										value : "Y:N",
										defaultValue : 'N',
										size : 10,
										dataInit : function(element) {
											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.prop(
																				'checked');
//																var recurFreqEle = $('#recurFreq');
																if (val) {
//																	recurFreqEle
//																			.spinner("enable");
//																	recurFreqEle
//																			.removeClass("disableField");
																	$('#tr_recurFreq',
																			"#FrmGrid_DBRefreshGrid")
																			.show();
																	
																} else {
//																	recurFreqEle
//																			.spinner("disable");
//																	recurFreqEle
//																			.addClass("disableField");
																	$('#tr_recurFreq',
																	"#FrmGrid_DBRefreshGrid")
																	.hide();

																}
															});
										}
									}
								},
								{
									name : 'recurFreq',
									index : 'recurFreq',
									width : 180,
									editable : true,
									formoptions : {
										rowpos : 10,
										colpos : 1
									},
									edittype : "custom",
									sorttype : 'integer',
									editoptions : {
										width : 6,
										allowNull : false,
										size : 5,
										custom_element : function(value,
												options) {
											if (!value) {
												value = 1;
											}
											return '<input type="text" id="recurFreq" value="'
													+ value + '"/>';
										},
										custom_value : function(elem,
												operation, value) {
											if (operation === "get") {
												return $(elem).val();
											} else if (operation === "set") {
												$(elem).val(value);
											} else {
												return "";
											}
										},
										dataInit : function(elem) {
											var recurFreqSpinner = $(elem)
													.find(">input").spinner({
														step : 1,
														min : 1,
														max : 30
													});
//											recurFreqSpinner.spinner("disable");
//											recurFreqSpinner
//													.addClass("disableField");
											recurFreqSpinner.size(15);
										}
									}
								}, {
									name : 'reqBy',
									index : 'reqBy',
									width : 170
								}, {
									name : 'reqDate',
									index : 'reqDate',
									width : 200
								}, {
									name : 'email',
									index : 'email',
									width : 270,
									formoptions : {
										rowpos : 6,
										colpos : 1
									},
									edittype : "textarea",
									editoptions : {
										rows : 1,
										cols : 30
									},
									editrules : {
										required : true
									},
									editable : true
								}, {
									name : 'skipPrecheck',
									index : 'skipPrecheck',
									width : 170,
									formoptions : {
										rowpos : 8,
										colpos : 1
									},
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									editable : true
								}, {
									name : 'rowID',
									index : 'rowID',
									editable : true,
									hidden : true
								} ],

						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbRefreshPager',
						paging : true,
						height : '225',
						width : $("#tabs-1").width(),
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						loadonce : true,
						gridview : true,
						shrinkToFit : false,
						reloadAfterSubmit : true,
						scroller : true,
						caption : "DB Refresh",
						beforeSelectRow : function(rowid) {

							var thisId = $.jgrid.jqID(this.id);

							var statusValue = $(this).jqGrid('getCell', rowid,
									'status');

							// you can use getCell or getRowData to examine the
							// content of
							// the selected row to decide whether the row is
							// editable or not
							if (statusValue == "REQUESTED"
									|| statusValue == "PRECHECK_COMPLETED") {
								// eneble the "Edit" button in the navigator
								$("#edit_" + thisId).removeClass(
										'ui-state-disabled');
								$("#del_" + thisId).removeClass(
										'ui-state-disabled');

							} else {
								// unselect previous selected row
								// disable the "Edit" and "Del" button in the
								// navigator
								$("#edit_" + thisId).addClass(
										'ui-state-disabled');
								$("#del_" + thisId).addClass(
										'ui-state-disabled');
							}
							return true; // allow selection or unselection
						},
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[14],'y');
						}
				});
					
	$("#DBRefreshGrid").jqGrid("setFrozenColumns");
	jQuery("#DBRefreshGrid").jqGrid('navGrid', '#dbRefreshPager', {

		del : true,
		deltext : 'Delete',
		add : true,
		addtext : 'Add',
		edit : true,
		edittext : 'Edit',
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#DBRefreshGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBRefreshGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {

		width : 970,
		// height : 370,
		recreateForm : true,
		modal : true,
		jqModal : true,
		url : 'rest/DBAUtilRestService/editDBRefresh',
		closeOnEscape : false,
		viewPagerButtons : false,
		closeAfterEdit : true,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {

		width : 970,
		// height : 350,
		url : 'rest/DBAUtilRestService/addDBRefresh',
		reloadAfterSubmit : true,
		modal : true,
		jqModal : true,
		recreateForm : true,
		closeOnEscape : false,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		width : 500,
		recreateForm : true,
		reloadAfterSubmit : true,
		closeAfterDelete : true,
		url : 'rest/DBAUtilRestService/deleteDBRefresh',
		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	});

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBRefreshGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			srcDB : rowdata.srcDB,
			trgtDB : rowdata.trgtDB,
			rowID : rowdata.rowID
		};
	}

	function callAfterSubmitForDelete(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			// alert(" Exception while deleting : "+ responseObj.message );
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		debugger;
		var myGrid = $('#DBRefreshGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');

		var srcClientValue = myGrid.jqGrid('getCell', selRowId, 'srcClient');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'srcDB');
		var trgtDBValue = myGrid.jqGrid('getCell', selRowId, 'trgtDB');
		var trgtClientValue = myGrid.jqGrid('getCell', selRowId, 'trgClient');

		var rfrshStartTime = $("#rfrshStartTime").val() + "";
		var recurRefreshVal = myGrid
				.jqGrid('getCell', selRowId, 'recurRefresh');
//		var recurFreqEle = $('#recurFreq');

		if (new Date(rfrshStartTime) < new Date()) {
			$("#rfrshStartTime").datetimepicker('setTime', new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-"
					+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
					+ ("00" + d.getDate()).slice(-2) + " "
					+ ("00" + d.getHours()).slice(-2) + ":"
					+ ("00" + d.getMinutes()).slice(-2);
			$("#rfrshStartTime").val(currDate);
		}

		if (recurRefreshVal == 'Y') {
//			recurFreqEle.spinner("enable");
//			recurFreqEle.removeClass("disableField");
			$('#tr_recurFreq', "#FrmGrid_DBRefreshGrid").show();
		} else {
//			recurFreqEle.spinner("disable");
//			recurFreqEle.addClass("disableField");
			$('#tr_recurFreq', "#FrmGrid_DBRefreshGrid").hide();
		}

		loadSrcDBValues(srcClientValue, srcDBValue);
		loadTrgtDBValues(trgtClientValue, srcDBValue, trgtDBValue);

	}
	
	function callAfterShowFormForEdit() {
		$("#srcClient").attr("disabled", "disabled");
		$("#trgClient").attr("disabled", "disabled");
		
		$.ajax({
			url : "rest/DBAUtilRestService/getUserName",
			type : "GET"

		}).done(function(data) {
			loginUserName = data.userName;
			if(loginUserName != "dbadmin" && loginUserName != "v3ops") 
			$('#tr_trgClient', "#FrmGrid_DBRefreshGrid").hide();
		});
	}

	function callAfterSubmitForEdit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {

		var srcDBNameEle = $('#srcDB');
		var trgClientNameEle = $('#trgClient');
		var trgtDBNameEle = $('#trgtDB');

		srcDBNameEle.prop("disabled", true);
		trgClientNameEle.prop("disabled", true);
		trgtDBNameEle.prop("disabled", true);

		$("#rfrshStartTime").datetimepicker('setTime', new Date());
		$('#tr_recurFreq', "#FrmGrid_DBRefreshGrid").hide();
		
	}
	
	function callAfterShowFormForAdd(formid) {
		$.ajax({
			url : "rest/DBAUtilRestService/getUserName",
			type : "GET"

		}).done(function(data) {
			loginUserName = data.userName;
			if(loginUserName != "dbadmin" && loginUserName != "v3ops") 
			$('#tr_trgClient', "#FrmGrid_DBRefreshGrid").hide();
		});
	} 
	
	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function loadSrcDBValues(client, srcDBValue) {
		debugger;
		var srcDBNameEle = $('#srcDB');
		srcDBNameEle.attr('name', 'srcDB');
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
			var urlVal = "rest/DBAUtilRestService/getSrcDBList/" + client;

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

	function loadTrgtDBValues(clientName, srcDBName, trgtDBValue) {
		var trgtDBNameEle = $('#trgtDB');
		trgtDBNameEle.attr('name', 'trgtDB');
		trgtDBNameEle.empty();
		if (!srcDBName) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			trgtDBNameEle.append(option);
			trgtDBNameEle.prop("disabled", true);
		} else {
			trgtDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getTrgtDBList/" + clientName
					+ "/" + srcDBName;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				trgtDBNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (trgtDBValue) {
						if (data[i] == trgtDBValue) {

							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);
					trgtDBNameEle.append(option);
				}
			});
		}

	}
	
	
	function loadTrgtDBValuesForClient(clientName) {
		var trgtDBNameEle = $('#trgtDB');
		trgtDBNameEle.attr('name', 'trgtDB');
		trgtDBNameEle.empty();
			trgtDBNameEle.prop("disabled", false);
			// var client = $('#client').val();
			var urlVal ="rest/DBAUtilRestService/getSrcDBList/" + clientName;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				trgtDBNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					option.val(data[i]);
					option.text(data[i]);
					trgtDBNameEle.append(option);
				}
			});

	}

	function loadEmailValues(client) {
		debugger;
		$.ajax({
			url : "rest/DBAUtilRestService/getEmailValueForClient/" + client,
			type : "GET"
		}).done(function(response) {
			$('#email').val(response.email);
		});
	}

}