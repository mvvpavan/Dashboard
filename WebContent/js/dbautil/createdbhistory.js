function initCreateDBHistoryPage() {
	$("#createDBHistGrid").jqGrid(
			{
				url : 'rest/DBAUtilRestService/getCreateDBHistList/'+"Y",
				datatype : "json",
				colNames : [ 'Source DB ', 'Target Client ', 'Target DB ',   'Status','Start Time', 
				             'Target DB SID', 'Target DB Host IP', 'Database Memory', 'Enable Target DB Backup', 'Database Purpose', 'Email ', 
				             'Requested By', 'Requested Date'],

				colModel : [ {
					name : 'srcDBConnectString',
					index : 'srcDBConnectString',
//					frozen: true,
					width : 150,
					fixed : true,
					search : true,
					sortable : true
				}, {
					name : 'trgtDBClientName',
					index : 'trgtDBClientName',
//					frozen: true,
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgDBConnectString',
					index : 'trgDBConnectString',
					width : 150,
					search : true,
					sortable : true
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
					sortable : true
				}, {
					name : 'trgDBSID',
					index : 'trgDBSID',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'trgDBHostIP',
					index : 'trgDBHostIP',
					width : 150,
					search : true,
					sortable : true
				
				}, {
					name : 'databaseMemory',
					index : 'databaseMemory',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'enableTargetDBBackup',
					index : 'enableTargetDBBackup',
					width : 150,
					search : true,
					sortable : true
				}, {
					name : 'databasePurpose',
					index : 'databasePurpose',
					width : 150,
					search : true,
					sortable : true
			
				}, {
					name : 'emailNotification',
					index : 'emailNotification',
					width : 150,
					search : true,
					sortable : true
				
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
				pager : '#createDBHistPager',
				paging : true,
				height : '200',
				width : $("#tabs-14").width(),
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
				caption : "Create DB History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[],'n');
				}
			});
	$("#createDBHistGrid").jqGrid("setFrozenColumns");
	jQuery("#createDBHistGrid").jqGrid('navGrid', '#createDBHistPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		 beforeRefresh:function(){
		        jQuery("#createDBHistGrid").setGridParam({datatype: 'json'});
		        jQuery("#createDBHistGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#createDBHistPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#createDBHistPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#createDBHistPager').click(function(){
		$('.ui-pg-div:contains("Find")','#createDBHistPager').css('color','white');
	});
		
}