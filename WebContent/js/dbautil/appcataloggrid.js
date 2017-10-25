function initAPPCatalogPage(clientVal, hostLocVal, hostNameVal, vmNameVal) {
	$("#APPCatalogGrid")
			.jqGrid(
					{
						url : "rest/DBAUtilRestService/getAPPCatalogList/"
								+ clientVal + "/" + hostLocVal + "/"
								+ hostNameVal + "/" + vmNameVal,
						datatype : "json",
						colNames : [ ' Client ', ' Host Location',
								'Host Name ', ' APP VM Name', 'APP VM IP', 'DB VM Name', 'DB VM IP', ' SID ',
								' Connect String', 'APP Version', 'DB Version',
								'APP URL', 'APP Log Directory', 'Image Storage Directory',
								'Requested By', 'Comments ' ],
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
												loadSIDValues(val);
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
									name : 'dbVmName',
									index : 'dbVmName',
//									frozen : true,
									align : 'center',
									width : 180
								},
								{
									name : 'dbVmIP',
									index : 'dbVmIP',
									align : 'center',
									width : 150
								},
								{
									name : 'sid',
									index : 'sid',
									align : 'center',
									align : 'center',
									width : 180,
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
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id', 'sid');

										}
									}

								},
								{
									name : 'connectString',
									index : 'connectString',
									width : 150,
									align : 'center',
									fixed : true
								},
								{
									name : 'appVersion',
									index : 'appVersion',
									align : 'center',
									width : 130

								},
								{
									name : 'dbVersion',
									index : 'dbVersion',
									width : 140
								},
								{
									name : 'appURL',
									index : 'appURL',
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									edittype : "text",
									editable : true,
									editrules : {
										required : true
									},
									width : 100
								},
								{
									name : 'appLogDir',
									index : 'appLogDir',
									align : 'center',
									formoptions : {
										rowpos : 5,
										label : 'APP Log Directory ',
										colpos : 1
									},
									edittype : "text",
									editable : true,
									editrules : {
										required : true
									},
									width : 240
								},
								{
									name : 'impExpImageStorageDir',
									index : 'impExpImageStorageDir',
									align : 'center',
									formoptions : {
										rowpos : 6,
										label : 'Image Storage Dir for Import/Export',
										colpos : 1
									},
									edittype : "text",
									editrules : {
										required : true
									},
									editable : true,
									width : 190
								},

								{

									name : 'dbRequestedBy',
									index : 'dbRequestedBy',
									align : 'center',
									formoptions : {
										rowpos : 7,
										label : 'Requested By',
										colpos : 1
									},
									editable : true,
									edittype : "text",
									width : 200,
									align : 'center',
									fixed : true

								}, {
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
										rowpos : 8,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true

								} ],
						rowNum : 15,
						rowList : [ 15, 20, 30 ],
						pager : '#appCatalogGridPager',
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
	$("#APPCatalogGrid").jqGrid("setFrozenColumns");
	jQuery("#APPCatalogGrid").jqGrid('navGrid', '#appCatalogGridPager', {
		del : true,
		deltext : ' Delete ',
		add : true,
		addtext : 'Add',
		edit : true,
		edittext : 'Edit',
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#APPCatalogGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#APPCatalogGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true
	}, {

		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/addOrupdateAPPForCatalog',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		viewPagerButtons : false,
		closeAfterEdit : true,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit

	}, {
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/addOrupdateAPPForCatalog',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		width : 500,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteAPPFromCatalog',

		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	}, {
	// search options
	}, {}).navButtonAdd(
			 '#appCatalogGridPager',
			 {
			 caption : "Export",
			 buttonicon : "ui-icon-newwin",
			 onClickButton : function() {
				 var fieldInfoMap = {};
					fieldInfoMap['Client'] = 'client';
					fieldInfoMap['Host Location'] = 'hostLocation';
					fieldInfoMap['Host Name'] = 'hostName';
					fieldInfoMap[' VM Name'] = 'vmName';
					fieldInfoMap['VM IP'] = 'vmIP';
					fieldInfoMap[' SID '] = 'sid';
					fieldInfoMap[' Connect String'] = 'connectString';
					fieldInfoMap['APP version'] = 'appVersion';
					fieldInfoMap['DB version'] = 'dbVersion';
					fieldInfoMap['APP URL'] = 'appURL';
					fieldInfoMap['APP Log DIR'] = 'appLogDir';
					fieldInfoMap['Image Storage DIR'] = 'impExpImageStorageDir';
					fieldInfoMap['Requested By'] = 'dbRequestedBy';
					fieldInfoMap['Comments'] = 'comments';
					exportDataToExcelByReflect("appCatalog",fieldInfoMap);
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
			$('#APPCatalogGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		
		var rowdata = $('#APPCatalogGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			vmName : rowdata.vmName,
			client : rowdata.client,
			sid : rowdata.sid,
			appURL : rowdata.appURL,
			comments : rowdata.comments

		};
	}

	function callBeforeShowFormForEdit(formid) {
		var myGrid = $('#APPCatalogGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var vmNameValue = myGrid.jqGrid('getCell', selRowId, 'vmName');
		var sidValue = myGrid.jqGrid('getCell', selRowId, 'sid');
		loadVMNameValues(clientValue, vmNameValue);
		loadSIDValues(clientValue, sidValue);
	}

	function callAfterShowFormForEdit(formid) {
		var vmNameEle = $('#vmName');
		vmNameEle.attr("disabled", "disabled");

		var sidEle = $('#sid');
		sidEle.attr("disabled", "disabled");
	}

	function callBeforeShowFormForAdd(formid) {
		var vmNameEle = $('#vmName');
		vmNameEle.attr("disabled", "disabled");
		var sidEle = $('#sid');
		sidEle.attr("disabled", "disabled");
	}

	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#APPCatalogGrid').trigger('reloadGrid');
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
			$('#APPCatalogGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function loadSIDValues(client, sidValue) {
		
		var sidEle = $('#sid');
		sidEle.attr('name', 'sid');
		sidEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			sidEle.append(option);
			sidEle.prop("disabled", true);

		} else {
			sidEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getSIDListForAPPCatalog/"
					+ client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				sidEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (sidValue) {
						if (data[i] == sidValue) {
							
							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);

					sidEle.append(option);
				}

			});
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
			var urlVal = "rest/DBAUtilRestService/getVMListForAPPCatalog/"
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