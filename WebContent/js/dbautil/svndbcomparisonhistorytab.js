function initSVNComparisonHistoryPage() {
	$("#DBSVNComparisonHistoryGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBSVNComparisonHistList',
						datatype : "json",
						colNames : [ ' SVN Version ', '  Client ',
								' Connect String', ' Start Time', ' Status',
								'Requested By ', 'Requested Time',
								' Email Notification', 'SVN DB Comparison ID' ],
						colModel : [
								{
									name : 'svnVersion',
									index : 'svnVersion',
									width : 150,
									frozen: true
								},{
									name : 'client',
									index : 'client',
									width : 150,
									frozen: true
								},{
									name : 'connectString',
									index : 'connectString',
									frozen: true,
									width : 150
								}, {

									name : 'startTime',
									index : 'startTime',
									width : 250,
								}, {
//									
									name : 'status',
									index : 'status',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								}, {
									name : 'insertedBy',
									index : 'insertedBy',
									width : 180,
									shrinkToFit : false,
								// align : 'center'
								}, {
									name : 'insertedDate',
									index : 'insertedDate',
									width : 180,
									shrinkToFit : false,
									// align : 'center'
								}, {
									name : 'email',
									index : 'email',
									width : 270,
								}, {
									name : 'svnDBComparisonID',
									index : 'svnDBComparisonID',
									hidden : true,
									width : 170
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbSVNComparisonHistoryPager',
						paging : true,
						width : $("#tabs-8").width(),
						height : 200,
						modal : true,
						jqModal : true,
						viewrecords : true,
						rownumbers : true,
						gridview : true,
						ignoreCase : true,
						shrinkToFit : false,
						reloadAfterSubmit : true,
						scroller : true,
						loadonce : true,
						ondblClickRow : function(rowId) {
							var rowData = jQuery(this)
									.getRowData(rowId);
							var svnVersion = rowData['svnVersion'];
							var svnDBComparisonID = rowData['svnDBComparisonID'];
							
							svnReportInfo.svnVersion=svnVersion;
							svnReportInfo.svnDBComparisonID=svnDBComparisonID;
							svnReportInfo.isHist="Y";
							debugger;
//						alert('svnVersion : '+ svnVersion + ' ,svnDBComparisonID : '+svnDBComparisonID);
						
							var grid = $('#DBSVNComparisonReportDetailsGrid');
							if (grid)
								grid.jqGrid('GridUnload');
							var grid1 = $('#DBSVNComparisonReportSummaryGrid');
							if (grid1)
								grid1.jqGrid('GridUnload');
//							initSVNComparisonReportDetailsPage(-1,"aa","aa","n");
//							initSVNComparisonReportSummaryPage();
							svnReportDialog.dialog("open");
						},
						caption : "DB SVN Comparison History",

					});
	$("#DBSVNComparisonHistoryGrid").jqGrid("setFrozenColumns");
	jQuery("#DBSVNComparisonHistoryGrid").jqGrid('navGrid', '#dbSVNComparisonHistoryPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBSVNComparisonHistoryGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBSVNComparisonHistoryGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
		{}, // default settings for add
		{}, // delete
	{
		// search options
		width : 900,
//		height : 250,
//		closeOnEscape : true,
		modal:true,
		jqModal:true,
		multipleSearch : true,
		closeAfterSearch : true,
		closeAfterReset:true,
		onSearch : function() {
			$('.ui-pg-div:contains("Find")','#dbSVNComparisonHistoryPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbSVNComparisonHistoryPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbSVNComparisonHistoryPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbSVNComparisonHistoryPager').css('color','white');
	});
		

}