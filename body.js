function UpdateTableViewDropdown(e){for(var r=document.getElementById("TableViewDropdown").firstChild;null!=r;){var t=r.internalText.indexOf("{CurrentDriver}");if(t>=0){var a=CapitalizeFirstLetters(CurrentDriver,!0);r.text=r.internalText.slice(0,t)+a+r.internalText.slice(t+"{CurrentDriver}".length)}r=r.nextSibling}}function InitTableViewDropdown(){var e=document.getElementById("TableViewDropdown");DefaultTableView=null,TableViewTypes.forEach(function(r){r[2].indexOf(CurrentLayout)>-1&&(myOption=document.createElement("option"),myOption.text=r[0],myOption.value=r[1],myOption.internalText=r[0],e.appendChild(myOption),null==DefaultTableView&&(DefaultTableView=r[1]),CurrentTableView==r[1]&&(DefaultTableView=CurrentTableView))}),CurrentTableView=DefaultTableView,UpdateTableViewDropdown(CurrentDriver),$("#TableViewDropdown")[0].value=CurrentTableView;var r=GetTableView(CurrentTableView);r&&r[4]?$("#TableViewDriverDropdown").show():$("#TableViewDriverDropdown").hide()}function InitTableViewDriverDropdown(){var e=document.getElementById("TableViewDriverDropdown");TableViewDriverTypes.forEach(function(r){myOption=document.createElement("option"),myOption.text=r[0],myOption.value=r[1],myOption.internalText=r[0],e.appendChild(myOption)}),$("#TableViewDriverDropdown")[0].value=CurrentTableDriverView}function InitChartTypeDropdown(){var e=document.getElementById("ChartTypeDropdown");for(charts in ChartTypes)myOption=document.createElement("option"),myOption.text=ChartTypes[charts].name,myOption.value=ChartTypes[charts].id,e.appendChild(myOption);$("#ChartTypeDropdown")[0].value=CurrentChartType}function InitLayoutDropdown(){var e=document.getElementById("LayoutDropdown");LayoutTypes.forEach(function(r){myOption=document.createElement("option"),myOption.text=r[0],myOption.value=r[1],e.appendChild(myOption)}),$("#LayoutDropdown")[0].value=CurrentLayout}function InitDriverDropdown(){var e=document.getElementById("DriverDropdown"),r=document.getElementById("Driver2Dropdown");DriverList.forEach(function(t){myOption=document.createElement("option"),myOption.text=CapitalizeFirstLetters(t,!1),myOption.value=t,myOption2=document.createElement("option"),myOption2.text=CapitalizeFirstLetters(t,!1),myOption2.value=t,e.appendChild(myOption),r.appendChild(myOption2)}),$("#DriverDropdown")[0].value=CurrentDriver,$("#Driver2Dropdown")[0].value=CurrentDriver2}function ShowLoader(e){e?$("#loading").show():$("#loading").hide()}function ResetDriverTotals(){(DriverTotals=Array.matrix(3,10,0))[0][0]="Expected",DriverTotals[1][0]="Actual",DriverTotals[2][0]="Difference"}function GetURLParameter(e){for(var r=window.location.search.substring(1).split("&"),t=0;t<r.length;t++){var a=r[t].split("=");if(a[0]==e)return a[1]}}function QueueForUpdate(){UpdateInterval&&clearInterval(UpdateInterval),UpdateInterval=setInterval(UpdateAll,500)}function TransformToPercentage(e){for(var r=0;r<24;++r){var t=0;t+=Number(actualChartData.datasets[2].data[r]),t+=Number(actualChartData.datasets[1].data[r]),t-=Number(actualChartData.datasets[0].data[r]);var a=0;a+=Number(expectedChartData.datasets[2].data[r]),a+=Number(expectedChartData.datasets[1].data[r]),a-=Number(expectedChartData.datasets[0].data[r]),t&&(actualChartData.datasets[2].data[r]/=t/100,actualChartData.datasets[1].data[r]/=t/100,actualChartData.datasets[0].data[r]/=-t/100),(e&&a||!e&&t)&&(expectedChartData.datasets[2].data[r]/=a/100,expectedChartData.datasets[1].data[r]/=a/100,expectedChartData.datasets[0].data[r]/=-a/100)}}function UpdateAll(){if(DataReady){clearInterval(UpdateInterval);var e=3===CurrentLayout;ShowPercentage&&TransformToPercentage(e),UpdateCharts(),e?GenerateComparisonTable(CurrentDriver,CurrentDriver2):(0==CurrentTableView?(UpdateTableViewDropdown(CurrentDriver),UpdateTable()):4==CurrentTableView&&UpdateGridTable(),ShowLoader(!1))}}function FindMinMax(){if(ShowPercentage)MinY=0,MaxY=100,_StepSize=20;else{MaxY=0,MinY=0,_StepSize=0;for(var e=0;e<24;++e)min1=Number(expectedChartData.datasets[0].data[e]),max1=Number(expectedChartData.datasets[1].data[e])+Number(expectedChartData.datasets[2].data[e]),min2=Number(actualChartData.datasets[0].data[e]),max2=Number(actualChartData.datasets[1].data[e])+Number(actualChartData.datasets[2].data[e]),isNaN(min1)&&(min1=0),isNaN(min2)&&(min2=0),isNaN(max1)&&(max1=0),isNaN(max2)&&(max2=0),MaxY=Math.ceil(Math.max(max2,max1,MaxY)),MinY=Math.floor(Math.min(MinY,min2,min1));distance=MaxY-MinY,(_StepSize=distance<20?2:distance<40?5:distance<100?10:distance<160?20:40)?((MaxY+=_StepSize-MaxY%_StepSize)%_StepSize>_StepSize/2&&(MaxY+=_StepSize),MinY-=_StepSize+MinY%_StepSize):(MaxY+=MaxY%2,MinY>-10&&(MinY+=MinY%2),_StepSize=2)}console.log("min: "+MinY+" ::: max: "+MaxY+" ::: stepsize: "+_StepSize)}function differenceRenderer(e,r,t,a,i,n,o){Handsontable.renderers.NumericRenderer.apply(this,arguments),r.style.color=n<0?"red":"green"}function redRenderer(e,r,t,a,i,n,o){Handsontable.renderers.TextRenderer.apply(this,arguments),r.style.color="red",r.style.fontWeight="bold"}function boolRenderer(e,r,t,a,i,n,o){Handsontable.renderers.TextRenderer.apply(this,arguments),n=1==n?"Yes":"No"}function blueRenderer(e,r,t,a,i,n,o){Handsontable.renderers.TextRenderer.apply(this,arguments),r.style.color="#0000EE",r.style.cursor="pointer;"}function greenRenderer(e,r,t,a,i,n,o){Handsontable.renderers.TextRenderer.apply(this,arguments),r.style.color="green",r.style.fontWeight="bold"}function firstRowRenderer(e,r,t,a,i,n,o){Handsontable.renderers.TextRenderer.apply(this,arguments),r.style.fontWeight="bold"}function FixForTableOverflow(){var e=document.getElementById("tableContainerId"),r=document.getElementById("tableContainerId").width;e.width=r}function GetTableSettings(e){for(var r=0;r<TableViewTypes.length;r++)if(TableViewTypes[r][1]==e)return TableViewTypes[r];return TableViewTypes[DefaultTableView]}function CreateFullTable(e){for(var r=document.getElementById("driverTableId");r.firstChild;)r.removeChild(r.firstChild);var t=3==CurrentLayout?differenceRenderer:"numeric",a=GetTableSettings(CurrentTableView);SaveSortOrder();var i=[{title:"Driver",type:"text",data:"displayname",renderer:"html"},{title:"Total",type:"numeric",format:"0",data:"total"}];switch(a[3]){case"ShowSummary":i=i.concat([{title:"Actual Total/Season",type:"numeric",format:"0.00",data:"traapr",renderer:differenceRenderer},{title:"RAA (unblended)",type:"numeric",format:"0.00",data:"traap",renderer:differenceRenderer},{title:"&Delta; RAA (blended)",type:"numeric",format:"0.00",data:"delta_traap_b",renderer:differenceRenderer},{title:"RAA (blended)",type:"numeric",format:"0.00",data:"traap_b",renderer:differenceRenderer},{title:"&Delta; Lucky DNFFLs",type:"numeric",format:"0.00",data:"delta_gained_bDNFFL_full_chances",renderer:differenceRenderer},{title:"RAA (blended + Lucky DNFFLs)",type:"numeric",format:"0.00",data:"traap_b_iDNFFL_chances",renderer:differenceRenderer}]);break;case"ShowComparison":i=i.concat([{title:"&Delta;Gained/Race",type:"numeric",format:"0.000",data:"graap_b",renderer:differenceRenderer},{title:"&Delta;Kept/Race",type:"numeric",format:"0.000",data:"kraap_b",renderer:differenceRenderer},{title:"&Delta;Lost/Race",type:"numeric",format:"0.000",data:"lraap_b",renderer:differenceRenderer},{title:"&Delta;DNFFL/Race",type:"numeric",format:"0.000",data:"dnfraap",renderer:differenceRenderer},{title:"&Delta; Lucky DNFFLs",type:"numeric",format:"0.00",data:"delta_gained_bDNFFL_full_chances",renderer:differenceRenderer},{title:"RAA (blended + Lucky DNFFLs)",type:"numeric",format:"0.00",data:"traap_b_iDNFFL_chances",renderer:differenceRenderer}]);break;case"ShowDetailsFull":i=i.concat([{title:"&Delta;Gained/Race",type:"numeric",format:"0.000",data:"graap_b",renderer:differenceRenderer},{title:"&Delta;Kept/Race",type:"numeric",format:"0.000",data:"kraap_b",renderer:differenceRenderer},{title:"&Delta;Lost/Race",type:"numeric",format:"0.000",data:"lraap_b",renderer:differenceRenderer},{title:"&Delta;DNFFL/Race",type:"numeric",format:"0.000",data:"dnfraap",renderer:differenceRenderer},{title:"RAA (blended + Lucky DNFFLs)",type:"numeric",format:"0.00",data:"traap_b_iDNFFL_chances",renderer:differenceRenderer},{title:"ActualTotal/Season",type:"numeric",format:"0.00",data:"traapr",renderer:differenceRenderer},{title:"Expected Gained",type:"numeric",format:"0.00",data:"eg",renderer:t},{title:"Expected Kept",type:"numeric",format:"0.00",data:"ek",renderer:t},{title:"Expected Lost",type:"numeric",format:"0.00",data:"el",renderer:t},{title:"Expected DNFFL",type:"numeric",format:"0.00",data:"ednf",renderer:t},{title:"Actual Gained",type:"numeric",format:"0",data:"ag",renderer:t},{title:"Actual Kept",type:"numeric",format:"0",data:"ak",renderer:t},{title:"Actual Lost",type:"numeric",format:"0",data:"al",renderer:t},{title:"Actual DNFFL",type:"numeric",format:"0",data:"adnf",renderer:t}]);break;case"ShowBlendedOnly":i=i.concat([{title:"RAA",type:"numeric",format:"0.00",data:"traap",renderer:differenceRenderer},{title:"RAA (Blended)",type:"numeric",format:"0.00",data:"traap_b",renderer:differenceRenderer},{title:"&Delta;RAA (Blended)",type:"numeric",format:"0.00",data:"delta_traap_b",renderer:differenceRenderer}]);break;case"ShowBDNFFLFull":i=i.concat([{title:"RAA (blended)",type:"numeric",format:"0.00",data:"traap_b",renderer:differenceRenderer},{title:"Exp. oDNFFLs",type:"numeric",format:"0.00",data:"expected_behind_DNFFL",renderer:differenceRenderer},{title:"Act. oDNFFLs",type:"numeric",format:"0.00",data:"actual_behind_DNFFL",renderer:differenceRenderer},{title:"&Delta; oDNFFLs",type:"numeric",format:"0.00",data:"delta_behind_season",renderer:differenceRenderer},{title:"Act. Lucky DNFFLs",type:"numeric",format:"0.00",data:"actual_gDNFFL_full_season",renderer:differenceRenderer},{title:"&Delta; Lucky DNFFLs",type:"numeric",format:"0.00",data:"delta_gained_bDNFFL_full_chances",renderer:differenceRenderer},{title:"RAA (blended + Lucky DNFFLs)",type:"numeric",format:"0.00",data:"traap_b_iDNFFL_chances",renderer:differenceRenderer}]);break;case"ShowDetailsBrief":default:i=i.concat([{title:"&Delta;Gained/Race",type:"numeric",format:"0.000",data:"graap_b",renderer:differenceRenderer},{title:"&Delta;Kept/Race",type:"numeric",format:"0.000",data:"kraap_b",renderer:differenceRenderer},{title:"&Delta;Lost/Race",type:"numeric",format:"0.000",data:"lraap_b",renderer:differenceRenderer},{title:"&Delta;DNFFL/Race",type:"numeric",format:"0.000",data:"dnfraap",renderer:differenceRenderer},{title:"RAA (blended + Lucky DNFFLs)",type:"numeric",format:"0.00",data:"traap_b_iDNFFL_chances",renderer:differenceRenderer}])}window.DriverTable=new Handsontable(r,{data:e,colHeaders:!0,rowHeaders:!1,contextMenu:!1,columns:i,columnSorting:e.length>3,readOnly:!0,multiSelect:!0,fixedColumnsLeft:1,afterOnCellMouseDown:function(r,t,a){if(0==t.col&&t.row>=0){var i;if(i=this.sortIndex&&this.sortIndex.length?this.sortIndex[t.row][0]:t.row,CurrentLayout<2){var n=e[i].name;n!=CurrentDriver&&LoadDriver(n)}}},cells:function(e,r,t){return{}}}),LastTableHeader==a[3]&&SetSortOrder(),LastTableHeader=a[3]}function GetFullDriverList(e,r){var t=DriverListExperienced.concat(DriverListOthers);return t=t.concat(DriverListCurrent),1==e&&(t=t.concat(DriverListSlices)),1==r&&(t=t.concat(DriverListDNFFL)),(t=t.sort()).filter(function(e,r,t){return r==t.indexOf(e)})}function SetWidths(e){SetElement("#tableContainerId",e),SetElement("#headerId",e)}function SetElement(e,r){var t=$(e);switch(t.removeClass("tableContainerShort"),t.removeClass("tableContainerMedium"),t.removeClass("tableContainerNoMax"),r){case 0:t.addClass("tableContainerShort");break;case 1:t.addClass("tableContainerMedium");break;case 2:t.addClass("tableContainerNoMax")}}function SaveSortOrder(){void 0!=this.DriverTable&&(TableSortColumn=this.DriverTable.sortColumn,TableSortOrder=this.DriverTable.sortOrder)}function SetSortOrder(){void 0!=TableSortColumn&&this.DriverTable.sort(TableSortColumn,TableSortOrder)}function CreateTable(e){if(3==CurrentLayout)SetWidths(1),GenerateComparisonTable(CurrentDriver2,CurrentDriver);else switch(MinStartsForTable=Number($("#minStartsForTableId")[0].value),CurrentTableView){case 0:SetWidths(1==CurrentLayout?0:1),CreateDriverTable(),e&&UpdateTable();break;case 4:SetWidths(1==CurrentLayout?0:1),CreateDriverGridTable(),e&&UpdateGridTable();break;default:SetWidths(1);var r=GetTableDriverView(CurrentTableDriverView);r&&GenerateFullTable(r[2],DefaultResultsFile)}2==CurrentLayout&&SetWidths(2)}function CreateDriverGridTable(){for(var e=document.getElementById("driverTableId");e.firstChild;)e.removeChild(e.firstChild);var r=[{title:"grid",type:"numeric",data:"grid",format:"0"},{title:"Races",type:"numeric",data:"races",format:"0"},{title:"Actual Gained",type:"numeric",data:"gained",format:"0"},{title:"Actual Kept",type:"numeric",data:"kept",format:"0"},{title:"Actual Lost",type:"numeric",data:"lost",format:"0"},{title:"Actual DNFFL",type:"numeric",data:"DNF",format:"0"},{title:"Expected Gained",type:"numeric",data:"eg",format:"0.00"},{title:"Expected Kept",type:"numeric",data:"ek",format:"0.00"},{title:"Expected Lost",type:"numeric",data:"el",format:"0.00"},{title:"Expected DNFFL",type:"numeric",data:"eDNFFL",format:"0.00"}];window.DriverTable=new Handsontable(e,{data:SavedDriverData,colHeaders:!0,rowHeaders:!1,contextMenu:!1,columns:r,columnSorting:!0,readOnly:!0,multiSelect:!1,fixedColumnsLeft:1})}function CreateDriverTable(){for(var e=document.getElementById("driverTableId");e.firstChild;)e.removeChild(e.firstChild);var r=[{title:" ",type:"text"},{title:"Total",type:"numeric",format:"0"},{title:"Gained",type:"numeric",format:"0.00"},{title:"Kept",type:"numeric",format:"0.00"},{title:"Lost",type:"numeric",format:"0.00"},{title:"DNFFL",type:"numeric",format:"0.00"},{title:"Gained/Race",type:"numeric",format:"0.000"},{title:"Kept/Race",type:"numeric",format:"0.000"},{title:"Lost/Race",type:"numeric",format:"0.000"},{title:"DNFFL/Race",type:"numeric",format:"0.000"},{title:"RAA",type:"numeric",format:"0.000"}];window.DriverTable=new Handsontable(e,{data:DriverTotals,colHeaders:!0,rowHeaders:!1,contextMenu:!1,readOnly:!0,columns:r,multiSelect:!1,cells:function(e,r,t){var a={};return 2===e&&r>1&&(a.renderer=differenceRenderer),a}})}function FixTableResize(){RefreshTable&&clearInterval(RefreshTable),RefreshTable=setInterval(function(){if(this.DriverTable){clearInterval(RefreshTable);var e=document.getElementById("tableContainerId").offsetWidth-20;this.DriverTable.updateSettings({width:e+"px"})}},50)}function UpdateTableLoadRAA(){DriverTotals[0][10]=0,DriverTotals[1][10]=0,d3.tsv(DefaultResultsFile,function(e,r){for(t=0;t<r.length;t++)if(r[t].name==CurrentDriver){DriverTotals[1][10]=r[t].traap_b_iDNFFL_chances;break}for(var t=1;t<11;++t)DriverTotals[2][t]=DriverTotals[1][t]-DriverTotals[0][t];DriverTable.loadData(DriverTotals,!0),this.DriverTable.render()})}function UpdateTable(){for(var e=6;e<=9;e++)window.DriverTotals[0][e]=DriverTotals[0][e-4]/DriverTotals[0][1],window.DriverTotals[1][e]=DriverTotals[1][e-4]/DriverTotals[1][1];UpdateTableLoadRAA()}function UpdateGridTable(){DriverTable.loadData(SavedDriverData,!0),this.DriverTable.render()}function CreateCharts(){if(!HideCharts){var e=ChartTypes[CurrentChartType].yaxisLabel,r=document.getElementById("expected").getContext("2d");window.expected=new Chart(r,{type:"bar",data:expectedChartData,options:{responsive:!0,scales:{xAxes:[{gridLines:{display:!1},stacked:!0,scaleLabel:{display:!0,labelString:"grid",padding:10}}],yAxes:[{stacked:!0,ticks:{min:MinY,max:MaxY,stepSize:_StepSize,callback:function(e){return ShowPercentage?e+"%":e}},scaleLabel:{display:!0,labelString:e}}]},legend:{display:!0,position:"right",reverse:!0,labels:{fontSize:10,boxWidth:15}},title:{display:!0,text:"Expected 1st lap Outcomes"}}});r=document.getElementById("actual").getContext("2d");window.actual=new Chart(r,{type:"bar",data:actualChartData,options:{responsive:!0,scales:{xAxes:[{gridLines:{display:!1},stacked:!0,scaleLabel:{display:!0,labelString:"grid"}}],yAxes:[{stacked:!0,ticks:{min:MinY,max:MaxY,stepSize:_StepSize,callback:function(e){return ShowPercentage?e+"%":e}},scaleLabel:{display:!0,labelString:e}}]},legend:{position:"right",reverse:!0,labels:{fontSize:10,boxWidth:15}},title:{display:!0,text:"Actual 1st lap Outcomes"}}})}}function CapitalizeFirstLetters(e,r){var t=e.charAt(0).toUpperCase()+e.slice(1),a=t.indexOf("_");return a>0&&(t=t.slice(0,a)+" "+CapitalizeFirstLetters(t.slice(a+1),r)),r&&(i2=t.indexOf("("),i2>0&&(t=t.slice(0,i2-1))),t.slice(0)}function GetChartTitle(e,r,t){return e+" "+r+" "+t}function UpdateCharts(){HideCharts||(FindMinMax(),window.expected.options.scales.yAxes[0].ticks.min=MinY,window.expected.options.scales.yAxes[0].ticks.max=MaxY,window.expected.options.scales.yAxes[0].ticks.stepSize=_StepSize,window.expected.options.title.text=3==CurrentLayout?GetChartTitle(CapitalizeFirstLetters(CurrentDriver2,!0)+"'s","Actual",ShowPercentage?"Percentages":"Counts"):GetChartTitle(CapitalizeFirstLetters(CurrentDriver,!0)+"'s","Expected",ShowPercentage?"Percentages":"Counts"),window.expected.options.scales.yAxes[0].scaleLabel.labelString=ChartTypes[CurrentChartType].yaxisLabel,window.expected.update(),window.actual.options.scales.yAxes[0].ticks.min=MinY,window.actual.options.scales.yAxes[0].ticks.max=MaxY,window.actual.options.scales.yAxes[0].ticks.stepSize=_StepSize,window.actual.options.title.text=GetChartTitle(CapitalizeFirstLetters(CurrentDriver,!0)+"'s","Actual",ShowPercentage?"Percentages":"Counts"),window.actual.options.scales.yAxes[0].scaleLabel.labelString=ChartTypes[CurrentChartType].yaxisLabel,window.actual.update())}function swap(e,r,t){var a=e[r];e[r]=e[t],e[t]=a}function GenerateComparisonTable(e,r){d3.tsv(DefaultResultsFile,function(t,a){var i=[];if(a.forEach(function(t){if((t.name==e||t.name==r)&&(t.displayname=GenerateDisplayName(t.name,!0),i.push(t),e==r)){var a=jQuery.extend(!0,{},t);i.push(a)}}),2==i.length){i[0].name!=e&&swap(i,0,1);for(var n;n<i.length;++n)0==i[n].blended&&(i[n].graap_b=i[n].graap,i[n].kraap_b=i[n].kraap,i[n].lraap_b=i[n].lraap);var o=jQuery.extend(!0,{},i[0]);for(var l in i[0])i.length>1&&(o[l]=i[1][l]-i[0][l]);if(o.blended=0,o.name=o.displayname="Difference",i.push(o),t)throw t}else i=[{displayname:"not available"}];CreateFullTable(i),ShowLoader(!1)})}function GenerateDisplayName(e,r){return r?"<a href='"+GetURL(0,encodeURI(e),0)+"'>"+CapitalizeFirstLetters(e)+"</a>":"<a href='#'>"+CapitalizeFirstLetters(e)+"</a>"}function GenerateFullTable(e,r){if(ShowLoader(!0),void 0==r)var r=DefaultResultsFile;d3.tsv(r,function(r,t){if(r)throw r;var a=[];if(t.forEach(function(r){r.total>=MinStartsForTable&&e.indexOf(r.name)>=0&&(r.displayname=GenerateDisplayName(r.name,2==CurrentLayout),a.push(r))}),r)return console.log("unable to parse full results"),void ShowLoader(!1);CreateFullTable(a=a.sort(function(e,r){return e.name.localeCompare(r.name)})),ShowLoader(!1)})}function GenerateData(e){ShowLoader(!0),DataReady=!1,ResetDriverTotals(),d3.tsv(DataFolder+e,function(r,t){if(r)return alert("Unable to load or parse file."),void LoadDriver("Alonso");GenerateDriverData(t),expectedChartData=GenerateBaseline(t,10),3==CurrentLayout?(e=DataFolder+CurrentDriver2+".txt",d3.tsv(e,function(e,r){if(e)throw e;UpdateChart1ForDriver(r),DataReady=!0}),DataReady=!0):DataReady=!0})}function GenerateDriverData(e){DriverData=Array.matrix(25,6,0);for(r=0;r<MaxDriverGrid;++r)DriverTotals[1][2]+=Number(actualChartData.datasets[2].data[r]=e[r].gained),DriverTotals[1][3]+=Number(actualChartData.datasets[1].data[r]=e[r].kept),DriverTotals[1][4]+=Number(actualChartData.datasets[0].data[r]=-e[r].lost),DriverTotals[1][5]-=Number(e[r].DNF),DriverTotals[1][1]+=Number(DriverData[r+1][1]=e[r].total-e[r].DNF);SavedDriverData=Array.matrix(MaxDriverGrid+1,1,0);for(var r=0;r<MaxDriverGrid;++r){SavedDriverData[r].grid=e[r].grid,SavedDriverData[r].races=e[r].total,SavedDriverData[r].gained=e[r].gained,SavedDriverData[r].kept=e[r].kept,SavedDriverData[r].lost=e[r].lost,SavedDriverData[r].DNF=e[r].DNF,SavedDriverData[r].eDNFFL=e[r].eDNFFL,r<10?(SavedDriverData[r].eg=e[r].eg,SavedDriverData[r].ek=e[r].ek,SavedDriverData[r].el=e[r].el):(SavedDriverData[r].eg=e[r].egr,SavedDriverData[r].ek=e[r].ekr,SavedDriverData[r].el=e[r].elr);for(var t in SavedDriverData[r])void 0==SavedDriverData[MaxDriverGrid][t]?SavedDriverData[MaxDriverGrid][t]=Number(SavedDriverData[r][t]):SavedDriverData[MaxDriverGrid][t]+=Number(SavedDriverData[r][t])}SavedDriverData[MaxDriverGrid].grid="total"}function UpdateChart1ForDriver(e){Driver2Data=Array.matrix(25,6,0);for(var r=0;r<MaxDriverGrid;++r)e[r].total-e[r].DNF>0?(DriverTotals[0][2]+=Number(expectedChartData.datasets[2].data[r]=Number(e[r].gained)),DriverTotals[0][3]+=Number(expectedChartData.datasets[1].data[r]=Number(e[r].kept)),DriverTotals[0][4]+=Number(expectedChartData.datasets[0].data[r]=-Number(e[r].lost)),DriverTotals[0][5]-=Number(e[r].DNF),DriverTotals[0][1]+=Number(DriverData[r+1][1]=e[r].total-e[r].DNF)):(expectedChartData.datasets[2].data[r]=0,expectedChartData.datasets[1].data[r]=0,expectedChartData.datasets[0].data[r]=0,DriverTotals[0]=[0,0,0,0,0,0]),DriverTotals[0][0]=CapitalizeFirstLetters(CurrentDriver2),DriverTotals[1][0]=CapitalizeFirstLetters(CurrentDriver);return expectedChartData}function GenerateBaseline(e,r){for(var t=0,a=0;a<24;++a)a<r?(DriverTotals[0][2]+=Number(expectedChartData.datasets[2].data[a]=e[a].eg),DriverTotals[0][3]+=Number(expectedChartData.datasets[1].data[a]=e[a].ek),DriverTotals[0][4]+=Number(expectedChartData.datasets[0].data[a]=-e[a].el),DriverTotals[0][1]+=Number(DriverData[a+1][1]),DriverTotals[0][5]-=Number(e[a].eDNFFL),t+=Number(e[a].total)):(DriverTotals[0][2]+=Number(expectedChartData.datasets[2].data[a]=e[a].egr),DriverTotals[0][3]+=Number(expectedChartData.datasets[1].data[a]=e[a].ekr),DriverTotals[0][4]+=Number(expectedChartData.datasets[0].data[a]=-e[a].elr),DriverTotals[0][1]+=Number(DriverData[a+1][1]),DriverTotals[0][5]-=Number(e[a].eDNFFL),t+=Number(e[a].total));return(t+=DriverTotals[0][5])&&(DriverTotals[0][5]=DriverTotals[0][5]*DriverTotals[1][1]/t),expectedChartData}function LoadDriver(e){var r=(CurrentDriver=e)+".txt";console.log(r),GenerateData(r,!0),QueueForUpdate(),UpdateTableViewDropdown(CurrentDriver),$("#DriverDropdown")[0].value=CurrentDriver,UpdateURL()}function SetLayout(e){var r=document.getElementById("charts"),t=document.getElementById("chart1"),a=document.getElementById("chart2"),i=document.getElementById("tableContainerId"),n=document.getElementById("driverTableId"),o=document.getElementById("controlBarId"),l=document.getElementById("controlContainerId");document.getElementById("nextDriverButtonId");switch(Number(e)){case 0:$("#Driver2Dropdown").hide(),$("#nextDriverButtonId").show(),i.parentNode.insertBefore(r,i),r.className="chartcontainersidebyside",t.className="sidebyside1",a.className="sidebyside2",i.className="tableContainerBottom",o.className="controlBarLeft",l.className="controlcontainersidebyside";break;case 1:$("#Driver2Dropdown").hide(),$("#nextDriverButtonId").show(),i.parentNode.insertBefore(r,i),r.className="chartcontainervertical",t.className="vertical1",a.className="vertical2",i.className="tableContainerBottom",o.className="controlBarLeft",l.className="controlcontainervertical";break;case 2:i.parentNode.insertBefore(r,i);for(s=0;s<TableViewTypes.length;s++)TableViewTypes[s][1]==CurrentTableView&&-1==TableViewTypes[s][2].indexOf(Number(e))&&(CurrentTableView=2);HideCharts=!0,r.parentNode.removeChild(r),i.className="tableContainerBottom tableContainerNoMax",n.className="driverTableLarge",o.className="hiddenClass",o.style.height="0px",l.className="controlcontainersidebyside";for(var d=o.children,s=0;s<d.length;++s)d[s].hidden=!0;break;case 3:$("#DriverDropdown").show(),$("#Driver2Dropdown").show(),$("#nextDriverButtonId").show(),i.parentNode.insertBefore(r,i),r.className="chartcontainersidebyside",a.className="sidebyside1",t.className="sidebyside2",a.parentNode.insertBefore(a,t),i.className="tableContainerBottom",o.className="controlBarLeft",$("#Driver2Dropdown").show(),$("#TableViewDropdown").hide(),l.className="controlcontainersidebyside",BaselineFile=CurrentDriver2+".txt"}}function GetTableDriverView(e){for(var r=0;r<TableViewDriverTypes.length;r++)if(TableViewDriverTypes[r][1]==e)return TableViewDriverTypes[r];return null}function GetTableView(e){for(var r=0;r<TableViewTypes.length;r++)if(TableViewTypes[r][1]==e)return TableViewTypes[r];return null}function ChangeFromTableViewDropdown(){CurrentTableView=Number($("#TableViewDropdown")[0].value),CreateTable(!0),UpdateURL(),tableView=GetTableView(CurrentTableView),tableView&&tableView[4]?$("#TableViewDriverDropdown").show():$("#TableViewDriverDropdown").hide()}function ChangeFromTableViewDriverDropdown(){CurrentTableDriverView=Number($("#TableViewDriverDropdown")[0].value),CreateTable(!0),UpdateURL()}function ChangeFromChartTypeDropdown(){SetChartType(CurrentChartType=Number($("#ChartTypeDropdown")[0].value)),UpdateURL()}function SetChartType(e,r){document.getElementById("ChartTypeDropdown");ShowPercentage=1==e,r||HideCharts||LoadDriver(CurrentDriver)}function NextLayout(){CurrentLayout+=1,CurrentLayout%=4,UpdateURL(),history.pushState({},document.title,window.location.href),window.location.reload(!0)}function GetURL(e,r,t,a,i){var n=window.location.href.split("?")[0];return n+="?layout="+e,n+="&driver="+r,n+="&chartType="+CurrentChartType,n+="&tableView="+t,n+="&tableDriverView="+i,n+="&tableSortCol="+TableSortCol,n+="&tableSortDesc="+TableSortDesc,n+=void 0!=a&&a?"&driver2="+a:"&driver2="+CurrentDriver2}function UpdateURL(){var e=GetURL(CurrentLayout,$("#DriverDropdown")[0].value,CurrentTableView,$("#Driver2Dropdown")[0].value,CurrentTableDriverView);return history.replaceState({},document.title,e),e}function SaveDimensions(){LastWidth=window.innerWidth,LastHeight=window.innerHeight}function ChangeFromLayoutDropdown(){CurrentLayout=$("#LayoutDropdown")[0].value,UpdateURL(),history.pushState({},document.title,window.location.href),window.location.reload(!0)}function ChangeFromDriverDropdown(){if(0!=DataReady){screen.height,screen.width;CurrentDriver!=$("#DriverDropdown")[0].value&&(LoadDriver($("#DriverDropdown")[0].value),window.innerWidth=LastWidth,window.innerHeight=LastHeight)}else $("#DriverDropdown")[0].value=CurrentDriver}function ChangeFromDriver2Dropdown(){if(0!=DataReady){screen.height,screen.width;CurrentDriver2!=$("#Driver2Dropdown")[0].value&&(CurrentDriver2=$("#Driver2Dropdown")[0].value,BaselineFile=CurrentDriver2+".txt",LoadDriver(CurrentDriver),window.innerWidth=LastWidth,window.innerHeight=LastHeight)}else $("#Driver2Dropdown")[0].value=CurrentDriver2}function SelectNextDriver(){var e=GetFullDriverList(!1,!1),r=e.indexOf(CurrentDriver);if(r>=0)r=++r%e.length;else{r=0;for(var t=0;t<e.length;++t)if(e[t]>CurrentDriver){r=t;break}}LoadDriver(e[r])}function UpdateCopyright(){var e=(new Date).getFullYear(),r=2017+(e>2017?"-"+e:"");$("#copyrightId")[0].childNodes[0].data=$("#copyrightId")[0].childNodes[0].data.replace("{YEARS}",r)}function toggleAdditionalDrivers(){}function toggleSlices(){}function SetTableSort(e,r){TableSortCol=e||-1}var LastWidth=0,LastHeight=0,HideCharts=!1,CurrentTableView=0,CurrentTableDriverView=0,CurrentChartType=0,DefaultTableView=0,ShowPercentage=!1,DriverTable,DriverTableLegend,DataReady=!1,CurrentLayout=0,DriverListDNFFL=["ericsson_(minus_Lucky_oDNFFLs)","jolyon_palmer_(minus_Lucky_oDNFFLs)","ocon_(minus_Lucky_DNFFLs)","wehrlein_(minus_Lucky_DNFFLs)"],DriverListExperienced=["alonso","button","glock","hamilton","kobayashi","kovalainen","maldonado","rosberg","massa","michael_schumacher_(2004_to_2012)","raikkonen","sutil","vettel","webber"],DriverListOthers=["bruno_senna","gutierrez","heidfeld","kubica","petrov","speed","vergne"],DriverListSlices=["alonso_(2004)","alonso_(2004_to_2006)","alonso_(2004_to_2009)","alonso_(2006)","alonso_(2010_to_2014)","alonso_(2015_to_2017)","bottas_(skip_Rookie_year)","hamilton_(2007_to_2010)","hamilton_(2011_to_2013)","hamilton_(2015_to_2017)","hamilton_(2015_Spa_to_2016)","hulkenberg_(skip_Rookie_year)","massa_(2004_to_2009)","massa_(2010_to_2017)","max_v_(only_Rookie_year)","max_v_(skip_Rookie_year)","max_v_(skip_Rookie_and_Spain_2017)","michael_schumacher_(2004_to_2006)","michael_schumacher_(2010_to_2012)","perez_(skip_Rookie_year)","raikkonen_(2004_to_2006)","raikkonen_(2004_to_2016)","raikkonen_(2017)","ricciardo_(2011_to_2014)","ricciardo_(2015_to_2017)","trulli_(2004_Renault)","trulli_(2005_to_2012)","vettel_(2007_to_2009)"],DriverListCurrent=["alonso","bottas","button","ericsson","grosjean","hamilton","hulkenberg","jolyon_palmer","kevin_magnussen","kvyat","max_verstappen","ocon","perez","resta","ricciardo","sainz","wehrlein","massa","raikkonen","vettel"],DriverListMax=["max_verstappen","max_v_(only_Rookie_year)","max_v_(skip_Rookie_year)","max_v_(skip_Rookie_and_Spain_2017)"],DriverListAlonso=["alonso","alonso_(2004)","alonso_(2004_to_2006)","alonso_(2004_to_2009)","alonso_(2006)","alonso_(2010_to_2014)","alonso_(2015_to_2017)"],DriverList=GetFullDriverList(!0,!0),DataFolder="data/",BaselineFile="",CurrentDriver="alonso",CurrentDriver2="alonso",DriverData=[],DriverTotals=[],SavedDriverData=[],MinStartsForTable=0,MaxDriverGrid=24,DefaultResultsFile="data/fullresults.txt",TableIncludeAllDrivers=!1,TableIncludeSlices=!1,TableSortCol=-1,TableSortDesc=!0,LayoutTypes=[["View Expected vs Actual Results - Horizontal Charts",0],["View Expected vs Actual Results - Vertical Charts",1],["View Full Tables",2],["View Head-to-Head Comparison",3]],TableViewTypes=[["Show {CurrentDriver}'s Details Only",0,[0,1],"ShowDetailsBrief",!1],["Show {CurrentDriver}'s Grid Results",4,[0,1],"ShowBlendedOnly",!1],["Show Driver Summaries",1,[0,1,2],"ShowDetailsFull",!0],["Show Opponent DNFFL Calculations",6,[2],"ShowBDNFFLFull",!0],["Show RAA Components",7,[2],"ShowSummary",!0],["Comparison between drivers",-1,[3],"ShowComparison",!1]],TableViewDriverTypes=[["Experienced and Non-Active Drivers",0,DriverListExperienced],["Current Drivers Only",1,DriverListCurrent],["All Drivers",2,GetFullDriverList(!1,!1)],["All Drivers (plus notable slices)",3,GetFullDriverList(!0,!1)],["Max Only (Slices)",4,DriverListMax.sort()],["Alonso Only (Slices)",5,DriverListAlonso.sort()],["Slices Only",6,DriverListSlices.sort()]],ChartTypes=[{id:0,name:"Show Counts in Charts",yaxisLabel:"# of times"},{id:1,name:"Show Percentages in Charts",yaxisLabel:"Likelihood"}];Array.matrix=function(e,r,t){for(var a=[],i=0;i<e;++i){for(var n=[],o=0;o<r;++o)n[o]=t;a[i]=n}return a};var color=Chart.helpers.color,colorLost="#FF2222";colorKept="rgb(201, 203, 207)",colorGained="#19A51B";for(var expectedChartData={labels:labelsList,datasets:[{label:"Lost",backgroundColor:color(colorLost).alpha(.7).rgbString(),borderColor:colorLost,borderWidth:1,data:[]},{label:"Kept",backgroundColor:color(colorKept).alpha(.7).rgbString(),borderColor:colorKept,borderWidth:1,data:[]},{label:"Gained",backgroundColor:color(colorGained).alpha(.7).rgbString(),borderColor:colorGained,borderWidth:1,data:[]}]},labelsList=new Array(24),i=0;i<24;++i)labelsList[i]=String(i+1);expectedChartData.labels=labelsList,expectedChartData.datasets.forEach(function(e){e.data=new Array(24)});var actualChartData=jQuery.extend(!0,{},expectedChartData);window.onload=function(){var e=Number(GetURLParameter("tableView"));TableViewTypes.forEach(function(r){r[1]==e&&(CurrentTableView=2==CurrentLayout&&0==CurrentTableView?1:e)}),e=Number(GetURLParameter("tableDriverView")),TableViewDriverTypes.forEach(function(r){r[1]==e&&(CurrentTableDriverView=e)}),e=GetURLParameter("layout");var r=Number(e);SetLayout(CurrentLayout=r>=0&&r<=3?r:0);var t=GetURLParameter("driver");if(t){t=decodeURI(t);for(driver in DriverList)if(DriverList[driver]==t){CurrentDriver=DriverList[driver];break}}if(SetTableSort(GetURLParameter("tableSortCol"),GetURLParameter("tableSortDesc")),t=GetURLParameter("driver2")){t=decodeURI(t);for(driver in DriverList)if(DriverList[driver]==t){CurrentDriver2=DriverList[driver];break}}e=Number(GetURLParameter("chartType"));for(chart in ChartTypes)if(e==chart.id){CurrentChartType=e,SetChartType(e,!0);break}InitDriverDropdown(),InitLayoutDropdown(),InitTableViewDropdown(),InitTableViewDriverDropdown(),InitChartTypeDropdown(),CreateCharts(),CreateTable(),HideCharts||LoadDriver(CurrentDriver)};var UpdateInterval,MaxY,MinY,_StepSize,LastTableHeader,TableSortColumn=void 0,TableSortOrder=void 0;window.addEventListener("resize",FixTableResize);var RefreshTable;ShowLoader(!1),UpdateCopyright(),function(e,r,t,a,i,n,o){e.GoogleAnalyticsObject=i,e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},e[i].l=1*new Date,n=r.createElement(t),o=r.getElementsByTagName(t)[0],n.async=1,n.src="https://www.google-analytics.com/analytics.js",o.parentNode.insertBefore(n,o)}(window,document,"script",0,"ga"),ga("create","UA-105235609-1","auto"),ga("send","pageview");
