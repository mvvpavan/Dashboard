function initRunAsSysDBAHistPage() {
	$("#RunAsSysDBAHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getRunAsSysDBAHistList',
				datatype : "json",
				colNames : [ '  Client ', ' Connect String', ' Start Time',
						'Requested By ', 'Requested Date',
						' Email Notification' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150,
					frozen : true
				}, {
					name : 'connectString',
					index : 'connectString',
					width : 150,
					frozen : true
				}, {
					name : 'startTime',
					index : 'startTime',
					width : 200,
					fixed : true
				}, {
					name : 'reqBy',
					index : 'reqBy',
					width : 180,
					shrinkToFit : false
				}, {
					name : 'insertedDate',
					index : 'insertedDate',
					width : 200,
					shrinkToFit : false
				}, {
					name : 'email',
					index : 'email',
					width : 270
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#runAsSysDBAHistPager',
				paging : true,
				height : '200',
				width : $("#tabs-17").width(),
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
				caption : "Run As SYS DBA History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#RunAsSysDBAHistGrid").jqGrid("setFrozenColumns");
	jQuery("#RunAsSysDBAHistGrid").jqGrid('navGrid', '#runAsSysDBAHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh : function() {
			jQuery("#RunAsSysDBAHistGrid").setGridParam({
				datatype : 'json'
			});
			jQuery("#RunAsSysDBAHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#runAsSysDBAHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#runAsSysDBAHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#runAsSysDBAHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#runAsSysDBAHistPager').css('color','white');
	});

}