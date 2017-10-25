function initBackupHistoryPage() {
	$("#DBBackupHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getDBBackupHistList',
				datatype : "json",
				colNames : [' Client ','Connect String','Backup Frequency',
				    		'Backup Type ','Retention Days', 'Retention Copies', 'Status','Backup Start Time',
				    		'Backup End Time', 'Backup Size (GB)', 'Requested By ', 'Email Notification' ],
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
							name : 'backupFreq',
							index : 'backupFreq',
							frozen: true,
							width : 150
						}, {
							name : 'backupType',
							index : 'backupType',
							width : 150
						}, {
							name : 'backupRetDays',
							index : 'backupRetDays',
							sorttype:'integer' ,
							width : 180
						
						}, {
							name : 'backupRetCopies',
							index : 'backupRetCopies',
							sorttype:'integer' ,
							width : 180
						}, {
							name : 'status',
							index : 'status',
							width : 180
						}, {
							name : 'startTime',
							index : 'startTime',
							width : 200,
							fixed : true
						}, {
							name : 'endTime',
							index : 'endTime',
							width : 200,
							shrinkToFit : false
						// align : 'center'
//						}, {
//							name : 'backupExpiryDate',
//							index : 'backupExpiryDate',
//							width : 200,
//							fixed : true
						}, {
							name : 'backupSize',
							index : 'backupSize',
							sorttype:'integer' ,
							width : 200,
							shrinkToFit : false
						// align : 'center'
						}, {
							name : 'reqBy',
							index : 'reqBy',
							width : 180,
							shrinkToFit : false
						// align : 'center'
						}, {
							name : 'email',
							index : 'email',
							width : 270
//						}, {
//							name : 'longTermBackup',
//							index : 'longTermBackup',
//							width : 170
						} ],

				rowNum : 10,
				rowList : [ 5, 10, 15, 20 ],
				pager : '#dbBackupHistPager',
				paging : true,
				width : $("#tabs-5").width(),
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
				caption : "DB Backup History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}

			});
	$("#DBBackupHistGrid").jqGrid("setFrozenColumns");
	jQuery("#DBBackupHistGrid").jqGrid('navGrid', '#dbBackupHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#DBBackupHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#DBBackupHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#dbBackupHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#dbBackupHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#dbBackupHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#dbBackupHistPager').css('color','white');
	});
		
}