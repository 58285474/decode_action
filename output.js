//Fri Jul 05 2024 00:52:23 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  opencard_draw = process.env.jd_opencard_draw || 3,
  hotbreak = process.env.jd_opencard_break === "true",
  isNotify = process.env.jd_opencard_notify === "true",
  common = require("./utils/Rebels_jdCommon.js"),
  getToken = require("./utils/Rebels_Token.js"),
  {
    lzdz1_savePrize
  } = require("./utils/Rebels_savePrize.js");
common.getProxyStatus() === "关闭" ? $.waitTime = 1000 : $.waitTime = 0;
let domains = "https://lzdz1-isv.isvjcloud.com",
  cookie = "",
  activityCookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(_0x4809f7 => jdCookie[_0x4809f7]).filter(_0x1ee96a => _0x1ee96a);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  authorCodeList = await getAuthorCodeList("http://code.257999.xyz/jd_joinCommon_opencard530.json");
  if (authorCodeList) {
    $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  } else {
    let _0x386991 = [""];
    $.authorCode = _0x386991[random(0, _0x386991.length)];
  }
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  console.log("代理开关: [" + common.getProxyStatus() + "]");
  console.log("间隔时长: [" + ($.waitTime === 0 ? "无" : $.waitTime / 1000 + "秒") + "]运行间隔时长");
  console.log("抽奖次数: [" + opencard_draw + "次]");
  console.log("IP限制后继续执行: [" + (hotbreak ? "开启" : "关闭") + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  $.activityId = "af0b222dc38946739e9607dc91e73d5d";
  $.activityUrl = "https://lzdz1-isv.isvjcloud.com/dingzhi/joinCommon/activity/activity?activityId=" + $.activityId;
  $.shareUuid = $.authorCode;
  notify.config({
    title: $.name
  });
  for (let _0x405d9e = 0; _0x405d9e < cookiesArr.length; _0x405d9e++) {
    $.index = _0x405d9e + 1;
    cookie = cookiesArr[_0x405d9e];
    originCookie = cookiesArr[_0x405d9e];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await run();
    common.unsetCookie();
    if ($.outFlag || $.activityEnd) {
      break;
    }
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n"), await notify.push());
})().catch(_0x28ed62 => $.logErr(_0x28ed62)).finally(() => $.done());
async function run() {
  try {
    $.skipRun = false;
    $.hasEnd = false;
    $.drawStop = false;
    $.endTime = 0;
    $.Token = "";
    $.Pin = "";
    $.venderId == "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    if ($.activityEnd === true) {
      return;
    }
    if ($.outFlag) {
      console.log("IP被限制（493）\n");
      return;
    }
    await takePostRequest("init");
    if ($.venderId == "") {
      console.log("缺少必要参数，请重新运行");
      return;
    }
    await $.wait(parseInt($.waitTime * 1 + 100, 10));
    await takePostRequest("getMyCidPing");
    if (!$.Pin) {
      console.log("获取用户信息失败，请重新运行");
      return;
    }
    await $.wait(parseInt($.waitTime * 1 + 100, 10));
    await takePostRequest("accessLogWithAD");
    await $.wait(parseInt($.waitTime * 1 + 100, 10));
    await takePostRequest("activityContent");
    if ($.hotFlag) {
      return;
    }
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动已经结束了，下次早点来吧~");
      return;
    }
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      const _0x17b717 = $.time("yyyy-MM-dd HH:mm", $.startTime),
        _0x1c0800 = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log(($.activityName && "活动名称：#" + $.activityName + "\n") + "活动ID：" + $.activityId);
      console.log("开始时间：" + _0x17b717 + "\n结束时间：" + _0x1c0800 + "\n当前已邀请" + $.assistCount + "人，金币" + $.score + "枚\n");
      const _0x39efae = Date.now();
      if ($.startTime && _0x39efae < $.startTime) {
        console.log("活动将在 " + _0x17b717 + " 开始，晚点再来吧~");
        $.activityEnd = true;
        return;
      }
      if ($.endTime && _0x39efae > $.endTime) {
        console.log("活动已于 " + _0x1c0800 + " 结束，下次早点来吧~");
        $.activityEnd = true;
        return;
      }
    }
    console.log("助力码：" + $.actorUuid);
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("taskInfo");
    await $.wait(parseInt($.waitTime * 1 + 100, 10));
    if ($.taskInfo) {
      for (let _0x2014d3 in $.taskInfo) {
        switch (_0x2014d3) {
          case "1":
            $.opencard_list = $.taskInfo[_0x2014d3].settingInfo;
            break;
        }
      }
    }
    await takePostRequest("taskRecord");
    if ($.taskRecord) {
      for (let _0x16f3d5 in $.taskRecord) {
        if (_0x16f3d5 == "1") {
          continue;
        }
        let _0x9d5663 = $.taskRecord[_0x16f3d5];
        if (_0x9d5663?.["recordCount"] > 0) {
          continue;
        }
        if (_0x9d5663?.["taskBeans"] === 0 && _0x9d5663?.["taskScore"] === 0) {
          continue;
        }
        switch (_0x16f3d5) {
          case "20":
          case "23":
          case "24":
            $.taskType = $.taskRecord[_0x16f3d5]?.["taskType"];
            await takePostRequest("doTask");
            await $.wait(parseInt($.waitTime * 1 + 100, 10));
            break;
        }
      }
    }
    await $.wait(500);
    await takePostRequest("assist");
    await $.wait(parseInt($.waitTime * 1 + 100, 10));
    if ($.assist?.["openCardInfo"]?.["openAll"] != true) {
      let _0x3eca11 = $.assist?.["openCardInfo"]?.["openVenderId"] || [];
      console.log("共有" + $.opencard_list.length + "张卡,还需开" + ($.opencard_list.length - _0x3eca11.length) + "张卡");
      for (let _0x43232d of $.opencard_list) {
        $.openUrl = _0x43232d.toUrl;
        $.openName = _0x43232d.name;
        $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
        (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = _0x43232d.value || _0x43232d.venderId);
        if (_0x3eca11.includes(Number(_0x43232d.value))) {
          continue;
        }
        const _0x56d32b = await common.joinShopMember($.joinVenderId);
        if (_0x56d32b) {
          console.log("加入[" + $.openName + "]店铺会员成功");
          await $.wait(parseInt($.waitTime * 1 + 100, 10));
        } else {
          console.log("[" + $.openName + "]店铺开卡失败,跳过执行~");
          return;
        }
        await $.wait(parseInt($.waitTime * 1 + 100, 10));
      }
      await takePostRequest("assist");
      await $.wait(parseInt($.waitTime * 1 + 100, 10));
    }
    if (opencard_draw && !$.drawStop) {
      await takePostRequest("activityContent");
      let _0xd0aadd = parseInt($.score / 100),
        _0x1e1e37 = Math.min(opencard_draw, _0xd0aadd);
      $.prize = [];
      console.log("已设置抽奖" + opencard_draw + "次,共有" + _0xd0aadd + "次抽奖,可抽奖" + _0x1e1e37 + "次");
      for (m = 1; _0x1e1e37--; m++) {
        await takePostRequest("startDraw");
        if (Number(_0x1e1e37) <= 0) {
          break;
        }
        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
        await $.wait(parseInt($.waitTime * 1 + 2000, 10));
      }
      $.prize.length && console.log("抽奖获得: " + $.prize.join(", ") + "\n");
    }
    if ($.outFlag) {
      console.log("IP被限制（493）\n");
      return;
    }
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力 -> " + $.shareUuid));
    if ($.index % 5 == 0) {
      await $.wait(parseInt($.waitTime * 15 + 5000, 10));
    }
  } catch (_0x12386a) {
    console.log(_0x12386a);
  }
}
async function takePostRequest(_0x431ad9) {
  if ($.outFlag) {
    return;
  }
  let _0x361725 = "",
    _0x5923bb = null,
    _0x349922 = "POST";
  switch (_0x431ad9) {
    case "init":
      _0x361725 = domains + "/dingzhi/taskact/common/init";
      _0x5923bb = "activityId=" + $.activityId + "&dzActivityType=0&adSource=&pin=";
      break;
    case "getMyCidPing":
      _0x361725 = domains + "/customer/getMyCidPing";
      _0x5923bb = "activityId=" + $.activityId + "&token=" + $.Token + "&fromType=APP_shopGift&userId=" + $.venderId + "&pin=";
      break;
    case "accessLogWithAD":
      _0x361725 = domains + "/common/accessLogWithAD";
      let _0x3d5fc4 = domains + "/m/unite/dzlh0001/?activityId=" + $.activityId + "&venderId=" + $.venderId + "&shareUuid=" + $.shareUuid;
      _0x5923bb = "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x3d5fc4) + "&subType=app&adSource=";
      break;
    case "activityContent":
      _0x361725 = domains + "/dingzhi/joinCommon/activityContent";
      _0x5923bb = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=" + $.shareUuid;
      break;
    case "taskInfo":
      _0x361725 = domains + "/dingzhi/joinCommon/taskInfo";
      _0x5923bb = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;
    case "assist":
      _0x361725 = domains + "/dingzhi/joinCommon/assist";
      _0x5923bb = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&shareUuid=" + $.shareUuid;
      break;
    case "taskRecord":
      _0x361725 = domains + "/dingzhi/joinCommon/taskRecord";
      _0x5923bb = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&uuid=" + $.actorUuid + "&taskType=";
      break;
    case "doTask":
      _0x361725 = domains + "/dingzhi/joinCommon/doTask";
      _0x5923bb = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin) + "&taskType=" + $.taskType + "&taskValue=";
      break;
    case "startDraw":
      _0x361725 = domains + "/dingzhi/joinCommon/startDraw";
      _0x5923bb = "activityId=" + $.activityId + "&uuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;
    default:
      console.log("错误" + _0x431ad9);
  }
  const _0x553fb5 = {
    url: _0x361725,
    method: _0x349922,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: activityCookie.trim(),
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      Origin: "https://lzdz1-isv.isvjcloud.com/",
      Referer: domains
    },
    data: _0x5923bb,
    timeout: 20000
  };
  _0x349922 === "GET" && (delete _0x553fb5.body, delete _0x553fb5.headers["Content-Type"]);
  const _0x5085ec = 5;
  let _0x378176 = 0,
    _0x448e5d = null,
    _0x4dc1e0 = false;
  while (_0x378176 < _0x5085ec) {
    _0x378176 > 0 && (await $.wait(1000));
    const _0x9257ae = await common.request(_0x553fb5);
    if (!_0x9257ae.success) {
      _0x448e5d = _0x431ad9 + " 请求失败 ➜ " + _0x9257ae.error;
      _0x378176++;
      _0x9257ae.status && [403, 493].includes(_0x9257ae.status) && (_0x4dc1e0 = true);
      continue;
    }
    if (["accessLog", "accessLogWithAD"].includes(_0x431ad9)) {
      break;
    }
    if (!_0x9257ae.data) {
      _0x448e5d = _0x431ad9 + " 请求失败 ➜ 无响应数据";
      _0x378176++;
      continue;
    }
    const _0x4c7fa2 = common.getResponseCookie(_0x9257ae, activityCookie);
    let _0x47faa1 = "";
    switch (_0x431ad9) {
      case "getMyCidPing":
        _0x47faa1 = common.getCookieValue(_0x4c7fa2, "LZ_AES_PIN");
        _0x47faa1 ? $.LZ_AES_PIN = _0x47faa1 : (console.log("获取 LZ_AES_PIN 失败！"), $.skipRun = true);
        break;
    }
    ["getMyCidPing", "taskInfo", "startDraw"].includes(_0x431ad9) && (activityCookie = _0x4c7fa2);
    _0x47faa1 = common.getCookieValue(activityCookie, "LZ_AES_PIN");
    !_0x47faa1 && $.LZ_AES_PIN && (activityCookie += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
    const _0x16dedc = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    !_0x16dedc && $.LZ_TOKEN_KEY && (activityCookie += "LZ_TOKEN_KEY=" + $.LZ_TOKEN_KEY + "; ");
    const _0x2dc1a9 = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    !_0x2dc1a9 && $.LZ_TOKEN_VALUE && (activityCookie += "LZ_TOKEN_VALUE=" + $.LZ_TOKEN_VALUE + "; ");
    await handleResponse(_0x431ad9, _0x9257ae.data);
    _0x4dc1e0 = false;
    break;
  }
  _0x378176 >= _0x5085ec && (console.log(_0x448e5d), _0x4dc1e0 && !["getMyCidPing", "taskInfo", "accessLogWithAD", "accessLog"].includes(_0x431ad9) && !hotbreak && ($.outFlag = true));
}
async function handleResponse(_0x122e27, _0x2cff11) {
  try {
    switch (_0x122e27) {
      case "init":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            $.shopId = _0x2cff11.data?.["shopId"];
            $.venderId = _0x2cff11.data?.["venderId"];
            $.startTime = _0x2cff11.data?.["startTime"];
            $.endTime = _0x2cff11.data?.["endTime"];
            $.activityType = _0x2cff11.data?.["activityType"];
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "getMyCidPing":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            if (_0x2cff11.data && typeof _0x2cff11.data?.["secretPin"] != "undefined") {
              $.Pin = _0x2cff11.data?.["secretPin"];
            }
            if (_0x2cff11.data && typeof _0x2cff11.data?.["nickname"] != "undefined") {
              $.nickname = _0x2cff11.data?.["nickname"];
            }
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "activityContent":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            $.activityName = _0x2cff11.data?.["activityName"] || "";
            $.endTime = _0x2cff11.data?.["endTime"] || _0x2cff11.data?.["activityVo"] && _0x2cff11.data?.["activityVo"]?.["endTime"] || _0x2cff11.data?.["activity"]?.["endTime"] || 0;
            $.hasEnd = _0x2cff11.data?.["isEnd"] || false;
            $.score = _0x2cff11.data?.["actorInfo"]?.["score"] || 0;
            $.actorUuid = _0x2cff11.data?.["actorInfo"]?.["uuid"] || "";
            $.assistCount = _0x2cff11.data?.["actorInfo"]?.["assistCount"] || 0;
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "assist":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            $.assist = _0x2cff11.data;
            if ($.assist) {
              $.assist?.["openCardInfo"]?.["hasNewOpen"] && console.log("开卡获得了" + ($.assist?.["openCardInfo"]?.["beans"] || 0) + "京豆");
              if ($.assist?.["openCardInfo"]?.["openAll"] == true) {
                console.log("已经全部开卡");
                switch ($.assist?.["assistState"]) {
                  case "":
                  case undefined:
                  case 0:
                    break;
                  case 1:
                    console.log("✅ 助力成功");
                    break;
                  case 2:
                  case 10:
                    console.log("已经助力过了哟~");
                    break;
                  case 3:
                  case 11:
                    console.log("已助力其他人~");
                    break;
                  case 20:
                    console.log("未全部开卡");
                    break;
                  case 21:
                    console.log("未全部开卡和关注");
                    break;
                  case 22:
                    console.log("不是新会员");
                    break;
                  case 77:
                    console.log("未关注");
                    break;
                  case 88:
                    console.log("未加入会员并关注店铺");
                    break;
                  case 99:
                    console.log("未加入会员");
                    break;
                  default:
                    console.log("未知助力返回码");
                    break;
                }
                return;
              }
            }
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "taskRecord":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            $.taskRecord = _0x2cff11.data;
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "taskInfo":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            $.taskInfo = _0x2cff11.data;
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "doTask":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            let _0x2affce = "任务完成";
            _0x2cff11?.["data"]?.["beans"] > 0 && (_0x2affce += "," + (_0x2cff11?.["data"]?.["beans"] || 0) + "京豆");
            _0x2cff11?.["data"]?.["score"] > 0 && (_0x2affce += "," + (_0x2cff11?.["data"]?.["score"] || 0) + "金币");
            console.log(_0x2affce);
          } else {
            _0x2cff11.errorMessage ? console.log("" + (_0x2cff11.errorMessage || "")) : console.log("" + _0x2cff11);
          }
        } else {
          console.log("" + _0x2cff11);
        }
        break;
      case "startDraw":
        if (typeof _0x2cff11 == "object") {
          if (_0x2cff11.result && _0x2cff11.result === true) {
            if (_0x2cff11.data?.["wdsrvo"]?.["drawState"]) {
              const _0x52e2a3 = _0x2cff11.data?.["wdsrvo"];
              if (_0x52e2a3) {
                switch (_0x52e2a3.drawType) {
                  case 6:
                    $.prize.push("🎉 " + _0x52e2a3.drawName + " 🐶");
                    break;
                  case 7:
                    const _0x30a171 = domains + "/dingzhi/joinCommon/saveAddress",
                      _0xd2db7b = _0x52e2a3.addressId,
                      _0x3759b6 = _0x52e2a3.drawName;
                    $.prize.push("🎉 恭喜获得实物,奖品名称：" + _0x3759b6);
                    const _0x408d1b = {
                        baseUrl: domains,
                        saveAddressurl: _0x30a171,
                        uuid: $.actorUuid,
                        cookie: activityCookie,
                        ua: $.UA,
                        activityId: $.activityId,
                        activityType: 99,
                        venderId: $.venderId,
                        secretPin: $.Pin,
                        prizeName: _0x3759b6,
                        itemsId: _0xd2db7b,
                        activityUrl: $.activityUrl
                      },
                      _0x27750b = await lzdz1_savePrize(_0x408d1b);
                    _0x27750b && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + _0x3759b6 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    break;
                  case 8:
                    $.prize.push("🗑️ 专享价");
                    break;
                  case 9:
                    $.prize.push("🗑️ " + _0x52e2a3.drawName + " 🎟️");
                    break;
                  case 13:
                  case 14:
                  case 15:
                    $.prize.push("🎉 恭喜获得" + _0x52e2a3.drawName + " 🎁");
                    await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + _0x52e2a3.drawName + "\n\n" + $.activityUrl);
                    break;
                  case 16:
                    $.prize.push("🎉 " + _0x52e2a3.priceInfo + " 🧧");
                    break;
                  default:
                    _0x52e2a3.drawName.includes("券") ? $.prize.push("🗑️ 优惠券") : $.prize.push("获得：" + _0x52e2a3.drawName);
                    break;
                }
              }
            } else {
              $.prize.push("💨 空气");
            }
          } else {
            _0x2cff11.errorMessage && ($.drawError = _0x2cff11.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(_0xb214c1 => $.drawError.includes(_0xb214c1)) && ($.drawStop = true, $.prize.push($.drawError)), ["未开始", "结束", "不存在", "不在"].some(_0x2929b5 => $.drawError.includes(_0x2929b5)) && ($.activityEnd = true), ["会员", "开卡"].some(_0x4e5599 => $.drawError.includes(_0x4e5599)) && ($.needJoinMember = true, $.prize.push($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(_0x5aa923 => $.drawError.includes(_0x5aa923)) && !$.drawStop && !$.needJoinMember && $.prize.push($.drawError || ""));
          }
        } else {
          console.log("❓" + _0x122e27 + " " + JSON.stringify(_0x2cff11));
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(_0x122e27 + "-> " + _0x2cff11);
    }
    typeof _0x2cff11 == "object" && _0x2cff11.errorMessage && _0x2cff11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x586d66) {
    console.log(_0x586d66);
  }
}
async function getCk() {
  $.skipRun = true;
  const _0x2ed8d0 = {
      url: $.activityUrl,
      method: "GET",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        Referer: domains,
        "User-Agent": $.UA
      },
      timeout: 30000
    },
    _0x3d302c = 3;
  let _0x5a67c9 = 0,
    _0x19fef4 = null,
    _0x475ed6 = false;
  while (_0x5a67c9 < _0x3d302c) {
    _0x5a67c9 > 0 && (await $.wait(1000));
    const _0x5c2aba = await common.request(_0x2ed8d0);
    if (!_0x5c2aba.success) {
      _0x19fef4 = "getCk ➜ " + _0x5c2aba.error;
      _0x5a67c9++;
      _0x5c2aba.status && [403, 493].includes(_0x5c2aba.status) && (_0x475ed6 = true);
      continue;
    }
    if (!_0x5c2aba.data) {
      _0x19fef4 = "getCk ➜ 无响应数据";
      _0x5a67c9++;
      continue;
    }
    _0x5c2aba.data.match(/(活动已经结束)/) && _0x5c2aba.data.match(/(活动已经结束)/)[1] && ($.activityEnd = true, console.log("活动已结束或不存在"));
    _0x5c2aba.data.match(/(活动未开始)/) && _0x5c2aba.data.match(/(活动未开始)/)[1] && ($.activityEnd = true, console.log("您来的太早了,活动尚未开始"));
    activityCookie = common.getResponseCookie(_0x5c2aba);
    let _0x36f1ce = "",
      _0x3e17fc = "";
    _0x36f1ce = common.getCookieValue(activityCookie, "LZ_TOKEN_KEY");
    _0x3e17fc = common.getCookieValue(activityCookie, "LZ_TOKEN_VALUE");
    _0x36f1ce && ($.LZ_TOKEN_KEY = _0x36f1ce);
    _0x3e17fc && ($.LZ_TOKEN_VALUE = _0x3e17fc);
    $.skipRun = false;
    break;
  }
  _0x5a67c9 >= _0x3d302c && (console.log(_0x19fef4), _0x475ed6 && !hotbreak && ($.outFlag = true));
}
async function getAuthorCodeList(_0x58921) {
  const _0xf44a9c = await common.request({
      url: _0x58921,
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      proxy: null,
      debug: false,
      timeout: 30000
    }),
    _0x2a871c = _0xf44a9c.data;
  return _0x2a871c;
}
function random(_0x905ee9, _0x464fda) {
  return Math.floor(Math.random() * (_0x464fda - _0x905ee9)) + _0x905ee9;
}