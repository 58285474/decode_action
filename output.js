//Fri Jul 26 2024 14:46:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("夺金刮刮乐抽奖提现");
const notify = require("./utils/Rebels_sendJDNotify"),
  jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H"),
  isNotify = process.env.jd_djggl_Notify === "true",
  Swish = process.env.jd_djggl_swish === "true",
  autotx = process.env.jd_djggl_autotx === "true",
  pagination = process.env.jd_djggl_txnum || "1",
  exchange = process.env.jd_djggl_exchange === "true",
  draw_wait = process.env.jd_djggl_drawwait || "3",
  DRAW_RETRY = process.env.jd_djggl_draw_retry || "20",
  TaskList = !(process.env.jd_djggl_task === "false"),
  linkId = "1v8ROyHv8LXPs559oaclNA";
let apCashWithDrawList = [],
  business = "fission",
  waitTimes = 2000,
  drawwaitTimes = parseInt(draw_wait) * 1000;
$.PDDEnd = false;
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(_0x4056eb => jdCookie[_0x4056eb]).filter(_0x56d75a => _0x56d75a);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("任务开关: [" + (TaskList ? "开启" : "关闭") + "]");
  console.log("代理开关: [" + common.getProxyStatus() + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  notify.config({
    title: $.name
  });
  for (let _0x2f7938 = 0; _0x2f7938 < cookiesArr.length; _0x2f7938++) {
    $.index = _0x2f7938 + 1;
    cookie = cookiesArr[_0x2f7938];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(parseInt(2100, 10));
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n"), await notify.push());
})().catch(_0x5b90a5 => $.logErr(_0x5b90a5)).finally(() => $.done());
async function Main() {
  apCashWithDrawList = [];
  $.retryend = false;
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.stateEnd = false;
  $.NoLogin = false;
  $.cashVoRS = false;
  $.hbnums = 0;
  $.xjnums = 0;
  $.drawnum = 0;
  $.retry = 0;
  const _0x777b93 = await common.getLoginStatus(cookie);
  if (!_0x777b93 && typeof _0x777b93 === "boolean") {
    console.log("账号无效");
    return;
  }
  try {
    await sendRequest("inviteFissionBeforeHome");
    if ($.NoLogin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    await sendRequest("inviteFissionHome");
    if ($.NoLogin) {
      return;
    }
    await $.wait(parseInt(1500, 10));
    if (!$.NoLogin) {
      if (TaskList) {
        $.apTaskList = "";
        await sendRequest("apTaskList");
        let _0x305208 = $.apTaskList || [];
        for (let _0x283ae0 = 0; _0x283ae0 < _0x305208.length; _0x283ae0++) {
          $.taskTitle = _0x305208[_0x283ae0].taskTitle;
          $.apTaskListid = _0x305208[_0x283ae0].id;
          $.taskType = _0x305208[_0x283ae0].taskType;
          $.taskSourceUrl = _0x305208[_0x283ae0].taskSourceUrl;
          $.taskDoTimes = _0x305208[_0x283ae0].taskDoTimes;
          $.taskLimitTimes = _0x305208[_0x283ae0].taskLimitTimes;
          $.taskFinished = _0x305208[_0x283ae0].taskFinished;
          $.taskShowTitle = _0x305208[_0x283ae0].taskShowTitle;
          $.configBaseList = _0x305208[_0x283ae0].configBaseList[0].awardTitle;
          if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
            if ($.taskSourceUrl) {
              for (let _0x8dac22 = $.taskDoTimes; _0x8dac22 < $.taskLimitTimes; _0x8dac22++) {
                Assignment = true;
                console.log("去做 \"" + $.taskShowTitle + "\" 任务");
                await sendRequest("apsDoTask");
                await $.wait(parseInt($.waitTime * 1 + 500, 10));
                await sendRequest("apTaskDrawAward");
                await $.wait(parseInt(Math.random() * 1500 + 500, 10));
              }
            } else {
              if ($.configBaseList && $.configBaseList.includes("s")) {
                for (let _0x3a9e2d = 0; _0x3a9e2d < 1; _0x3a9e2d++) {
                  console.log("去做 \"" + $.taskShowTitle + "\" 任务");
                  $.apTaskDetail = "";
                  await sendRequest("apTaskDetail");
                  const _0x9a93a3 = $.apTaskDetail?.["taskItemList"] || [],
                    _0x4b5e4 = $.apTaskDetail?.["status"]?.["finishNeed"];
                  for (let _0x399ec2 = 0; _0x399ec2 < _0x4b5e4; _0x399ec2++) {
                    const _0x299ae0 = _0x9a93a3[_0x399ec2];
                    _0x299ae0 ? ($.taskSourceUrl = _0x299ae0.itemId, $.taskInsert = _0x299ae0.taskInsert, await sendRequest("apStartTaskTime"), await $.wait(parseInt(Math.random() * 1500 + 6000, 10)), await sendRequest("apDoLimitTimeTask"), await $.wait(parseInt(Math.random() * 1500 + 500, 10)), await sendRequest("apTaskDrawAward"), await $.wait(parseInt(Math.random() * 1500 + 500, 10))) : console.log("任务失败，没有获取到任务ID");
                  }
                }
              } else {
                $.finished = false;
                while (!$.finished) {
                  Assignment = true;
                  console.log("去做 \"" + $.taskShowTitle + "\" 任务");
                  await sendRequest("apTaskDetail");
                  $.finished = $.apTaskDetail?.["status"]?.["finished"] || false;
                  if ($.finished) {
                    break;
                  }
                  await $.wait(parseInt($.waitTime * 1 + 500, 10));
                  const _0x4d2d1e = $.apTaskDetail?.["taskItemList"] || [],
                    _0x5993d2 = _0x4d2d1e[0];
                  _0x5993d2 ? ($.taskSourceUrl = _0x5993d2.itemId, $.taskInsert = _0x5993d2.taskInsert, await sendRequest("apsDoTask"), await $.wait(parseInt($.waitTime * 1 + 500, 10)), await sendRequest("apTaskDrawAward"), await $.wait(parseInt(Math.random() * 1500 + 500, 10))) : console.log("任务失败，没有获取到任务ID");
                }
              }
            }
          } else {
            if (!$.taskFinished && $.taskType.includes("FOLLOW_")) {
              if ($.taskSourceUrl) {
                for (let _0xdbad2f = $.taskDoTimes; _0xdbad2f < $.taskLimitTimes; _0xdbad2f++) {
                  Assignment = true;
                  console.log("去做 \"" + $.taskShowTitle + "\" 任务");
                  await sendRequest("apsDoTask");
                  await $.wait(parseInt($.waitTime * 1 + 500, 10));
                  await sendRequest("apTaskDrawAward");
                  await $.wait(parseInt(Math.random() * 1500 + 500, 10));
                }
              } else {
                $.finished = false;
                while (!$.finished) {
                  Assignment = true;
                  console.log("去做 \"" + $.taskShowTitle + "\" 任务");
                  await sendRequest("apTaskDetail");
                  $.finished = $.apTaskDetail?.["status"]?.["finished"] || false;
                  if ($.finished) {
                    break;
                  }
                  await $.wait(parseInt($.waitTime * 1 + 500, 10));
                  const _0x4d9212 = $.apTaskDetail?.["taskItemList"] || [],
                    _0x7c51b1 = _0x4d9212[0];
                  _0x7c51b1 ? ($.taskSourceUrl = _0x7c51b1.itemId, $.taskInsert = _0x7c51b1.taskInsert, await sendRequest("apsDoTask"), await $.wait(parseInt($.waitTime * 1 + 500, 10)), await sendRequest("apTaskDrawAward"), await $.wait(parseInt(Math.random() * 1500 + 500, 10))) : console.log("任务失败，没有获取到任务ID");
                }
              }
            } else {
              if (!$.taskFinished && $.taskType.includes("SIGN")) {
                for (let _0x145952 = $.taskDoTimes; _0x145952 < $.taskLimitTimes; _0x145952++) {
                  Assignment = true;
                  await sendRequest("apsDoTask");
                  await $.wait(parseInt(Math.random() * 1500 + 500, 10));
                  await sendRequest("apTaskDrawAward");
                  await $.wait(parseInt(Math.random() * 1500 + 500, 10));
                }
              }
            }
          }
        }
      }
      if ($.prizeNum > 0) {
        for (m = 1; $.prizeNum--; m++) {
          console.log("进行第" + m + "次抽奖");
          await sendRequest("inviteFissionDrawPrize");
          await $.wait(parseInt(2100, 10));
          $.cashVoRS && !$.stateEnd && !$.inviteFissionReceivehot && (await sendRequest("inviteFissionReceive"), await $.wait(parseInt(drawwaitTimes * 1 + 2000, 10)));
          if (m >= 1199) {
            console.log("抽奖太多次，多余的次数请再执行脚本");
            break;
          }
          if ($.retryend) {
            break;
          }
        }
      }
      if (autotx) {
        console.log("\n当前设置轮询提现页数：[" + pagination + "](建议开启代理)");
        for (let _0x510c76 = 0; _0x510c76 < pagination; _0x510c76++) {
          $.pageNum = _0x510c76 + 1;
          console.log("\n开始轮询提现 [" + $.pageNum + "] 页");
          await goWithdrawal();
          if ($.txhot) {
            break;
          }
          await $.wait(parseInt(waitTimes * 1 + 5000, 10));
        }
      } else {
        await goWithdrawals();
      }
    }
  } catch (_0x253289) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x253289);
  }
}
async function goWithdrawals() {
  if (apCashWithDrawList.length > 0) {
    console.log("\n开始提现上方现金(共" + apCashWithDrawList.length + "次提现)");
  }
  for (i = 0; i < apCashWithDrawList.length; i++) {
    const _0xd0e450 = apCashWithDrawList[i];
    console.log("去提现" + _0xd0e450?.["amount"] + "💰 [" + _0xd0e450.id + "]");
    $.apCashWithDrawBaseParams = {
      prizeType: 4,
      business: business,
      id: _0xd0e450.id,
      poolBaseId: _0xd0e450.poolBaseId,
      prizeGroupId: _0xd0e450.prizeGroupId,
      prizeBaseId: _0xd0e450.prizeBaseId
    };
    $.apCashWithDraw = "";
    await sendRequest("apCashWithDraw");
    if ($.apCashWithDraw) {
      const _0x2b9073 = $.apCashWithDraw.status,
        _0x26fec3 = $.apCashWithDraw.message;
      if (_0x2b9073 === "310") {
        console.log("✅ 提现成功");
      } else {
        let _0x470ef0 = false,
          _0x329ddc = 0;
        const _0x48b189 = 3;
        if (_0x26fec3.includes("上限")) {
          console.log("❌ 提现失败：当月提现额度已满");
          exchange ? ($.apRecompenseDrawPrizeBaseParams = {
            linkId: linkId,
            business: business,
            drawRecordId: _0xd0e450.id,
            poolId: _0xd0e450.poolBaseId,
            prizeGroupId: _0xd0e450.prizeGroupId,
            prizeId: _0xd0e450.prizeBaseId
          }, await sendRequest("apRecompenseDrawPrize")) : !Swish && ($.txhot = true);
        } else {
          if (_0x26fec3.includes("已存在状态")) {
            console.log("❌ 提现失败：上一笔提现还未完成");
            _0x470ef0 = true;
          } else {
            if (_0x26fec3.includes("其它pin的订单")) {
              console.log("❌ 提现失败：其它pin的订单");
              if (!Swish) {
                break;
              }
            } else {
              if (_0x26fec3.includes("未绑定微信") || _0x26fec3.includes("绑定手机号")) {
                console.log("❌ 提现失败：未绑定微信或手机号");
                if (!Swish) {
                  break;
                }
              } else {
                console.log("❌ 提现失败：" + _0x26fec3);
                _0x470ef0 = true;
              }
            }
          }
        }
        while (_0x470ef0 && _0x329ddc < _0x48b189) {
          await $.wait(70000);
          await sendRequest("apCashWithDraw");
          const _0x13fd08 = $.apCashWithDraw.status,
            _0x4d51e0 = $.apCashWithDraw.message;
          if (_0x13fd08 === "310") {
            console.log("✅ 提现成功");
            _0x470ef0 = false;
          } else {
            _0x4d51e0.includes("已存在状态") ? _0x329ddc++ : (console.log("❌ 重试提现失败：上一笔提现还未完成"), _0x470ef0 = false);
          }
        }
      }
      i !== apCashWithDrawList.length - 1 && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
    }
  }
}
async function goWithdrawal() {
  $.superRedBagList = "";
  await sendRequest("superRedBagList");
  if ($.superRedBagList) {
    const _0x435389 = ($.superRedBagList.items || []).filter(_0x2fc6bf => _0x2fc6bf.prizeType === 4 && _0x2fc6bf.state === 0 || _0x2fc6bf.state === 2);
    if (_0x435389.length > 0) {
      console.log("");
    }
    for (i = 0; i < _0x435389.length; i++) {
      const _0x31b454 = _0x435389[i];
      console.log("去提现" + _0x31b454?.["amount"] + "💰 [" + _0x31b454.id + "]");
      $.apCashWithDrawBaseParams = {
        prizeType: 4,
        business: business,
        id: _0x31b454.id,
        poolBaseId: _0x31b454.poolBaseId,
        prizeGroupId: _0x31b454.prizeGroupId,
        prizeBaseId: _0x31b454.prizeBaseId
      };
      $.apCashWithDraw = "";
      await sendRequest("apCashWithDraw");
      if ($.apCashWithDraw) {
        const _0x3522cc = $.apCashWithDraw.status,
          _0x4129b0 = $.apCashWithDraw.message;
        if (_0x3522cc === "310") {
          console.log("✅ 提现成功");
        } else {
          let _0x2e9d31 = false,
            _0x5b4937 = 0;
          const _0x26389d = 3;
          if (_0x4129b0.includes("上限")) {
            console.log("❌ 提现失败：当月提现额度已满");
            exchange ? ($.apRecompenseDrawPrizeBaseParams = {
              linkId: linkId,
              business: business,
              drawRecordId: _0x31b454.id,
              poolId: _0x31b454.poolBaseId,
              prizeGroupId: _0x31b454.prizeGroupId,
              prizeId: _0x31b454.prizeBaseId
            }, await sendRequest("apRecompenseDrawPrize")) : !Swish && ($.txhot = true);
          } else {
            if (_0x4129b0.includes("已存在状态")) {
              console.log("❌ 提现失败：上一笔提现还未完成");
              _0x2e9d31 = true;
            } else {
              if (_0x4129b0.includes("其它pin的订单")) {
                console.log("❌ 提现失败：其它pin的订单");
                if (!Swish) {
                  break;
                }
              } else {
                if (_0x4129b0.includes("未绑定微信") || _0x4129b0.includes("绑定手机号")) {
                  console.log("❌ 提现失败：未绑定微信或手机号");
                  if (!Swish) {
                    break;
                  }
                } else {
                  console.log("❌ 提现失败：" + _0x4129b0);
                  if (!Swish) {
                    break;
                  }
                }
              }
            }
          }
          while (_0x2e9d31 && _0x5b4937 < _0x26389d) {
            await $.wait(50000);
            await sendRequest("apCashWithDraw");
            const _0x318e0c = $.apCashWithDraw.status,
              _0x52bb06 = $.apCashWithDraw.message;
            if (_0x318e0c === "310") {
              console.log("✅ 提现成功");
              _0x2e9d31 = false;
            } else {
              _0x52bb06.includes("已存在状态") ? _0x5b4937++ : (console.log("❌ 重试提现失败：上一笔提现还未完成"), _0x2e9d31 = false);
            }
          }
        }
        i !== _0x435389.length - 1 && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
      }
    }
  } else {
    $.retry < 2 && ($.retry++, console.log("等待5秒后重试，第" + $.retry + "次"), await $.wait(5000), await goWithdrawal());
  }
}
async function handleResponse(_0x3078eb, _0x25ca99) {
  try {
    switch (_0x3078eb) {
      case "inviteFissionBeforeHome":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.inviteFissionBeforeHome = _0x25ca99.data;
        } else {
          if (_0x25ca99.data?.["bizMsg"]) {
            console.log("⏺️ " + _0x25ca99.data?.["bizMsg"] + "}");
          } else {
            if (_0x25ca99.code == 1000 && _0x25ca99.errMsg == "未登录") {
              $.NoLogin = true;
              console.log("⏺️ " + _0x25ca99.errMsg);
            } else {
              _0x25ca99.msg ? console.log("⏺️ " + _0x25ca99.msg) : console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
            }
          }
        }
        break;
      case "inviteFissionHome":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.inviteFissionHome = _0x25ca99?.["data"] || [];
          $.drawPrizeNum = $.inviteFissionHome?.["drawPrizeNum"] || 0;
          $.prizeNum = $.inviteFissionHome?.["prizeNum"] || 0;
          let _0x19da1f = $.inviteFissionHome?.["inviter"] || "";
          const _0x476732 = new Date().valueOf(),
            _0x15ce01 = $.inviteFissionHome?.["countDownTime"] + _0x476732,
            _0x5bb0d7 = $.time("yyyy-MM-dd HH:mm:ss", _0x15ce01);
          $.cashVo = $.inviteFissionHome?.["cashVo"] || "";
          if ($.cashVo) {
            $.cashVoRS = true;
            $.txjstate = $.inviteFissionHome?.["cashVo"]?.["state"] || 0;
            console.log("限时提现金：\n已有 " + $.cashVo?.["amount"] + " 提现金，仅差 " + $.cashVo?.["leftAmount"] + " 提现金可提现 " + $.cashVo?.["totalAmount"] + " 元,进度值：" + $.cashVo?.["rate"] + " %\n");
            switch ($.txjstate) {
              case 0:
              case 1:
              case 2:
                break;
              case 3:
                console.log("已成功获得限时提现金 " + $.cashVo?.["totalAmount"] + " 元，时间：" + $.cashVo?.["rewardRecord"]?.["createTime"] + "\n");
                $.stateEnd = true;
                break;
              default:
                console.log("❌ 未知类型：（" + $.txjstate + "）暂不受本脚本支持，请联系作者进行反馈！");
            }
          }
          console.log("到期时间：" + _0x5bb0d7 + "\n助力码：" + _0x19da1f + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
        } else {
          if (_0x25ca99.data?.["bizMsg"]) {
            console.log("⏺️ " + _0x25ca99.data?.["bizMsg"]);
          } else {
            if (_0x25ca99.code == 1000 && _0x25ca99.errMsg == "未登录") {
              $.NoLogin = true;
              console.log("⏺️ " + _0x25ca99.errMsg);
            } else {
              _0x25ca99.msg ? console.log("⏺️ " + _0x25ca99.msg) : console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
            }
          }
        }
        break;
      case "inviteFissionReceive":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.inviteFissionReceive = _0x25ca99?.["data"] || [];
          console.log("抽中提现金：" + ($.inviteFissionReceive?.["receiveList"][0]?.["amount"] || "未获得提现金") + " ,还需 " + $.inviteFissionReceive?.["leftAmount"] + " 提现金,进度值：" + $.inviteFissionReceive?.["rate"] + " %");
          $.inviteFissionReceive?.["state"] == 3 && console.log("已成功获得 " + $.inviteFissionReceive?.["amount"] + " 元提现金，快去提现吧！");
        } else {
          if (_0x25ca99.code == 80209 && _0x25ca99.errMsg == "活动太火爆，请稍候重试") {
            console.log("当期额外提现任务已完成，跳过");
            $.inviteFissionReceivehot = true;
          } else {
            _0x25ca99.code == 80208 && _0x25ca99.errMsg == "活动太火爆，请稍候重试" ? console.log("未抽中提现金") : console.log(_0x25ca99.errMsg);
          }
        }
        break;
      case "inviteFissionDrawPrize":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.drawnum = 0;
          $.inviteFissionDrawPrize = _0x25ca99.data;
          $.prizeType = $.inviteFissionDrawPrize?.["prizeType"];
          let _0x29d491, _0x3cf11b;
          switch ($.prizeType) {
            case 0:
              console.log("抽中未知  🎁");
              break;
            case 1:
              _0x29d491 = Number($.inviteFissionDrawPrize.amount);
              _0x3cf11b = $.inviteFissionDrawPrize.limitStr === null ? $.inviteFissionDrawPrize.prizeConfigName : $.inviteFissionDrawPrize.limitStr;
              console.log("抽中：" + _0x3cf11b + "(-" + _0x29d491.toFixed(2) + "优惠券 🎟️)");
              break;
            case 2:
              $.hbprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100;
              $.hbnums = toDecimal($.hbnum);
              console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 💰|总红包：" + $.hbnums + " 🧧");
              break;
            case 3:
              console.log("抽中京豆：" + $.inviteFissionDrawPrize.amount + "京豆 🐶");
              break;
            case 4:
              $.xjprizeValue = $.inviteFissionDrawPrize?.["prizeValue"] || 0;
              $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
              $.xjnums = toDecimal($.xjnum);
              console.log("抽中现金：" + $.xjprizeValue + " 💰 总现金：" + $.xjnums + " 💰|总红包：" + $.hbnums + " 🧧");
              apCashWithDrawList.push({
                id: $.inviteFissionDrawPrize.id,
                prizeDesc: $.inviteFissionDrawPrize.prizeDesc,
                amount: $.inviteFissionDrawPrize.amount,
                prizeBaseId: $.inviteFissionDrawPrize.prizeBaseId,
                poolBaseId: $.inviteFissionDrawPrize.poolBaseId,
                prizeGroupId: $.inviteFissionDrawPrize.prizeGroupId,
                prizeType: $.inviteFissionDrawPrize.prizeType
              });
              break;
            case 6:
              console.log("抽中惊喜大礼包  🗑️");
              break;
            case 22:
              console.log("抽中超市卡：" + $.inviteFissionDrawPrize.amount + "超市卡 🧧");
              break;
            case 26:
              console.log("抽中：" + $.inviteFissionDrawPrize.prizeDesc + " 🗑️");
              break;
            default:
              console.log("❌ 未知类型：（" + $.prizeType + "）" + $.inviteFissionDrawPrize.prizeDesc);
              break;
          }
        } else {
          if (_0x25ca99.data?.["bizMsg"]) {
            console.log("⏺️ " + _0x25ca99.data?.["bizMsg"] + "}");
          } else {
            if (_0x25ca99.code == 1000 && _0x25ca99.errMsg == "未登录") {
              $.NoLogin = true;
              console.log("⏺️ " + _0x25ca99.errMsg);
            } else {
              if (_0x25ca99.errMsg) {
                if (_0x25ca99.errMsg.includes("火爆")) {
                  if ($.drawnum < DRAW_RETRY) {
                    $.drawnum++;
                    console.log("⏺️ 未中奖 [" + $.drawnum + "]");
                  }
                }
              } else {
                console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
              }
            }
          }
        }
        break;
      case "superRedBagList":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.superRedBagList = _0x25ca99.data;
        } else {
          if (_0x25ca99?.["code"] === "605") {
            console.log("> 滑块验证,请尝试手动验证一次或者更换IP");
            $.txhot = true;
          } else {
            if (_0x25ca99.errMsg) {
              console.log("> 失败：" + _0x25ca99.errMsg);
            } else {
              _0x25ca99.msg ? console.log("> " + _0x25ca99.msg) : console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
            }
          }
        }
        break;
      case "apCashWithDraw":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          $.apCashWithDraw = _0x25ca99.data;
        } else {
          if (_0x25ca99?.["code"] === "605") {
            console.log("> 滑块验证,请尝试手动验证一次或者更换IP");
            $.txhot = true;
          } else {
            if (_0x25ca99.errMsg) {
              console.log("> 失败：" + _0x25ca99.errMsg);
            } else {
              _0x25ca99.msg ? console.log("> " + _0x25ca99.msg) : console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
            }
          }
        }
        break;
      case "apRecompenseDrawPrize":
        if (_0x25ca99?.["code"] === 0 && _0x25ca99?.["success"] === true) {
          console.log("✅ 兑换红包成功");
        } else {
          if (_0x25ca99?.["code"] === "605") {
            console.log("> 滑块验证,请尝试手动验证一次或者更换IP");
            $.txhot = true;
          } else {
            if (_0x25ca99.errMsg) {
              console.log("> 失败：" + _0x25ca99.errMsg);
            } else {
              _0x25ca99.msg ? console.log("> " + _0x25ca99.msg) : console.log("❓" + _0x3078eb + " " + JSON.stringify(_0x25ca99));
            }
          }
        }
        break;
      case "apTaskList":
        if (_0x25ca99.code == 0) {
          $.apTaskList = _0x25ca99?.["data"];
        } else {
          _0x25ca99.code == 402 ? console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || "")) : console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || ""));
        }
        break;
      case "apTaskDetail":
        if (_0x25ca99.code == 0) {
          $.apTaskDetail = _0x25ca99?.["data"];
        } else {
          _0x25ca99.code == 402 ? console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || "")) : console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || ""));
        }
        break;
      case "apStartTaskTime":
        if (!(_0x25ca99.code == 0)) {
          _0x25ca99.code == 402 ? console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || "")) : console.log("查询任务失败," + (_0x25ca99?.["errMsg"] || ""));
        }
        break;
      case "apDoLimitTimeTask":
      case "apsDoTask":
        if (_0x25ca99.code == 0) {
          $.finished = _0x25ca99.data.finished || false;
          console.log("\"" + $.taskShowTitle + "\"任务完成");
        } else {
          _0x25ca99.code == 402 ? console.log("\"" + $.taskShowTitle + "\"完成任务失败," + (_0x25ca99?.["errMsg"] || "")) : console.log("\"" + $.taskShowTitle + "\"完成任务失败," + (_0x25ca99?.["errMsg"] || ""));
        }
        break;
      case "apTaskDrawAward":
        if (_0x25ca99.code == 0) {
          $.prizeNum++;
          console.log("\"" + $.taskShowTitle + "\"领取成功");
        } else {
          _0x25ca99.code == 402 ? console.log("\"" + $.taskShowTitle + "\"领取抽奖次数失败," + (_0x25ca99?.["errMsg"] || "")) : console.log("\"" + $.taskShowTitle + "\"领取抽奖次数失败," + (_0x25ca99?.["errMsg"] || ""));
        }
        break;
    }
  } catch (_0x46b44f) {
    console.log("❌ 未能正确处理 " + _0x3078eb + " 请求响应 " + (_0x46b44f.message || _0x46b44f));
  }
}
async function sendRequest(_0x211634) {
  if ($.runEnd) {
    return;
  }
  let _0x2bc54d = "",
    _0x1c71b4 = null,
    _0x4026b0 = null,
    _0x1603df = "POST",
    _0x26c4ee = {},
    _0x4cfd05 = {};
  switch (_0x211634) {
    case "inviteFissionReceive":
      _0x4cfd05 = {
        appId: "b8469",
        functionId: "inviteFissionReceive",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "inviteFissionBeforeHome":
      _0x4cfd05 = {
        appId: "02f8d",
        functionId: "inviteFissionBeforeHome",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId,
          isJdApp: true,
          inviter: ""
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "inviteFissionHome":
      _0x4cfd05 = {
        appId: "eb67b",
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId,
          inviter: ""
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "inviteFissionDrawPrize":
      _0x4cfd05 = {
        appId: "c02c6",
        functionId: "inviteFissionDrawPrize",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "superRedBagList":
      _0x4cfd05 = {
        appId: "f2b1d",
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          pageNum: $.pageNum,
          pageSize: 400,
          linkId: linkId,
          business: business
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apCashWithDraw":
      _0x4cfd05 = {
        appId: "73bca",
        functionId: "apCashWithDraw",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId,
          businessSource: "NONE",
          base: $.apCashWithDrawBaseParams
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apRecompenseDrawPrize":
      _0x4cfd05 = {
        appId: "8c6ae",
        functionId: "apRecompenseDrawPrize",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: $.apRecompenseDrawPrizeBaseParams,
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/api";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apTaskList":
      _0x4cfd05 = {
        appId: "c06b7",
        functionId: "apTaskList",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apTaskDetail":
      _0x4cfd05 = {
        appId: "ebecc",
        functionId: "apTaskDetail",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          taskType: $.taskType,
          taskId: $.apTaskListid,
          channel: 4,
          checkVersion: true,
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apStartTaskTime":
      _0x4cfd05 = {
        appId: "ebecc",
        functionId: "apStartTaskTime",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          itemId: $.taskSourceUrl,
          taskId: $.apTaskListid,
          taskInsert: false,
          channel: 4,
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apDoLimitTimeTask":
      _0x4cfd05 = {
        appId: "ebecc",
        functionId: "apDoLimitTimeTask",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apsDoTask":
      _0x4cfd05 = {
        appId: "54ed7",
        functionId: "apsDoTask",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          taskType: $.taskType,
          taskId: $.apTaskListid,
          channel: 4,
          checkVersion: true,
          linkId: linkId,
          itemId: $.taskSourceUrl,
          taskInsert: $.taskInsert
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    case "apTaskDrawAward":
      _0x4cfd05 = {
        appId: "6f2b6",
        functionId: "apTaskDrawAward",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          taskType: $.taskType,
          taskId: $.apTaskListid,
          channel: 4,
          checkVersion: true,
          linkId: linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x26c4ee = await H5st.getH5st(_0x4cfd05);
      _0x2bc54d = "https://api.m.jd.com/client.action";
      _0x1c71b4 = _0x26c4ee.paramsData;
      break;
    default:
      console.log("❌ 未知请求 " + _0x211634);
      return;
  }
  const _0x3e6647 = {};
  _0x1c71b4 && (_0x1c71b4 = {
    ..._0x1c71b4,
    ..._0x3e6647
  });
  _0x4026b0 && (_0x4026b0 = {
    ..._0x4026b0,
    ..._0x3e6647
  });
  const _0x18e6b4 = {
    url: _0x2bc54d,
    method: _0x1603df,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      "X-Requested-With": "XMLHttpRequest",
      Referer: "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      "X-Referer-Page": "https://pro.m.jd.com/mall/active/3BwUqhLsJYrHP4qgAgDDJGrSVngK/index.html",
      Origin: "https://pro.m.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    params: _0x4026b0,
    data: _0x1c71b4,
    timeout: 15000,
    httpsTlsOptions: ["superRedBagList"].includes(_0x211634) ? common.useAppTls() : null
  };
  _0x1603df === "GET" && (delete _0x18e6b4.data, delete _0x18e6b4.headers["Content-Type"]);
  !_0x4026b0 && delete _0x18e6b4.params;
  const _0x473552 = 1;
  let _0x2134b4 = 0,
    _0x5c8884 = null,
    _0x150053 = false;
  while (_0x2134b4 < _0x473552) {
    _0x2134b4 > 0 && (await $.wait(1000));
    const _0x519469 = await common.request(_0x18e6b4);
    if (!_0x519469.success) {
      _0x5c8884 = "🚫 " + _0x211634 + " 请求失败 ➜ " + _0x519469.error;
      _0x2134b4++;
      continue;
    }
    if (!_0x519469?.["data"]) {
      _0x5c8884 = "🚫 " + _0x211634 + " 请求失败 ➜ 无响应数据";
      _0x2134b4++;
      continue;
    }
    handleResponse(_0x211634, _0x519469.data);
    _0x150053 = false;
    break;
  }
  _0x2134b4 >= _0x473552 && (console.log(_0x5c8884), _0x150053 && ($.outFlag = true, $.message && $.message.fix(_0x5c8884)));
}
function toDecimal(_0x17e3c0) {
  var _0x8f10cd = Number(_0x17e3c0);
  !isNaN(parseFloat(_0x8f10cd)) && (_0x8f10cd = _0x8f10cd.toFixed(2));
  return _0x8f10cd;
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