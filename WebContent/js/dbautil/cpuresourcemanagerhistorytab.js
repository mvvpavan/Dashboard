function initCPUResourceManagerHistoryPage() {
	$("#CPUResourceManagerHistoryGrid")
			.jqGrid(
					{

						url : 'rest/DBAUtilRestService/getCPUResourceManagerHistList',
						datatype : "json",
						colNames : ['  Client ',' VM Name ',' Connect String',
						    		'Max CPU Limit', 'Status ' , 'Request Type' ,
						    		' Scheduled Time', 'Requested By ',  'Requested Date ',' Email Notification' ],
						colModel : [
								{
									name : 'client',
									index : 'client',
									width : 150
								},
								{
									name : 'vmName',
									index : 'vmName',
									width : 150
								}, {
									name : 'connectString',
									index : 'connectString',
									width : 180
								}, {
									name : 'maxCPULimit',
									index : 'maxCPULimit',
									width : 180
								}, {
									name : 'status',
									index : 'status',
									width : 150
								}, {
									name : 'requestType',
									index : 'requestType',
									width : 150
							
								}, {
									name : 'startTime',
									index : 'startTime',
									width : 250,
									fixed : true
								}, {
									name : 'reqBy',
									index : 'reqBy',
									width : 180,
									align : 'center'
								}, {
									name : 'reqDate',
									index : 'reqDate',
									width : 170
								}, {
									name : 'email',
									index : 'email',
									width : 270
								
								} ],
						rowNum : 10,
						rowList : [ 10, 20, 30 ],
						pager : '#cpuResourceManagerPagerHistoryPager',
						paging : true,
						height : '200',
						width : $("#tabs-16").width(),
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
						caption : " CPU Resource Manager History",
						ondblClickRow : function(rowId) {
							rowPopup($(this),rowId,[],'n');
						}
					});
	
	jQuery("#CPUResourceManagerHistoryGrid").jqGrid('navGrid', '#cpuResourceManagerPagerHistoryPager', {
		del : false,
		add : false,
		edit : false,
		search : true,
		searchtext : 'Find',
		refresh : true,
		refreshtext : 'Refresh',
		beforeRefresh:function(){
		        jQuery("#CPUResourceManagerHistoryGrid").setGridParam({datatype: 'json'});
		        jQuery("#CPUResourceManagerHistoryGrid").trigger("reloadGrid");
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
			$('.ui-pg-div:contains("Find")','#cpuResourceManagerPagerHistoryPager').css('color','red');
		},
		onReset : function() {
			$('.ui-pg-div:contains("Find")','#cpuResourceManagerPagerHistoryPager').css('color','white');
		}
	}, {});

	jQuery('.ui-pg-div:contains("Refresh")', '#cpuResourceManagerPagerHistoryPager').click(function(){
		$('.ui-pg-div:contains("Find")','#cpuResourceManagerPagerHistoryPager').css('color','white');
	});

}