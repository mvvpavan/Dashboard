function initRunAsSysDBAPage() {
	$("#RunAsSysDBAGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getRunAsSysDBALogList',
						datatype : "json",
						colNames : [ '  Client ', ' Connect String',
								' Start Time', 'Requested By ','Requested Date',
								' Email Notification'  ],

						colModel : [
								{
									name : 'client',
									index : 'client',
									width : 150,
									frozen : true,
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
												loadSrcDBValues(val);
												loadEmailValues(val);
											});

										}

									}
								},
								{
									name : 'connectString',
									index : 'connectString',
									width : 150,
									frozen : true,
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
										rowpos : 4,
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
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false
								}, {
									name : 'insertedDate',
									index : 'insertedDate',
									width : 200,
									shrinkToFit : false
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
										rowpos : 5,
										colpos : 1
									},
									editrules : {
										required : true
									},
									editable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#runAsSysDBAPager',
						paging : true,
						height : '225',
						width : $("#tabs-17").width(),
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
						caption : "Run As SYS DBA",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	$("#RunAsSysDBAGrid").jqGrid("setFrozenColumns");
	jQuery("#RunAsSysDBAGrid").jqGrid('navGrid', '#runAsSysDBAPager', {
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
			// alert('In beforeRefresh');
			jQuery("#RunAsSysDBAGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#RunAsSysDBAGrid").trigger("reloadGrid");
		},
		closeAfterEdit : true

	}, {
		// edit Analyze
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/addOrUpdateRunAsSysDBA',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmitForEdit
	}, {
		// add Analyze
		width : 850,
		// height : 350,
		url : 'rest/DBAUtilRestService/addOrUpdateRunAsSysDBA',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		// afterShowForm : callAfterShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd
	}, {
		// delete Analyze
		width : 500,
		// height : 250,
		recreateForm : true,
		reloadAfterSubmit : true,
		url : 'rest/DBAUtilRestService/deleteRunAsSysDBA',
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
			$('.ui-pg-div:contains("Find")','#runAsSysDBAPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#runAsSysDBAPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#runAsSysDBAPager').click(function(){
		$('.ui-pg-div:contains("Find")','#runAsSysDBAPager').css('color','white');
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
			$('#RunAsSysDBAGrid').trigger('reloadGrid');
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

		var myGrid = $('#RunAsSysDBAGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'connectString');

		loadSrcDBValues(clientValue, srcDBValue);
	}

	function callAfterShowFormForEdit(formid) {
		debugger;
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
			$('#RunAsSysDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function callBeforeShowFormForAdd(formid) {
		
		$("#startTime").datetimepicker('setTime',new Date());

		var srcDBNameEle = $('#connectString');
		srcDBNameEle.attr('name', 'connectString');
		srcDBNameEle.prop("disabled", true);
	}

	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#RunAsSysDBAGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#RunAsSysDBAGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
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

	function loadSrcDBValues(client, srcDBValue) {
		debugger;
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