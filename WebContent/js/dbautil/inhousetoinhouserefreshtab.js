function initDBIHToIHRefreshPage() {
	$("#DBIHToIHRefreshGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBIHToIHRefreshLogList',
						datatype : "json",
						colNames : [ ' Client ', ' Target DB', ' Status',
						             ' Start Time','Backup Location', 'Encryption Password',
								 'Requested By',
								' Restore Until Time', ' Email Notification ',
								'Source DB File Name Convert', '' ],
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
												loadTargetDBValues(val);
												loadEmailValues(val);
											});

										}

									}
								},
								{
									name : 'trgtDBConnectString',
									index : 'trgtDBConnectString',
									frozen: true,
									width : 180,
									shrinkToFit : false,
									align : 'center',
									editrules : {
										required : true
									},
									fixed : true,
									formoptions : {
										label : 'Target DB',
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
													'trgtDBConnectString');

										}
									}
								},
								{
									name : 'status',
									index : 'status',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								},{
									name : 'startTime',
									index : 'startTime',
									formoptions : {
										label : 'Restore Start Time',
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
								},
								{
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
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									editrules : {
										required : true
									},
									align : 'center'
								},
								{
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
										rowpos : 6,
										colpos : 1
									},
									editable : true,
									align : 'center'
								
								},{
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false,
									align : 'center'

								},
								{
									name : 'restorUntilTime',
									index : 'restorUntilTime',
									formoptions : {
										label : 'Restore Until Time',
										rowpos : 8,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat : 'HH:mm',
												maxDate : new Date(),
												autoSize : false,
												width : 250,
												height : 35,
												showOn : 'focus'
											});
										}
									},
									width : 200,
									fixed : true

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
										label : 'Email ',
										rowpos : 9,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true
								},
								{
									name : 'srcDbFileNameConvert',
									index : 'srcDbFileNameConvert',
									edittype : "text",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										label : ' Source DB File Name Convert',
										rowpos : 4,
										colpos : 1
									},
									editable : true,
									width : 250

								},
								{
									name : 'pointingTimeRecovery',
									index : 'pointingTimeRecovery',
									width : 170,
									edittype : "checkbox",
									hidden : true,
									editable : true,
									editrules : {
										edithidden : true
									},
									hidedlg : true,
									editoptions : {
										value : "Y:N",
										defaultValue : 'N',
										dataInit : function(element) {
											$(element)
													.change(
															function() {

																var val = $(
																		element)
																		.prop(
																				'checked');
																var restorUntilTimeEle = $('#restorUntilTime');
																if (val) {
																	restorUntilTimeEle
																			.prop(
																					"disabled",
																					false);
																} else {
																	restorUntilTimeEle
																			.prop(
																					"disabled",
																					true);
																}
															});
										}
									},
									formoptions : {
										label : 'Pointing Time Recovery',
										rowpos : 7,
										colpos : 1
									}
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbIHToIHRefreshPager',
						paging : true,
						height : '225',
						width : $("#tabs-10").width(),
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
						caption : "DB IH to IH Refresh",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[11],'y');
						}

					});
	$("#DBIHToIHRefreshGrid").jqGrid("setFrozenColumns");
	jQuery("#DBIHToIHRefreshGrid").jqGrid('navGrid', '#dbIHToIHRefreshPager', {
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
			jQuery("#DBIHToIHRefreshGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#DBIHToIHRefreshGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {
		// edit 
		width : 850,
		// height : 350,
		recreateForm : true,
		url : 'rest/DBAUtilRestService/updateDBIHToIHRefresh',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeOnEscape : false,
		viewPagerButtons : false,
		closeAfterEdit : true,
		viewPagerButtons : false,
		// beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add 
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/updateDBIHToIHRefresh',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterAdd : true,
		closeOnEscape : false,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForAdd,
		// afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete 
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteDBIHToIHRefresh',

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
			$('#DBIHToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callAfterShowFormForEdit(formid) {

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

		var myGrid = $('#DBIHToIHRefreshGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#trgtDBConnectString');
		var restorUntilTimeEle = $('#restorUntilTime');

		if (restorUntilTimeEle) {
			$('#pointingTimeRecovery').prop('checked', false);
			restorUntilTimeEle.prop("disabled", true);
		} else {
			$('#pointingTimeRecovery').prop('checked', true);
			restorUntilTimeEle.prop("disabled", false);

		}
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var trgDBValue = myGrid.jqGrid('getCell', selRowId,
				'trgtDBConnectString');

		loadTargetDBValues(clientValue, trgDBValue);
		connectStringEle.val(trgDBValue);
		connectStringEle.attr("disabled", "disabled");
	}

	function callAfterSubmitForEdit(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBIHToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {
		
		$("#startTime").datetimepicker('setTime',new Date());

		var trgtDBNameEle = $('#trgtDBConnectString');
		var restorUntilTimeEle = $('#restorUntilTime');
		trgtDBNameEle.attr('name', 'trgtDBConnectString');
		trgtDBNameEle.prop("disabled", true);
		restorUntilTimeEle.prop("disabled", true);
	}

	function callAfterSubmitForAdd(response, postdata) {
		
		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			
			$(this).jqGrid("setGridParam", {datatype: 'json'});
			$('#DBIHToIHRefreshGrid').trigger('reloadGrid');
			return [ true, '', '' ];

		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#DBIHToIHRefreshGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			trgtDBConnectString : rowdata.trgtDBConnectString,
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

	function loadTargetDBValues(client, trgDBValue) {
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
					if (trgDBValue) {
						if (data[i] == trgDBValue) {
							
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