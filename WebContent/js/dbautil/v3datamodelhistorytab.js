function initV3DatamodelHistoryPage() {  
	$("#datamodelHistGrid")
			.jqGrid(
					{

						url : 'rest/DBAUtilRestService/getV3DatamodelHistList',
						datatype : "json",
						colNames : [ 
//						             ' Source ', ' Target ', 
						             ' DB Comparison Id',
										'Source DB', 'Target DB',  'Status' , ' Scheduled Time','Source DB Dump',
										' Target DB Dump', 'Extract V3 Metadata ', 'Email '	 ],
						colModel : [ 
						{
//							name : 'srcClient',
//							index : 'srcClient',
//							width : 150,
//						}, {
//							name : 'trgClient',
//							index : 'trgClient',
//							width : 150
//						}, {
							name : 'dbComparisonId',
							index : 'dbComparisonId',
							hidden : true,
							width : 150
						}, {
							name : 'srcDB',
							index : 'srcDB',
							width : 150
						}, {
							name : 'trgDB',
							index : 'trgDB',
							width : 150
						}, {
							name : 'status',
							index : 'status',
							width : 150
						}, {
							name : 'scheduledTime',
							index : 'scheduledTime',
							width : 150
						}, {
							name : 'srcDbDump',
							index : 'srcDbDump',
							width : 150
						}, {
							name : 'trgDbDump',
							index : 'trgDbDump',
							width : 150
						}, {
							name : 'extractV3Metadata',
							index : 'extractV3Metadata',
							width : 150
						
						}, {
							name : 'email',
							index : 'email',
							width : 150
						} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#datamodelHistPager',
						paging : true,
						height : '200',
						width : $("#tabs-18").width(),
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
						caption : " V3 Data Model History",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[1],'n');
						}
					});
	
	jQuery("#datamodelHistGrid").jqGrid('navGrid', '#datamodelHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#datamodelHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#datamodelHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#datamodelHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#datamodelHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#datamodelHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#datamodelHistPager').css('color','white');
	});

}