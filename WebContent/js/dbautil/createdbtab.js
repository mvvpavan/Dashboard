function initCreateDBPage() {
	
	$("#createDBGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getCreateDBHistList/' + "N",
				datatype : "json",
				colNames : [ 'Source DB ', 'Target Client ', 'Target DB ',
						'Status', 'Start Time', 'Target DB SID',
						'Target DB Host IP', 'Database Memory',
						'Enable Target DB Backup', 'Database Purpose',
						'Email ', 'Requested By', 'Requested Date' ],

				colModel : [ {
					name : 'srcDBConnectString',
					index : 'srcDBConnectString',
					// frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'trgtDBClientName',
					index : 'trgtDBClientName',
					// frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgDBConnectString',
					index : 'trgDBConnectString',
					width : 150,
					search : true,
					sortable : true
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
					sortable : true
				}, {
					name : 'trgDBSID',
					index : 'trgDBSID',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgDBHostIP',
					index : 'trgDBHostIP',
					width : 150,
					search : true,
					sortable : true

				}, {
					name : 'databaseMemory',
					index : 'databaseMemory',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'enableTargetDBBackup',
					index : 'enableTargetDBBackup',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'databasePurpose',
					index : 'databasePurpose',
					width : 150,
					search : true,
					sortable : true

				}, {
					name : 'emailNotification',
					index : 'emailNotification',
					width : 150,
					search : true,
					sortable : true

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
				} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				paging : true,
				pager : '#createDBPager',
				height : '225',
				width : $("#tabs-14").width(),
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				gridview : true,
				shrinkToFit : false,
				hoverrows : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Create DB ",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'y');
				}
			});

	$("#createDBGrid").jqGrid("setFrozenColumns");
	jQuery("#createDBGrid").jqGrid('navGrid', '#createDBPager', {

		del : true,
		deltext : ' Delete ',
		add : false,
		edit : false,
		search : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#createDBGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#createDBGrid").trigger("reloadGrid");
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
		url : 'rest/DBAUtilRestService/deleteDatabase',
		serializeDelData : getSerializedDeleteData,
		afterSubmit : callAfterSubmitForDelete
	}, {
	// search options
	}).navButtonAdd('#createDBPager', {
		caption : "Add ",
		buttonicon : "ui-icon-plus",
		onClickButton : function() {
			$("#createDB_startTime").datetimepicker('setTime', new Date());
			$("#createDB_sourceDBString").prop("disabled", true);
			initCreateDBTargetHostPage("undefined");
			$("#createDB_errorMessage").text("");
			$("#createDB_targetDBIp").prop("disabled", true);
			getSrcTrgClientLists();
			addRecordDialog.dialog("open"); 
		},
		position : "first"
	});
	
	addRecordDialog = $("#createDB_addRecordDiv")
			.dialog(
					{
						autoOpen : false,
						height : 700,
						width : 1100,
						modal : true,
						scroller : true,
						buttons : {
							"Submit" : function() {

								$("#createDB_errorMessage").text("");
								var srcClient = $('#createDB_sourceClient')
										.val();
								var srcDBString = $('#createDB_sourceDBString')
										.val();
								var trgClient = $('#createDB_targetClient')
										.val();
								var trgDBString = $('#createDB_targetDbString')
										.val();
								var trgDBHostIP = $('#createDB_targetDBIp')
										.val();
								var trgDBSid = $('#createDB_targetDbSid').val();
								// var memory = $('#createDB_memory').val();
								var dbPurpose = $('#createDB_comments').val();
								// var startTime = $(
								// '#createDB_startTime').val();
								var email = $('#createDB_email').val();

								if (srcClient == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Please Select the Source Client..  ");
								} else if (srcDBString == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Please Select the Source DB string..  ");
								} else if (trgClient == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Please Select the Target Client..  ");
								} else if (trgDBString == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Target DB string should not be left blank..  ");
								} else if (trgDBHostIP == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Target DB Host ip should not be left blank.. ");
								} else if (trgDBSid == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Target DB Sid should not be left blank.. ");
								} else if (dbPurpose == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Comments should not be left blank.. ");
								} else if (email == "") {
									$("#createDB_errorMessage")
											.text(
													"Error: Email should not be left blank.. ");
								} else {

									createDatabase();

								}
							},
							Cancel : function() {
								$("#form_CreateDB").trigger("reset");
								addRecordDialog.dialog("close");
							}
						},
						close : function() {
							$("#form_CreateDB").trigger("reset");
							$('#createDB_srcDBSize').text("(Size: )");
							$("#createDB_targetDbHostGrid")
									.jqGrid('GridUnload');

							addRecordDialog.dialog("close");
						}
					});
	
	createDBErrDialog = $("#createDB_ErrorDiv ").dialog({
		autoOpen : false,
		height : "auto",
		width : "auto",
		modal : true,
		buttons : {
			"Ok" : function() {
				createDBErrDialog.dialog("close");
			}
		},
		close : function() {
			createDBErrDialog.dialog("close");
		}
	});

	$('#createDB_sourceClient')
			.change(
					function() {

						var createDB_selectedSrcClient = $(
								'#createDB_sourceClient').val();
						$("#createDB_sourceDBString").prop("disabled", false);
						$('#createDB_srcDBSize').text("(Size: )");
						$('#createDB_email').val("");
						$
								.ajax(
										{
											url : "rest/DBAUtilRestService/getSrcDBList/"
													+ createDB_selectedSrcClient,
											type : "GET"
										})
								.done(
										function(response) {

											var s = $('#createDB_sourceDBString');
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
													+ createDB_selectedSrcClient,
											type : "GET"
										}).done(function(response) {
									$('#createDB_email').val(response.email);
								});
					});

	$('#createDB_sourceDBString').change(
			function() {

				var createDB_selectedSrcDB = $('#createDB_sourceDBString')
						.val();

				$.ajax(
						{
							url : "rest/DBAUtilRestService/getDBSize/"
									+ createDB_selectedSrcDB,
							type : "GET"

						}).done(
						function(response) {
							$('#createDB_srcDBSize').text(
									"(Size: " + response + " GB )");
						});
			});

	$('#createDB_targetClient')
			.change(
					function() {
						debugger;
						$("#createDB_targetDbHostGrid").jqGrid('GridUnload');
						$("#createDB_targetDBIp").val("");

						var trgClientName = $('#createDB_targetClient').val();

						initCreateDBTargetHostPage();
						$
								.ajax({
									url : 'rest/DBAUtilRestService/getTargetDBHostListForCreateDBTab/'
											+ trgClientName,
									type : "GET",
									contentType : 'application/json',
									success : function(resultData) {
										$("#createDB_targetDbHostGrid").jqGrid(
												'setGridParam', {
													datatype : "local",
													data : resultData
												}).trigger("reloadGrid");

											/*jQuery(
												"#createDB_targetDbHostGrid .jqgrow td input")
												.change(
														function() {
															$(
																	"#createDB_targetDbHostGrid .jqgrow td input")
																	.not(this)
																	.prop(
																			'checked',
																			false);
														});*/

										// .jqgrow is class name of jqgrid table
										// rows(tr)

										/*jQuery(".jqgrow td input").click(
												function() {
													debugger;

													// below line will select the 2nd TD element
													// in the parent TR of the check box.
													var trgDBIP = $(
															'td:nth-child(3)',
															$(this).parent()
																	.parent())
															.html();
													$("#createDB_targetDBIp")
															.val(trgDBIP);

												});*/

									} 
								});
					});
	
	 $("#createDB_targetDbString").blur(function () {
		 var trgDBString =  $("#createDB_targetDbString").val();
		 $.ajax(
					{
						url : "rest/DBAUtilRestService/validateConnectString/"
								+ trgDBString,
						type : "GET"

					})
			.done(
					function(response) {
						if (response == 'Y') {
							$("#createDB_targetDbString").val("");
							$("#createDB_targetDbString").focus();
							createDBErrDialog.dialog("open");
						} 
					});
         
     });

	$("#createDB_targetDbString").inputmask({
		alias : "Regex",
		regex : "^[A-Za-z0-9_]*$"
	// regex:"^[A-Za-z_][A-Za-z0-9_]*$" // first letter should not be a number,
	// later on only allows alphabets, numbers, and underscore only
	});

	$("#createDB_targetDbSid").inputmask({
		alias : "Regex",
		regex : "^[a-z_][^A-Z]{7}$"
	// should not start with no, all r lower case, max 8 char
	});

	function createDatabase() {

		var jsonObj = {};

		jsonObj.srcClient = $('#createDB_sourceClient').val();
		jsonObj.srcDBString = $('#createDB_sourceDBString').val();
		jsonObj.trgClient = $('#createDB_targetClient').val();
		jsonObj.trgDBString = $('#createDB_targetDbString').val();
		jsonObj.trgDBHostIP = $('#createDB_targetDBIp').val();
		jsonObj.trgDBSid = $('#createDB_targetDbSid').val();
		jsonObj.memory = $('#createDB_memory').val();
		if($('#createDB_bckupTrgtDB').is(':checked'))
			jsonObj.enableTrgDBBackup = 'Y';
		else
			jsonObj.enableTrgDBBackup = 'N';
		jsonObj.dbPurpose = $('#createDB_comments').val();
		jsonObj.startTime = $('#createDB_startTime').val();
		jsonObj.email = $('#createDB_email').val();

		var json_data = JSON.stringify(jsonObj);

		$
				.ajax({
					url : "rest/DBAUtilRestService/createDatabase",
					type : 'POST',
					contentType : "application/json",
					data : json_data,
					success : function(data) {
						if (data.status == "Success") {
							addRecordDialog.dialog("close");
							jQuery("#createDBGrid").setGridParam({
								datatype : 'json'
							});
							jQuery("#createDBGrid").trigger("reloadGrid");
						} else {
							$("#createDB_errorMessage").text(
									"Error : " + data.message);
						}

					},
					failure : function(data) {
						$("#createDB_errorMessage").text("Error : " + data);
					}
				});
	}

	function getSerializedDeleteData(postdata) {
		var rowdata = $('#createDBGrid').getRowData(postdata.id);
		// append postdata with any information
		return {
			id : postdata.id,
			oper : postdata.oper,
			reqID : rowdata.reqID,
			trgDBConnectString : rowdata.trgDBConnectString,
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
			$('#createDBGrid').trigger('reloadGrid');
			return [ true, '', '' ];
		}
	}
	
	function getSrcTrgClientLists() {
		$.ajax({
			url : "rest/DBAUtilRestService/getAllClientsListForUser",
			type : "GET"

		}).done(
				function(response) {

					var s = $('#createDB_sourceClient');
					var options = $("<option value=''>Select</option>");
					s.append(options);
					for (var i = 0; i < response.length; i++) {
						options = $('<option value="' + response[i] + '">'
								+ response[i] + '</option>');
						s.append(options);
					}
				});

		$.ajax({
			url : "rest/DBAUtilRestService/getAllClientsListForUser",
			type : "GET"

		}).done(
				function(response) {

					var s = $('#createDB_targetClient');
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
