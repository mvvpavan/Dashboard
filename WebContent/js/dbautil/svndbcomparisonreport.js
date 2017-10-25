function initSVNComparisonReportSummaryPage(reportType, svnVersion,
		svnDBComparisonID, isHist) {
	$("#DBSVNComparisonReportSummaryGrid")
			.jqGrid(
					{
						url : "rest/DBAUtilRestService/getDBSVNComparisonReportSummaryLogList/"
								+ reportType
								+ "/"
								+ svnVersion
								+ "/"
								+ svnDBComparisonID + "/" + isHist,
						datatype : "json",
						colNames : [ ' Object Type ', '  Count ' ],
						colModel : [ {
							name : 'objectType',
							index : 'objectType',
							width : 180,
							shrinkToFit : false,
						// align : 'center'
						}, {
							name : 'count',
							index : 'count',
							width : 140,
							sorttype : 'integer',
							shrinkToFit : false,
						// align : 'center'
						} ],
						rowNum : 10,
						// rowList : [ 5, 10 ],
						pager : '#dbSVNComparisonReportSummaryPager',
						paging : false,
						height : '100',
						width : '380',
						modal : true,
						jqModal : true,
						loadonce : true,
						pgtext : null,
						pgbuttons : false,
						// viewrecords : true,
						rownumbers : true,
						gridview : true,
						shrinkToFit : false,
						hoverrows : true,
						reloadAfterSubmit : true,
						scroller : true,
						caption : "Report Summary",
					});
	jQuery("#DBSVNComparisonReportSummaryGrid").jqGrid(
			'navGrid',
			'#dbSVNComparisonReportSummaryPager',
			{
				del : false,
				add : false,
				edit : false,
				search : false,
				refresh : false,
				refreshtext : '  Refresh ',
				beforeRefresh : function() {
					jQuery("#DBSVNComparisonReportSummaryGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#DBSVNComparisonReportSummaryGrid").trigger(
							"reloadGrid");
				},

			}, {

			}, {

			}, {

			});

}

function initSVNComparisonReportDetailsPage(reportType, svnVersion,
		svnDBComparisonID, isHist,dbName) {
	debugger;
	$("#DBSVNComparisonReportDetailsGrid").jqGrid(
			{
				url : "rest/DBAUtilRestService/getDBSVNComparisonReportDetailsLogList/"
					+ reportType
					+ "/"
					+ svnVersion
					+ "/"
					+ svnDBComparisonID + "/" + isHist,
				datatype : "json",
				colNames : [ '  Module ', '  Owner ', ' Object Type ',
						' Object Name ', '  DB Comment ', '  SVN Comment ' ],
				colModel : [ {
					name : 'module',
					index : 'module',
					width : 180,
					shrinkToFit : false,
				}, {
					name : 'owner',
					index : 'owner',
					width : 150,
					shrinkToFit : false,
				}, {
					name : 'objectType',
					index : 'objectType',
					width : 150,
					shrinkToFit : false,
				// align : 'center'
				}, {
					name : 'objectName',
					index : 'objectName',
					width : 180,
					shrinkToFit : false,
				// align : 'center'
				}, {
					name : 'dbComment',
					index : 'dbComment',
					width : 280,
					shrinkToFit : false,
				// align : 'center'
				}, {
					name : 'svnComment',
					index : 'svnComment',
					width : 280,
					shrinkToFit : false,
				// align : 'center'
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#dbSVNComparisonReportDetailsPager',
				// paging : true,
				scroll : 1,
				height : '220',
				width : $("#tabs-8").width(),
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
				caption : "Report In Detail  ",
			});
	jQuery("#DBSVNComparisonReportDetailsGrid").jqGrid(
			'navGrid',
			'#dbSVNComparisonReportDetailsPager',
			{
				del : false,
				add : false,
				edit : false,
				search : false,
				refresh : false,
				refreshtext : '  Refresh ',
				beforeRefresh : function() {
					jQuery("#DBSVNComparisonReportDetailsGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#DBSVNComparisonReportDetailsGrid").trigger(
							"reloadGrid");
				},
			}, {}, {}, {}).navButtonAdd('#dbSVNComparisonReportDetailsPager', {
				caption : "Export",
				buttonicon : "ui-icon-newwin",
				onClickButton : function() {
					var fieldInfoMap = {};
					fieldInfoMap['Module'] = 'module';
					fieldInfoMap['Owner'] = 'owner';
					fieldInfoMap['Object Type'] = 'objectType';
					fieldInfoMap['Object Name'] = 'objectName';
					fieldInfoMap['DB Comment'] = 'dbComment';
					fieldInfoMap['SVN Comment'] = 'svnComment';
					

					exportDataToExcelByReflectForSVN(fieldInfoMap,reportType,svnVersion,
							svnDBComparisonID, isHist,dbName);
				},
				position : "last"
			});
	
	function exportDataToExcelByReflectForSVN(fieldInfoMap,reportType,svnVersion,
			svnDBComparisonID, isHist,dbName) {
		debugger;
		var content = {};
		var svnDBComparisonReportTypeName = $( "#svnDBComparisonReportType option:selected" ).text();
		content.dispFieldInfoMap = fieldInfoMap;
		content.gridName = "svnDBComparisonReport";
		content.dbName = dbName;
		content.reportType = reportType;
		content.reportName = svnDBComparisonReportTypeName;
		content.svnVersion = svnVersion;
		content.svnDBComparisonID = svnDBComparisonID;
		content.isHist = isHist;

		var jsonStr = JSON.stringify(content);
		// alert('data = ' + jsonStr);
		$('#gridContent').val(jsonStr);
		// showProgress();
		document.fileServlet2.submit();
		// hideProgress();
	}
}