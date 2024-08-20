//Tue Aug 20 2024 07:54:27 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x261fd3 = $.isNode() ? require("./sendNotify") : "",
  _0x5fd6f7 = $.isNode() ? require("./jdCookie.js") : "",
  _0x4823d7 = require("./function/dylanx"),
  _0x2acdab = require("./USER_AGENTS"),
  _0x8cf6af = require("got"),
  _0x130855 = require("sharp");
if (process.env.DY_PROXY) try {
  require("https-proxy-agent");
  ccc = require("./function/proxy.js");
  $.dget = ccc.intoRequest($.get.bind($));
  $.dpost = ccc.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
let _0x5d7026 = [],
  _0x37638d = "";
if ($.isNode()) {
  var _0x248fde = new Buffer.from("64796C616E", "Hex").toString("utf8");
  Object.keys(_0x5fd6f7).forEach(_0x4f8313 => {
    _0x5d7026.push(_0x5fd6f7[_0x4f8313]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let _0x345752 = $.getdata("CookiesJD") || "[]";
  _0x345752 = jsonParse(_0x345752);
  _0x5d7026 = _0x345752.map(_0x175354 => _0x175354.cookie);
  _0x5d7026.reverse();
  _0x5d7026.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  _0x5d7026.reverse();
  _0x5d7026 = _0x5d7026.filter(_0x1c64dc => _0x1c64dc !== "" && _0x1c64dc !== null && _0x1c64dc !== undefined);
}
if (process.env.DY_PROXY) {
  const _0xb3ca6e = require("./function/proxy.js");
  $.get = _0xb3ca6e.intoRequest($.get.bind($));
  $.post = _0xb3ca6e.intoRequest($.post.bind($));
}
const _0x3f2d78 = process.env.EVALNUM ? process.env.EVALNUM : undefined;
let _0x1c6d89 = process.env.EVAL_WORD_COUNT ?? 10,
  _0x525e63 = process.env.ONEVAL ?? false,
  _0x3fa389 = process.env.EVAL_CPKEY ? process.env.EVAL_CPKEY : "",
  _0x25f2ec = ["垃圾", "质量差", "差评", "好差", "欺骗"],
  _0x505976 = ["非常满意的购物体验！商品质量很好，价格实惠。物流迅速，包装严密。非常感谢商家的耐心解答和及时发货，给予8分好评。", "商品质量非常好，价格实惠，物流速度很快。包装完好，没有损坏。非常感谢商家的耐心解答和热情服务，下次还会再来购买。", "这是一次愉快的购物体验，商品质量非常好，价格也很实惠。物流速度快，包装严密。非常感谢商家的耐心服务和及时回复，给予8分好评。", "商品收到了，非常满意！质量可以，价格也还合理。感谢商家客服的热情服务和及时发货，好的话会推荐给朋友们。", "这次购物真是太棒了！商品质量很好，与描述一致。包装仔细，没有损坏。非常感谢商家的认真态度和及时发货，下次还会再来购买。", "质量非常好,与卖家描述的完全一致,真的很喜欢,完全超出期望值,发货速度非常快,物流公司服务态度很好,运送速度很快,店主态度特好,很好很好!质量好而价低廉，很热情的客服，下次还来祝你生意兴隆质量非常好，出乎我的意料包装非常仔细。", "我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。", "感觉物超所值 服务态度还是可以的，没什么太多可挑剔的，再接再厉，祝老板生意兴隆", "这是一条好评段子，花钱的评价，麻烦你们认真点!先说商品质量：产品总体不错，包装严实。再说商家服务：点赞啦。最后点评快递：发货很快。其他就是感谢店家打折送券活动，毕竟便宜好货更实在。希望店家多多优惠，及时通知老客户，促成回购。祝生意兴隆。", "滴滴滴，我来汇报了，东西还行，客服节能有待提高哈，一贯好评啦，快递是真的快，后面再来追评吧，就这样"],
  _0x2c82c7 = ["赠品", "权益", "非实物", "非卖品", "增值服务", "服务", "券包", "只换不修"],
  _0x4bf0bf = ["送的没花钱哈哈", "东西还还不错", "现在的购物体验越来越好", "以前还没有这么多贴心的赠品、增值服务、权益等服务", "给赞", "算不算白嫖"],
  _0xa4ef85 = ["以上是我购物感受和体验，仅供参考，也不要只看好评，适合我的不一定适合你。。。。", "总的来说，还可以，我的评价供大家参考借鉴，根据自己情况。。。。", "总之还行，买不了吃亏，买的了上当，嘿嘿！！！！", "就这样，一惯好评啦，不是非常烂一般不会差评", "最后，希望京东越来越好，感恩"],
  _0x29c03e = [],
  _0x332eb6 = "",
  _0x1afbac = true;
!__filename.includes(_0x248fde) && (_0x1afbac = false);
!(async () => {
  if (!_0x5d7026[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前版本：20240819 fix");
  console.log("每次运行最多20个账号(变量EVALNUM调整)，每个账号最多评价10个商品");
  console.log("差评关键词变量 EVAL_CPKEY='xxx&yyy' 多个&连接");
  console.log("问题反馈：https://t.me/dylan_jdpro");
  if (_0x525e63 === false) {
    console.log("\n\n默认不执行, 请设置变量 ONEVAL='true'");
    return;
  }
  _0x3fa389 != "" && (console.log("\n合并自定义差评内容关键词"), _0x3fa389.includes("&") ? _0x25f2ec = _0x25f2ec.concat(_0x3fa389.split("&")) : _0x25f2ec.push(_0x3fa389), _0x25f2ec = [...new Set(_0x25f2ec)]);
  console.log("\n屏蔽差评内容关键词：" + JSON.stringify(_0x25f2ec));
  let _0x4e08ef = 0;
  _0x5d7026.length > 20 ? _0x4e08ef = _0x3f2d78 ?? 20 : _0x4e08ef = _0x5d7026.length;
  await _0xa82c1f();
  if (_0x332eb6 == "") {}
  for (let _0x27f607 = 0; _0x27f607 < _0x4e08ef; _0x27f607++) {
    if (_0x5d7026[_0x27f607]) {
      _0x37638d = _0x5d7026[_0x27f607];
      $.UserName = decodeURIComponent(_0x37638d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x37638d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x27f607 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.commentWareList = "";
      $.commentInfoList = "";
      $.level = "3";
      $.score = "1555";
      $.UA = _0x2acdab.UARAM ? _0x2acdab.UARAM(1) : _0x2acdab.USER_AGENT;
      $.UA = "okhttp/3.12.16;jdmall;android;version/12.4.2;build/99108;";
      await _0x36c8d6();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x261fd3.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x2c4e11();
      console.log("\n等待5秒...");
      await $.wait(5000);
    }
  }
})().catch(_0xe9ab56 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xe9ab56 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x2c4e11() {
  try {
    $.commentWareList = [];
    $.caidanList = [];
    await _0x1261f2();
    if (!$.maxPage) {
      console.log("获取待评价数据失败");
      return;
    }
    $.maxPage > 1 && (await $.wait(2000), await _0x1261f2($.maxPage), $.commentWareList.length == 0 && (await _0x1261f2($.maxPage - 1)));
    await $.wait(1000);
    console.log("当前有" + Number($.sdnum) + "个待评价晒单，开始评价最后一页的" + $.commentWareList.length + "个商品...");
    for (let _0x4881a5 of $.commentWareList.reverse()) {
      let _0x246cd9 = [],
        _0x54ea33 = [],
        _0x3d486d = "",
        _0xdad922 = [],
        _0x288ff8 = [];
      _0x29c03e = [];
      $.log("\n去评价 👉 " + _0x4881a5.wname);
      if (_0x4881a5.commentRewardStatus == "1") await _0x24b526(_0x4881a5.orderId, _0x4881a5.wareId), console.log($.rewardInfo), console.log("要求至少" + $.wnezi + "字," + $.saitu + "图");else _0x4881a5.estJingBean > 0 && $.log("评价完成最多可得 " + _0x4881a5.estJingBean + " 豆 🥔");
      if (_0x2c82c7.filter(_0x5412ad => _0x4881a5.wname.includes(_0x5412ad)).length == 0) {
        console.log("\n开始获取商品好评和图片...");
        await $.wait(2000);
        await _0x5beaa6(_0x4881a5.wareId);
        $.maxPage > 1 && (await $.wait(1000), await _0x5beaa6(_0x4881a5.wareId, Math.floor(Math.random() * Math.min.apply(null, [$.maxPage, 10]) + 2)));
        for (const _0x4d4300 of _0x29c03e) {
          if (_0x4d4300.commentInfo.pictureInfoList) {
            for (const _0x47486a of _0x4d4300.commentInfo.pictureInfoList || {}) {
              if (_0x47486a.mediaType != "2") {
                let _0x19cd50 = "";
                if (_0x47486a.picURL.indexOf("dpg") !== -1) _0x19cd50 = _0x47486a.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).dpg/g, "$1");else {
                  if (_0x47486a.picURL.indexOf("webp") !== -1) _0x19cd50 = _0x47486a.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).webp/g, "$1");else _0x47486a.picURL.indexOf("avif") !== -1 && (_0x19cd50 = _0x47486a.picURL.replace(/s[0-9]{3}x[0-9]{3}_(.*).avif/g, "$1"));
                }
                _0x19cd50 != "" && _0x246cd9.push(_0x19cd50);
              }
            }
          }
          if (_0x4d4300.commentInfo.commentScore === "5" && _0x4d4300.commentInfo.commentData.length > _0x1c6d89) {
            _0x54ea33.push(_0x4d4300.commentInfo.commentData);
          }
        }
        for (let _0x2cd7d1 of _0x25f2ec) {
          _0x54ea33 = _0x54ea33.filter(_0x2a45a1 => !_0x2a45a1.includes(_0x2cd7d1));
        }
        _0x54ea33.length > 2 ? _0x3d486d = _0x37460e(_0x54ea33) : _0x3d486d = _0x37460e(_0x505976);
        if (_0x246cd9.length >= 2) {
          let _0x1543b8 = _0x1777a5(_0x246cd9, 2);
          _0xdad922 = _0x1543b8.slice(0, _0x1543b8.length).map(_0x5ab7d1 => ({
            "picUrl": _0x5ab7d1
          }));
        }
      } else console.log("赠品权益，只发布文字评价"), _0x3d486d += _0x336b78(_0x4bf0bf);
      _0x3d486d = _0x3d486d.replace(/\*/gi, "");
      _0x3d486d.length < 60 && (_0x3d486d += " " + _0x37460e(_0xa4ef85));
      if (_0x4881a5.commentRewardStatus == "1") {
        _0x3d486d.length < Number($.wnezi) && (_0x3d486d += " " + _0x37460e(_0xa4ef85));
        _0x3d486d.length < Number($.wnezi) && (_0x3d486d += " \u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86\uFF0C\u597D\u8BC4\u4E86");
        let _0x1c6d84 = _0x1777a5(_0x246cd9, Math.max(2, Number($.saitu)));
        _0xdad922 = _0x1c6d84.slice(0, _0x1c6d84.length).map(_0x11845a => ({
          "picUrl": _0x11845a
        }));
      }
      if (_0xdad922.length > 0) for (let _0x25539f of _0xdad922) {
        let _0x5c09df = await _0x376699(_0x25539f.picUrl);
        _0x5c09df = await _0x35761e(_0x5c09df);
        _0x5c09df.code == 0 ? _0x288ff8.push({
          "picUrl": _0x5c09df.url.replace(/.*shaidan\/(.*)/g, "$1")
        }) : console.log("图片获取失败！");
        await $.wait(2000);
      }
      if (_0x288ff8.length != 0 && _0x54ea33.length > 2) console.log("成功获取到图片和好评内容，去发布✍️✍️✍️...\n"), await _0x5b1b96("pubComment", {
        "productId": _0x4881a5.wareId,
        "kocSynFlag": "0",
        "categoryList": _0x4881a5.categoryList,
        "voucherStatus": "0",
        "extInfo": {
          "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
        },
        "officerScore": $.score,
        "anonymousFlag": "1",
        "commentScore": "5",
        "shopType": "0",
        "orderId": _0x4881a5.orderId,
        "shopId": _0x4881a5.shopId,
        "addPictureFlag": "0",
        "commentData": _0x3d486d,
        "pictureInfoList": _0x288ff8,
        "officerLevel": $.level,
        "isCommentTagContent": "0"
      });else {
        if (_0x288ff8.length != 0 && _0x54ea33.length <= 2) console.log("成功获取到图片，但没有获取到评价内容，使用内置评价，去发布✍️✍️✍️...\n"), await _0x5b1b96("pubComment", {
          "productId": _0x4881a5.wareId,
          "kocSynFlag": "0",
          "categoryList": _0x4881a5.categoryList,
          "voucherStatus": "0",
          "extInfo": {
            "mediasExt": "[{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"},{\"VideoIsEditCover\":\"0\",\"ImagePropId\":\"0\",\"ImageTakePhotoFilterId\":\"0\",\"ImageIsCrop\":\"0\",\"VideoIsEditCrop\":\"0\",\"VideoEditFilterId\":\"0\",\"VideoMusicId\":\"0\",\"ImageEditFilterId\":\"0\",\"VideoPropId\":\"0\",\"TakeRate\":\"0\",\"VideoRecordIsMakup\":\"0\",\"ImageTakePhotoIsMakup\":\"0\",\"VideoRecordFilterId\":\"0\",\"ImageFontId\":\"0\",\"FromType\":\"1\",\"ImageStrickId\":\"0\"}]"
          },
          "officerScore": $.score,
          "anonymousFlag": "1",
          "commentScore": "5",
          "shopType": "0",
          "orderId": _0x4881a5.orderId,
          "shopId": _0x4881a5.shopId,
          "addPictureFlag": "0",
          "commentData": _0x3d486d,
          "pictureInfoList": _0x288ff8,
          "officerLevel": $.level,
          "isCommentTagContent": "0"
        });else {
          if (_0x288ff8.length == 0 && _0x54ea33.length > 2) console.log("没有获取到图片，但获取到评价内容，去发布✍️✍️✍️...\n"), await _0x5b1b96("pubComment", {
            "productId": _0x4881a5.wareId,
            "kocSynFlag": "0",
            "categoryList": _0x4881a5.ategoryList,
            "voucherStatus": "0",
            "officerScore": $.score,
            "anonymousFlag": "1",
            "commentScore": "5",
            "shopType": "0",
            "orderId": _0x4881a5.orderId,
            "shopId": _0x4881a5.shopId,
            "addPictureFlag": "0",
            "commentData": _0x3d486d,
            "pictureInfoList": "",
            "officerLevel": $.level,
            "isCommentTagContent": "0"
          });else _0x29c03e.length <= 1 && (console.log("没有获取到评价和图片,使用内置文字评价，去发布✍️✍️✍️...\n"), await _0x5b1b96("pubComment", {
            "productId": _0x4881a5.wareId,
            "kocSynFlag": "0",
            "categoryList": _0x4881a5.ategoryList,
            "voucherStatus": "0",
            "officerScore": $.score,
            "anonymousFlag": "1",
            "commentScore": "5",
            "shopType": "0",
            "orderId": _0x4881a5.orderId,
            "shopId": _0x4881a5.shopId,
            "addPictureFlag": "0",
            "commentData": _0x3d486d,
            "pictureInfoList": "",
            "officerLevel": $.level,
            "isCommentTagContent": "0"
          }));
        }
      }
      console.log("评价内容(" + _0x3d486d.length + "字) ：" + _0x3d486d);
      _0x288ff8.length != 0 && (console.log("晒图详情："), _0x288ff8.forEach(_0x5450b6 => console.log("https://img30.360buyimg.com/shaidan/" + _0x5450b6.picUrl)));
      await $.wait(1000);
    }
  } catch (_0x566703) {
    console.log(_0x566703);
    console.log("出错了，反馈作者修！！！");
  }
}
switch ($.type) {
  case "nb":
    const _0xa3e629 = {
      "nb": nb
    };
    _0xf1f6le = _0xa3e629;
    break;
}
async function _0x5beaa6(_0x4de150, _0x31ff46 = 1) {
  s = await _0x5b1b96("getCommentListWithCard", {
    "sortType": "5",
    "isCurrentSku": false,
    "sku": "" + _0x4de150,
    "pictureCommentType": "A",
    "shieldCurrentComment": "1",
    "shopType": "0",
    "type": "4",
    "shadowMainSku": "0",
    "num": "10",
    "offset": "" + _0x31ff46,
    "pageNum": "" + _0x31ff46,
    "pageSize": "10"
  });
  _0x29c03e = _0x29c03e.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function _0x145918(_0x29bc2c, _0x2c8396 = 1) {
  s = await _0x5b1b96("getShowPictures", {
    "category": "",
    "extInfo": {
      "bbtf": ""
    },
    "isCurrentSku": true,
    "num": "21",
    "offset": "" + _0x2c8396,
    "shadowMainSku": "0",
    "shopType": "0",
    "sku": "" + _0x29bc2c
  });
  $.commentInfoList = s.commentShowPicInfoList;
  $.maxPage = s.maxPage;
}
async function _0x52d5d7(_0x541511, _0x52f5c4 = 1) {
  s = await _0x5b1b96("getFoldCommentList", {
    "category": "",
    "extInfo": {
      "bbtf": ""
    },
    "isCurrentSku": false,
    "num": "10",
    "offset": "" + _0x52f5c4,
    "shopType": "0",
    "sku": "" + _0x541511,
    "type": "4"
  });
  _0x29c03e = _0x29c03e.concat(s.commentInfoList);
  $.maxPage = s.maxPage;
}
async function _0x35761e(_0x39ae7c) {
  return s = await _0x5b1b96("getShaidanUploadUrl", {
    "imgData": _0x39ae7c
  }), s;
}
async function _0x24b526(_0x38d558, _0x27c578) {
  s = await _0x5b1b96("commentEditInfo", {
    "allFloorsFlag": null,
    "business": "1",
    "evaAuraVersion": "120602",
    "lowSaleQuantity": null,
    "orderId": _0x38d558,
    "qrType": "1",
    "sku": _0x27c578
  });
  $.rewardInfo = s.commentFloorList[0].productCommentFloor.newCommentRewardMap?.["bannerInfo"] || "评价有礼";
  $.wnezi = JSON.stringify(s).match(new RegExp("(\\d+)字")) ? JSON.stringify(s).match(new RegExp("(\\d+)字"))[1] : 60;
  $.saitu = JSON.stringify(s).match(new RegExp("(\\d+)晒图")) ? JSON.stringify(s).match(new RegExp("(\\d+)晒图"))[1] : 2;
}
async function _0x1261f2(_0x1b5715 = "1", _0x1c7fd4 = "1") {
  s = await _0x5b1b96("getCommentWareList", {
    "pageIndex": _0x1b5715,
    "pageSize": "10",
    "planType": "1",
    "status": _0x1c7fd4
  }, "12.5.0");
  $.maxPage = s.commentWareListInfo?.["maxPage"];
  $.sdnum = s.commentWareListInfo?.["wait4CommentCount"];
  $.level = s.newCommentOfficerInfo?.["officerLevelInfo"]?.["officerLevel"] + "" || "3";
  $.score = s.newCommentOfficerInfo?.["officerLevelInfo"]?.["growthScore"] + "" || "1555";
  if (_0x1c7fd4 == "4") $.caidanList = s.commentWareListInfo?.["commentWareList"];else {
    $.commentWareList = s.commentWareListInfo?.["commentWareList"] || [];
  }
}
async function _0x376699(_0x42b71b, _0x24610f = 0.9) {
  const _0x552bd8 = await _0x8cf6af(_0x42b71b, {
      "responseType": "buffer"
    }),
    _0xbaa383 = _0x130855(_0x552bd8.body),
    _0x57a969 = await _0xbaa383.metadata(),
    _0x37f7c8 = Math.round(_0x57a969.width * _0x24610f),
    _0x254e82 = Math.round(_0x57a969.height * _0x24610f),
    _0x2ce03b = await _0xbaa383.resize(_0x37f7c8, _0x254e82).toBuffer();
  return _0x2ce03b.toString("base64");
}
async function _0x5b1b96(_0x134472, _0x4285fa) {
  let _0x3a5b3a = await _0x4823d7[_0x332eb6]({
      "fn": _0x134472,
      "body": _0x4285fa,
      "ver": "11.2.2",
      "user": $.UserName
    }),
    _0x58d2db = {
      "url": "https://api.m.jd.com/client.action?functionId=" + _0x134472,
      "body": "fuctionId=" + _0x134472 + "&" + _0x3a5b3a,
      "headers": {
        "Host": "api.m.jd.com",
        "accept": "*/*",
        "user-agent": $.UA,
        "accept-language": "zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6",
        "Cookie": _0x37638d
      },
      "ciphers": "TLS_AES_256_GCM_SHA384:TLS_AES_128_GCM_SHA256"
    };
  return new Promise(_0x1dc89e => {
    $.dpost(_0x58d2db, (_0x40a4d2, _0x19e3bc, _0x330f2c) => {
      try {
        _0x40a4d2 ? console.log(_0x40a4d2) : _0x330f2c = JSON.parse(_0x330f2c);
        switch (_0x134472) {
          case "pubComment":
            _0x330f2c.message && console.log(_0x330f2c.message);
            break;
          default:
            break;
        }
      } catch (_0x4c3e3c) {
        console.log(_0x4c3e3c);
      } finally {
        _0x1dc89e(_0x330f2c);
      }
    });
  });
}
function _0x3415bc() {
  return Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10);
}
function _0x37460e(_0x308c9e) {
  return _0x308c9e[Math.floor(Math.random() * _0x308c9e.length)] || "";
}
function _0x1777a5(_0x4c4223, _0x44d495) {
  const _0x2c9254 = _0x4c4223.slice();
  let _0x626286 = _0x4c4223.length,
    _0x173979,
    _0xf89c51;
  while (_0x626286--) {
    _0xf89c51 = Math.floor((_0x626286 + 1) * Math.random());
    _0x173979 = _0x2c9254[_0xf89c51];
    _0x2c9254[_0xf89c51] = _0x2c9254[_0x626286];
    _0x2c9254[_0x626286] = _0x173979;
  }
  return _0x2c9254.slice(0, _0x44d495);
}
function _0xa82c1f() {
  let _0xae538d = {
    "url": "https://verify-dy-server-hchdzuwrsu.cn-hangzhou.fcapp.run/pingjia",
    "timeout": 30000
  };
  return new Promise(_0x40391f => {
    $.post(_0xae538d, async (_0x16a24e, _0x27ae32, _0x2783f4) => {
      try {
        if (_0x16a24e) {} else {
          if (_0x2783f4) {
            _0x2783f4 = JSON.parse(_0x2783f4);
            if (_0x2783f4.status === 200) _0x332eb6 = _0x2783f4.method;else {}
          }
        }
      } catch (_0x78827c) {
        $.logErr(_0x78827c, _0x27ae32);
      } finally {
        _0x40391f(_0x2783f4);
      }
    });
  });
}
function _0x469dae(_0x382729) {
  const _0xd23ea5 = [],
    _0x180915 = /[\u4e00-\u9fa5]/;
  for (let _0x13b5b2 = 0; _0x13b5b2 < _0x382729.length; _0x13b5b2++) {
    const _0x1a64b1 = _0x382729[_0x13b5b2];
    _0x180915.test(_0x1a64b1) && !_0xd23ea5.includes(_0x1a64b1) && _0xd23ea5.push(_0x1a64b1);
  }
  return _0xd23ea5.length;
}
function _0x336b78(_0x3a6c6d) {
  for (let _0x11b515 = _0x3a6c6d.length - 1; _0x11b515 > 0; _0x11b515--) {
    const _0x415b64 = Math.floor(Math.random() * (_0x11b515 + 1));
    [_0x3a6c6d[_0x11b515], _0x3a6c6d[_0x415b64]] = [_0x3a6c6d[_0x415b64], _0x3a6c6d[_0x11b515]];
  }
  return _0x3a6c6d.join(",");
}
function _0x36c8d6() {
  return new Promise(_0x3c14a2 => {
    const _0x5937ae = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x37638d,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x5937ae, (_0x59d13c, _0xf85799, _0x1428de) => {
      try {
        if (_0x1428de) {
          _0x1428de = JSON.parse(_0x1428de);
          if (_0x1428de.islogin === "1") {} else _0x1428de.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x12a454) {
        console.log(_0x12a454);
      } finally {
        _0x3c14a2();
      }
    });
  });
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
      return "POST" === e && (s = this.post), new Promise((e, i) => {
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
      if (i) try {
        s = JSON.parse(this.getdata(t));
      } catch {}
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
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
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
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
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
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e;
        } catch (t) {
          e = "";
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
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
      } else s = this.setval(t, e);
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
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      });else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
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
      }, t => e(t));else if (this.isNode()) {
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
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
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