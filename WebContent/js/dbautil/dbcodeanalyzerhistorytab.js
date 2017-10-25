function initDBCodeAnalyzerHistoryPage() {
	debugger;
	$("#dbCodeAnalyzerHistGrid").jqGrid(
			{

				url : 'rest/DBAUtilRestService/getDBCodeAnalyzerHistList',
				datatype : "json",
				colNames : [ ' Client ',' DB Connect String ', 'Status', 'V3 Schema',
						' Scheduled Time', 'Email Notification',' Inserted By','Inserted Date'],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 180
				}, {
					name : 'dbConnectString',
					index : 'dbConnectString',
					width : 230
				}, {
					name : 'status',
					index : 'status',
					width : 130
				}, {
					name : 'v3schema',
					index : 'v3schema',
					width : 250
				}, {
					name : 'scheduledTime',
					index : 'scheduledTime',
					width : 162
				}, {
					name : 'email',
					index : 'email',
					width : 250
				}, {
				
					name : 'insertedBy',
					index : 'insertedBy',
					width : 130
				}, {
					name : 'insertedDate',
					index : 'insertedDate',
					width : 130
				
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#dbCodeAnalyzerHistPager',
				paging : true,
				height : '200',
				width : $("#tabs-19").width(),
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
				caption : " DB Code Analyzer History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});

	jQuery("#dbCodeAnalyzerHistGrid").jqGrid('navGrid',
			'#dbCodeAnalyzerHistPager', {
				del : false,
				add : false,
				edit : false,
				search : true,
				searchtext : 'Find',
				refresh : true,
				refreshtext : 'Refresh',
				beforeRefresh : function() {
					jQuery("#dbCodeAnalyzerHistGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#dbCodeAnalyzerHistGrid").trigger("reloadGrid");
				},
				closeAfterEdit : true
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal : true,
				jqModal : true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Find")','#dbCodeAnalyzerHistPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Find")','#dbCodeAnalyzerHistPager').css('color','white');
				}
			}, {});

			jQuery('.ui-pg-div:contains("Refresh")', '#dbCodeAnalyzerHistPager').click(function(){
				$('.ui-pg-div:contains("Find")','#dbCodeAnalyzerHistPager').css('color','white');
			});

}