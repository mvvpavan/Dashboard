function initCPUResourceManagerPage() {

	$("#CPUResourceManagerGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getCPUResourceManagerLogList',
				datatype : "json",
				colNames : [ '  Client ', ' VM Name ', ' Connect String',
						'Max CPU Limit', 'Status ', 'Request Type',
						' Scheduled Time', 'Requested By ', 'Requested Date ',
						' Email Notification' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150,
				}, {
					name : 'vmName',
					index : 'vmName',
					width : 150
				}, {
					name : 'connectString',
					index : 'connectString',
					width : 180
				}, {
					name : 'maxCPULimit',
					index : 'maxCPULimit',
					width : 180
				}, {
					name : 'status',
					index : 'status',
					width : 280
				}, {
					name : 'requestType',
					index : 'requestType',
					width : 280

				}, {
					name : 'startTime',
					index : 'startTime',
					width : 250,
				}, {
					name : 'reqBy',
					index : 'reqBy',
					width : 180,
					align : 'center'
				}, {
					name : 'reqDate',
					index : 'reqDate',
					width : 170
				}, {
					name : 'email',
					index : 'email',
					width : 270
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#cpuResourceManagerPager',
				paging : true,
				height : '225',
				width : $("#tabs-16").width(),
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
				caption : " CPU Resource Manager ",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'y');
				}
			});
	jQuery("#CPUResourceManagerGrid")
			.jqGrid('navGrid', '#cpuResourceManagerPager', {
				del : true,
				deltext : ' Delete ',
				add : false,
				edit : false,
				search : false,
				refresh : true,
				refreshtext : 'Refresh',
				beforeRefresh : function() {
					jQuery("#CPUResourceManagerGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#CPUResourceManagerGrid").trigger("reloadGrid");
				},
			}, {
			// edit Analyze
			}, {
			// add Analyze
			}, {
				// delete Analyze
				width : 500,
				recreateForm : true,
				reloadAfterSubmit : true,
				url : 'rest/DBAUtilRestService/deleteCPUResourceManager',
				serializeDelData : getSerializedDeleteData,
				afterSubmit : callAfterSubmitForDelete
			}, {
			// search options
			})
			.navButtonAdd(
					'#cpuResourceManagerPager',
					{
						caption : "Edit ",
						buttonicon : "ui-icon-pencil",
						onClickButton : function() {

							var rowid = $("#CPUResourceManagerGrid").jqGrid(
									'getGridParam', 'selrow');
							if (rowid == null) {
								cpuRsrcMngerEditErrrDialog.dialog("open");
							} else {
								$('#cpuResourceManager_addRecordDiv').dialog('option', 'title', 'Edit Record');
								cpuRsrcMngr_addDialog.dialog("open");
								debugger;
								var client = $("#CPUResourceManagerGrid")
										.jqGrid('getRowData', rowid).client;
								var vmName = $("#CPUResourceManagerGrid")
										.jqGrid('getRowData', rowid).vmName;

								initCpuLimitPage("undefined", "undefined");
								$("#cpuResourceManager_errorMessage").text("");
								
								$("#cpuResourceManager_startTime").datetimepicker('setTime',new Date());

								$('#cpuResourceManager_client').val(client);

								$
										.ajax(
												{
													url : 'rest/DBAUtilRestService/getVMNamesForCatalog/'
															+ client,
													type : "GET"
												})
										.done(
												function(response) {
													debugger;
													// alert("getting vm names");
													var s = $('#cpuResourceManager_vmName');
													$(
															'#cpuResourceManager_vmName')
															.empty();
													var options = $("<option value=''>Select</option>");
													s.append(options);
													for (var i = 0; i < response.length; i++) {
														options = $('<option value="'
																+ response[i]
																+ '">'
																+ response[i]
																+ '</option>');
														s.append(options);
													}
													$(
															'#cpuResourceManager_vmName')
															.val(vmName);
													$(
															'#cpuResourceManager_vmName')
															.trigger("change");
													$(
															"#cpuResourceManager_client")
															.prop("disabled",
																	true);
													$(
															"#cpuResourceManager_vmName")
															.prop("disabled",
																	true);
													$(
															"#cpuResourceManager_requestType")
															.prop("disabled",
																	false);
												});

								$
										.ajax(
												{
													url : "rest/DBAUtilRestService/getEmailValueForClient/"
															+ client,
													type : "GET"
												})
										.done(
												function(response) {

													$(
															'#cpuResourceManager_email')
															.val(response.email);
												});
							}

						},
						position : "first"
					}).navButtonAdd(
					'#cpuResourceManagerPager',
					{
						caption : "Add ",
						buttonicon : "ui-icon-plus",
						onClickButton : function() {
							initCpuLimitPage("undefined", "undefined");
							$("#cpuResourceManager_errorMessage").text("");
							$("#cpuResourceManager_client")
							.prop("disabled",
									false);
							$("#cpuResourceManager_vmName").prop("disabled",
									true);
							$("#cpuResourceManager_requestType").prop(
									"disabled", true);
							
							$('#cpuResourceManager_addRecordDiv').dialog('option', 'title', 'Add Record');
							$("#cpuResourceManager_startTime").datetimepicker('setTime',new Date());
							getClientList();
							cpuRsrcMngr_addDialog.dialog("open");
						},
						position : "first"
					});

	cpuRsrcMngr_addDialog = $("#cpuResourceManager_addRecordDiv")
			.dialog(
					{
						autoOpen : false,
						height : "auto",
						width : "auto",
						modal : true,
						scroller : true,
						buttons : {
							"Submit" : function() {
								$("#cpuResourceManager_errorMessage").text("");
								var clientVal = $('#cpuResourceManager_client')
										.val();
								var vmNameVal = $('#cpuResourceManager_vmName')
										.val();
								var reqTypeVal = $(
										'#cpuResourceManager_requestType')
										.val();
								var startTimeVal = $(
										'#cpuResourceManager_startTime').val();
								var emailVal = $('#cpuResourceManager_email')
										.val();

								if (clientVal == "") {
									$("#cpuResourceManager_errorMessage")
											.text(
													"Error: Please Select the Client..  ");
								} else if (vmNameVal == "") {
									$("#cpuResourceManager_errorMessage")
											.text(
													"Error: Please Select the VM Name..  ");
								} else if (reqTypeVal == "") {
									$("#cpuResourceManager_errorMessage")
											.text(
													"Error: Please Select the Request type..  ");
								} else if (startTimeVal == "") {
									$("#cpuResourceManager_errorMessage")
											.text(
													"Error: Please Select the Start time..  ");
								} else if (emailVal == "") {
									$("#cpuResourceManager_errorMessage").text(
											"Error: Please give the Email.. ");
								} else {
									var i = 0;
									var myRow;
									var totCpuLimit = 0;

									var myIDs = $(
											"#cpuResourceManager_cpuLimitGrid")
											.jqGrid('getDataIDs');
									if (myIDs.length != 0) {
										for (i = 0; i < myIDs.length; i++) {
											myRow = $(
													"#cpuResourceManager_cpuLimitGrid")
													.jqGrid('getRowData',
															myIDs[i]);
											totCpuLimit = totCpuLimit
													+ parseInt(myRow.cpuLimit);

										}

										if (totCpuLimit != 100) {
											cpuAllocationErrorDialog
													.dialog("open");
										} else {

											enableSaveClicked();

										}
									} else {
										$("#cpuResourceManager_errorMessage")
												.text(
														"Error: No DB's in VM to change CPU limit.. ");
									}
								}
							},
							Cancel : function() {
								$("#form_CpuResourceManager").trigger("reset");
								$("#cpuResourceManager_cpuLimitGrid").jqGrid(
										'GridUnload');
								cpuRsrcMngr_addDialog.dialog("close");
							}
						},
						close : function() {
							$("#form_CpuResourceManager").trigger("reset");
							$("#cpuResourceManager_cpuLimitGrid").jqGrid(
									'GridUnload');
							cpuRsrcMngr_addDialog.dialog("close");
						}
					});

	cpuAllocationErrorDialog = $("#cpuRsrcManager_cpuAllocationErrDiv").dialog(
			{
				autoOpen : false,
				height : "auto",
				width : "auto",
				modal : true,
				buttons : {
					"Ok" : function() {
						cpuAllocationErrorDialog.dialog("close");
					}
				},
				close : function() {
					cpuAllocationErrorDialog.dialog("close");
				}
			});

	$('#cpuResourceManager_client')
			.change(
					function() {

						var cpuRManger_selectedClient = $(
								'#cpuResourceManager_client').val();
						$("#cpuResourceManager_vmName").prop("disabled", false);
						$('#cpuResourceManager_cpuLimitGrid').jqGrid(
								'clearGridData');
						$
								.ajax(
										{
											url : 'rest/DBAUtilRestService/getVMNamesForCatalog/'
													+ cpuRManger_selectedClient,
											type : "GET"

										})
								.done(
										function(response) {

											var s = $('#cpuResourceManager_vmName');
											$('#cpuResourceManager_vmName')
													.empty();
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
													+ cpuRManger_selectedClient,
											type : "GET"
										}).done(
										function(response) {

											$('#cpuResourceManager_email').val(
													response.email);
										});

					});

	$('#cpuResourceManager_vmName').change(function() {
		debugger;
		var client = $('#cpuResourceManager_client').val();
		var vmName = $('#cpuResourceManager_vmName').val();

		$("#cpuResourceManager_cpuLimitGrid").jqGrid('GridUnload');

		initCpuLimitPage(client, vmName);
	});

	function enableSaveClicked() {
		debugger;
		var jsonObj = {};
		jsonObj.client = $('#cpuResourceManager_client').val();
		jsonObj.vmName = $('#cpuResourceManager_vmName').val();
		jsonObj.reqType = $('#cpuResourceManager_requestType').val();
		jsonObj.startTime = $('#cpuResourceManager_startTime').val();
		jsonObj.email = $('#cpuResourceManager_email').val();
		var myIDs = $("#cpuResourceManager_cpuLimitGrid").jqGrid('getDataIDs');
		var rowCnt = myIDs.length;

		var cpuLimitArr = new Array();
		for (var i = 0; i < rowCnt; i++) {
			cpuLimitArr[i] = new Array(2);
			myRow = $("#cpuResourceManager_cpuLimitGrid").jqGrid('getRowData',
					myIDs[i]);
			cpuLimitArr[i][0] = myRow.dbName;
			cpuLimitArr[i][1] = myRow.cpuLimit;
		}
		jsonObj.cpuLimitArray = cpuLimitArr;
//		alert("cpuLimitArray:" + cpuLimitArray);

		/*
		 * Sending cpuLimitArr as JSON Object var cpuLimitArr = []; for (var
		 * i=0;i<rowCnt;i++) { myRow = $(
		 * "#cpuResourceManager_cpuLimitGrid").jqGrid( 'getRowData', myIDs[ i ] );
		 * var row = { "dbName": myRow.dbName, "cpuLimit": myRow.cpuLimit };
		 * cpuLimitArr.push(row); }
		 * jsonObj.cpuLimitArray=JSON.stringify(cpuLimitArr);
		 */

		var json_data = JSON.stringify(jsonObj);

		$.ajax({
			url : "rest/DBAUtilRestService/addScheduleCPURsrcMngr",
			type : 'POST',
			contentType : "application/json",
			data : json_data,
			success : function(data) {
				if (data.status == "Success") {
					cpuRsrcMngr_addDialog.dialog("close");
					jQuery("#CPUResourceManagerGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#CPUResourceManagerGrid").trigger("reloadGrid");
				} else {
					$("#cpuResourceManager_errorMessage").text(
							"Error : " + data.message);
				}

			},
			failure : function(data) {
				$("#cpuResourceManager_errorMessage").text("Error : " + data);
			}
		});
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#CPUResourceManagerGrid').getRowData(postdata.id);
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			client : rowdata.client,
			vmName : rowdata.vmName,
		};
	}

	function callAfterSubmitForDelete(response, postdata) {

		var responseObj = JSON.parse(response.responseText);
		if (responseObj.status == 'Fail') {
			return [ false, responseObj.message, '' ];

		} else {
			$(this).jqGrid("setGridParam", {
				datatype : 'json'
			});
			$('#CPUResourceManagerGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	cpuRsrcMngerEditErrrDialog = $("#cpuRsrcManager_EditErrDiv").dialog(
			{
				autoOpen : false,
				height : "auto",
				width : "auto",
				modal : true,
				buttons : {
					"Ok" : function() {
						cpuRsrcMngerEditErrrDialog.dialog("close");
					}
				},
				close : function() {
					cpuRsrcMngerEditErrrDialog.dialog("close");
				}
			});
	
	function getClientList() {
		$.ajax({
			url : "rest/DBAUtilRestService/getClientList",
			type : "GET"

		}).done(
				function(response) {

					var s = $('#cpuResourceManager_client');
					var options = $("<option value=''>Select</option>");
					s.append(options);
					for (var i = 0; i < response.length; i++) {
						options = $('<option value="' + response[i] + '">'
								+ response[i] + '</option>');
						s.append(options);
					}
				});
	}
}