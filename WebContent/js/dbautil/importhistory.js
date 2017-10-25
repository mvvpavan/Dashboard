function initImportHistoryPage() {
	$("#DBImportHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBImportHistList',
				datatype : "json",
				colNames : ['  Client ',' Connect String','Import Start Time',
				    		'Import End Time',' Import Type ', 'Status', 'Requested By',
				    		' Dump File Directory', ' Requested Date', 'Email Notification',
				    		' Excluded Tables', 'Skip Precheck' ],
//				    	
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
							name : 'importType',
							index : 'importType',
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
							name : 'dumpFileDirectory',
							index : 'dumpFileDirectory',
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
							name : 'excludeTables',
							index : 'excludeTables',
							width : 170
						}, {
							name : 'skipPreCheck',
							index : 'skipPreCheck',
							width : 200,
							align:'center'
						} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbImportHistPager',
				paging : true,
				width : $("#tabs-6").width(),
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
				caption : "DB Import History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#DBImportHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBImportHistGrid").jqGrid('navGrid', '#dbImportHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		/*onSearch:function(){
//			$("#DBImportGrid").jqGrid('getGridParam', 'lastSelectedData')
			debugger;
			alert("search done");
			var filteredRowIDs = new Array();
			filteredRowIDs = $("#DBImportHistGrid").getDataIDs();
            for (var i = 0; i < filteredRowIDs.length; i++)
            {
            	$("#DBImportHistGrid").jqGrid('setRowData',filteredRowIDs[i],false,{  color:'white',background:'blue'});            
            }
        },*/
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBImportHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBImportHistGrid").trigger("reloadGrid");
		    },
		closeAfterEdit : true
	},  {}, // default settings for edit
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
			$('.ui-pg-div:contains("Find")','#dbImportHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbImportHistPager').css('color','white');
		}
	}, {});
	
	jQuery('.ui-pg-div:contains("Refresh")', '#dbImportHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbImportHistPager').css('color','white');
	});
}