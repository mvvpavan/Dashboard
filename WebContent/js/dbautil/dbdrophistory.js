function initDBDropHistoryPage() {
	$("#DBDropHistGrid").jqGrid(
			{
				url : "rest/DBAUtilRestService/getDBDropList/" + "Y",
				datatype : "json",
				colNames : ['  Client ',' Connect String','Start Time',
				    		'Backup DB', 'Status', 'Requested By',
				    		'Backup Location', ' Requested Date', 'Email Notification',
				    		' Drop DB Notes'],
				colModel : [
						{
							name : 'client',
							index : 'client',
							frozen: true,
							width : 150

						},{
							name : 'connectString',
							index : 'connectString',
//							align : 'center',
							frozen: true,
							width : 150
						},{
							name : 'startTime',
							index : 'startTime',
							width : 200
						}, {
							name : 'backupDBBeforeDrop',
							index : 'backupDBBeforeDrop',
							align : 'center',
							width : 150
						
						}, {
							name : 'status',
							index : 'status',
							align : 'center',
							width : 180
						}, {
							name : 'reqBy',
							index : 'reqBy',
							width : 180,
							shrinkToFit : false
							
						}, {
							name : 'dbBackupLocation',
							index : 'dbBackupLocation',
							width : 270
						}, {
							name : 'reqDate',
							index : 'reqDate',
							width : 200
						}, {
							name : 'email',
							index : 'email',
							width : 270
						}, {
							name : 'dropDBNotes',
							index : 'dropDBNotes',
							width : 170
						} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbDropHistPager',
				paging : true,
				width : $("#tabs-15").width(),
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
				caption : "DB Drop History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
				
			});
	$("#DBDropHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBDropHistGrid").jqGrid('navGrid', '#dbDropHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBDropHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBDropHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbDropHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbDropHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbDropHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbDropHistPager').css('color','white');
	});
		
}