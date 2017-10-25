function initRefreshHistoryPage() {
	$("#DBRefreshHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBRefreshHistList',
				datatype : "json",
				colNames : [ ' Source Client ', ' Source DB',  'Target Client',' Target DB',
						' Refresh Start Time', 'Refresh End Time', 'Status',
						' Refresh Req By', 'Backup Target DB',
						'Recurr DB Refresh', 'Recurring Frequency',
						' Refresh Req Date', 'Email Notification',
						' Skip Precheck', 'Comments' ],

				colModel : [ {
					name : 'srcClient',
					index : 'srcClient',
					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'srcDB',
					index : 'srcDB',
					frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgClient',
					index : 'trgClient',
					frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgtDB',
					index : 'trgtDB',
					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'rfrshStartTime',
					index : 'rfrshStartTime',
					width : 200,
					fixed : true

				}, {
					name : 'rfrshEndTime',
					index : 'rfrshEndTime',
					width : 200,
					fixed : true
				}, {
					name : 'status',
					index : 'status',
					width : 200,
					search : true,
					sortable : true
				}, {
					name : 'reqBy',
					index : 'reqBy',
					width : 170,
					search : true,
					sortable : true
				}, {
					name : 'bckupTrgtDB',
					index : 'bckupTrgtDB',
					width : 200,

				}, {
					name : 'recurRefresh',
					index : 'recurRefresh',
					width : 180,
				}, {
					name : 'recurFreq',
					index : 'recurFreq',
					sorttype:'integer' ,
					width : 180,

				}, {
					name : 'reqDate',
					index : 'reqDate',
					width : 200
				}, {
					name : 'email',
					index : 'email',
					width : 270,
				}, {
					name : 'skipPrecheck',
					index : 'skipPrecheck',
					width : 170,
				}, {
					name : 'comments',
					index : 'comments',
					width : 270
				} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbRefreshHistPager',
				paging : true,
				width : $("#tabs-1").width(),
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
				caption : "DB Refresh History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	
	$("#DBRefreshHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBRefreshHistGrid").jqGrid('navGrid', '#dbRefreshHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		 beforeRefresh:function(){
		        jQuery("#DBRefreshHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBRefreshHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbRefreshHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbRefreshHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbRefreshHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbRefreshHistPager').css('color','white');
	});
		
}