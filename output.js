//Tue Jul 02 2024 04:06:47 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
console.log("配置代理池: OPENCARD_GLOBAL_AGENT_HTTP_PROXY_URL");
console.log("配置api代理: OPENCARD_API_PROXY_URL");
let proenv_0x1952ba = false;
if (!process.env.OPENCARD_API_PROXY_URL) {
  if (process.env.OPENCARD_GLOBAL_AGENT_HTTP_PROXY_URL) {
    proenv_0x1952ba = true;
    require("global-agent/bootstrap");
    global.GLOBAL_AGENT.HTTP_PROXY = process.env.OPENCARD_GLOBAL_AGENT_HTTP_PROXY_URL || "";
  }
}
let proenv_0x3048d8 = false;
if (process.env.OPENCARD_API_PROXY_URL) {
  proenv_0x3048d8 = true;
  your_proxy_url = process.env.OPENCARD_API_PROXY_URL;
}
console.log("配置代理池: " + (proenv_0x1952ba == true ? "已配置" : "未配置") + " ");
console.log("配置api代理: " + (proenv_0x3048d8 == true ? "已配置" : "未配置"));
const proenv_0x37e3ee = $.isNode() ? require("./jdCookie.js") : "";
const proenv_0x472067 = $.isNode() ? require("./sendNotify") : "";
const proenv_0x1d49a7 = require("axios");
const proenv_0x474b06 = require("tunnel");
const proenv_0x318aef = require("crypto-js");
let proenv_0x1916ff = [],
  proenv_0x45577c = "";
let proenv_0x39eb2f = process.env.jd_cjhy_sevenDay_ids ? process.env.jd_cjhy_sevenDay_ids : "";
let proenv_0x117793 = parseInt(process.env.jd_cjhy_sevenDay_num) ? parseInt(process.env.jd_cjhy_sevenDay_num) : 15;
let proenv_0x465323 = parseInt(process.env.jd_cjhy_sevenDay_openCard) ? parseInt(process.env.jd_cjhy_sevenDay_openCard) : 1;
let proenv_0x52a60d = process.env.jd_cjhy_black_pin ? process.env.jd_cjhy_black_pin : "";
let proenv_0x28344d = "jdapp;android;11.1.4;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCCM00 Build/QKQ1.191021.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36";
let proenv_0xecc4a6 = "http://hz.feverrun.top:99/share/card/getToken";
if ($.isNode()) {
  Object.keys(proenv_0x37e3ee).forEach(_0x590ca9 => {
    proenv_0x1916ff.push(proenv_0x37e3ee[_0x590ca9]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  proenv_0x1916ff = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...proenv_0x5e86a4($.getdata("CookiesJD") || "[]").map(_0x13035c => _0x13035c.cookie)].filter(_0x3b32d3 => !!_0x3b32d3);
}
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.continueFlag = false;
$.activityEnd = false;
$.beanNull = false;
let proenv_0x369a31 = "";
let proenv_0xc4eaeb = "";
let proenv_0xfaa6 = {};
let proenv_0x304e54 = [];
$.prizeList = [];
if (proenv_0x39eb2f.indexOf("&") > -1) {
  proenv_0x304e54 = proenv_0x39eb2f.split("&");
} else {
  proenv_0x304e54 = [proenv_0x39eb2f];
}
!(async () => {
  if (process.env.PRO_REDIS_URL) {
    try {
      $.redis = require("redis");
      pro_redis_url = process.env.PRO_REDIS_URL;
      const _0x5aed25 = {
        url: pro_redis_url
      };
      $.client = $.redis.createClient(_0x5aed25);
      if ($.client) {
        console.log("本地Redis已检测到配置链接");
        await $.client.connect();
      }
    } catch (_0x398ad9) {
      console.log(_0x398ad9);
      console.log("本地Redis连接失败, 退出执行！！！");
      process.exit(1);
    }
  }
  if (!proenv_0x1916ff[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    process.exit(1);
    return;
  }
  if (proenv_0x304e54.length < 1 || !proenv_0x39eb2f) {
    console.log("【问题反馈】https://t.me/proenvc ");
    console.log("export jd_cjhy_sevenDay_ids=\"id1&id2&id3...\" 未设置 退出！！！");
    process.exit(1);
    return;
  }
  console.log("问题反馈: https://t.me/proenvc");
  console.log();
  for (let _0x500d06 = 0; _0x500d06 < proenv_0x304e54.length; _0x500d06++) {
    allMessage = "";
    message = "";
    $.activityId = proenv_0x304e54[_0x500d06];
    $.randomNum = $.activityId;
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("当前活动: " + $.activityId);
    console.log("活动地址: " + $.activityUrl);
    $.activityEnd = false;
    for (let _0x5836b8 = 0; _0x5836b8 < proenv_0x1916ff.length; _0x5836b8++) {
      proenv_0x45577c = proenv_0x1916ff[_0x5836b8];
      originCookie = proenv_0x1916ff[_0x5836b8];
      if (proenv_0x45577c) {
        $.UserName = decodeURIComponent(proenv_0x45577c.match(/pt_pin=([^; ]+)(?=;?)/) && proenv_0x45577c.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x5836b8 + 1;
        message = "";
        $.bean = 0;
        $.hotFlag = false;
        $.nickName = "";
        $.isLogin = true;
        $.continueFlag = false;
        console.log("******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********");
        if (proenv_0x52a60d.indexOf($.UserName) > -1) {
          console.log("黑名单内,跳过!");
          continue;
        }
        await proenv_0x5e10cd();
        await proenv_0x1897a7();
        await proenv_0x35399e();
        if ($.index >= proenv_0x117793) {
          console.log("执行了" + proenv_0x117793 + "个退出");
          break;
        }
        if ($.beanNull == true) {
          break;
        }
        if ($.outFlag || $.activityEnd) {
          break;
        }
        if ($.continueFlag == true) {
          continue;
        }
        if (proenv_0x3048d8 == true || proenv_0x1952ba == true) {
          await $.wait(parseInt(Math.random() * 250 + 250, 10));
        } else {
          await $.wait(parseInt(Math.random() * 2500 + 2500, 10));
        }
      }
    }
    if (proenv_0x3048d8 == true || proenv_0x1952ba == true) {
      await $.wait(parseInt(Math.random() * 250 + 250, 10));
    } else {
      await $.wait(parseInt(Math.random() * 2500 + 2500, 10));
    }
    if ($.isNode() && allMessage) {
      allMessage += "\n活动地址:" + $.activityUrl + "\n";
      $.msg($.name, "", "" + allMessage);
      if ($.isNode()) {
        await proenv_0x472067.sendNotify("" + $.name, "" + allMessage);
      }
      allMessage = "";
    }
  }
  if ($.outFlag) {
    let _0x13e65a = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + _0x13e65a);
    if ($.isNode()) {
      await proenv_0x472067.sendNotify("" + $.name, "" + _0x13e65a);
    }
  }
  process.exit(1);
})().catch(_0x74d7f2 => $.logErr(_0x74d7f2)).finally(() => $.done());
async function proenv_0x1897a7() {
  try {
    $.ERR_BAD_REQUEST = 0;
    proenv_0x369a31 = "";
    $.Token = "";
    $.Pin = "";
    $.pToken = "";
    $.activityEnd = false;
    $.beanNull = false;
    let _0x27e512 = false;
    if (proenv_0x3048d8 == true) {
      await proenv_0xa06a9b();
      if ($.getIpStatus == false) {
        await proenv_0xa06a9b();
        console.log("代理获取失败，跳过此次执行！");
        return;
      }
    }
    $.isvObfuscator = "";
    await proenv_0x5527d8();
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await proenv_0x4fa9c0("getCk");
    if ($.activityEnd == true) {
      return;
    }
    if (proenv_0xc4eaeb == "") {
      console.log("获取cookie失败");
      return;
    }
    await proenv_0x4fa9c0("getSimpleActInfoVo");
    await proenv_0x4fa9c0("initPinToken");
    if (!$.Pin) {
      console.log("getMyPing 获取失败");
      return;
    }
    await proenv_0x4fa9c0("getSignInfo");
    if ($.index == 1) {
      console.log("抽奖规则:" + $.rule);
    }
    if ($.isSign == "y") {
      console.log("当日已签到");
      return;
    }
    await proenv_0x4fa9c0("getShopInfo");
    if ($.index == 1) {
      console.log("店铺: " + $.shopName);
      console.log("会员: " + $.userId);
    }
    await proenv_0x4fa9c0("accessLog");
    await proenv_0x4fa9c0("getUserInfo");
    await proenv_0x4fa9c0("getOpenCardInfo");
    if ($.openCard == false) {
      if (proenv_0x465323 == 1) {
        _0x27e512 = true;
        $.joinVenderId = $.userId;
        await proenv_0x4fa9c0("getShopOpenCardInfo");
        await $.wait(parseInt(Math.random() * 500 + 500, 10));
        await proenv_0x4fa9c0("bindWithVender");
        await $.wait(parseInt(Math.random() * 500 + 500, 10));
        if ($.errorJoinShop.indexOf("开卡失败，请稍后重试~") > -1 || $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 || $.errorJoinShop.indexOf("加入店铺会员失败") > -1) {
          console.log("第1次重试");
          await proenv_0x4fa9c0("getShopOpenCardInfo");
          await $.wait(parseInt(Math.random() * 500 + 500, 10));
          await proenv_0x4fa9c0("bindWithVender");
          await $.wait(parseInt(Math.random() * 500 + 500, 10));
        }
      }
    } else {
      console.log("已开卡:" + $.userId);
    }
    await proenv_0x4fa9c0("newFollowShop");
    await proenv_0x4fa9c0("signUp");
    await proenv_0x4fa9c0("attendLog");
    if ($.beanNull == true) {
      console.log("京豆计划余额不足, 退出");
      return;
    }
  } catch (_0x19a549) {}
}
async function proenv_0x4fa9c0(_0xcb751f) {
  if ($.outFlag || $.continueFlag) {
    return;
  }
  let _0xf6484 = "https://cjhy-isv.isvjcloud.com";
  let _0x2320dc = "";
  let _0x36f3e3 = "POST";
  switch (_0xcb751f) {
    case "isvObfuscator":
      url = "https://api.m.jd.com/client.action?functionId=isvObfuscator&lmt=0";
      _0x2320dc = await proenv_0x3683a3();
      break;
    case "getCk":
      _0x36f3e3 = "get";
      url = "" + $.activityUrl;
      break;
    case "getSimpleActInfoVo":
      url = _0xf6484 + "/customer/getSimpleActInfoVo";
      _0x2320dc = "activityId=" + $.activityId;
      break;
    case "initPinToken":
      _0x36f3e3 = "get";
      url = _0xf6484 + "/customer/initPinToken?activityId=" + $.activityId + "&jdToken=" + $.Token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&fromType=APP&riskType=1";
      break;
    case "getMyPing":
      url = _0xf6484 + "/customer/getMyPing";
      _0x2320dc = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
      break;
    case "getSignInfo":
      url = _0xf6484 + "/sign/sevenDay/wx/getSignInfo";
      _0x2320dc = "actId=" + $.activityId + "&venderId=" + $.userId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "getShopInfo":
      url = _0xf6484 + "/sign/wx/getShopInfo";
      _0x2320dc = "venderId=" + $.userId;
      break;
    case "drawMyOkList":
      url = _0xf6484 + "/wxDrawActivity/drawMyOkList";
      _0x2320dc = "activityId=" + $.activityId + "&type=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "getUserInfo":
      url = _0xf6484 + "/wxActionCommon/getUserInfo";
      _0x2320dc = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
      break;
    case "accessLog":
      url = _0xf6484 + "/common/accessLog";
      let _0x5926e1 = "" + $.activityUrl;
      _0x2320dc = "venderId=" + $.userId + "&code=" + $.activityType + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x5926e1) + "&subType=app";
      break;
    case "getOpenCardInfo":
      url = _0xf6484 + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo";
      _0x2320dc = "venderId=" + $.userId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityType=" + $.activityType;
      break;
    case "newFollowShop":
      url = _0xf6484 + "/wxActionCommon/newFollowShop";
      _0x2320dc = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityType=" + $.activityType;
      break;
    case "signUp":
      url = _0xf6484 + "/sign/sevenDay/wx/signUp";
      const _0x53d7b0 = {
        ecyText: proenv_0x2d7f83({
          actId: $.activityId,
          pin: encodeURIComponent($.Pin)
        })
      };
      _0x2320dc = JSON.stringify(_0x53d7b0);
      break;
    case "attendLog":
      url = _0xf6484 + "/common/attendLog";
      _0x2320dc = "venderId=" + $.userId + "&activityType=" + $.activityType + "&activityId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&clientType=app";
      break;
    case "getShopOpenCardInfo":
      _0x36f3e3 = "post";
      if (!$.joinVenderId) {
        console.log("没有开卡id");
        break;
      }
      const _0x304e6d = {
        venderId: $.joinVenderId,
        channel: 102,
        payUpShop: true,
        queryVersion: "10.5.2",
        appid: "27004",
        needSecurity: true,
        bizId: "shopmember_m_jd_com"
      };
      _0x2320dc = _0x304e6d;
      h5st = await proenv_0x2870f6("27004", _0x2320dc);
      h5st = encodeURIComponent(h5st);
      await $.wait(parseInt(Math.random() * 250 + 150, 10));
      url = "https://api.m.jd.com/client.action?functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0x2320dc)) + "&t=" + Date.now() + "&appid=shopmember_m_jd_com&clientVersion=9.2.0&client=H5&area=1_72_2799_0&uuid=88888&h5st=" + h5st + "&x-api-eid-token=";
      _0x2320dc = "";
      break;
    case "bindWithVender":
      if (!$.joinVenderId) {
        console.log("没有开卡id");
        break;
      }
      _0x36f3e3 = "post";
      if ($.shopactivityId == "") {
        const _0x44ac7c = {
          venderId: $.joinVenderId,
          shopId: $.joinVenderId,
          bindByVerifyCodeFlag: 1,
          registerExtend: {},
          writeChildFlag: 0,
          channel: 102,
          appid: "27004",
          needSecurity: true,
          bizId: "shopmember_m_jd_com"
        };
        _0x2320dc = _0x44ac7c;
      } else {
        const _0x3c38cd = {
          venderId: $.joinVenderId,
          shopId: $.joinVenderId,
          bindByVerifyCodeFlag: 1,
          registerExtend: {},
          writeChildFlag: 0,
          activityId: $.shopactivityId,
          channel: 102,
          appid: "27004",
          needSecurity: true,
          bizId: "shopmember_m_jd_com"
        };
        _0x2320dc = _0x3c38cd;
      }
      h5st = await proenv_0x2870f6("27004", _0x2320dc);
      h5st = encodeURIComponent(h5st);
      await $.wait(parseInt(Math.random() * 250 + 150, 10));
      url = "https://api.m.jd.com/client.action?functionId=bindWithVender&body=" + encodeURIComponent(JSON.stringify(_0x2320dc)) + "&t=" + Date.now() + "&appid=shopmember_m_jd_com&clientVersion=9.2.0&client=H5&area=1_72_2799_0&uuid=88888&h5st=" + h5st + "&x-api-eid-token=";
      _0x2320dc = "";
      break;
    default:
      console.log("错误" + _0xcb751f);
  }
  let _0x3bf881 = proenv_0x4c72f9(_0xcb751f, url, _0x2320dc, _0x36f3e3);
  if (proenv_0x3048d8 == true || proenv_0x1952ba == true) {
    await $.wait(parseInt(Math.random() * 200 + 200, 10));
  } else {
    await $.wait(parseInt(Math.random() * 1000 + 550, 10));
  }
  options = {};
  if (proenv_0x3048d8 == true) {
    const _0x4ce872 = {
      host: $.ip,
      port: $.ipo
    };
    const _0x189f17 = {
      proxy: _0x4ce872
    };
    httpAgent = proenv_0x474b06.httpOverHttp(_0x189f17);
    const _0x3a1d87 = {
      host: $.ip,
      port: $.ipo
    };
    const _0x5635bb = {
      proxy: _0x3a1d87
    };
    httpsAgent = proenv_0x474b06.httpsOverHttp(_0x5635bb);
    const _0x270b03 = {
      headers: _0x3bf881.headers,
      timeout: _0x3bf881.timeout,
      proxy: false,
      httpAgent: httpAgent,
      httpsAgent: httpsAgent
    };
    options = _0x270b03;
  } else {
    const _0x4da5a7 = {
      headers: _0x3bf881.headers,
      timeout: _0x3bf881.timeout
    };
    options = _0x4da5a7;
  }
  if (_0x36f3e3.toLowerCase().includes("post")) {
    return proenv_0x1d49a7.post(url, _0x2320dc, options).then(function (_0x53bd23) {
      _0x53bd23 = proenv_0x27b287(_0x53bd23);
      if (_0x53bd23) {
        proenv_0x5b8825(_0xcb751f, _0x53bd23);
      }
    }).catch(async function (_0x4a5107) {
      if (_0x4a5107.response) {
        console.log(_0x4a5107.response.status);
        if (!(proenv_0x3048d8 == true || proenv_0x1952ba == true)) {
          if (_0x4a5107.response.status == "493") {
            console.log("ip可能已经被限制， 过十分钟再来！！！");
            $.outFlag = true;
            process.exit(1);
          }
        }
        _0x4a5107.response.status == "403";
      }
      console.log("错误码1: " + _0xcb751f + " - " + _0x4a5107.code);
      if (_0x4a5107.code == "ECONNABORTED" || _0x4a5107.code == "ERR_BAD_REQUEST" && !["isvObfuscator", "getCk"].includes(_0xcb751f) || _0x4a5107.code == "ERR_BAD_RESPONSE") {
        if ($.ERR_BAD_REQUEST >= 5) {
          $.ERR_BAD_REQUEST = 0;
        } else {
          $.ERR_BAD_REQUEST += 1;
          await $.wait(parseInt(Math.random() * 500 + 350, 10));
          await proenv_0x4fa9c0(_0xcb751f);
        }
      }
      if (_0x4a5107.code == "ECONNRESET") {
        await $.wait(parseInt(Math.random() * 500 + 350, 10));
        if (proenv_0x3048d8 == true) {
          await proenv_0xa06a9b();
          await proenv_0x4fa9c0(_0xcb751f);
        }
      }
    });
  } else {
    if (_0x36f3e3 == "get" || _0x36f3e3 == "GET") {
      return proenv_0x1d49a7.get(url, options).then(function (_0x1b9d47) {
        _0x1b9d47 = proenv_0x27b287(_0x1b9d47);
        if (_0x1b9d47) {
          proenv_0x5b8825(_0xcb751f, _0x1b9d47);
        }
      }).catch(async function (_0x5a1fb3) {
        if (_0x5a1fb3.response) {
          console.log(_0x5a1fb3.response.status);
          if (!(proenv_0x3048d8 == true || proenv_0x1952ba == true)) {
            if (_0x5a1fb3.response.status == "493") {
              console.log("ip可能已经被限制， 过十分钟再来！！！");
              $.outFlag = true;
              process.exit(1);
            }
          }
          _0x5a1fb3.response.status == "403";
        }
        console.log("错误码2: " + _0xcb751f + " - " + _0x5a1fb3.code);
        if (_0x5a1fb3.code == "ECONNABORTED" || _0x5a1fb3.code == "ERR_BAD_REQUEST" && !["isvObfuscator", "getCk"].includes(_0xcb751f) || _0x5a1fb3.code == "ERR_BAD_RESPONSE") {
          if ($.ERR_BAD_REQUEST >= 5) {
            $.ERR_BAD_REQUEST = 0;
          } else {
            $.ERR_BAD_REQUEST += 1;
            await $.wait(parseInt(Math.random() * 500 + 350, 10));
            await proenv_0x4fa9c0(_0xcb751f);
          }
        }
        if (_0x5a1fb3.code == "ECONNRESET") {
          await $.wait(parseInt(Math.random() * 500 + 350, 10));
          if (proenv_0x3048d8 == true) {
            await proenv_0xa06a9b();
            await proenv_0x4fa9c0(_0xcb751f);
          }
        }
      });
    }
  }
}
function proenv_0x5b8825(_0x30111d, _0x723381) {
  let _0x58481c = "";
  try {
    if (!["accessLog", "attendLog", "getCk", "drawContent", "accessLogWithAD", "accessLog"].includes(_0x30111d)) {
      if (_0x723381) {
        _0x58481c = JSON.parse(_0x723381);
      }
    }
  } catch (_0x39cf0c) {
    console.log(_0x30111d + " 执行任务异常");
    $.runFalag = false;
  }
  try {
    switch (_0x30111d) {
      case "isvObfuscator":
        if (typeof _0x58481c == "object") {
          if (_0x58481c.errcode == 0) {
            if (typeof _0x58481c.token != "undefined") {
              $.Token = _0x58481c.token || "";
            }
          } else {
            if (_0x58481c.message) {
              console.log("isvObfuscator " + (_0x58481c.message || ""));
              $.isvObfuscator = _0x58481c.message;
            } else {
              console.log(_0x723381);
            }
          }
        } else {
          console.log(_0x723381);
        }
        break;
      case "getCk":
        let _0x588add = _0x723381.match(/<title>(活动已结束)<\/title>/) && _0x723381.match(/<title>(活动已结束)<\/title>/)[1] || "";
        if (_0x588add) {
          $.activityEnd = true;
          console.log("活动已结束");
        }
        $.venderId = _0x723381.match(/<input type="hidden" id="venderId" value="(.\w+)">/) && _0x723381.match(/<input type="hidden" id="venderId" value="(.\w+)">/)[1] || "";
        $.userId = _0x723381.match(/<input type="hidden" id="userId" value="(.\w+)">/) && _0x723381.match(/<input type="hidden" id="userId" value="(.\w+)">/)[1] || "";
        break;
      case "getSimpleActInfoVo":
        if (_0x58481c.result == true && _0x58481c.data) {
          $.activityId = _0x58481c.data.activityId;
          $.activityType = _0x58481c.data.activityType;
          $.jdActivityId = _0x58481c.data.jdActivityId;
          $.shopId = _0x58481c.data.shopId;
          $.venderId = _0x58481c.data.venderId;
        }
        break;
      case "initPinToken":
        if (_0x58481c.result == true && _0x58481c.data) {
          $.Pin = _0x58481c.data.secretPin;
          $.touxiangImg = _0x58481c.data.yunMidImageUrl;
        }
        break;
      case "getMyPing":
        if (_0x58481c.result == true && _0x58481c.data) {
          $.Pin = _0x58481c.data.secretPin;
          $.touxiangImg = _0x58481c.data.yunMidImageUrl;
        }
        break;
      case "getSignInfo":
        if (_0x58481c.isOk == true) {
          $.rule = _0x58481c.actRule;
          $.isSign = _0x58481c.isSign ? _0x58481c.isSign : "n";
          $.isOver = _0x58481c.isOver ? _0x58481c.isOver : "n";
          $.followDays = _0x58481c.followDays ? _0x58481c.followDays : 0;
          $.contiSignDays = _0x58481c.contiSignDays ? _0x58481c.contiSignDays : 0;
          if ($.isOver == "y") {
            $.activityEnd = true;
          }
          console.log("关注天数: " + $.followDays + " 天");
          console.log("连续签到: " + $.contiSignDays + " 天");
        } else {
          console.log("" + _0x58481c.msg);
        }
        break;
      case "getShopInfo":
        if (_0x58481c.isOk == true && _0x58481c.shopInfo) {
          $.shopName = _0x58481c.shopInfo.shopName;
        }
        break;
      case "drawMyOkList":
        break;
      case "getUserInfo":
        break;
      case "accessLog":
        break;
      case "getOpenCardInfo":
        if (_0x58481c.result == true && _0x58481c.data) {
          $.openCard = _0x58481c.data.openedCard;
        }
        break;
      case "newFollowShop":
        break;
      case "signUp":
        if (_0x58481c.isOk == true && _0x58481c.signResult) {
          try {
            $.drawName = _0x58481c.signResult.gift.giftName ? _0x58481c.signResult.gift.giftName : "空气";
          } catch (_0xaa6400) {
            $.drawName = "空气";
          }
          console.log("获得: " + $.drawName);
          message += "获得: " + $.drawName;
        } else {
          if (_0x58481c.msg.indexOf("余额不足") > -1) {
            $.beanNull = true;
          }
          if (_0x58481c.msg.indexOf("来晚了") > -1) {
            $.beanNull = true;
          }
          if (_0x58481c.msg.indexOf("结束") > -1) {
            $.beanNull = true;
          }
          if (_0x58481c.msg.indexOf("明日再来") > -1) {
            $.beanNull = true;
          }
          console.log("" + _0x58481c.msg);
        }
        break;
      case "attendLog":
        break;
      case "getShopOpenCardInfo":
        if (_0x723381) {
          _0x723381 = _0x723381 && _0x723381.match(/jsonp_.*?\((.*?)\);/) && _0x723381.match(/jsonp_.*?\((.*?)\);/)[1] || _0x723381;
          _0x58481c = JSON.parse(_0x723381);
          if (_0x58481c && _0x58481c.success == true) {
            openCardStatus = _0x58481c.result[0].userInfo.openCardStatus || 0;
            venderCardName = _0x58481c.result[0].shopMemberCardInfo.venderCardName || "";
            if (openCardStatus === 1) {
              console.log("已入会: " + $.joinVenderId + " - " + venderCardName);
            } else {
              if (openCardStatus == 0) {
                console.log("去开卡: " + $.joinVenderId + " - " + venderCardName);
              }
            }
            $.shopactivityId = _0x58481c.result[0].interestsRuleList && _0x58481c.result[0].interestsRuleList[0] && _0x58481c.result[0].interestsRuleList[0].interestsInfo && _0x58481c.result[0].interestsRuleList[0].interestsInfo.activityId || "";
          } else {
            _0x58481c.busiCode == "9001";
            _0x58481c.busiCode == "1";
          }
        }
        break;
      case "bindWithVender":
        if (_0x723381) {
          _0x723381 = _0x723381 && _0x723381.match(/jsonp_.*?\((.*?)\);/) && _0x723381.match(/jsonp_.*?\((.*?)\);/)[1] || _0x723381;
          _0x723381.indexOf("加入店铺会员成功") > -1 || _0x723381.indexOf("已经是本店会员") > -1;
          _0x723381.indexOf("活动太火爆，请稍后再试") > -1;
          _0x58481c = JSON.parse(_0x723381);
          if (_0x58481c && _0x58481c.success === true) {
            if (_0x58481c.busiCode == 0) {
              console.log("" + _0x58481c.message);
            } else {
              console.log(_0x58481c.busiCode + ": " + _0x58481c.message);
            }
            $.errorJoinShop = _0x58481c.message || "";
            if (_0x58481c.result && _0x58481c.result.giftInfo) {
              for (let _0x19f168 of _0x58481c.result.giftInfo.giftList) {
                console.log("入会获得: " + _0x19f168.discountString + _0x19f168.prizeName + _0x19f168.secondLineDesc);
              }
            }
          } else {
            if (_0x58481c && typeof _0x58481c == "object" && _0x58481c.message) {
              $.errorJoinShop = _0x58481c.message || "";
              console.log(_0x58481c.busiCode + ": " + _0x58481c.message);
              _0x58481c.busiCode == "2001";
              _0x58481c.busiCode == "9002";
              _0x58481c.busiCode == "9003";
              _0x58481c.busiCode == "0";
            } else {
              console.log(_0x723381);
            }
          }
        }
        break;
      default:
        console.log(_0x30111d + "-> " + _0x723381);
        break;
    }
  } catch (_0x289828) {}
}
function proenv_0x4c72f9(_0x511339, _0x29cdec, _0x5d625a, _0x828b08 = "post") {
  if (_0x29cdec.indexOf("/signUp") > -1) {
    ct = "application/json";
  } else {
    ct = "application/x-www-form-urlencoded";
  }
  let _0x1881d7 = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    Connection: "keep-alive",
    "Content-Type": ct,
    Cookie: proenv_0x45577c,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x29cdec.indexOf("https://cjhy-isv.isvjcloud.com") > -1) {
    _0x1881d7.Referer = "" + $.activityUrl;
    _0x1881d7.Cookie = "IsvToken=" + $.Token + ";" + proenv_0xc4eaeb + ";AUTH_C_USER=" + $.Pin + ";";
  } else {
    _0x1881d7.Cookie = proenv_0x45577c;
  }
  if (["getShopOpenCardInfo", "bindWithVender"].includes(_0x511339)) {
    const _0x57a17f = {
      Accept: "*/*",
      "User-Agent": $.UA,
      "content-type": "application/x-www-form-urlencoded",
      "x-rp-client": "h5_1.0.0",
      "x-referer-page": "https://pages.jd.com/member/shopcard",
      origin: "https://pages.jd.com",
      "X-Requested-With": "com.jingdong.app.mall",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://pages.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      Cookie: proenv_0x45577c
    };
    _0x1881d7 = _0x57a17f;
  }
  if (_0x828b08.toLowerCase().includes("get")) {
    const _0x321ca5 = {
      url: _0x29cdec,
      method: _0x828b08,
      headers: _0x1881d7,
      timeout: 30000
    };
    return _0x321ca5;
  } else {
    if (_0x828b08.toLowerCase().includes("post")) {
      const _0x204490 = {
        url: _0x29cdec,
        method: _0x828b08,
        headers: _0x1881d7,
        body: _0x5d625a,
        timeout: 30000
      };
      return _0x204490;
    }
  }
}
function proenv_0x43effd(_0x336787) {
  try {
    if (_0x336787.headers["set-cookie"]) {
      proenv_0x45577c = originCookie + ";";
      for (let _0x3dc5df of _0x336787.headers["set-cookie"]) {
        proenv_0xfaa6[_0x3dc5df.split(";")[0].substr(0, _0x3dc5df.split(";")[0].indexOf("="))] = _0x3dc5df.split(";")[0].substr(_0x3dc5df.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x4428f8 of Object.keys(proenv_0xfaa6)) {
        proenv_0x45577c += _0x4428f8 + "=" + proenv_0xfaa6[_0x4428f8] + ";";
      }
      proenv_0xc4eaeb = proenv_0x45577c;
    }
  } catch (_0x1c9a6f) {
    proenv_0xc4eaeb = proenv_0x45577c;
  }
}
async function proenv_0x5e10cd() {
  try {
    let _0x311cb9 = ["jdapp;android;12.2.0;;;M/5.0;appBuild/2397;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0(Linux;Android10;BKL-AL20Build/HUAWEIBKL-AL20;wv)AppleWebKit/537.36(KHTML,likeGecko)Version/4.0Chrome/89.0.4389.72MQQBrowser/6.2TBS/046249MobileSafari/537.36", "jdapp;android;12.2.0;;;M/5.0;appBuild/2397;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0(Linux;U;Android10;zh-CN;TAS-AL00Build/HUAWEITAS-AL00)AppleWebKit/537.36(KHTML,likeGecko)Version/4.0Chrome/78.0.3904.108UCBrowser/13.1.8.1098MobileSafari/537.36", "jdapp;android;12.2.0;;;M/5.0;appBuild/2397;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jd.jdlite%22%7D;Mozilla/5.0(Linux;Android10;MI9Build/QKQ1.190825.002;wv)AppleWebKit/537.36(KHTML,likeGecko)Version/4.0Chrome/77.0.3865.120MQQBrowser/6.2TBS/045415MobileSafari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 9; ONEPLUS A3000 Build/PKQ1.181203.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046247 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 11; RMX2001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 13; M2012K11C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.117 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 10; Redmi 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.28 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 10; Redmi Note 7) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/89.0.4389.86 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 9; MI 9) AppleWebKit/537.36 (KHTML, like Gecko) Brave Chrome/88.0.4324.96 Mobile Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 8.0.0; Pixel C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Safari/537.36", "jdapp;android;12.0.8;;;M/5.0;appBuild/22709;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A" + Date.now() + "%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%2C%22od%22%3A%22%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22" + encodeURIComponent(proenv_0x5af74a(proenv_0x318aef.SHA1($.UserName).toString())) + "%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;Mozilla/5.0 (Linux; Android 8.1.0; OPPO R11; Build/OPM1.171019.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.4280.141 Mobile Safari/537.36 Firefox-KiToBrowser/115.0"];
    let _0x27ab6a = parseInt(Math.random() * _0x311cb9.length);
    let _0x274e44 = _0x311cb9[_0x27ab6a];
    $.UA = _0x274e44;
    return _0x274e44;
  } catch (_0x3d2f66) {
    console.log(_0x3d2f66);
  }
}
function proenv_0x5af74a(_0x4dfdac, _0x4079f9) {
  _0x4d9b46 = _0x4d9b46 || "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
  var _0x5d0b2d = "";
  var _0x4b33d3, _0xfdd8cc, _0x2b5b84, _0x392245, _0x1ee8f0, _0x3b7454;
  var _0x203a4b = 0;
  _0x4dfdac = _0x4dfdac.replace(/rn/g, "n");
  var _0x4d9b46 = "";
  for (var _0x5d0b2d = 0; _0x5d0b2d < _0x4dfdac.length; _0x5d0b2d++) {
    {
      var _0x1ed388 = _0x4dfdac.charCodeAt(_0x5d0b2d);
      if (_0x1ed388 < 128) {
        _0x4d9b46 += String.fromCharCode(_0x1ed388);
      } else {
        _0x1ed388 > 127 && _0x1ed388 < 2048 ? (_0x4d9b46 += String.fromCharCode(_0x1ed388 >> 6 | 192), _0x4d9b46 += String.fromCharCode(_0x1ed388 & 63 | 128)) : (_0x4d9b46 += String.fromCharCode(_0x1ed388 >> 12 | 224), _0x4d9b46 += String.fromCharCode(_0x1ed388 >> 6 & 63 | 128), _0x4d9b46 += String.fromCharCode(_0x1ed388 & 63 | 128));
      }
    }
  }
  while (_0x203a4b < _0x4dfdac.length) {
    _0x1ed388 = _0x4dfdac.charCodeAt(_0x203a4b++);
    _0x4b33d3 = _0x4dfdac.charCodeAt(_0x203a4b++);
    _0xfdd8cc = _0x4dfdac.charCodeAt(_0x203a4b++);
    _0x2b5b84 = _0x1ed388 >> 2;
    _0x392245 = (_0x1ed388 & 3) << 4 | _0x4b33d3 >> 4;
    _0x1ee8f0 = (_0x4b33d3 & 15) << 2 | _0xfdd8cc >> 6;
    _0x3b7454 = _0xfdd8cc & 63;
    if (isNaN(_0x4b33d3)) {
      _0x1ee8f0 = _0x3b7454 = 64;
    } else {
      isNaN(_0xfdd8cc) && (_0x3b7454 = 64);
    }
    _0x5d0b2d = _0x5d0b2d + _0x4d9b46.charAt(_0x2b5b84) + _0x4d9b46.charAt(_0x392245) + _0x4d9b46.charAt(_0x1ee8f0) + _0x4d9b46.charAt(_0x3b7454);
  }
  while (_0x5d0b2d.length % 4 > 1) {
    _0x5d0b2d += "=";
  }
  return _0x5d0b2d;
}
function proenv_0x7ee982(_0x19cb00) {
  _0x19cb00 = _0x19cb00 || 32;
  let _0x482d82 = "abcdef0123456789",
    _0x27db85 = _0x482d82.length,
    _0x2e630b = "";
  for (i = 0; i < _0x19cb00; i++) {
    _0x2e630b += _0x482d82.charAt(Math.floor(Math.random() * _0x27db85));
  }
  return _0x2e630b;
}
function proenv_0x5e86a4(_0x5bf29e) {
  if (typeof _0x5bf29e == "string") {
    try {
      return JSON.parse(_0x5bf29e);
    } catch (_0xf83122) {
      console.log(_0xf83122);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function proenv_0x43dea4(_0x23f785, _0x507716) {
  return Math.floor(Math.random() * (_0x507716 - _0x23f785)) + _0x23f785;
}
async function proenv_0x2870f6(_0x1c858c, _0x1c6078) {
  return new Promise(_0x127ae8 => {
    const _0x2ce01d = {
      "User-Agent": "jdapp;android;11.4.1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCCM0o410 Build/QKQ1.191021.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36"
    };
    const _0x93a172 = {
      url: "http://hz.feverrun.top:99/share/card/getH5st410",
      body: "bid=" + _0x1c858c + "&body=" + JSON.stringify(_0x1c6078),
      headers: _0x2ce01d,
      timeout: 60000
    };
    $.post(_0x93a172, (_0x41b64f, _0x38da70, _0x589414) => {
      try {
        if (_0x41b64f) {
          console.log("请求失败，请检查网路");
          console.log(_0x41b64f);
        } else {
          try {
            _0x589414 = _0x589414;
          } catch (_0x13d661) {
            _0x589414 = "";
          }
        }
      } catch (_0x27f031) {} finally {
        _0x127ae8(_0x589414 || "");
      }
    });
  });
}
function proenv_0x3683a3() {
  return new Promise(_0x43eeec => {
    const _0x142129 = {
      "User-Agent": proenv_0x28344d
    };
    const _0x787c50 = {
      url: proenv_0xecc4a6 + "?type=cjhy",
      headers: _0x142129,
      timeout: 60000
    };
    $.get(_0x787c50, (_0xf86145, _0x1a1844, _0x2f059a) => {
      try {
        if (_0xf86145) {
          console.log("请求失败，请检查网路");
        } else {
          try {
            _0x2f059a = JSON.parse(_0x2f059a);
            if (_0x2f059a.code == 0) {
              _0x2f059a = _0x2f059a.data;
            } else {
              _0x2f059a = "";
            }
          } catch (_0x37d532) {
            _0x2f059a = "";
          }
        }
      } catch (_0x21f186) {} finally {
        _0x43eeec(_0x2f059a || "");
      }
    });
  });
}
function proenv_0x1db265(_0x9971d1, _0x6eb1c9) {
  return Math.floor(Math.random() * (_0x6eb1c9 - _0x9971d1)) + _0x9971d1;
}
function proenv_0xcf636e(_0x3adf67, _0x301f21) {
  if (!_0x301f21) {
    _0x301f21 = location.href;
  }
  var _0x661181 = new RegExp("(^|[&?])" + _0x3adf67 + "=([^&]*)(&|$)");
  var _0x299874 = _0x301f21.match(_0x661181);
  if (_0x299874 != null) {
    return decodeURIComponent(_0x299874[2]);
  }
  return "";
}
async function proenv_0x449805(_0x1e9c03, _0x43a73e) {
  await $.wait(parseInt(Math.random() * 350 + 300, 10));
  return new Promise(_0xb5f9ee => {
    const _0xdb0ea6 = {
      url: "http://hz.feverrun.top:99/share/sub/subIsvToken",
      body: "pin=" + encodeURIComponent(_0x1e9c03) + "&token=" + _0x43a73e,
      headers: {},
      timeout: 60000
    };
    _0xdb0ea6.headers["User-Agent"] = "jdapp;android;11.5.0;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCCM0o Build/QKQ1.191021.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36";
    $.post(_0xdb0ea6, (_0x54d235, _0x10b809, _0x5830a1) => {
      try {
        if (_0x54d235) {
          console.log("缓存token失败2");
          _0x5830a1 = "";
        } else {
          try {
            _0x5830a1 = _0x5830a1;
          } catch (_0x3f77d2) {
            _0x5830a1 = "";
          }
        }
      } catch (_0x11add4) {
        _0x5830a1 = "";
      } finally {
        _0xb5f9ee(_0x5830a1 || "");
      }
    });
  });
}
async function proenv_0x25ba89(_0x4791b5) {
  await $.wait(parseInt(Math.random() * 350 + 300, 10));
  if ($.client) {
    return new Promise(async _0x2981cf => {
      data = await $.client.get(_0x4791b5);
      _0x2981cf(data || "");
    });
  } else {
    return new Promise(_0x5d1b88 => {
      const _0x357d48 = {
        url: "http://hz.feverrun.top:99/share/get/getIsvToken",
        body: "pin=" + encodeURIComponent(_0x4791b5),
        headers: {},
        timeout: 60000
      };
      _0x357d48.headers["User-Agent"] = "jdapp;android;11.5.0;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; PCCM0o Build/QKQ1.191021.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36";
      $.post(_0x357d48, (_0x28aea1, _0x564467, _0x4d3f3b) => {
        try {
          if (_0x28aea1) {
            console.log("缓存token失败1");
            _0x4d3f3b = "";
          } else {
            try {
              _0x4d3f3b = _0x4d3f3b;
            } catch (_0x2ed648) {
              _0x4d3f3b = "";
            }
          }
        } catch (_0x1b2cad) {
          _0x4d3f3b = "";
        } finally {
          _0x5d1b88(_0x4d3f3b || "");
        }
      });
    });
  }
}
async function proenv_0x5527d8() {
  if ($.client) {
    return new Promise(async _0x2b46be => {
      $token = await proenv_0x25ba89(encodeURIComponent($.UserName));
      if ($token != "") {
        console.log("读取缓存token成功");
        $.Token = $token;
      } else {
        for (let _0x69709f = 0; _0x69709f < 1; _0x69709f++) {
          await proenv_0x4fa9c0("isvObfuscator");
          if ($.Token != "" && $.Token != undefined) {
            console.log("缓存token成功");
            await $.client.set(encodeURIComponent($.UserName), $.Token);
            await $.client.expire(encodeURIComponent($.UserName), 1740);
            break;
          } else {
            console.log("缓存token失败" + (_0x69709f + 1));
          }
          if ($.isvObfuscator.indexOf("参数异常") > -1) {
            break;
          }
        }
      }
      _0x2b46be();
    });
  } else {
    return new Promise(async _0x343925 => {
      $token = await proenv_0x25ba89(encodeURIComponent($.UserName));
      if ($token != "") {
        console.log("读取缓存token成功");
        $.Token = $token;
      } else {
        for (let _0x553b1e = 0; _0x553b1e < 1; _0x553b1e++) {
          await proenv_0x4fa9c0("isvObfuscator");
          if ($.Token != "" && $.Token != undefined) {
            console.log("缓存token成功");
            await proenv_0x449805(encodeURIComponent($.UserName), $.Token);
            break;
          } else {
            console.log("缓存token失败" + (_0x553b1e + 1));
          }
          if ($.isvObfuscator.indexOf("参数异常") > -1) {
            break;
          }
        }
      }
      _0x343925();
    });
  }
}
const proenv_0x5c2787 = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
function proenv_0x2d7f83(_0x444469) {
  let _0x491319 = Date.now() + parseInt(proenv_0x52bc13("te"));
  if (typeof _0x444469 != "object") {
    _0x444469 = JSON.parse(_0x444469);
  }
  _0x444469.nowTime = _0x491319;
  let _0x1d41db = proenv_0x52bc13("pToken") + _0x491319;
  const _0x48c589 = _0x1d41db.substring(0, _0x1d41db.length - 5);
  let _0x40bccc = "";
  for (let _0x2c5e57 = 0; _0x2c5e57 < _0x48c589.length; _0x2c5e57++) {
    let _0x4e928e = _0x48c589.charCodeAt(_0x2c5e57);
    let _0x4cf865 = _0x4e928e % 10;
    let _0xea799a = proenv_0x5c2787[_0x4cf865][_0x2c5e57];
    _0x40bccc += _0xea799a;
  }
  var _0x206f0e = _0x40bccc.length;
  var _0x5b97e1 = Math.floor(_0x206f0e / 24);
  var _0x379fd8 = "";
  for (var _0x146a39 = 0; _0x146a39 < 24; _0x146a39++) {
    var _0x3d364f = (_0x146a39 + 1) * _0x5b97e1;
    if (_0x146a39 === 23) {
      _0x3d364f = _0x206f0e;
    }
    var _0x30f22e = _0x40bccc.substring(_0x146a39 * _0x5b97e1, _0x3d364f);
    var _0x5ae6f3 = [];
    for (var _0x168bca = 0; _0x168bca < _0x30f22e.length; _0x168bca++) {
      _0x5ae6f3.push(_0x30f22e.charCodeAt(_0x168bca));
    }
    var _0x149d22 = _0x5ae6f3.reduce(function (_0x3b059b, _0x8da5f) {
      return _0x3b059b + _0x8da5f;
    }, 0);
    var _0x3d3f66 = Math.floor(_0x149d22 / _0x5ae6f3.length);
    _0x379fd8 += String.fromCharCode(_0x3d3f66);
  }
  _0x40bccc = _0x379fd8;
  const _0x1ca379 = proenv_0x58c7f0(_0x40bccc);
  const _0xc20bb6 = proenv_0x318aef.enc.Utf8.parse(_0x1ca379);
  const _0x28c0d5 = proenv_0x318aef.enc.Utf8.parse("");
  const _0x1c0be8 = proenv_0x318aef.AES.encrypt(JSON.stringify(_0x444469), _0xc20bb6, {
    iv: _0x28c0d5,
    mode: proenv_0x318aef.mode.ECB,
    padding: proenv_0x318aef.pad.Pkcs7
  });
  return _0x1c0be8.toString();
}
function proenv_0x58c7f0(_0xd3ff20) {
  _0xd3ff20 = _0xd3ff20.split("").reverse().join("");
  const _0x55dba8 = new Uint8Array(12);
  const _0xeb0102 = new TextEncoder().encode(_0xd3ff20);
  for (let _0x29b0a7 = 0; _0x29b0a7 < _0xeb0102.length; _0x29b0a7 += 2) {
    let _0x55f587 = _0xeb0102[_0x29b0a7] << 5 | _0xeb0102[_0x29b0a7 + 1] & 255;
    _0x55f587 %= 63;
    _0x55dba8[_0x29b0a7 >> 1] = _0x55f587;
  }
  let _0x252fd9 = "";
  for (let _0x3fc7b4 = 0; _0x3fc7b4 < _0x55dba8.length; _0x3fc7b4++) {
    _0x252fd9 += (_0x55dba8[_0x3fc7b4] + 256).toString(2).slice(1);
  }
  let _0x82e5f5 = "";
  let _0x3ad83f = "";
  for (let _0x42e0f2 = 0; _0x42e0f2 < 16; _0x42e0f2++) {
    if (_0x42e0f2 !== 0) {
      const _0x4a0c95 = _0x42e0f2 * 6;
      const _0x1345d2 = _0x252fd9.substring(_0x4a0c95, _0x4a0c95 + 6);
      let _0x2735ea = parseInt(_0x1345d2, 2);
      const _0x421feb = _0x3ad83f.split("");
      for (let _0x32e138 = 0; _0x32e138 < _0x421feb.length; _0x32e138++) {
        if (_0x421feb[_0x32e138] === "1") {
          _0x2735ea = (_0x2735ea >> 6 - _0x32e138 | _0x2735ea << _0x32e138) & 63;
        }
      }
      _0x3ad83f = (_0x2735ea & 63).toString(2).padStart(6, "0");
    } else {
      _0x3ad83f = _0x252fd9.substring(0, 6);
    }
    _0x82e5f5 += _0x3ad83f;
  }
  for (let _0x4efd05 = 0; _0x4efd05 < 12; _0x4efd05++) {
    const _0x5a78f2 = _0x4efd05 * 8;
    _0x55dba8[_0x4efd05] = parseInt(_0x82e5f5.substring(_0x5a78f2, _0x5a78f2 + 8), 2);
  }
  const _0x1a887c = btoa(String.fromCharCode.apply(null, _0x55dba8));
  return _0x1a887c;
}
function proenv_0x52bc13(_0xeabdef) {
  var _0x44970b = _0xeabdef + "=";
  var _0x4bbc34 = proenv_0xc4eaeb.split(";");
  for (var _0x2b1b90 = 0; _0x2b1b90 < _0x4bbc34.length; _0x2b1b90++) {
    var _0x20b492 = _0x4bbc34[_0x2b1b90].trim();
    if (_0x20b492.indexOf(_0x44970b) === 0) {
      return _0x20b492.substring(_0x44970b.length, _0x20b492.length);
    }
  }
  return "";
}
function proenv_0x27b287(_0x69c0df) {
  proenv_0x43effd(_0x69c0df);
  if (_0x69c0df.status == 200 && _0x69c0df.data) {
    _0x69c0df = _0x69c0df.data;
    if (typeof _0x69c0df == "object") {
      return JSON.stringify(_0x69c0df);
    } else {
      return _0x69c0df;
    }
  } else {
    return "";
  }
}
async function proenv_0xa06a9b() {
  return new Promise(async _0x31f599 => {
    try {
      await $.wait(parseInt(Math.random() * 250 + 150, 10));
      let _0x227d8a = await proenv_0x32813e();
      if (_0x227d8a != "") {
        $.getIpStatus = true;
        console.log("当前: " + _0x227d8a);
        ips = _0x227d8a.split(":");
        $.ip = ips[0];
        $.ipo = ips[1];
        await $.wait(parseInt(Math.random() * 250 + 150, 10));
      } else {
        $.getIpStatus = false;
        console.log("代理获取失败");
      }
    } catch (_0x39ab1e) {
      $.getIpStatus = false;
      console.log("代理获取失败");
    }
    if ($.getIpStatus == false) {
      try {
        await $.wait(parseInt(Math.random() * 250 + 150, 10));
        let _0x26a03b = await proenv_0x32813e();
        if (_0x26a03b != "") {
          $.getIpStatus = true;
          console.log("当前: " + _0x26a03b);
          ips = _0x26a03b.split(":");
          $.ip = ips[0];
          $.ipo = ips[1];
          await $.wait(parseInt(Math.random() * 250 + 150, 10));
        } else {
          $.getIpStatus = false;
          console.log("代理获取失败");
        }
      } catch (_0x2e702f) {
        $.getIpStatus = false;
        console.log("代理获取失败");
      }
    }
    if ($.getIpStatus == false) {
      console.log("代理获取失败，跳过此次执行！");
      _0x31f599(false);
    } else {
      _0x31f599(true);
    }
  });
}
function proenv_0x32813e() {
  try {
    return new Promise(_0x1731ef => {
      const _0x1bde07 = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/538.38"
      };
      const _0x39ebfb = {
        url: your_proxy_url,
        headers: _0x1bde07,
        timeout: 30000
      };
      $.get(_0x39ebfb, (_0x347919, _0x2404ff, _0x5acab8) => {
        try {
          if (_0x347919) {
            console.log("获取Ip失败");
          } else {
            try {
              if (_0x5acab8.indexOf("\r\n") > -1) {
                _0x5acab8 = _0x5acab8.split("\r\n");
                if (_0x5acab8.length >= 1) {
                  _0x5acab8 = _0x5acab8[0];
                }
              } else {
                if (_0x5acab8.indexOf("\n") > -1) {
                  _0x5acab8 = _0x5acab8.split("\n");
                  if (_0x5acab8.length >= 1) {
                    _0x5acab8 = _0x5acab8[0];
                  }
                } else {
                  if (_0x5acab8.indexOf("\r") > -1) {
                    _0x5acab8 = _0x5acab8.split("\r");
                    if (_0x5acab8.length >= 1) {
                      _0x5acab8 = _0x5acab8[0];
                    }
                  } else {
                    if (_0x5acab8.indexOf("\t") > -1) {
                      _0x5acab8 = _0x5acab8.split("\t");
                      if (_0x5acab8.length >= 1) {
                        _0x5acab8 = _0x5acab8[0];
                      }
                    }
                  }
                }
              }
            } catch (_0x2a0fc8) {
              _0x5acab8 = "";
            }
          }
        } catch (_0x1765cd) {} finally {
          _0x1731ef(_0x5acab8 || "");
        }
      });
    });
  } catch (_0x242723) {
    console.log(_0x242723.message);
  }
}
async function proenv_0x35399e() {
  if ($.isNode()) {
    if (message) {
      $.msg($.name, "", "【京东账号" + $.index + "】" + $.UserName + " " + message + " \n");
      allMessage += "【京东账号" + $.index + "】" + $.UserName + " " + message + ($.index !== proenv_0x1916ff.length ? "\n" : "");
    } else {
      allMessage += "";
    }
  }
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}