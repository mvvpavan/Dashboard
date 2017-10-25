function initVMCatalogPage(clientVal, hostLocVal,
		hostNameVal, vmNameVal,vmTypeVal, versionVal, vmIPVal) {
	debugger;
	$("#VMCatalogForDBAGrid")
			.jqGrid(
					{
						url : "rest/DBAUtilRestService/getVMCatalogList/"
							+ clientVal + "/" + hostLocVal + "/" + hostNameVal + "/"
							+ vmNameVal+ "/" + vmTypeVal+ "/" + versionVal+ "/" + vmIPVal,
						datatype : "json",
						colNames : [ ' Host Location', 'Host Name ',
								' Client ', ' VM Name', 'VM IP', 'Version',
								'OS Version', 'CPU Cores', 'Memory ',
								'Purpose ', ' VM Requested Date' ],
						colModel : [
								{
									name : 'hostLocation',
									index : 'hostLocation',
									frozen : true,
									align : 'center',
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
										dataUrl : "rest/DBAUtilRestService/getHostLocationsForCatalog",
										buildSelect : function(data) {
											
											var response = jQuery
													.parseJSON(data);
											var s = '<select id="hostLocation" name="hostLocation">';
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
											
											$(element).attr('id',
													'hostLocation');
											$(element).change(function() {
												
												var val = $(element).val();
												loadHostNameValues(val);
											});
										}
									}
								},
								{
									name : 'hostName',
									index : 'hostName',
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
											$(element).attr('id', 'hostName');

										}
									}
								},
								{
									name : 'client',
									index : 'client',
									frozen : true,
									align : 'center',
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
										}
									}

								},
								{
									name : 'vmName',
									index : 'vmName',
									frozen : true,
									align : 'center',
									width : 180,
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									width : 200,
									align : 'center',
									fixed : true
								},
								{
									name : 'vmIP',
									index : 'vmIP',
									align : 'center',
									formoptions : {
										rowpos : 8,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									width : 200,
									align : 'center',
									fixed : true
								},
								{
									name : 'dbVersion',
									index : 'dbVersion',
									width : 140,
									editrules : {
										required : true
									},
									fixed : true,
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 6,
										colpos : 1
									},
									editoptions : {
										dataUrl : "rest/DBAUtilRestService/getOracleVersionForCatalog",
										buildSelect : function(data) {
											
											var response = jQuery
													.parseJSON(data);
											var s = '<select id="dbVersion" name="dbVersion">';
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
										}
									}

								},
								{
									name : 'osVersion',
									index : 'osVersion',
									align : 'center',
									width : 180,
									editrules : {
										required : true
									},
									fixed : true,
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 7,
										colpos : 1
									},
									editoptions : {
										dataUrl : "rest/DBAUtilRestService/getOSVersionForCatalog",
										buildSelect : function(data) {
											
											var response = jQuery
													.parseJSON(data);
											var s = '<select id="osVersion" name="osVersion">';
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
										}
									}

								},
								{
									name : 'cpuCores',
									index : 'cpuCores',
									align : 'center',
									sorttype:'integer' ,
									width : 100,
									editable : true,
									formoptions : {
										rowpos : 5,
										colpos : 1
									},
									edittype : "custom",
									editoptions : {
										width : 6,
										allowNull : false,
										size : 5,
										custom_element : function(value,
												options) {
											if (!value) {
												value = 2;
											}
											return '<input type="text" id="cpuCores" value="'
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
											var cpuCoreSpinner = $(elem).find(
													">input").spinner({
												step : 2,
												min : 2,
												max : 16
											});
											cpuCoreSpinner.size(15);
										}
									}
								},
								{
									name : 'memory',
									index : 'memory',
									align : 'center',
									sorttype:'integer' ,
									width : 100,
									editable : true,
									formoptions : {
										rowpos : 5,
										colpos : 2
									},
									edittype : "custom",
									editoptions : {
										width : 6,
										allowNull : false,
										size : 5,
										custom_element : function(value,
												options) {
											if (!value) {
												value = 4;
											}
											return '<input type="text" id="memory" value="'
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
											// 
											var memorySpinner = $(elem).find(
													">input").spinner({
												step : 2,
												min : 2,
												max : 32
											});
											memorySpinner.size(15);
										}

									}

								}, {
									name : 'purpose',
									index : 'purpose',
									align : 'center',
									width : 200,
									formoptions : {
										rowpos : 10,
										colpos : 1
									},
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									
									editrules : {
										required : true
									},
									editable : true
								}, {
									name : 'requetsedDate',
									index : 'requetsedDate',
									align : 'center',
									width : 200

								} ],
						rowNum : 15,
						rowList : [ 15, 20, 30 ],
						pager : '#vmCatalogForDBAGridPager',
						paging : true,
						width : $("#tabs-2").width(),
//						height : 405,
						height : 375,
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
						ignoreCase : true,
						scroller : true,
						caption : " ",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	$("#VMCatalogForDBAGrid").jqGrid("setFrozenColumns");
	jQuery("#VMCatalogForDBAGrid")
			.jqGrid(
					'navGrid',
					'#vmCatalogForDBAGridPager',
					{
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
							jQuery("#VMCatalogForDBAGrid").setGridParam({
								datatype : 'json'
							});
							jQuery("#VMCatalogForDBAGrid")
									.trigger("reloadGrid");
						},
						closeAfterEdit : true
					},
					{

						width : 850,
						// height : 350,
						url : 'rest/DBAUtilRestService/addOrUpdateVMToCatalog',
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
						url : 'rest/DBAUtilRestService/addOrUpdateVMToCatalog',
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
						url : 'rest/DBAUtilRestService/deleteVMFromCatalog',

						serializeDelData : getSerializedDeleteData,
						afterSubmit : callAfterSubmitForDelete
					}, {
						// search options
					}, {}).navButtonAdd('#vmCatalogForDBAGridPager', {
						caption : "Export",
						buttonicon : "ui-icon-newwin",
						onClickButton : function() {
							debugger;
							var fieldInfoMap = {};

							fieldInfoMap['Host Location'] = 'hostLocation';
							fieldInfoMap['Host Name'] = 'hostName';
							fieldInfoMap['Client'] = 'client';
							fieldInfoMap['VM Name'] = 'vmName';
							fieldInfoMap['VM IP'] = 'vmIP';
							fieldInfoMap['Version'] = 'dbVersion';
							
							fieldInfoMap['OS Version'] = 'osVersion';
							fieldInfoMap['CPU Cores'] = 'cpuCores';
							fieldInfoMap['Memory '] = 'memory';
							fieldInfoMap['Purpose '] = 'purpose';
							fieldInfoMap['VM Requested Date'] = 'requetsedDate';
							
							exportDataToExcelByReflect("vmCatalog", fieldInfoMap);
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
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#VMCatalogForDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function getSerializedDeleteData(postdata) {
		var rowdata = $('#VMCatalogForDBAGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			vmName : rowdata.vmName,
		};
	}
	
	function callBeforeShowFormForEdit(formid) {

		var myGrid = $('#VMCatalogForDBAGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var hostLocationValue = myGrid.jqGrid('getCell', selRowId,
				'hostLocation');
		var hostNameValue = myGrid.jqGrid('getCell', selRowId, 'hostName');
		loadHostNameValues(hostLocationValue, hostNameValue);
	}

	function callAfterShowFormForEdit(formid) {
		
		var vmNameEle = $('#vmName');
		var clientEle = $('#client');

		var hostNameEle = $('#hostName');
		var hostLocationEle = $('#hostLocation');

		hostNameEle.attr("disabled", "disabled");
		hostLocationEle.attr("disabled", "disabled");

		vmNameEle.attr("disabled", "disabled");
		clientEle.attr("disabled", "disabled");
	}

	function callBeforeShowFormForAdd(formid) {
		debugger;
		
		var hostNameEle = $('#hostName');
		hostNameEle.attr("disabled", "disabled");

	}
	
	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#VMCatalogForDBAGrid').trigger('reloadGrid');
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
			$('#VMCatalogForDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function loadHostNameValues(hostLoc, hostNameValue) {
		
		var hostNameEle = $('#hostName');
		hostNameEle.attr('name', 'hostName');
		hostNameEle.empty();
		if (!hostLoc) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			hostNameEle.append(option);
			hostNameEle.prop("disabled", true);

		} else {
			hostNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getHostNamesForCatalog/"
					+ hostLoc;
			$.ajax({
				url : urlVal
			}).done(function(data) {
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				hostNameEle.append(selOption);
				for (var i = 0; i < data.length; i++) {
					var option = $("<option>");
					if (hostNameValue) {
						if (data[i] == hostNameValue) {
							
							option.attr('selected', 'selected');
						}
					}
					option.val(data[i]);
					option.text(data[i]);
					hostNameEle.append(option);
				}
			});
		}
	}
}