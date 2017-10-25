function initADDMReportsPage() {

	$("#addmReportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getAddmReportList',
						datatype : "json",
						colNames : [ 'Client', 'Connect String',' Status ', ' Start Time ', 'End Time', 'Email', 'Requested By', 
						             ' Requested Date'],
						colModel : [
						        {
						        	name : 'client',
						        	index : 'client',
						        	width : 160,
						        	align : 'center',
						        	hidden : true,
									hidedlg : true,
									editable : true,
									editrules : {
										required : true,
										edithidden : true
									},
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
									name : 'connectString',
									index : 'connectString',
									width : 190,
									align : 'center',
									formoptions : {
										rowpos : 2,
										colpos : 1
									},
									editable : true,
									edittype : "select",
									editrules : {
										required : true
									},
									editoptions : {
										width : 250,
										dataInit : function(element) {
											var option = $("<option>");
											option.val('');
											option.text("Select");
											$(element).append(option);
											$(element).attr('id', 'connectString');
											$(element)
											.change(
													function() {
														debugger;
														var clientVal = $('#client').val();
														var srcDBVal = $(element).val();
														loadSrcDBValues(clientVal,srcDBVal);
													});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'status',
									index : 'status',
									width : 160,
									fixed : true,
									sortable : true
								},
								{
									name : 'startTime',
									index : 'startTime',
									width : 170,
									formoptions : {
										rowpos : 3,
										colpos : 1
									},
									editable : true,
									edittype : "text",
									editrules : {
										required : true
									},
									editoptions : {
										dataInit : function(element) {
											$(element).datetimepicker({
												dateFormat : 'yy-mm-dd',
												timeFormat: 'HH:00',
												minDate : '-3d',
												maxDate : new Date(),
												autoSize : false,
												width : 250,
												showOn : 'focus'
											});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'endTime',
									index : 'endTime',
									width : 170,
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
												timeFormat: 'HH:00',
												minDate : '-3d',
												maxDate : new Date(),
												autoSize : false,
												width : 250,
												showOn : 'focus'
											});
										}
									},
									fixed : true,
									sortable : true
								},
								
								{
									name : 'email',
									index : 'email',
									width : 177,
									formoptions : {
										rowpos : 5,
										colpos : 1
									},
									editable : true,
									edittype : "textarea",
									editoptions : {
										rows : 1,
										cols : 30
									},
									editrules : {
										required : true
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'requestedBy',
									index : 'requestedBy',
									width : 160,
									fixed : true,
									sortable : true
								},
								{
									name : 'requestedDate',
									index : 'requestedDate',
									width : 170,
									fixed : true,
									sortable : true
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#addmReportPager',
						paging : true,
//						height : '528',
						height : '420',
						width : $("#tabs-22").width(),
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
						caption : " ADDM Report ",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[1],'y');
						}
					});
	jQuery("#addmReportGrid").jqGrid('navGrid', '#addmReportPager', {
		edit : false,
		add : true,
		addtext : ' Add ',
		del : false,
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#addmReportGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#addmReportGrid").trigger("reloadGrid");
		},
	}, {
	// edit addm report
	}, {
		// add addm report
		width : 980,
		url : 'rest/DBAUtilRestService/scheduleADDMReport',
		reloadAfterSubmit : true,
		modal : true,
		jqModal : true,
		recreateForm : true,
		closeOnEscape : false,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		afterSubmit : callAfterSubmitForAdd,
	}, {
		// delete addm report
	}, {
	// search options
	});
	
	function callBeforeShowFormForAdd(){
		$('#connectString').prop("disabled", true);
//		$("#startTime").datetimepicker('setTime', new Date());
	}
	
	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#addmReportGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
		
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
			var urlVal = "rest/DBAUtilRestService/getSrcDBList/" + client;

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
}