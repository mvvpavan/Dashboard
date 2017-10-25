function initDBOSToIHRefreshHistoryPage() {
	$("#DBOSToIHRefreshHistoryGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBOSToIHRefreshHistList',
				datatype : "json",
				colNames : [ 'Source OS ', ' Client ', 'Source DB SID',
						' Target DB', ' Status', ' Start Time', 'Control File Backup Location',
						'Backup Location', 'Encryption Password', 'Cleanup DB',
						'Defrag DB',  'Requested By',
						' Email Notification ', 'Oracle Version',
						'Refresh End Time' ],
				colModel : [ {
					name : 'sourceOS',
					index : 'sourceOS',
					frozen : true,
					width : 150
				}, {
					name : 'client',
					index : 'client',
					frozen : true,
					width : 150
				}, {
					name : 'srcDBSID',
					index : 'srcDBSID',
					frozen : true,
					width : 150
				}, {
					name : 'trgtDBConnectString',
					index : 'trgtDBConnectString',
					width : 180
				}, {
					name : 'status',
					index : 'status',
				}, {
					name : 'rfrshStartTime',
					index : 'rfrshStartTime',
					width : 250,
					fixed : true
				}, {
					name : 'cntrlFileBckupLoc',
					index : 'cntrlFileBckupLoc',
					width : 280
				}, {
					name : 'bckupLoc',
					index : 'bckupLoc',
					width : 280

				}, {

					name : 'encrPwrd',
					index : 'encrPwrd',
					width : 180
				}, {
					name : 'cleanupDB',
					index : 'cleanupDB',
					width : 180,
					align : 'center'
				}, {

					name : 'defragDB',
					index : 'defragDB',
					width : 180,
					align : 'center'

				}, {
					name : 'reqBy',
					index : 'reqBy',
					width : 180,
					align : 'center'
				}, {
					name : 'email',
					index : 'email',
					width : 270
				}, {
					name : 'oracleVrsn',
					index : 'oracleVrsn',
					width : 170
				}, {
					name : 'reqCompleteTime',
					index : 'reqCompleteTime',
					width : 170
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#dbOSToIHHistoryPager',
				paging : true,
				width : $("#tabs-9").width(),
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

				caption : "DB OS to IH Refresh History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});

	$("#DBOSToIHRefreshHistoryGrid").jqGrid("setFrozenColumns");
	jQuery("#DBOSToIHRefreshHistoryGrid")
			.jqGrid(
					'navGrid',
					'#dbOSToIHHistoryPager',
					{
						del : false,
						add : false,
						edit : false,
						search : true,
						searchtext : 'Find',
						refresh : true,
						refreshtext : 'Refresh',
						beforeRefresh : function() {
							jQuery("#DBOSToIHRefreshHistoryGrid").setGridParam(
									{
										datatype : 'json'
									});
							jQuery("#DBOSToIHRefreshHistoryGrid").trigger(
									"reloadGrid");
						},
						closeAfterEdit : true
					}, {}, // default settings for edit
					{}, // default settings for add
					{}, // delete
					{
						// search options
						width : 900,
						// height : 250,
						// closeOnEscape : true,
						modal : true,
						jqModal : true,
						multipleSearch : true,
						closeAfterSearch : true,
						closeAfterReset:true,
						onSearch : function() {
							$('.ui-pg-div:contains("Find")','#dbOSToIHHistoryPager').css('color','red');
						},
						onReset : function() {
							$('.ui-pg-div:contains("Find")','#dbOSToIHHistoryPager').css('color','white');
						}
					}, {});

					jQuery('.ui-pg-div:contains("Refresh")', '#dbOSToIHHistoryPager').click(function(){
						$('.ui-pg-div:contains("Find")','#dbOSToIHHistoryPager').css('color','white');
					});
						
}