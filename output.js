//Sat Jun 29 2024 13:51:30 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("玩一玩-任务抽奖");
const bdy_0x55e618 = $.isNode() ? require("./sendNotify") : "",
  bdy_0x3e4eb3 = $.isNode() ? require("./jdCookie.js") : "",
  bdy_0x17b7bf = require("./USER_AGENTS"),
  bdy_0x2583ba = require("./function/dylans");
let bdy_0x307a9d = true,
  bdy_0x391c03 = [],
  bdy_0x5e6d51 = [],
  bdy_0x6d9e1b = "",
  bdy_0x11a647 = "";
if ($.isNode()) {
  Object.keys(bdy_0x3e4eb3).forEach(_0x33ae97 => {
    bdy_0x5e6d51.push(bdy_0x3e4eb3[_0x33ae97]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  bdy_0x5e6d51 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...bdy_0x5a8fd4($.getdata("CookiesJD") || "[]").map(_0x51aab6 => _0x51aab6.cookie)].filter(_0x19dbaa => !!_0x19dbaa);
}
$.linkId = "6QiYAqxOTkn2Mf-I8miO5A";
!(async () => {
  if (!bdy_0x5e6d51[0]) {
    const _0x443301 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x443301);
    return;
  }
  console.log("问题反馈：https://t.me/dylan_jdpro");
  for (let _0x6eabc = 0; _0x6eabc < bdy_0x5e6d51.length; _0x6eabc++) {
    if (bdy_0x5e6d51[_0x6eabc]) {
      bdy_0x6d9e1b = bdy_0x5e6d51[_0x6eabc];
      $.UserName = decodeURIComponent(bdy_0x6d9e1b.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x6d9e1b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x6eabc + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = bdy_0x17b7bf.UARAM ? bdy_0x17b7bf.UARAM() : bdy_0x17b7bf.USER_AGENT;
      $.xcr = 1;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        const _0x81ae86 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x81ae86);
        $.isNode() && (await bdy_0x55e618.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      let _0x4c8df7 = await bdy_0x5062cf();
      if (_0x4c8df7.length != 0) {
        console.log("\n去做任务...");
        for (let _0x15ef37 of _0x4c8df7) {
          if (/好友|购买|下单/.test(_0x15ef37.taskTitle)) {
            continue;
          }
          if (_0x15ef37.taskFinished) {
            console.log(_0x15ef37.taskShowTitle + " ---- 已完成");
            continue;
          }
          console.log("去做任务 " + _0x15ef37.taskShowTitle);
          let _0x2f3c06 = _0x15ef37.timeLimitPeriod || 0;
          if (_0x15ef37.taskType === "FOLLOW_CHANNEL") {
            await bdy_0x44c07a();
          }
          let _0x18324e = await bdy_0x3ef5c4(_0x15ef37.taskType, _0x15ef37.id);
          if (_0x18324e.code) {
            break;
          }
          let _0xf54a7c = _0x15ef37.taskLimitTimes - _0x15ef37.taskDoTimes;
          for (let _0x511355 of _0x18324e) {
            if (_0xf54a7c == 0) {
              break;
            }
            _0x15ef37.id == 5462 && (_0x511355.itemId = _0x511355.itemName);
            _0x2f3c06 != 0 ? (await bdy_0x13b28f(_0x15ef37.id, _0x511355.itemId), await $.wait(parseInt(Math.random() * 500 + _0x2f3c06 * 1000, 10)), await bdy_0x491bd6(), await $.wait(parseInt(Math.random() * 1000, 10))) : (await bdy_0x135b12(_0x511355.itemId, _0x15ef37.taskType, _0x15ef37.id), await $.wait(parseInt(Math.random() * 500 + 1000, 10)));
            _0xf54a7c--;
          }
        }
      } else {
        console.log("活动结束了，期待下期！");
        return;
      }
      $.xcr = 1;
      await bdy_0xa417c6();
      if ($.remainchance > 0) {
        $.log("\n开始抽奖...");
        for (let _0x2523bd = 0; _0x2523bd < $.remainchance; _0x2523bd++) {
          $.log("第" + (_0x2523bd + 1) + "次抽奖：");
          await bdy_0x475540();
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
      }
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
    }
  }
  bdy_0x11a647;
})().catch(_0x2b0a28 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2b0a28 + "!", "");
}).finally(() => {
  $.done();
});
async function bdy_0xa417c6() {
  let _0x1ef325 = {
      linkId: $.linkId,
      taskId: "",
      inviter: "",
      inJdApp: true
    },
    _0x43e2cc = {
      appId: "b7d17",
      functionId: "superLeagueHome",
      body: _0x1ef325,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
  _0x1ef325 = await bdy_0x2583ba.getbody(_0x43e2cc);
  if (!_0x1ef325) {
    return;
  }
  return new Promise(async _0x4689c5 => {
    $.post(bdy_0x2211d1(_0x1ef325), async (_0x18c53d, _0x381ee2, _0x372c7a) => {
      try {
        _0x18c53d ? (console.log("" + JSON.stringify(_0x18c53d)), console.log(" API请求失败，请检查网路重试")) : (_0x372c7a = JSON.parse(_0x372c7a), _0x372c7a.code == 0 ? ($.remainchance = _0x372c7a.data.remainTimes || 0, bdy_0x391c03.push(_0x372c7a.data.userCode)) : console.log(_0x372c7a.errMsg));
      } catch (_0x52f297) {
        $.logErr(_0x52f297, _0x381ee2);
      } finally {
        _0x4689c5(_0x372c7a);
      }
    });
  });
}
async function bdy_0x49301b(_0x32c190) {
  let _0x379dd3 = {
      linkId: $.linkId,
      taskId: 5144,
      inviter: _0x32c190,
      inJdApp: true
    },
    _0x2fbcec = {
      appId: "b7d17",
      functionId: "superLeagueHome",
      body: _0x379dd3,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
  _0x379dd3 = await bdy_0x2583ba.getbody(_0x2fbcec);
  if (!_0x379dd3) {
    return;
  }
  return new Promise(async _0xb97678 => {
    $.post(bdy_0x2211d1(_0x379dd3), async (_0x58b7d3, _0x507e68, _0x1c756e) => {
      try {
        _0x58b7d3 ? (console.log("" + JSON.stringify(_0x58b7d3)), console.log(" API请求失败，请检查网路重试")) : (_0x1c756e = JSON.parse(_0x1c756e), _0x1c756e.code == 0 ? $.remainchance = _0x1c756e.data.remainTimes || 0 : console.log(_0x1c756e.errMsg));
      } catch (_0xb5b23a) {
        $.logErr(_0xb5b23a, _0x507e68);
      } finally {
        _0xb97678(_0x1c756e);
      }
    });
  });
}
async function bdy_0x44c07a() {
  let _0x35d74f = {
    url: "https://api.m.jd.com/userFollow",
    body: "appid=jd-super-market&t=" + Date.now() + "&functionId=userFollow&client=m&body=%7B%22pin%22%3A%22" + encodeURIComponent($.UserName) + "%22%2C%22type%22%3A%220%22%2C%22businessId%22%3A1%2C%22themeId%22%3A127%2C%22babelChannel%22%3A%22ttt9%22%2C%22isJdApp%22%3A%221%22%2C%22isWx%22%3A%220%22%7D",
    headers: {
      Host: "api.m.jd.com",
      Origin: "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      Cookie: bdy_0x6d9e1b
    }
  };
  return new Promise(async _0x2485d4 => {
    $.post(_0x35d74f, async (_0x299a8e, _0x54ebac, _0x5c86b9) => {
      try {
        if (_0x299a8e) {
          console.log("" + JSON.stringify(_0x299a8e));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x5c86b9 = JSON.parse(_0x5c86b9);
          !(_0x5c86b9.code == 0);
        }
      } catch (_0x260b5e) {
        $.logErr(_0x260b5e, _0x54ebac);
      } finally {
        _0x2485d4(_0x5c86b9);
      }
    });
  });
}
async function bdy_0x5062cf() {
  let _0x33db29 = "";
  return new Promise(async _0x24784f => {
    $.post(bdy_0x2211d1("functionId=apTaskList&body=%7B%22linkId%22%3A%22" + $.linkId + "%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0"), async (_0x1e92a8, _0x338094, _0x565cf6) => {
      try {
        _0x1e92a8 ? (console.log("" + JSON.stringify(_0x1e92a8)), console.log(" API请求失败，请检查网路重试")) : (_0x565cf6 = JSON.parse(_0x565cf6), _0x565cf6.code == 0 ? _0x33db29 = _0x565cf6.data : console.log(_0x565cf6.errMsg));
      } catch (_0x2755cc) {
        $.logErr(_0x2755cc, _0x338094);
      } finally {
        _0x24784f(_0x33db29);
      }
    });
  });
}
async function bdy_0x475540() {
  let _0x5783eb = {
      linkId: $.linkId
    },
    _0x1019f6 = {
      appId: "60dc4",
      functionId: "superLeagueLottery",
      body: _0x5783eb,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
  $.xcr == 1 && ($.xcr = 0);
  _0x5783eb = await bdy_0x2583ba.getbody(_0x1019f6);
  if (!_0x5783eb) {
    return;
  }
  return new Promise(async _0x1f4ccf => {
    $.post(bdy_0x2211d1(_0x5783eb), async (_0x599fd9, _0x3a17ea, _0x382c07) => {
      try {
        if (_0x599fd9) {
          console.log("" + JSON.stringify(_0x599fd9));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x382c07 = JSON.parse(_0x382c07);
          if (_0x382c07.success) {
            if (_0x382c07.data.prizeConfigName) {
              if (_0x382c07.data.prizeConfigName.includes("超市卡")) {
                console.log("----获得：" + _0x382c07.data.prizeConfigName + " 🤑");
                _0x382c07.data.prizeConfigName === "50元超市卡" && (bdy_0x11a647 += "[账号" + $.index + $.UserName + "]获得：  " + _0x382c07.data.prizeConfigName + "\n");
              } else {
                if (_0x382c07.data.prizeType == 2) {
                  console.log("----获得：" + _0x382c07.data.amount + " " + _0x382c07.data.prizeConfigName + " 🧧 [" + _0x382c07.data.endTime + "过期]");
                } else {
                  if (_0x382c07.data.prizeType == 24) {
                    console.log("----获得：" + _0x382c07.data.amount + " 奖票");
                  } else {
                    _0x382c07.data.prizeType == 1 ? console.log("----获得：" + _0x382c07.data.prizeConfigName + "[" + _0x382c07.data.useLimit + "-" + _0x382c07.data.amount + "]") : console.log("----获得：[" + _0x382c07.data.prizeType + "] " + _0x382c07.data.prizeConfigName + " " + _0x382c07.data.codeDesc);
                  }
                }
              }
            } else {
              console.log("----空气");
            }
          } else {
            console.log(_0x382c07.errMsg);
          }
        }
      } catch (_0x5bd335) {
        $.logErr(_0x5bd335, _0x3a17ea);
      } finally {
        _0x1f4ccf();
      }
    });
  });
}
async function bdy_0x135b12(_0x112794, _0x4f2551, _0x2c1929) {
  let _0x56b375 = {
      taskType: "" + _0x4f2551,
      taskId: _0x2c1929,
      channel: 4,
      checkVersion: true,
      cityId: 0,
      provinceId: 0,
      countyId: 0,
      linkId: $.linkId,
      taskInsert: false,
      resourceType: null,
      itemId: "" + _0x112794
    },
    _0x4094bb = {
      appId: "54ed7",
      functionId: "apsDoTask",
      body: _0x56b375,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
  _0x56b375 = await bdy_0x2583ba.getbody(_0x4094bb);
  if (!_0x56b375) {
    return;
  }
  return new Promise(async _0x1158be => {
    $.post(bdy_0x2211d1(_0x56b375), async (_0x4cd937, _0x3d3669, _0x5c6792) => {
      try {
        _0x4cd937 ? (console.log("" + JSON.stringify(_0x4cd937)), console.log(" API请求失败，请检查网路重试")) : (_0x5c6792 = JSON.parse(_0x5c6792), _0x5c6792.code == 0 ? $.log("任务成功，抽奖次数 +" + _0x5c6792.data.awardInfo[0].factAwardNum) : console.log(_0x5c6792.errMsg));
      } catch (_0x4805b7) {
        $.logErr(_0x4805b7, _0x3d3669);
      } finally {
        _0x1158be();
      }
    });
  });
}
async function bdy_0x3ef5c4(_0x58f417, _0x4c75ae) {
  let _0x5867b1 = "functionId=apTaskDetail&body={\"taskType\":\"" + _0x58f417 + "\",\"taskId\":" + _0x4c75ae + ",\"channel\":4,\"checkVersion\":true,\"cityId\":0,\"provinceId\":0,\"countyId\":0,\"linkId\":\"" + $.linkId + "\"}&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.3.2&loginType=2&loginWQBiz=wegame&h5st=null";
  return new Promise(async _0x21cdda => {
    $.post(bdy_0x2211d1(_0x5867b1), async (_0x1118c3, _0x2afca5, _0x1ba804) => {
      try {
        _0x1118c3 ? (console.log("" + JSON.stringify(_0x1118c3)), console.log(" API请求失败，请检查网路重试")) : (_0x1ba804 = JSON.parse(_0x1ba804), _0x1ba804.code == 0 ? _0x1ba804 = _0x1ba804.data.taskItemList : console.log(_0x1ba804.errMsg));
      } catch (_0x581717) {
        $.logErr(_0x581717, _0x2afca5);
      } finally {
        _0x21cdda(_0x1ba804);
      }
    });
  });
}
async function bdy_0x13b28f(_0x55b36a, _0x31cc27) {
  let _0x2a5139 = {
    linkId: $.linkId,
    taskId: _0x55b36a,
    itemId: encodeURIComponent(_0x31cc27),
    channel: 4
  };
  _0x2a5139 = "functionId=apStartTaskTime&body=" + JSON.stringify(_0x2a5139) + "&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=12.1.0";
  return new Promise(async _0x1cd4df => {
    $.post(bdy_0x2211d1(_0x2a5139), async (_0x489eec, _0x3939a9, _0x30b723) => {
      try {
        if (_0x489eec) {
          console.log("" + JSON.stringify(_0x489eec));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x30b723 = JSON.parse(_0x30b723);
          if (!(_0x30b723.code == 0)) {
            console.log(_0x30b723.errMsg);
          }
        }
      } catch (_0x5e020a) {
        $.logErr(_0x5e020a, _0x3939a9);
      } finally {
        _0x1cd4df(_0x30b723);
      }
    });
  });
}
async function bdy_0x24167d(_0x459c20) {
  let _0x3927f4 = {
    linkId: "l-yLvQMhLwCqYy6_nXUBgg",
    taskId: _0x459c20
  };
  _0x3927f4 = "functionId=apCheckAndResetTaskTime&body=" + JSON.stringify(_0x3927f4) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0";
  return new Promise(async _0x89f467 => {
    $.post(bdy_0x2211d1(_0x3927f4), async (_0x277761, _0x1a2e72, _0x267992) => {
      try {
        if (_0x277761) {
          console.log("" + JSON.stringify(_0x277761));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x267992 = JSON.parse(_0x267992);
          if (!(_0x267992.code == 0)) {
            console.log(_0x267992.errMsg);
          }
        }
      } catch (_0x5a0073) {
        $.logErr(_0x5a0073, _0x1a2e72);
      } finally {
        _0x89f467(_0x267992);
      }
    });
  });
}
async function bdy_0x491bd6() {
  let _0x28fee7 = {
      linkId: $.linkId
    },
    _0x272961 = {
      appId: "ebecc",
      functionId: "apDoLimitTimeTask",
      body: _0x28fee7,
      appid: "activities_platform",
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
  _0x28fee7 = await bdy_0x2583ba.getbody(_0x272961);
  if (!_0x28fee7) {
    return;
  }
  return new Promise(async _0x57196e => {
    $.post(bdy_0x2211d1(_0x28fee7), async (_0x1b08d3, _0x5d309d, _0x167817) => {
      try {
        _0x1b08d3 ? (console.log("" + JSON.stringify(_0x1b08d3)), console.log(" API请求失败，请检查网路重试")) : (_0x167817 = JSON.parse(_0x167817), _0x167817.code == 0 ? $.log("任务成功，抽奖次数 +" + _0x167817.data.awardInfo[0].factAwardNum) : console.log(_0x167817.errMsg));
      } catch (_0x479894) {
        $.logErr(_0x479894, _0x5d309d);
      } finally {
        _0x57196e(_0x167817);
      }
    });
  });
}
async function bdy_0x4b417a(_0x316cdd) {
  let _0x507f22 = {
    linkId: $.linkId,
    taskId: String(_0x316cdd)
  };
  _0x507f22 = "functionId=apCheckTaskTimeEnd&body=" + JSON.stringify(_0x507f22) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0";
  return new Promise(async _0x1b229b => {
    $.post(bdy_0x2211d1(_0x507f22), async (_0x522db7, _0x3f1d5d, _0x3014c5) => {
      try {
        if (_0x522db7) {
          console.log("" + JSON.stringify(_0x522db7));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x3014c5 = JSON.parse(_0x3014c5);
          if (!(_0x3014c5.code == 0)) {
            console.log(_0x3014c5.errMsg);
          }
        }
      } catch (_0x12801b) {
        $.logErr(_0x12801b, _0x3f1d5d);
      } finally {
        _0x1b229b(_0x3014c5);
      }
    });
  });
}
function bdy_0x2211d1(_0x2203ea) {
  const _0x31f9bc = {
    Host: "api.m.jd.com",
    Origin: "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: bdy_0x6d9e1b
  };
  const _0x3bd78d = {
    url: "https://api.m.jd.com/api",
    body: _0x2203ea,
    headers: _0x31f9bc
  };
  return _0x3bd78d;
}
function bdy_0x2434c9() {
  return new Promise(_0x3bcc9c => {
    const _0x385226 = {
      Cookie: bdy_0x6d9e1b,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x3e78e0 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x385226,
      timeout: 10000
    };
    $.get(_0x3e78e0, (_0x2b6b20, _0x32e0dc, _0x9f1aa6) => {
      try {
        if (_0x9f1aa6) {
          _0x9f1aa6 = JSON.parse(_0x9f1aa6);
          if (!(_0x9f1aa6.islogin === "1")) {
            _0x9f1aa6.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x40a75d) {
        console.log(_0x40a75d);
      } finally {
        _0x3bcc9c();
      }
    });
  });
}
function bdy_0x1b235f() {
  return new Promise(_0x1daec5 => {
    !bdy_0x307a9d ? $.msg($.name, "", "" + bdy_0x11a647) : $.log("京东账号" + $.index + $.nickName + "\n" + bdy_0x11a647);
    _0x1daec5();
  });
}
function bdy_0x293aab(_0x3c0a62) {
  try {
    if (typeof JSON.parse(_0x3c0a62) == "object") {
      return true;
    }
  } catch (_0x3ad65b) {
    console.log(_0x3ad65b);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function bdy_0x5a8fd4(_0x5db043) {
  if (typeof _0x5db043 == "string") {
    try {
      return JSON.parse(_0x5db043);
    } catch (_0xa46130) {
      console.log(_0xa46130);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
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