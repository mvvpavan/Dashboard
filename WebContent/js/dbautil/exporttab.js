function initExportPage() {
	$("#DBExportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBExportLogList',
						datatype : "json",

						colNames : [ '  Client ', ' Connect String',
								'Export Start Time', ' Export Type ', 'Status',
								'Requested By', '  Export Schemas',
								' Requested Date', 'Email Notification',
								' Excluded Tables' ],
						colModel : [
								{
									name : 'client',
									index : 'client',
									frozen: true,
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
												loadExcludeTableValues(val);
											});

										}

									}
								},
								{
									name : 'connectString',
									index : 'connectString',
									frozen: true,
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

								}, {
									name : 'startTime',
									index : 'startTime',
									formoptions : {
										label : 'Start Time',
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
												width : 250,
												maxDate : '+5Y',
												height : 35,
												showOn : 'focus'
											});
										}
									}
								}, {
									name : 'exportType',
									index : 'exportType',
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										label : 'DB Export Type',
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									width : 150,
									edittype : "select",
									editoptions : {  
										value : "ALL:ALL;METADATA_ONLY:METADATA_ONLY",
									}
								}, {
									name : 'status',
									index : 'status',
									width : 180
								}, {
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false
								}, {
									name : 'exportSchemas',
									index : 'exportSchemas',
									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Export Schemas',
										rowpos : 7,
										colpos : 1
									},
									editable : true
								
								}, {
									name : 'reqDate',
									index : 'reqDate',
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
										rowpos : 6,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true
								}, {

									name : 'excludedTables',
									index : 'excludedTables',

									width : 270,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Excluded Tables',
										rowpos : 4,
										colpos : 1
									},
									editable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbExportPager',
						paging : true,
						height : '225',
						width : $("#tabs-7").width(),
						modal : true,
						jqModal : true,
						 loadonce:true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						reloadAfterSubmit : true,
						scroller : true,
						caption : "DB Export",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	
	$("#DBExportGrid").jqGrid("setFrozenColumns");
	jQuery("#DBExportGrid").jqGrid('navGrid', '#dbExportPager', {
		del : true,
		deltext : ' Delete ',
		add : true,
		addtext : ' Add ',
		edit : true,
		edittext : '  Edit  ',
		search : false,
		refresh : true,
		refreshtext : '  Refresh ',
		beforeRefresh:function(){
	        jQuery("#DBExportGrid").setGridParam({datatype: 'json'});
	        jQuery("#DBExportGrid").trigger("reloadGrid");
	    },
		closeAfterEdit : true

	}, {
		// edit Export
		width : 850,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBExport',
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
		// add Export
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBExport',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterAdd : true,

		beforeShowForm : callBeforeShowFormForAdd,
		 afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete Export
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBExport',

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
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBExportGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		
		var myGrid = $('#DBExportGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		
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
		
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');
		loadSrcDBValues(clientValue, srcDBValue);

	}

	function callAfterShowFormForEdit(formid) {

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");
		
		$('#excludedTables').attr('style', 'height: 35px !important');
		$('#excludedTables').attr('style', 'font-size: 14px !important');
		$('#excludedTables').attr('style', 'padding: 6px !important');
		$('#exportSchemas').attr('style', 'height: 35px !important');
		$('#exportSchemas').attr('style', 'font-size: 14px !important');
		$('#exportSchemas').attr('style', 'padding: 6px !important');
	}

	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBExportGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {
		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
		
		$("#startTime").datetimepicker('setTime',new Date()); 
	}
	
	function callAfterShowFormForAdd(){
		$('#excludedTables').attr('style', 'height: 35px !important');
		$('#excludedTables').attr('style', 'font-size: 14px !important');
		$('#excludedTables').attr('style', 'padding: 6px !important');
		$('#exportSchemas').attr('style', 'height: 35px !important');
		$('#exportSchemas').attr('style', 'font-size: 14px !important');
		$('#exportSchemas').attr('style', 'padding: 6px !important');
	}

	function callAfterSubmitForAdd(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBExportGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBExportGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			connectString : rowdata.connectString,
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
	
	function loadExcludeTableValues(client) {
		
		var urlVal = "rest/DBAUtilRestService/getImportAndExportTableForClient/" + client;
		var excludedTablesEle = $('#excludedTables');
		excludedTablesEle.attr('name', 'excludedTables');
		excludedTablesEle.empty();
		$.ajax({
			url : urlVal
		}).done(function(response) {
			
			$('#excludedTables').val(response.tables);
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