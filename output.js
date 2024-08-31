//Sat Aug 31 2024 15:10:53 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let lz_cookie = {},
  activityCookie = "",
  cookiesArr = [],
  cookie = "",
  message = "",
  activityUrl = process.env.jd_pointExgShiWu_activityUrl ? process.env.jd_pointExgShiWu_activityUrl : "",
  UserAdd_Data_Arr = null;
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(Ii111ii => {
    cookiesArr.push(jdCookieNode[Ii111ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIIl1lII => lIIl1lII.cookie)].filter(li1I1II => !!li1I1II);
if (activityUrl) activityId = getQueryString("" + activityUrl, "giftId"), venderId = getQueryString("" + activityUrl, "venderId"), $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];else {
  console.log("请填写活动链接");
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    console.log("活动id不存在！");
    return;
  }
  if (!venderId) {
    console.log("店铺id不存在！");
    return;
  }
  process.env.jd_pointExgShiWu_address ? UserAdd_Data_Arr = process.env.jd_pointExgShiWu_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let l1IIIiIi = [];
    l1IIIiIi = UserAdd_Data_Arr.split("|");
    var iI111I11 = Math.floor(Math.random() * l1IIIiIi.length);
    if (l1IIIiIi[iI111I11] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      l1IIIiIi = l1IIIiIi[iI111I11];
    }
    if (process.env.jd_pointExgShiWu_address) {
      l1IIIiIi = l1IIIiIi.split("@");
      if (l1IIIiIi.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let iIi1Ii1i = 0; iIi1Ii1i < 6; iIi1Ii1i++) {
        if (l1IIIiIi[iIi1Ii1i] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      l1IIIiIi = l1IIIiIi.split("@");
      if (l1IIIiIi.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let lIIlliI = 0; lIIlliI < 7; lIIlliI++) {
        if (l1IIIiIi[lIIlliI] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = l1IIIiIi[0];
    $.phone = l1IIIiIi[1];
    $.province = l1IIIiIi[2];
    $.city = l1IIIiIi[3];
    $.county = l1IIIiIi[4];
    $.address = l1IIIiIi[5];
  } else {
    console.log("请先定义环境变量 jd_pointExgShiWu_address 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let ii1Il1l1 = 0; ii1Il1l1 < cookiesArr.length; ii1Il1l1++) {
    if (cookiesArr[ii1Il1l1]) {
      cookie = cookiesArr[ii1Il1l1];
      originCookie = cookiesArr[ii1Il1l1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = ii1Il1l1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await pointExgShiWu();
      await $.wait(2000);
      if ($.hasEnd || $.outFlag || $.activityEnd) break;
    }
  }
})().catch(iii1I1l => {
  $.log("", " " + $.name + ", 失败! 原因: " + iii1I1l + "!", "");
}).finally(() => {
  $.done();
});
async function pointExgShiWu() {
  $.buyerPoints = 0;
  $.exgByPeopDay = 0;
  $.exgByActivity = 0;
  $.sid = "";
  $.venderId = venderId;
  $.token = "";
  $.Pin = "";
  await getCk();
  if ($.activityEnd) return;
  if ($.outFlag) {
    console.log("此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n");
    return;
  }
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await $.wait(1000);
  if ($.venderId) {
    if ($.token) await getPin();
    if (!$.Pin) {
      console.log("未能获取用户鉴权信息！");
      return;
    }
    await $.wait(1000);
    await accessLog();
    await $.wait(1000);
    await selectShiWu();
    if ($.remainNum == 0) {
      console.log("当前奖品库存：" + $.remainNum + " / " + $.num + " 🎁");
      console.log("\n当前活动的奖品已全部发放完了，下次早点来吧~");
      $.hasEnd = true;
      return;
    }
    if ($.takeBeginTime) {
      if (!checkAuditTime($.takeBeginTime, $.takeEndTime)) {
        console.log("⛔️ 当前不在每日兑换时间内！");
        $.hasEnd = true;
        return;
      }
    }
    await $.wait(1000);
    await getBuyerPoints();
    if ($.grade === 0) {
      console.log("⛔️ 活动仅限店铺会员参与");
      return;
    }
    if ($.buyerPoints == 0) {
      console.log("⛔️ 用户当前没有积分");
      return;
    }
    await $.wait(1000);
    console.log("当前奖品库存：" + $.remainNum + " / " + $.num);
    console.log("用户等级：" + $.grade + " | 当前积分：" + $.buyerPoints);
    let i1I1lll = null;
    switch (String($.grade)) {
      case "0":
        i1I1lll = $.point0;
        break;
      case "1":
        i1I1lll = $.point1;
        break;
      case "2":
        i1I1lll = $.point2;
        break;
      case "3":
        i1I1lll = $.point3;
        break;
      case "4":
        i1I1lll = $.point4;
        break;
      case "5":
        i1I1lll = $.point5;
        break;
    }
    if (i1I1lll === null) {
      console.log("\n⛔️ 用户当前会员等级不符合兑换要求");
      return;
    }
    if ($.buyerPoints >= i1I1lll) {
      console.log("");
      await saveAddress();
      await $.wait(1000);
      for (let Il11iil1 = 0; Il11iil1 < 10; Il11iil1++) {
        await exgShiWu();
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
      !$.getPrize && !$.exgStop && !$.activityEnd && console.log("\n⛔️ 已尝试多次，未能兑换实物");
    } else {
      console.log("\n⛔️ 用户积分不足");
    }
  } else {
    console.log("未能获取活动信息（店铺ID）");
    $.activityEnd = true;
  }
}
function showMsg() {
  return new Promise(i1Iiii11 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    i1Iiii11();
  });
}
function getSimpleActInfoVo() {
  return new Promise(iIl11lI1 => {
    let l1l1l11l = "activityId=" + activityId;
    $.post(taskPostUrl("/customer/getSimpleActInfoVo", l1l1l11l), async (IIlll1ii, ilII1I1I, II1IlIl1) => {
      try {
        if (IIlll1ii) console.log(String(IIlll1ii)), console.log($.name + " getSimpleActInfoVo API请求失败，请检查网路重试");else {}
      } catch (Il1l1II) {
        $.logErr(Il1l1II, ilII1I1I);
      } finally {
        iIl11lI1();
      }
    });
  });
}
function getCk() {
  return new Promise(liIl11i => {
    let ii1IlIlI = {
      "url": activityUrl,
      "headers": {
        "User-Agent": $.UA
      }
    };
    $.get(ii1IlIlI, async (lIiiiIii, Il1IIlli, Iii1ilI) => {
      try {
        if (lIiiiIii) Il1IIlli && typeof Il1IIlli.statusCode != "undefined" && Il1IIlli.statusCode == 493 && (console.log("getCk 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + JSON.stringify(lIiiiIii)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          let lli1iIll = Iii1ilI.match(/(活动已结束)/) && Iii1ilI.match(/(活动已结束)/)[1] || Iii1ilI.match(/(活动尚未开始)/) && Iii1ilI.match(/(活动尚未开始)/)[1] || "";
          if (lli1iIll) {
            $.activityEnd = true;
            console.log("活动已结束或者未开始");
          }
          Il1IIlli.status == 200 && refreshToken(Il1IIlli);
        }
      } catch (iiIlI1l1) {
        $.logErr(iiIlI1l1, Il1IIlli);
      } finally {
        liIl11i();
      }
    });
  });
}
function getPin() {
  return new Promise(lIIlIiIl => {
    let IIi11I11 = "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP";
    $.post(taskPostUrl("/customer/getMyPing", IIi11I11), async (liiIii1i, I1iiII, Il11llI) => {
      try {
        if (liiIii1i) console.log("" + JSON.stringify(liiIii1i)), console.log($.name + " 3 API请求失败，请检查网路重试");else {
          I1iiII.status == 200 && refreshToken(I1iiII);
          if (safeGet(Il11llI)) {
            Il11llI = JSON.parse(Il11llI);
            if (Il11llI.result && Il11llI.data) $.Pin = Il11llI.data.secretPin, $.AUTH_C_USER = $.Pin, $.attrTouXiang = Il11llI.data.yunMidImageUrl ? Il11llI.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg", $.nickName = Il11llI.data.pin;else {}
          }
        }
      } catch (ili1IlII) {
        $.logErr(ili1IlII, I1iiII);
      } finally {
        lIIlIiIl();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIlIIIi1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let ii111i11 = "";
    if ($.shopactivityId) ii111i11 = ",\"activityId\":" + $.shopactivityId;
    const Iliiil1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + ii111i11 + ",\"channel\":406}",
      ll1l1ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iliiil1)
      },
      iliI1II = await getH5st("8adfb", ll1l1ii),
      liIiIiIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Iliiil1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iliI1II),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liIiIiIi, async (l1illlII, I1liIil1, i1i1ll11) => {
      try {
        i1i1ll11 = i1i1ll11 && i1i1ll11.match(/jsonp_.*?\((.*?)\);/) && i1i1ll11.match(/jsonp_.*?\((.*?)\);/)[1] || i1i1ll11;
        let IlliI1I = $.toObj(i1i1ll11, i1i1ll11);
        if (IlliI1I && typeof IlliI1I == "object") {
          if (IlliI1I && IlliI1I.success === true) {
            console.log(IlliI1I.message);
            $.errorJoinShop = IlliI1I.message;
            if (IlliI1I.result && IlliI1I.result.giftInfo) {
              for (let IliIliIl of IlliI1I.result.giftInfo.giftList) {
                console.log("入会获得: " + IliIliIl.discountString + IliIliIl.prizeName + IliIliIl.secondLineDesc);
              }
            }
            console.log("");
          } else IlliI1I && typeof IlliI1I == "object" && IlliI1I.message ? ($.errorJoinShop = IlliI1I.message, console.log("" + (IlliI1I.message || ""))) : console.log(i1i1ll11);
        } else console.log(i1i1ll11);
      } catch (I1llIIil) {
        $.logErr(I1llIIil, I1liIil1);
      } finally {
        IIlIIIi1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lIl1iII1 => {
    let IIIIl1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iill1l = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIIIl1ll)
      },
      II1llIiI = await getH5st("ef79a", iill1l),
      ii1I11li = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIIIl1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(II1llIiI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ii1I11li, async (lIIlIIl, llllIili, lIliIl1l) => {
      try {
        lIliIl1l = lIliIl1l && lIliIl1l.match(/jsonp_.*?\((.*?)\);/) && lIliIl1l.match(/jsonp_.*?\((.*?)\);/)[1] || lIliIl1l;
        let il1liili = $.toObj(lIliIl1l, lIliIl1l);
        il1liili && typeof il1liili == "object" ? il1liili && il1liili.success == true && (console.log("\n去加入店铺会员：" + (il1liili.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = il1liili.result.interestsRuleList && il1liili.result.interestsRuleList[0] && il1liili.result.interestsRuleList[0].interestsInfo && il1liili.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIliIl1l);
      } catch (l1iIiilI) {
        $.logErr(l1iIiilI, llllIili);
      } finally {
        lIl1iII1();
      }
    });
  });
}
function getUserInfo() {
  return new Promise(lIlIIll1 => {
    let I1iiIIl = "pin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/wxActionCommon/getUserInfo", I1iiIIl), async (lilI1I, iIIIl1Ii, l1IIlI1i) => {
      try {
        lilI1I ? (console.log("" + JSON.stringify(lilI1I)), console.log($.name + " 6-1 API请求失败，请检查网路重试")) : safeGet(l1IIlI1i) && (l1IIlI1i = JSON.parse(l1IIlI1i), l1IIlI1i.result && l1IIlI1i.data ? $.attrTouXiang = l1IIlI1i.data.yunMidImageUrl ? l1IIlI1i.data.yunMidImageUrl : "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg" : console.log("异常6-2：" + JSON.stringify(l1IIlI1i)));
      } catch (I1ili111) {
        $.logErr(I1ili111, iIIIl1Ii);
      } finally {
        lIlIIll1();
      }
    });
  });
}
function getBuyerPoints(iiI111li = 0) {
  return new Promise(Ili1I11l => {
    let i1I1ll = encodeURIComponent(encodeURIComponent($.Pin)),
      Iil1lI1l = "venderId=" + venderId + "&buyerPin=" + i1I1ll;
    $.post(taskPostUrl("/mc/wxPointShop/getBuyerPoints", Iil1lI1l), async (iII1i11I, IIliiI1l, lliI1IiI) => {
      try {
        iII1i11I ? (console.log("" + JSON.stringify(iII1i11I)), console.log($.name + "getBuyerPoints 请求失败，请检查网路重试")) : safeGet(lliI1IiI) && (lliI1IiI = JSON.parse(lliI1IiI), lliI1IiI.result && lliI1IiI.data ? ($.grade = lliI1IiI.data.grade, $.buyerPoints = lliI1IiI.data.buyerPoints) : console.log(lliI1IiI.errorMessage || ""));
      } catch (IlliIIIi) {
        $.logErr(IlliIIIi, IIliiI1l);
      } finally {
        Ili1I11l();
      }
    });
  });
}
function exgShiWu(liI1iI1i = 0) {
  return new Promise(III1l11l => {
    let Iiil11 = encodeURIComponent(encodeURIComponent($.Pin)),
      IiI11iI = "buyerPin=" + Iiil11 + "&buyerNick=" + encodeURIComponent($.nickName) + "&giftId=" + activityId + "&venderId=" + venderId + "&addressId=" + addressId;
    $.post(taskPostUrl("/mc/wxPointShop/exgShiWu", IiI11iI), async (IilI1ill, liIlIl11, l11I11l) => {
      try {
        if (IilI1ill) console.log("" + JSON.stringify(IilI1ill)), console.log($.name + "exgShiWu 请求失败，请检查网路重试");else {
          if (safeGet(l11I11l)) {
            l11I11l = JSON.parse(l11I11l);
            if (l11I11l.result) console.log("🎉 兑换成功"), $.getPrize = true;else {
              let lilIIiI1 = l11I11l.errorMessage || "";
              if (!lilIIiI1.includes("擦肩") && !lilIIiI1.includes("火爆")) {
                console.log(lilIIiI1 || "");
              }
              for (let ill1Ii1 of ["未开始", "结束", "不存在", "不在", "发完", "兑完", "兑光", "发放完", "领完", "来晚", "抢光", "全部被领取", "余额不足"]) {
                if (lilIIiI1.includes(ill1Ii1)) {
                  $.activityEnd = true;
                  break;
                }
              }
              for (let iIlIlIIi of ["不足", "上限", "会员", "变更值", "擦肩"]) {
                if (lilIIiI1.includes(iIlIlIIi)) {
                  $.exgStop = true;
                  break;
                }
              }
            }
          }
          liIlIl11.status == 200 && refreshToken(liIlIl11);
        }
      } catch (Ii1IlI1) {
        $.logErr(Ii1IlI1, liIlIl11);
      } finally {
        III1l11l();
      }
    });
  });
}
function saveAddress(l1111I1i = 0) {
  return new Promise(llI1i1lI => {
    let i1IIllil = encodeURIComponent(encodeURIComponent($.Pin)),
      liIiI1iI = "buyerPin=" + i1IIllil + "&venderId=" + venderId + "&receiver=" + encodeURIComponent($.receiver) + "&receiverPhone=" + $.phone + "&province=" + encodeURIComponent($.province) + "&city=" + encodeURIComponent($.city) + "&county=" + encodeURIComponent($.county) + "&address=" + encodeURIComponent($.address);
    $.post(taskPostUrl("/mc/wxPointShop/saveAddress", liIiI1iI), async (il1I1iIl, i11iI11I, lli1li1) => {
      try {
        if (il1I1iIl) console.log("" + JSON.stringify(il1I1iIl)), console.log($.name + "saveAddress 请求失败，请检查网路重试");else {
          if (safeGet(lli1li1)) {
            lli1li1 = JSON.parse(lli1li1);
            if (lli1li1.result && lli1li1.data) {
              addressId = lli1li1.data.addressId;
            } else console.log(lli1li1.errorMessage || "");
          }
        }
      } catch (ilIillll) {
        $.logErr(ilIillll, i11iI11I);
      } finally {
        llI1i1lI();
      }
    });
  });
}
function selectShiWu(ii1II11i = 0) {
  return new Promise(lIii1il => {
    let ilI1i1i = "venderId=" + venderId + "&giftId=" + activityId;
    $.post(taskPostUrl("/mc/shiWu/selectShiWu", ilI1i1i), async (IIIIlii, I1111ili, lIl1I1) => {
      try {
        if (IIIIlii) console.log("" + JSON.stringify(IIIIlii)), console.log($.name + "selectShiWu 请求失败，请检查网路重试");else {
          if (safeGet(lIl1I1)) {
            lIl1I1 = JSON.parse(lIl1I1);
            if (lIl1I1.result && lIl1I1.data) {
              $.giftName = lIl1I1.data.mcGiftBaseInfo.giftName;
              $.usedNum = lIl1I1.data.mcGiftBaseInfo.usedNum;
              $.num = lIl1I1.data.mcGiftBaseInfo.num;
              $.actrule = lIl1I1.data.mcGiftBaseInfo.actrule;
              $.exgTime = lIl1I1.data.mcGiftBaseInfo.exgTime;
              $.exgByActivity = lIl1I1.data.mcGiftBaseInfo.exgByActivity;
              $.exgByPeopDay = lIl1I1.data.mcGiftBaseInfo.exgByPeopDay;
              $.exgTimeType = lIl1I1.data.mcGiftBaseInfo.exgTimeType;
              $.otherRule = lIl1I1.data.mcGiftBaseInfo.otherRule;
              $.point0 = lIl1I1.data.mcGiftBaseInfo.point0;
              $.point1 = lIl1I1.data.mcGiftBaseInfo.point1;
              $.point2 = lIl1I1.data.mcGiftBaseInfo.point2;
              $.point3 = lIl1I1.data.mcGiftBaseInfo.point3;
              $.point4 = lIl1I1.data.mcGiftBaseInfo.point4;
              $.point5 = lIl1I1.data.mcGiftBaseInfo.point5;
              $.takeBeginTime = lIl1I1.data.mcShiWu.takeBeginTime;
              $.takeEndTime = lIl1I1.data.mcShiWu.takeEndTime || "24:00";
              $.index === 1 && (console.log("活动名称：" + $.giftName), console.log("活动规则：\n" + $.actrule + "\n"));
              $.remainNum = parseInt($.num - $.usedNum);
            } else console.log(lIl1I1.errorMessage || "");
          }
        }
      } catch (lli1liiI) {
        $.logErr(lli1liiI, I1111ili);
      } finally {
        lIii1il();
      }
    });
  });
}
function getOpenCardInfo() {
  return new Promise(i1il11 => {
    let liIi1Iii = "activityType=40&venderId=" + $.venderId + "&buyerPin=" + encodeURIComponent(encodeURIComponent($.Pin));
    $.post(taskPostUrl("/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo", liIi1Iii), async (lliIiii, IiIi1iiI, ll11ilil) => {
      try {
        if (lliIiii) console.log("" + JSON.stringify(lliIiii)), console.log($.getOpenCardInfo + "API请求失败，请检查网路重试");else {
          if (safeGet(ll11ilil)) {
            ll11ilil = JSON.parse(ll11ilil);
            if (ll11ilil.result && ll11ilil.data) {
              $.openedCard = ll11ilil.data.openedCard || false;
              if (ll11ilil.data.openCardLink) $.channel = ll11ilil.data.openCardLink.match(/channel=(\d+)/)[1], $.joinVenderId = ll11ilil.data.openCardLink.match(/venderId=(\d+)/)[1];else {}
            }
          }
        }
      } catch (l1II1I1I) {
        $.logErr(l1II1I1I, IiIi1iiI);
      } finally {
        i1il11();
      }
    });
  });
}
function taskPostUrl(iIIiliii, Il1lIilI) {
  return {
    "url": "" + domains + iIIiliii,
    "body": Il1lIilI,
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}
function accessLog() {
  return new Promise(async l11Illli => {
    const iI111I1l = {
      "url": domains + "/common/accessLog",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": activityUrl,
        "Cookie": activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      "body": "venderId=" + venderId + "&code=202&pin=" + encodeURIComponent(encodeURIComponent($.Pin)) + "&activityId=" + activityId + "&pageUrl=https%3A%2F%2F$cjhy-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D" + activityId + "&subType=app"
    };
    $.post(iI111I1l, (IliiiIIi, ilIlllll, iIiIl1il) => {
      try {
        if (IliiiIIi) console.log("" + JSON.stringify(IliiiIIi)), console.log($.name + " API请求失败，请检查网路重试");else {
          ilIlllll.status == 200 && refreshToken(ilIlllll);
        }
      } catch (li1l1iiI) {
        $.logErr(li1l1iiI, ilIlllll);
      } finally {
        l11Illli();
      }
    });
  });
}
function refreshToken(II11il1) {
  if (II11il1) {
    if (II11il1.headers["set-cookie"]) {
      cookie = "";
      for (let I1llIII1 of II11il1.headers["set-cookie"]) {
        lz_cookie[I1llIII1.split(";")[0].substr(0, I1llIII1.split(";")[0].indexOf("="))] = I1llIII1.split(";")[0].substr(I1llIII1.split(";")[0].indexOf("=") + 1);
      }
      for (const IIilillI of Object.keys(lz_cookie)) {
        cookie += IIilillI + "=" + lz_cookie[IIilillI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(l1IlI1Ii) {
  l1IlI1Ii = l1IlI1Ii || 32;
  let iIllIII1 = "abcdef0123456789",
    ili1IIl1 = iIllIII1.length,
    ili1IIli = "";
  for (i = 0; i < l1IlI1Ii; i++) ili1IIli += iIllIII1.charAt(Math.floor(Math.random() * ili1IIl1));
  return ili1IIli;
}
function random(IIiiIiIl, li1lII) {
  return Math.floor(Math.random() * (li1lII - IIiiIiIl)) + IIiiIiIl;
}
function safeGet(lIl1iil) {
  if (!lIl1iil) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lIl1iil) == "object") return true;
  } catch (IIIIllii) {
    return console.log(IIIIllii), false;
  }
}
function jsonParse(I1liiI1l) {
  if (typeof I1liiI1l == "string") try {
    return JSON.parse(I1liiI1l);
  } catch (ilIiIlI) {
    return console.log(ilIiIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(liI11IIl, lIiiiI) {
  let I11IIIil = new RegExp("(^|[&?])" + lIiiiI + "=([^&]*)(&|$)"),
    lI1lIil1 = liI11IIl.match(I11IIIil);
  if (lI1lIil1 != null) return decodeURIComponent(lI1lIil1[2]);
  return "";
}
function checkAuditTime(iilIl111, lIilIiI1) {
  var il1llil = new Date();
  var iiii1I11 = new Date(il1llil);
  var iIiIii1I = new Date(il1llil);
  var li1illiI = iilIl111.lastIndexOf(":");
  var Iiil11Il = iilIl111.substring(0, li1illiI);
  var IilIili1 = iilIl111.substring(li1illiI + 1, iilIl111.length);
  iiii1I11.setHours(Iiil11Il, IilIili1, 0, 0);
  var Iiii1lIi = lIilIiI1.lastIndexOf(":");
  var IilI1l = lIilIiI1.substring(0, Iiii1lIi);
  var ilI1i1iI = lIilIiI1.substring(Iiii1lIi + 1, lIilIiI1.length);
  iIiIii1I.setHours(IilI1l, ilI1i1iI, 0, 0);
  return il1llil.getTime() - iiii1I11.getTime() >= 0 && il1llil.getTime() <= iIiIii1I.getTime();
}