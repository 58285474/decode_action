//Fri Jul 05 2024 01:07:02 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const common = require("./Rebels_jdCommon"),
  CryptoModule = require("./Rebels_H"),
  fs = require("fs");
!fs.existsSync("./utils/prize") && fs.mkdirSync("./utils/prize");
const prize_record_path = "./utils/prize/addr_record.csv";
if (!fs.existsSync(prize_record_path)) {
  let text = "﻿收货人,手机,奖品,活动链接,具体时间\n";
  fs.writeFileSync(prize_record_path, text, {
    "encoding": "utf-8",
    "flag": "a"
  });
  console.log("初始化奖品记录文件成功");
}
function formatDate(I1lIi1) {
  let lil11I = I1lIi1.getFullYear(),
    Iliii1 = ("0" + (I1lIi1.getMonth() + 1)).slice(-2),
    iIiIi = ("0" + I1lIi1.getDate()).slice(-2),
    iil1ll = ("0" + I1lIi1.getHours()).slice(-2),
    iiilil = ("0" + I1lIi1.getMinutes()).slice(-2);
  return lil11I + "-" + Iliii1 + "-" + iIiIi + " " + iil1ll + ":" + iiilil;
}
const now = new Date(),
  formattedCurrentTime = formatDate(now);
async function wuxian_savePrize(li1i1i) {
  let {
    baseUrl: illIiI,
    cookie: lI1lli,
    ua: Ill1l,
    activityId: llI1Il,
    activityType: ii1iii,
    venderId: i11iil,
    secretPin: Ill1i,
    prizeName: ii1iil,
    generateId: lllI1l,
    activityUrl = illIiI
  } = li1i1i;
  const i11iii = _getUserConfig(ii1iil);
  if (typeof i11iii === "boolean" && !i11iii) return false;
  const {
    receiver: llI1Ii,
    phone: lllI1i,
    province: li1i1l,
    city: II1i1,
    county: lI1lll,
    address: iIiII,
    areaCode: iil1lI,
    postalCode: iiiliI,
    index: li1i1I
  } = i11iii;
  let illIii;
  Array.isArray(i11iil) && (illIii = i11iil[1], i11iil = i11iil[0]);
  const ii1il1 = illIiI + "/wxAddress/save",
    lI1llI = {
      "venderId": i11iil,
      "pin": illIiI.includes("cjhy") ? encodeURIComponent(Ill1i) : Ill1i,
      "activityId": llI1Il,
      "actType": ii1iii,
      "prizeName": ii1iil,
      "receiver": llI1Ii,
      "phone": lllI1i,
      "province": li1i1l,
      "city": II1i1,
      "county": lI1lll,
      "areaCode": iil1lI,
      "address": iIiII,
      "generateId": lllI1l,
      "postalCode": iiiliI
    },
    illIil = {
      "url": ii1il1,
      "method": "POST",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": lI1lli,
        "Origin": illIiI,
        "Referer": activityUrl,
        "User-Agent": Ill1l
      },
      "data": lI1llI,
      "timeout": 30000
    },
    Ill1I = 3;
  let i11iiI = 0,
    lIli11 = null;
  while (i11iiI < Ill1I) {
    if (i11iiI > 0) {
      await $.wait(1000);
    }
    const lillII = await common.request(illIil);
    if (!lillII.success) {
      lIli11 = "🚫 savePrize 请求失败 ➜ " + lillII.error;
      i11iiI++;
      continue;
    }
    if (!lillII.data) {
      lIli11 = "🚫 savePrize 请求失败 ➜ 无响应数据";
      i11iiI++;
      continue;
    }
    if (lillII.data.result) return _successCallback(llI1Ii, lllI1i, li1i1I, ii1iil, activityUrl), true;else {
      if (i11iiI === 0 && illIii) {
        illIil.data = {
          "venderId": illIii,
          "pin": illIiI.includes("cjhy") ? encodeURIComponent(Ill1i) : Ill1i,
          "activityId": llI1Il,
          "actType": ii1iii,
          "prizeName": ii1iil,
          "receiver": llI1Ii,
          "phone": lllI1i,
          "province": li1i1l,
          "city": II1i1,
          "county": lI1lll,
          "areaCode": iil1lI,
          "address": iIiII,
          "generateId": lllI1l,
          "postalCode": iiiliI
        };
        i11iiI++;
        continue;
      }
      lIli11 = "🚫 savePrize 保存收货地址失败 ➜ " + (lillII.data?.["errorMessage"] || JSON.stringify(lillII.data));
    }
    break;
  }
  if (i11iiI >= Ill1I) {
    console.log(lIli11);
  }
  return false;
}
async function wxSavePrize(l1iII1, iiill1, lIli1i, IIIII1, I1lIlI, ii1ill, II1iI, llI1II, lIli1l) {
  return await wuxian_savePrize({
    "baseUrl": l1iII1,
    "cookie": iiill1,
    "ua": lIli1i,
    "activityId": IIIII1,
    "activityType": I1lIlI,
    "venderId": ii1ill,
    "secretPin": II1iI,
    "prizeName": llI1II,
    "generateId": lIli1l
  });
}
async function lzdz1_savePrize(lillIi) {
  let {
    baseUrl: ii1ili,
    requestUrl: liil1i,
    uuid: lI1lil,
    cookie: i1l1iI,
    ua: liil1l,
    activityId: lI1lii,
    activityType: Iiili1,
    venderId: Iil1l1,
    secretPin: i1i11I,
    prizeName: il1iIl,
    itemsId: iii1ii,
    activityUrl = ii1ili
  } = lillIi;
  const il1iIi = _getUserConfig(il1iIl);
  if (typeof il1iIi === "boolean" && !il1iIi) return false;
  const {
      receiver: iii1il,
      phone: II11li,
      province: I1l11i,
      city: iIIiiI,
      county: liiI1i,
      address: ililIi,
      areaCode: lilIIl,
      postalCode: ililIl,
      index: liiI1l
    } = il1iIi,
    i1l1II = liil1i,
    i1ill = {
      "venderId": Iil1l1,
      "activityId": lI1lii,
      "uuid": lI1lil,
      "actType": Iiili1,
      "prizeName": il1iIl,
      "receiver": iii1il,
      "phone": II11li,
      "province": I1l11i,
      "city": iIIiiI,
      "county": liiI1i,
      "areaCode": lilIIl,
      "address": ililIi,
      "itemsId": iii1ii,
      "generateId": generateId,
      "postalCode": ililIl,
      "idCardNumber": "",
      "pin": i1i11I
    },
    I1l11l = {
      "url": i1l1II,
      "method": "POST",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": i1l1iI,
        "Origin": ii1ili,
        "Referer": activityUrl,
        "User-Agent": liil1l
      },
      "data": i1ill,
      "timeout": 30000
    },
    lilIIi = 3;
  let i1l1Il = 0,
    llIli = null;
  while (i1l1Il < lilIIi) {
    i1l1Il > 0 && (await $.wait(1000));
    const iilll = await common.request(I1l11l);
    if (!iilll.success) {
      llIli = "🚫 savePrize 请求失败 ➜ " + iilll.error;
      i1l1Il++;
      continue;
    }
    if (!iilll.data) {
      llIli = "🚫 savePrize 请求失败 ➜ 无响应数据";
      i1l1Il++;
      continue;
    }
    if (iilll.data.result) return _successCallback(iii1il, II11li, liiI1l, il1iIl, activityUrl), true;else llIli = "🚫 savePrize 保存收货地址失败 ➜ " + (iilll.data?.["errorMessage"] || JSON.stringify(iilll.data));
    break;
  }
  return i1l1Il >= lilIIi && console.log(llIli), false;
}
async function lzdz_savePrize(i1l1Ii) {
  let {
    baseUrl: I1iIIl,
    requestUrl: lI1IIl,
    uuid: i1ilI,
    cookie: iii1lI,
    ua: i1ilI1,
    activityId: Iiilii,
    activityType: Iil1li,
    venderId: Iiilil,
    secretPin: Iil1ll,
    prizeName: iillI,
    itemsId: lI1III,
    activityUrl = I1iIIl
  } = i1l1Ii;
  const IIliIi = _getUserConfig(iillI);
  if (typeof IIliIi === "boolean" && !IIliIi) return false;
  const {
      receiver: IllIiI,
      phone: i1il1,
      province: I1l111,
      city: IIii1l,
      county: I1iIII,
      address: liiI11,
      areaCode: ililI1,
      postalCode: IIii1i,
      index: i1ili
    } = IIliIi,
    Iiill1 = lI1IIl,
    I1iII1 = {
      "venderId": Iiilil,
      "activityId": Iiilii,
      "uuid": i1ilI,
      "actType": Iil1li,
      "prizeName": iillI,
      "receiver": IllIiI,
      "phone": i1il1,
      "province": I1l111,
      "city": IIii1l,
      "county": I1iIII,
      "areaCode": ililI1,
      "address": liiI11,
      "itemsId": lI1III,
      "generateId": generateId,
      "postalCode": IIii1i,
      "idCardNumber": "",
      "pin": Iil1ll
    },
    lilII1 = {
      "url": Iiill1,
      "method": "POST",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": iii1lI,
        "Origin": I1iIIl,
        "Referer": activityUrl,
        "User-Agent": i1ilI1
      },
      "data": I1iII1,
      "timeout": 30000
    },
    iill1 = 3;
  let iii1l1 = 0,
    IIliIl = null;
  while (iii1l1 < iill1) {
    iii1l1 > 0 && (await $.wait(1000));
    const lill1l = await common.request(lilII1);
    if (!lill1l.success) {
      IIliIl = "🚫 savePrize 请求失败 ➜ " + lill1l.error;
      iii1l1++;
      continue;
    }
    if (!lill1l.data) {
      IIliIl = "🚫 savePrize 请求失败 ➜ 无响应数据";
      iii1l1++;
      continue;
    }
    if (lill1l.data.result) return _successCallback(IllIiI, i1il1, i1ili, iillI, activityUrl), true;else {
      IIliIl = "🚫 savePrize 保存收货地址失败 ➜ " + (lill1l.data?.["errorMessage"] || JSON.stringify(lill1l.data));
    }
    break;
  }
  if (iii1l1 >= iill1) {
    console.log(IIliIl);
  }
  return false;
}
async function lzkj_interactsaas_savePrize(iliIl1) {
  let {
    baseUrl: iii1ll,
    newbaseUrl: IIliI1,
    ua: il1lI,
    token: IliIIl,
    prizeName: I1il1l,
    orderCode: lI1l1l,
    activityUrl = iii1ll
  } = iliIl1;
  const IIliII = _getUserConfig(I1il1l);
  if (typeof IIliII === "boolean" && !IIliII) {
    return false;
  }
  const {
      receiver: iiliI,
      phone: Ill11I,
      province: I1il1i,
      city: IliIIi,
      county: lI1l1i,
      address: i1iil,
      index: llI11l
    } = IIliII,
    I1llIl = IIliI1 + "/api/my/prize/update",
    i1iii = {
      "realName": iiliI,
      "mobile": Ill11I,
      "address": i1iil,
      "orderCode": lI1l1l,
      "province": I1il1i,
      "city": IliIIi,
      "county": lI1l1i
    },
    I1llIi = {
      "url": I1llIl,
      "method": "POST",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "token": IliIIl,
        "Origin": iii1ll,
        "Referer": I1llIl + "/",
        "User-Agent": il1lI
      },
      "data": i1iii,
      "timeout": 30000
    },
    IIii1I = 3;
  let llI11i = 0,
    i1iIi1 = null;
  while (llI11i < IIii1I) {
    llI11i > 0 && (await $.wait(1000));
    const II111 = await common.request(I1llIi);
    if (!II111.success) {
      i1iIi1 = "🚫 savePrize 请求失败 ➜ " + II111.error;
      llI11i++;
      continue;
    }
    if (!II111.data) {
      i1iIi1 = "🚫 savePrize 请求失败 ➜ 无响应数据";
      llI11i++;
      continue;
    }
    if (II111.data.resp_code === 0) return _successCallback(iiliI, Ill11I, llI11l, I1il1l, activityUrl), true;else {
      if (!II111.data.success) {
        return console.log("🚫 savePrize 保存收货地址失败 ➜ " + (II111.data.resp_msg || JSON.stringify(II111.data))), false;
      } else i1iIi1 = "🚫 savePrize 保存收货地址失败 ➜ " + (II111.data.resp_msg || JSON.stringify(II111.data));
    }
    break;
  }
  if (llI11i >= IIii1I) {
    console.log(i1iIi1);
  }
  return false;
}
async function loreal_savePrize(I11i1i) {
  const {
    baseUrl: I1llI1,
    newbaseUrl: I11i1l,
    cookie: il1il,
    ua: Il1i1i,
    token: iIIili,
    prizeName: Ii1iiI,
    orderCode: Ilil1I,
    activityUrl = I1llI1
  } = I11i1i;
  return await lzkj_interactsaas_savePrize({
    "baseUrl": I1llI1,
    "newbaseUrl": I11i1l,
    "cookie": il1il,
    "ua": Il1i1i,
    "token": iIIili,
    "prizeName": Ii1iiI,
    "orderCode": Ilil1I,
    "activityUrl": activityUrl
  });
}
async function lzkj_interaction_v2_savePrize(Il1i1l) {
  let {
    baseUrl: lill1I,
    newbaseUrl: Ii1ii1,
    ua: Ilil11,
    token: i1ii1,
    activityId: il1ii,
    shopId: llI111,
    activityType: i1iIiI,
    prizeName: IlllI1,
    addressId: I1il11,
    activityPrizeId: lI1l11,
    activityUrl = lill1I
  } = Il1i1l;
  const II11l = _getUserConfig(IlllI1);
  if (typeof II11l === "boolean" && !II11l) return false;
  const {
      receiver: II11i,
      phone: iI1Iii,
      province: liI1ii,
      city: lIIiIl,
      county: iI1Iil,
      address: il1iI,
      index: i1iIii
    } = II11l,
    i1iIil = Ii1ii1 + "/api/" + i1iIiI + "/userAddressInfo",
    liI1il = {
      "realName": II11i,
      "mobile": iI1Iii,
      "address": il1iI,
      "province": liI1ii,
      "city": lIIiIl,
      "county": iI1Iil,
      "addressId": I1il11,
      "activityPrizeId": lI1l11
    },
    llIlIi = CryptoModule.wuxianDefense.interactionV2.encrypt(liI1il),
    llIlIl = {
      "url": i1iIil,
      "method": "POST",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": lill1I,
        "Referer": activityUrl,
        "User-Agent": Ilil11,
        "Activity-Id": il1ii,
        "Activity-Type": i1iIiI,
        "Pin-Token": i1ii1,
        "Shop-Id": llI111
      },
      "data": llIlIi,
      "timeout": 30000
    },
    II11I = 3;
  let il1i1 = 0,
    lIIiIi = null;
  while (il1i1 < II11I) {
    if (il1i1 > 0) {
      await $.wait(1000);
    }
    const IllIlI = await common.request(llIlIl);
    if (!IllIlI.success) {
      lIIiIi = "🚫 savePrize 请求失败 ➜ " + IllIlI.error;
      il1i1++;
      continue;
    }
    if (!IllIlI.data) {
      lIIiIi = "🚫 savePrize 请求失败 ➜ 无响应数据";
      il1i1++;
      continue;
    }
    if (IllIlI.data.data && typeof IllIlI.data.data === "string") try {
      const lliiIl = CryptoModule.wuxianDefense.interactionV2.decrypt(IllIlI.data.data);
      IllIlI.data.data = lliiIl;
    } catch {}
    if (IllIlI.data.code === 200) return _successCallback(II11i, iI1Iii, i1iIii, IlllI1, activityUrl), true;else lIIiIi = "🚫 savePrize 保存收货地址失败 ➜ " + (IllIlI.data?.["message"] || JSON.stringify(IllIlI.data));
    break;
  }
  if (il1i1 >= II11I) {
    console.log(lIIiIi);
  }
  return false;
}
async function jinggeng_savePrize(lliiIi) {
  let {
    baseUrl: IllIl1,
    cookie: ll1Ii,
    ua: ll1Il,
    venderId: iiIi11,
    prizeName: ill1II,
    orderCode: i1llil,
    activityUrl = IllIl1
  } = lliiIi;
  const i1llii = _getUserConfig(ill1II);
  if (typeof i1llii === "boolean" && !i1llii) return false;
  const {
      receiver: l1i1I1,
      phone: llIIil,
      province: llIIii,
      city: Ii1I1i,
      county: llIIlI,
      address: Ii1I1l,
      index: IIlIl
    } = i1llii,
    ili11l = IllIl1 + "/ql/front/postBuyerInfo",
    Iiilll = {
      "receiverName": l1i1I1,
      "mobile": llIIil,
      "address": llIIii + "+" + Ii1I1i + "+" + llIIlI + Ii1I1l,
      "log_id": i1llil,
      "user_id": iiIi11
    },
    Iiilli = {
      "url": ili11l,
      "method": "POST",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ll1Ii,
        "Origin": IllIl1,
        "Referer": ili11l + "/",
        "User-Agent": ll1Il
      },
      "data": Iiilll,
      "timeout": 30000
    },
    IIlIi = 3;
  let ili11i = 0,
    iiIi1l = null;
  while (ili11i < IIlIi) {
    ili11i > 0 && (await $.wait(1000));
    const l1iI1 = await common.request(Iiilli);
    if (!l1iI1.success) {
      iiIi1l = "🚫 savePrize 请求失败 ➜ " + l1iI1.error;
      ili11i++;
      continue;
    }
    if (!l1iI1.data) {
      iiIi1l = "🚫 savePrize 请求失败 ➜ 无响应数据";
      ili11i++;
      continue;
    }
    if (l1iI1.data.succ) return _successCallback(l1i1I1, llIIil, IIlIl, ill1II, activityUrl), true;else {
      if (l1iI1.data.succ === false) return console.log("🚫 保存收货地址失败 ➜ " + (l1iI1.data.msg || JSON.stringify(l1iI1.data))), false;else {
        iiIi1l = "🚫 savePrize 保存收货地址失败 ➜ " + (l1iI1.data.msg || JSON.stringify(l1iI1.data));
      }
    }
    break;
  }
  return ili11i >= IIlIi && console.log(iiIi1l), false;
}
function _getUserConfig(IIIiI) {
  try {
    const ii1Ii = process.env.WX_ADDRESS || "",
      ii1Il = process.env.WX_ADDRESS_BLOCK || "";
    if (ii1Ii === "") return false;
    const l1iII = ii1Ii.split("|"),
      iI1Ill = Math.floor(Math.random() * l1iII.length);
    if (l1iII[iI1Ill] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    const [lilI1, IIIi1, i1llli, i1llll, iI1Ili, llIIiI, iI1111, IIIl1] = l1iII[iI1Ill].split("@");
    if (IIIl1 === undefined) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
    for (let I1I1lI = 0; I1I1lI < 7; I1I1lI++) {
      if (l1iII[I1I1lI] === "") {
        return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
      }
    }
    if (ii1Il !== "") {
      const iI111I = ii1Il.split("@");
      if (iI111I.some(IIIlI1 => IIIiI.includes(IIIlI1))) {
        return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
      }
    }
    return {
      "receiver": lilI1,
      "phone": IIIi1,
      "province": i1llli,
      "city": i1llll,
      "county": iI1Ili,
      "address": llIIiI,
      "areaCode": iI1111,
      "postalCode": IIIl1,
      "index": iI1Ill
    };
  } catch (IiiIl) {
    return console.log("❌ 获取用户收货地址配置信息异常 ➜ " + (IiiIl.message || IiiIl)), false;
  }
}
function _successCallback(l1lli1, IiiIi, ii1l1i, l1iIl1, ii1iI) {
  console.log("已自动提交收货地址 ✅\n登记为随机抽取到的第" + (ii1l1i + 1) + "套收货地址信息\n联系信息：" + l1lli1 + " (" + IiiIi.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
  const IIIii = l1iIl1 ? l1iIl1 : "",
    iI111i = ii1iI ? ii1iI.toString() : "",
    I1I1l1 = l1lli1 + "," + IiiIi + "," + IIIii + (iI111i ? "," + iI111i : "") + "," + formattedCurrentTime + "\n";
  fs.writeFileSync(prize_record_path, I1I1l1, {
    "encoding": "utf-8",
    "flag": "a"
  });
}
module.exports = {
  "wuxian_savePrize": wuxian_savePrize,
  "wxSavePrize": wxSavePrize,
  "lzkj_interactsaas_savePrize": lzkj_interactsaas_savePrize,
  "loreal_savePrize": loreal_savePrize,
  "lzkj_interaction_v2_savePrize": lzkj_interaction_v2_savePrize,
  "lzdz1_savePrize": lzdz1_savePrize,
  "lzdz_savePrize": lzdz_savePrize,
  "jinggeng_savePrize": jinggeng_savePrize
};