//Tue Jul 02 2024 15:09:35 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const IIi1II = $.isNode() ? require("./jdCookie") : "",
  li1lIl = require("./function/jdCommon"),
  li1lIi = require("./function/sendJDNotify"),
  IiIIil = require("./function/krgetToken"),
  {
    wuxian_savePrize: iilill
  } = require("./function/krsavePrize"),
  IiIIii = require("crypto-js");
let lIiili = [];
const lIiill = process.env.LUCK_DRAW_URL || "",
  iilili = process.env.LUCK_DRAW_OPENCARD === "true",
  Il1lIi = process.env.LUCK_DRAW_NOTIFY === "true",
  l1IIIi = process.env.LUCK_DRAW_BREAK === "true",
  i111i1 = process.env.LUCK_DRAW_CONC === "true",
  l1IlI = process.env.LUCK_DRAW_CONC_THREADS || "3";
let l1IIIl = process.env.LUCK_DRAW_CONC_RETRY || "0";
const IiliI1 = process.env.LUCK_DRAW_INTERVAL || "";
let Iiii11 = process.env.LUCK_DRAW_MAX_MISS || "",
  l11I = 7;
process.env.LUCK_DRAW_NUM && process.env.LUCK_DRAW_NUM != 7 && (l11I = process.env.LUCK_DRAW_NUM);
let llllli = true,
  iiiii1 = process.env.LUCK_DRAW_Number ? process.env.LUCK_DRAW_Number : "11",
  IIill1 = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true",
  iIII = process.env.JD_CJ_OPEN ? process.env.JD_CJ_OPEN : "true",
  iI1I1 = "",
  Ii11iI = "",
  IiliII = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(IIi1II).forEach(l1Ili => {
    lIiili.push(IIi1II[l1Ili]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lIiili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(i1II11 => i1II11.cookie)].filter(l1Ill => !!l1Ill);
!lIiili[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
let Iiii1I = "",
  II1il1 = "";
$.whitelist = process.env.LUCK_DRAW_WHITELIST || Iiii1I;
$.blacklist = process.env.LUCK_DRAW_BLACKLIST || II1il1;
IIillI();
I1I1I();
!(async () => {
  if (!lIiill) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const Iiii1l = li1lIl.parseUrl(lIiill);
  if (!Iiii1l) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = lIiill;
  $.activityId = li1lIl.getUrlParameter(lIiill, "activityId");
  $.hostname = Iiii1l?.["hostname"];
  if ($.hostname) {
    if ($.hostname.includes("cjhy")) {
      if (iIII === "false") {
        console.log("\n❌  已设置全局关闭CJ相关活动\n");
        return;
      } else $.activityMode = "cjhy";
    } else {
      if ($.hostname.includes("lzkj")) {
        if (IIill1 === "false") {
          console.log("\n❌  已设置全局关闭LZ相关活动\n");
          return;
        } else $.activityMode = "lzkj", $.hostname = "lzkj-isv.isvjd.com";
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityMode || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  Iiii1l?.["pathname"]["includes"]("lzclient") && ($.activityUrl = $.baseUrl + "/wxDrawActivity/activity/activity?activityId=" + $.activityId);
  try {
    l1IIIl = parseInt(l1IIIl) > 0 ? parseInt(l1IIIl) : 0;
  } catch {
    l1IIIl = 0;
  }
  try {
    Iiii11 = parseInt(Iiii11);
  } catch {
    Iiii11 = 0;
  }
  $.drawIntervalTimes = $.activityMode === "cjhy" ? 1000 : 500;
  if (IiliI1) {
    try {
      const IIilil = parseInt(IiliI1) * 1000;
      $.drawIntervalTimes = IIilil;
    } catch {
      console.log("自定义抽奖间隔格式错误，已使用默认值");
    }
  }
  li1lIi.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  console.log("\n是否推送通知【" + (Il1lIi == true ? "通知" : "不通知") + "】 是否开卡 【" + (iilili == true ? "开卡" : "不开卡") + "】");
  console.log("\n当前设定连续 【" + iiiii1 + "】 次无抽奖次数跳出");
  console.log("\n当前设定 493 是否继续运行【" + (l1IIIi == true ? "不退出" : "退出") + "】");
  if (!i111i1) {
    for (let i1II1l = 0; i1II1l < l11I; i1II1l++) {
      if (i1II1l > iiiii1 && llllli) {
        console.log("\n检测到多次无抽奖次数，跳过此次运行\n");
        break;
      }
      $.outFlag = false;
      if (lIiili[i1II1l]) {
        $.index = i1II1l + 1;
        iI1I1 = lIiili[i1II1l];
        IiliII = lIiili[i1II1l];
        li1lIl.setCookie(iI1I1);
        $.UserName = decodeURIComponent(li1lIl.getCookieValue(iI1I1, "pt_pin"));
        $.UA = li1lIl.genUA($.UserName);
        $.UUID = li1lIl.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        $.te = Math.floor(Math.random() * 9000) + 1000;
        $.message = li1lIi.create($.index, $.UserName);
        $.nickName = "";
        console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
        await I11111();
        li1lIl.unsetCookie();
        if ($.outFlag || $.runEnd) break;
      }
    }
  } else console.log("\n🔀 已开启并发模式，当前设置线程数为 " + l1IlI), await l111();
  Il1lIi && li1lIi.getMessage() && (li1lIi.updateContent(li1lIi.content + ("\n【活动地址】" + $.activityUrl)), await li1lIi.push());
})().catch(IIl1li => $.logErr(IIl1li)).finally(() => $.done());
async function I11111() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.needJoinMember = false;
    $.secretPin = "";
    $.pinToken = "";
    $.LZ_AES_PIN = "";
    Ii11iI = "";
    if ($.skipRun || $.runEnd || $.outFlag) return;
    await iiIllI($.activityUrl);
    await $.wait(500);
    if ($.skipRun) {
      console.log("获取 LZ_TOKEN 失败！");
      $.message.fix("获取[LZ_TOKEN]失败");
      return;
    }
    if ($.outFlag || $.runEnd) return;
    if (!$.venderId) {
      await lIll1I("getSimpleActInfoVo");
      if (!$.venderId) {
        console.log("getSimpleActInfoVo 未能获取店铺信息");
        $.message.fix("未能获取店铺信息");
        $.runEnd = true;
        return;
      }
      if (!$.activityType) {
        console.log("getSimpleActInfoVo 未能获取活动类型");
        $.message.fix("未能获取活动类型");
        $.runEnd = true;
        return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.runEnd = true;
          return;
      }
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          $.drawApiPath = "/wxDrawActivity/start";
          break;
        case 26:
          $.drawApiPath = "/wxPointDrawActivity/start";
          break;
        case 124:
          $.drawApiPath = "/wxScratchActive/start";
          break;
        case 125:
          $.drawApiPath = "/wxPointBlindBox/start";
          break;
        case 128:
          $.drawApiPath = "/wxGashaponActive/start";
          break;
        case 129:
          $.drawApiPath = "/wxDollGrabbing/start";
          break;
      }
      $.activityMode === "cjhy" && !$.defenseUrls && ($.defenseUrls = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"]);
    }
    $.token = await IiIIil(IiliII, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    if ($.defenseUrls && $.defenseUrls.includes($.drawApiPath)) {
      await lIll1I("initPinToken");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
    } else {
      await lIll1I("getMyPing");
      if ($.runEnd || $.skipRun || $.outFlag) return;
      if (!$.secretPin) {
        console.log("未能获取用户鉴权信息！");
        $.message.fix("未能获取用户鉴权信息");
        return;
      }
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        $.formatPin = encodeURIComponent($.secretPin);
        break;
      case "cjhy":
        $.formatPin = encodeURIComponent(encodeURIComponent($.secretPin));
        break;
    }
    await $.wait(500);
    switch ($.activityMode) {
      case "lzkj":
        await lIll1I("accessLogWithAD");
        break;
      case "cjhy":
        await lIll1I("accessLog");
        break;
    }
    await $.wait(500);
    if (iilili) {
      await lIll1I("getOpenCardStatus");
      if ($.outFlag && $.skipRun) return;
      if (!$.isMember) {
        const Ii11ii = await li1lIl.joinShopMember($.venderId);
        Ii11ii && (console.log("加入店铺会员成功"), $.isMember = true);
      }
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    }
    $.activityContent = "";
    await lIll1I("activityContent");
    if (!$.activityContent) {
      console.log("未能获取到活动信息");
      $.message.fix("未能获取活动信息");
      return;
    }
    $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
    $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
    const lIiil = $.activityContent?.["dayMaxDraw"];
    lIiil && $.canDrawTimes > lIiil && ($.canDrawTimes = lIiil);
    const iII1ll = $.activityContent.content,
      I1111i = $.activityContent?.["needFollow"] || false,
      iliiI = $.activityContent?.["hasFollow"] || false;
    if ($.index === 1) {
      let llIi = "";
      for (let li1l1I = 0; li1l1I < iII1ll.length; li1l1I++) {
        const Il1lI1 = iII1ll[li1l1I].name,
          lIll11 = iII1ll[li1l1I].type,
          iIlIIl = iII1ll[li1l1I].id;
        if (iIlIIl === 0 || lIll11 === 0) {
          llIi += "谢谢参与";
          break;
        } else llIi += "" + Il1lI1 + (lIll11 === 8 ? "[专享价]" : lIll11 === 7 ? "[实物]" : ""), li1l1I !== iII1ll.length - 1 && (llIi += "，");
      }
      await lIll1I("shopInfo");
      $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + llIi + "\n");
      li1lIi.updateContent(li1lIi.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + llIi));
      let Ii11il = $.activityContent?.["startTime"],
        ilii1 = $.activityContent?.["endTime"];
      if ((!Ii11il || !ilii1) && $.activityContent?.["rule"]) try {
        const lIii = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          ii1 = $.activityContent.rule.match(lIii);
        ii1 && ii1.length === 3 && (Ii11il = new Date(ii1[1]).getTime(), ilii1 = new Date(ii1[2]).getTime());
      } catch {}
      const I11lI1 = Date.now();
      if (ilii1 && I11lI1 > ilii1) {
        const lII1li = $.time("yyyy-MM-dd HH:mm", ilii1);
        console.log("活动已于 " + lII1li + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + lII1li);
        $.runEnd = true;
        return;
      }
      if (Ii11il && I11lI1 < Ii11il) {
        const lIilI = $.time("yyyy-MM-dd HH:mm", Ii11il);
        console.log("活动将在 " + lIilI + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + lIilI);
        $.runEnd = true;
        return;
      }
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        if (I1111i && !iliiI) {
          await lIll1I("followShop");
          $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
        }
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await lIll1I("followShop");
        break;
    }
    if ($.needJoinMember || $.outFlag) return;
    if ($.canDrawTimes === 0) switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        await lIll1I("getGiveContent"), $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
        if ($.followTaskInfo) {
          const II1I1i = $.followTaskInfo?.["skuIdsList"],
            II1I1l = $.followTaskInfo?.["followTimes"],
            ilIl1I = $.followTaskInfo?.["hasGetGiveTimes"],
            iiI = $.followTaskInfo?.["giveTimes"],
            lIiI = $.followTaskInfo?.["maxGiveTimes"],
            lII1lI = Math.trunc(II1I1i.length / II1I1l * iiI);
          if (ilIl1I < lIiI && ilIl1I < lII1lI) {
            let lIi1 = (lIiI - ilIl1I) * II1I1l;
            for (let iIiI1l = 0; iIiI1l < II1I1i.length; iIiI1l++) {
              $.skuId = II1I1i[iIiI1l];
              await lIll1I("followGoods");
              $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
              if (iIiI1l === lIi1 - 1) break;
            }
            $.activityContent = "";
            await lIll1I("activityContent");
            if (!$.activityContent) {
              console.log("未能获取到活动信息");
              $.message.fix("未能获取活动信息");
              return;
            }
            $.canDrawTimes = $.activityContent?.["canDrawTimes"] || 0;
            const lIill = $.activityContent?.["dayMaxDraw"] || 0;
            $.canDrawTimes > lIill && ($.canDrawTimes = lIill);
            $.activityMode === "cjhy" ? await $.wait(1000) : await $.wait(500);
            console.log("");
          }
        }
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        break;
    }
    if ($.canDrawTimes <= 0) {
      switch ($.activityType) {
        case 13:
          console.log("今天没有抽奖机会了，明天再来吧~"), $.message.fix("今日已无抽奖机会");
          break;
        case 3:
        case 4:
        case 11:
        case 12:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          console.log("没有抽奖机会了~"), $.message.fix("抽奖机会不足");
          break;
      }
      return;
    }
    $.drawTimes = 0;
    $.drawStop = false;
    $.drawMissTimes = 0;
    for (let iIiI1i = 1; $.canDrawTimes--; iIiI1i++) {
      $.drawError = "";
      await lIll1I("start");
      if ($.drawError) {
        $.drawError.indexOf("火爆") > -1 && ($.canDrawTimes += 1);
        $.activityMode === "cjhy" && ($.drawError.indexOf("擦肩") > -1 || $.drawError.indexOf("缓存") > -1) && ($.canDrawTimes += 1);
        if (Iiii11 && $.drawMissTimes >= Iiii11) break;
        if ($.drawStop || $.needJoinMember || $.runEnd) break;
      }
      if ($.canDrawTimes <= 0) break;
      if ($.drawTimes >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        console.log("\n抽奖次数过多，剩余" + $.canDrawTimes + "次机会，下次再继续吧~");
        $.message.insert("抽奖次数过多下次再抽，剩余" + $.canDrawTimes + "次机会");
        break;
      }
      await $.wait($.drawIntervalTimes);
    }
  } catch (ilIl1i) {
    console.log("❌ 脚本运行遇到了错误\n" + ilIl1i);
  }
}
async function l111() {
  await iiIllI($.activityUrl);
  if ($.skipRun) {
    console.log("获取 LZ_TOKEN 失败！");
    li1lIi.updateContent(li1lIi.content + "获取[LZ_TOKEN]失败\n");
    return;
  }
  await lIll1I("getSimpleActInfoVo");
  if (!$.venderId || !$.activityType) {
    console.log("getSimpleActInfoVo 未能获取店铺信息");
    li1lIi.updateContent(li1lIi.content + "未能获取店铺信息\n");
    return;
  }
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
    case 26:
    case 124:
    case 125:
    case 128:
    case 129:
      break;
    default:
      console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
      return;
  }
  switch ($.activityType) {
    case 3:
    case 4:
    case 11:
    case 12:
    case 13:
      $.drawApiPath = "/wxDrawActivity/start";
      break;
    case 26:
      $.drawApiPath = "/wxPointDrawActivity/start";
      break;
    case 124:
      $.drawApiPath = "/wxScratchActive/start";
      break;
    case 125:
      $.drawApiPath = "/wxPointBlindBox/start";
      break;
    case 128:
      $.drawApiPath = "/wxGashaponActive/start";
      break;
    case 129:
      $.drawApiPath = "/wxDollGrabbing/start";
      break;
  }
  await lIll1I("shopInfo");
  $.activityMode === "cjhy" && !$.defenseUrls && ($.defenseUrls = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"]);
  console.log("");
  await li1lIl.concTask(l1IlI, lIiili, async (l1i1ll, l1i1li) => {
    const Ili1I = decodeURIComponent(li1lIl.getCookieValue(l1i1ll, "pt_pin")),
      I1IiII = li1lIl.genUA(Ili1I),
      Ili11 = li1lIi.create(l1i1li, Ili1I);
    let iiIiI = "",
      lIIlI1 = "",
      ilill1 = "",
      iIIiI1 = "",
      IIIi1I = "",
      l1i1lI = "",
      I11 = "",
      lll11 = false,
      il1iil = false,
      iiIi1 = false;
    l1i1lI = await lI1i1();
    if (!l1i1lI) {
      Ili11.fix("获取[LZ_COOKIE]失败");
      console.log(Ili11.getInlineContent());
      return;
    }
    iiIiI = await IiIIil(l1i1ll, $.baseUrl);
    if (!iiIiI) {
      Ili11.fix("获取[Token]失败");
      console.log(Ili11.getInlineContent());
      return;
    }
    if ($.activityMode === "cjhy") {
      await il1ili("initPinToken");
      if (!ilill1) {
        Ili11.fix("获取[pinToken]失败");
        console.log(Ili11.getInlineContent());
        return;
      }
    } else await il1ili("getMyPing");
    if (!lIIlI1) {
      Ili11.fix("未能获取用户鉴权信息");
      console.log(Ili11.getInlineContent());
      return;
    }
    switch ($.activityMode) {
      case "lzkj":
        I11 = encodeURIComponent(lIIlI1);
        break;
      case "cjhy":
        I11 = encodeURIComponent(encodeURIComponent(lIIlI1));
        break;
    }
    switch ($.activityMode) {
      case "lzkj":
        await il1ili("accessLogWithAD");
        break;
      case "cjhy":
        await il1ili("accessLog");
        break;
    }
    let il1iii = true;
    if (iilili) {
      await il1ili("getOpenCardStatus");
      if (il1iil) {
        console.log(Ili11.getInlineContent());
        return;
      }
      if (!il1iii) {
        const lI1lI = await li1lIl.joinShopMember($.venderId, l1i1ll);
        if (lI1lI) {
          Ili11.insert("加入店铺会员成功");
          il1iii = true;
        }
      }
    }
    let lII11l = "",
      ilillI = 0;
    await il1ili("activityContent");
    if (iiIi1) {
      return console.log(Ili11.getInlineContent()), {
        "runEnd": true
      };
    }
    if (!lII11l) {
      Ili11.fix("未能获取活动信息");
      console.log(Ili11.getInlineContent());
      return;
    }
    ilillI = lII11l?.["canDrawTimes"] || 0;
    const iIIiII = lII11l?.["dayMaxDraw"];
    iIIiII && ilillI > iIIiII && (ilillI = iIIiII);
    const IIi1i1 = lII11l.content,
      I1IiI1 = lII11l?.["needFollow"] || false,
      IlIl1i = lII11l?.["hasFollow"] || false;
    if (l1i1li === 1) {
      let lli11I = "";
      for (let lIIlIi = 0; lIIlIi < IIi1i1.length; lIIlIi++) {
        const ililli = IIi1i1[lIIlIi].name,
          ii11l = IIi1i1[lIIlIi].type,
          iIIiIi = IIi1i1[lIIlIi].id;
        if (iIIiIi === 0 || ii11l === 0) {
          lli11I += "谢谢参与";
          break;
        } else lli11I += "" + ililli + (ii11l === 8 ? "[专享价]" : ii11l === 7 ? "[实物]" : ""), lIIlIi !== IIi1i1.length - 1 && (lli11I += "，");
      }
      console.log("\n" + ($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + lli11I + "\n");
      li1lIi.updateContent(li1lIi.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + lli11I));
      let ii1lI1 = lII11l?.["startTime"],
        ii11i = lII11l?.["endTime"];
      if ((!ii1lI1 || !ii11i) && lII11l?.["rule"]) try {
        const ililll = /抽奖时间：(\d{4}-\d{2}-\d{2} \d{2}:\d{2}) 至 (\d{4}-\d{2}-\d{2} \d{2}:\d{2})；/,
          il1Ii = lII11l.rule.match(ililll);
        il1Ii && il1Ii.length === 3 && (ii1lI1 = new Date(il1Ii[1]).getTime(), ii11i = new Date(il1Ii[2]).getTime());
      } catch {}
      const lIIlIl = Date.now();
      if (ii11i && lIIlIl > ii11i) {
        const iIIiIl = $.time("yyyy-MM-dd HH:mm", ii11i);
        return console.log("活动已于 " + iIIiIl + " 结束，下次早点来吧~"), Ili11.fix("活动已结束，结束时间：" + iIIiIl), {
          "runEnd": true
        };
      }
      if (ii1lI1 && lIIlIl < ii1lI1) {
        const IiIli1 = $.time("yyyy-MM-dd HH:mm", ii1lI1);
        return console.log("活动将在 " + IiIli1 + " 开始，晚点再来吧~"), Ili11.fix("活动尚未开始，开始时间：" + IiIli1), {
          "runEnd": true
        };
      }
    }
    switch ($.activityType) {
      case 3:
      case 4:
      case 11:
      case 12:
      case 13:
        I1IiI1 && !IlIl1i && (await il1ili("followShop"));
        break;
      case 26:
      case 124:
      case 125:
      case 128:
      case 129:
        await il1ili("followShop");
        break;
    }
    if (lll11 || il1iil) {
      console.log(Ili11.getInlineContent());
      return;
    }
    let IIIi11 = "";
    if (ilillI === 0) {
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          let IlIl1I = "";
          await il1ili("getGiveContent");
          if (IlIl1I) {
            const I1llI = IlIl1I?.["skuIdsList"],
              i1iII1 = IlIl1I?.["followTimes"],
              lI1li = IlIl1I?.["hasGetGiveTimes"],
              lll1I1 = IlIl1I?.["giveTimes"],
              lli111 = IlIl1I?.["maxGiveTimes"],
              lI1ll = Math.trunc(I1llI.length / i1iII1 * lll1I1);
            if (lI1li < lli111 && lI1li < lI1ll) {
              let I1IiIi = (lli111 - lI1li) * i1iII1;
              for (let lIIlII = 0; lIIlII < I1llI.length; lIIlII++) {
                IIIi11 = I1llI[lIIlII];
                await il1ili("followGoods");
                if (lIIlII === I1IiIi - 1) break;
              }
              lII11l = "";
              await il1ili("activityContent");
              ilillI = lII11l?.["canDrawTimes"] || 0;
              const ii11I = lII11l?.["dayMaxDraw"] || 0;
              if (ilillI > ii11I) {
                ilillI = ii11I;
              }
            }
          }
          break;
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          break;
      }
    }
    if (ilillI <= 0) {
      switch ($.activityType) {
        case 13:
          Ili11.fix("今日已无抽奖机会");
          break;
        case 3:
        case 4:
        case 11:
        case 12:
        case 26:
        case 124:
        case 125:
        case 128:
        case 129:
          Ili11.fix("抽奖机会不足");
          break;
      }
      console.log(Ili11.getInlineContent());
      return;
    }
    let I1I = 0,
      liIi1I = 0,
      il1ill = false;
    for (let I1lll = 1; ilillI--; I1lll++) {
      let I1lli = "";
      await il1ili("start");
      if (I1lli) {
        I1lli.indexOf("火爆") > -1 && (ilillI += 1);
        $.activityMode === "cjhy" && (I1lli.indexOf("擦肩") > -1 || I1lli.indexOf("缓存") > -1) && (ilillI += 1);
        if (Iiii11 && liIi1I >= Iiii11) break;
        if (il1ill || lll11) break;
        if (iiIi1) return console.log(Ili11.getInlineContent()), {
          "runEnd": true
        };
      }
      if (ilillI <= 0) break;
      if (I1I >= 8 && [26, 124, 125, 128, 129].includes($.activityType)) {
        Ili11.insert("抽奖次数过多下次再抽，剩余" + ilillI + "次机会");
        break;
      }
    }
    console.log(Ili11.getInlineContent());
    async function il1ili(lIIIli) {
      let lIIIll = "",
        i11I = "",
        iI1III = "POST";
      switch (lIIIli) {
        case "getMyPing":
          lIIIll = $.baseUrl + "/customer/getMyPing", i11I = "token=" + iiIiI + "&fromType=APP&userId=" + $.venderId;
          break;
        case "initPinToken":
          iI1III = "GET", lIIIll = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + iiIiI + "&source=01&venderId=" + $.venderId + "&uuid=" + li1lIl.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") + "&clientTime=" + Date.now();
          break;
        case "accessLog":
          lIIIll = $.baseUrl + "/common/accessLog", i11I = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + I11 + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
          break;
        case "accessLogWithAD":
          lIIIll = $.baseUrl + "/common/accessLogWithAD", i11I = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + I11 + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
          break;
        case "getOpenCardStatus":
          switch ($.activityType) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 13:
              switch ($.activityMode) {
                case "lzkj":
                  lIIIll = $.baseUrl + "/wxCommonInfo/getActMemberInfo", i11I = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + I11;
                  break;
                case "cjhy":
                  lIIIll = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", i11I = "venderId=" + $.venderId + "&buyerPin=" + I11 + "&activityType=" + $.activityType;
                  break;
              }
              break;
            case 26:
              switch ($.activityMode) {
                case "lzkj":
                  lIIIll = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus", i11I = "venderId=" + $.venderId + "&pin=" + I11;
                  break;
                case "cjhy":
                  lIIIll = $.baseUrl + "/common/joinConfig/check", i11I = "venderId=" + $.venderId + "&pin=" + I11 + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
                  break;
              }
              break;
            case 124:
            case 125:
            case 128:
            case 129:
              lIIIll = $.baseUrl + "/common/joinConfig/check", i11I = "venderId=" + $.venderId + "&pin=" + I11 + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case "activityContent":
          let l1Ii1I = "";
          switch ($.activityType) {
            case 3:
            case 4:
            case 11:
            case 12:
            case 13:
              l1Ii1I = "wxDrawActivity/activityContent";
              break;
            case 26:
              l1Ii1I = "wxPointDrawActivity/activityContent";
              break;
            case 124:
              l1Ii1I = "wxScratchActive/activityContent";
              break;
            case 125:
              l1Ii1I = "wxPointBlindBox/activityContent";
              break;
            case 128:
              l1Ii1I = "wxGashaponActive/activityContent";
              break;
            case 129:
              l1Ii1I = "wxDollGrabbing/activityContent";
              break;
          }
          lIIIll = $.baseUrl + "/" + l1Ii1I, i11I = "activityId=" + $.activityId + "&pin=" + I11;
          break;
        case "followShop":
          switch ($.activityMode) {
            case "lzkj":
              lIIIll = $.baseUrl + "/wxActionCommon/followShop", i11I = "userId=" + $.venderId + "&buyerNick=" + I11 + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
              break;
            case "cjhy":
              lIIIll = $.baseUrl + "/wxActionCommon/newFollowShop", i11I = "venderId=" + $.venderId + "&buyerPin=" + I11 + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
              break;
          }
          break;
        case "getGiveContent":
          lIIIll = $.baseUrl + "/wxDrawActivity/getGiveContent", i11I = "pin=" + I11 + "&activityId=" + $.activityId;
          break;
        case "followGoods":
          lIIIll = $.baseUrl + "/wxDrawActivity/follow", i11I = "activityId=" + $.activityId + "&pin=" + I11 + "&skuId=" + IIIi11;
          break;
        case "start":
          lIIIll = "" + $.baseUrl + $.drawApiPath;
          $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? i11I = JSON.stringify({
            "ecyText": iII1l1({
              "actId": $.activityId,
              "activityId": $.activityId,
              "pin": encodeURIComponent(lIIlI1)
            }, ilill1, iIIiI1)
          }) : i11I = "activityId=" + $.activityId + "&pin=" + I11;
          break;
      }
      const I11II1 = {
        "url": lIIIll,
        "headers": {
          "Origin": $.origin,
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "Connection": "keep-alive",
          "Content-Type": ["saveCaptain", "saveMember"].includes(lIIIli) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
          "Cookie": l1i1lI,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": I1IiII,
          "X-Requested-With": "XMLHttpRequest",
          "Referer": $.activityUrl
        },
        "body": i11I,
        "timeout": 60000
      };
      iI1III === "GET" && (delete I11II1.body, delete I11II1.headers["Content-Type"]);
      const l1II = 1 + l1IIIl;
      let i1iIII = 0,
        i1l111 = null;
      while (i1iIII < l1II) {
        const {
          err: lIIIlI,
          res: Iiiil1,
          data: iI1IIi
        } = await li1II1(I11II1, iI1III);
        if (lIIIlI) {
          if (!["accessLog", "accessLogWithAD"].includes(lIIIli)) {
            if (typeof lIIIlI === "string" && lIIIlI.includes("Timeout awaiting 'request'")) i1l111 = lIIIli + " 请求超时）";else {
              const iI1IIl = Iiiil1?.["statusCode"];
              if (iI1IIl) {
                if ([403, 493].includes(iI1IIl)) {
                  i1l111 = lIIIli + " 请求失败，IP被限制（Response code " + iI1IIl + "）";
                } else {
                  if ([400, 404].includes(iI1IIl)) i1l111 = lIIIli + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iI1IIl + "）";else [500].includes(iI1IIl) && lIIIli === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? I11II1.body = JSON.stringify({
                    "ecyText": iII1l1({
                      "actId": $.activityId,
                      "activityId": $.activityId,
                      "pin": encodeURIComponent(lIIlI1)
                    }, ilill1, iIIiI1)
                  }) : i1l111 = lIIIli + " 请求失败（Response code " + iI1IIl + "）";
                }
              } else i1l111 = lIIIli + " 请求失败 => " + (lIIIlI.message || lIIIlI);
            }
            i1iIII++;
          }
        } else {
          const l1I1 = li1lIl.getResponseCookie(Iiiil1, l1i1lI),
            IiIlli = false;
          if (IiIlli) {
            console.log("\n---------------------------------------------------\n");
            console.log("🔧 " + lIIIli + " 响应Body => " + (iI1IIi || "无") + "\n");
            console.log("🔧 " + lIIIli + " 响应Cookie => " + (l1I1 || "无") + "\n");
            console.log("🔧 " + lIIIli + " 请求参数");
            console.log(I11II1);
            console.log("\n---------------------------------------------------\n");
          }
          switch (lIIIli) {
            case "getMyPing":
              IIIi1I = li1lIl.getCookieValue(l1I1, "LZ_AES_PIN");
              break;
            case "initPinToken":
              IIIi1I = li1lIl.getCookieValue(l1I1, "LZ_AES_PIN"), ilill1 = li1lIl.getCookieValue(l1I1, "pToken"), iIIiI1 = li1lIl.getCookieValue(l1I1, "te");
              break;
          }
          ["getMyPing", "followGoods", "start"].includes(lIIIli) && (l1i1lI = l1I1);
          !li1lIl.getCookieValue(l1i1lI, "LZ_AES_PIN") && IIIi1I && (l1i1lI += "LZ_AES_PIN=" + IIIi1I + "; ");
          !li1lIl.getCookieValue(l1i1lI, "pToken") && ilill1 && (l1i1lI += "pToken=" + ilill1 + "; ");
          !li1lIl.getCookieValue(l1i1lI, "AUTH_C_USER") && lIIlI1 && (l1i1lI += "AUTH_C_USER=" + lIIlI1 + "; ");
          !li1lIl.getCookieValue(l1i1lI, "te") && iIIiI1 && (l1i1lI += "te=" + iIIiI1 + "; ");
          if (["accessLog", "accessLogWithAD"].includes(lIIIli)) break;
          if (iI1IIi) try {
            const llilIl = JSON.parse(iI1IIi);
            switch (lIIIli) {
              case "getMyPing":
              case "initPinToken":
                if (llilIl.result === true && llilIl.data) lIIlI1 = llilIl.data?.["secretPin"];else {
                  if (llilIl.errorMessage) {
                    Ili11.fix(lIIIli + " " + llilIl.errorMessage);
                  }
                }
                break;
              case "getOpenCardStatus":
                if (llilIl.result === true) {
                  if (llilIl.data) {
                    if (llilIl.data.hasOwnProperty("openCard")) il1iii = llilIl.data.openCard;else llilIl.data.hasOwnProperty("openedCard") && (il1iii = llilIl.data.openedCard);
                    if (typeof il1iii === "number") {
                      il1iii = il1iii === 1;
                    } else typeof il1iii === "undefined" && (il1iii = false);
                  } else {
                    il1iii = true;
                  }
                } else llilIl.errorMessage ? llilIl.errorMessage.includes("擦肩") && !llilIl?.["data"] ? (il1iil = true, Ili11.fix("账号已黑")) : Ili11.fix(llilIl.errorMessage) : (il1iii = false, console.log("❓" + lIIIli + " " + JSON.stringify(llilIl)));
                break;
              case "activityContent":
                if (llilIl.result === true && llilIl.data) lII11l = llilIl.data;else {
                  if (llilIl.errorMessage) {
                    for (let i1llI1 of ["未开始", "结束", "不存在", "不在"]) {
                      if (llilIl.errorMessage.includes(i1llI1)) {
                        Ili11.fix(llilIl.errorMessage);
                        iiIi1 = true;
                        break;
                      }
                    }
                    Ili11.fix(llilIl.errorMessage);
                  } else console.log("❓" + lIIIli + " " + JSON.stringify(llilIl));
                }
                break;
              case "followShop":
                if (llilIl.result === true) {} else llilIl.errorMessage ? (["会员", "开卡"].some(lii1l1 => llilIl.errorMessage.includes(lii1l1)) && (lll11 = true, Ili11.fix("活动仅限店铺会员参与")), il1iil = true) : console.log("❓" + lIIIli + " " + JSON.stringify(llilIl));
                break;
              case "getGiveContent":
                if (llilIl.result === true && llilIl.data) followTaskInfo = llilIl.data?.["follow"];else {
                  if (llilIl.errorMessage) {} else {
                    console.log("❓" + lIIIli + " " + JSON.stringify(llilIl));
                  }
                }
                break;
              case "followGoods":
                if (llilIl.result === true) {} else {
                  if (llilIl.errorMessage) {} else console.log("❓" + lIIIli + " " + JSON.stringify(llilIl));
                }
                break;
              case "start":
                if (llilIl.result === true && llilIl.data) {
                  I1I += 1;
                  ilillI = llilIl.data.canDrawTimes;
                  const i11l = llilIl.data.drawInfo;
                  if (i11l) switch (i11l.type) {
                    case 4:
                      switch ($.activityType) {
                        case 3:
                        case 4:
                        case 11:
                        case 12:
                        case 13:
                          ilillI += 1;
                          break;
                        case 26:
                        case 124:
                        case 125:
                        case 128:
                        case 129:
                          Ili11.insert("空气💨");
                          break;
                      }
                      break;
                    case 6:
                      Ili11.insert(i11l.name + "🐶");
                      break;
                    case 7:
                      const l1Ii = llilIl.data.addressId,
                        IiIll1 = i11l.name;
                      let l1Il = "🎉 恭喜获得实物，奖品名称：" + IiIll1 + "，参考价值：" + i11l.priceInfo + "(元)";
                      if (i11l.showImage) l1Il += "\n预览图片：" + i11l.showImage;
                      console.log(l1Il);
                      const i1il11 = {
                          "baseUrl": $.baseUrl,
                          "cookie": l1i1lI,
                          "ua": I1IiII,
                          "activityId": $.activityId,
                          "activityType": $.activityType,
                          "venderId": [$.venderId, $.shopId],
                          "secretPin": lIIlI1,
                          "prizeName": IiIll1,
                          "generateId": l1Ii
                        },
                        l1Ii1i = await iilill(i1il11);
                      !Il1lIi && l1Ii1i && (await li1lIi.sendNotify($.name + "中奖通知", "【京东账号" + l1i1li + "】\n抽中实物 " + IiIll1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                      Ili11.insert(IiIll1 + "(" + (l1Ii1i ? "已填地址" : "未填地址") + ")🎁");
                      break;
                    case 8:
                      Ili11.insert("专享价🗑️");
                      break;
                    case 9:
                      Ili11.insert(i11l.name + "🎟️");
                      break;
                    case 13:
                    case 14:
                    case 15:
                      if (!Il1lIi) {
                        await li1lIi.sendNotify($.name + "中奖通知", "【京东账号" + l1i1li + "】\n抽中 " + i11l.name + "\n\n" + $.activityUrl);
                      }
                      Ili11.insert(i11l.name + "🎁");
                      break;
                    case 16:
                      Ili11.insert(i11l.priceInfo + "红包🧧");
                      break;
                    default:
                      i11l.name.includes("券") ? Ili11.insert("优惠券🗑️") : Ili11.insert(i11l.name);
                      break;
                  } else liIi1I += 1, Ili11.insert("空气💨");
                } else {
                  if (llilIl.errorMessage) {
                    drawError = llilIl.errorMessage;
                    ["上限", "不足", "超过", "非法操作", "明天"].some(lliIli => drawError.includes(lliIli)) && (il1ill = true, Ili11.insert(drawError));
                    ["未开始", "结束", "不存在", "不在"].some(IlliII => drawError.includes(IlliII)) && (iiIi1 = true, Ili11.fix(drawError));
                    ["会员", "开卡"].some(ilIl => drawError.includes(ilIl)) && (lll11 = true, Ili11.fix(drawError));
                    !["火爆", "擦肩", "缓存", "数据忙"].some(ill1ii => drawError.includes(ill1ii)) && !il1ill && !lll11 && Ili11.insert(drawError || "");
                  } else console.log("❓" + lIIIli + " " + JSON.stringify(llilIl));
                }
                break;
            }
            break;
          } catch (lllli1) {
            Ili11.fix("❌ " + lIIIli + " 接口响应数据解析失败: " + (lllli1.message || lllli1));
            IiIlli && (console.log("\n---------------------------------------------------\n"), console.log(l1i1lI), console.log("\n---------------------------------------------------\n"));
            i1iIII++;
          } else lIIIli === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) && (I11II1.body = JSON.stringify({
            "ecyText": iII1l1({
              "actId": $.activityId,
              "activityId": $.activityId,
              "pin": encodeURIComponent(lIIlI1)
            }, ilill1, iIIiI1)
          })), i1l111 = lIIIli + " 接口无响应数据", i1iIII++;
        }
      }
      if (i1iIII >= l1II) {
        Ili11.fix(i1l111);
        if (!["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(lIIIli)) {
          Ili11.fix(i1l111);
        }
      }
    }
    async function lI1i1() {
      return new Promise(i1llIl => {
        let il1ii1 = {
          "url": $.activityUrl,
          "headers": {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": $.activityUrl,
            "User-Agent": I1IiII
          },
          "timeout": 30000
        };
        $.get(il1ii1, (IIII1, iIi1, I11IIl) => {
          try {
            iIi1.status === 200 ? i1llIl(li1lIl.getResponseCookie(iIi1, l1i1lI)) : i1llIl(null);
          } catch (Il11li) {
            i1llIl(null);
          }
        });
      });
    }
  });
  console.log("\n并发运行完毕");
}
async function il11lI(lil1l1, I1i1ll) {
  try {
    switch (lil1l1) {
      case "getMyPing":
        if (I1i1ll.result === true && I1i1ll.data) $.secretPin = I1i1ll.data?.["secretPin"], $.nickname = I1i1ll.data?.["nickname"];else I1i1ll.errorMessage ? (console.log(lil1l1 + " " + I1i1ll.errorMessage), $.message.fix(I1i1ll.errorMessage)) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "initPinToken":
        if (I1i1ll.result === true && I1i1ll.data) $.secretPin = I1i1ll.data?.["secretPin"], $.nickname = I1i1ll.data?.["nickname"];else I1i1ll.errorMessage ? (console.log(lil1l1 + " " + I1i1ll.errorMessage), $.message.fix(I1i1ll.errorMessage)) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "getSimpleActInfoVo":
        if (I1i1ll.result === true && I1i1ll.data) $.venderId = I1i1ll.data?.["venderId"], $.shopId = I1i1ll.data?.["shopId"], $.activityType = I1i1ll.data?.["activityType"];else I1i1ll.errorMessage ? console.log(lil1l1 + " " + I1i1ll.errorMessage) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "getDefenseUrls":
        if (I1i1ll.result === true && I1i1ll.data) $.defenseUrls = I1i1ll?.["data"];else I1i1ll.errorMessage ? console.log(lil1l1 + " " + I1i1ll.errorMessage) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
      case "getOpenCardStatus":
        if (I1i1ll.result === true) {
          if (I1i1ll.data) {
            if (I1i1ll.data.hasOwnProperty("openCard")) $.isMember = I1i1ll.data.openCard;else I1i1ll.data.hasOwnProperty("openedCard") && ($.isMember = I1i1ll.data.openedCard);
            if (typeof $.isMember === "number") $.isMember = $.isMember === 1;else {
              if (typeof $.isMember === "undefined") {
                $.isMember = false;
              }
            }
          } else $.isMember = true;
        } else I1i1ll.errorMessage ? I1i1ll.errorMessage.includes("擦肩") && !I1i1ll?.["data"] ? ($.skipRun = true, $.message.fix("账号已黑"), console.log("账号已黑，下次别跑了~")) : console.log(lil1l1 + " " + I1i1ll.errorMessage) : ($.isMember = false, console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll)));
        break;
      case "activityContent":
        if (I1i1ll.result === true && I1i1ll.data) $.activityContent = I1i1ll.data;else {
          if (I1i1ll.errorMessage) {
            for (let iIli of ["未开始", "结束", "不存在", "不在"]) {
              if (I1i1ll.errorMessage.includes(iIli)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(lil1l1 + " " + I1i1ll.errorMessage);
            $.message.fix(I1i1ll.errorMessage);
          } else console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        }
        break;
      case "shopInfo":
        if (I1i1ll.result === true && I1i1ll.data) $.shopName = I1i1ll?.["data"]?.["shopName"];else I1i1ll.errorMessage ? console.log("" + (I1i1ll.errorMessage || "")) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "followShop":
        if (I1i1ll.result === true) {} else I1i1ll.errorMessage ? (["会员", "开卡"].some(iIi1l1 => I1i1ll.errorMessage.includes(iIi1l1)) && ($.needJoinMember = true, $.message.fix("活动仅限店铺会员参与")), console.log("" + (I1i1ll.errorMessage || ""))) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "getGiveContent":
        if (I1i1ll.result === true && I1i1ll.data) $.followTaskInfo = I1i1ll.data?.["follow"];else I1i1ll.errorMessage ? console.log("" + (I1i1ll.errorMessage || "")) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "followGoods":
        if (I1i1ll.result === true) console.log("做 \"关注商品\" 任务 >> 任务完成");else I1i1ll.errorMessage ? console.log("做 \"关注商品\" 任务 >> 任务失败（" + I1i1ll.errorMessage + "）") : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
      case "start":
        if (I1i1ll.result === true && I1i1ll.data) {
          llllli = false;
          $.drawTimes += 1;
          $.canDrawTimes = I1i1ll.data.canDrawTimes;
          const li1iil = I1i1ll.data.drawInfo;
          if (li1iil) {
            switch (li1iil.type) {
              case 4:
                switch ($.activityType) {
                  case 3:
                  case 4:
                  case 11:
                  case 12:
                  case 13:
                    console.log("🔁 再来一次"), $.canDrawTimes += 1;
                    break;
                  case 26:
                  case 124:
                  case 125:
                  case 128:
                  case 129:
                    console.log("💨 空气"), $.message.insert("空气💨");
                    break;
                }
                break;
              case 6:
                console.log("🎉 " + li1iil.name + " 🐶"), $.message.insert(li1iil.name + "🐶");
                break;
              case 7:
                const i1iI1l = I1i1ll.data.addressId,
                  i1lIIi = li1iil.name;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + i1lIIi), console.log("参考价值：" + li1iil.priceInfo + "（元）");
                if (li1iil.showImage) console.log("预览图片：" + li1iil.showImage);
                const llil1i = {
                    "baseUrl": $.baseUrl,
                    "cookie": Ii11iI,
                    "ua": $.UA,
                    "activityId": $.activityId,
                    "activityType": $.activityType,
                    "venderId": [$.venderId, $.shopId],
                    "secretPin": $.secretPin,
                    "prizeName": i1lIIi,
                    "generateId": i1iI1l
                  },
                  IililI = await iilill(llil1i);
                !Il1lIi && IililI && (await li1lIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + i1lIIi + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(i1lIIi + "(" + (IililI ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 8:
                console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
                break;
              case 9:
                console.log("🗑️ " + li1iil.name + " 🎟️"), $.message.insert(li1iil.name + "🎟️");
                break;
              case 13:
              case 14:
              case 15:
                console.log("🎉 恭喜获得" + li1iil.name + " 🎁");
                !Il1lIi && (await li1lIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li1iil.name + "\n\n" + $.activityUrl));
                $.message.insert(li1iil.name + "🎁");
                break;
              case 16:
                console.log("🎉 " + li1iil.priceInfo + " 🧧"), $.message.insert(li1iil.priceInfo + "红包🧧");
                break;
              default:
                if (li1iil.name.includes("券")) {
                  console.log("🗑️ 优惠券");
                  $.message.insert("优惠券🗑️");
                } else console.log("获得：" + li1iil.name), $.message.insert("" + li1iil.name);
                break;
            }
          } else $.drawMissTimes += 1, console.log("💨 空气"), $.message.insert("空气💨");
        } else I1i1ll.errorMessage ? ($.drawError = I1i1ll.errorMessage, ["上限", "不足", "超过", "非法操作", "明天"].some(ilIi1I => $.drawError.includes(ilIi1I)) && ($.drawStop = true, console.log($.drawError), $.message.insert($.drawError)), ["未开始", "结束", "不存在", "不在"].some(II1l1I => $.drawError.includes(II1l1I)) && ($.runEnd = true, $.message.fix($.drawError)), ["会员", "开卡"].some(iiIii1 => $.drawError.includes(iiIii1)) && ($.needJoinMember = true, console.log($.drawError), $.message.fix($.drawError)), !["火爆", "擦肩", "缓存", "数据忙"].some(li1iii => $.drawError.includes(li1iii)) && !$.drawStop && !$.needJoinMember && console.log($.drawError || "")) : console.log("❓" + lil1l1 + " " + JSON.stringify(I1i1ll));
        break;
    }
  } catch (ll1i1i) {
    console.log("❌ 未能正确处理 " + lil1l1 + " 请求响应 " + (ll1i1i.message || ll1i1i));
  }
}
async function lIll1I(ll1i1l) {
  if ($.runEnd || $.outFlag) return;
  let iIi1il = "",
    iIi1ii = "",
    i11i1l = "POST";
  switch (ll1i1l) {
    case "getMyPing":
      iIi1il = $.baseUrl + "/customer/getMyPing", iIi1ii = "token=" + $.token + "&fromType=APP&userId=" + $.venderId;
      break;
    case "getSimpleActInfoVo":
      iIi1il = $.baseUrl + "/customer/getSimpleActInfoVo", iIi1ii = "activityId=" + $.activityId;
      break;
    case "getDefenseUrls":
      i11i1l = "GET", iIi1il = $.baseUrl + "/customer/getDefenseUrls";
      break;
    case "initPinToken":
      i11i1l = "GET", iIi1il = $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now();
      break;
    case "accessLog":
      iIi1il = $.baseUrl + "/common/accessLog", iIi1ii = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=";
      break;
    case "accessLogWithAD":
      iIi1il = $.baseUrl + "/common/accessLogWithAD", iIi1ii = "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + $.formatPin + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app";
      break;
    case "getOpenCardStatus":
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          switch ($.activityMode) {
            case "lzkj":
              iIi1il = $.baseUrl + "/wxCommonInfo/getActMemberInfo", iIi1ii = "activityId=" + $.activityId + "&venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              iIi1il = $.baseUrl + "/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", iIi1ii = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityType=" + $.activityType;
              break;
          }
          break;
        case 26:
          switch ($.activityMode) {
            case "lzkj":
              iIi1il = $.baseUrl + "/crmCard/common/coupon/getOpenCardStatus", iIi1ii = "venderId=" + $.venderId + "&pin=" + $.formatPin;
              break;
            case "cjhy":
              iIi1il = $.baseUrl + "/common/joinConfig/check", iIi1ii = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
              break;
          }
          break;
        case 124:
        case 125:
        case 128:
        case 129:
          iIi1il = $.baseUrl + "/common/joinConfig/check", iIi1ii = "venderId=" + $.venderId + "&pin=" + $.formatPin + "&activityType=" + $.activityType + "&activityId=" + $.activityId;
          break;
      }
      break;
    case "activityContent":
      let I11i1 = "";
      switch ($.activityType) {
        case 3:
        case 4:
        case 11:
        case 12:
        case 13:
          I11i1 = "wxDrawActivity/activityContent";
          break;
        case 26:
          I11i1 = "wxPointDrawActivity/activityContent";
          break;
        case 124:
          I11i1 = "wxScratchActive/activityContent";
          break;
        case 125:
          I11i1 = "wxPointBlindBox/activityContent";
          break;
        case 128:
          I11i1 = "wxGashaponActive/activityContent";
          break;
        case 129:
          I11i1 = "wxDollGrabbing/activityContent";
          break;
      }
      iIi1il = $.baseUrl + "/" + I11i1, iIi1ii = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    case "shopInfo":
      iIi1il = $.baseUrl + "/wxDrawActivity/shopInfo", iIi1ii = "activityId=" + $.activityId;
      break;
    case "followShop":
      switch ($.activityMode) {
        case "lzkj":
          iIi1il = $.baseUrl + "/wxActionCommon/followShop", iIi1ii = "userId=" + $.venderId + "&buyerNick=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
        case "cjhy":
          iIi1il = $.baseUrl + "/wxActionCommon/newFollowShop", iIi1ii = "venderId=" + $.venderId + "&buyerPin=" + $.formatPin + "&activityId=" + $.activityId + "&activityType=" + $.activityType;
          break;
      }
      break;
    case "getGiveContent":
      iIi1il = $.baseUrl + "/wxDrawActivity/getGiveContent", iIi1ii = "pin=" + $.formatPin + "&activityId=" + $.activityId;
      break;
    case "followGoods":
      iIi1il = $.baseUrl + "/wxDrawActivity/follow", iIi1ii = "activityId=" + $.activityId + "&pin=" + $.formatPin + "&skuId=" + $.skuId;
      break;
    case "start":
      iIi1il = "" + $.baseUrl + $.drawApiPath;
      $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? iIi1ii = JSON.stringify({
        "ecyText": iII1l1({
          "actId": $.activityId,
          "activityId": $.activityId,
          "pin": encodeURIComponent($.secretPin)
        }, $.pinToken, $.te)
      }) : iIi1ii = "activityId=" + $.activityId + "&pin=" + $.formatPin;
      break;
    default:
      console.log("❌ 未知请求 " + ll1i1l);
      return;
  }
  const iIlI = {
    "url": iIi1il,
    "headers": {
      "Origin": $.origin,
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": ll1i1l === "start" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) ? "application/json" : "application/x-www-form-urlencoded",
      "Cookie": Ii11iI.trim(),
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Referer": $.activityUrl
    },
    "body": iIi1ii,
    "timeout": 30000
  };
  i11i1l === "GET" && (delete iIlI.body, delete iIlI.headers["Content-Type"]);
  const llil11 = 5;
  let i11i1i = 0,
    Iilill = null,
    iIl1 = false;
  while (i11i1i < llil11) {
    if (i11i1i > 0) {
      await $.wait(1000);
    }
    const {
      err: II1II1,
      res: llli,
      data: i1ll1l
    } = await li1II1(iIlI, i11i1l);
    if (II1II1) {
      if (typeof II1II1 === "string" && II1II1.includes("Timeout awaiting 'request'")) Iilill = ll1i1l + " 请求超时，请检查网络重试";else {
        const II1III = llli?.["statusCode"];
        if (II1III) {
          if ([403, 493].includes(II1III)) Iilill = ll1i1l + " 请求失败，IP被限制（Response code " + II1III + "）", iIl1 = true;else {
            if ([400, 404].includes(II1III)) Iilill = ll1i1l + " 请求配置参数错误，请联系开发者进行反馈（Response code " + II1III + "）";else {
              if ([500].includes(II1III) && ll1i1l === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath)) iIlI.body = JSON.stringify({
                "ecyText": iII1l1({
                  "actId": $.activityId,
                  "activityId": $.activityId,
                  "pin": encodeURIComponent($.secretPin)
                }, $.pinToken, $.te)
              });else {
                Iilill = ll1i1l + " 请求失败（Response code " + II1III + "）";
              }
            }
          }
        } else Iilill = ll1i1l + " 请求失败 => " + (II1II1.message || II1II1);
      }
      i11i1i++;
    } else {
      const liill1 = li1lIl.getResponseCookie(llli, Ii11iI),
        ili1ii = false;
      ili1ii && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + ll1i1l + " 响应Body => " + (i1ll1l || "无") + "\n"), console.log("🔧 " + ll1i1l + " 响应Cookie => " + (liill1 || "无") + "\n"), console.log("🔧 " + ll1i1l + " 请求参数"), console.log(iIlI), console.log("\n---------------------------------------------------\n"));
      let Il1lii = "";
      switch (ll1i1l) {
        case "getMyPing":
          Il1lii = li1lIl.getCookieValue(liill1, "LZ_AES_PIN");
          if (Il1lii) {
            $.LZ_AES_PIN = Il1lii;
          } else console.log("获取 LZ_AES_PIN 失败！"), $.message.fix("获取[LZ_AES_PIN]失败"), $.skipRun = true;
          break;
        case "initPinToken":
          const Illi1i = li1lIl.getCookieValue(liill1, "pToken");
          if (Illi1i) $.pinToken = Illi1i;else {
            console.log("获取 pinToken 失败！");
            $.message.fix("获取[pinToken]失败");
            $.skipRun = true;
            break;
          }
          Il1lii = li1lIl.getCookieValue(liill1, "LZ_AES_PIN");
          if (Il1lii) $.LZ_AES_PIN = Il1lii;else {
            console.log("获取 LZ_AES_PIN 失败！");
            $.message.fix("获取[LZ_AES_PIN]失败");
            $.skipRun = true;
            break;
          }
          const lllI = li1lIl.getCookieValue(liill1, "te");
          lllI && ($.te = lllI, Ii11iI += "te=" + $.te + "; ");
          break;
      }
      ["getMyPing", "followGoods", "start"].includes(ll1i1l) && (Ii11iI = liill1);
      Il1lii = li1lIl.getCookieValue(Ii11iI, "LZ_AES_PIN");
      !Il1lii && $.LZ_AES_PIN && (Ii11iI += "LZ_AES_PIN=" + $.LZ_AES_PIN + "; ");
      const Iilii1 = li1lIl.getCookieValue(Ii11iI, "pToken");
      !Iilii1 && $.pinToken && (Ii11iI += "pToken=" + $.pinToken + "; ");
      const lllIi1 = li1lIl.getCookieValue(Ii11iI, "AUTH_C_USER");
      !lllIi1 && $.secretPin && (Ii11iI += "AUTH_C_USER=" + $.secretPin + "; ");
      const Illi1l = li1lIl.getCookieValue(Ii11iI, "te");
      !Illi1l && $.te && (Ii11iI += "te=" + $.te + "; ");
      if (!["accessLog", "accessLogWithAD"].includes(ll1i1l)) {
        if (i1ll1l) {
          try {
            const lIlilI = JSON.parse(i1ll1l);
            il11lI(ll1i1l, lIlilI);
            break;
          } catch (lll1) {
            Iilill = "❌ " + ll1i1l + " 接口响应数据解析失败: " + lll1.message;
            console.log("🚫 " + ll1i1l + " => " + String(i1ll1l));
            ili1ii && (console.log("\n---------------------------------------------------\n"), console.log(Ii11iI), console.log("\n---------------------------------------------------\n"));
            i11i1i++;
          }
        } else ll1i1l === "start" && $.activityMode === "cjhy" && $.defenseUrls && $.defenseUrls.includes($.drawApiPath) && (iIlI.body = JSON.stringify({
          "ecyText": iII1l1({
            "actId": $.activityId,
            "activityId": $.activityId,
            "pin": encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        })), Iilill = "❌ " + ll1i1l + " 接口无响应数据", i11i1i++;
      } else {
        break;
      }
      iIl1 = false;
    }
  }
  if (i11i1i >= llil11) {
    console.log(Iilill);
    if (iIl1 && !["getGiveContent", "shopInfo", "accessLogWithAD", "accessLog"].includes(ll1i1l)) {
      !l1IIIi && ($.outFlag = true, $.message && $.message.fix(Iilill));
    }
  }
}
async function li1II1(li1ill, il1I1l = "POST") {
  if (il1I1l === "POST") return new Promise(async IliII => {
    $.post(li1ill, (i1I1ii, I11ii, i1I1il) => {
      IliII({
        "err": i1I1ii,
        "res": I11ii,
        "data": i1I1il
      });
    });
  });else {
    if (il1I1l === "GET") {
      return new Promise(async IiI1II => {
        $.get(li1ill, (Iii1I, I11il, IIIiIi) => {
          IiI1II({
            "err": Iii1I,
            "res": I11il,
            "data": IIIiIi
          });
        });
      });
    } else {
      const IIIiIl = "不支持的请求方法";
      return {
        "err": IIIiIl,
        "res": null,
        "data": null
      };
    }
  }
}
function iiIllI(illli) {
  return $.skipRun = true, new Promise(iIIi1I => {
    let llll = {
      "url": illli,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": illli,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(llll, async (ii1Ii1, i1I1lI, IIl) => {
      try {
        if (ii1Ii1) {
          if (i1I1lI && typeof i1I1lI.statusCode != "undefined") {
            if (i1I1lI.statusCode === 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本！");
              !l1IIIi && ($.outFlag = true);
            }
          }
          console.log(String(ii1Ii1));
          console.log("getFirstLZCK 请求失败，请检查网路重试");
        } else {
          IIl.match(/(活动已经结束)/) && IIl.match(/(活动已经结束)/)[1] && ($.runEnd = true, console.log("活动已结束或不存在"));
          i1I1lI.status === 200 && (Ii11iI = li1lIl.getResponseCookie(i1I1lI, Ii11iI), $.skipRun = false);
        }
      } catch (I11lI) {
        $.logErr(I11lI, i1I1lI);
      } finally {
        iIIi1I();
      }
    });
  });
}
function iII1l1(l1l1ll, l1ilii, l1l1li) {
  function l11ilI(l1111I) {
    l1111I = l1111I.split("").reverse().join("");
    const iI1I11 = new Uint8Array(12),
      l11111 = new TextEncoder().encode(l1111I);
    for (let i1II = 0; i1II < l11111.length; i1II += 2) {
      let iI1I1I = l11111[i1II] << 5 | l11111[i1II + 1] & 255;
      iI1I1I %= 63;
      iI1I11[i1II >> 1] = iI1I1I;
    }
    let I1111 = "";
    for (let I11I11 = 0; I11I11 < iI1I11.length; I11I11++) {
      I1111 += (iI1I11[I11I11] + 256).toString(2).slice(1);
    }
    let i1Ii = "",
      i1Il = "";
    for (let il1l1I = 0; il1l1I < 16; il1l1I++) {
      if (il1l1I !== 0) {
        const i1Ili1 = il1l1I * 6,
          l1111l = I1111.substring(i1Ili1, i1Ili1 + 6);
        let llI1ll = parseInt(l1111l, 2);
        const I111i = i1Il.split("");
        for (let iili11 = 0; iili11 < I111i.length; iili11++) {
          I111i[iili11] === "1" && (llI1ll = (llI1ll >> 6 - iili11 | llI1ll << iili11) & 63);
        }
        i1Il = (llI1ll & 63).toString(2).padStart(6, "0");
      } else i1Il = I1111.substring(0, 6);
      i1Ii += i1Il;
    }
    for (let I111l = 0; I111l < 12; I111l++) {
      const il1l11 = I111l * 8;
      iI1I11[I111l] = parseInt(i1Ii.substring(il1l11, il1l11 + 8), 2);
    }
    const llilI = btoa(String.fromCharCode.apply(null, iI1I11));
    return llilI;
  }
  const ii1Iil = ["B6dB3QqGZP1lKNICTaiAeNJSHKNepO5GGgtL6FUceqSlpFZCdx2SZ5MPPbzrgy91HeR0dnJazcMrvMgPF7bhFrfsGaApJKk4JohEEhoJ4kKJpAaGsfrFhb7FPgMvrMczaJnd0ReH19ygrzbPPM5ZS2xdCZFplSqecUF6LtgGG5OpeNKHSJNeAiaTCINKl1PZGqQ3Bd6B", "EUhzJoyKP7VydtpyBwNUGU2tqzI0QB0LIpQ10Fk3hX2ZcPoGRpACqmzcTQbKd98i3U7raFz2rMl2kys0ODgtAh22E3i57wmh38RbbR83hmw75i3E22hAtgDO0syk2lMr2zFar7U3i89dKbQTczmqCApRGoPcZ2Xh3kF01QpIL0BQ0Izqt2UGUNwByptdyV7PKyoJzhUE", "xexcHoyVwOs5TYTQVvU0iXn56ryKVdWedLTpq3KEKmbUHfwzuZjIpZOPVXMEappFhjdqwtp1bBrWaRBCfPFwCq2W8SsyvwqZ6sIGGIs6ZqwvysS8W2qCwFPfCBRaWrBb1ptwqdjhFppaEMXVPOZpIjZuzwfHUbmKEK3qpTLdeWdVKyr65nXi0UvVQTYT5sOwVyoHcxex", "2Llnegc5i4flqd4HZPFK210yh61boBxRSdnNVMeudKimx92Qi4aPuHP12HmEImbWrXjLgBGqy1bSnKvLhqMqhknyuse4nFoeLTkJJkTLeoFn4esuynkhqMqhLvKnSb1yqGBgLjXrWbmIEmH21PHuPa4iQ29xmiKdueMVNndSRxBob16hy012KFPZH4dqlf4i5cgenlL2", "dZzoMZF6xtt3voTFDbPzEZ7GeM8t7uY05d4K4xfhtdxELh96dDRB4oRYA2smET5dy1dafGkXOz2V7tNOVi0vSqfuhI99IKprVK6QQ6KVrpKI99IhufqSv0iVONt7V2zOXkGfad1yd5TEms2AYRo4BRDd69hLExdthfx4K4d50Yu7t8MeG7ZEzPbDFTov3ttx6FZMozZd", "SNYr3bWMtQulWZO2FEwuhSFp3EXPR1TujPRJwUFlxBh9Pvf2MeTEpR7a3dU6e9rNUMyBh2osDdK4Vdm4gZ0XcRCoHZPi2jiXT2dCCd2TXij2iPZHoCRcX0Zg4mdV4KdDso2hByMUNr9e6Ud3a7RpETeM2fvP9hBxlFUwJRPjuT1RPXE3pFShuwEF2OZWluQtMWb3rYNS", "4viQ2FrYHcrH44gqvPLo6KtiFu56AW1eXbDBZrBepzdLKE33Ey4TwFERnkVLnbHAXbKqAi0HFP9Eu7yg8WNlI7q2dvXGGiPaMbrBBrbMaPiGGXvd2q7IlNW8gy7uE9PFH0iAqKbXAHbnLVknREFwT4yE33EKLdzpeBrZBDbXe1WA65uFitK6oLPvqg44HrcHYrF2Qiv4", "0VIoSHBNVAW8De7NquFyEUm0o9xNnQJGn2OR1yOK9djWALhyP3a1XoQEwTnXuzypRuwsaLPUlertksOY6LYmnbQmPgdDQRXXKdKooKdKXXRQDdgPmQbnmYL6YOsktrelUPLaswuRpyzuXnTwEQoX1a3PyhLAWjd9KOy1RO2nGJQnNx9o0mUEyFuqN7eD8WAVNBHSoIV0", "fdJPBiTra9E0qg2HJrobeEC2SkOfSzbw6nG5J5ACx42GQDBsCyGfxNlHHYhl7EmkdvYaKAXUVXSKcTT1KhyYaj9Q4YtyhnOA7cLrrLc7AOnhytY4Q9jaYyhK1TTcKSXVUXAKaYvdkmE7lhYHHlNxfGyCsBDQG24xCA5J5Gn6wbzSfOkS2CEeborJH2gq0E9arTiBPJdf", "kLOA93PyUOX3QdlLuZ9JgNq1peyIITAQSnKzuLBZ2NthOSseAJMGCecvSLVKAww61Y31hJ4l7kAOcjLmtqQNJlNyJb5yu9d9vqWUUWqv9d9uy5bJyNlJNQqtmLjcOAk7l4Jh13Y16wwAKVLSvceCGMJAesSOhtN2ZBLuzKnSQATIIyep1qNgJ9ZuLldQ3XOUyP39AOLk"];
  let Iii1l = Date.now() + parseInt(l1l1li);
  typeof l1l1ll != "object" && (l1l1ll = JSON.parse(l1l1ll));
  l1l1ll.nowTime = Iii1l;
  let IliIi = l1ilii + Iii1l;
  const i1I1ll = IliIi.substring(0, IliIi.length - 5);
  let I11ll = "";
  for (let i1IliI = 0; i1IliI < i1I1ll.length; i1IliI++) {
    let I1lII = i1I1ll.charCodeAt(i1IliI),
      iili1l = I1lII % 10,
      il1l1i = ii1Iil[iili1l][i1IliI];
    I11ll += il1l1i;
  }
  var lllIll = I11ll.length,
    illii = Math.floor(lllIll / 24),
    ii1Iii = "";
  for (var Iii1i = 0; Iii1i < 24; Iii1i++) {
    var lllIli = (Iii1i + 1) * illii;
    Iii1i === 23 && (lllIli = lllIll);
    var lII1II = I11ll.substring(Iii1i * illii, lllIli);
    var IliIl = [];
    for (var illil = 0; illil < lII1II.length; illil++) {
      IliIl.push(lII1II.charCodeAt(illil));
    }
    var I11li = IliIl.reduce(function (IlIIii, lI1Ii) {
      return IlIIii + lI1Ii;
    }, 0);
    var l11il1 = Math.floor(I11li / IliIl.length);
    ii1Iii += String.fromCharCode(l11il1);
  }
  I11ll = ii1Iii;
  const li1I11 = l11ilI(I11ll),
    I1i1iI = IiIIii.enc.Utf8.parse(li1I11),
    liI1I = IiIIii.enc.Utf8.parse(""),
    l1illl = IiIIii.AES.encrypt(JSON.stringify(l1l1ll), I1i1iI, {
      "iv": liI1I,
      "mode": IiIIii.mode.ECB,
      "padding": IiIIii.pad.Pkcs7
    });
  return l1illl.toString();
}
function I1I1I() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lii1I1 = Array.from(new Set($.blacklist.split("&")));
  console.log(lii1I1.join("&") + "\n");
  let il1l1l = lii1I1,
    ii1li1 = [],
    iili1I = false;
  for (let I11I1l = 0; I11I1l < lIiili.length; I11I1l++) {
    let I11I1i = decodeURIComponent(lIiili[I11I1l].match(/pt_pin=([^; ]+)(?=;?)/) && lIiili[I11I1l].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!I11I1i) break;
    let llI1i = false;
    for (let IlIIli of il1l1l) {
      if (IlIIli && IlIIli == I11I1i) {
        llI1i = true;
        break;
      }
    }
    !llI1i && (iili1I = true, ii1li1.splice(I11I1l, -1, lIiili[I11I1l]));
  }
  if (iili1I) lIiili = ii1li1;
}
function l1IIII(i1IllI, ii1lil) {
  ii1lil != 0 && i1IllI.unshift(i1IllI.splice(ii1lil, 1)[0]);
}
function IIillI() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(lIiili, lIiili));
    return;
  }
  console.log("当前已设置白名单：");
  const l11IiI = Array.from(new Set($.whitelist.split("&")));
  console.log(l11IiI.join("&") + "\n");
  let i1Illl = [],
    i1Illi = l11IiI;
  for (let I1iliI in lIiili) {
    let I1ili1 = decodeURIComponent(lIiili[I1iliI].match(/pt_pin=([^; ]+)(?=;?)/) && lIiili[I1iliI].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    i1Illi.includes(I1ili1) && i1Illl.push(lIiili[I1iliI]);
  }
  helpCookiesArr = i1Illl;
  if (i1Illi.length > 1) for (let iIl1l1 in i1Illi) {
    let iIili1 = i1Illi[i1Illi.length - 1 - iIl1l1];
    if (!iIili1) continue;
    for (let Iil11l in helpCookiesArr) {
      let iI1iil = decodeURIComponent(helpCookiesArr[Iil11l].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[Iil11l].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      iIili1 == iI1iil && l1IIII(helpCookiesArr, Iil11l);
    }
  }
}