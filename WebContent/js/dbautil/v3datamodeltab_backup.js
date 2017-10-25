function initV3DatamodelPage() {

	$("#datamodelGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getV3DatamodelList',
						datatype : "json",
						colNames : [ 'Type of DB Compare',' Source Client ', ' Target Client ', 'Source DB','Target DB', 'Status', 
						             ' Scheduled Time','Source DB Dump', ' Target DB Dump','Extract V3 Metadata ', 'Email ',' DB Comparison Id' ],
						colModel : [
								{
									name : 'typeOfDBCompare',
									index : 'typeOfDBCompare',
									hidden : true,
									hidedlg : true,
									shrinkToFit : false,
									align : 'center'
								},
								{
									name : 'srcClient',
									index : 'srcClient',
									width : 150,
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
											var s = '<select id="client" name="srcClient">';
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
									name : 'trgClient',  
									index : 'trgClient',
									hidden : true,
									width : 150,
									hidedlg : true,
									fixed : true,
									sortable : true
								},
								{
									name : 'srcDB',
									index : 'srcDB',
									width : 150,
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
											$(element).attr('id', 'srcDB');
											$(element)
											.change(
													function() {
														debugger;
														var clientVal = $('#srcClient').val();
														var srcDBVal = $(element).val();
														loadSrcDBValues(clientVal,srcDBVal);
													});
										}
									},
									fixed : true,
									sortable : true
								},
								{
									name : 'trgDB', 
									index : 'trgDB',
									width : 150,
									fixed : true,
									sortable : true
								}, {
									name : 'status', 
									index : 'status',
									width : 150
								}, {
									name : 'scheduledTime',
									index : 'scheduledTime',
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
									width : 200,
									fixed : true
								}, {
									name : 'srcDbDump', 
									index : 'srcDbDump',
									width : 270,
						            search: false
								}, {
									name : 'trgDbDump',
									index : 'trgDbDump',
									width : 270,
								}, {
									name : 'extractV3Metadata', 
									index : 'extractV3Metadata',
									width : 150

								}, {
									name : 'email', 
									index : 'email',
									width : 270,
									formoptions : {
										rowpos : 4,
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
									}									
								}, {
									name : 'dbComparisonId', 
									index : 'dbComparisonId',
									hidden : true,
									width : 150
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#datamodelPager',
						paging : true,
						height : '225',
						width : $("#tabs-18").width(),
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
						caption : " V3 Data Model ",
						beforeSelectRow : function(rowid) {

							var thisId = $.jgrid.jqID(this.id);

							var statusValue = $(this).jqGrid('getCell', rowid,
									'status');

							if (statusValue == "REQUESTED") {
								// enable the "Del" button in the navigator
								$("#del_" + thisId).removeClass(
										'ui-state-disabled');

							} else {
								// unselect previous selected row
								// disable "Del" button in the navigator
								$("#del_" + thisId).addClass(
										'ui-state-disabled');
							}
							return true; // allow selection or unselection
						},
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[1,2,3,12],'y');
						}
					});
	jQuery("#datamodelGrid").jqGrid('navGrid', '#datamodelPager', {
		edit : false,
		add : true,
		addtext : ' Extract Data Model ',
		del : true,
		deltext : ' Delete ',
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#datamodelGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#datamodelGrid").trigger("reloadGrid");
		},
	}, {
	// edit Analyze
	}, {
		// add Analyze
		width : 980,
		url : 'rest/DBAUtilRestService/extractDatamodel',
		reloadAfterSubmit : true,
		modal : true,
		jqModal : true,
		recreateForm : true,
		closeOnEscape : false,
		closeAfterAdd : true,
		beforeShowForm : callBeforeShowFormForAdd,
		beforeSubmit : callBeforeSubmitForAdd,
		afterSubmit : callAfterSubmitForAdd,
	}, {
	// delete Analyze
		width : 500,
		recreateForm : true,
		reloadAfterSubmit : true,
		closeAfterDelete : true,
		url : 'rest/DBAUtilRestService/deleteV3Datamodel',
		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	}, {
	// search options
	}).navButtonAdd('#datamodelPager', {
		caption : "Compare DB's",
		buttonicon : "ui-icon-plus",
		onClickButton : function() {
			
			$("#v3DataModel_errorMessage").text("");
			$("#v3DataModel_srcClient").prop("disabled", true);
			$("#v3DataModel_srcDB").prop("disabled", true);
			$("#v3DataModel_srcDBDump").prop("disabled", true);
			$("#v3DataModel_srcDBDump_uploadBtn").prop("disabled", true);
			$("#v3DataModel_trgClient").prop("disabled", true);
			$("#v3DataModel_trgDB").prop("disabled", true);
			$("#v3DataModel_trgDBDump").prop("disabled", true);
			$("#v3DataModel_trgDBDump_uploadBtn").prop("disabled", true);
			$("#v3DataModel_scheduledTime").datetimepicker('setTime', new Date());
			
			addRecordDialog.dialog("open"); 
		},
		position : "first"
	});
	
	function callBeforeShowFormForAdd(){
		
		$('#srcDB').prop("disabled", true);
		$("#scheduledTime").datetimepicker('setTime', new Date());
	}
	
	function callAfterSubmitForAdd(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];
		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#datamodelGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
		
	}
	
	function callBeforeSubmitForAdd(response, postdata) {
		
			if ($('#srcDB').val() == "") {
				$("#srcDB").css("display", "inline");
				return [ false, 'Source DB : Field is required' ]; // error			
			}
		return [true,'']; // no error
	}	
	
	addRecordDialog = $("#v3DataModel_addRecordDiv")
	.dialog(
			{
				autoOpen : false,
				height : auto,
				width : 1000,
				modal : true,
				scroller : true,
				buttons : {
					"Submit" : function() {

						$("#v3DataModel_errorMessage").text("");
						var typeOfDBCompare = $('#v3DataModel_typeOfDBCompare').val();
						var srcClient = $('#v3DataModel_srcClient').val();
						var srcDB = $('#v3DataModel_srcDB').val();
						var srcDBDump = $('#v3DataModel_srcDBDump').val();
						var trgClient = $('#v3DataModel_trgClient').val();
						var trgDB = $('#v3DataModel_trgDB').val();
						var trgDBDump = $('#v3DataModel_trgDBDump').val();
						var scheduledTime = $('#v3DataModel_scheduledTime').val();
						var email = $('#v3DataModel_email').val();
						
						if( email == "" ||  scheduledTime == "" ) {
							$("#v3DataModel_errorMessage").text('Scheduled time, Email : Fields are required');
						} else {
							if(typeOfDBCompare == ""){
								$("#v3DataModel_errorMessage").text('Type of DB Compare Field is required');
							}
							else if(typeOfDBCompare =="srcDBTrgDB") {
								if(srcClient == "" || srcDB == "" 
									|| trgClient == "" || trgDB == "" ) 
									$("#v3DataModel_errorMessage").text('Source Client, Source DB, Target Client and Target DB : Fields are required');
								else
									scheduleCompareDBs();
									
							} else if(typeOfDBCompare =="srcDBTrgDump") {
								if(srcClient == "" || srcDB == "" 
									|| trgDBDump == "" )
									$("#v3DataModel_errorMessage").text('Source Client, Source DB and Target DB Dump File : Fields are required');
								else
									scheduleCompareDBs();
								
							} else if(typeOfDBCompare =="srcDumpTrgDB") {
								if(srcDBDump == "" || trgClient == "" 
									|| trgDB == "" ) 
									$("#v3DataModel_errorMessage").text('Source Dump File, Target Client and Target DB : Fields are required');
								else
									scheduleCompareDBs();
								
							} else if(typeOfDBCompare =="srcDumpTrgDump") {
								if(srcDBDump == ""){
									$("#v3DataModel_errorMessage").text('Source DB Dump File : Field is required');
								}
								else if(trgDBDump == ""){
									$("#v3DataModel_errorMessage").text('Target DB Dump File : Field is required');
								}
								else
									scheduleCompareDBs();
							}											
						}
						
					},
					Cancel : function() {
						$("#form_v3DataModel").trigger("reset");
						addRecordDialog.dialog("close");
					}
				},
				close : function() {
					$("#form_v3DataModel").trigger("reset");
					addRecordDialog.dialog("close");
				}
			});
	
	$('#v3DataModel_typeOfDBCompare')
	.change(
			function() {
				$("#v3DataModel_email").val('');
				var val = $('#v3DataModel_typeOfDBCompare').val();
				if(val== 'srcDBTrgDB'){
					$('#v3DataModel_srcClient').prop("disabled",false);
					$('#v3DataModel_srcDB').prop("disabled",false);
					$('#v3DataModel_trgClient').prop("disabled",false);
					$('#v3DataModel_trgDB').prop("disabled",false);
					
					$("#v3DataModel_srcDBDump").val('');
					$('#v3DataModel_srcDBDump').prop("disabled",true);
					$("#v3DataModel_srcDBDump_uploadBtn").prop("disabled", true);
					$("#v3DataModel_trgDBDump").val('');
					$('#v3DataModel_trgDBDump').prop("disabled",true);	
					$("#v3DataModel_trgDBDump_uploadBtn").prop("disabled", true);
				} else if(val== 'srcDBTrgDump') {
					$('#v3DataModel_srcClient').prop("disabled",false);
					$('#v3DataModel_srcDB').prop("disabled",false); 
					$('#v3DataModel_trgDBDump').prop("disabled",false);
					$("#v3DataModel_trgDBDump_uploadBtn").prop("disabled", false);
					
					$("#v3DataModel_srcDBDump").val('');
					$('#v3DataModel_srcDBDump').prop("disabled",true);
					$("#v3DataModel_srcDBDump_uploadBtn").prop("disabled", true);
					$("#v3DataModel_trgClient").val('');
					$('#v3DataModel_trgClient').prop("disabled",true);
					$("#v3DataModel_trgDB").val('');
					$('#v3DataModel_trgDB').prop("disabled",true);
				} else if(val== 'srcDumpTrgDB') {
					$('#v3DataModel_srcDBDump').prop("disabled",false);
					$("#v3DataModel_srcDBDump_uploadBtn").prop("disabled", false);
					$('#v3DataModel_trgClient').prop("disabled",false);
					$('#v3DataModel_trgDB').prop("disabled",false);
					
					$("#v3DataModel_srcClient").val('');
					$('#v3DataModel_srcClient').prop("disabled",true);
					$("#v3DataModel_srcDB").val('');
					$('#v3DataModel_srcDB').prop("disabled",true);
					$('#v3DataModel_trgDBDump').val('');
					$('#v3DataModel_trgDBDump').prop("disabled",true);
					$("#v3DataModel_trgDBDump_uploadBtn").prop("disabled", true);
					
					
				} else if(val== 'srcDumpTrgDump') {
					$('#v3DataModel_srcDBDump').prop("disabled",false);
					$('#v3DataModel_trgDBDump').prop("disabled",false);
					$("#v3DataModel_srcDBDump_uploadBtn").prop("disabled", false);
					$("#v3DataModel_trgDBDump_uploadBtn").prop("disabled", false);
					
					$("#v3DataModel_srcClient").val('');
					$('#v3DataModel_srcClient').prop("disabled",true);
					$("#v3DataModel_srcDB").val('');
					$('#v3DataModel_srcDB').prop("disabled",true);
					$('#v3DataModel_trgClient').val('');
					$('#v3DataModel_trgClient').prop("disabled",true);
					$('#v3DataModel_trgDB').val('');
					$('#v3DataModel_trgDB').prop("disabled",true);
					
				} else {
					$("#v3DataModel_srcClient").val('');
					$('#v3DataModel_srcClient').prop("disabled",true);
					$("#v3DataModel_srcDB").val('');
					$('#v3DataModel_srcDB').prop("disabled",true);
					$("#v3DataModel_srcDBDump").val('');
					$('#v3DataModel_srcDBDump').prop("disabled",true);
					$("#v3DataModel_trgClient").val('');
					$('#v3DataModel_trgClient').prop("disabled",true);
					$("#v3DataModel_trgDB").val('');
					$('#v3DataModel_trgDB').prop("disabled",true);
					$("#v3DataModel_trgDBDump").val('');
					$('#v3DataModel_trgDBDump').prop("disabled",true);
				}
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getClientList",
		type : "GET"

	}).done(
			function(response) {

				var s = $('#v3DataModel_srcClient');
				var options = $("<option value=''>Select</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
				
			});
	
	$('#v3DataModel_srcClient')
	.change(
			function() {

				var selectedSrcClient = $('#v3DataModel_srcClient').val();
				
				$("#v3DataModel_srcDB").prop("disabled", false);
				$('#v3DataModel_email').val("");
				$
						.ajax(
								{
									url : "rest/DBAUtilRestService/getSrcDBList/"
											+ selectedSrcClient,
									type : "GET"
								})
						.done(
								function(response) {

									var s = $('#v3DataModel_srcDB');
									s.empty();
									var options = $("<option value=''>Select</option>");
									s.append(options);
									for (var i = 0; i < response.length; i++) {
										options = $('<option value="'
												+ response[i] + '">'
												+ response[i]
												+ '</option>');
										s.append(options);
									}

								});						

				$
						.ajax(
								{
									url : "rest/DBAUtilRestService/getEmailValueForClient/"
											+ selectedSrcClient,
									type : "GET"
								}).done(function(response) {
							$('#v3DataModel_email').val(response.email);
						});
			});
	
	$.ajax({
		url : "rest/DBAUtilRestService/getClientList",
		type : "GET"

	}).done(
			function(response) {

				var s = $('#v3DataModel_trgClient');
				var options = $("<option value=''>Select</option>");
				s.append(options);
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="' + response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
				
			});
	
	$('#v3DataModel_trgClient')
	.change(
			function() {

				var selectedTrgClient = $('#v3DataModel_trgClient').val();
				
				$("#v3DataModel_trgDB").prop("disabled", false);
				$('#v3DataModel_email').val("");
				$
						.ajax(
								{
									url : "rest/DBAUtilRestService/getSrcDBList/"
											+ selectedTrgClient,
									type : "GET"
								})
						.done(
								function(response) {

									var s = $('#v3DataModel_trgDB');
									s.empty();
									var options = $("<option value=''>Select</option>");
									s.append(options);
									for (var i = 0; i < response.length; i++) {
										options = $('<option value="'
												+ response[i] + '">'
												+ response[i]
												+ '</option>');
										s.append(options);
									}

								});						

				$
						.ajax(
								{
									url : "rest/DBAUtilRestService/getEmailValueForClient/"
											+ selectedTrgClient,
									type : "GET"
								}).done(function(response) {
							$('#v3DataModel_email').val(response.email);
						});
			});

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#datamodelGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			srcDB : rowdata.srcDB,
			trgDB : rowdata.trgDB
		};
	}
	
	function callAfterSubmitForDelete(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {

			// alert(" Exception while deleting : "+ responseObj.message );
			return [ false, responseObj.message, '' ];

		} else {

			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#datamodelGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function loadSrcDBValues(client, srcDBValue) {
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
	
	function scheduleCompareDBs() {

		var jsonObj = {};
		
		jsonObj.typeOfDBCompare = $('#v3DataModel_typeOfDBCompare').val();
		jsonObj.scheduledTime = $('#v3DataModel_scheduledTime').val();
		jsonObj.email = $('#v3DataModel_email').val();
		
		if($('#v3DataModel_typeOfDBCompare').val() == "srcDBTrgDB" ) {
			jsonObj.srcClient = $('#v3DataModel_srcClient').val();
			jsonObj.srcDB = $('#v3DataModel_srcDB').val();
			jsonObj.trgClient = $('#v3DataModel_trgClient').val();
			jsonObj.trgDB = $('#v3DataModel_trgDB').val();
			
			jsonObj.srcDbDump = "";
			jsonObj.trgDbDump = "";
			
		} else if($('#v3DataModel_typeOfDBCompare').val() == "srcDBTrgDump" ) {
			jsonObj.srcClient = $('#v3DataModel_srcClient').val();
			jsonObj.srcDB = $('#v3DataModel_srcDB').val();
			jsonObj.trgDbDump = $('#v3DataModel_trgDBDump').val();
			
			jsonObj.srcDbDump = "";
			jsonObj.trgClient = "";
			jsonObj.trgDB = "";
			
		} else if($('#v3DataModel_typeOfDBCompare').val() == "srcDumpTrgDB" ) {
			jsonObj.srcDbDump = $('#v3DataModel_srcDBDump').val();
			jsonObj.trgClient = $('#v3DataModel_trgClient').val();
			jsonObj.trgDB = $('#v3DataModel_trgDB').val();
			
			jsonObj.srcClient = "";
			jsonObj.srcDB = "";
			jsonObj.trgDbDump = "";
			
		} else if($('#v3DataModel_typeOfDBCompare').val() == "srcDumpTrgDump" ) {
			jsonObj.srcDbDump = $('#v3DataModel_srcDBDump').val();
			jsonObj.trgDbDump = $('#v3DataModel_trgDBDump').val();
			
			jsonObj.srcClient = "";
			jsonObj.srcDB = "";
			jsonObj.trgClient = "";
			jsonObj.trgDB = "";
		}
		
		var json_data = JSON.stringify(jsonObj);

		$
				.ajax({
					url : 'rest/DBAUtilRestService/scheduleDBCompare',
					type : 'POST',
					contentType : "application/json",
					data : json_data,
					success : function(data) {
						if (data.status == "Success") {
							addRecordDialog.dialog("close");
							jQuery("#datamodelGrid").setGridParam({
								datatype : 'json'
							});
							jQuery("#datamodelGrid").trigger("reloadGrid");
						} else {
							$("#v3DataModel_errorMessage").text(
									"Error : " + data.message);
						}

					},
					failure : function(data) {
						$("#v3DataModel_errorMessage").text("Error : " + data);
					}
				});
	}
}