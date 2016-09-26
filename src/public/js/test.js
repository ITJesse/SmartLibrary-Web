var sessionId = '';
var studentId = '';
var api = '';

$("select").on("change", function() {
    api = $(this).val();
    var request = {};
    var timestamp = Date.parse(new Date()) / 1000;
    request.timestamp = timestamp;
    request.sign = md5("withelper_itjesse" + timestamp).toUpperCase();
    $('select').val('');
    $(this).val(api);
    var str = '';

    switch(api){
        case 'Login':
            request.userID = '1203020301';
            request.password = '1203020301';
            break;
        case 'checkSessionId':
            if(sessionId){
                request.sessionid = sessionId;
            }else{
                request.sessionid = 'insert your sessionid';
            }
            break;
        case 'ForgetPass':
            request.userID = '1203020333';
            request.name = '朱艺博';
            request.idcard = '420106199407088415';
            break;
        case 'LibraryHot':
            request.classNum = 'B';
            break;
        case 'LibraryHotWords':
            break;
        case 'LibraryBorrow':
            if(sessionId){
                request.sessionid = sessionId;
            }else{
                request.sessionid = 'insert your sessionid';
            }
            break;
        case 'LibraryBookList':
            request.str = 'java';
            request.strSearchType = 'title';
            request.match_flag = 'any';
            request.doctype = 'ALL';
            break;
        case 'LibraryBookInfo':
            request.isbn = '9787111407010';
            break;
        case 'GetStudentInfo':
            request.studentId = '1203020301';
            break;
        case 'GetCardInfo':
            request.uid = 'abcde';
            break;
        case 'CheckCardId':
            request.uid = 'abcde';
            break;
        case 'BindCard':
            request.studentId = '1203020301';
            request.uid = 'abcde';
            break;
        case 'UnBindCard':
            request.uid = 'abcde';
            break;
        case 'InsertBook':
            request.isbn = '9787560926681';
            request.title = '工程测试技术基础';
            request.tagId = '123456';
            request.publisher = '出版社';
            request.summary = '《工程测试技术基础》是“21世纪高等学校机械设计制造及其自动化专业系列教材”之一，是一部具有较大改革力度的教材。全书共九章。前六章主要论述工程测试领域中从事测试工作所必须的基础知识，主要内容有：信号分析基础，测试装置的静，动态响应特性，工程中常用传感器的转换原理及应用，智能化传感器简介（包括智能传感器和模糊传感器），信号调理方法，记录及存储仪器等。第七章 介绍了信号分析仪及微机测试系统。\n第八章 介绍了虚拟仪器及工程应用。\n第九章 介绍了常见的非电量参量的测量方法（包括振动测量及位移、速度、噪声、温度、压力等参量的测量）等。\n书中基础理论部分沿测试流程主线论述，条理清晰，分析透彻；应用部分列举了大量实例，这些实例来自于科研及生产实践。尤其更具特色的是，书中较多和较好地吸取了当代新理论和新技术研究成果。因此，《工程测试技术基础》既能方便于教学和自学，也能供科研、设计和其他科技人员借鉴。\n本教材可作为机械设计制造及其自动化专业和其他机械类、非机械类专业的教材，也可作为高职工科类教材，并可作为高等学校相关教师和从事测试、机械自动化工作的工程技术人员的参考书。';
            request.author = '作者';
            request.image = 'http://img3.douban.com/lpic/s6869434.jpg';
            break;
        case 'CheckTagId':
            request.tagId = '123456';
            break;
        case 'GetBookList':
            break;
        case 'GetTagInfo':
            request.tagId = '123456';
            break;
        case 'LendBook':
            request.tagList = '123456';
            request.type = 'uid';
            request.uid = 'abcde';
            break;
        case 'ReturnBook':
            request.tagList = '123456';
            request.type = 'uid';
            request.uid = 'abcde';
            break;
        case 'Lookup':
            request.type = 'uid';
            request.uid = 'abcde';
            break;
        case 'GetChartVal':
            request.id = '1';
            request.startTime = 24 * 60 * 60;
            break;
        case 'GetLastVal':
            request.id = '1';
            break;
        case 'StudyRoomSeat':
            if(sessionId){
                request.sessionid = sessionId;
            }else{
                request.sessionid = 'insert your sessionid';
            }
            break;
        case 'GetStudyRoomUsed':
            break;
        default:
    }
    str = JSON.stringify(request, null, '\t');
    $('#input').val(str);
});

$('#submit').on('click', function() {
    if(api){
        var request = JSON.parse($('#input').val());
        var url = '';
        var method = '';

        switch(api){
            case 'Login':
                method = 'POST';
                url = '/API/Android/Login';
                break;
            case 'checkSessionId':
                method = 'POST';
                url = '/API/Android/CheckSessionId';
                break;
            case 'ForgetPass':
                method = 'POST';
                url = '/API/Android/ForgetPass';
                break;
            case 'LibraryHot':
                method = 'POST';
                url = '/API/Android/LibraryHot';
                break;
            case 'LibraryHotWords':
                method = 'POST';
                url = '/API/Android/LibraryHotWords';
                break;
            case 'LibraryBorrow':
                method = 'POST';
                url = '/API/Android/LibraryBorrow';
                break;
            case 'LibraryBookList':
                method = 'POST';
                url = '/API/Android/LibraryBookList';
                break;
            case 'LibraryBookInfo':
                method = 'POST';
                url = '/API/Android/LibraryBookInfo';
                break;
            case 'StudyRoomSeat':
                method = 'POST';
                url = '/API/Android/StudyRoomSeat';
                break;
            case 'GetStudentInfo':
                method = 'GET';
                url = '/API/Client/GetStudentInfo';
                break;
            case 'GetCardInfo':
                method = 'GET';
                url = '/API/Client/GetCardInfo';
                break;
            case 'CheckCardId':
                method = 'GET';
                url = '/API/Client/CheckCardId';
                break;
            case 'BindCard':
                method = 'GET';
                url = '/API/Client/BindCard';
                break;
            case 'UnBindCard':
                method = 'GET';
                url = '/API/Client/UnBindCard';
                break;
            case 'InsertBook':
                method = 'POST';
                url = '/API/Client/InsertBook';
                break;
            case 'CheckTagId':
                method = 'GET';
                url = '/API/Client/CheckTagId';
                break;
            case 'GetBookList':
                method = 'GET';
                url = '/API/Client/GetBookList';
                break;
            case 'GetTagInfo':
                method = 'GET';
                url = '/API/Client/GetTagInfo';
                break;
            case 'LendBook':
                method = 'POST';
                url = '/API/Client/LendBook';
                break;
            case 'ReturnBook':
                method = 'POST';
                url = '/API/Client/ReturnBook';
                break;
            case 'Lookup':
                method = 'GET';
                url = '/API/Client/Lookup';
                break;
            case 'GetChartVal':
                method = 'GET';
                url = '/API/Web/GetChartVal';
                break;
            case 'GetLastVal':
                method = 'GET';
                url = '/API/Web/GetLastVal';
                break;
            case 'GetStudyRoomUsed':
                method = 'GET';
                url = '/API/Web/GetStudyRoomUsed';
                break;
        }

        $.ajax({
            url: url,
            method: method,
            data: request,
            dataType: 'json',
            success: function(returnJson){
                $('#return').text(JSON.stringify(returnJson, null, '\t'));
                if(returnJson.sessionid) sessionId = returnJson.sessionid;
                if(request.userID) studentId = request.userID;
            },
            error: function(returnString){
                $('#return').text(returnString.responseText);
            }
        });
    }
})
