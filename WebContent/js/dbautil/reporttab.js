function exportDataToExcelByReflect(reportType, fieldInfoMap) {
	debugger;
	var content = {};
	content.dispFieldInfoMap = fieldInfoMap;
	content.gridName = reportType;
	var clientNameForVMCatalog = $('#clientSelectedForVMCatalog').val();
	var hostLocationForVMCatalog = $('#hostLocationForVMCatalog').val();
	var hostNameForVMCatalog = $('#hostNameForVMCatalog').val();
	var vmNameForVMCatalog = $('#vmNameForVMCatalog').val();
	var vmTypeForVMCatalog = $('#vmType').val();
	var versionForVMCatalog = $('#versionForVMCatalog').val();
	var ipForVMCatalog = $('#vmIP').val();

	var clientNameForDBCatalog = $('#clientSelectedForDBCatalog').val();
	var dbStatusVal = $('#dbStatus').val();
	var sidVal = $('#sidForDBCatalog').val();
	var hostLocationForDBCatalog = $('#hostLocationForDBCatalog').val();
	var hostNameForDBCatalog = $('#hostNameForDBCatalog').val();
	var vmNameForDBCatalog = $('#vmNameForDBCatalog').val();

	var clientNameForAPPCatalog = $('#clientSelectedForAPPCatalog').val();
	var hostLocationForAPPCatalog = $('#hostLocationForAPPCatalog').val();
	var hostNameForAPPCatalog = $('#hostNameForAPPCatalog').val();
	var vmNameForAPPCatalog = $('#vmNameForAPPCatalog').val();

	content.sidVal = sidVal;
	content.hostLocationForDBCatalog = hostLocationForDBCatalog;
	content.hostNameForDBCatalog = hostNameForDBCatalog;
	content.vmNameForDBCatalog = vmNameForDBCatalog;
	content.clientNameForAPPCatalog = clientNameForAPPCatalog;
	content.hostLocationForAPPCatalog = hostLocationForAPPCatalog;
	content.hostNameForAPPCatalog = hostNameForAPPCatalog;
	content.vmNameForAPPCatalog = vmNameForAPPCatalog;
	content.clientNameForVMCatalog = clientNameForVMCatalog;
	content.hostLocationForVMCatalog = hostLocationForVMCatalog;
	content.hostNameForVMCatalog = hostNameForVMCatalog;
	content.vmNameForVMCatalog = vmNameForVMCatalog;
	content.vmTypeForVMCatalog = vmTypeForVMCatalog;
	content.versionForVMCatalog = versionForVMCatalog;
	content.ipForVMCatalog = ipForVMCatalog;
	content.clientNameForDBCatalog = clientNameForDBCatalog;
	content.dbStatusVal = dbStatusVal;

	var jsonStr = JSON.stringify(content);
	// alert('data = ' + jsonStr);
	$('#gridContent').val(jsonStr);
	// showProgress();
	document.fileServlet2.submit();
	// hideProgress();
}

function getLastReportGenDate() {
	debugger;
	$.ajax({
		url : "rest/DBAUtilRestService/getLastReportGenDate",
		type : "GET"

	}).done(function(response) {
		debugger;
		$('#dbReportGeneratedDate').text(response.date);
	});
}

function getStorageReportGeneratedDateList() {
	$
	.ajax(
			{
				url : "rest/DBAUtilRestService/getStorageReportGeneratedDateList",
				type : "GET"

			})
	.done(
			function(response) {

				var s = $('#selectedStorageReportDate');
				var options;
				for (var i = 0; i < response.length; i++) {
					options = $('<option value="'
							+ response[i] + '">'
							+ response[i] + '</option>');
					s.append(options);
				}
			});
}

function getLastStorageReportGenDate() {
	$.ajax(
			{
				url : "rest/DBAUtilRestService/getLastStorageReportGenDate",
				type : "GET"

			}).done(
			function(response) {

				$('#storageReportGeneratedDate').text(
						response.date);
			});
}

function showReportOFBenLoadSchemaSizeGrid() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfBenloadSchemaSize',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						' Benload Size(GB)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170

				}, {
					name : 'schemaSize',
					index : 'schemaSize',
					shrinkToFit : false,
					align : 'center',
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,				
//				height : '390',
				height : '485',
				width : $("#tabs-2").width(),				
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
				caption : " Report Of Benload  Schema Size "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}
	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap[' Benload Size(GB)'] = 'schemaSize';

			exportDataToExcelByReflect("benLoadSchemaSize", fieldInfoMap);

		},
		position : "last"
	});
	
}

function showReportOFBenDevSchemaSizeGrid() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfBendevSchemaSize',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						' Bendev Size(GB)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170

				}, {
					name : 'schemaSize',
					index : 'schemaSize',
					align : 'center',
					shrinkToFit : false,
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Bendev Schema Size "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}
	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap[' Bendev Size(GB)'] = 'schemaSize';
			exportDataToExcelByReflect("benDevSchemaSize", fieldInfoMap);

		},
		position : "last"
	});
}

function showReportOFDBSArchiveList() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBSArchiveList',
				datatype : "json",
				colNames : [ '  Client ', 'VM Name', ' Oracle SID',
						' Connect String' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB's Archive List "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}
	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			exportDataToExcelByReflect("archiveList", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFDBSInArchiveNOBackupConfig() {

	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportForDBSArchiveNOBackupConfig',
						datatype : "json",
						colNames : [ '  Client ', 'VM Name', ' Oracle SID',
								' Connect String' ],
						colModel : [ {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'vmname',
							index : 'vmname',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'oracleSID',
							index : 'oracleSID',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'connectString',
							index : 'connectString',
							shrinkToFit : false,
							width : 170
						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of DB's Archive No Backup Config "
					});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}
	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			exportDataToExcelByReflect("archiveNoBackUpList", fieldInfoMap);

		},
		position : "last"
	});
}

function showReportOFDBSFlashbackList() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBSFlashbackList',
				datatype : "json",
				colNames : [ '  Client ', 'VM Name', ' Oracle SID',
						' Connect String' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB's Flashback List "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			exportDataToExcelByReflect("dbsFlashback", fieldInfoMap);

		},
		position : "last"
	});
}

function showReportOFDBSFlashbackNoCatalog() {

	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportForDBFlashbackNoCatalog',
						datatype : "json",
						colNames : [ '  Client ', 'VM Name', ' Oracle SID',
								' Connect String' ],
						colModel : [ {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'vmname',
							index : 'vmname',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'oracleSID',
							index : 'oracleSID',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'connectString',
							index : 'connectString',
							shrinkToFit : false,
							width : 170
						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of DB's Flashback No Catalog "
					});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			exportDataToExcelByReflect("dbsFlashbackNoCatalog", fieldInfoMap);

		},
		position : "last"
	});
}

function showReportOfNonV3SchemasSpaceUtilizationGrid() {

	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportForNonV3SchemaSpaceUtil',
						datatype : "json",
						colNames : [ '  Client ', ' Oracle SID',
								' Connect String', ' Schema Name',
								'Schema Size(GB)' ],
						colModel : [ {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'oracleSID',
							index : 'oracleSID',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'connectString',
							index : 'connectString',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'schemaName',
							index : 'schemaName',
							shrinkToFit : false,
							width : 190

						}, {
							name : 'schemaSize',
							index : 'schemaSize',
							align : 'center',
							shrinkToFit : false,
							width : 190

						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of Non V3 Schemas Space Utilization "
					});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	} 
	);
	/*
	 * .navButtonAdd( '#reportPager', { caption : "Export", buttonicon :
	 * "ui-icon-newwin", onClickButton : function() { var fieldInfoMap = {};
	 * fieldInfoMap['Client'] = 'client'; fieldInfoMap['Oracle SID'] =
	 * 'oracleSID'; fieldInfoMap['Connect String'] = 'connectString';
	 * fieldInfoMap['Schema Name'] = 'schemaName'; fieldInfoMap['Schema
	 * Size(GB)'] = 'schemaSize';
	 * exportDataToExcelByReflect("nonV3SchemasSpaceutilization",fieldInfoMap); },
	 * position : "last" });
	 */
}

function showReportOfTopTablesGrid() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForTopTables',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						'Table Name', 'Table Size(GB)', ' Row Count' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					frozen : true,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					frozen : true,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'tableName',
					index : 'tableName',
					shrinkToFit : false,
					width : 190

				}, {
					name : 'tableSize',
					index : 'tableSize',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'rowCount',
					index : 'rowCount',
					align : 'center',
					shrinkToFit : false,
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Top Tables "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{});
	/*
	 * .navButtonAdd( '#reportPager', { caption : "Export", buttonicon :
	 * "ui-icon-newwin", onClickButton : function() { var fieldInfoMap = {};
	 * fieldInfoMap['Client'] = 'client'; fieldInfoMap['Oracle SID'] =
	 * 'oracleSID'; fieldInfoMap['Connect String'] = 'connectString';
	 * fieldInfoMap['Table Name'] = 'tableName'; fieldInfoMap['Table Size(GB)'] =
	 * 'tableSize'; fieldInfoMap['Row Count'] = 'rowCount';
	 * 
	 * exportDataToExcelByReflect("topTables",fieldInfoMap); }, position :
	 * "last" });
	 */
}

function showReportOfResourceUtilSummaryGrid() {

	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportOfRsrcUtilizationSummaryFrEachClient',
						datatype : "json",
						colNames : [ ' Client ', ' No.Of Instances',
								' No.Of VMS', 'Allocated CPU Cores',
								' Allocated Memory(GB)',
								'Allocated Volume Space (GB)',
								'Volume Used Space(GB)',
								'Volume Free Space(GB)',
								'Detail File Size(GB)', 'Segment Size(GB)',
								'Segment Free Space(GB)' ],
						colModel : [ {
							name : 'client',
							index : 'client',
							frozen : true,
							shrinkToFit : false,
							width : 150
						}, {

							name : 'noOfInstances',
							index : 'noOfInstances',
							align : 'center',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'noOfVms',
							index : 'noOfVms',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'allocatedCpuCores',
							index : 'allocatedCpuCores',
							align : 'center',
							shrinkToFit : false,
							width : 190

						}, {
							name : 'allocatedMemoryGB',
							index : 'allocatedMemoryGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'allocatedVolumeSpaceGB',
							index : 'allocatedVolumeSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeUsedSpaceGB',
							index : 'volumeUsedSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeFreeSpaceGB',
							index : 'volumeFreeSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'dataFileSizeGB',
							index : 'dataFileSizeGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'segmentSizeGB',
							index : 'segmentSizeGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'segmentFreeSpaceGB',
							index : 'segmentFreeSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of Resource Utilization Summary For Each Client "
					});
	$("#reportGrid").jqGrid("setFrozenColumns");
	$('#reportGrid')
			.jqGrid('navGrid', '#reportPager', {
				search : true,
				searchtext : "Search", // Make the Search icon have a "Search"
				// label next to it
				edit : false,
				add : false,
				del : false,
				refresh : false
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal:true,
				jqModal:true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
				}

			}, 
			{})
			.navButtonAdd(
					'#reportPager',
					{
						caption : "Export",
						buttonicon : "ui-icon-newwin",
						onClickButton : function() {

							var fieldInfoMap = {};
							fieldInfoMap['Client'] = 'client';
							fieldInfoMap['No.Of Instances'] = 'noOfInstances';
							fieldInfoMap['No.Of VMS'] = 'noOfVms';
							fieldInfoMap['Allocated CPU Cores'] = 'allocatedCpuCores';
							fieldInfoMap['Allocated Memory(GB)'] = 'allocatedMemoryGB';
							fieldInfoMap['Allocated Volume Space (GB)'] = 'allocatedVolumeSpaceGB';
							fieldInfoMap['Volume Used Space(GB)'] = 'volumeUsedSpaceGB';
							fieldInfoMap['Volume Free Space(GB)'] = 'volumeFreeSpaceGB';
							fieldInfoMap['Detail File Size(GB)'] = 'dataFileSizeGB';
							fieldInfoMap['Segment Size(GB)'] = 'segmentSizeGB';
							fieldInfoMap['Segment Free Space(GB)'] = 'segmentFreeSpaceGB';

							exportDataToExcelByReflect("resourceUtilSummary",
									fieldInfoMap);
						},
						position : "last"
					});
}

function showReportOfResourceUtilizationDetailsGrid() {
	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportOfRsrcUtilizationDetailsFrEachClient',
						datatype : "json",
						colNames : [ " Client ", " VM Name",
								" No.Of Instances", " CPU Count",
								" Allocated Memory(GB)", "Vol Name",
								" Volume Allocated Size (GB)",
								"Volume Used Space(GB)",
								"Volume Free Space(GB)", "Volume Used % ",
								"Detail File Size(GB)", "Segment Size(GB)",
								"Segment Free Space(GB)",
								"Segment Free Space % " ],
						colModel : [ {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							frozen : true,
							width : 150
						}, {
							name : 'vmName',
							index : 'vmName',
							frozen : true,
							width : 170,
							shrinkToFit : false
						}, {
							name : 'noOfInstances',
							index : 'noOfInstances',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'cpuCount',
							index : 'cpuCount',
							align : 'center',
							shrinkToFit : false,
							width : 190

						}, {
							name : 'memoryAllocatedGB',
							index : 'memoryAllocatedGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volName',
							index : 'volName',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeAllocatedSizeGB',
							index : 'volumeAllocatedSizeGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeUsedSpaceGB',
							index : 'volumeUsedSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeFreeSpaceGB',
							index : 'volumeFreeSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'volumeUsedPct',
							index : 'volumeUsedPct',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'dataFileSizeGB',
							index : 'dataFileSizeGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'segmentSizeGB',
							index : 'segmentSizeGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'segmentFreeSpaceGB',
							index : 'segmentFreeSpaceGB',
							align : 'center',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'segmentFreeSpacePct',
							index : 'segmentFreeSpacePct',
							align : 'center',
							shrinkToFit : false,
							width : 190
						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of Resource Utilization Details For Each Client  "
					});
	$("#reportGrid").jqGrid("setFrozenColumns");
	$('#reportGrid')
			.jqGrid('navGrid', '#reportPager', {
				search : true,
				searchtext : "Search", // Make the Search icon have a "Search"
				// label next to it
				edit : false,
				add : false,
				del : false,
				refresh : false
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal:true,
				jqModal:true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
				}

			}, 
			{})
			.navButtonAdd(
					'#reportPager',
					{
						caption : "Export",
						buttonicon : "ui-icon-newwin",
						onClickButton : function() {

							var fieldInfoMap = {};
							fieldInfoMap['Client'] = 'client';
							fieldInfoMap['VM Name'] = 'vmName';
							fieldInfoMap['No.Of Instances'] = 'noOfInstances';
							fieldInfoMap['CPU Count'] = 'cpuCount';
							fieldInfoMap['Allocated Memory(GB)'] = 'memoryAllocatedGB';
							fieldInfoMap['Vol Name'] = 'volName';
							fieldInfoMap['Volume Allocated Size (GB)'] = 'volumeAllocatedSizeGB';
							fieldInfoMap['Volume Used Space(GB)'] = 'volumeUsedSpaceGB';
							fieldInfoMap['Volume Free Space(GB)'] = 'volumeFreeSpaceGB';
							fieldInfoMap['Volume Used % '] = 'volumeUsedPct';
							fieldInfoMap['Detail File Size(GB)'] = 'dataFileSizeGB';
							fieldInfoMap['Segment Size(GB)'] = 'segmentSizeGB';
							fieldInfoMap['Segment Free Space(GB)'] = 'segmentFreeSpaceGB';
							fieldInfoMap['Segment Free Space %'] = 'segmentFreeSpacePct';

							exportDataToExcelByReflect("resourceUtilDetails",
									fieldInfoMap);
						},
						position : "last"
					});
}

function showReportOfFreeSpaceForTablesGrid() {
	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfSpaceForTableSpaces',
				datatype : "json",
				colNames : [ " Client ", " Oracle SID", " Connect String",
						"TableSpace Name", "TableSpace MAX Size (MB)",
						"TableSpace Used Size (MB)", "TableSpace used %" ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					frozen : true,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					frozen : true,
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					frozen : true,
					shrinkToFit : false,
					width : 170
				}, {
					name : 'tableSpaceName',
					index : 'tableSpaceName',
					shrinkToFit : false,
					width : 190

				}, {
					name : 'tableSpaceMaxSize',
					index : 'tableSpaceMaxSize',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'tableSpaceUsedSize',
					index : 'tableSpaceUsedSize',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'tableSpaceUsedPercent',
					index : 'tableSpaceUsedPercent',
					align : 'center',
					shrinkToFit : false,
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Table spaces Out of Space "
			});
	$("#reportGrid").jqGrid("setFrozenColumns");
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {

			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap['TableSpace Name'] = 'tableSpaceName';
			fieldInfoMap['TableSpace MAX Size (MB)'] = 'tableSpaceMaxSize';
			fieldInfoMap['TableSpace Used Size (MB)'] = 'tableSpaceUsedSize';
			fieldInfoMap['TableSpace used %'] = 'tableSpaceUsedPercent';

			exportDataToExcelByReflect("freeSpaceForTables", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOfScrambleDatabasesGrid() {
	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfScrambleDtabases',
				datatype : "json",
				colNames : [ " Client ", " Connect String", " VM Name",
						" Oracle SID", "Person", "Person Unscramble Count",
						"Rpad Person Count", " Claim Audit",
						" Claim Audit Criteria", " Claim Delete Audit",
						"STG Claim Audit", " Batch Detail Log",
						" Batch Message Log", "Export Detail", " Export Error",
						" Import Detail", " Import Error", "Import Exception",
						"Bundle", "Document", "Document Activity Image",
						" Document PDF", "Document Resubmission ",
						" Email Request Attachment", "FTP Definition Client",
						" FTP Definition FTP", " Import Header",
						"Import Predicate", "Import Staging Header Lock",
						"Merge History Detail", " Persistent Storage",
						" PGP Definition", " Printer Definition",
						" User Preference View", " Voucher",
						" Voucher Default", " Document Image Source",
						" Document Image File", " Wf Inst File" ],
				colModel : [ {

					name : 'client',
					index : 'client',
					shrinkToFit : false,
					frozen : true,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					frozen : true,
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'vmName',
					index : 'vmName',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'person',
					index : 'person',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'personUnscrambleCount',
					index : 'personUnscrambleCount',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'rpadPersonidCount',
					index : 'rpadPersonidCount',
					align : 'center',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'claimAudit',
					index : 'claimAudit',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'claimAuditCriteria',
					index : 'claimAuditCriteria',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'claimDeleteAudit',
					index : 'claimDeleteAudit',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'stgClaimAudit',
					index : 'stgClaimAudit',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'batchDetailLog',
					index : 'batchDetailLog',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'batchMessageLog',
					index : 'batchMessageLog',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'exportDetail',
					index : 'exportDetail',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'exportError',
					index : 'exportError',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'importDetail',
					index : 'importDetail',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'importError',
					index : 'importError',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'importException',
					index : 'importException',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {

					name : 'bundle',
					index : 'bundle',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'document',
					index : 'document',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'documentActivityImage',
					index : 'documentActivityImage',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'documentPdf',
					index : 'documentPdf',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {

					name : 'documentResubmission',
					index : 'documentResubmission',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'emailRequestAttachment',
					index : 'emailRequestAttachment',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'ftpDefinitionClient',
					index : 'ftpDefinitionClient',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'ftpDefinitionFtp',
					index : 'ftpDefinitionFtp',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {

					name : 'importHeader',
					index : 'importHeader',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'importPredicate',
					index : 'importPredicate',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'importStagingHeaderLock',
					index : 'importStagingHeaderLock',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'mergeHistoryDetail',
					index : 'mergeHistoryDetail',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'persistentStorage',
					index : 'persistentStorage',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'pgpDefinition',
					index : 'pgpDefinition',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'printerDefinition',
					index : 'printerDefinition',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'userPreferenceView',
					index : 'userPreferenceView',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'voucher',
					index : 'voucher',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'voucherDefault',
					index : 'voucherDefault',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'documentImageSource',
					index : 'documentImageSource',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'documentImageFile',
					index : 'documentImageFile',
					align : 'center',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'wfInstFile',
					index : 'wfInstFile',
					shrinkToFit : false,
					align : 'center',
					width : 190

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Scramble Databases "
			});
	$("#reportGrid").jqGrid("setFrozenColumns");

	$('#reportGrid')
			.jqGrid('navGrid', '#reportPager', {
				search : true,
				searchtext : "Search", // Make the Search icon have a "Search"
				// label
				// next to it
				edit : false,
				add : false,
				del : false,
				refresh : false
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal:true,
				jqModal:true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
				}

			}, 
			{})
			.navButtonAdd(
					'#reportPager',
					{
						caption : "Export",
						buttonicon : "ui-icon-newwin",
						onClickButton : function() {

							var fieldInfoMap = {};
							fieldInfoMap['Client'] = 'client';
							fieldInfoMap['Connect String'] = 'connectString';
							fieldInfoMap['VM Name'] = 'vmName';
							fieldInfoMap['Oracle SID'] = 'oracleSID';
							fieldInfoMap['Person'] = 'person';
							fieldInfoMap['Person Unscramble Count'] = 'personUnscrambleCount';
							fieldInfoMap['Rpad Person Count'] = 'rpadPersonidCount';
							fieldInfoMap['Claim Audit'] = 'claimAudit';
							fieldInfoMap['Claim Audit Criteria'] = 'claimAuditCriteria';
							fieldInfoMap['Claim Delete Audit'] = 'claimDeleteAudit';
							fieldInfoMap['STG Claim Audit'] = 'stgClaimAudit';
							fieldInfoMap['Batch Detail Log'] = 'batchDetailLog';
							fieldInfoMap['Batch Message Log'] = 'batchMessageLog';
							fieldInfoMap['Export Detail'] = 'exportDetail';
							fieldInfoMap['Export Error'] = 'exportError';
							fieldInfoMap['Import Detail'] = 'importDetail';
							fieldInfoMap['Import Error'] = 'importError';
							fieldInfoMap['Import Exception'] = 'importException';
							fieldInfoMap['Bundle'] = 'bundle';
							fieldInfoMap['Document'] = 'document';
							fieldInfoMap['Document Activity Image'] = 'documentActivityImage';
							fieldInfoMap['Document PDF'] = 'documentPdf';
							fieldInfoMap['Document Resubmission'] = 'documentResubmission';
							fieldInfoMap['Email Request Attachment'] = 'emailRequestAttachment';
							fieldInfoMap['FTP Definition Client'] = 'ftpDefinitionClient';
							fieldInfoMap['FTP Definition FTP'] = 'ftpDefinitionFtp';
							fieldInfoMap['Import Header'] = 'importHeader';
							fieldInfoMap['Import Predicate'] = 'importPredicate';
							fieldInfoMap['Import Staging Header Lock'] = 'importStagingHeaderLock';
							fieldInfoMap['Merge History Detail'] = 'mergeHistoryDetail';
							fieldInfoMap['Persistent Storage'] = 'persistentStorage';
							fieldInfoMap['PGP Definition'] = 'pgpDefinition';
							fieldInfoMap['Printer Definition'] = 'printerDefinition ';
							fieldInfoMap['User Preference View'] = 'userPreferenceView ';
							fieldInfoMap['Voucher'] = 'voucher ';
							fieldInfoMap['Voucher Default'] = 'voucherDefault ';
							fieldInfoMap['Document Image Source'] = 'documentImageSource ';
							fieldInfoMap['Document Image File'] = 'documentImageFile ';
							fieldInfoMap['Wf Inst File'] = 'wfInstFile ';

							exportDataToExcelByReflect("scrambleDatabases",
									fieldInfoMap);
						},
						position : "last"
					});
}

function showReportOFDBVMRootOutOfSpace() {

	$("#reportGrid").jqGrid({
		url : 'rest/DBAUtilRestService/getReportForDBVMRootOutOfSpace',
		datatype : "json",
		colNames : [ 'VM Name', 'Root FS Utilization' ],
		colModel : [ {
			name : 'vmname',
			index : 'vmname',
			shrinkToFit : false,
			width : 190
		}, {
			name : 'rootFSUtilization',
			index : 'rootFSUtilization',
			align : 'center',
			shrinkToFit : false,
			width : 170
		} ],
		rowNum : 15,
		pager : '#reportPager',
		rowList : [ 10, 15, 20, 25, 30 ],
		paging : true,
		height : '485',
		width : $("#tabs-2").width(),
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
		caption : " Report Of DBVM Root Out Of Space "
	});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {

			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Root FS Utilization'] = 'rootFSUtilization';

			exportDataToExcelByReflect("dbvmRootOutOfSpace", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFDBVMU01OutOfSpace() {

	$("#reportGrid").jqGrid({
		url : 'rest/DBAUtilRestService/getReportForDBVMU01OutOfSpace',
		datatype : "json",
		colNames : [ 'VM Name', 'U01 Utilization' ],
		colModel : [ {
			name : 'vmname',
			index : 'vmname',
			shrinkToFit : false,
			width : 190
		}, {
			name : 'u01Utilization',
			index : 'u01Utilization',
			align : 'center',
			shrinkToFit : false,
			width : 170
		} ],
		rowNum : 15,
		pager : '#reportPager',
		rowList : [ 10, 15, 20, 25, 30 ],
		paging : true,
		height : '485',
		width : $("#tabs-2").width(),
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
		caption : " Report Of DBVM U01 Out Of Space "
	});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['U01 Utilization'] = 'u01Utilization';

			exportDataToExcelByReflect("dbvmU01OutOfSpace", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOfNonV3SchemasSummary() {

	$("#reportGrid").jqGrid({
		url : 'rest/DBAUtilRestService/getReportOfNonV3SchemasSummary',
		datatype : "json",
		colNames : [ 'Schema Name', 'Schema Count' ],
		colModel : [ {
			name : 'schemaName',
			index : 'schemaName',
			shrinkToFit : false,
			width : 190
		}, {
			name : 'schemaCount',
			index : 'schemaCount',
			align : 'center',
			shrinkToFit : false,
			width : 170
		} ],
		rowNum : 15,
		pager : '#reportPager',
		rowList : [ 10, 15, 20, 25, 30 ],
		paging : true,
		height : '485',
		width : $("#tabs-2").width(),
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
		caption : " Report Of Non V3 Schemas Summary "
	});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{});
	/*
	 * .navButtonAdd( '#reportPager', { caption : "Export", buttonicon :
	 * "ui-icon-newwin", onClickButton : function() { var fieldInfoMap = {};
	 * fieldInfoMap['Schema Name'] = 'schemaName'; fieldInfoMap['Schema Count'] =
	 * 'schemaCount';
	 * 
	 * exportDataToExcelByReflect("nonV3SchemasSummary",fieldInfoMap); },
	 * position : "last" });
	 */
}

function showReportOFDBVolumesWithoutDatabases() {

	$("#reportGrid").jqGrid({
		url : 'rest/DBAUtilRestService/getReportForDBVolumesWithoutDatabases',
		datatype : "json",
		colNames : [ 'VM Name', 'Volume Without DB' ],
		colModel : [ {
			name : 'vmname',
			index : 'vmname',
			shrinkToFit : false,
			width : 190
		}, {
			name : 'volWithOutDB',
			index : 'volWithOutDB',
			shrinkToFit : false,
			width : 370
		} ],
		rowNum : 15,
		pager : '#reportPager',
		rowList : [ 10, 15, 20, 25, 30 ],
		paging : true,
		height : '485',
		width : $("#tabs-2").width(),
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
		caption : " Report Of DB Volumes Without Databases "
	});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd(
			'#reportPager',
			{
				caption : "Export",
				buttonicon : "ui-icon-newwin",
				onClickButton : function() {
					var fieldInfoMap = {};
					fieldInfoMap['VM Name'] = 'vmName';
					fieldInfoMap['Volume Without DB'] = 'volWithOutDB';

					exportDataToExcelByReflect("dbVolumeWithoutDatabase",
							fieldInfoMap);
				},
				position : "last"
			});
}

function showReportOFDBORATabOutSync() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBORATabOutSync',
				datatype : "json",
				colNames : [ 'VM Name', 'Missing From ORATab',
						'Invalid ORATab Entry' ],
				colModel : [ {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'missingFromORATab',
					index : 'missingFromORATab',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'invalidORATabEntry',
					index : 'invalidORATabEntry',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB ORATAB Out Sync "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Missing From ORATab'] = 'missingFromORATab';
			fieldInfoMap['Invalid ORATab Entry'] = 'invalidORATabEntry';

			exportDataToExcelByReflect("dbOratabOutSync", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFDBFSTabOutSync() {

	$("#reportGrid").jqGrid({
		url : 'rest/DBAUtilRestService/getReportForDBFSTabOutSync',
		datatype : "json",
		colNames : [ 'VM Name', 'Missing From FSTab', 'Invalid FSTab Entry' ],
		colModel : [ {
			name : 'vmname',
			index : 'vmname',
			shrinkToFit : false,
			width : 190
		}, {
			name : 'missingFromFSTab',
			index : 'missingFromFSTab',
			shrinkToFit : false,
			width : 270
		}, {
			name : 'invalidFSTabEntry',
			index : 'invalidFSTabEntry',
			shrinkToFit : false,
			width : 270
		} ],
		rowNum : 15,
		pager : '#reportPager',
		rowList : [ 10, 15, 20, 25, 30 ],
		paging : true,
		height : '485',
		width : $("#tabs-2").width(),
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
		caption : " Report Of DB FSTAB Out Sync "
	});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Missing From FSTab'] = 'missingFromFSTab';
			fieldInfoMap['Invalid FSTab Entry'] = 'invalidFSTabEntry';

			exportDataToExcelByReflect("dbFstabOutSync", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOfDBVMFreeSpace() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBVMFreeSpace',
				datatype : "json",
				colNames : [ 'VM Name', 'Total Disk Space (GB)',
						'Total Used Space (GB)', 'Total Free Space (GB)' ],
				colModel : [ {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'totalDiskSpaceInGB',
					index : 'totalDiskSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'totalUsedSpaceInGB',
					index : 'totalUsedSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'totalFreeSpaceInGB',
					align : 'center',
					index : 'totalFreeSpaceInGB',
					shrinkToFit : false,
					width : 170

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB VM Free Space "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Total Disk Space (GB)'] = 'totalDiskSpaceInGB';
			fieldInfoMap['Total Used Space (GB)'] = 'totalUsedSpaceInGB';
			fieldInfoMap['Total Free Space (GB)'] = 'totalFreeSpaceInGB';

			exportDataToExcelByReflect("dbVmFreeSpace", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOfDBVolumesOutOfSpace() {

	$("#reportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportForDBVolumesOutOfSpace',
						datatype : "json",
						colNames : [ 'VM Name', 'Oracle SID', 'Volume Name',
								'Volume Size(GB)', 'Volume Used Size(GB)',
								'Volume Free Size(GB)', 'Volume Used %' ],

						colModel : [ {
							name : 'vmname',
							index : 'vmname',
							shrinkToFit : false,
							width : 190
						}, {
							name : 'oracleSID',
							index : 'oracleSID',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'volumeName',
							index : 'volumeName',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'volumeSizeInGB',
							index : 'volumeSizeInGB',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'volumeUsedSizeInGB',
							index : 'volumeUsedSizeInGB',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'volumeFreeSizeInGB',
							index : 'volumeFreeSizeInGB',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'volumeUsedPercent',
							index : 'volumeUsedPercent',
							align : 'center',
							shrinkToFit : false,
							width : 170
						} ],
						rowNum : 15,
						pager : '#reportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
						height : '485',
						width : $("#tabs-2").width(),
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
						caption : " Report Of DB Volumes Out Of Space "
					});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Volume Name'] = 'volumeName';
			fieldInfoMap['Volume Size(GB)'] = 'volumeSizeInGB';
			fieldInfoMap['Volume Used Size(GB)'] = 'volumeUsedSizeInGB';
			fieldInfoMap['Volume Free Size(GB)'] = 'volumeFreeSizeInGB';
			fieldInfoMap['Volume Used %'] = 'volumeUsedPercent';

			exportDataToExcelByReflect("dbVolumeOutOfSpace", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOfDBLogsOutOfSpace() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBLogsOutOfSpace',
				datatype : "json",
				colNames : [ 'VM Name', 'DBLogs Size(GB)',
						'DBLogs Used Size(GB)', 'DBLogs Free Size(GB)',
						'DBLogs Used %' ],

				colModel : [ {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'dbLogsSizeInGB',
					index : 'dbLogsSizeInGB',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'dbLogsUsedSizeInGB',
					index : 'dbLogsUsedSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'dbLogsFreeSizeInGB',
					index : 'dbLogsFreeSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'dbLogsUsedPercent',
					index : 'dbLogsUsedPercent',
					align : 'center',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB Logs Out Of Space "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search"
		// label next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['DBLogs Size(GB)'] = 'dbLogsSizeInGB';
			fieldInfoMap['DBLogs Used Size(GB)'] = 'dbLogsUsedSizeInGB';
			fieldInfoMap['DBLogs Free Size(GB)'] = 'dbLogsFreeSizeInGB';
			fieldInfoMap['DBLogs Used %'] = 'dbLogsUsedPercent';

			exportDataToExcelByReflect("dbLogsOutOfSpace", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFBenLoadTopTables() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfBenloadTopTables',
				datatype : "json",
				colNames : [ '  Client ', ' Oracle SID', ' Connect String',
						'Table Name', 'Column Name', 'Segment Type',
						'Table size(GB)', 'Row Count' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'tableName',
					index : 'tableName',
					shrinkToFit : false,
					width : 370
				}, {
					name : 'columnName',
					index : 'columnName',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'segmentType',
					index : 'segmentType',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'tableSizeInGB',
					index : 'tableSizeInGB',
					shrinkToFit : false,
					align : 'center',
					width : 190
				}, {
					name : 'rowCount',
					index : 'rowCount',
					shrinkToFit : false,
					align : 'center',
					width : 190
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Benload  Top Tables "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd(
			'#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap['Table Name'] = 'tableName';
			fieldInfoMap['Column Name'] = 'columnName';
			fieldInfoMap['Segment Type'] = 'segmentType';
			fieldInfoMap['Table size(GB)'] = 'tableSizeInGB';
			fieldInfoMap['Row Count'] = 'rowCount';

			exportDataToExcelByReflect("benloadTopTables", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFDBSpaceState() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBSpaceState',
				datatype : "json",
				colNames : [ '  Client ', 'VM Name', ' Oracle SID',
						' Connect String', '  Data File Size (GB)',
						'  Segment File Size (GB)', ' Free Space Size (GB)',
						'Temp Size (GB)', 'Undo Size (GB)',
						'Redo Log Size (GB)', ' Free %' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150
				}, {
					name : 'vmname',
					index : 'vmname',
					shrinkToFit : false,
					width : 190
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'dataFileSizeInGB',
					index : 'dataFileSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'segmentSizeInGB',
					index : 'segmentSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'freeSpaceInGB',
					index : 'freeSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'tempSizeInGB',
					index : 'tempSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'undoSizeInGB',
					index : 'undoSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'redoLogSizeInGB',
					index : 'redoLogSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'freePercent',
					index : 'freePercent',
					align : 'center',
					shrinkToFit : false,
					width : 170

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB's Space Usage "
			});
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap['Data File Size (GB)'] = 'dataFileSizeInGB';
			fieldInfoMap['Segment File Size (GB)'] = 'segmentSizeInGB';
			fieldInfoMap['Free Space Size (GB)'] = 'freeSpaceInGB';
			fieldInfoMap['Temp Size (GB)'] = 'tempSizeInGB';
			fieldInfoMap['Undo Size (GB)'] = 'undoSizeInGB';
			fieldInfoMap['Redo Log Size (GB)'] = 'redoLogSizeInGB';
			fieldInfoMap['Free %'] = 'freePercent';

			exportDataToExcelByReflect("dbSpaceState", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFDBTempUndoUsaze() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportForDBTempUndoUsage',
				datatype : "json",
				colNames : [ '  Client ', 'VM Name', ' Oracle SID',
						' Connect String', '  Data File Size (GB)',
						'  Segment File Size (GB)', ' Free Space Size (GB)',
						'Temp Size (GB)', 'Undo Size (GB)',
						'Redo Log Size (GB)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					// shrinkToFit : false,
					width : 150
				}, {
					name : 'vmname',
					index : 'vmname',
					// shrinkToFit : false,
					width : 190
				}, {
					name : 'oracleSID',
					index : 'oracleSID',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'connectString',
					index : 'connectString',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'dataFileSizeInGB',
					index : 'dataFileSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'segmentSizeInGB',
					index : 'segmentSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'freeSpaceInGB',
					index : 'freeSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'tempSizeInGB',
					index : 'tempSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'undoSizeInGB',
					index : 'undoSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'redoLogSizeInGB',
					index : 'redoLogSizeInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170

				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of DB's Temp Undo Usage "
			});
	$("#reportGrid").jqGrid("setFrozenColumns");
	$('#reportGrid').jqGrid('navGrid', '#reportPager', {
		search : true,
		searchtext : "Search", // Make the Search icon have a "Search" label
		// next to it
		edit : false,
		add : false,
		del : false,
		refresh : false
	}, {}, // default settings for edit
	{}, // default settings for add
	{}, // delete
	{
		// search options
		width : 900,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
		}

	}, 
	{}).navButtonAdd('#reportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['VM Name'] = 'vmName';
			fieldInfoMap['Oracle SID'] = 'oracleSID';
			fieldInfoMap['Connect String'] = 'connectString';
			fieldInfoMap['Data File Size (GB)'] = 'dataFileSizeInGB';
			fieldInfoMap['Segment File Size (GB)'] = 'segmentSizeInGB';
			fieldInfoMap['Free Space Size (GB)'] = 'freeSpaceInGB';
			fieldInfoMap['Temp Size (GB)'] = 'tempSizeInGB';
			fieldInfoMap['Undo Size (GB)'] = 'undoSizeInGB';
			fieldInfoMap['Redo Log Size (GB)'] = 'redoLogSizeInGB';

			exportDataToExcelByReflect("dbsTempUndoUsage", fieldInfoMap);
		},
		position : "last"
	});
}

function showReportOFUnAccountedSpace() {

	$("#reportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfUnAccountedSpace',
				datatype : "json",
				colNames : [ '  VM Name ', ' Total Allocated Space (GB)',
						' Total Used Space (GB)',
						'Total Used Space By DBS (GB)',
						'UnAccounted Space (GB)' ],
				colModel : [ {
					name : 'vmName',
					index : 'vmName',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'totalAllocatedSpace',
					index : 'totalAllocatedSpace',
					width : 190,
					align : 'center',
					shrinkToFit : false
				}, {
					name : 'totalUsedSpace',
					index : 'totalUsedSpace',
					shrinkToFit : false,
					align : 'center',
					width : 170

				}, {
					name : 'totalUsedSpaceByDBS',
					index : 'totalUsedSpaceByDBS',
					shrinkToFit : false,
					align : 'center',
					width : 205
				}, {
					name : 'unAccountedSpace',
					index : 'unAccountedSpace',
					shrinkToFit : false,
					align : 'center',
					width : 200
				} ],
				rowNum : 15,
				pager : '#reportPager',
				rowList : [ 10, 15, 20, 25, 30 ],
				paging : true,
				height : '485',
				width : $("#tabs-2").width(),
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
				caption : " Report Of Un Accounted Space "
			});
	$('#reportGrid')
			.jqGrid('navGrid', '#reportPager', {
				search : true,
				searchtext : "Search", // Make the Search icon have a "Search"
				// label
				// next to it
				edit : false,
				add : false,
				del : false,
				refresh : false
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal:true,
				jqModal:true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Search")','#reportPager').css('color','white');
				}

			}, 
			{})
			.navButtonAdd(
					'#reportPager',
					{
						caption : "Export",
						buttonicon : "ui-icon-newwin",
						onClickButton : function() {
							var fieldInfoMap = {};
							fieldInfoMap['VM Name'] = 'vmName';
							fieldInfoMap['Total Allocated Space (GB)'] = 'totalAllocatedSpace';
							fieldInfoMap['Total Used Space (GB)'] = 'totalUsedSpace';
							fieldInfoMap['Total Used Space By DBS (GB)'] = 'totalUsedSpaceByDBS';
							fieldInfoMap['UnAccounted Space (GB)'] = 'unAccountedSpace';

							exportDataToExcelByReflect("unAccountedSpace",
									fieldInfoMap);
						},
						position : "last"
					});
}