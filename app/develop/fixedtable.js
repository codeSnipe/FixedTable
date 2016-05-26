(function($){
    var $this,$table;
    var opts,filterCache;
    var ft={};
    ft.sortDic = {
        UP:"1",
        DOWN:"0"
    };
    ft.createTable = function(){
        var table = $("<div class='table_fixed'></div>");
        var leftTable = $("<div class='leftFixedCon'></div>");
        var leftTop = $("<div class='leftFixed'><table cellpadding='0' cellspacing='0' border='0' class='left_top_table t_number marginBottom0 borderNone'></table></div>");
        var leftBottom = $("<div class='leftFixed' id='fx_leftFixed'><table cellpadding='0' cellspacing='0' border='0' class='left_bottom_table t_number marginBottom0 borderNone'></table></div>");

        var rightTable = $("<div class='rightFixedCon'></div>");
        var rightTop = $("<div class='rightFixed' id='fx_rightFixed'><div class='rightTableTop'><table cellpadding='0' cellspacing='0' border='0' class='right_top_table marginBottom0 borderTop0' style='border: none;'></div></div>");
        var rightBottom = $('<div class="rightTable" id="fx_rightTable"><table cellpadding="0" cellspacing="0" border="0" class="right_bottom_table table borderTop0 marginBottom0 borderNone"></table></div>');
        rightBottom.scroll(function() {
            ft.fixed();
        });
        if(opts.lockLine <= 0){
            if(opts.lockRow <= 0){
                //列与行都不锁定
                rightTable.append(rightBottom);
                table.append(rightTable);
                table.find(".rightTable").css({"display":"block","overflow-x":"scroll","border-left": "1px solid rgb(220,220,220)"});
                table.css({"border":"none"});
                rightBottom.css({"border-top":"1px solid #dcdcdc"});
                ft.createWithNolock(table);
            }else{
                //锁行不锁列
                rightTable.append(rightTop,rightBottom);
                table.append(rightTable);
                table.find(".rightTable").css({"display":"block"});
                ft.createWithLockRow(table);
            }
        }else{
            if(opts.lockRow <= 0){
                //锁列与不锁行
                leftTable.append(leftBottom);
                rightTable.append(rightBottom);
                table.append(leftTable,rightTable);
                ft.createWithLockLine(table);
            }else{
                //锁列并且锁行
                leftTable.append(leftTop,leftBottom);
                rightTable.append(rightTop,rightBottom);
                table.append(leftTable,rightTable);
                ft.createWithLockAll(table);
            }
        }
        $table = table;
        return table;
    };
    ft.createWithNolock = function(tb){
        //列与行都不锁定
        var tbody = $("<tbody></tbody>");
        var headTr = $("<tr class='fixedHeadColor'>");
        tbody.append(headTr);
        //创建表头
        for(var headIndex = 0; headIndex<opts.head.length; headIndex++){
            var headItem = opts.head[headIndex];
            headTr.append(ft.createTD({msg:headItem.headTitle,field:headItem,head:true}));
        }
        //创建表体
        for(var dataIndex = 0;dataIndex<opts.data.length;dataIndex++){
            var dataItem = opts.data[dataIndex];
            var dataTr = $("<tr></tr>");
            for(var i=0;i<opts.head.length;i++){
                var h = opts.head[i];
                dataTr.append(ft.createTD({msg:dataItem[h.dataField],field:h}));
            }
            tbody.append(dataTr);
        }
        tb.find(".right_bottom_table").append(tbody);
    };
    ft.createWithLockLine = function(tb){
        //锁列与不锁行
        var leftTable = tb.find(".left_bottom_table");
        var rightTable = tb.find(".right_bottom_table");
        var leftTbody = $("<tbody></tbody>");
        var rightTbody = $("<tbody></tbody>");
        leftTable.append(leftTbody);
        rightTable.append(rightTbody);
        //创建头
        var headLeftTr = $("<tr></tr>");
        var rightRightTr = $("<tr class='fixedHeadColor'></tr>");
        for(var headIndex = 0;headIndex<opts.head.length;headIndex++){
            var headItem = opts.head[headIndex];
            if(headIndex<opts.lockLine){
                headLeftTr.append(ft.createTD({msg:headItem.headTitle,field:headItem,head:true}));
            }else{
                rightRightTr.append(ft.createTD({msg:headItem.headTitle,field:headItem,head:true}));
            }
        }
        leftTable.append(headLeftTr);
        rightTbody.append(rightRightTr);
        //创建列表体
        for(var bodyIndex = 0;bodyIndex<opts.data.length;bodyIndex++){
            var dataItem = opts.data[bodyIndex];
            var dataLeftTr = $("<tr></tr>");
            var dataRightTr = $("<tr></tr>");
            for(var i=0;i<opts.head.length;i++){
                var dH = opts.head[i];
                if(i<opts.lockLine){
                    dataLeftTr.append(ft.createTD({msg:dataItem[dH.dataField],field:dH}));
                }else{
                    dataRightTr.append(ft.createTD({msg:dataItem[dH.dataField],field:dH}));
                }
            }
            leftTable.append(dataLeftTr);
            rightTbody.append(dataRightTr);
        }
    };
    ft.createWithLockRow = function(tb){
        //锁行不锁列(由于只有锁行才会创建，则head一定会锁定)
        var topTable = tb.find(".right_top_table");
        var bottomTable = tb.find(".right_bottom_table");
        var topTbody = $("<tbody></tbody>");
        var bottomTbody = $("<tbody></tbody>");
        topTable.append(topTbody);
        bottomTable.append(bottomTbody);
        var headTr = $("<tr></tr>");
        for(var h = 0;h<opts.head.length;h++){
            var headItem = opts.head[h];
            headTr.append(ft.createTD({msg:headItem.headTitle,field:headItem,head:true}));
        }
        topTbody.append(headTr);
        for(var dataIndex = 0;dataIndex<opts.data.length;dataIndex++){
            var dataItem = opts.data[dataIndex];
            var topTr = $("<tr></tr>");
            var bottomTr = $("<tr></tr>");
            for(var i=0;i<opts.head.length;i++){
                var dH = opts.head[i];
                if(dataIndex<opts.lockRow-1){
                    topTr.append(ft.createTD({msg:dataItem[dH.dataField],field:dH}));
                }else{
                    bottomTr.append(ft.createTD({msg:dataItem[dH.dataField],field:dH}));
                }
            }
            topTbody.append(topTr);
            bottomTbody.append(bottomTr);
        }

    };
    ft.createWithLockAll = function(tb){
        //锁列并且锁行
        var leftTopTable = tb.find(".left_top_table");
        var leftBottomTable = tb.find(".left_bottom_table");
        var rightTopTable = tb.find(".right_top_table");
        var rightBottomTable = tb.find(".right_bottom_table");
        var leftTopTbody = $("<tbody></tbody>");
        var leftBottomTbody = $("<tbody></tbody>");
        var rightTopTbody = $("<tbody></tbody>");
        var rightBottomTbody = $("<tbody></tbody>");
        leftTopTable.append(leftTopTbody);
        leftBottomTable.append(leftBottomTbody);
        rightTopTable.append(rightTopTbody);
        rightBottomTable.append(rightBottomTbody);
        //创建表头
        var headLeftTr = $("<tr></tr>");
        var headRightTr = $("<tr></tr>");
        for(var headIndex = 0;headIndex<opts.head.length;headIndex++){
            if(headIndex<opts.lockLine){
                headLeftTr.append(ft.createTD({msg:opts.head[headIndex].headTitle,field:opts.head[headIndex],head:true}));
            }else{
                headRightTr.append(ft.createTD({msg:opts.head[headIndex].headTitle,field:opts.head[headIndex],head:true}));
            }
        }
        leftTopTbody.append(headLeftTr);
        rightTopTbody.append(headRightTr);
        //创建表体
        for(var dataIndex = 0;dataIndex<opts.data.length;dataIndex++){
            var dataItem = opts.data[dataIndex];
            if(dataIndex<opts.lockRow - 1){
                //data被锁行,信息放在上面2个table中
                var dataLeftTopTr = $("<tr></tr>");
                var dataRightTopTr = $("<tr></tr>");
                for(var h1 = 0;h1<opts.head.length;h1++){
                    var dH1 = opts.head[h1];
                    if(h1<opts.lockLine){
                        dataLeftTopTr.append(ft.createTD({msg:dataItem[dH1.dataField],field:dH1}));
                    }else{
                        dataRightTopTr.append(ft.createTD({msg:dataItem[dH1.dataField],field:dH1}));
                    }
                }
                leftTopTbody.append(dataLeftTopTr);
                rightTopTbody.append(dataRightTopTr);
            }else{
                //data不被锁行，放在下部2个table中
                var dataLeftBottomTr = $("<tr></tr>");
                var dataRightBottomTr = $("<tr></tr>");
                for(var h2 = 0;h2<opts.head.length;h2++){
                    var dH2 = opts.head[h2];
                    if(h2<opts.lockLine){
                        dataLeftBottomTr.append(ft.createTD({msg:dataItem[dH2.dataField],field:dH2}));
                    }else{
                        dataRightBottomTr.append(ft.createTD({msg:dataItem[dH2.dataField],field:dH2}));
                    }
                }
                leftBottomTbody.append(dataLeftBottomTr);
                rightBottomTbody.append(dataRightBottomTr);
            }
        }
    };
    ft.createTD = function(obj){
        var td;
        if(obj.msg === undefined){
            obj.msg = "--";
        }
        if(opts.sort && obj.head){
            td = $("<td class="+obj.field.dataField+"><div class='tbHead tbSortDisabled'><span>"+obj.msg+"</span></div></td>");
            if(filterCache){
                if(filterCache.sortField === obj.field.dataField){
                    td.find("div").removeClass("tbSortDisabled").addClass((filterCache.sortStatus == ft.sortDic.DOWN)?"tbSortDown":"tbSortUp");
                }
            }
            td.on("click",function(){
                var sortCon = $(this).find("div");
                //排序字典
                var sortObj = {};
                sortObj.sortField = obj.field.dataField;
                if(sortCon.hasClass("tbSortDisabled")){
                    $this.find("td>div").removeClass("tbSortDown").removeClass("tbSortUp").addClass("tbSortDisabled");
                    sortCon.removeClass("tbSortDisabled").addClass("tbSortDown");
                    sortObj.sortStatus = ft.sortDic.DOWN;
                }else{
                    if(sortCon.hasClass("tbSortDown")){
                        sortCon.removeClass("tbSortDown").addClass("tbSortUp");
                        sortObj.sortStatus = ft.sortDic.UP;
                    }else {
                        sortCon.removeClass("tbSortUp").addClass("tbSortDown");
                        sortObj.sortStatus = ft.sortDic.DOWN;
                    }
                }
                filterCache = sortObj;
                opts.sortFunction(sortObj);
            })
        }else{
            td = $("<td class="+obj.field.dataField+"><span>"+obj.msg+"</span></td>");
        }
        if(obj.field.width){
            td.css({"width":obj.field.width-17+"px","max-width":obj.field.width-17+"px"});
            td.find("div").css({"width":obj.field.width-17+"px","max-width":obj.field.width-17+"px"});
            td.find("span").css({"width":obj.field.width-17+"px","max-width":obj.field.width-17+"px"});
        }

        if(obj.field.tip && !obj.head){
            td.attr("title",obj.msg);
            try{
                $(td).poshytip();
            }catch(e){
                //忘记添加tip插件
            }
        }

        return td;
    };
    ft.fixed = function(){
        var a=$("#fx_rightTable").scrollTop();
        var b=$("#fx_rightTable").scrollLeft();
        $("#fx_leftFixed").scrollTop(a);
        $("#fx_rightFixed").scrollLeft(b);
    };
    ft.setSize = function (){
        $table.find(".rightFixedCon");
        var leftWidth= 0;
        for(var i = 0;i<opts.lockLine;i++){
            if(opts.hasFilterHead){
                if($this.find(".checkChoose li").eq(i).find("input").prop("checked")){
                    if(opts.head[i].width){
                        leftWidth = leftWidth + opts.head[i].width;
                    }else{
                        leftWidth = leftWidth + 67;
                    }
                }
            }else{
                if(opts.head[i].width){
                    leftWidth = leftWidth + opts.head[i].width;
                }else{
                    leftWidth = leftWidth + 67;
                }
            }
        }
        $this.css({"min-width":(leftWidth+167)+"px"});
        $table.find(".rightFixedCon").width($this.width()-leftWidth);
        $table.find("#fx_leftFixed").css({"max-height":opts.maxHeight+"px"});
        $table.find("#fx_rightTable").css({"max-height":opts.maxHeight+"px"});
        var noWidth = 0;
        var setWidthAll = 0;
        if(opts.lockRow>0){
            var tableRightWidth = 0;
            if(opts.hasFilterHead){
                var checkArr = $this.find(".checkChoose li");
                for(var checkIndex = opts.lockLine;checkIndex<checkArr.length;checkIndex++){
                    if($this.find(".checkChoose li").eq(checkIndex).find("input").prop("checked")){
                        var headTitle = $this.find(".checkChoose li").eq(checkIndex).find("input").attr("data-fliterflag");
                        for(var hh = 0; hh<opts.head.length;hh++){
                            if(headTitle == opts.head[hh].dataField){
                                if(opts.head[hh].width){
                                    tableRightWidth = tableRightWidth + opts.head[hh].width;
                                    setWidthAll = setWidthAll + opts.head[hh].width;
                                }else{
                                    tableRightWidth = tableRightWidth + 167;
                                    noWidth ++;
                                }
                                break;
                            }
                        }
                    }
                }
                $table.find("#fx_rightTable").width(tableRightWidth);
            }else{
                for(var i = opts.lockLine;i<opts.head.length;i++){
                    if(opts.head[i].width){
                        tableRightWidth = tableRightWidth + opts.head[i].width;
                    }else{
                        tableRightWidth = tableRightWidth + 167;
                    }
                }
                $table.find("#fx_rightTable").width(tableRightWidth);
            }
        }
        if($table.find(".rightFixedCon").width()>tableRightWidth){
            var w = 0;
            var rightWidth = $table.find(".rightFixedCon").width();
            var l = rightWidth - setWidthAll;
            var everyWidth = l/noWidth;
            var checkArr = $this.find(".checkChoose li");
            for(var checkIndex = opts.lockLine;checkIndex<checkArr.length;checkIndex++){
                if($this.find(".checkChoose li").eq(checkIndex).find("input").prop("checked")){
                    var headTitle = $this.find(".checkChoose li").eq(checkIndex).find("input").attr("data-fliterflag");
                    for(var hh = 0; hh<opts.head.length;hh++){
                        if(headTitle == opts.head[hh].dataField){
                            if(opts.head[hh].width){
                                w = w + opts.head[hh].width;
                            }else{
                                $("."+opts.head[hh].dataField).css({"width":everyWidth +"px"});
                                $("."+opts.head[hh].dataField).find("span").width(parseInt((everyWidth-167)+150));
                                w = w + everyWidth;
                            }
                            break;
                        }
                    }
                }
            }
            $table.find("#fx_rightTable").width(w);
        }
    };
    ft.createFilterHeader = function(){
        var filter = $("<div></div>");
        var filterBtn = $("<a class='filterBtn'>自定义表头</a>");
        var filterCon= $("<div class='checkCon'></div>");
        var allSelect = $('<div class="checkAll"><input type="checkbox" checked><span>全选</span></div>');
        var eachCheck = $("<ul class='checkChoose'></ul>");
        for(var i =0;i<opts.head.length;i++){
            var headItem = opts.head[i];
            var li = $('<li><input checked data-fliterFlag="'+headItem.dataField+'" type="checkbox"><span>'+headItem.headTitle+'</span></li>');
            eachCheck.append(li);
            (function(){
                var _li = li;
                _li.on("click",function(){
                    refreshTable();
                })
            })()
        }
        if(opts.showHideFilterBtn){
            filterBtn.css({"display":"inline-block"});
        }else{
            filterBtn.hide();
        }
        filterCon.append(allSelect,eachCheck);
        filter.append(filterBtn,filterCon);
        filterCon.hide();
        allSelect.find("input").on("change",function(){
            if($(this).prop("checked")){
                eachCheck.find("input").prop("checked",true);
            }else{
                eachCheck.find("input").prop("checked",false);
            }
            refreshTable();
        });
        filterBtn.on("click",function(){
            if(filterCon.is(":hidden")){
                filterCon.show();
            }else{
                filterCon.hide();
            }
        });
        function refreshTable(){
            var checkArr = eachCheck.find("input");
            var selectedNum = 0;
            for(var i = 0;i<checkArr.length;i++){
                var flag = eachCheck.find("input").eq(i).attr("data-fliterFlag");
                if(eachCheck.find("input").eq(i).prop("checked")){
                    $("."+flag).show();
                    selectedNum = selectedNum+1;
                }else{
                    $("."+flag).hide();
                }
            }
            if(selectedNum == checkArr.length){
                allSelect.find("input").prop("checked",true);
            }else{
                allSelect.find("input").prop("checked",false);
            }
            ft.setSize();
        }
        return filter;
    };
    $.fn.fixedTable = function(options){
        opts = $.extend({}, $.fn.fixedTable.defaults, options);
        $(this).empty();
        var filterHead = ft.createFilterHeader();
        var fixedtable = ft.createTable();
        if(opts.hasFilterHead){
            $(this).append(filterHead);
        }
        $(this).append(fixedtable);
        $this = $(this);
        ft.setSize();
        $(window).on("resize",function(){
            ft.setSize();
        });
    };
    $.fn.fixedTable.defaults={
        hasFilterHead : false, //是否包含列过滤功能
        showHideFilterBtn : true,//是否显示折叠显示过滤项的按钮
        sort:true,//是否支持列排序，默认支持
        sortFunction:function(){},//排序的回掉：0为升序，1为降序
        maxHeight : 400,//默认显示高度
        lockRow : 1, //设置锁定行数，默认锁定头
        lockLine:0, //设置锁定列，默认不锁定
        data:[], //table数据
        head:[] //table头数据
    }
})(jQuery);
