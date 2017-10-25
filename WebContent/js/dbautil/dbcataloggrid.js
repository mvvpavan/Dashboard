function initDBCatalogPageForDBA(clientVal, dbStatusVal, sidVal, hostLocVal,
		hostNameVal, vmNameVal) {
	$("#DBCatalogForDBAGrid")
			.jqGrid(
					{
						url : "rest/DBAUtilRestService/getDBCatalogList/"
								+ clientVal + "/" + dbStatusVal + "/" + sidVal
								+ "/" + hostLocVal + "/" + hostNameVal + "/"
								+ vmNameVal,
						datatype : "json",
						colNames : [ ' Client ', ' Host Location',
								'Host Name ', ' VM Name', 'VM IP', ' SID ',
								' Connect String', 'Database Status',
								'Database Version', 'Conversion DB',
								'Classic DB', 'DB Requested Date',
								'Requested By', 'Comments ', 'DB Name',
								'Required Until' ],
						colModel : [
								{
									name : 'client',
									index : 'client',
									align : 'center',
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
										dataUrl : "rest/DBAUtilRestService/getClientListForCatalog",
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
												loadVMNameValues(val);
											});

										}
									}

								},
								{
									name : 'hostLocation',
									index : 'hostLocation',
									align : 'center',
									frozen : true,
									width : 150
								},
								{
									name : 'hostName',
									index : 'hostName',
									align : 'center',
									frozen : true,
									width : 180
								},
								{
									name : 'vmName',
									index : 'vmName',
									frozen : true,
									align : 'center',
									width : 180,
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
											$(element).attr('id', 'vmName');
										}
									}
								},
								{
									name : 'vmIP',
									index : 'vmIP',
									align : 'center',
									width : 150
								},
								{
									name : 'sid',
									index : 'sid',
									align : 'center',
									formoptions : {
										rowpos : 5,
										colpos : 1
									},
									edittype : "text",
									editable : true,
									editrules : {
										required : true
									},
									width : 120

								},
								{
									name : 'connectString',
									index : 'connectString',
									width : 150,
									align : 'center',
									formoptions : {
										rowpos : 6,
										colpos : 1
									},
									edittype : "text",
									editable : true,
									editrules : {
										required : true
									},
									fixed : true
								},
								{
									name : 'dbStatus',
									index : 'dbStatus',
									align : 'center',
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
										value : "STARTED:STARTED;STOPPED:STOPPED;DROPPED:DROPPED",
										dataInit : function(element) {
											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.val();

																var requiredUntilEle = $('#requiredUntil');

																if (val == 'DROPPED') {

																	requiredUntilEle
																			.prop(
																					"disabled",
																					true);
																} else {
																	requiredUntilEle
																			.prop(
																					"disabled",
																					false);
																}
															});
										}
									}

								},
								{
									name : 'dbVersion',
									index : 'dbVersion',
									width : 140

								},
								{
									name : 'conversionDB',
									index : 'conversionDB',
									align : 'center',
									width : 130

								},
								{
									name : 'classicDB',
									index : 'classicDB',
									width : 100
								},
								{
									name : 'creationDate',
									index : 'creationDate',
									align : 'center',
									width : 240
								},
								{

									name : 'dbRequestedBy',
									index : 'dbRequestedBy',
									align : 'center',
									formoptions : {
										rowpos : 7,
										label : 'DB Requested By',
										colpos : 1
									},
									editable : true,
									edittype : "text",
									width : 200,
									align : 'center',
									fixed : true
								},
								{
									name : 'comments',
									index : 'comments',
									align : 'center',
									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Comments',
										rowpos : 9,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true
								},
								{
									name : 'dbName',
									index : 'dbName',
									align : 'center',
									// hidden : true,
									formoptions : {
										rowpos : 4,
										label : 'DB Name',
										colpos : 1
									},
									edittype : "text",
									editable : true,
									width : 100
								},
								{
									name : 'requiredUntil',
									index : 'requiredUntil',
									editable : true,
									formoptions : {
										rowpos : 8,
										label : 'Required Until',
										srcformat : 'Y-m-d',
										newformat : 'Y-m-d',
										colpos : 1
									},
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element)
													.datepicker(
															{
																dateFormat : 'yy-mm-dd',
																// timeFormat :
																// 'HH:mm',
																autoSize : false,
																width : 250,
																minDate : new Date(),
																maxDate : new Date()
																		.getDate() + 365,
																showOn : 'focus'
															});
										}
									},
									width : 160,
									fixed : true

								} ],
						rowNum : 15,
						rowList : [ 15, 20, 30 ],
						pager : '#dbCatalogForDBAGridPager',
						paging : true,
						width : $("#tabs-2").width(),
						height : 375,
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						ignoreCase : true,
						shrinkToFit : false,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						caption : " ",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	$("#DBCatalogForDBAGrid").jqGrid("setFrozenColumns");
	jQuery("#DBCatalogForDBAGrid")
			.jqGrid(
					'navGrid',
					'#dbCatalogForDBAGridPager',
					{
						del : true,
						deltext : ' Delete ',
						add : true,
						addtext : 'Add',
						edit : true,
						edittext : 'Edit',
						search : false,
						// searchtext : 'Find',
						refresh : true,
						refreshtext : 'Refresh',
						beforeRefresh : function() {
							jQuery("#DBCatalogForDBAGrid").setGridParam({
								datatype : 'json'
							});
							jQuery("#DBCatalogForDBAGrid")
									.trigger("reloadGrid");
						},
						closeAfterEdit : true
					},
					{

						width : 850,
						// height : 350,
						url : 'rest/DBAUtilRestService/addOrUpdateNewDatabaseToCatalog',
						modal : true,
						jqModal : true,
						reloadAfterSubmit : true,
						recreateForm : true,
						viewPagerButtons : false,
						closeAfterEdit : true,
						beforeShowForm : callBeforeShowFormForEdit,
						afterShowForm : callAfterShowFormForEdit,
						afterSubmit : callAfterSubmitForEdit

					},
					{
						width : 850,
						// height : 350,
						url : 'rest/DBAUtilRestService/addOrUpdateNewDatabaseToCatalog',
						modal : true,
						jqModal : true,
						reloadAfterSubmit : true,
						recreateForm : true,
						closeAfterAdd : true,
						beforeShowForm : callBeforeShowFormForAdd,
						afterSubmit : callAfterSubmitForAdd
					},
					{
						width : 500,
						recreateForm : true,
						reloadAfterSubmit : true,
						url : 'rest/DBAUtilRestService/deleteDatabaseFromCatalog',

						serializeDelData : getSerializedDeleteData,
						afterSubmit : callAfterSubmitForDelete
					}, {}, {})
			// search options
			.navButtonAdd('#dbCatalogForDBAGridPager', {
				caption : "Export",
				buttonicon : "ui-icon-newwin",
				onClickButton : function() {
					debugger;
					var fieldInfoMap = {};
					fieldInfoMap['Client'] = 'client';
					fieldInfoMap['Host Location'] = 'hostLocation';
					fieldInfoMap['Host Name'] = 'hostName';
					fieldInfoMap[' VM Name'] = 'vmName';
					fieldInfoMap['VM IP'] = 'vmIP';
					fieldInfoMap[' SID '] = 'sid';
					fieldInfoMap[' Connect String'] = 'connectString';

					fieldInfoMap['Database Status'] = 'dbStatus';
					fieldInfoMap['DB version'] = 'dbVersion';
					fieldInfoMap['Conversion DB'] = 'conversionDB';
					fieldInfoMap['Classic DB'] = 'classicDB';
					fieldInfoMap['DB Requested Date'] = 'creationDate';
					fieldInfoMap['Requested By'] = 'dbRequestedBy';
					fieldInfoMap['Comments'] = 'comments';
					fieldInfoMap['DB Name'] = 'dbName';
					fieldInfoMap['Required Until'] = 'requiredUntil';
					exportDataToExcelByReflect("dbCatalog", fieldInfoMap);
				},
				position : "last"
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
			$('#DBCatalogForDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBCatalogForDBAGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			connectString : rowdata.connectString,
		};
	}

	function callBeforeShowFormForEdit(formid) {
		var myGrid = $('#DBCatalogForDBAGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var vmNameValue = myGrid.jqGrid('getCell', selRowId, 'vmName');
		loadVMNameValues(clientValue, vmNameValue);
	}

	function callAfterShowFormForEdit(formid) {
		var vmNameEle = $('#vmName');
		vmNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");

		var sidEle = $('#sid');
		sidEle.attr("disabled", "disabled");

		var dbStatusEle = $('#dbStatus');

		var requiredUntilEle = $('#requiredUntil');

		if (dbStatusEle == 'DROPPED') {

			requiredUntilEle.prop("disabled", true);
		} else {
			requiredUntilEle.prop("disabled", false);
		}

	}

	function callBeforeShowFormForAdd(formid) {
		var vmNameEle = $('#vmName');
		vmNameEle.attr("disabled", "disabled");

	}

	function callAfterSubmitForEdit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#DBCatalogForDBAGrid').trigger('reloadGrid');
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
			$('#DBCatalogForDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function loadVMNameValues(client, vmNameValue) {

		var vmNameEle = $('#vmName');
		vmNameEle.attr('name', 'vmName');
		vmNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			vmNameEle.append(option);
			vmNameEle.prop("disabled", true);

		} else {
			vmNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getVMNamesForCatalog/"
					+ client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				vmNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (vmNameValue) {
						if (data[i] == vmNameValue) {

							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);

					vmNameEle.append(option);
				}
			});
		}

	}
}