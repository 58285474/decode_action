//Tue Sep 24 2024 02:12:18 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  {
    jinggeng_savePrize
  } = require("./utils/Rebels_savePrize");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_jinggeng_exchangeActDetail_url // 活动链接");
console.log("jd_jinggeng_exchangeActDetail_Notify // 是否通知（true/false），默认不通知");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const activityUrl = process.env.jd_jinggeng_exchangeActDetail_url || "",
  isNotify = process.env.jd_jinggeng_exchangeActDetail_Notify === "true";
let sid = common.genRandomString(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  un_area = common.genRandomString(1, "1234567890") + "-" + common.genRandomString(4, "1234567890") + "-" + common.genRandomString(4, "1234567890") + "-" + common.genRandomString(5, "1234567890");
let JSDOM = null,
  cookie = "",
  activityCookie = "",
  originCookie = "";
const cookiesArr = Object.keys(jdCookie).map(llliii => jdCookie[llliii]).filter(IllI11 => IllI11);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!activityUrl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const II1llI = common.parseUrl(activityUrl);
  if (!II1llI) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = activityUrl;
  $.activityId = common.getUrlParameter(activityUrl, "actId") || common.getUrlParameter(activityUrl, "id");
  $.venderId = common.getUrlParameter(activityUrl, "userId") || common.getUrlParameter(activityUrl, "user_id");
  $.hostname = II1llI.hostname;
  $.pathname = II1llI.pathname;
  $.baseUrl = "https://" + $.hostname;
  if (!$.activityId || !$.venderId || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  notify.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let liIll = 0; liIll < cookiesArr.length; liIll++) {
    $.index = liIll + 1;
    cookie = cookiesArr[liIll];
    originCookie = cookiesArr[liIll];
    common.setCookie(originCookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.UUID = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动地址】" + $.activityUrl), await notify.push());
})().catch(iI1liI => $.logErr(iI1liI)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.retry = false;
    activityCookie = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await getToken(originCookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await sendRequest("setMixNick");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await sendRequest("home");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    await $.wait(1000);
    if ($.index === 1) {
      console.log(($.shopName && "店铺名称：#" + $.shopName + "[" + ($.actName || "积分兑换") + "]") + "\n店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动条件：消耗" + $.removePoint + "积分可兑换\n活动规则：\n" + $.rule.join("\n") + "\n");
      notify.appendContent(($.shopName ? "\n【店铺名称】#" + $.shopName : "") + "\n活动条件：消耗" + $.removePoint + "积分可兑换\n活动规则：\n" + $.rule.join("\n") + "\n");
      if ($.runEnd || $.outFlag || $.skipRun) return;
    }
    await sendRequest("followShop");
    await $.wait(1000);
    await sendRequest("postQlExchange");
    await $.wait(3000);
    $.retry && (await sendRequest("postQlExchange"), await $.wait(3000));
  } catch (iI1lii) {
    console.log("❌ 脚本运行遇到了错误\n" + iI1lii);
  }
}
async function handleResponse(IilIii, iI1lil) {
  try {
    switch (IilIii) {
      case "followShop":
        if (iI1lil && iI1lil.succ) {} else iI1lil.msg ? console.log("" + iI1lil.msg) : ($.skipRun = true, console.log("❓" + IilIii + " " + JSON.stringify(iI1lil)));
        break;
      case "setMixNick":
        if (iI1lil && iI1lil.succ) $.token = iI1lil.msg;else iI1lil.msg ? (console.log("" + iI1lil.msg), ["商家token过期"].includes(iI1lil.msg) && ($.runEnd = true)) : ($.skipRun = true, console.log("❓" + IilIii + " " + JSON.stringify(iI1lil)));
        break;
      case "home":
        if (iI1lil) {
          let llll1 = iI1lil.match(/(活动已结束)/) && iI1lil.match(/(活动已结束)/)[1] || "";
          if (llll1) {
            $.runEnd = true;
            console.log("活动已结束，下次早点来吧~");
            $.message.fix("活动已结束");
            return;
          }
          if (!JSDOM) JSDOM = require("jsdom")?.["JSDOM"];
          const lil11l = new JSDOM(iI1lil);
          $.actName = lil11l.window.document.getElementById("actName")?.["value"] || "";
          $.shopName = lil11l.window.document.getElementById("shop_title")?.["value"] || "";
          $.venderId = lil11l.window.document.getElementById("vender_id")?.["value"] || "";
          $.description = lil11l.window.document.getElementById("description")?.["innerHTML"] || "";
          $.rule = $.description.split("<br>").filter(I1lIl1 => I1lIl1);
          $.removePoint = lil11l.window.document.getElementById("removePoint")?.["value"] || 0;
        } else console.log("❓" + IilIii + " " + JSON.stringify(iI1lil));
        break;
      case "postQlExchange":
        if (iI1lil && iI1lil.succ) {
          let IlIIl = JSON.parse(iI1lil.msg)?.["drawAwardDto"],
            lI1liI = IlIIl?.["awardType"];
          switch (lI1liI) {
            case "JD_BEAN":
              console.log("🎉 " + IlIIl?.["awardName"] + " 🐶"), $.message.insert("🎉 " + IlIIl?.["awardName"] + " 🐶");
              break;
            case "JD_POINT":
              console.log("🗑️ " + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"] + " 🎟️"), $.message.insert("🗑️ " + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"] + " 🎟️");
              break;
            case "JD_COUPON":
              console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
              break;
            case "JD_GOODS":
              const i1i1Ii = JSON.parse(iI1lil.msg).actLogId,
                lllii = IlIIl.awardName;
              console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + lllii);
              const iI11Ii = {
                  "baseUrl": $.baseUrl,
                  "cookie": activityCookie,
                  "ua": $.UA,
                  "venderId": $.venderId,
                  "prizeName": lllii,
                  "orderCode": i1i1Ii,
                  "activityUrl": $.activityUrl
                },
                iIII1l = await jinggeng_savePrize(iI11Ii);
              !isNotify && iIII1l && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + lllii + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(lllii + "(" + (iIII1l ? "已填地址" : "未填地址") + ")🎁");
              break;
            case "JD_J_COUPON":
              console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
              break;
            case "JD_D_COUPON":
              console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
              break;
            case "JD_AIQIYI":
              console.log("🎉 爱奇艺"), $.message.insert("🎉 爱奇艺");
              break;
            case "JD_PLUS":
              console.log("🎉 PLUS会员"), $.message.insert("🎉 PLUS会员");
              break;
            case "JD_E_CARD":
              console.log("🎉 E卡：" + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"]), $.message.insert("🎉 E卡：" + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"]);
              break;
            case "JD_REDBAG":
              console.log("🎉️ 红包：" + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"]), $.message.insert("🎉️ 红包：" + IlIIl?.["awardSendNum"] + IlIIl?.["awardName"]);
              break;
            default:
              console.log(IlIIl);
              break;
          }
        } else {
          iI1lil.msg.includes("未中奖") ? (console.log("💨 空气"), $.message.insert("💨 空气")) : (console.log("" + iI1lil.msg), $.message.insert("" + iI1lil.msg));
          err = iI1lil.msg;
          for (let iI11Il of ["不足", "火爆", "上限", "次数", "部分会员"]) {
            if (err.includes(iI11Il)) {
              $.skipRun = true;
              break;
            }
          }
          for (let iil1i1 of ["休息", "太快了"]) {
            if (err.includes(iil1i1)) {
              $.retry = true;
              break;
            }
          }
        }
        break;
    }
  } catch (IlIll1) {
    console.log("❌ 未能正确处理 " + IilIii + " 请求响应 " + (IlIll1.message || IlIll1));
  }
}
async function sendRequest(ilil1l) {
  if ($.runEnd || $.outFlag) return;
  let I1lIii = $.baseUrl,
    IiI1I = {},
    illlIl = "POST";
  switch (ilil1l) {
    case "setMixNick":
      I1lIii += "/front/setMixNick", IiI1I = "strTMMixNick=" + $.jdToken + "&userId=" + $.venderId + "&source=01";
      break;
    case "followShop":
      I1lIii += "/front/followShop", IiI1I = "userId=" + $.venderId;
      break;
    case "home":
      illlIl = "GET", I1lIii += "/ql/front/exchangeActDetail?actId=" + $.activityId + "&userId=" + $.venderId + "&sid=" + sid + "&un_area=" + un_area;
      break;
    case "postQlExchange":
      I1lIii += "/ql/front/postQlExchange", IiI1I = "act_id=" + $.activityId + "&user_id=" + $.venderId;
      break;
    default:
      console.log("❌ 未知请求 " + ilil1l);
      return;
  }
  const i11ill = {
    "url": I1lIii,
    "method": illlIl,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": activityCookie.trim(),
      "Host": $.hostname,
      "Origin": $.baseUrl,
      "Referer": $.activityUrl,
      "User-Agent": $.UA
    },
    "body": IiI1I,
    "timeout": 30000
  };
  illlIl === "GET" && (delete i11ill.body, delete i11ill.headers["Content-Type"]);
  ilil1l === "home" && (i11ill.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
  const IIIIIi = 5;
  let IIIIIl = 0,
    I1lIil = null,
    IIIl1i = false;
  while (IIIIIl < IIIIIi) {
    IIIIIl > 0 && (await $.wait(1000));
    const I1lIiI = await common.request(i11ill);
    if (!I1lIiI.success) {
      I1lIil = "🚫 " + ilil1l + " 请求失败 ➜ " + I1lIiI.error;
      IIIIIl++;
      continue;
    }
    if (!I1lIiI?.["data"]) {
      I1lIil = "🚫 " + ilil1l + " 请求失败 ➜ 无响应数据";
      IIIIIl++;
      continue;
    }
    const lllili = common.getResponseCookie(I1lIiI, activityCookie);
    if (["setMixNick"].includes(ilil1l)) {
      activityCookie = lllili;
    }
    handleResponse(ilil1l, I1lIiI.data);
    IIIl1i = false;
    break;
  }
  IIIIIl >= IIIIIi && (console.log(I1lIil), IIIl1i && ($.outFlag = true, $.message && $.message.fix(I1lIil)));
}