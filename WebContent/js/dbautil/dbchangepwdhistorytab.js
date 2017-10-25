function initDBChangePwdHistoryPage() {
	debugger;
	$("#dbChangePwdHistGrid").jqGrid(
			{

				url : 'rest/DBAUtilRestService/getDBChangePwdHistList',
				datatype : "json",
				colNames : ['Client ', 'Connect String', 'Lock/Unlock ', ' Scheduled Time', 'DBO Password', 'BENDEV Password',
				            'Username', 'Password', 'Status', 'Requested By', 'Requested Date', 'Email Notification' ],
							 
				colModel : [ {
					name : 'client',
					index : 'client',
					width : 150
				}, {
					name : 'dbConnectString', 
					index : 'dbConnectString',
					width : 150
				}, {
					name : 'lockAccounts',
					index : 'lockAccounts',
					width : 150
				}, {
					name : 'scheduledTime',
					index : 'scheduledTime',
					width : 150
				}, {
					name : 'dboPwd',
					index : 'dboPwd',
					hidden : true,
					width : 150
				}, {
					name : 'bendevPwd',
					index : 'bendevPwd',
					hidden : true,
					width : 150
				}, {
					name : 'username',
					index : 'username',
					width : 150
				}, {
					name : 'password',
					index : 'password',
					hidden : true,
					width : 150
				}, {
					name : 'status',
					index : 'status',
					width : 150
				}, {
					name : 'pwdResetRequestedBy',
					index : 'pwdResetRequestedBy',
					width : 150
				}, {
					name : 'pwdResetRequestedDate',
					index : 'pwdResetRequestedDate',
					width : 150		
				}, {
					name : 'email',
					index : 'email',
					width : 150
				} ],
				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#dbChangePwdHistPager',
				paging : true,
				height : '200',
				width : $("#tabs-20").width(),
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
				caption : " DB Change Password History",
				ondblClickRow : function(rowId) {
					rowPopup($(this),rowId,[5,6,8],'n');
				}
			});

	jQuery("#dbChangePwdHistGrid").jqGrid('navGrid',
			'#dbChangePwdHistPager', {
				del : false,
				add : false,
				edit : false,
				search : true,
				searchtext : 'Find',
				refresh : true,
				refreshtext : 'Refresh',
				beforeRefresh : function() {
					jQuery("#dbChangePwdHistGrid").setGridParam({
						datatype : 'json'
					});
					jQuery("#dbChangePwdHistGrid").trigger("reloadGrid");
				},
				closeAfterEdit : true
			}, {}, // default settings for edit
			{}, // default settings for add
			{}, // delete
			{
				// search options
				width : 900,
				modal : true,
				jqModal : true,
				multipleSearch : true,
				closeAfterSearch : true,
				closeAfterReset:true,
				onSearch : function() {
					$('.ui-pg-div:contains("Find")','#dbChangePwdHistPager').css('color','red');
				},
				onReset : function() {
					$('.ui-pg-div:contains("Find")','#dbChangePwdHistPager').css('color','white');
				}
			}, {});

			jQuery('.ui-pg-div:contains("Refresh")', '#dbChangePwdHistPager').click(function(){
				$('.ui-pg-div:contains("Find")','#dbChangePwdHistPager').css('color','white');
			});

}