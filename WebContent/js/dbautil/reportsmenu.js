/*$(document).ready(function() {
	dbReportsDialog = $("#dbReportsDiv").dialog({
		autoOpen : false,
		height : '590',
		width : $("#tabs-2").width()+35,
		modal : true,
		scroller : true,
		resize: function() {
			var outerwidth = $('#dbReportsDiv').width()-10;
			var outerheight= $('#dbReportsDiv').height()-145;
			$('#reportGrid').setGridWidth(outerwidth);
			$('#reportGrid').setGridHeight(outerheight);
		},
		close : function() {
			dbReportsDialog.dialog("close");
		}
	});
	
	$("#dbReports").click(function() {
		var selVal = $("#typeOfDBReport option:selected").text();

		if (selVal == 'benloadschemasize') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFBenLoadSchemaSizeGrid();
		} else if (selVal == 'bendevschemasize') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFBenDevSchemaSizeGrid();
		} else if (selVal == 'nonv3schemaspaceutil') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfNonV3SchemasSpaceUtilizationGrid();
		} else if (selVal == 'toptables') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfTopTablesGrid();
		} else if (selVal == 'rsrcutilsmry') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfResourceUtilSummaryGrid();
		} else if (selVal == 'rsrcutildet') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfResourceUtilizationDetailsGrid();
		} else if (selVal == 'freespaceintblspace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfFreeSpaceForTablesGrid();
		} else if (selVal == 'scrambledbs') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfScrambleDatabasesGrid();
		} else if (selVal == 'dbsarchlist') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBSArchiveList();
		} else if (selVal == 'dbsarchlognobckupconfig') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBSInArchiveNOBackupConfig();
		} else if (selVal == 'dbsflashbacklist') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBSFlashbackList();
		} else if (selVal == 'dbsflashbacknocatalog') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBSFlashbackNoCatalog();
		} else if (selVal == 'dbvmrootoutofspace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBVMRootOutOfSpace();
		} else if (selVal == 'dbvmu01outofspace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBVMU01OutOfSpace();
		} else if (selVal == 'nonv3schemassummary') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfNonV3SchemasSummary();
		} else if (selVal == 'dbvolumeswithoutdatabases') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBVolumesWithoutDatabases();
		} else if (selVal == 'dborataboutsync') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBORATabOutSync();
		} else if (selVal == 'fstaboutsync') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBFSTabOutSync();
		} else if (selVal == 'dbvmfreespace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfDBVMFreeSpace();
		} else if (selVal == 'dbvolumesoutofspace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfDBVolumesOutOfSpace();
		} else if (selVal == 'dblogsoutofspace') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOfDBLogsOutOfSpace();
		} else if (selVal == 'benloadtoptables') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFBenLoadTopTables();
		} else if (selVal == 'dbspacestate') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBSpaceState();
		} else if (selVal == 'tempundousagereport') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFDBTempUndoUsaze();
		} else if (selVal == 'unaccountedspacereport') {
			$("#reportGrid").jqGrid('GridUnload');
			showReportOFUnAccountedSpace();

		} else if (selVal == 'Select') {

			$("#reportGrid").jqGrid('GridUnload');
		}

		$('#typeOfDBReport').change(function() {

			if ($(this).val() == 'benloadschemasize') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFBenLoadSchemaSizeGrid();
			} else if ($(this).val() == 'bendevschemasize') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFBenDevSchemaSizeGrid();
			} else if ($(this).val() == 'nonv3schemaspaceutil') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfNonV3SchemasSpaceUtilizationGrid();
			} else if ($(this).val() == 'toptables') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfTopTablesGrid();
			} else if ($(this).val() == 'rsrcutilsmry') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfResourceUtilSummaryGrid();
			} else if ($(this).val() == 'rsrcutildet') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfResourceUtilizationDetailsGrid();
			} else if ($(this).val() == 'freespaceintblspace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfFreeSpaceForTablesGrid();
			} else if ($(this).val() == 'scrambledbs') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfScrambleDatabasesGrid();
			} else if ($(this).val() == 'dbsarchlist') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBSArchiveList();
			} else if ($(this).val() == 'dbsarchlognobckupconfig') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBSInArchiveNOBackupConfig();
			} else if ($(this).val() == 'dbsflashbacklist') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBSFlashbackList();
			} else if ($(this).val() == 'dbsflashbacknocatalog') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBSFlashbackNoCatalog();
			} else if ($(this).val() == 'dbvmrootoutofspace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBVMRootOutOfSpace();
			} else if ($(this).val() == 'dbvmu01outofspace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBVMU01OutOfSpace();
			} else if ($(this).val() == 'nonv3schemassummary') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfNonV3SchemasSummary();
			} else if ($(this).val() == 'dbvolumeswithoutdatabases') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBVolumesWithoutDatabases();
			} else if ($(this).val() == 'dborataboutsync') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBORATabOutSync();
			} else if ($(this).val() == 'fstaboutsync') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBFSTabOutSync();
			} else if ($(this).val() == 'dbvmfreespace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfDBVMFreeSpace();
			} else if ($(this).val() == 'dbvolumesoutofspace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfDBVolumesOutOfSpace();
			} else if ($(this).val() == 'dblogsoutofspace') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOfDBLogsOutOfSpace();
			} else if ($(this).val() == 'benloadtoptables') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFBenLoadTopTables();
			} else if ($(this).val() == 'dbspacestate') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBSpaceState();
			} else if ($(this).val() == 'tempundousagereport') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFDBTempUndoUsaze();
			} else if ($(this).val() == 'unaccountedspacereport') {
				$("#reportGrid").jqGrid('GridUnload');
				showReportOFUnAccountedSpace();
			} else {
				$("#reportGrid").jqGrid('GridUnload');
			}
		});
		dbReportsDialog.dialog("open");
		var outerwidth = $('#dbReportsDiv').width()-10;
		var outerheight= $('#dbReportsDiv').height()-145;
		$('#reportGrid').setGridWidth(outerwidth);
		$('#reportGrid').setGridHeight(outerheight);		
	});

	storageReportsDialog = $("#storageReportsDiv").dialog({
		autoOpen : false,
		height : '590',
		width : $("#tabs-2").width() + 35,
		modal : true,
		scroller : true,
		resize: function() {
			var outerwidth = $('#storageReportsDiv').width()-10;
			var outerheight= $('#storageReportsDiv').height()-145;
			$('#storageReportGrid').setGridWidth(outerwidth);
			$('#storageReportGrid').setGridHeight(outerheight);
		},
		close : function() {
			storageReportsDialog.dialog("close");
		}
	});

	$("#storageReports").click(function() {
		var storageReportDate = $('#selectedStorageReportDate');
		storageReportDate.prop("disabled", "disabled");
		var selVal = $("#typeOfStorageReport option:selected").text();
		if (selVal == 'storageBreakupByClient') {
			$("#storageReportGrid").jqGrid('GridUnload');
			showStorageReportOFStorageBreakupByClient();
		} else if (selVal == 'sanSumamry') {
			$("#storageReportGrid").jqGrid('GridUnload');
			showStorageReportOfSanSummary();
		} else if (selVal == 'clientSumamry') {
			$("#storageReportGrid").jqGrid('GridUnload');
			showStorageReportOfClientSummary();
		} else if (selVal == 'practiseLead') {
			$("#storageReportGrid").jqGrid('GridUnload');
			showStorageReportOfPracticeLead();
		} else if (selVal == 'sanUsageSummaryDiff') {
			$("#storageReportGrid").jqGrid('GridUnload');
			showStorageReportOfSanUsageSummaryDiff();
		} else if (selVal == 'Select') {

			$("#storageReportGrid").jqGrid('GridUnload');
		}

		$('#typeOfStorageReport').change(function() {
			if ($(this).val() == 'storageBreakupByClient') {
				$("#storageReportGrid").jqGrid('GridUnload');
				showStorageReportOFStorageBreakupByClient();
			} else if ($(this).val() == 'sanSumamry') {
				$("#storageReportGrid").jqGrid('GridUnload');
				showStorageReportOfSanSummary();
			} else if ($(this).val() == 'clientSumamry') {
				$("#storageReportGrid").jqGrid('GridUnload');
				showStorageReportOfClientSummary();
			} else if ($(this).val() == 'practiseLead') {
				$("#storageReportGrid").jqGrid('GridUnload');
				showStorageReportOfPracticeLead();
			} else if ($(this).val() == 'sanUsageSummaryDiff') {
				$("#storageReportGrid").jqGrid('GridUnload');
				showStorageReportOfSanUsageSummaryDiff();
			} else {
				$("#storageReportGrid").jqGrid('GridUnload');
			}
		});
		storageReportsDialog.dialog("open");
		var outerwidth = $('#storageReportsDiv').width()-10;
		var outerheight= $('#storageReportsDiv').height()-145;
		$('#storageReportGrid').setGridWidth(outerwidth);
		$('#storageReportGrid').setGridHeight(outerheight);
	});
});*/

$(document).ready(
		function() {

			$("#dbReports").click(
					function() {
						debugger;
						$( "#tabs" ).tabs( "option", "active",19 );
					});

			$("#storageReports").click(
					function() {	
						$( "#tabs" ).tabs( "option", "active",20 );						
					});
		});