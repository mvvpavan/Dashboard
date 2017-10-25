function initFlashBackHistoryPage() {
	$("#DBFlashBackHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBFlashBackHistList',
				datatype : "json",
				colNames : [ 'Client ', 'Connect String', ' Flashback Type',
				             ' Restore Point Name',  'Status',' Flashback Start Time',
						 'Requested By',
						 'Email Notification',
						' Skip Precheck',
						' Disable Archiving' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'dbConnString',
					index : 'dbConnString',
					frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'enableDisableRestoreDB',
					index : 'enableDisableRestoreDB',
					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'restorePoint',
					index : 'restorePoint',
					width : 200,
					fixed : true
				}, {
					name : 'status',
					index : 'status',
					width : 200,
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
					name : 'email',
					index : 'email',
					width : 270
				}, {
					name : 'skipPrecheck',
					index : 'skipPrecheck',
					align : 'center',
					width : 170
				}, {
					name : 'disableArchiving',
					index : 'disableArchiving',
					align : 'center',
					width : 170
				} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbFlashBackHistPager',
				paging : true,
				width : $("#tabs-2").width(),
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
				caption : "DB FlashBack History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#DBFlashBackHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBFlashBackHistGrid").jqGrid('navGrid', '#dbFlashBackHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBFlashBackHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBFlashBackHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbFlashBackHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbFlashBackHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbFlashBackHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbFlashBackHistPager').css('color','white');
	});
		
}