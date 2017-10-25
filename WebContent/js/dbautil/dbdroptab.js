function initDBDropPage() {
	$("#DBDropGrid")
			.jqGrid(
					{
						url : "rest/DBAUtilRestService/getDBDropList/" + "N",
						datatype : "json",
						colNames : [ '  Client ', ' Connect String',
								'Start Time', 'Backup DB', 'Status',
								'Requested By', 'Backup Location',
								' Requested Date', 'Email Notification',
								' Drop DB Notes' ],
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
											debugger;
											$(element).attr('id', 'client');
											$(element).change(function() {
												var val = $(element).val();
												if (val) {
													loadSrcDBValues(val);
													loadEmailValues(val);
												}
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
									name : 'startTime',
									index : 'startTime',
									formoptions : {
										label : 'Start Time',
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									align : 'center',
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat : 'HH:mm',
												minDate : new Date(),
												autoSize : false,
												width : 250,
												maxDate : '+5Y',
												height : 35,
												showOn : 'focus'
											});
										}
									}
								},
								{
									name : 'backupDBBeforeDrop',
									index : 'backupDBBeforeDrop',
									width : 170,
									formoptions : {
										rowpos : 6,
										colpos : 1
									},
									align : 'center',
									edittype : "checkbox",
									editable : true,
									editoptions : {
										value : "Y:N",
										defaultValue : 'N',
										dataInit : function(element) {
											$(element)
													.change(
															function() {
																debugger;
																var val = $(
																		element)
																		.prop(
																				'checked');
																var dbBackupLocEle = $('#dbBackupLocation');
																if (val) {
																	dbBackupLocEle
																			.prop(
																					"disabled",
																					false);
																	dbBackupLocEle
																			.removeClass("disableTextarea");
																} else {
																	dbBackupLocEle
																			.prop(
																					"disabled",
																					true);
																	dbBackupLocEle
																			.addClass("disableTextarea");

																}
															});
										}
									}

								}, {
									name : 'status',
									index : 'status',
									align : 'center',
									width : 180
								}, {
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									align : 'center',
									shrinkToFit : false
								}, {
									name : 'dbBackupLocation',
									index : 'dbBackupLocation',
									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Backup Location',
										rowpos : 7,
										colpos : 1
									},
									// editrules : {
									// required : true
									// },
									align : 'center',
									editable : true
								}, {
									name : 'reqDate',
									index : 'reqDate',
									align : 'center',
									width : 270
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
										label : 'Email',
										rowpos : 5,
										colpos : 1
									},
									editrules : {
										required : true
									},
									align : 'center',
									editable : true

								}, {

									name : 'dropDBNotes',
									index : 'dropDBNotes',

									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Drop DB Notes',
										rowpos : 4,
										colpos : 1
									},
									editrules : {
										required : true
									},
									align : 'center',
									editable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbDropPager',
						paging : true,
						height : '225',
						width : $("#tabs-15").width(),
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						reloadAfterSubmit : true,
						scroller : true,
						caption : "DB Drop",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	$("#DBDropGrid").jqGrid("setFrozenColumns");
	jQuery("#DBDropGrid").jqGrid('navGrid', '#dbDropPager', {
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
			jQuery("#DBDropGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBDropGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {
		// edit DB Drop
		width : 850,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/addOrUpdateProcToDropDB',
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
		beforeSubmit : callBeforeSubmit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add DB Drop
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/addOrUpdateProcToDropDB',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterAdd : true,

		beforeShowForm : callBeforeShowFormForAdd,
		beforeSubmit : callBeforeSubmit,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete DB Drop
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteScheduledDBDrop',

		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
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
			$('#DBDropGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		
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

		var myGrid = $('#DBDropGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');
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
			$('#DBDropGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {

		$("#startTime").datetimepicker('setTime',new Date());

		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
		var dbBackupLocEle = $('#dbBackupLocation');
		dbBackupLocEle.prop("disabled", true);
		dbBackupLocEle.addClass("disableTextarea");
	}

	function callBeforeSubmit(postdata, formid) {
		debugger;
		var dbBackupLocationVal = postdata.dbBackupLocation;

		var val = $('#backupDBBeforeDrop').prop('checked');
//		var dbBackupLocEle = $('#dbBackupLocation').val;
		if (val) {
			if (dbBackupLocationVal == '') {
				return [ false, "Please enter the backup location", "" ];
			} else {
				return [ true, '', '' ];
			}
		}else{
			return [ true, '', '' ];
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
			$('#DBDropGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBDropGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			connectString : rowdata.connectString,
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