function initRestartHistoryPage() {
	$("#DBRestartHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBRestartHistList',
				datatype : "json",
				colNames : [ '  Client ', ' Connect String',
								' Restart Type ', ' Scheduled Time ',
								' Requested By ', ' Requested Time ',
								 ' Email Notification ',' ADDM Report ' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150,
					frozen: true,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'connectString',
					index : 'connectString',
					frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'restartType',
					index : 'restartType',
					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'startTime',
					index : 'startTime',
					width : 200,
					fixed : true		
				}, {
					name : 'reqBy',
					index : 'reqBy',
					width : 170,
					search : true,
					sortable : true
				}, {
					name : 'reqTime',
					index : 'reqTime',
					width : 180,
					shrinkToFit : false,
					search : true,
					sortable : true
				}, {
					name : 'email',
					index : 'email',
					width : 270
				}, {
					name : 'adddmReport',
					index : 'adddmReport',
					align : 'center',
					width : 170
				} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbRestartHistPager',
				paging : true,
				width : $("#tabs-3").width(),
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
				caption : "DB Restart History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}

			});
	$("#DBRestartHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBRestartHistGrid").jqGrid('navGrid', '#dbRestartHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBRestartHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBRestartHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbRestartHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbRestartHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbRestartHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbRestartHistPager').css('color','white');
	});
		
}