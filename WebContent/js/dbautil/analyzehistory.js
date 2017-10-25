function initAnalyzeHistoryPage() {
	$("#DBAnalyzeHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBAnalyzeHistList',
				datatype : "json",
				colNames : ['  Client ',' Connect String',' Analyze Freq ',' Analyze Start Time',
				    		' Analyze End Time', 'Requested By ',' Email Notification',  'Delete Statistics' ],

				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150,
					fixed : true,
					frozen: true,
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
					name : 'analyzeFreq',
					index : 'analyzeFreq',
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
					name : 'endTime',
					index : 'endTime',
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
					name : 'delStat',
					index : 'delStat',
					align : 'center',
					width : 170
				} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbAnalyzeHistPager',
				paging : true,
				width : $("#tabs-4").width(),
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
				caption : "DB Analyze History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#DBAnalyzeHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBAnalyzeHistGrid").jqGrid('navGrid', '#dbAnalyzeHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBAnalyzeHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBAnalyzeHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbAnalyzeHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbAnalyzeHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbAnalyzeHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbAnalyzeHistPager').css('color','white');
	});
}

