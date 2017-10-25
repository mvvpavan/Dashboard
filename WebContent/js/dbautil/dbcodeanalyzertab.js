function initDBCodeAnalyzerPage() {

	$("#dbCodeAnalyzerGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBCodeAnalyzerList',
						datatype : "json",
						colNames : [ ' Client ', ' DB Connect String ',
								'Status', 'V3 Schema', ' Scheduled Time',
								'Email Notification',' Inserted By','Inserted Date' ],

						colModel : [
								{
									name : 'client',
									index : 'client',
									width : 180,
									editrules : {
										required : true
									},
									editable : true,
									edittype : "select",
									formoptions : {
										rowpos : 1,
										colpos : 1
									},
									editoptions : {
										width : 250,
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
												debugger;
												var client = $(element).val();
												if (client) {
													loadSrcDBValues(client);
													loadEmailValues(client);
												}
											});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'dbConnectString',
									index : 'dbConnectString',
									width : 230,
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
													'dbConnectString');
										}
									}
								}, {
									name : 'status',
									index : 'status',
									width : 130
								}, {
									name : 'v3schema',
									index : 'v3schema',
									width : 250,
									editrules : {
										required : true
									},
									editable : true,
									edittype : "text"
								}, {
									name : 'scheduledTime',
									index : 'scheduledTime',
									width : 160,
									editable : true,
									edittype : "text",
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat : 'HH:mm',
												minDate : new Date(),
												autoSize : false,
												height : 35,
												width : 250,
												maxDate : "+5Y",
												showOn : 'focus'
											});
										}
									}
								}, {
									name : 'email',
									index : 'email',
									width : 250,
									editrules : {
										required : true
									},
									editable : true,
									edittype : "textarea",
									editoptions : {
										rows : 2,
										cols : 30
									},
									formoptions : {
										rowpos : 5,
										colpos : 1
									}
								}, {
									name : 'insertedBy',
									index : 'insertedBy',
									width : 130
								}, {
									name : 'insertedDate',
									index : 'insertedDate',
									width : 130
								
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbCodeAnalyzerPager',
						paging : true,
						height : '225',
						width : $("#tabs-19").width(),
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
						caption : " DB Code Analyzer ",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'y');
						}
					});
	jQuery("#dbCodeAnalyzerGrid").jqGrid('navGrid', '#dbCodeAnalyzerPager', {
		edit : true,
		edittext : ' Edit ',
		add : true,
		addtext : ' Add ',
		del : false,
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#dbCodeAnalyzerGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#dbCodeAnalyzerGrid").trigger("reloadGrid");
		}
	}, {
		// edit
		width : 850,
		url : 'rest/DBAUtilRestService/updateDBCodeAnalyzer',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterEdit : true,
		viewPagerButtons : false,
		beforeShowForm : callBeforeShowFormForEdit,
		afterShowForm : callAfterShowFormForEdit,
		afterSubmit : callAfterSubmit
	}, {
		// add
		width : 850,
		url : 'rest/DBAUtilRestService/updateDBCodeAnalyzer',
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		afterSubmit : callAfterSubmit
	});

	function callBeforeShowFormForAdd(formid) {

		var connectStringEle = $('#dbConnectString');
		connectStringEle.attr('name', 'dbConnectString');
		connectStringEle.prop("disabled", true);
		$("#scheduledTime").datetimepicker('setTime', new Date());

	}

	function callAfterShowFormForEdit(formid) {

		var clientNameEle = $('#client');
		clientNameEle.attr("disabled", "disabled");

		var connectStringEle = $('#dbConnectString');
		connectStringEle.attr("disabled", "disabled");

	}

	function callBeforeShowFormForEdit(formid) {

		var myGrid = $('#dbCodeAnalyzerGrid');
		var selRowId = myGrid.jqGrid('getGridParam', 'selrow');
		var clientValue = myGrid.jqGrid('getCell', selRowId, 'client');
		var srcDBValue = myGrid.jqGrid('getCell', selRowId, 'dbConnectString');

		loadSrcDBValues(clientValue, srcDBValue);

		var startTime = $("#scheduledTime").val() + "";
		if (new Date(startTime) < new Date()) {
			$("#scheduledTime").datetimepicker('setTime', new Date());
			var d = new Date();
			currDate = d.getFullYear() + "-"
					+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
					+ ("00" + d.getDate()).slice(-2) + " "
					+ ("00" + d.getHours()).slice(-2) + ":"
					+ ("00" + d.getMinutes()).slice(-2);
			$("#scheduledTime").val(currDate);
		}
	}
	
	function callAfterSubmit(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#dbCodeAnalyzerGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
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
		var srcDBNameEle = $('#dbConnectString');
		srcDBNameEle.attr('name', 'dbConnectString');
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