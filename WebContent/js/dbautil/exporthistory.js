function initExportHistoryPage() {
	$("#DBExportHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBExportHistList',
				datatype : "json",
				
				colNames : ['  Client ',' Connect String','Export Start Time',
				    		'Export End Time',' Export Type ', 'Status', 'Requested By',
				    		'  Export Schemas', ' Requested Date', 'Email Notification',
				    		' Excluded Tables' ],
				colModel : [
						{
							name : 'client',
							index : 'client',
							frozen: true,
							width : 150

						},{
							name : 'connectString',
							index : 'connectString',
							frozen: true,
							width : 150
						},{
							name : 'startTime',
							index : 'startTime',
							width : 250
						}, {
							name : 'endTime',
							index : 'endTime',
							width : 250
						}, {
							name : 'exportType',
							index : 'exportType',
							width : 180
						
						}, {
							name : 'status',
							index : 'status',
							width : 180
						}, {
							name : 'reqBy',
							index : 'reqBy',
							width : 180,
							shrinkToFit : false
							
						}, {
							name : 'exportSchemas',
							index : 'exportSchemas',
							width : 270
						}, {
							name : 'reqDate',
							index : 'reqDate',
							width : 250
						}, {
							name : 'email',
							index : 'email',
							width : 270
						}, {
							name : 'excludedTables',
							index : 'excludedTables',
							width : 270
						
						} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbExportHistPager',
				paging : true,
				width : $("#tabs-7").width(),
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
				caption : "DB Export History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#DBExportHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBExportHistGrid").jqGrid('navGrid', '#dbExportHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBExportHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBExportHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbExportHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbExportHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbExportHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbExportHistPager').css('color','white');
	});
		
}