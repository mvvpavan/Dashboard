function initFlashBackPage() {
	$("#DBFlashBackGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBFlashBackLogList',
						datatype : "json",
						colNames : [ '  Client ', ' Connect String',
								' Flashback Type ', ' Restore Point Name ',
								' Status', ' Flashback Start Time',
								'Flashback Size(GB)', ' Utilization %',
								' Requested By ', 'Email Notification ',
								'Restore Point Type', ' Restore Point Time',
								' Skip Precheck ', ' Disable Archiving ' ],

						colModel : [
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
									name : 'flashBackType',
									index : 'flashBackType',
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
										value : "ENABLE:ENABLE;DISABLE:DISABLE;RESTORE:RESTORE",
										dataInit : function(element) {

											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.val();
																var restorePointEle = $('#restorePoint');

																if (val == 'RESTORE') {

																	var clientVal = $(
																			'#client')
																			.val();
																	var srcDBVal = $(
																			'#connectString')
																			.val();
																	loadRestoreTypeValues(
																			clientVal,
																			srcDBVal);
																	restorePointEle
																			.prop(
																					"disabled",
																					true);
																	$(
																			'#tr_restorePointType',
																			"#FrmGrid_DBFlashBackGrid")
																			.show();
																} else {
																	$(
																			'#tr_restorePointType',
																			"#FrmGrid_DBFlashBackGrid")
																			.hide();

																	if (val == 'ENABLE') {
																		restorePointEle
																				.prop(
																						"disabled",
																						false);
																		
																	} else {
																		restorePointEle
																				.prop(
																						"disabled",
																						true);
																	}
																	$(
																			'table#TblGrid_DBFlashBackGrid tr#tr_AddInfo')
																			.remove();
																}

																if (val == 'DISABLE') {
																	$(
																			'#tr_disableArchiving',
																			"#FrmGrid_DBFlashBackGrid")
																			.show();

																} else {
																	$(
																			'#tr_disableArchiving',
																			"#FrmGrid_DBFlashBackGrid")
																			.hide();
																}

															});
										}
									}
								},
								{
									name : 'restorePoint',
									index : 'restorePoint',
									formoptions : {
										rowpos : 5,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									width : 200,
									align : 'center',
									fixed : true
								},
								{
									name : 'status',
									index : 'status',
									width : 200,
									shrinkToFit : false,
								},
								{
									name : 'fbStartTime',
									index : 'fbStartTime',
									editrules : {
										required : true
									},
									formoptions : {
										rowpos : 6,
										srcformat : 'Y-m-d H:i',
										newformat : 'Y-m-d H:i',
										colpos : 1
									},
									editable : true,
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat : 'HH:mm',
												// minDate : new Date(),
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
									name : 'fbSize',
									index : 'fbSize',
									width : 180,
									sorttype : 'integer',
									shrinkToFit : false,
								},
								{
									name : 'utilPercentage',
									index : 'utilPercentage',
									width : 180,
									sorttype : 'integer',
									shrinkToFit : false,
								},
								{
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false,
								},
								{
									name : 'email',
									index : 'email',
									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										rowpos : 7,
										colpos : 1
									},
									editrules : {
										required : true
									},
									// align : 'center',
									editable : true
								},
								{
									name : 'restorePointType',
									index : 'restorePointType',
									formoptions : {
										rowpos : 8,
										colpos : 1
									},
									edittype : "select",
									editoptions : {
										dataInit : function(element) {
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id',
													'restorePointType');
											$(element)
													.change(
															function() {
																debugger;
																$("#restorePointType").attr('title', $("#restorePointType :selected").val());
																var val = $(
																		element)
																		.val();
																if (val == 'Select by Date') {
																	debugger;
																	// $('#tr_restorePointTime').prop("hidden",false);
																	$(
																			'#tr_restorePointTime',
																			"#FrmGrid_DBFlashBackGrid")
																			.show();
																	setMinMaxDateForRestore();
																} else {
																	$(
																			'#tr_restorePointTime',
																			"#FrmGrid_DBFlashBackGrid")
																			.hide();
																	// $('#tr_restorePointTime').prop("hidden",true);
																	$(
																			'table#TblGrid_DBFlashBackGrid tr#tr_AddInfo')
																			.remove();
																}
															});
										}

									},
									hidden : true,
									editable : true,
									editrules : {
										edithidden : true
									},
									hidedlg : true,
									shrinkToFit : false,
									align : 'center'
								}, {
									name : 'restorePointTime',
									index : 'restorePointTime',
									hidden : true,
									editable : true,
									editrules : {
										edithidden : true
									},
									hidedlg : true,
									formoptions : {
										rowpos : 9,
										srcformat : 'Y-m-d H:i',
										newformat : 'Y-m-d H:i',
										colpos : 1
									},
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat : 'HH:mm',
												autoSize : false,
												// height:20,
												width : 250,
												maxDate : new Date(),

												showOn : 'focus'
											});
										}
									},
									width : 200,
									fixed : true
								}, {
									name : 'skipPrecheck',
									index : 'skipPrecheck',
									width : 170,
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									formoptions : {
										rowpos : 10,
										colpos : 1
									},
									align : 'center',
									editable : true
								}, {
									name : 'disableArchiving',
									index : 'disableArchiving',
									width : 170,
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									align : 'center',
									editable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbFlashBackPager',
						paging : true,
						height : '225',
						width : $("#tabs-2").width(),
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						caption : "DB FlashBack",
						beforeSelectRow : callBeforeSelectRow,
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[11,12],'y');
						}
					});

	$("#DBFlashBackGrid").jqGrid("setFrozenColumns");
	jQuery("#DBFlashBackGrid").jqGrid('navGrid', '#dbFlashBackPager', {
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
			jQuery("#DBFlashBackGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBFlashBackGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true
	}, {
		// edit flash baack
		width : 1000,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBFlashBack',
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
		beforeSubmit : callBeforeSubmitForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add flash baack
		width : 1000,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBFlashBack',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		afterShowForm : callAfterShowFormForAdd,
		beforeSubmit : callBeforeSubmitForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete flashback
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBFlashBack',

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
			$('.ui-pg-div:contains("Find")','#dbFlashBackPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbFlashBackPager').css('color','white');
		}
	}, {});
	
	jQuery('.ui-pg-div:contains("Refresh")', '#dbFlashBackPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbFlashBackPager').css('color','white');
	});

	function callBeforeSelectRow(rowid) {
		// var selRowId = $(this).getGridParam('selrow');
		// var tr = $(this.rows.namedItem(rowid));
		var thisId = $.jgrid.jqID(this.id);

		var statusValue = $(this).jqGrid('getCell', rowid, 'status');

		// you can use getCell or getRowData to examine the
		// contain of
		// the selected row to decide whether the row is
		// editable or not
		if (statusValue == "SUCCESS") {
			$("#edit_" + thisId).removeClass('ui-state-disabled');
			$("#del_" + thisId).addClass('ui-state-disabled');

		} else {
			$("#del_" + thisId).removeClass('ui-state-disabled');
		}
		if (statusValue == "STARTED" || statusValue == "FAILED") {
			// enable the "Edit" button in the navigator

			$("#del_" + thisId).removeClass('ui-state-disabled');
			$("#edit_" + thisId).removeClass('ui-state-disabled');

			// } else {
			//
			// if (statusValue == "SUCCESS" || statusValue == "REQUESTED") {
			//
			// $("#edit_" + thisId).removeClass('ui-state-disabled');
			// } else {
			// // unselect previous selected row
			// // disable the "Edit" and "Del" button in
			// // the navigator
			//
			// $("#del_" + thisId).addClass('ui-state-disabled');
			// $("#edit_" + thisId).addClass('ui-state-disabled');
			// }
		}
		return true; // allow selection or unselection
	}

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
			$('#DBFlashBackGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		debugger;
		// var myGrid = $('#DBFlashBackGrid');
		var selRowId = $('#DBFlashBackGrid').jqGrid('getGridParam', 'selrow');
		var clientValue = $('#DBFlashBackGrid').jqGrid('getCell', selRowId,
				'client');
		var srcDBValue = $('#DBFlashBackGrid').jqGrid('getCell', selRowId,
				'connectString');
		var statusValue = $('#DBFlashBackGrid').jqGrid('getCell', selRowId,
				'status');
		var flashBackTypeValue = $('#DBFlashBackGrid').jqGrid('getCell',
				selRowId, 'flashBackType');
		var restorePointEle = $('#restorePoint');
		var flashBackTypeEle = $('#flashBackType');

		loadSrcDBValues(clientValue, srcDBValue);

		if (statusValue == 'SUCCESS') {
			if (flashBackTypeValue == 'ENABLE') {
				flashBackTypeEle.prop("disabled", false);
				restorePointEle.prop("disabled",true);
				$("#flashBackType option[value='ENABLE']").remove();
				$("#flashBackType").prepend("<option value='Select' selected='selected'>Select</option>");
			}
		} else {
			if (flashBackTypeValue == 'ENABLE') {
				restorePointEle.prop("disabled",false);
			}else{
				restorePointEle.prop("disabled",true);
			}
			flashBackTypeEle.prop("disabled", true);
		} 

		var fbStartTime = $("#fbStartTime").val() + "";
		if (new Date(fbStartTime) < new Date()) {
			$("#fbStartTime").datetimepicker('setTime', new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-"
					+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
					+ ("00" + d.getDate()).slice(-2) + " "
					+ ("00" + d.getHours()).slice(-2) + ":"
					+ ("00" + d.getMinutes()).slice(-2);
			$("#fbStartTime").val(currDate);
		}
		if (flashBackTypeValue == "RESTORE") {
			loadRestoreTypeValues(clientValue, srcDBValue);
		}
		$('#restorePoint').attr('style', 'width: 346px !important');
		$('#restorePointType').attr('style', 'width: 358px !important');
		$('#restorePoint').attr('title', $('#restorePoint').val());
		
	}

	function callAfterShowFormForEdit(formid) {

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");

		var myGrid = $('#DBFlashBackGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');

		var flashBackTypeVal = myGrid.jqGrid('getCell', selRowId,
				'flashBackType');

		if (flashBackTypeVal == 'RESTORE') {
			$('#tr_restorePointType', formid).show();
		} else {
			$('#tr_restorePointType', formid).hide();

		}


		if (flashBackTypeVal == 'DISABLE') {
			$('#tr_disableArchiving', formid).show();
		} else {
			$('#tr_disableArchiving', formid).hide();
		}

		$('#tr_restorePointTime', formid).hide();
	}

	function callBeforeSubmitForEdit(postdata, formid) {
		debugger;

		var flashBackTypeVal = postdata.flashBackType;
		var restorePointTypeVal = postdata.restorePointType;
		
		if (flashBackTypeVal == 'Select') {
			return [ false, "Please Select the Falshback Type", "" ];
		}else if (restorePointTypeVal == 'Select') {
			return [ false, "Please Select the Restore Point Type", "" ];
		} else {
			return [ true, '', '' ];
		}
	}
	function callAfterSubmitForEdit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBFlashBackGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {
		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
		$("#fbStartTime").datetimepicker('setTime', new Date());
		$('#tr_disableArchiving', formid).hide();
		$('#tr_restorePointTime', formid).hide();
		// $('#disableArchiving').prop("disabled", true);
	}

	function callAfterShowFormForAdd(formid) {

		var myGrid = $('#DBFlashBackGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var flashBackTypeVal = myGrid.jqGrid('getCell', selRowId,
				'flashBackType');

		var flashBackTypeEle = $('#flashBackType');

		flashBackTypeEle.prop("disabled", true);

		if (flashBackTypeVal == 'RESTORE') {
			$('#tr_restorePointType', formid).show();
		} else {
			$('#tr_restorePointType', formid).hide();
		}
	}
	
	function callBeforeSubmitForAdd(postdata, formid) {
		debugger;

		var restorePointName = postdata.restorePoint;
			if (restorePointName.trim() == '') {
				return [ false, "Please enter the Restore Point Name", "" ];
			}
		return [ true, '', '' ];
	} 

	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBFlashBackGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBFlashBackGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			connectString : rowdata.connectString,
			flashBackType : rowdata.flashBackType
		};
	}

	function loadRestoreTypeValues(client, srcDBValue) {
		debugger;
		var urlVal = "rest/DBAUtilRestService/getRestoreValuesListForDBFlashBack/"
				+ client + "/" + srcDBValue;
		var restorePointTypeEle = $('#restorePointType');
		restorePointTypeEle.attr('name', 'restorePointType');
		restorePointTypeEle.empty();
		$.ajax({
			url : urlVal
		}).done(function(data) {

			var selOption = $("<option>");

			selOption.val('Select');
			selOption.text("Select");
			restorePointTypeEle.append(selOption);
			var selDateOption = $("<option>");
			selDateOption.val('Select by Date');
			selDateOption.text("Select by Date");
			restorePointTypeEle.append(selDateOption);

			for (var i = 0; i < data.length; i++) {
				var option = $("<option>");
				option.val(data[i]);
				option.text(data[i]);

				restorePointTypeEle.append(option);
			}

		});
	}

	function loadEmailValues(client) {

		if (client) {
			var urlVal = "rest/DBAUtilRestService/getEmailValueForClient/"
					+ client;
			var emailEle = $('#email');
			emailEle.attr('name', 'email');
			emailEle.empty();
			$.ajax({
				url : urlVal
			}).done(function(response) {
				$('#email').val(response.email);
			});
		}

	}

	function setMinMaxDateForRestore() {

		var clientVal = $('#client').val();
		var srcDBVal = $('#connectString').val();
		var urlVal = "rest/DBAUtilRestService/getFBMinRestorePointDate/"
				+ clientVal + "/" + srcDBVal;
		$
				.ajax({
					url : urlVal
				})
				.done(
						function(response) {
							debugger;

							var restorePointTimeColField = $(
									'#tr_restorePointTime',
									"#FrmGrid_DBFlashBackGrid").show();
							var d = new Date(parseInt(response.timeStamp));
							var restorePointDatelabelText = d.getFullYear()
									+ "-"
									+ ("00" + (d.getMonth() + 1)).slice(-2)
									+ "-" + ("00" + d.getDate()).slice(-2)
									+ " " + ("00" + d.getHours()).slice(-2)
									+ ":" + ("00" + d.getMinutes()).slice(-2);
							var custommeesage = "*Note : Choose Restore Point Time in between "
									+ restorePointDatelabelText
									+ " and current time";

							$('<tr class="FormData" id="tr_AddInfo"><td class="CaptionTD ui-widget-content" colspan="2"><span style="color:red; padding-left: 10px;"> '
									+ custommeesage
									+ '</span></td></tr>').insertAfter(
							restorePointTimeColField);
							$('#restorePointTime').datetimepicker('destroy');
							$('#restorePointTime').datetimepicker(
									{
										dateFormat : 'yy-mm-dd',
										timeFormat : 'HH:mm',
										// minDate : new Date(),
										autoSize : false,
										defaultValue : new Date(),
										// height:20,
										width : 250,
										maxDate : new Date(),
										minDate : new Date(
												parseInt(response.timeStamp)),
										showOn : 'focus'
									}).datetimepicker('setTime', new Date());

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
