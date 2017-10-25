function initV3DataComparisonHistoryPage() {
	$("#v3DataComparisonHistGrid").jqGrid(
			{
//				url : 'rest/DBAUtilRestService/getCreateDBHistList/'+"Y",
				datatype : "json",
				colNames : [  'Source Client','Source DB','Target Client','Target DB','Status',
				              'Start Time','Source DB IP','Target DB IP', 'Email', 
				             'Requested By', 'Requested Date'],

				colModel : [ {
					name : 'srcClient',
					index : 'srcClient',
					width : 150,
					fixed : true,
					search : true,
					sortable : true,
				}, {
					name : 'srcDB',
					index : 'srcDB',
					width : 150,
					fixed : true,
					search : true,
					sortable : true,
				}, {
					name : 'trgClient',
					index : 'trgClient',
					width : 150,
					search : true,
					sortable : true,
					
				}, {
					name : 'trgDB',
					index : 'trgDB',
					width : 150,
					search : true,
					sortable : true,
				}, {
					name : 'status',
					index : 'status',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'startTime',
					index : 'startTime',
					width : 150,
					search : true,
					sortable : true,
				}, {
					name : 'srcDBHostIP',
					index : 'srcDBHostIP',
					width : 150,
					hidden : true
				}, {
					name : 'trgDBHostIP',
					index : 'trgDBHostIP',
					width : 150,
					hidden : true
				}, {
					name : 'emailNotification',
					index : 'emailNotification',
					width : 150,
					search : true,
					sortable : true,
				}, {
					name : 'requestedBy',
					index : 'requestedBy',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'requestedDate',
					index : 'requestedDate',
					width : 150,
					search : true,
					sortable : true
				}],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#v3DataComparisonHistPager',
				paging : true,
				height : '200',
				width : $("#tabs-21").width(),
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				gridview : true,
				shrinkToFit : false,
				hoverrows: true,
				reloadAfterSubmit : true,
				scroller : true,
				loadonce:true,
				caption : "V3 Data Comparison History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[7,8],'n');
				}
			});
	$("#v3DataComparisonHistGrid").jqGrid("setFrozenColumns");
	jQuery("#v3DataComparisonHistGrid").jqGrid('navGrid', '#v3DataComparisonHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		 beforeRefresh:function(){
		        jQuery("#v3DataComparisonHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#v3DataComparisonHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#v3DataComparisonHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#v3DataComparisonHistPager').css('color','white');
		}

	}, {});
	
	jQuery('.ui-pg-div:contains("Refresh")', '#v3DataComparisonHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#v3DataComparisonHistPager').css('color','white');
	});
}