function showStorageReportOFStorageBreakupByClient() {
	debugger;
	$("#storageReportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportOfStorageBreakupByClient',
						datatype : "json",
						colNames : [ '  SAN ', '  Client ',
								'Storage With Raid (GB)', 'Storage (GB)' ],
						colModel : [ {
							name : 'san',
							index : 'san',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'storageWithRaid',
							index : 'storageWithRaid',
							align : 'center',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'storageInGB',
							index : 'storageInGB',
							align : 'center',
							sorttype : 'integer',
							shrinkToFit : false,
							width : 170
						} ],
						rowNum : 15,
						pager : '#storageReportPager',
						rowList : [ 10, 15, 20, 25, 30 ],
						paging : true,
//						height : '390',
						height : '485',
						width : $("#tabs-2").width(),
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						ignoreCase : true,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						caption : "Report Of Storage Breakup By Client "
					});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : false,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}

	}, {})
	.navButtonAdd('#storageReportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['SAN'] = 'san';
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Storage With Raid (GB)'] = 'storageWithRaid';
			fieldInfoMap['Storage (GB)'] = 'storageInGB';    

			exportDataToExcelByReflect("storageBreakupByClient", fieldInfoMap);

		},
		position : "last"
	});
}

function ExportDataToExcel(theGrid, excelFileName) {
	debugger;
	var table = theGrid;
	mya = $("#" + table).getDataIDs(); // Get All IDs
	var data = $("#" + table).getRowData(mya[0]); // Get First row to get the
	// labels
	var colNames = new Array();
	var ii = 0;
	for ( var i in data) {
		colNames[ii++] = i;
	} // capture col names

	var content = {};

	var colsArray = [];
	for (var k = 0; k < colNames.length; k++) {
		colsArray.push(colNames[k]);
	}
	content.cols = colsArray;

	for (i = 0; i < mya.length; i++) {
		var rowContent = {};
		data = $("#" + table).getRowData(mya[i]); // get each row
		for (var j = 0; j < colNames.length; j++) {
			rowContent[colsArray[j]] = data[colNames[j]]; // output each Row as
			// tab delimited
		}
		if (!content.data) {
			content.data = new Array();
		}
		content.data.push(rowContent);

	}
	content.gridName = excelFileName;
	var jsonStr = JSON.stringify(content);
	//	alert('data = ' + jsonStr);
	$('#gridContent').val(jsonStr);
	$('#fileName').val('employees');
	document.fileServlet1.submit();
}

function showStorageReportOFStorageBreakupByClientHistory() {
	debugger;
	$("#storageReportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportOfStorageBreakupByClientHistory',
						datatype : "json",
						colNames : [ '  SAN ', '  Client ',
								'Storage With Raid (GB)', 'Storage (GB)' ],
						colModel : [ {
							name : 'san',
							index : 'san',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150
						}, {
							name : 'storageWithRaid',
							index : 'storageWithRaid',
							align : 'center',
							width : 170,
							shrinkToFit : false
						}, {
							name : 'storageInGB',
							index : 'storageInGB',
							align : 'center',
							shrinkToFit : false,
							width : 170
						} ],
						rowNum : 15,
						pager : '#storageReportPager',
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
						ignoreCase : true,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						caption : "Report Of Storage Breakup By Client History "
					});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {});
}

function showStorageReportOfPracticeLead() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfPracticeLead',
				datatype : "json",
				colNames : [ '  Practice Lead ', '  Client ', 'Quota (GB)',  
						'Used Space (GB)', 'Available Space (GB)' ],
				colModel : [ {
					name : 'practiceLead',
					index : 'practiceLead',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150

				}, {
					name : 'quota',
					index : 'quota',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'usedSpaceInGB',
					index : 'usedSpaceInGB',
					shrinkToFit : false,
					width : 150

				}, {
					name : 'availableSpaceInGB',
					index : 'availableSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of Practice Lead "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {})
	.navButtonAdd('#storageReportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Practice Lead'] = 'practiceLead';
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Quota (GB)'] = 'quota';
			fieldInfoMap['Used Space (GB)'] = 'usedSpaceInGB'; 
			fieldInfoMap['Available Space (GB)'] = 'availableSpaceInGB';

			exportDataToExcelByReflect("practiceLead", fieldInfoMap);

		},
		position : "last"
	});
}

function showStorageReportOfPracticeLeadHistory() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfPracticeLeadHistory',
				datatype : "json",
				colNames : [ '  Practise Lead ', '  Client ', 'Quota (GB)',
						'Used Space (GB)', 'Available Space (GB)' ],
				colModel : [ {
					name : 'practiceLead',
					index : 'practiceLead',
					width : 170,
					shrinkToFit : false
				}, {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150

				}, {
					name : 'quota',
					index : 'quota',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'usedSpaceInGB',
					index : 'usedSpaceInGB',
					shrinkToFit : false,
					width : 150

				}, {
					name : 'availableSpaceInGB',
					index : 'availableSpaceInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of Practice Lead History "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {});
}

function showStorageReportOfClientSummary() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfClientSummary',
				datatype : "json",
				colNames : [ '  Client ', 'Hosted Storage (GB)',
						'Non Hosted Storage  (GB)' ],
				colModel : [ {
					name : 'client',
					index : 'client',
					shrinkToFit : false,
					width : 150

				}, {
					name : 'hostedStorageInGB',
					index : 'hostedStorageInGB',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'nonHostedStorageInGB',
					index : 'nonHostedStorageInGB',
					shrinkToFit : false,
					align : 'center',
					width : 180

				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of Client Summary "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {})
	.navButtonAdd('#storageReportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['Client'] = 'client';
			fieldInfoMap['Hosted Storage (GB)'] = 'hostedStorageInGB';
			fieldInfoMap['Non Hosted Storage  (GB)'] = 'nonHostedStorageInGB'; 

			exportDataToExcelByReflect("clientSummary", fieldInfoMap);

		},
		position : "last"
	});
}
function showStorageReportOfClientSummaryHistory() {
	$("#storageReportGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getReportOfClientSummaryHistory',
						datatype : "json",
						colNames : [ '  Client ', 'Hosted Storage (GB)',
								'Non Hosted Storage  (GB)' ],
						colModel : [ {
							name : 'client',
							index : 'client',
							shrinkToFit : false,
							width : 150

						}, {
							name : 'hostedStorageInGB',
							index : 'hostedStorageInGB',
							align : 'center',
							shrinkToFit : false,
							width : 170
						}, {
							name : 'nonHostedStorageInGB',
							index : 'nonHostedStorageInGB',
							shrinkToFit : false,
							align : 'center',
							width : 180

						} ],
						rowNum : 15,
						pager : '#storageReportPager',
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
						ignoreCase : true,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						caption : "Report Of Client Summary History "
					});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {});
}

function showStorageReportOfSanSummary() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfSanSummary',
				datatype : "json",
				colNames : [ '  SAN  ', '  Total Space (TB)', 'Databases (TB)',
						'Datastores (TB)', 'Network Drives (TB)',
						'VDI Farm (TB)', 'Equitrack & Test Volumes (TB)',
						'Free Space (TB)' ],
				colModel : [ {
					name : 'san',
					index : 'san',
					shrinkToFit : false,
					width : 180

				}, {
					name : 'totalSpace',
					index : 'totalSpace',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByDataBases',
					index : 'spaceTakenByDataBases',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByDataStores',
					index : 'spaceTakenByDataStores',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByNetworkDrives',
					index : 'spaceTakenByNetworkDrives',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByVDIFarm', 
					index : 'spaceTakenByVDIFarm',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByEquiTrackAndTestVolumes',
					index : 'spaceTakenByEquiTrackAndTestVolumes',
					shrinkToFit : false,
					align : 'center',
					width : 210
				}, {
					name : 'freeSpace',
					index : 'freeSpace',
					shrinkToFit : false,
					align : 'center',
					width : 150

				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of SAN Summary  "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {})
	.navButtonAdd('#storageReportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['SAN'] = 'san';
			fieldInfoMap['Total Space (TB)'] = 'totalSpace';
			fieldInfoMap['Databases (TB)'] = 'spaceTakenByDataBases'; 
			fieldInfoMap['Datastores (TB)'] = 'spaceTakenByDataStores';
			fieldInfoMap['Network Drives (TB)'] = 'spaceTakenByNetworkDrives';
			fieldInfoMap['VDI Farm (TB)'] = 'spaceTakenByVDIFarm'; 
			fieldInfoMap['Equitrack & Test Volumes (TB)'] = 'spaceTakenByEquiTrackAndTestVolumes';
			fieldInfoMap['Free Space (TB)'] = 'freeSpace';

			exportDataToExcelByReflect("sanSummary", fieldInfoMap);

		},
		position : "last"
	});
}

function showStorageReportOfSanSummaryHistory() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfSanSummaryHistory',
				datatype : "json",
				colNames : [ '  SAN  ', '  Total Space (TB)', 'Databases (TB)',
						'Datastores (TB)', 'Network Drives (TB)',
						'VDI Farm (TB)', 'Equitrack & Test Volumes (TB)',
						'Free Space (TB)' ],
				colModel : [ {
					name : 'san',
					index : 'san',
					shrinkToFit : false,
					width : 180

				}, {
					name : 'totalSpace',
					index : 'totalSpace',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByDataBases',
					index : 'spaceTakenByDataBases',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByDataStores',
					index : 'spaceTakenByDataStores',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByNetworkDrives',
					index : 'spaceTakenByNetworkDrives',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByVDIFarm',
					index : 'spaceTakenByVDIFarm',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByEquiTrackAndTestVolumes',
					index : 'spaceTakenByEquiTrackAndTestVolumes',
					shrinkToFit : false,
					align : 'center',
					width : 220
				}, {
					name : 'freeSpace',
					index : 'freeSpace',
					shrinkToFit : false,
					align : 'center',
					width : 150

				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of SAN Summary History "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {});
}

function showStorageReportOfSanUsageSummaryDiff() {
	$("#storageReportGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getReportOfSanUsageSummaryDiff',
				datatype : "json",
				colNames : [ '  SAN  ', ' Databases (TB)', ' Datastores (TB)',
						' Network Drives (TB)', ' VDI Farm (TB)',
						'Equitrack & Test Volumes (TB)', 'Current Date',
						'History Date' ],
				colModel : [ {
					name : 'san',
					index : 'san',
					shrinkToFit : false,
					width : 180

				}, {
					name : 'spaceTakenByDataBases', 
					index : 'spaceTakenByDataBases',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByDataStores',
					index : 'spaceTakenByDataStores',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByNetworkDrives',
					index : 'spaceTakenByNetworkDrives',
					shrinkToFit : false,
					align : 'center',
					width : 170
				}, {
					name : 'spaceTakenByVDIFarm',
					index : 'spaceTakenByVDIFarm',
					align : 'center',
					shrinkToFit : false,
					width : 170
				}, {
					name : 'spaceTakenByEquiTrackAndTestVolumes',
					index : 'spaceTakenByEquiTrackAndTestVolumes',
					shrinkToFit : false,
					align : 'center',
					width : 210
				}, {
					name : 'currentDate',
					index : 'currentDate',
					shrinkToFit : false,
					align : 'center',
					width : 150
				}, {
					name : 'historyDate',
					index : 'historyDate',
					align : 'center',
					shrinkToFit : false,
					width : 150
				} ],
				rowNum : 15,
				pager : '#storageReportPager',
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
				ignoreCase : true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce : true,
				caption : "Report Of SAN Usage Summary Difference "
			});
	$('#storageReportGrid').jqGrid('navGrid', '#storageReportPager', {
		search : true,
		searchtext : "Search", //  Make the Search icon have a "Search" label next to it
		edit : false,
		add : false,
		del : false,
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#storageReportGrid").setGridParam({datatype: 'json'});
		        jQuery("#storageReportGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 700,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Search")','#storageReportPager').css('color','white');
		}
	}, {})
	.navButtonAdd('#storageReportPager', {
		caption : "Export",
		buttonicon : "ui-icon-newwin",
		onClickButton : function() {
			var fieldInfoMap = {};
			fieldInfoMap['SAN'] = 'san';
			fieldInfoMap['Databases (TB)'] = 'spaceTakenByDataBases';
			fieldInfoMap['Datastores (TB)'] = 'spaceTakenByDataStores'; 
			fieldInfoMap['Network Drives (TB)'] = 'spaceTakenByNetworkDrives';
			fieldInfoMap['VDI Farm (TB)'] = 'spaceTakenByVDIFarm';
			fieldInfoMap['Equitrack & Test Volumes (TB)'] = 'spaceTakenByEquiTrackAndTestVolumes'; 
			fieldInfoMap['Current Date'] = 'currentDate';
			fieldInfoMap['History Date'] = 'historyDate';
			
			exportDataToExcelByReflect("sanUsageSummaryDiff", fieldInfoMap);

		},
		position : "last"
	});
}
