function initDBIHToIHRefreshHistPage() {
	$("#DBIHToIHRefreshHistGrid")
			.jqGrid(
					{
						url : 'rest/DBAUtilRestService/getDBIHToIHRefreshHistLogList',
						datatype : "json",
						colNames : [ ' Client ', ' Target DB', ' Status',
						             ' Start Time','Backup Location', 'Encryption Password',
								 'Requested By',
								' Restore Until ', ' Email Notification ',
								'Source DB File Name Convert' ],
						colModel : [
								{
									name : 'client',
									index : 'client',
									frozen: true,
									width : 150
								},{
									name : 'trgtDBConnectString',
									index : 'trgtDBConnectString',
									frozen: true,
									width : 180,
									shrinkToFit : false,
									align : 'center'
								},{
									name : 'status',
									index : 'status',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								},{
									name : 'startTime',
									index : 'startTime',
									width : 200,
									fixed : true
								},{
									name : 'bckupLoc',
									index : 'bckupLoc',
									width : 180,
									align : 'center'
								},{

									name : 'encrPwrd',
									index : 'encrPwrd',
									width : 180,
									shrinkToFit : false,
									align : 'center'
								
								},
								{
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									shrinkToFit : false,
									align : 'center'

								},{
									name : 'restorUntilTime',
									index : 'restorUntilTime',
									width : 200,
									fixed : true

								},{
									name : 'email',
									index : 'email',
									width : 270
								},{
									name : 'srcDbFileNameConvert',
									index : 'srcDbFileNameConvert',
									width : 250

								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#dbIHToIHRefreshHistPager',
						paging : true,
						height : '200',
						width : $("#tabs-10").width(),
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
						caption : "DB IH to IH Refresh History",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'n');
						}
					});
	$("#DBIHToIHRefreshHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBIHToIHRefreshHistGrid").jqGrid('navGrid', '#dbIHToIHRefreshHistPager', {del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBIHToIHRefreshHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBIHToIHRefreshHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbIHToIHRefreshHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbIHToIHRefreshHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbIHToIHRefreshHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbIHToIHRefreshHistPager').css('color','white');
	});
		
}