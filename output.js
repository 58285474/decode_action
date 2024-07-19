//Fri Jul 19 2024 06:12:10 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H"),
  fs = require("fs"),
  CryptoJS = require("crypto-js"),
  querystring = require("querystring"),
  shuffleShareCodes = process.env.JD_XinFarm_mode === "true",
  isNotify = (process.env.JD_XinFarm_notify || process.env.JD_XinFarm_Notify) === "true",
  helparr = (process.env.JD_XinFarm_code || "").split(/[,@\n]+/g).map(_0x431a73 => _0x431a73.trim()).filter(Boolean),
  ShareCodesCacheFile = "./XinFarm_ShareCache.json";
let ShareCodesCacheData = [],
  needUpdateShareCodesCache = false;
if (fs.existsSync(ShareCodesCacheFile)) {
  try {
    const fileContent = fs.readFileSync(ShareCodesCacheFile, "utf-8");
    fileContent.trim() === "" ? console.log("缓存文件为空，初始化为空数组") : (ShareCodesCacheData = JSON.parse(fileContent), !Array.isArray(ShareCodesCacheData) && (ShareCodesCacheData = []), console.log("检测到本地缓存文件 XinFarm_ShareCache.json，加载成功"));
  } catch (_0x12da7c) {
    console.error("解析缓存文件时出错:", _0x12da7c);
    ShareCodesCacheData = [];
  }
}
let ShareCodes = [],
  ShareCodesMap = new Map(),
  cookie = "",
  cookiesArr = Object.keys(jdCookie).map(_0x2feae3 => jdCookie[_0x2feae3]).filter(_0x275a2e => _0x275a2e);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("活动入口: [APP-我的-东东农场]");
  console.log("指定助力: [" + (helparr.length > 0 ? "已填写" + helparr.length + "个指定助力码" : "未填写指定助力变量") + "]");
  console.log("助力模式: [" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]");
  console.log("代理开关: [" + common.getProxyStatus() + "]");
  console.log("通知推送: [" + (isNotify ? "开启" : "关闭") + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  console.log("");
  notify.config({
    title: $.name
  });
  console.log("【开始】收集[" + cookiesArr.length + "]个账号的助力码：\n");
  $.needRemoveCookieIndex = [];
  for (let _0x452942 = 0; _0x452942 < cookiesArr.length; _0x452942++) {
    $.index = _0x452942 + 1;
    cookie = cookiesArr[_0x452942];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    $.retryTimes = 0;
    $.title = "【账号" + $.index + "】" + $.UserName + "：";
    await getShareCodes();
    common.unsetCookie();
    if ($.runEnd) {
      break;
    }
  }
  if (needUpdateShareCodesCache) {
    let _0x575a4e = JSON.stringify(ShareCodesCacheData, null, 2);
    fs.writeFile(ShareCodesCacheFile, _0x575a4e, function (_0x29fd31) {
      _0x29fd31 ? (console.log(_0x29fd31), console.log("\n【缓存文件 XinFarm_ShareCache.json 更新失败!】\n")) : console.log("\n【缓存文件 XinFarm_ShareCache.json 更新成功!】\n");
    });
  }
  $.needRemoveCookieIndex.length > 0 && (console.log("\n【检测】删除火爆或者无效账号序号: [" + $.needRemoveCookieIndex.join(", ") + "]"), cookiesArr = cookiesArr.filter((_0x4af253, _0x1ea43b) => !$.needRemoveCookieIndex.includes(_0x1ea43b + 1)), $.needRemoveCookieIndex = []);
  console.log("\n【查询】本次可助力账号共有[" + cookiesArr.length + "]个");
  if (helparr && helparr.length > 0) {
    let _0x382f47;
    if (shuffleShareCodes) {
      const _0x2e4fe1 = ShareCodes.sort(() => 0.5 - Math.random());
      _0x382f47 = [...helparr, ..._0x2e4fe1];
    } else {
      _0x382f47 = [...helparr, ...ShareCodes];
    }
    const _0x29bf43 = [...new Set(_0x382f47)];
    ShareCodes = _0x29bf43;
    console.log("【模式】[" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]，已指定[" + helparr.length + "]个助力码，共计[" + ShareCodes.length + "]个助力码\n");
    for (let _0xc9711e = 0; _0xc9711e < cookiesArr.length; _0xc9711e++) {
      $.index = _0xc9711e + 1;
      cookie = cookiesArr[_0xc9711e];
      common.setCookie(cookie);
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.UA = common.genUA($.UserName);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      $.title = "【账号" + $.index + "】" + $.UserName + "：";
      await Main();
      common.unsetCookie();
      if ($.runEnd) {
        break;
      }
      await $.wait(3000);
    }
  } else {
    let _0x339cef;
    if (shuffleShareCodes) {
      const _0x2aa64a = ShareCodes.sort(() => 0.5 - Math.random());
      _0x339cef = _0x2aa64a;
    } else {
      _0x339cef = ShareCodes;
    }
    const _0x1c29a9 = [...new Set(_0x339cef)];
    ShareCodes = _0x1c29a9;
    console.log("【模式】[" + (shuffleShareCodes ? "随机打乱" : "顺序执行") + "]，共计[" + ShareCodes.length + "]个助力码\n");
    for (let _0x547ee4 = 0; _0x547ee4 < cookiesArr.length; _0x547ee4++) {
      $.index = _0x547ee4 + 1;
      cookie = cookiesArr[_0x547ee4];
      common.setCookie(cookie);
      $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
      $.UA = common.genUA($.UserName);
      $.message = notify.create($.index, $.UserName);
      $.nickName = "";
      $.title = "【账号" + $.index + "】" + $.UserName + "：";
      await Main();
      common.unsetCookie();
      if ($.runEnd) {
        break;
      }
      await $.wait(3000);
    }
  }
  const _0x22c7aa = notify.getMessage();
  _0x22c7aa && (console.log("\n📣 运行结果\n" + _0x22c7aa.replace(/：/g, " ➜ ")), isNotify && (notify.appendContent("\n"), await notify.push()));
})().catch(_0x4c549d => $.logErr(_0x4c549d)).finally(() => $.done());
async function getShareCodes() {
  try {
    const _0x1baa27 = await common.getLoginStatus(cookie);
    if (!_0x1baa27 && typeof _0x1baa27 === "boolean") {
      console.log($.title + "账号无效");
      $.needRemoveCookieIndex.push($.index);
      return;
    }
    let _0x5cc280 = false,
      _0x4c5397 = "";
    if (ShareCodesCacheData) {
      for (let _0xe0fce = 0; _0xe0fce < ShareCodesCacheData.length; _0xe0fce++) {
        ShareCodesCacheData[_0xe0fce].pt_pin == $.UserName && (_0x5cc280 = true, _0x4c5397 = ShareCodesCacheData[_0xe0fce].ShareCode);
      }
    }
    !_0x5cc280 && ($.farm_home = "", await sendRequest("farm_home"), $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"] && (_0x4c5397 = $.farm_home?.["result"]?.["farmHomeShare"]?.["inviteCode"], ShareCodesCacheData.push({
      pt_pin: $.UserName,
      ShareCode: _0x4c5397
    }), needUpdateShareCodesCache = true), await $.wait(2000));
    _0x4c5397 ? (console.log($.title + "助力码[" + _0x4c5397 + "]"), ShareCodesMap.set($.UserName, _0x4c5397), ShareCodes.push(_0x4c5397)) : (console.log($.title + "❌ 获取助力码失败"), $.needRemoveCookieIndex.push($.index));
  } catch (_0x4c1924) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x4c1924);
  }
}
async function Main() {
  try {
    const _0x1d561f = await common.getLoginStatus(cookie);
    if (!_0x1d561f && typeof _0x1d561f === "boolean") {
      console.log($.title + "账号无效");
      return;
    }
    $.skipRun = false;
    const _0x3272a7 = [];
    let _0x570fb5 = 0;
    const _0x1812ba = 1;
    _0x3c01f4: for (let _0x5c7dda of ShareCodes) {
      $.code = _0x5c7dda;
      await sendRequest("farm_assist");
      const _0x299753 = $.farm_assist?.["result"]?.["masterInfo"]?.["nickname"];
      switch ($.farm_assist?.["bizCode"]) {
        case 0:
          console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")成功 ✅(" + $.farm_assist?.["result"]?.["amount"] + "g💧)");
          break;
        case -4001:
          console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")失败(" + $.farm_assist?.["bizMsg"] + ")，重试1次");
          await $.wait(3000);
          await sendRequest("farm_assist");
          break;
        case -1001:
          console.log($.title + "助力(" + _0x5c7dda + ")失败(" + $.farm_assist?.["bizMsg"] + ")，重试");
          await $.wait(3000);
          await sendRequest("farm_assist");
          _0x570fb5++;
          if (_0x570fb5 > _0x1812ba) {
            break _0x3c01f4;
          }
          break;
        case 5002:
          console.log($.title + "助力失败(不能助力自己)");
          break;
        case 5003:
          console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")失败(今日已给该好友助力过了)");
          break;
        case 5004:
          console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")失败(今日助力次数已耗尽)");
          break _0x3c01f4;
        case 5005:
          console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")失败(好友助力已满)");
          $.message.insert("(" + _0x5c7dda + ")助力已满");
          _0x3272a7.push(_0x5c7dda);
          break;
        default:
          {
            console.log($.title + "助力[" + _0x299753 + "](" + _0x5c7dda + ")失败(未知助力结果：" + $.farm_assist?.["bizCode"] + " - " + $.farm_assist?.["bizMsg"] + ")");
            break;
          }
      }
      if ($.skipRun) {
        break;
      }
      await $.wait(2000);
    }
    if (_0x3272a7.length > 0) {
      for (let _0x5404e6 of _0x3272a7) {
        ShareCodes.includes(_0x5404e6) && ShareCodes.splice(ShareCodes.indexOf(_0x5404e6), 1);
      }
      console.log("\n【统计】当前还剩[" + ShareCodes.length + "]个助力码\n");
    }
  } catch (_0x444f6c) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x444f6c);
  }
}
async function handleResponse(_0x3f1926, _0xf2727a) {
  try {
    let _0xd96ac0 = "";
    switch (_0x3f1926) {
      case "farm_home":
        _0xf2727a.code == 0 ? _0xf2727a.data?.["bizCode"] === 0 ? $.farm_home = _0xf2727a.data : (_0xd96ac0 = common.getErrorMsg(_0xf2727a.data), console.log($.title + "农场首页失败：" + _0xd96ac0)) : (_0xd96ac0 = common.getErrorMsg(_0xf2727a), console.log($.title + "农场首页失败：" + _0xd96ac0));
        break;
      case "farm_assist":
        _0xf2727a.code === 0 ? $.farm_assist = _0xf2727a.data : (_0xd96ac0 = common.getErrorMsg(_0xf2727a), console.log($.title + "助力失败：" + _0xd96ac0), ["登陆", "失败"].some(_0x56a7c5 => _0xd96ac0.includes(_0x56a7c5)) && ($.skipRun = true));
        break;
    }
  } catch (_0x519368) {
    console.log("❌ 未能正确处理 " + _0x3f1926 + " 请求响应 " + (_0x519368.message || _0x519368));
  }
}
async function sendRequest(_0x438bd4) {
  if ($.runEnd) {
    return;
  }
  let _0x2ad602 = "",
    _0x4637ca = null,
    _0x172acb = null,
    _0x55794d = "POST",
    _0x92d997 = {},
    _0x409ea8 = {};
  switch (_0x438bd4) {
    case "farm_home":
      _0x409ea8 = {
        appId: "c57f6",
        functionId: "farm_home",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      _0x92d997 = await H5st2.getH5st(_0x409ea8);
      _0x2ad602 = "https://api.m.jd.com/client.action";
      _0x4637ca = _0x92d997.paramsData;
      break;
    case "farm_assist":
      _0x409ea8 = {
        appId: "28981",
        functionId: "farm_assist",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          inviteCode: $.code,
          shareChannel: "ttt3",
          assistChannel: ""
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      _0x92d997 = await H5st2.getH5st(_0x409ea8);
      _0x2ad602 = "https://api.m.jd.com/client.action";
      _0x4637ca = _0x92d997.paramsData;
      break;
    default:
      console.log("❌ 未知请求 " + _0x438bd4);
      return;
  }
  const _0x55a7cc = {
    osVersion: common.getLatestIOSVersion(),
    rfs: "0000",
    screen: "430*0",
    wqDefault: "false"
  };
  _0x4637ca && Object.assign(_0x4637ca, _0x55a7cc);
  _0x172acb && Object.assign(_0x172acb, _0x55a7cc);
  const _0x450765 = {
    url: _0x2ad602,
    method: _0x55794d,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      Host: "api.m.jd.com",
      Referer: "https://h5.m.jd.com/",
      "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
      Origin: "https://h5.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    params: _0x172acb,
    data: _0x4637ca,
    timeout: 30000
  };
  _0x55794d === "GET" && (delete _0x450765.data, delete _0x450765.headers["Content-Type"]);
  const _0x5905aa = 1;
  let _0x3d657f = 0,
    _0x47d3fa = null,
    _0x2e036e = false;
  while (_0x3d657f < _0x5905aa) {
    _0x3d657f > 0 && (await $.wait(1000));
    const _0x241ddb = await common.request(_0x450765);
    if (!_0x241ddb.success) {
      _0x47d3fa = "🚫 " + _0x438bd4 + " 请求失败 ➜ " + _0x241ddb.error;
      _0x3d657f++;
      continue;
    }
    if (!_0x241ddb.data) {
      _0x47d3fa = "🚫 " + _0x438bd4 + " 请求失败 ➜ 无响应数据";
      _0x3d657f++;
      continue;
    }
    await handleResponse(_0x438bd4, _0x241ddb.data);
    _0x2e036e = false;
    break;
  }
  _0x3d657f >= _0x5905aa && (console.log(_0x47d3fa), _0x2e036e && ($.outFlag = true, $.message && $.message.fix(_0x47d3fa)));
}
class H5st42 {
  constructor() {
    this._algoKey = CryptoJS.enc.Utf8.parse("wm0!@w-s#ll1flo(");
    this._ivKey = CryptoJS.enc.Utf8.parse("0102030405060708");
    this._tokenMaps = {
      4.2: {}
    };
    this._algoMaps = {
      4.2: {}
    };
    this._fpMaps = new Map();
    this._latestAppVersionData = {
      build: common.getLatestAppBuildVersion(),
      version: common.getLatestAppVersion()
    };
    this._latestIOSVersion = common.getLatestIOSVersion();
  }
  async getH5st(_0x184c3d) {
    let _0x115df2 = Object.assign({}, _0x184c3d, {
      h5st: "",
      params: "",
      paramsData: {}
    });
    try {
      if (!(typeof _0x184c3d === "object" && _0x184c3d !== null)) {
        console.log("❌ getH5st 传入参数有误");
        return _0x115df2;
      } else {
        const _0x1739b1 = ["appId", "appid", "body", "functionId"],
          _0xe8c052 = _0x1739b1.filter(_0xbd04e1 => !_0x184c3d[_0xbd04e1]);
        if (_0xe8c052.length > 0) {
          console.log("❌ getH5st 传入参数有误，缺少必要参数：" + _0xe8c052.join(", "));
          return _0x115df2;
        }
      }
      _0x184c3d.version = "4.2";
      const _0x181ca4 = this._initParams(_0x184c3d),
        {
          appid: _0x27d581,
          body: _0x23a65f,
          client: _0x298d80,
          clientVersion: _0x23b38d,
          functionId: _0x5daa0e
        } = _0x184c3d;
      let _0x134060 = this._tokenMaps[_0x181ca4.version][_0x181ca4.appId],
        _0x2f25c2 = this._algoMaps[_0x181ca4.version][_0x181ca4.appId];
      if (!_0x134060 || !_0x2f25c2) {
        const _0x5475c6 = await this._requestAlgo(_0x181ca4);
        _0x134060 = _0x5475c6.token;
        _0x2f25c2 = _0x5475c6.algo;
        this._tokenMaps[_0x181ca4.version][_0x181ca4.appId] = _0x134060;
        this._algoMaps[_0x181ca4.version][_0x181ca4.appId] = _0x2f25c2;
      }
      if (!_0x134060 && !_0x2f25c2) {
        return _0x115df2;
      }
      const _0x1f3b3b = {
        appid: _0x27d581,
        body: _0x23a65f,
        client: _0x298d80,
        clientVersion: _0x23b38d,
        functionId: _0x5daa0e,
        t: _0x184c3d.t
      };
      _0x184c3d?.["t"] && typeof _0x184c3d.t === "boolean" ? _0x184c3d.t = Date.now() : _0x184c3d.t = "";
      if (!_0x1f3b3b.client) {
        delete _0x1f3b3b.client;
      }
      if (!_0x1f3b3b.clientVersion) {
        delete _0x1f3b3b.clientVersion;
      }
      const _0xe8fd3e = this._makeSign(_0x1f3b3b, _0x134060, _0x2f25c2, _0x181ca4),
        _0x56adb5 = {
          functionId: _0x5daa0e,
          body: JSON.stringify(_0x23a65f),
          t: "",
          appid: _0x27d581,
          client: "",
          clientVersion: "",
          h5st: _0xe8fd3e?.["h5st"] || ""
        };
      for (const _0x499d9a of ["t", "client", "clientVersion"]) {
        _0x184c3d[_0x499d9a] ? _0x56adb5[_0x499d9a] = _0x184c3d[_0x499d9a] : delete _0x56adb5[_0x499d9a];
      }
      Object.assign(_0x115df2, {
        h5st: _0xe8fd3e?.["h5st"] || "",
        params: querystring.stringify(_0x56adb5),
        paramsData: _0x56adb5
      });
    } catch (_0x4176f9) {
      console.log("❌ getH5st 遇到了错误 " + (_0x4176f9.message || _0x4176f9));
    }
    return _0x115df2;
  }
  _initParams(_0x4743b5) {
    const _0x1753d4 = {
      version: "",
      appId: _0x4743b5?.["appId"] || "",
      fv: "",
      fp: "",
      ua: "",
      sua: "",
      av: "",
      url: "",
      og: "",
      referer: _0x4743b5?.["referer"] || "",
      pin: _0x4743b5?.["pin"] || "",
      cookie: _0x4743b5?.["cookie"] || ""
    };
    if (_0x4743b5?.["ua"]) {
      let _0x75a30d = _0x4743b5.ua,
        _0x2441bc = _0x75a30d.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        _0x3aa6ca = _0x75a30d.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      _0x2441bc?.["length"] > 0 && _0x3aa6ca?.["length"] > 0 && (_0x1753d4.ua = _0x75a30d, _0x1753d4.sua = _0x2441bc[1], _0x1753d4.av = _0x3aa6ca[0]);
    }
    if (!_0x1753d4.ua) {
      let _0x593724 = this._genUA(),
        _0x11cc9a = _0x593724.match(/^[\s\S]*?\(([\s\S]*?)\)/),
        _0x594367 = _0x593724.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
      _0x11cc9a?.["length"] > 0 && _0x594367?.["length"] > 0 && (_0x1753d4.ua = _0x593724, _0x1753d4.sua = _0x11cc9a[1], _0x1753d4.av = _0x594367[0]);
    }
    _0x1753d4.version = "4.2";
    _0x1753d4.fv = "h5_npm_v4.2.0";
    _0x1753d4.fp = this._fpMaps.get(_0x1753d4.ua) || "";
    !_0x1753d4.fp && (_0x1753d4.fp = this._makeFp(), _0x1753d4.ua.startsWith("jd") && this._fpMaps.set(_0x1753d4.ua, _0x1753d4.fp));
    if (_0x4743b5?.["url"]) {
      try {
        const _0x22f0a7 = new URL(_0x4743b5.url);
        _0x1753d4.url = _0x22f0a7.href;
        _0x1753d4.og = _0x22f0a7.origin;
      } catch {}
    }
    return _0x1753d4;
  }
  async _requestAlgo(_0x40dbb4) {
    try {
      const _0x38aadb = this._getExpandParamsData(_0x40dbb4);
      let _0x54ef40 = this._AESEncrypt(JSON.stringify(_0x38aadb, null, 2), this._algoKey);
      const _0x6feb3d = {
          version: _0x40dbb4.version,
          fp: _0x40dbb4.fp,
          appId: _0x40dbb4.appId,
          timestamp: Date.now(),
          platform: "web",
          expandParams: _0x54ef40,
          fv: _0x40dbb4.fv
        },
        _0x45da99 = {
          url: "https://cactus.jd.com/request_algo?g_ty=ajax",
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Origin: "https://cactus.jd.com",
            Host: "cactus.jd.com",
            Accept: "*/*",
            "User-Agent": _0x40dbb4?.["ua"] || "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
          },
          data: _0x6feb3d,
          proxy: null,
          timeout: 60000,
          debug: false
        };
      let _0xb98a62 = 0,
        _0x55195d = null;
      const _0x3b2f64 = 1;
      while (_0xb98a62 < _0x3b2f64) {
        const _0x48b58e = await common.request(_0x45da99);
        if (!_0x48b58e.success) {
          _0x55195d = "❌ getH5st request_algo 请求失败 ➜ " + _0x48b58e.error;
          _0xb98a62++;
          continue;
        }
        if (!_0x48b58e.data) {
          _0x55195d = "🚫 getH5st request_algo 请求失败 ➜ 无响应数据";
          _0xb98a62++;
          continue;
        }
        try {
          const _0x4b3642 = _0x48b58e.data;
          if (_0x4b3642?.["data"] && _0x4b3642?.["data"]?.["result"]) {
            const _0x2f55df = _0x4b3642.data.result?.["algo"],
              _0x9a5c96 = _0x4b3642.data.result?.["tk"];
            if (_0x2f55df && _0x9a5c96) {
              return {
                token: _0x9a5c96,
                algo: _0x2f55df
              };
            }
          }
          _0x55195d = "🚫 getH5st request_algo 请求异常 ➜ " + JSON.stringify(_0x4b3642);
        } catch (_0x39f78f) {
          _0x55195d = "❌ getH5st request_algo 在处理接口响应时遇到了错误 ➜ " + (_0x39f78f.message || _0x39f78f);
        }
        _0xb98a62++;
      }
      _0xb98a62 >= _0x3b2f64 && console.log(_0x55195d);
    } catch (_0x4bc85a) {
      console.log("❌ getH5st request_algo 在处理API请求时遇到了错误 " + (_0x4bc85a.message || _0x4bc85a));
    }
    return {
      token: "",
      algo: ""
    };
  }
  _getExpandParamsData(_0x1e52a1) {
    return {
      wc: 0,
      wd: 0,
      l: "zh-CN",
      ls: "zh-CN,zh",
      ml: 0,
      pl: 0,
      av: _0x1e52a1.av,
      ua: _0x1e52a1.ua,
      sua: _0x1e52a1.sua,
      pp: _0x1e52a1.pin ? {
        p1: _0x1e52a1.pin,
        p2: _0x1e52a1.pin
      } : {},
      extend: {
        pm: 0,
        wd: 0,
        l: 0,
        ls: 2,
        wk: 0,
        bu1: "9.9.9"
      },
      pp1: _0x1e52a1.pin ? "" : _0x1e52a1.cookie,
      pm: {
        ps: "prompt",
        np: "default"
      },
      w: 400,
      h: 700,
      ow: 400,
      oh: 700,
      url: _0x1e52a1.url,
      og: _0x1e52a1.og,
      pr: 1.25,
      re: _0x1e52a1.referer,
      random: this._makeRandomStr(10),
      referer: _0x1e52a1.referer,
      v: _0x1e52a1.fv,
      ai: _0x1e52a1.appId,
      fp: _0x1e52a1.fp
    };
  }
  _makeSign(_0x5e43e4, _0x1d6272, _0x5682a1, _0x4159cb) {
    try {
      const _0x2f3c96 = _0x4159cb.version,
        _0x317ffa = Date.now(),
        _0x2b387f = new Date(_0x317ffa),
        _0x254444 = "" + _0x2b387f.getFullYear() + String(_0x2b387f.getMonth() + 1).padStart(2, "0") + String(_0x2b387f.getDate()).padStart(2, "0") + String(_0x2b387f.getHours()).padStart(2, "0") + String(_0x2b387f.getMinutes()).padStart(2, "0") + String(_0x2b387f.getSeconds()).padStart(2, "0") + String(_0x2b387f.getMilliseconds()).padStart(3, "0");
      let _0x313a2d = Object.entries(_0x5e43e4).map(([_0x371f7c, _0x2ccdb8]) => {
          _0x371f7c === "body" && (_0x2ccdb8 = CryptoJS.SHA256(JSON.stringify(_0x2ccdb8)).toString());
          return {
            key: _0x371f7c,
            value: _0x2ccdb8
          };
        }),
        _0xb6a128 = "",
        _0x148a18 = "";
      const _0x561280 = _0x313a2d.map(_0x57ef54 => _0x57ef54.key + ":" + _0x57ef54.value).join("&"),
        _0x182dce = new Function("return ".concat(_0x5682a1))();
      let _0x588915 = _0x254444;
      _0x588915 += "74";
      let _0x2f1f0b;
      _0x2f1f0b = _0x182dce(_0x1d6272, _0x4159cb.fp, _0x588915, _0x4159cb.appId, CryptoJS).toString() || "";
      _0xb6a128 = CryptoJS.SHA256("".concat(_0x2f1f0b).concat(_0x561280).concat(_0x2f1f0b)).toString();
      let _0x36a882 = {};
      _0x36a882 = {
        sua: _0x4159cb.sua,
        pp: _0x4159cb.pin ? {
          p1: _0x4159cb.pin,
          p2: _0x4159cb.pin
        } : {},
        extend: {
          pm: 0,
          wd: 0,
          l: 0,
          ls: 2,
          wk: 0,
          bu1: "9.9.9"
        },
        random: this._makeRandomStr(10),
        referer: _0x4159cb.referer,
        v: _0x4159cb.fv,
        fp: _0x4159cb.fp
      };
      _0x148a18 = this._AESEncrypt(JSON.stringify(_0x36a882, null, 2), CryptoJS.enc.Utf8.parse("DNiHi703B0&17hh1"));
      const _0x2ad874 = ["".concat(_0x254444), "".concat(_0x4159cb.fp), "".concat(_0x4159cb.appId), "".concat(_0x1d6272), "".concat(_0xb6a128), "".concat(_0x2f3c96), "".concat(_0x317ffa), "".concat(_0x148a18)].join(";");
      return {
        _stk: _0x313a2d.map(_0x4141c7 => _0x4141c7.key).join(","),
        _ste: 1,
        h5st: _0x2ad874
      };
    } catch (_0x5c5c7c) {
      console.log("❌ getH5st 生成签名时遇到了错误 " + (_0x5c5c7c.message || _0x5c5c7c));
    }
    return {
      _stk: "",
      _ste: 0,
      h5st: ""
    };
  }
  _AESEncrypt(_0x2f7af4, _0x563b02) {
    const _0xb99bc4 = CryptoJS.enc.Utf8.parse(_0x2f7af4),
      _0xc122e0 = CryptoJS.AES.encrypt(_0xb99bc4, _0x563b02, {
        iv: this._ivKey,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(_0xc122e0.toString()));
  }
  _makeRandomStr(_0x33a875 = 32, _0x21e176 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
    const _0xec8d51 = _0x21e176.length;
    let _0x69df9c = "";
    for (let _0x49c8d4 = 0; _0x49c8d4 < _0x33a875; _0x49c8d4++) {
      _0x69df9c += _0x21e176.charAt(Math.floor(Math.random() * _0xec8d51));
    }
    return _0x69df9c;
  }
  _genUA() {
    function _0x4155ec(_0x527fc9 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x44b93c = "0123456789abcdef") {
      let _0x5e939a = "";
      for (let _0x5f3add of _0x527fc9) {
        if (_0x5f3add == "x") {
          _0x5e939a += _0x44b93c.charAt(Math.floor(Math.random() * _0x44b93c.length));
        } else {
          _0x5f3add == "X" ? _0x5e939a += _0x44b93c.charAt(Math.floor(Math.random() * _0x44b93c.length)).toUpperCase() : _0x5e939a += _0x5f3add;
        }
      }
      return _0x5e939a;
    }
    const _0x133f37 = _0x4155ec(),
      _0x5f2939 = ["jdapp", "iPhone", this._latestAppVersionData.version, "", "rn/" + _0x133f37, "M/5.0", "appBuild/" + this._latestAppVersionData.build, "jdSupportDarkMode/0", "ef/1", "ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Math.floor(Date.now() / 1000) + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D", "Mozilla/5.0 (iPhone; CPU iPhone OS " + this._latestIOSVersion.replace(".", "_") + " like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
      _0x4b5f20 = _0x5f2939.join(";");
    return _0x4b5f20;
  }
  _makeFp() {
    function _0x3b5020(_0x3c567a, _0x1afbd5) {
      return _0x3c567a + Math.floor(Math.random() * (_0x1afbd5 + 1 - _0x3c567a));
    }
    function _0x324827(_0x4acdd2, _0x5b8935) {
      for (var _0x419545 = [], _0x194754 = 0; _0x194754 < _0x4acdd2.length; _0x194754++) {
        var _0x3f3174 = _0x4acdd2[_0x194754];
        if (_0x3b5020(0, _0x4acdd2.length - _0x194754 - 1) < _0x5b8935 - _0x419545.length && (_0x419545.push(_0x3f3174), _0x419545.length == _0x5b8935)) {
          break;
        }
      }
      for (var _0x1eb34d = "", _0x22e102 = 0; _0x22e102 < _0x419545.length; _0x22e102 += 1) {
        var _0x356e9f = Math.random() * (_0x419545.length - _0x22e102) | 0;
        _0x1eb34d += _0x419545[_0x356e9f];
        _0x419545[_0x356e9f] = _0x419545[_0x419545.length - _0x22e102 - 1];
      }
      return _0x1eb34d;
    }
    function _0x186586(_0x7a582c, _0x17d907) {
      for (var _0x51c610 = 0; _0x51c610 < _0x17d907.length; _0x51c610 += 1) {
        var _0x17900a = _0x7a582c.indexOf(_0x17d907[_0x51c610]);
        -1 !== _0x17900a && (_0x7a582c = _0x7a582c.replace(_0x17d907[_0x51c610], ""));
      }
      return _0x7a582c;
    }
    var _0x3fe167 = "6d0jhqw3pa",
      _0x4a932d = _0x324827(_0x3fe167, 4),
      _0x4bdb0f = _0x3b5020(0, 9),
      _0x47a128 = _0x186586(_0x3fe167, _0x4a932d),
      _0x585f45 = {
        size: _0x4bdb0f,
        num: _0x47a128
      };
    var _0x3b5020 = this._makeRandomStr(_0x585f45.size, _0x585f45.num) + _0x4a932d + this._makeRandomStr(12 - _0x4bdb0f - 1, _0x47a128) + _0x4bdb0f,
      _0xc29941 = _0x3b5020.split(""),
      _0x1c1ae4 = _0xc29941.slice(0, 14),
      _0x449bc3 = _0xc29941.slice(14),
      _0x397ff7 = [];
    while (_0x1c1ae4.length > 0) {
      _0x397ff7.push((35 - parseInt(_0x1c1ae4.pop(), 36)).toString(36));
    }
    _0x397ff7 = _0x397ff7.concat(_0x449bc3);
    return _0x397ff7.join("");
  }
}
const H5st2 = new H5st42();