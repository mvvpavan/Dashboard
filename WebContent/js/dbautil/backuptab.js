function initBackupPage() {
	$("#DBBackupGrid")
			.jqGrid(
					{
//						'Longterm Backup',
						url : 'rest/DBAUtilRestService/getDBBackupLogList',
						datatype : "json",
						colNames : [' Client ','Connect String','Backup Frequency',
						    		'Backup Type ','Retention Days', 'Retention Copies', 
						    		'Status',' Backup Start Time','Backup End Time',
						    		'Backup Size (GB)', 'Requested By ', 
						    		'Email ','Retention Type','Retention Spinner'],
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
											});

										}

									}
								},{
									name : 'connectString',
									index : 'connectString',
									frozen: true,
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										label:'Database',
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
									name : 'backupFreq',
									index : 'backupFreq',
									frozen: true,
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
										value : "DAILY:DAILY;ADHOC:ADHOC",
										dataInit : function(element) {
											
//											WEEKEND:WEEKEND;
											$(element)
													.change(
															function() {
																var val = $(
																		element)
																		.val();

//																var longTermBackupEle = $('#longTermBackup');

																if (val == 'ADHOC') {

																	$('#tr_startTime',
																	"#FrmGrid_DBBackupGrid")
																	.show();
//																	longTermBackupEle
//																			.prop(
//																					"disabled",
//																					false);
																	var d = new Date();
																	currDate = d.getFullYear() + "-" +
																		    ("00" + (d.getMonth() + 1)).slice(-2) + "-" + 
																		    ("00" + d.getDate()).slice(-2) + " " + 
																		    ("00" + d.getHours()).slice(-2) + ":" + 
																		    ("00" + d.getMinutes()).slice(-2);
																	$('#startTime').datetimepicker('setTime',new Date());
																	$("#startTime").val(currDate);

																} else {
																	$('#startTime').val('');
																	$('#tr_startTime',
																	"#FrmGrid_DBBackupGrid")
																	.hide();
//																	longTermBackupEle
//																			.prop(
//																					"disabled",
//																					true);
																}
															});

										}
									}
								}, {
									name : 'backupType',
									index : 'backupType',
									width : 150,
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										rowpos : 4,
										colpos : 1
									},
									editable : true,
									width : 150,
									edittype : "select",
									editoptions : {  
										value : "RMAN:RMAN;EXPORT:EXPORT",
									}
								}, {
									name : 'backupRetDays',
									index : 'backupRetDays',
									sorttype:'integer' ,
									width : 180,
								}, {
									name : 'backupRetCopies',
									index : 'backupRetCopies',
									sorttype:'integer' ,
									width : 180
									
								}, {
									name : 'status',
									index : 'status',
									width : 180
									
								}, {
									
									name : 'startTime',
									index : 'startTime',
									formoptions : {
										label: 'Start Time',
										rowpos : 7,
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
												height:35,
												showOn : 'focus'
											});
										}
									},
									width : 200,
									fixed : true
								}, {
									name : 'endTime',
									index : 'endTime',
									width : 200,
									shrinkToFit : false,
								// align : 'center'
//								}, {
//									name : 'backupExpiryDate',
//									index : 'backupExpiryDate',
//									width : 200,
//									fixed : true
								}, {
									name : 'backupSize',
									index : 'backupSize',
									sorttype:'integer' ,
									width : 200,
									shrinkToFit : false,
								// align : 'center'
								}, {
									name : 'reqBy',
									index : 'reqBy',
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
										label:'Email',
										rowpos : 6,
										colpos : 1
									},
									editrules : {
										required : true
									},
									// align : 'center',
									editable : true
//								}, {
//									name : 'longTermBackup',
//									index : 'longTermBackup',
//									width : 170,
//									edittype : "checkbox",
//									editoptions : {
//										value : "Y:N",
//										defaultValue : 'N'
//									},
//									formoptions : {
//										label:'Longterm Backup',
//										rowpos : 7,
//										colpos : 1
//									},
//									align : 'center',
//									editable : true
								}, {
									name : 'retentionType',
									index : 'retentionType',
									width : 150,
									hidden : true,
									editable : true,
									editrules : {
										edithidden : true
									},
									hidedlg : true,
									fixed : true,
									formoptions : {
										label:'Retention',
										rowpos : 5,
										colpos : 1
									},
									width : 150,
									edittype : "select",
									editoptions : {
										value : "Copies:Copies;Days:Days",
										dataInit : function(element) {
											
											$(element).change(function() {
												 
												 var val = $(
															element)
															.val();


												var retentionSpinnerEle = $('#retentionSpinner');
												if (val == 'Copies') {
													retentionSpinnerEle.spinner({
														step : 1,
														min : 1,
														max : 5
													});
													retentionSpinnerEle.spinner( "value", 2 );
												}else{
													retentionSpinnerEle.spinner({
														step : 1,
														min : 1,
														max : 30
													});
													retentionSpinnerEle.spinner( "value", 14 );
												}
											});
										}
									}
								},{
									name : 'retentionSpinner',
									index : 'retentionSpinner',
									width : 60,
									hidden : true,
									editable : true,
									editrules : {
										edithidden : true
									},
									hidedlg : true,
									formoptions : {
										label:'',
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
												value = 1;
											}
											return '<input type="text" id="retentionSpinner" value="'
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
											var recurFreqSpinner = $(elem)
													.find(">input").spinner({
														step : 1,
														min : 1,
														max : 5
													});
											recurFreqSpinner.size(5);
											recurFreqSpinner.spinner( "value", 2 );
										}

									}
								
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbBackupPager',
						paging : true,
						height : '225',
						width : $("#tabs-5").width(),
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
						caption : "DB Backup",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[13,14],'y');
						}
					});
	$("#DBBackupGrid").jqGrid("setFrozenColumns");
	jQuery("#DBBackupGrid").jqGrid('navGrid', '#dbBackupPager', {
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
		 beforeRefresh:function(){
		        jQuery("#DBBackupGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBBackupGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true

	}, {
		// edit Backup
		width : 850,
		//		height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBBackup',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		//		closeOnEscape : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add Backup
		width : 850,
		//		height : 350,
		url : 'rest/DBAUtilRestService/updateDBBackup',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		//		closeOnEscape : true,
		recreateForm : true,
		closeAfterAdd : true,

//		beforeShowForm : callBeforeShowFormForAdd,
		afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete Backup
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBBackup',

		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	},{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Find")','#dbBackupPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbBackupPager').css('color','white');
		}
	}, {});
	
	jQuery('.ui-pg-div:contains("Refresh")', '#dbBackupPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbBackupPager').css('color','white');
	});

	function callAfterSubmitForDelete(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			// alert(" Exception while deleting : "+
			// responseObj.message );
			return [ false, responseObj.message, '' ];

		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBBackupGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForEdit(formid) {
		

		var myGrid = $('#DBBackupGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');

		loadSrcDBValues(clientValue, srcDBValue);

	}

	function callAfterShowFormForEdit(formid) {

		
		var myGrid = $('#DBBackupGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#connectString');
		connectStringEle.attr("disabled", "disabled");

		var retentionTypeEle = $('#retentionType');
		var retentionSpinnerEle = $('#retentionSpinner');
		var backupRetDaysVal = myGrid.jqGrid('getCell', selRowId, 'backupRetDays');
		var backupRetCopiesVal = myGrid.jqGrid('getCell', selRowId, 'backupRetCopies');
		
		if(backupRetDaysVal=='0'){
			
			retentionTypeEle.val("Copies");
			retentionSpinnerEle.spinner({
				step : 1,
				min : 1,
				max : 5
			});
			retentionSpinnerEle.spinner( "value", backupRetCopiesVal );
//			retentionSpinnerEle.spinner( "value", backupRetCopiesVal );
		}else{
			retentionTypeEle.val("Days");
			retentionSpinnerEle.spinner({
				step : 1,
				min : 1,
				max : 30
			});
			retentionSpinnerEle.spinner( "value", backupRetDaysVal );
//			retentionSpinnerEle.spinner( "value", backupRetDaysVal );
		}
		
		var backupFreqEle = myGrid.jqGrid('getCell', selRowId, 'backupFreq');
//		backupFreqEle.attr("disabled", "disabled");

//		var longTermBackupEle = $('#longTermBackup');

		if (backupFreqEle == 'ADHOC') {

			$('#tr_startTime',
			"#FrmGrid_DBBackupGrid")
			.show();
//			longTermBackupEle.prop("disabled", false);
			
		} else {
			$('#startTime').val('');
			$('#tr_startTime',
			"#FrmGrid_DBBackupGrid")
			.hide();
//			longTermBackupEle.prop("disabled", true);
		}

	}
	
	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBBackupGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function callAfterShowFormForAdd(formid) {

		var backupFreqEle = $('#backupFreq');
//		backupFreqEle.attr("disabled", "disabled");

//		var longTermBackupEle = $('#longTermBackup');

		if (backupFreqEle == 'ADHOC') {

			$('#tr_startTime',
			"#FrmGrid_DBBackupGrid")
			.show();
//			longTermBackupEle.prop("disabled", false);
			
		} else {
			$('#startTime').val('');
			$('#tr_startTime',
			"#FrmGrid_DBBackupGrid")
			.hide();
//			longTermBackupEle.prop("disabled", true);
		}

	}


//	function callBeforeShowFormForAdd(formid) {
//		// 
//
//		var srcDBNameEle = $('#connectString');
//		srcDBNameEle.attr('name', 'connectString');
//		srcDBNameEle.prop("disabled", true);
//		var backupFreqEle = $('#backupFreq');
////		backupFreqEle.attr("disabled", "disabled");
//
//		var longTermBackupEle = $('#longTermBackup');
//		var startTimeEle = $('#startTime');
//
//		if (backupFreqEle == 'ADHOC') {
//
//			startTimeEle.prop("disabled", false);
//			longTermBackupEle.prop("disabled", false);
//			
//		} else {
//			startTimeEle.prop("disabled", true);
//			longTermBackupEle.prop("disabled", true);
//		}
//	}


	function callAfterSubmitForAdd(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBBackupGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		// 
		var rowdata = $('#DBBackupGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			connectString : rowdata.connectString,
			backupFreq : rowdata.backupFreq
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
		// 
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