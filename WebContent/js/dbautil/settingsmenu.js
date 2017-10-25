$(document)
		.ready(
				function() {
					emailDialog = $("#emailDialogForm")
							.dialog(
									{
										autoOpen : false,
										height : 250,
										width : 520,
										modal : true,

										buttons : {
											"Save" : function() {
												var clientValue = $(
														'#clientName').val();
												var emailValue = $('#emailVal')
														.val();
												if (clientValue == ""
														|| clientValue == "clientValue") {
													$("#emailErrorMessage")
															.text(
																	"Error: Please Select the Client  ");
												} else if (emailValue == "") {
													$("#emailErrorMessage")
															.text(
																	"Error: Please give the Email ..  ");
												} else {
													saveClicked();
												}

											},
											Cancel : function() {
												emailDialog.dialog("close");
											}
										},
										close : function() {
											// form[0].reset();
											// allFields.removeClass("ui-state-error");
										}
									});

					emailUpdatedDialog = $("#emailUpdatedDiv").dialog({
						autoOpen : false,
						height : "auto",
						width : "auto",
						modal : true,
						buttons : {
							"Ok" : function() {
								emailUpdatedDialog.dialog("close");
							}
						},
						close : function() {
						}
					});

					$("#email").click(function() {
						getClientListForEmailUpdate();
						emailDialog.dialog("open");
					});

					function saveClicked() {
						var urlVal = "rest/DBAUtilRestService/updateEmail";

						$.ajax({
							url : urlVal,
							data : $("#emailForm").serialize(),
							type : "POST"

						}).done(function(data) {

							if (data.status == "Success") {
								emailDialog.dialog("close");
								emailUpdatedDialog.dialog("open");
							} else {
								$("#emailErrorMessage").text(data.message);
							}
						});

					}

					paswrdDialog = $("#passwrdDialogForm")
							.dialog(
									{
										autoOpen : false,
										height : 200,
										width : 520,
										modal : true,
										closeOnEscape: false,
										open: function(event, ui) {
									        $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
									    },
										buttons : {
											"Save" : function() {
												debugger;
												var passwordValue = $(
														'#passwordVal').val();
												if (passwordValue == "") {
													$("#pwrdErrorMessage")
															.text(
																	"Error: Password should not be empty ..  ");
												} else {
													okClickedForPassWord();

												}

											},
											Cancel : function() {
												$.ajax({
													url : "rest/DBAUtilRestService/getUserName",
													type : "GET"
												}).done(function(data) {
													debugger;
													loginUserName = data.userName;
													$.ajax({
														url : "rest/DBAUtilRestService/isNewUser/"+loginUserName,
														type : "GET"
													}).done(function(response) {
														if (response == 'N') {
															paswrdDialog.dialog("close");
														}
													});
												});
											}
										},
										
										close : function() {
											// form[0].reset();
											// allFields.removeClass("ui-state-error");
										}
									});
					
					

					paswrdUpdatedDialog = $("#passwrdUpdatedDiv").dialog({
						autoOpen : false,
						height : "auto",
						width : "auto",
						modal : true,
						buttons : {
							"Ok" : function() {
								paswrdUpdatedDialog.dialog("close");
							}
						},
						close : function() {
						}
					});

					$("#password").click(function() {
						paswrdDialog.dialog("open");
					});

					function okClickedForPassWord() {
						debugger;
						var urlVal = "rest/DBAUtilRestService/changePasswrd";

						$.ajax({
							url : urlVal,
							data : $("#newPasswordForm").serialize(),
							type : "POST"

						}).done(function(data) {
							debugger;
							if (data.status == "Success") {
								
								paswrdDialog.dialog("close");
								paswrdUpdatedDialog.dialog("open");

							} else {
								$("#pwrdErrorMessage").text(data.message);
							}
						});
					}
					
					var t = $("#conversionDBEnableWidgetArea").bootstrapTransfer({
						'target_id' : 'multi-select-input',
						'height' : '15em',
						'hilite_selection' : true
					});
					
					conversionDbDialog = $("#conversionDB_Div")
					.dialog(
							{
								autoOpen : false,
								height : "auto",
								width : "auto",
								modal : true,
								buttons : {
									"Save" : enableSaveClicked,
									Cancel : function() {

										conversionDbDialog
												.dialog("close");
										$('#clientForConverisonDB')[0].selectedIndex = 0;
										$("#conversionDB_ErrorMessage")
												.text("");
										t.empty();
										t = $(
												'#conversionDBEnableWidgetArea')
												.bootstrapTransfer(
														{
															'target_id' : 'multi-select-input',
															'height' : '15em',
															'hilite_selection' : true
														});
									}
								},
								close : function() {

									conversionDbDialog
											.dialog("close");
									$('#clientForConverisonDB')[0].selectedIndex = 0;
									$("#conversionDB_ErrorMessage")
											.text("");
									t.empty();
									t = $('#conversionDBEnableWidgetArea')
											.bootstrapTransfer(
													{
														'target_id' : 'multi-select-input',
														'height' : '15em',
														'hilite_selection' : true
													});
								}
							});// end of conversionDbDialog
										
					$('#clientForConverisonDB')
					.change(
							function() {

								var clientName = $(
										'#clientForConverisonDB').val();

								$
										.ajax(
												{
													url : "rest/DBAUtilRestService/getConversionDBList/"
															+ clientName
												})
										.done(
												function(response) {

													var map = response;
													if (t) {
														t.empty();
													}
													convDBArray = [];
													t = $(
															'#conversionDBEnableWidgetArea')
															.bootstrapTransfer(
																	{
																		'target_id' : 'multi-select-input',
																		'height' : '15em',
																		'hilite_selection' : true
																	});
													var enableConvDBList = map.convDB;
													var disableConvDBList = map.otherDB;

													var enableArrIds = [];
													var count = 0;

													for (var i = 0; i < enableConvDBList.length; i++) {


														var enableConvDB = {};
														enableConvDB.value = enableConvDBList[i];
														enableConvDB.content = enableConvDBList[i];

														convDBArray
																.push(enableConvDB);
														enableArrIds
																.push(enableConvDBList[i]);
														count++;
													}
													for (var j = 0; j < disableConvDBList.length; j++) {

														var disableConvDB = {};
														disableConvDB.value = disableConvDBList[j];
														disableConvDB.content = disableConvDBList[j];

														convDBArray
																.push(disableConvDB);
														count++;
													}
													t.populate(convDBArray);

													t.set_values(enableArrIds);
													console.log(t.get_values());
												});
							});
					
					function enableSaveClicked() {

						var clientvalue = $("#clientForConverisonDB option:selected").val();
						
						if (clientvalue == "" || clientvalue == "Select") {
							$("#conversionDB_ErrorMessage").text(
									"Error: Please Select the Client ");
						} else {
							var enableArr = t.get_values();
							
							var jsonObj = {};
							jsonObj.clientValue	= clientvalue;
							jsonObj.conversionDBArray = enableArr;

							var json_data = JSON.stringify(jsonObj);
							$
									.ajax({
										url : "rest/DBAUtilRestService/updateConversionDB",
										type : 'POST',
										contentType : "application/json",
										data : json_data,
										success : function(data) {
											if (data.status == "Success") {
												conversionDbDialog
														.dialog("close");
											} else {
												$("#conversionDB_ErrorMessage")
														.text(
																"Error : "
																		+ data.message);
											}

										},
										failure : function(data) {
											$("#conversionDB_ErrorMessage")
													.text("Error : " + data);
										}
									});
						}
					}
					
					$("#conversionDB").click(function() {
						getClientListForConversionDB();
						conversionDbDialog.dialog("open");
					});
					
					var managePermissionsWidget = $("#managePermissionsEnableWidgetArea").bootstrapTransfer({
						'target_id' : 'multi-select-input',
						'height' : '15em',
						'hilite_selection' : true
					});
					
					managePermissionsDialog = $("#managePermissions_div")
					.dialog(
							{
								autoOpen : false,
								height : "auto",
								width : "auto",
								modal : true,
								buttons : {
									"Save" : enableSaveClickedForManagePermissions,
									Cancel : function() {

										managePermissionsDialog
												.dialog("close");
										$('#managePermissions_userId')[0].selectedIndex = 0;
										$("#managePermissions_errorMessage")
												.text("");
										managePermissionsWidget.empty();
										managePermissionsWidget = $(
												'#managePermissionsEnableWidgetArea')
												.bootstrapTransfer(
														{
															'target_id' : 'multi-select-input',
															'height' : '15em',
															'hilite_selection' : true
														});
									}
								},
								close : function() {

									managePermissionsDialog
											.dialog("close");
									$('#managePermissions_userId')[0].selectedIndex = 0;
									$("#managePermissions_errorMessage")
											.text("");
									managePermissionsWidget.empty();
									managePermissionsWidget = $('#managePermissionsEnableWidgetArea')
											.bootstrapTransfer(
													{
														'target_id' : 'multi-select-input',
														'height' : '15em',
														'hilite_selection' : true
													});
								}
							});// end of managePermissionsDialog
					
					$('#managePermissions_userId')
					.change(
							function() {

								var userId = $(
										'#managePermissions_userId').val();

								$
										.ajax(
												{
													url : "rest/DBAUtilRestService/getTabsList/"
																+ userId
												})
										.done(
												function(response) {

													var map = response;
													if (managePermissionsWidget) {
														managePermissionsWidget.empty();
													}
													managePermissionsArray = [];
													managePermissionsWidget = $(
															'#managePermissionsEnableWidgetArea')
															.bootstrapTransfer(
																	{
																		'target_id' : 'multi-select-input',
																		'height' : '15em',
																		'hilite_selection' : true
																	});
													var enableUtilitiesList = map.enableUtilities;
													var disableUtilitiesList = map.disableUtilities;

													var enableArrIds = [];
													var count = 0;

													for (var i = 0; i < enableUtilitiesList.length; i++) {
														var managePermissions_enabledUtilities = {};
														managePermissions_enabledUtilities.value = enableUtilitiesList[i];
														managePermissions_enabledUtilities.content = enableUtilitiesList[i];

														managePermissionsArray
																.push(managePermissions_enabledUtilities);
														enableArrIds
																.push(enableUtilitiesList[i]);
														count++;
													}
													for (var j = 0; j < disableUtilitiesList.length; j++) {
														var managePermissions_disabledUtilities = {};
														managePermissions_disabledUtilities.value = disableUtilitiesList[j];
														managePermissions_disabledUtilities.content = disableUtilitiesList[j];

														managePermissionsArray
																.push(managePermissions_disabledUtilities);
														count++;
													}
													managePermissionsWidget.populate(managePermissionsArray);

													managePermissionsWidget.set_values(enableArrIds);
													console.log(managePermissionsWidget.get_values());
												});
							});
					
					function enableSaveClickedForManagePermissions() {
						debugger;
						var userIdvalue = $("#managePermissions_userId option:selected").val();
						
						if (userIdvalue == "" || userIdvalue == "Select") {
							$("#managePermissions_errorMessage").text(
									"Error: Please Select the username ");
						} else {
							var enableArr = managePermissionsWidget.get_values();
							
							var jsonObj = {};
							jsonObj.userId	= userIdvalue;
							jsonObj.enabledTabs = enableArr;

							var json_data = JSON.stringify(jsonObj);
							$
									.ajax({
										url : "rest/DBAUtilRestService/managePermissions",
										type : 'POST',
										contentType : "application/json",
										data : json_data,
										success : function(data) {
											if (data.status == "Success") {
												managePermissionsDialog
														.dialog("close");
											} else {
												$("#managePermissions_errorMessage")
														.text("Error : "
																		+ data.message);
											}

										},
										failure : function(data) {
											$("#managePermissions_errorMessage")
													.text("Error : " + data);
										}
									});
						}
					}
					
					$("#managePermissions").click(function() {
						getUserListForManagePermissions();
						managePermissionsDialog.dialog("open");
					});
				
					var manageClientsWidget = $("#manageClientsEnableWidgetArea").bootstrapTransfer({
						'target_id' : 'multi-select-input',
						'height' : '15em',
						'hilite_selection' : true
					});
					
					manageClientsDialog = $("#manageClients_div")
					.dialog(
							{
								autoOpen : false,
								height : "auto",
								width : "auto",
								modal : true,
								buttons : {
									"Save" : enableSaveClickedForManageClients,
									Cancel : function() {

										manageClientsDialog
												.dialog("close");
										$('#manageClients_userId')[0].selectedIndex = 0;
										$("#manageClients_errorMessage")
												.text("");
										manageClientsWidget.empty();
										manageClientsWidget = $(
												'#manageClientsEnableWidgetArea')
												.bootstrapTransfer(
														{
															'target_id' : 'multi-select-input',
															'height' : '15em',
															'hilite_selection' : true
														});
									}
								},
								close : function() {

									manageClientsDialog
											.dialog("close");
									$('#manageClients_userId')[0].selectedIndex = 0;
									$("#manageClients_errorMessage")
											.text("");
									manageClientsWidget.empty();
									manageClientsWidget = $('#manageClientsEnableWidgetArea')
											.bootstrapTransfer(
													{
														'target_id' : 'multi-select-input',
														'height' : '15em',
														'hilite_selection' : true
													});
								}
							});// end of manageClientsDialog
					
					$('#manageClients_userId')
					.change(
							function() {

								var userId = $(
										'#manageClients_userId').val();

								$
										.ajax(
												{
													url : "rest/DBAUtilRestService/getClientsForEdit/"
																+ userId
												})
										.done(
												function(response) {

													var map = response;
													if (manageClientsWidget) {
														manageClientsWidget.empty();
													}
													manageClientsArray = [];
													manageClientsWidget = $(
															'#manageClientsEnableWidgetArea')
															.bootstrapTransfer(
																	{
																		'target_id' : 'multi-select-input',
																		'height' : '15em',
																		'hilite_selection' : true
																	});
													var enableClientsList = map.enableClients;
													var disableClientsList = map.disableClients;

													var enableArrIds = [];
													var count = 0;

													for (var i = 0; i < enableClientsList.length; i++) {
														var manageClients_enabledClients = {};
														manageClients_enabledClients.value = enableClientsList[i];
														manageClients_enabledClients.content = enableClientsList[i];

														manageClientsArray
																.push(manageClients_enabledClients);
														enableArrIds
																.push(enableClientsList[i]);
														count++;
													}
													for (var j = 0; j < disableClientsList.length; j++) {
														var manageClients_disabledClients = {};
														manageClients_disabledClients.value = disableClientsList[j];
														manageClients_disabledClients.content = disableClientsList[j];

														manageClientsArray
																.push(manageClients_disabledClients);
														count++;
													}
													manageClientsWidget.populate(manageClientsArray);

													manageClientsWidget.set_values(enableArrIds);
													console.log(manageClientsWidget.get_values());
												});
							});
					
					function enableSaveClickedForManageClients() {
						debugger;
						var userIdvalue = $("#manageClients_userId option:selected").val();
						
						if (userIdvalue == "" || userIdvalue == "Select") {
							$("#manageClients_errorMessage").text(
									"Error: Please Select the username ");
						} else {
							var enableArr = manageClientsWidget.get_values();
							
							var jsonObj = {};
							jsonObj.userId  = userIdvalue;
							jsonObj.enabledClients = enableArr;

							var json_data = JSON.stringify(jsonObj);
							$
									.ajax({
										url : "rest/DBAUtilRestService/manageClients",									
										type : 'POST',
										contentType : "application/json",
										data : json_data,
										success : function(data) {
											if (data.status == "Success") {
												manageClientsDialog
														.dialog("close");
											} else {
												$("#manageClients_errorMessage")
														.text("Error : "
																		+ data.message);
											}

										},
										failure : function(data) {
											$("#manageClients_errorMessage")
													.text("Error : " + data);
										}
									});
						}
					}
					
					$("#manageClients").click(function() {
						getUserListForManageClients();
						manageClientsDialog.dialog("open");
					});
					
					$("#releaseNotes").click(
							function() {
								$( "#tabs" ).tabs( "option", "active",21 );
							});
					
					createUserDialog = $("#createUserDiv")
					.dialog(
							{
								autoOpen : false,
								height : 370, //250
								width : 600,  //520
								modal : true,

								buttons : {
									"Submit" : function() {
										$("#createUser_errorMessage").text("");
										var userId = $('#createUser_userID').val();
										var username = $('#createUser_username').val();
										var password = $('#createUser_password').val();
										var retypePassword = $('#createUser_retypePassword').val();
										var email = $('#createUser_email').val();
										var comments = $('#createUser_comments').val();
										var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
										
										if(userId == "" || username == "" || password == "" 
											|| retypePassword == "" || email == "" || comments == "") {
											$("#createUser_errorMessage").text('Error: All Fields are required');
										} else if(password != retypePassword) {
											$('#createUser_password').css('border-color', '#E34234');
											$('#createUser_retypePassword').css('border-color', '#E34234');
											$("#createUser_errorMessage").text('Both passwords should match');
										} else if(!(re.test(email))||(email.indexOf("@vitechinc.com", email.length - "@vitechinc.com".length) == -1)) {
											//Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
												$("#createUser_errorMessage").text('Email is invalid');
										} else {
//											createUser();
											alert('This feature will be available soon');
											createUserDialog.dialog("close");
										}

									},
									Cancel : function() {
										$("#createUserForm").trigger("reset");
										$("#createUser_errorMessage").text('');
										$('#createUser_password').css('border-color', '#a6c9e2');
										$('#createUser_retypePassword').css('border-color', '#a6c9e2'); 
										createUserDialog.dialog("close");
									}
								},
								close : function() {
									$("#createUserForm").trigger("reset");
									$("#createUser_errorMessage").text('');
									$('#createUser_password').css('border-color', '#a6c9e2');
									$('#createUser_retypePassword').css('border-color', '#a6c9e2'); 
									createUserDialog.dialog("close");
								}
							});

			userCreatedDialog = $("#userCreatedDiv").dialog({
				autoOpen : false,
				height : "auto",
				width : "auto",
				modal : true,
				buttons : {
					"Ok" : function() {
						userCreatedDialog.dialog("close");
					}
				},
				close : function() {
					userCreatedDialog.dialog("close");
				}
			});
			
			$("#createUser_userID").inputmask({
				alias : "Regex",
				regex:"^[a-zA-Z_][a-zA-Z0-9_]*$"
			// first letter should not be a number,
			// later on only allows alphabets, numbers, and underscore only
			});
			
			$("#createUser_username").inputmask({
				alias : "Regex",
				regex:"^[a-zA-Z_][a-zA-Z0-9_ ]{39}$"  
			// first letter should not be a number,
			// later on only allows alphabets, numbers, spaces and underscore only
			// max 40 char only
			});
			
			createUserErrDialog = $("#createUser_ErrorDiv ").dialog({
				autoOpen : false,
				height : "auto",
				width : "auto",
				modal : true,
				buttons : {
					"Ok" : function() {
						createUserErrDialog.dialog("close");
					}
				},
				close : function() {
					createUserErrDialog.dialog("close");
				}
			});
			
			$("#createUser_userID").blur(function () {
				 var userID =  $("#createUser_userID").val();
				 $.ajax(
							{
								url : "rest/DBAUtilRestService/validateUserID/"
										+ userID,
								type : "GET"

							})
					.done(
							function(response) {
								if (response == 'Y') {
									$("#createUser_userID").val("");
									$("#createUser_userID").focus();
									createUserErrDialog.dialog("open");
								} 
							});
		         
		     });

			$("#createUser").click(function() {
				createUserDialog.dialog("open");
			});
			
			function createUser() {
				$.ajax({
//					url : "rest/DBAUtilRestService/createUser",
					data : $("#createUserForm").serialize(),
					type : "POST"

				}).done(function(data) {

					if (data.status == "Success") {
						$("#createUserForm").trigger("reset");
						createUserDialog.dialog("close");
						userCreatedDialog.dialog("open");
					} else {
						$("#createUserErrorMessage").text(data.message);
					}
				});

			}
			
			function getClientListForConversionDB() {
				$.ajax({
					url : "rest/DBAUtilRestService/getClientList",
					type : "GET"
				}).done(
						function(response) {
							var s = $('#clientForConverisonDB');
//							var s1 = $('#clientName');
							var options = $("<option value=''>Select</option>");
							s.append(options);
							for (var i = 0; i < response.length; i++) {
								options = $('<option value="'
											+ response[i] + '">'
											+ response[i]
											+ '</option>');
								s.append(options);
							}
						});
			}

			function getClientListForEmailUpdate() {
				$.ajax({
					url : "rest/DBAUtilRestService/getClientList",
					type : "GET"
				}).done(
						function(response) {
							var s = $('#clientName');
							var options = $("<option value=''>Select</option>");
							s.append(options);
							for (var i = 0; i < response.length; i++) {
								options = $('<option value="'
										+ response[i] + '">'
										+ response[i]
										+ '</option>');
								s.append(options);
							}
						});
			}
			
			function getUserListForManageClients() {
				$.ajax({
					url : "rest/DBAUtilRestService/getUserList",
					type : "GET"
				}).done(
						function(response) {
							var s = $('#manageClients_userId');
							var options = $("<option value=''>Select</option>");
							s.append(options);
							for (var i = 0; i < response.length; i++) {
								options = $('<option value="'
										+ response[i] + '">'
										+ response[i] + '</option>');
								s.append(options);
							}
						});
			}
			
			function getUserListForManagePermissions() {
	
				$.ajax({
					url : "rest/DBAUtilRestService/getUserList",
					type : "GET"
				})
				.done(
					  function(response) {
							var s = $('#managePermissions_userId');
							var options = $("<option value=''>Select</option>");
							s.append(options);
							for (var i = 0; i < response.length; i++) {
								options = $('<option value="'
										+ response[i] + '">'
										+ response[i] + '</option>');
								s.append(options);
							}
						});
			}
});