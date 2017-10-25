function initCreateDBTargetHostPage() {

	$("#createDB_targetDbHostGrid").jqGrid(
			{
//				colNames : [ " VM Name ", " VM IP ", " CPU Cores ", " Memory ",
//						" Free Space(GB) ", " No.of DB's ", "" ],
						
				colNames : [ " VM Name ", " VM IP ", " CPU Cores ", " Memory ",
										" Free Space(GB) ", " No.of DB's "],

				colModel : [ {
					name : 'vmName',
					index : 'vmName',
					width : 210,
					sortable : true
				}, {
					name : 'vmIP',
					index : 'vmIP',
					width : 150,
					sortable : true
				}, {
					name : 'cpuCores',
					index : 'cpuCores',
					width : 80,
					sortable : true
				}, {
					name : 'memory',
					index : 'memory',
					width : 65,
					sortable : true
				}, {
					name : 'freeSpace',
					index : 'freeSpace',
					width : 115,
					sortable : true
				}, {
					name : 'noOfDBs',
					index : 'noOfDBs',
					width : 80,
					sortable : true
//				},{
//					name : 'select',
//					index : 'select',
//					width : 70,
//					editable : true,
//					edittype : 'checkbox',
//					editoptions : {
//						value : "True:False"
//					},
//					formatter : "checkbox",
//					formatoptions : {
//						disabled : false
//					}
				}

				],

				rowNum : 10,
				rowList : [ 10, 20, 30 ],
				pager : '#createDB_targetDbHostDBPager',
				paging : true,
				height : '160',
				width : 860,
				modal : true,
				jqModal : true,
				viewrecords : true,
				rownumbers : true,
				loadonce : true,
				gridview : true,
				shrinkToFit : false,
				reloadAfterSubmit : true,
				scroller : true,
				caption : "Target DB Host",
				multiselect : true,
				
//				onPaging : function() {
//					alert("hi");					
//				}
				
				onSelectAll : function(selectedRowsIds, status) {
					$("#createDB_targetDbHostGrid .jqgrow td input").prop('checked',false);
				},
				
				beforeSelectRow: function (rowid) {
				    if ($(this).jqGrid("getGridParam", "selrow") != rowid) {
				    	$(this).jqGrid("resetSelection");
				    } else {
				        return true;
				    }
				},
				onSelectRow : function(rowId, selected, e ) {
					debugger;
					
//					$("#createDB_targetDbHostGrid .jqgrow td input").not(this).prop('checked',false);
							
					
					$("#createDB_targetDBIp").val("");
					
					var rowData = jQuery("#createDB_targetDbHostGrid").jqGrid('getRowData',rowId); 
					var vmIPval = rowData.vmIP;
					
					$("#createDB_targetDBIp").val(vmIPval);
					
				},
			


			});

	$("#createDB_targetDbHostGrid").jqGrid('navGrid',
			'#createDB_targetDbHostDBPager', {
				del : false,
				add : false,
				edit : false,
				search : false,
				refresh : false,
			});
	
}
