function initV3DataComparisonPage() { 
	$("#v3DataComparisonGrid")
			.jqGrid(
					{
//						url : 'rest/DBAUtilRestService/getV3DataComparison/',
						datatype : "json",
						colNames : [  'Source Client','Source DB','Target Client','Target DB','Status',
						              'Start Time','Source DB IP','Target DB IP', 'Email', 
						             'Requested By', 'Requested Date'],

						colModel : [ {
							name : 'srcClient',
							index : 'srcClient',
							width : 150,
							fixed : true,
							search : true,
							sortable : true,
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
								dataUrl : "rest/DBAUtilRestService/getClientList",
								buildSelect : function(data) {

									var response = jQuery
											.parseJSON(data);
									var s = '<select id="srcClient" name="srcClient">';
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
									$(element).attr('id', 'srcClient');
									$(element).change(function() {
										var val = $(element).val();
										$("#srcDB").prop("disabled", false);
										loadSourceDBValues(val); 
										loadEmailValues(val);
										$('#srcDBHostIP').val("");
									});
								}
							}
						}, {
							name : 'srcDB',
							index : 'srcDB',
							width : 150,
							fixed : true,
							search : true,
							sortable : true,
							editrules : {
								required : true
							},
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
											'srcDB');
									
									$(element).change(function() {
//										var str = $(element).val();
//										var ipVal = str.split("_");
//										$(srcDBHostIP).val(ipVal[0]);
										
										var ipVal = $(element).val();
										$(srcDBHostIP).val(ipVal);
									});
								}
							}
						}, {
							name : 'trgClient',
							index : 'trgClient',
							width : 150,
							search : true,
							sortable : true,
							editrules : {
								required : true
							},
							editable : true,
							edittype : "select",
							formoptions : {
								rowpos : 4,
								colpos : 1
							},
							editoptions : {
								dataUrl : "rest/DBAUtilRestService/getClientList",
								buildSelect : function(data) {

									var response = jQuery.parseJSON(data);
									var s = '<select id="trgClient" name="trgClient">';
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
									$(element).attr('id', 'trgClient');
									$(element).change(function() {
										var val = $(element).val();
										$("#trgDB").prop("disabled", false);
										loadTargetDBValues(val); 
										$('#trgDBHostIP').val("");
									});
								}
							}
						}, {
							name : 'trgDB',
							index : 'trgDB',
							width : 150,
							search : true,
							sortable : true,
							editrules : {
								required : true
							},
							editable : true,
							edittype : "select",
							formoptions : {
								rowpos : 5,
								colpos : 1
							},
							editoptions : {
								dataInit : function(element) {
									var option = $("<option>");
									option.val('');
									option.text("Select");
									$(element).append(option);
									$(element).attr('id',
											'trgDB');
									
									$(element).change(function() {
//										var str = $(element).val();
//										var ipVal = str.split("_");
//										$(trgDBHostIP).val(ipVal[0]);
										
										var ipVal = $(element).val();
										$(trgDBHostIP).val(ipVal);
									});
								}
							}
						}, {
							name : 'status',
							index : 'status',
							width : 150,
							search : true,
							sortable : true
						}, {
							name : 'startTime',
							index : 'startTime',
							width : 150,
							search : true,
							sortable : true,
							editrules : {
								required : true
							},
							formoptions : {
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
										defaultValue : new Date(),
										width : 250,
										maxDate : '+5Y',
										showOn : 'focus'
									});
									
								}
							},
						}, {
							name : 'srcDBHostIP',
							index : 'srcDBHostIP',
							width : 150,
							formoptions : {
								rowpos : 3,
								colpos : 1
							},
							editable : true,
							hidden:true,
							edittype : "text",
							editrules: {
								edithidden:true,
								required: true
							} 
						}, {
							name : 'trgDBHostIP',
							index : 'trgDBHostIP',
							width : 150,
							hidden:true,
							formoptions : {
								rowpos : 6,
								colpos : 1
							},
							editable : true,
							edittype : "text",
							editrules: {
								edithidden:true,
								required: true
							} 
						}, {
							name : 'email',
							index : 'email',
							width : 150,
							search : true,
							sortable : true,
							formoptions : {
								rowpos : 8,
								colpos : 1
							},
							edittype : "textarea",
							editoptions : {
								rows : 1,
								cols : 30
							},
							editrules : {
								required : true
							},
							editable : true
						
						}, {
							name : 'requestedBy',
							index : 'requestedBy',
							width : 150,
							search : true,
							sortable : true
						}, {
							name : 'requestedDate',
							index : 'requestedDate',
							width : 150,
							search : true,
							sortable : true
						}],

						rowNum : 10,
						rowList : [ 5, 10, 15, 20 ],
						paging : true,
						pager : '#v3DataComparisonPager',
						height : '225',
						width : $("#tabs-21").width(),
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows: true,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce:true,
						caption : "V3 Data Comparison",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[7,8],'y');
						}
					});
	
	$("#v3DataComparisonGrid").jqGrid("setFrozenColumns");
	jQuery("#v3DataComparisonGrid").jqGrid('navGrid', '#v3DataComparisonPager', {

		del : false,
//		deltext : 'Delete',
		add : true,
		addtext : 'Add',
		edit : false,
		edittext : 'Edit',
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#v3DataComparisonGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#v3DataComparisonGrid").trigger("reloadGrid");
		},
//		closeAfterEdit : true

	}, {
		
	}, {
		// add 
		url : 'rest/DBAUtilRestService/addV3DataComparison',
		width : 970,
		modal : true,
		jqModal : true,
		reloadAfterSubmit : true,
		recreateForm : true,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		serializeEditData : getSerializedAddData,
		afterSubmit : callAfterSubmitForAdd
	}, {
		
	});
	
	function callBeforeShowFormForAdd(formid) {

		$("#startTime").datetimepicker('setTime',new Date());
		$("#srcDB").prop("disabled", true);
		$("#trgDB").prop("disabled", true);
		$("#srcDBHostIP").prop("disabled", true);
		$("#trgDBHostIP").prop("disabled", true);

	}
	
	function getSerializedAddData(postdata) {
		// append postdata with any information
		return {
			srcClient : $('#srcClient').val(),
			srcDB : $('#srcDB option:selected').text(),
			srcDBHostIP : $('#srcDBHostIP').val(), 
			trgClient : $('#trgClient').val(),
			trgDB : $('#trgDB option:selected').text(),
			trgDBHostIP :  $('#trgDBHostIP').val(),
			startTime : $('#startTime').val(),
			email :$('#email').val() 
		};
	}

	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#v3DataComparisonGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function loadSourceDBValues(client) {
		var srcDBNameEle = $('#srcDB');
		srcDBNameEle.attr('name', 'srcDB');
		srcDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			srcDBNameEle.append(option);
			srcDBNameEle.prop("disabled", true);

		} else {
			srcDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getClientDBAndIPList/" + client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				srcDBNameEle.append(selOption);
				for (var key in data) {
//			        alert(key+":"+data[key]);
					var option = $("<option>");
					option.text(key);
					option.val(data[key]);
					srcDBNameEle.append(option);
			    }
			});
		}
	}
	
	function loadTargetDBValues(client, trgDBValue) {
		
		var trgDBNameEle = $('#trgDB');
		trgDBNameEle.attr('name', 'trgDB');
		trgDBNameEle.empty();
		if (!client) {
			var option = $("<option>");
			option.val('');
			option.text("Select");
			trgDBNameEle.append(option);
			trgDBNameEle.prop("disabled", true);

		} else {
			trgDBNameEle.prop("disabled", false);
			var urlVal = "rest/DBAUtilRestService/getClientDBAndIPList/" + client;

			$.ajax({
				url : urlVal
			}).done(function(data) {
				
				var selOption = $("<option>");
				selOption.val('');
				selOption.text("Select");
				trgDBNameEle.append(selOption);
				for (var key in data) {
//			        alert(key+":"+data[key]);
					var option = $("<option>");
					option.text(key);
					option.val(data[key]);

					trgDBNameEle.append(option);
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
