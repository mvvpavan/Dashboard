$(document).ready(function() {
	
	$("#tabs").on("tabsactivate", function(event, ui) {
		if ("tabs-1" === ui.newPanel.attr('id')) {
			debugger;
			initRefreshPage();
			initRefreshHistoryPage();
		} else if ("tabs-2" === ui.newPanel.attr('id')) {
			initFlashBackPage();
			initFlashBackHistoryPage();
		} else if ("tabs-3" === ui.newPanel.attr('id')) {
			initRestartPage();
			initRestartHistoryPage();
		} else if ("tabs-4" === ui.newPanel.attr('id')) {
			initAnalyzePage();
			initAnalyzeHistoryPage();
		} else if ("tabs-5" === ui.newPanel.attr('id')) {
			initBackupPage();
			initBackupHistoryPage();
		} else if ("tabs-6" === ui.newPanel.attr('id')) {
			initImportPage();
			initImportHistoryPage();
		} else if ("tabs-7" === ui.newPanel.attr('id')) {
			initExportPage();
			initExportHistoryPage();
		} else if ("tabs-8" === ui.newPanel.attr('id')) {
			var grid = $('#DBSVNComparisonGrid');
			if (grid) {
				grid.jqGrid('GridUnload');
			}
			initSVNComparisonPage();
			initSVNComparisonHistoryPage();
		} else if ("tabs-9" === ui.newPanel.attr('id')) {
			initDBOSToIHRefreshPage();
			initDBOSToIHRefreshHistoryPage();
		} else if ("tabs-10" === ui.newPanel.attr('id')) {
			initDBIHToIHRefreshPage();
			initDBIHToIHRefreshHistPage();
		} else if ("tabs-11" === ui.newPanel.attr('id')) {
				vmCatalog();
				if (loginUserName == "v3ops") {
					vMTypeval = 'APP';
					$('#vmType')[0].selectedIndex = 1;
				} else {
					vMTypeval = 'DB';
					$('#vmType')[0].selectedIndex = 0;
				}
				var vmCatalogGrid = $("#VMCatalogForDBAGrid");
				$("#VMCatalogForDBAGrid").jqGrid('GridUnload');
				initVMCatalogPage("ALL", "ALL", "ALL", "ALL",
						vMTypeval,"ALL","ALL");
		
				if (loginUserName == "dbadmin"
						|| loginUserName == "v3ops") {
					$("#add_" + vmCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
					$("#edit_" + vmCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
					$("#del_" + vmCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
				} else {
					$("#add_" + vmCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#edit_" + vmCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#del_" + vmCatalogGrid[0].id).addClass(
							'ui-state-disabled');
				}
		} else if ("tabs-12" === ui.newPanel.attr('id')) {
				dbCatalog();
				var dbCatalogGrid = $('#DBCatalogForDBAGrid');
				if (dbCatalogGrid)
					dbCatalogGrid.jqGrid('GridUnload');
				initDBCatalogPageForDBA("ALL", "ALL", "ALL", "ALL",
						"ALL", "ALL");
				if (loginUserName == "dbadmin") {
					$("#add_" + dbCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
					$("#edit_" + dbCatalogGrid[0].id).removeClass(
						'ui-state-disabled');
					$("#del_" + dbCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
				} else {
					$("#add_" + dbCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#edit_" + dbCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#del_" + dbCatalogGrid[0].id).addClass(
							'ui-state-disabled');
				}
		} else if ("tabs-13" === ui.newPanel.attr('id')) {
				appCatalog();
				var appCatalogGrid = jQuery("#APPCatalogGrid");
				if (appCatalogGrid)
					appCatalogGrid.jqGrid('GridUnload');
				initAPPCatalogPage("ALL", "ALL", "ALL", "ALL");
				if (loginUserName == "dbadmin"
						|| loginUserName == "v3ops") {
					$("#add_" + appCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
					$("#edit_" + appCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
					$("#del_" + appCatalogGrid[0].id).removeClass(
							'ui-state-disabled');
				} else {
					$("#add_" + appCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#edit_" + appCatalogGrid[0].id).addClass(
							'ui-state-disabled');
					$("#del_" + appCatalogGrid[0].id).addClass(
							'ui-state-disabled');
				}
		} else if ("tabs-14" === ui.newPanel.attr('id')) {
			$("#createDBGrid").jqGrid('GridUnload');
			initCreateDBPage();
			initCreateDBHistoryPage();
		} else if ("tabs-15" === ui.newPanel.attr('id')) {
			initDBDropPage();
			initDBDropHistoryPage();
		} else if ("tabs-16" === ui.newPanel.attr('id')) {
			$("#CPUResourceManagerGrid").jqGrid('GridUnload');
			initCPUResourceManagerPage();
			initCPUResourceManagerHistoryPage();
		} else if ("tabs-17" === ui.newPanel.attr('id')) {
			initRunAsSysDBAPage();
			initRunAsSysDBAHistPage();
		} else if ("tabs-18" === ui.newPanel.attr('id')) {
			$('#datamodelGrid').jqGrid('GridUnload');
			initV3DatamodelPage();
			initV3DatamodelHistoryPage();
		} else if ("tabs-19" === ui.newPanel.attr('id')) {
			initDBCodeAnalyzerPage();
			initDBCodeAnalyzerHistoryPage();
		} else if ("tabs-20" === ui.newPanel.attr('id')) {
			initDBChangePwdPage();
			initDBChangePwdHistoryPage();
		} else if ("tabs-21" === ui.newPanel.attr('id')) {
			initV3DataComparisonPage();
			initV3DataComparisonHistoryPage();
		} else if ("tabs-22" === ui.newPanel.attr('id')) {
			initADDMReportsPage();
		} else if ("tabs-23" === ui.newPanel.attr('id')) {
			getLastReportGenDate();
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
			
		} else if ("tabs-24" === ui.newPanel.attr('id')) {
			getStorageReportGeneratedDateList();
			getLastStorageReportGenDate();
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
		
		}	
	});
});
