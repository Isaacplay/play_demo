/**
 * @Description:
 * @author licheng
 * @date 2019/11/8 1:56 PM
 */

const jbxq_code = '320112001000000';

/**
 * 缓存key
 */
const k_org_permission_info = 'k_org_permission_info';
const k_org_punishment_info = 'k_org_punishment_info';

/******************************************************************************************
 * ************************************** 航天接口 *****************************************
 ******************************************************************************************/
const api_host_ht = 'http://59.83.223.126:13003/api-res/resapi/';
const getIndividualBusinessInfoAction = 'TMXZyGOKqDdmtLuC'; //个人工商户信息
const getEnterpriseInfoAction = 'qJnnPVHFWFUrZjJI';  //企业信息
const getAdminPermissionInfoAction = 'GwSFiBGhkuWsgESQ'; //行政许可信息
const getAdminPunishmentInfoAction = 'pLNCjdCqtkmSasbw'; //行政处罚信息

function request_ht (obj) {
    request_ht_token(function(token){
        if (token) {
            var url = api_host_ht+obj.action+'?access_token='+token;
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                timeout: 20000, // 超时时间 10 秒
                headers : {
                    "Content-Type": 'application/json'
                },
                data: window.JSON.stringify(obj.data),

                success: function (object) {
                    obj.success(object);
                },
                error:function (object) {
                    obj.error(object);
                }
            });
        }else {
            obj.error({msg: 'token错误'})
        }
    })
}

function request_ht_token (callback) {
    $.ajax({
        type: "post",
        url: 'http://59.83.223.126:13002/api-uaa/oauth/client/token?client_id=7849692582&client_secret=3nPiXgdnwsuLiJggBk3mGtrR',
        dataType: "json",
        timeout: 20000, // 超时时间 10 秒
        data: {},
        success: function (res) {
            callback(res.access_token);
        },
        error: function (res) {
            callback();
        }
    })
}


/**************************************************************************************
 * ************************************** 吉奥接口 **************************************
 **************************************************************************************/
const api_host_ja = 'http://59.83.223.136:12560/RCComplat/';
//const api_host_ja = 'http://172.20.10.2:8081/RCComplat/';
const k_userLoginAction = 'rest/login/mob/verify';
const k_getCatalogAction = 'rest/mobile/Catalog/get'; //获取图层目录 id
const k_getCollectListAction = 'rest/mobile/collectList'; //已提交信息获取接口;
const k_getCollectDetailAction = 'rest/mobile/editdata/get'; //数据详情

//用户数据列表
//areacode 区划编号（6县 9乡镇  12社区   15网格）否
//mlp_jlbh 楼栋编号，如果输入值按楼栋返回人口列表 否
//hzzbh 住址编码（户号），如果输入值按户返回人口列表 否
//name 模糊查询 否
//page 页码 是
//size 每页显示数量 是
const k_getUserListAction = 'rest/mobile/aNjUser/select';
//户列表接口  mlp_jlbh  楼栋编号
const k_getRoomListAction = 'rest/mobile/aNjBuilding/select';

const k_updateOrgLicenseInfoAction = 'rest/mobile/updateTableOfExternal'; //更新企业营业执照信息


const k_getDistrictListAction = 'rest/reportflow/mobile/district'; //行政区域列表查询 code
const k_reverseGeocodeUrl = 'http://dh.ditu.zj.cn:18005/inverse/getInverseGeocoding.jsonp?&detail=1&zoom=10&customer=2&latlon='; //地理反编码 118.777,32.044

const k_getFormSheetAction = 'rest/autoForm/mFormUsed'; //动态表单配置数据 rosourceId
//const k_uploadFormSheetAction = '/server/mobile/fAddUpload'; //动态表单报送信息-提交
//const k_editFormSheetAction = '/server/mobile/fEditUpload'; //动态表单报送信息-编辑

const k_uploadFormSheetAction = 'rest/mobile/report/add'; //动态表单报送信息-提交
const k_editFormSheetAction = 'rest/mobile/report/edit'; //动态表单报送信息-编辑
const k_deleteCollectAction = 'rest/mobile/aNjUser/delete'; //删除图层数据

const k_uploadImgAction = 'rest/mobile/upload/file'; //上传图片
const k_previewImgAction = 'rest/reportflow/report/affix/img'; //图片预览 Path-详情接口里面返回的路径
const k_deleteImgAction = 'rest/mobile/affix/delete'; //图片删除接口


function request_ja (obj) {
    var url = api_host_ja+obj.action;
    $.ajax({
        type: "get",
        url: url,
        dataType: obj.dataType || "jsonp",
        timeout: 20000, // 超时时间 10 秒
        //headers : {
        //    "Content-Type": 'application/json'
        //},
        data: obj.data,

        success: function (object) {
            object.message = object.massage;
            if (object.code == 1) {
                obj.success(object);
            }else {
                obj.error(object);
            }
        },
        error:function (object) {
            object.message = object.massage;
            obj.error(object);
        }
    });
}

function requestPostImg(obj) {
    var params = obj.data;
    var url = api_host_ja+obj.action;
    $.ajax({
        type: "POST",
        url: url,
        // dataType: kDataType,
        jsonp: 'callback',
        data: params,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        timeout: 10000, // 超时时间 10 秒
        // callback: 'requestSuccess',
        // headers : {
        //     'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundaryK0GqJpv1cdrBRhNo',
        // 'Content-Type':'application/json;charset=utf-8'
        // },
        // beforeSend: function(request) {
        //     request.setRequestHeader("app-version", '1.0.0');
        //     request.setRequestHeader("device-uuid", '1');
        //     request.setRequestHeader("device-name", navigator.appName);
        //     request.setRequestHeader("device-model", '111');
        //     request.setRequestHeader("device-os-name", navigator.platform);
        //     request.setRequestHeader("device-os-version", navigator.appVersion);
        //     request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded;charset=utf8');
        // },
        success: function (object) {
            //console.log("请求成功："+JSON.stringify(object))
            var res = object;
            if (typeof object == 'string') {
                res = JSON.parse(object);
            }
            if (res.code == 1) {
                obj.success(res);
            }else {
                obj.error(res);
            }
        },
        error:function (object) {
            //console.log("请求失败："+JSON.stringify(object))
            obj.error(object);
        }
    });
}


var api_host_zcl = 'http://58.213.150.104:20001/map-api/';
var proxyAction = 'httpProxy.api';
var proxyXmlToJsonAction = 'httpProxyXmlToJson.api';
function request_zcl (obj) {
    var url = api_host_zcl+obj.action;
    $.ajax({
        type: "POST",
        dataType: "text",
        url: url,
        timeout: 600000, // 超时时间 10 秒
        data: obj.data,

        success: function (object) {

            var string = object
            var keyHex = CryptoJS.enc.Utf8.parse('267ac2ed67f292ff77c4a0b8');
            var decrypted = CryptoJS.TripleDES.decrypt(string, keyHex, {
                iv:CryptoJS.enc.Utf8.parse('12345678'),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7});
            var jsonDict = window.JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
            obj.success(jsonDict);

            //var result = hy_decrypt(object)
            //obj.success(object);
        },
        error:function (object) {
            obj.error(object);
        }
    });
}


function request_xml (obj) {
    var url = obj.url;
    $.ajax({
        url: url,
        data: obj.data,

        success: function (object) {

            var json = $.xml2json(object)
            obj.success(json);

        },
        error:function (object) {
            obj.error(object);
        }
    });
}


function hiddenStr (str,frontLen,endLen) {    //str：要进行隐藏的变量  frontLen: 前面需要保留几位    endLen: 后面需要保留几位
    var len = str.length-frontLen-endLen;
    var xing = '';
    for (var i=0;i<len;i++) {
        xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}



/****************************************************************************************
 *  ************************************** 久润接口 **************************************
 ****************************************************************************************/
const api_host_9r = 'http://grid1.nanjingdata.cn/gridServerApi/grid/api/';
const k_history_check_9r = 'historyTaskRecord';  //历史巡查
const k_check_general_9r = 'taskQuery';  //巡查总览信息

function request_9r (obj) {
    var url = api_host_9r+obj.action;
    $.ajax({
        type: "POST",
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: window.JSON.stringify(obj.data),
        success: function (res) {
            var code = res.code;
            if (code == 200) {
                obj.success(res.data);
            }else {
                obj.error(res);
            }
        },
        error: function (res) {
            obj.error(res);
        }
    })
}


/****************************************************************************************
 *  ************************************** 国研接口 **************************************
 ****************************************************************************************/


/**
 * 是否为网格员
 */
function isGridUser () {
    var userInfo = getUserInfo();
    if (userInfo) {
        if (userInfo.grid && userInfo.grid.length>0 && userInfo.gridCode && userInfo.gridCode.length>0) {
            return true;
        }
    }

    return false;
}

function getUserName () {
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.userName;
    }
    return null;
}

function getUserId () {
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.uid;
    }
    return null;
}

function getUserInfo () {
    var userInfoStr = sessionStorage.getItem('k_user_info');
    if (userInfoStr && userInfoStr.length>0) {
        var userInfo = window.JSON.parse(userInfoStr);
        return userInfo;
    }
    return null;
}


/****************************************************************************************
 *  ************************************** Module **************************************
 ****************************************************************************************/
/**
 * 时间格式化
 * @param fmt  例：new Date().Format('yyyy-MM-dd HH:mm:ss')
 * @returns {*}
 * @constructor
 */
Date.prototype.Format=function(fmt){
  var o={
    "M+":this.getMonth()+1,//月份
    "d+":this.getDate(),//日
    "H+":this.getHours(),//小时
    "m+":this.getMinutes(),//分
    "s+":this.getSeconds(),//秒
    "q+":Math.floor((this.getMonth()+3)/3),//季度
    "S+":this.getMilliseconds()//毫毛
  };
  if(/(y+)/.test(fmt)) fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

module.exports = {
  request_ht: request_ht,
  getIndividualBusinessInfoAction: getIndividualBusinessInfoAction,
  getEnterpriseInfoAction: getEnterpriseInfoAction
}
