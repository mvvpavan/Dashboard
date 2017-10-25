function initDBOSToIHRefreshPage() {
	$("#DBOSToIHRefreshGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBOSToIHRefreshLogList',
						datatype : "json",
						colNames : [ ' Source OS ', ' Client ',
								'Source DB SID', ' Target DB', ' Status',' Start Time',
								'Control File Backup Location',
								'Backup Location', 'Encryption Password',
								'Cleanup DB', 'Defrag DB', 
								'Requested By', ' Email Notification ',
								'Source DB File Name Convert' ],
						colModel : [
								{
									name : 'sourceOS',
									index : 'sourceOS',
									frozen: true,
									width : 150,
									editable : true,
									editrules : {
//										edithidden : true,
										required : true
									},
									fixed : true,
									formoptions : {
										rowpos : 1,
//										label:'Source OS',
										colpos : 1
									},
									edittype : "select",
									editoptions : {
										value : "WINDOWS:WINDOWS;LINUX:LINUX",
										dataInit : function(element) {
											
											$(element).attr('id',
													'sourceOS');
											$(element).attr('name',
											'sourceOS');
											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.val();
																/*var cntrlFileBckupLocEle = $('#cntrlFileBckupLoc');
																var srcDBSIDEle = $('#srcDBSID');
																var srcDBFileNameConvertEle = $('#srcDBFileNameConvert');*/
																if (val == 'WINDOWS') {

																	/*cntrlFileBckupLocEle
																			.prop(
																					"disabled",
																					false);
																	srcDBSIDEle
																			.prop(
																					"disabled",
																					false);
																	srcDBFileNameConvertEle.prop(
																			"disabled",
																			true);*/
																	$('#tr_cntrlFileBckupLoc',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.show();
																	$('#tr_srcDBSID',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.show();
																	$('#tr_srcDBFileNameConvert',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.hide();
																	
																} else {
																	/*cntrlFileBckupLocEle
																			.prop(
																					"disabled",
																					true);
																	srcDBSIDEle
																			.prop(
																					"disabled",
																					true);
																	
																	srcDBFileNameConvertEle.prop(
																			"disabled",
																			false);*/
																	$('#tr_cntrlFileBckupLoc',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.hide();
																	$('#tr_srcDBSID',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.hide();
																	$('#tr_srcDBFileNameConvert',
																	"#FrmGrid_DBOSToIHRefreshGrid")
																	.show();

																}
															});

										}
									}
								},
								{
									name : 'client',
									index : 'client',
									width : 150,
									frozen: true,
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
												loadTrgtDBValues(val);
												loadEmailValues(val);
											});
										}
									}
								},{
									name : 'srcDBSID',
									index : 'srcDBSID',
									frozen: true,
									width : 150,
									edittype : "text",
									formoptions : {
										label : 'Source DB SID ',
										rowpos : 4,
										colpos : 1
									},
									editable : true

								},{
									name : 'trgtDBConnectString',
									index : 'trgtDBConnectString',
									width : 180,
									shrinkToFit : false,
									align : 'center',
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										label : 'Target DB',
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
											$(element).attr('id',
													'trgtDBConnectString');
										}
									}
								}, {
									name : 'status',
									index : 'status',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								}, {
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
												width : 250,
												maxDate : '+5Y',
												height : 35,
												showOn : 'focus'
											});
										}
									},
									width : 200,
									fixed : true
								}, {
									name : 'cntrlFileBckupLoc',
									index : 'cntrlFileBckupLoc',
									width : 180,
									shrinkToFit : false,
									edittype : "text",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Backup Control File',
										rowpos : 7,
										colpos : 1
									},
									editable : true,
									align : 'center'
								}, {
									name : 'bckupLoc',
									index : 'bckupLoc',
									width : 180,
									shrinkToFit : false,
									edittype : "text",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Backup Location',
										rowpos : 8,
										colpos : 1
									},
									editable : true,
									editrules : {
										required : true
									},
									align : 'center'

								}, {
									name : 'encrPwrd',
									index : 'encrPwrd',
									width : 180,
									shrinkToFit : false,
									edittype : "text",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : 'Encryption Password',
										rowpos : 9,
										colpos : 1
									},
									editable : true,
									align : 'center'
								}, {
									name : 'cleanupDB',
									index : 'cleanupDB',
									width : 180,
									shrinkToFit : false,
									formoptions : {
										rowpos : 11,
										colpos : 1
									},
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									editable : true,
									align : 'center'
								}, {
									name : 'defragDB',
									index : 'defragDB',
									width : 180,
									shrinkToFit : false,
									formoptions : {
										rowpos : 12,
										colpos : 1
									},
									edittype : "checkbox",
									editoptions : {
										value : "Y:N",
										defaultValue : 'N'
									},
									editable : true,
									align : 'center'
								
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
										rowpos : 6,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true
								}, {
									name : 'srcDBFileNameConvert',
									index : 'srcDBFileNameConvert',
									edittype : "text",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : ' Source DB File Name Convert',
										rowpos : 10,
										colpos : 1
									},
									editable : true,
									width : 200
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbOSToIHRefreshPager',
						paging : true,
						height : '225',
						width : $("#tabs-9").width(),
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
						caption : "DB OS to IH Refresh",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	
	$("#DBOSToIHRefreshGrid").jqGrid("setFrozenColumns");
	jQuery("#DBOSToIHRefreshGrid").jqGrid('navGrid', '#dbOSToIHRefreshPager', {
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
	        jQuery("#DBOSToIHRefreshGrid").setGridParam({datatype: 'json'});
	        jQuery("#DBOSToIHRefreshGrid").trigger("reloadGrid");
	    },
		closeAfterEdit : true

	}, {
		
		width : 850,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBOSToIHRefresh',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		// beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		beforeSubmit: callBeforeSubmitForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add 
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBOSToIHRefresh',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		// closeOnEscape : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeSubmit: callBeforeSubmitForAdd,
		beforeShowForm : callBeforeShowFormForAdd,
		// afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete 
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBOSToIHRefresh',

		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	});

	function callBeforeSubmitForEdit(postdata, formid) {
		
		var sourceOSEle=$('#sourceOS').val();
		if (sourceOSEle == "WINDOWS") {
			if ($('#srcDBSID').val() == "") {
				$("#reqfield").css("display", "inline");
				return [ false, 'Source DB SID : Field is required' ]; // error
			}
			
			if ($('#cntrlFileBckupLoc').val() == "") {
				$("#reqfield").css("display", "inline");
				return [ false, 'Control File Backup Location : Field is required' ]; // error
			}
		}
		return [true,'']; // no error
	}
	function callBeforeSubmitForAdd(response, postdata) {
		
		var sourceOSEle=$('#sourceOS').val();
		if (sourceOSEle == "WINDOWS") {
			if ($('#srcDBSID').val() == "") {
				$("#reqfield").css("display", "inline");
				return [ false, 'Source DB SID : Field is required' ]; // error
			}
			
			if ($('#cntrlFileBckupLoc').val() == "") {
				$("#reqfield").css("display", "inline");
				return [ false, 'Control File Backup Location : Field is required' ]; // error
			}
		}
		return [true,'']; // no error
	}
	function callAfterSubmitForDelete(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			// alert(" Exception while deleting : "+
			// responseObj.message );
			return [ false, responseObj.message, '' ];

		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBOSToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callAfterShowFormForEdit(formid) {
		
		var rfrshStartTime=$("#rfrshStartTime").val()+"";
		if(new Date(rfrshStartTime) < new Date()) {
			$("#rfrshStartTime").datetimepicker('setTime',new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-" +
			    ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
			    ("00" + d.getDate()).slice(-2) + " " + 
			    ("00" + d.getHours()).slice(-2) + ":" + 
			    ("00" + d.getMinutes()).slice(-2);
			$("#rfrshStartTime").val(currDate);
		}

		var myGrid = $('#DBOSToIHRefreshGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var trgtDBEle = $('#trgtDBConnectString');

		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var trgtDBValue = myGrid.jqGrid('getCell', selRowId,
				'trgtDBConnectString');

		loadTrgtDBValues(clientValue, trgtDBValue);
		trgtDBEle.val(trgtDBValue);
		trgtDBEle.attr("disabled", "disabled");
		
		$('#sourceOS').trigger("change");
	}

	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBOSToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {

		$("#rfrshStartTime").datetimepicker('setTime',new Date());
		var trgtDBNameEle = $('#trgtDBConnectString');
//		var srcDBFileNameConvertEle = $('#srcDBFileNameConvert');
		trgtDBNameEle.attr('name', 'trgtDBConnectString');
		trgtDBNameEle.prop("disabled", true);
//		srcDBFileNameConvertEle.attr('name', 'srcDBFileNameConvert');
//		srcDBFileNameConvertEle.prop("disabled", true);
		
			$('#tr_srcDBFileNameConvert',
			"#FrmGrid_DBOSToIHRefreshGrid")
			.hide();
			
	}

	function callAfterSubmitForAdd(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBOSToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBOSToIHRefreshGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			trgtDBConnectString : rowdata.trgtDBConnectString,
			sourceOS : rowdata.sourceOS
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

	function loadTrgtDBValues(client, trgtDBValue) {
		var trgtDBNameEle = $('#trgtDBConnectString');
		trgtDBNameEle.attr('name', 'trgtDBConnectString');
		trgtDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			trgtDBNameEle.append(option);
			trgtDBNameEle.prop("disabled", true);

		} else {
			trgtDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getClientDBList/" + client;

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
}