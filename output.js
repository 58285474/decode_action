//Tue Jul 02 2024 14:36:32 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const notify = $.isNode() ? require("./sendNotify") : "",
  jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
  cookie = "",
  allMessage = "",
  message = "",
  subTitle = "",
  option = {};
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(l1lil1 => {
    if (jdCookieNode[l1lil1]) {
      cookiesArr.push(jdCookieNode[l1lil1]);
    }
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(Ili1II => Ili1II.cookie)].filter(ili1i => !!ili1i);
console.log("共" + cookiesArr.length + "个京东账号\n");
let newShareCodes = [];
let jdNotify = true;
const urlSchema = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H");
let un_area = randomString(2, "1234567890") + "-" + randomString(4, "1234567890") + "-" + randomString(4, "1234567890") + "-" + randomString(5, "1234567890"),
  lng = "106.475" + Math.floor(Math.random() * 899 + 100),
  lat = "29.503" + Math.floor(Math.random() * 899 + 100),
  llhelp = true;
const fs = require("fs");
let boolneedUpdate = false,
  strShare = "./Fruit_ShareCache.json",
  Fileexists = fs.existsSync(strShare),
  TempShareCache = [];
Fileexists && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), TempShareCache = fs.readFileSync(strShare, "utf-8"), TempShareCache && (TempShareCache = TempShareCache.toString(), TempShareCache = JSON.parse(TempShareCache)));
let rs_wait = 1,
  waitTimes = parseInt(rs_wait) * 1000,
  lnrun = 0,
  llgetshare = false,
  NoNeedCodes = [];
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (llhelp) {
    console.log("\n【开始收集您的互助码，用于账号内部互助，请稍等...】\n");
    for (let iill1l = 0; iill1l < cookiesArr.length; iill1l++) {
      if (cookiesArr[iill1l]) {
        cookie = cookiesArr[iill1l];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = iill1l + 1;
        $.isLogin = true;
        $.nickName = "";
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        message = "";
        subTitle = "";
        option = {};
        $.UA = common.genUA($.UserName);
        $.retry = 0;
        llgetshare = false;
        await GetCollect();
        llgetshare && (await $.wait(5000), lnrun++);
        lnrun == 10 && (console.log("\n【访问接口次数达到10次，休息15秒.....】\n"), await $.wait(parseInt(waitTimes * 15 + 2000, 10)), lnrun = 0);
      }
    }
    if (boolneedUpdate) {
      var l1Ii1 = JSON.stringify(TempShareCache, null, 2);
      fs.writeFile(strShare, l1Ii1, function (III1II) {
        III1II ? (console.log(III1II), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
      });
    }
  }
  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");
  for (let l1I1II = 0; l1I1II < cookiesArr.length; l1I1II++) {
    if (cookiesArr[l1I1II]) {
      cookie = cookiesArr[l1I1II];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1I1II + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      message = "";
      subTitle = "";
      option = {};
      $.UA = common.genUA($.UserName);
      $.retry = 0;
      lnrun++;
      await jdFruit();
      lnrun == 5 && (console.log("\n【访问接口次数达到5次，休息15秒.....】\n"), await $.wait(parseInt(waitTimes * 15 + 2000, 10)), lnrun = 0);
    }
  }
  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(iIIlii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iIIlii + "!", "");
}).finally(() => {
  $.done();
});
async function jdFruit() {
  subTitle = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await initForFarm();
    if ($.farmInfo?.["farmUserPro"]) {
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      await masterHelpShare();
      await turntableFarm();
      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        option["open-url"] = urlSchema;
        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            option["open-url"] = urlSchema;
            return;
          }
        }
      }
    } else {
      if ($.farmInfo?.["code"] == 3) {
        console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");
      } else {
        if ($.farmInfo?.["code"] == 6) console.log("农场初始化异常：" + ($.farmInfo?.["code"] || "未知") + "，活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场初始化异常：" + ($.farmInfo?.["code"] || "未知") + "，" + ($.farmInfo?.["echo"] || "未知")) : console.log("农场初始化异常：" + ($.farmInfo?.["code"] || "未知") + "，" + ($.farmInfo?.["message"] || "未知"));
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 10000, 10)));
      $.retry < 2 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await jdFruit());
    }
  } catch (illill) {
    $.logErr(illill);
  }
}
async function turntableFarm() {
  await initForTurntableFarm();
  if ($.initForTurntableFarmRes?.["code"] === "0") {
    let {
      timingIntervalHours: IIII,
      timingLastSysTime: l1IIlI,
      sysTime: iil111,
      remainLotteryTimes: llIil1,
      turntableInfos: iiiIII
    } = $.initForTurntableFarmRes;
    console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");
    for (let Ill1I1 of newShareCodes) {
      if (Ill1I1 === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("天天抽奖-不能自己给自己助力\n");
        continue;
      }
      await lotteryMasterHelp(Ill1I1);
      if ($.lotteryMasterHelpRes?.["helpResult"]) {
        if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "0") {
          console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "成功\n");
        } else {
          if ($.lotteryMasterHelpRes?.["helpResult"]?.["code"] === "11") console.log("天天抽奖-不要重复助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "\n");else {
            if ($.lotteryMasterHelpRes.helpResult.code === "13") {
              console.log("天天抽奖-助力" + $.lotteryMasterHelpRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "失败,助力次数耗尽\n");
              break;
            }
          }
        }
      }
    }
    console.log("天天抽奖次数共-" + llIil1 + "次");
    if (llIil1 > 0) {
      console.log("开始抽奖");
      let IiIli = "";
      for (let illil1 = 0; illil1 < new Array(llIil1).fill("").length; illil1++) {
        await lotteryForTurntableFarm();
        console.log("第" + (illil1 + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
        if ($.lotteryRes.code === "0") {
          iiiIII.map(IIIlii => {
            if (IIIlii.type === $.lotteryRes.type) {
              console.log("lotteryRes.type" + $.lotteryRes?.["type"]);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") IiIli += IIIlii.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? IiIli += IIIlii.name + "，" : IiIli += IIIlii.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) {
            break;
          }
        }
      }
      IiIli && console.log("【天天抽奖】" + IiIli.substr(0, IiIli.length - 1) + "\n");
    } else console.log("抽奖完成没有次数啦~");
  } else console.log("初始化天天抽奖得好礼失败");
}
async function masterHelpShare() {
  await $.wait(2000);
  await initForFarm();
  let Ili111 = 0,
    Il11 = 3,
    iiil11 = "";
  if (llhelp) {
    console.log("开始助力好友");
    for (let i11il of newShareCodes) {
      if (NoNeedCodes) {
        var llII1I = false;
        for (let liIlIi of NoNeedCodes) {
          if (i11il == liIlIi) {
            llII1I = true;
            break;
          }
        }
        if (llII1I) {
          console.log(i11il + "助力已满，跳过...");
          continue;
        }
      }
      console.log($.UserName + "开始助力: " + i11il);
      if (!i11il) continue;
      if (!$.farmInfo?.["farmUserPro"]) {
        console.log("未种植,跳过助力\n");
        continue;
      }
      if (i11il === $.farmInfo?.["farmUserPro"]?.["shareCode"]) {
        console.log("不能为自己助力哦，跳过自己的shareCode\n");
        continue;
      }
      await masterHelp(i11il);
      if ($.helpResult?.["code"] === "0") {
        if ($.helpResult?.["helpResult"]?.["code"] === "0") Ili111 += $.helpResult?.["helpResult"]?.["salveHelpAddWater"], console.log("【助力好友结果】: 已成功给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力"), console.log("给好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力获得" + $.helpResult?.["helpResult"]?.["salveHelpAddWater"] + "g水滴"), iiil11 += ($.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] || "匿名用户") + ",";else {
          if ($.helpResult?.["helpResult"]?.["code"] === "8") console.log("【助力好友结果】: 助力【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】失败，您今天助力次数已耗尽");else {
            if ($.helpResult?.["helpResult"]?.["code"] === "9") console.log("【助力好友结果】: 之前给【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力过了");else $.helpResult?.["helpResult"]?.["code"] === "10" ? (NoNeedCodes.push(i11il), console.log("【助力好友结果】: 好友【" + $.helpResult?.["helpResult"]?.["masterUserInfo"]?.["name"] + "】助力已满")) : console.log("助力其他情况：" + JSON.stringify($.helpResult?.["helpResult"]));
          }
        }
        console.log("【今日助力次数还剩】" + $.helpResult?.["helpResult"]?.["remainTimes"] + "次\n");
        Il11 = $.helpResult?.["helpResult"]?.["remainTimes"];
        if ($.helpResult?.["helpResult"]?.["remainTimes"] === 0) {
          console.log("您当前助力次数已耗尽，跳出助力");
          break;
        }
      } else {
        if ($.helpResult?.["code"] == 3) console.log("助力失败: " + $.helpResult?.["code"] + ",未登录");else {
          if ($.helpResult?.["code"] == 6) console.log("助力失败: " + $.helpResult?.["code"] + ",活动太火爆");else $.helpResult?.["code"] == 2 ? console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["echo"]) : console.log("助力失败: " + $.helpResult?.["code"] + "," + $.helpResult?.["message"]);
        }
        ($.helpResult?.["code"] == 402 || $.helpResult?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      }
    }
  }
  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let ll11I1 = timeFormat() + $.farmInfo?.["farmUserPro"]?.["shareCode"];
    !$.getdata(ll11I1) && ($.setdata("", timeFormat(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo?.["farmUserPro"]?.["shareCode"]), $.setdata("", ll11I1));
    if (iiil11) {
      if ($.getdata(ll11I1)) {
        $.setdata($.getdata(ll11I1) + "," + iiil11, ll11I1);
      } else $.setdata(iiil11, ll11I1);
    }
    iiil11 = $.getdata(ll11I1);
  }
  if (iiil11 && iiil11.length > 0) {}
  Ili111 > 0 && console.log("【助力好友👬】获得" + Ili111 + "g💧\n");
  console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}
async function GetCollect() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var iIliil = false,
      IIiill = "";
    if (TempShareCache) {
      for (let liIi = 0; liIi < TempShareCache.length; liIi++) {
        TempShareCache[liIi].pt_pin == $.UserName && (iIliil = true, IIiill = TempShareCache[liIi].ShareCode);
      }
    }
    if (!iIliil) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      llgetshare = true;
      await initForFarm();
      if ($.farmInfo?.["farmUserPro"]) {
        var liIIii = {};
        IIiill = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        liIIii = {
          "pt_pin": $.UserName,
          "ShareCode": IIiill
        };
        TempShareCache.push(liIIii);
        boolneedUpdate = true;
      }
    }
    IIiill ? (console.log("\n" + IIiill), newShareCodes.push(IIiill)) : console.log("\n数据异常");
  } catch (I1lii1) {
    $.logErr(I1lii1);
  }
}
async function getFullCollectionReward() {
  return new Promise(IIiili => {
    const IIiiiI = {
      "type": 2,
      "version": 6,
      "channel": 2
    };
    $.post(taskUrl("getFullCollectionReward", IIiiiI), (lIi1l1, i11IlI, Ii1I1) => {
      try {
        lIi1l1 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(lIi1l1)), $.logErr(lIi1l1)) : safeGet(Ii1I1) && ($.duckRes = JSON.parse(Ii1I1));
      } catch (IIIlli) {
        $.logErr(IIIlli, i11IlI);
      } finally {
        IIiili();
      }
    });
  });
}
async function totalWaterTaskForFarm() {
  $.totalWaterReward = await request("totalWaterTaskForFarm");
}
async function firstWaterTaskForFarm() {
  $.firstWaterReward = await request("firstWaterTaskForFarm");
}
async function waterFriendGotAwardForFarm() {
  $.waterFriendGotAwardRes = await request("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}
async function myCardInfoForFarm() {
  $.myCardInfoRes = await request("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}
async function userMyCardForFarm(IIiiii) {
  $.userMyCardRes = await request("userMyCardForFarm", {
    "cardType": IIiiii
  });
}
async function gotStageAwardForFarm(liIl) {
  $.gotStageAwardForFarmRes = await request("gotStageAwardForFarm", {
    "type": liIl
  });
}
async function waterGoodForFarm() {
  await $.wait(parseInt(waitTimes * 1 + 2000, 10));
  $.waterResult = await request("waterGoodForFarm");
}
async function initForTurntableFarm() {
  $.initForTurntableFarmRes = await request("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function lotteryForTurntableFarm() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await request("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}
async function timingAwardForTurntableFarm() {
  $.timingAwardRes = await request("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}
async function browserForTurntableFarm(l1IIiI, IlilIi) {
  l1IIiI === 1 && console.log("浏览爆品会场");
  l1IIiI === 2 && console.log("天天抽奖浏览任务领取水滴");
  const i11IiI = {
    "type": l1IIiI,
    "adId": IlilIi,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await request("browserForTurntableFarm", i11IiI);
}
async function browserForTurntableFarm2(IlilII) {
  const iIII1 = {
    "type": 2,
    "adId": IlilII,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await request("browserForTurntableFarm", iIII1);
}
async function lotteryMasterHelp() {
  $.lotteryMasterHelpRes = await request("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}
async function masterGotFinishedTaskForFarm() {
  $.masterGotFinished = await request("masterGotFinishedTaskForFarm");
}
async function masterHelpTaskInitForFarm() {
  $.masterHelpResult = await request("masterHelpTaskInitForFarm");
}
async function farmAssistInit() {
  $.farmAssistResult = await request("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function receiveStageEnergy() {
  $.receiveStageEnergy = await request("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}
async function inviteFriend() {
  $.inviteFriendRes = await request("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}
async function masterHelp() {
  $.helpResult = await request("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}
async function waterRainForFarm() {
  const li1i1 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await request("waterRainForFarm", li1i1);
}
async function clockInInitForFarm() {
  $.clockInInit = await request("clockInInitForFarm");
}
async function clockInForFarm() {
  $.clockInForFarmRes = await request("clockInForFarm", {
    "type": 1
  });
}
async function clockInFollowForFarm(ilIll1, I1IIil, I1IIii) {
  let li11i1 = {
    "id": ilIll1,
    "type": I1IIil,
    "step": I1IIii
  };
  if (I1IIil === "theme") {
    if (I1IIii === "1") $.themeStep1 = await request("clockInFollowForFarm", li11i1);else I1IIii === "2" && ($.themeStep2 = await request("clockInFollowForFarm", li11i1));
  } else {
    if (I1IIil === "venderCoupon") {
      if (I1IIii === "1") $.venderCouponStep1 = await request("clockInFollowForFarm", li11i1);else I1IIii === "2" && ($.venderCouponStep2 = await request("clockInFollowForFarm", li11i1));
    }
  }
}
async function gotClockInGift() {
  $.gotClockInGiftRes = await request("gotClockInGift", {
    "type": 2
  });
}
async function gotThreeMealForFarm() {
  $.threeMeal = await request("gotThreeMealForFarm");
}
async function browseAdTaskForFarm(ilIli1, li11lI) {
  if (li11lI === 0) $.browseResult = await request("browseAdTaskForFarm", {
    "advertId": ilIli1,
    "type": li11lI
  });else li11lI === 1 && ($.browseRwardResult = await request("browseAdTaskForFarm", {
    "advertId": ilIli1,
    "type": li11lI
  }));
}
async function gotWaterGoalTaskForFarm() {
  $.goalResult = await request("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}
async function signForFarm() {
  $.signResult = await request("signForFarm");
}
async function initForFarm() {
  $.farmInfo = await request("initForFarm", {
    "babelChannel": "522",
    "sid": "",
    "un_area": un_area,
    "version": 25,
    "channel": 1,
    "lat": lat,
    "lng": lng
  });
}
async function taskInitForFarm() {
  console.log("\n初始化任务列表");
  $.farmTask = await request("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}
async function friendListInitForFarm() {
  $.friendList = await request("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}
async function awardInviteFriendForFarm() {
  $.awardInviteFriendRes = await request("awardInviteFriendForFarm");
}
async function waterFriendForFarm(li1lI) {
  const IIlIII = {
    "shareCode": li1lI,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await request("waterFriendForFarm", IIlIII);
}
async function showMsg() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else {
    if ($.getdata("jdFruitNotify")) {
      $.ctrTemp = $.getdata("jdFruitNotify") === "false";
    } else $.ctrTemp = "" + jdNotify === "false";
  }
  $.ctrTemp ? ($.msg($.name, subTitle, message, option), $.isNode() && (allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : ""))) : $.log("\n" + message + "\n");
}
function timeFormat(ll1Il1) {
  let iliiii;
  return ll1Il1 ? iliiii = new Date(ll1Il1) : iliiii = new Date(), iliiii.getFullYear() + "-" + (iliiii.getMonth() + 1 >= 10 ? iliiii.getMonth() + 1 : "0" + (iliiii.getMonth() + 1)) + "-" + (iliiii.getDate() >= 10 ? iliiii.getDate() : "0" + iliiii.getDate());
}
function safeGet(i1Ii1) {
  if (!i1Ii1) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(i1Ii1) == "object") return true;
  } catch (iIIIll) {
    return console.log(iIIIll), false;
  }
}
async function request(li1ll, iliii1 = {}) {
  let lIllil = "",
    iilIi1 = "POST";
  const I111 = {
      "initForFarm": "8a2af",
      "taskInitForFarm": "fcb5a",
      "browseAdTaskForFarm": "53f09",
      "firstWaterTaskForFarm": "0cf1e",
      "waterFriendGotAwardForFarm": "d08ff",
      "ddnc_getTreasureBoxAward": "67dfc",
      "totalWaterTaskForFarm": "102f5",
      "gotThreeMealForFarm": "57b30",
      "waterGoodForFarm": "0c010",
      "choiceGoodsForFarm": "5f4ca",
      "gotCouponForFarm": "b1515",
      "gotStageAwardForFarm": "81591",
      "followVenderForBrand": "71547",
      "gotWaterGoalTaskForFarm": "c901b",
      "gotNewUserTaskForFarm": "de8f8",
      "orderTaskGotWaterForFarm": "eed5c",
      "clockInForFarm": "32b94",
      "clockInFollowForFarm": "4a0b4",
      "waterFriendForFarm": "673a0",
      "awardFirstFriendForFarm": "9b655",
      "awardInviteFriendForFarm": "2b5ca",
      "awardCallOrInviteFriendForFarm": "b0b03",
      "userMyCardForFarm": "86ba5",
      "getCallUserCardForFarm": "2ca57",
      "deleteFriendForFarm": "eaf91",
      "gotLowFreqWaterForFarm": "8172b",
      "getFullCollectionReward": "5c767",
      "getOrderPayLotteryWater": "ef089",
      "receiveStageEnergy": "15507",
      "exchangeGood": "52963",
      "farmAssistInit": "92354",
      "myCardInfoForFarm": "157b6",
      "gotPopFirstPurchaseTaskForFarm": "d432f",
      "limitWaterInitForFarm": "6bdc2",
      "ddnc_surpriseModal": "e81c1",
      "friendInitForFarm": "a5a9c",
      "clockInInitForFarm": "08dc3",
      "guideTaskAward": "59bc4",
      "signForFarm": "32b94",
      "gotNewUserTaskForFarm": "de8f8"
    },
    I1I11l = I111[li1ll];
  if (!I1I11l) iilIi1 = "GET", lIllil = "https://api.m.jd.com/client.action?functionId=" + li1ll + "&body=" + encodeURIComponent(JSON.stringify(iliii1)) + "&appid=wh5";else {
    const Ili1i1 = await H5st.getH5st({
      "appId": I1I11l,
      "appid": "signed_wh5",
      "body": iliii1,
      "client": "iOS",
      "clientVersion": "12.2.0",
      "functionId": li1ll,
      "cookie": cookie,
      "ua": $.UA,
      "version": "4.2",
      "t": true
    });
    lIllil = "https://api.m.jd.com/client.action?" + Ili1i1.params;
  }
  await $.wait(700);
  const I1I11i = {
      "url": lIllil,
      "method": iilIi1,
      "headers": {
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Origin": "https://carry.m.jd.com",
        "Accept-Encoding": "gzip,deflate,br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://carry.m.jd.com/",
        "x-requested-with": "com.jingdong.app.mall",
        "Cookie": cookie
      },
      "body": iliii1,
      "timeout": 20000
    },
    l1iI1l = 1;
  let III1ll = 0,
    l1lIIi = null,
    iII11I = false;
  while (III1ll < l1iI1l) {
    III1ll > 0 && (await $.wait(1000));
    const I1I11I = await common.request(I1I11i);
    if (!I1I11I.success) {
      l1lIIi = "🚫 请求失败 ➜ " + I1I11I.error;
      III1ll++;
      continue;
    }
    if (!I1I11I?.["data"]) {
      l1lIIi = "🚫 请求失败 ➜ 无响应数据";
      III1ll++;
      continue;
    }
    return data = I1I11I.data, data;
  }
  if (III1ll >= l1iI1l) {
    console.log(l1lIIi);
    if (iII11I) {
      $.outFlag = true;
      $.message && $.message.fix(l1lIIi);
    }
  }
}
function randomString(lIlllI, III1lI = "qwertyuiopasdfghjklzxcvbnm") {
  let ll1IlI = "";
  for (let iilIil = 0; iilIil < lIlllI; iilIil++) {
    ll1IlI += III1lI[Math.floor(Math.random() * III1lI.length)];
  }
  return ll1IlI;
}
function jsonParse(i1IiII) {
  if (typeof i1IiII == "string") try {
    return JSON.parse(i1IiII);
  } catch (lIllll) {
    return console.log(lIllll), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}