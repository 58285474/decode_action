//Fri Jul 12 2024 12:40:20 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H");
console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_supermarket_threads // 控制并发线程数，默认1，最大10");
console.log("jd_supermarket_interval // 自定义运行间隔时长，默认1000");
console.log("jd_supermarket_notify // 是否通知(true/false)，默认不推送");
console.log("jd_supermarket_pinFilter // 账号pin过滤，多个用@进行分割");
console.log("==========" + $.name + "提示结束==========");
console.log("");
let linkId,
  taskThreads = process.env.jd_supermarket_threads || "1";
const runInterval = process.env.jd_supermarket_interval || "1000",
  isNotify = (process.env.jd_supermarket_notify || process.env.jd_supermarket_Notify) === "true",
  pinFilter = (process.env.jd_supermarket_pinFilter || "").split("@"),
  maxThreads = 3;
let shareCodes = [],
  needRemoveCodes = [],
  hasGetBasicInfo = false,
  cookiesArr = Object.keys(jdCookie).map(_0x3b2595 => jdCookie[_0x3b2595]).filter(_0x2d0b4b => _0x2d0b4b);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    title: $.name
  });
  await Main();
  isNotify && notify.getMessage() && (await notify.push());
})().catch(_0x370215 => $.logErr(_0x370215)).finally(() => $.done());
async function Main() {
  try {
    authorCodeList = await jsonurl("http://code.257999.xyz/jd_supermarket_draw.json");
    if (authorCodeList && authorCodeList.length > 0) {
      for (let _0x2509da = 0; _0x2509da < authorCodeList.length; _0x2509da++) {
        linkId = authorCodeList[_0x2509da];
        console.log("超市卡抽奖[" + linkId + "]");
      }
    } else {
      linkId = "efwSCgMYmMaufIsC4qgfIA";
      console.log("超市卡抽奖[" + linkId + "]");
    }
    try {
      const _0x33a968 = parseInt(taskThreads);
      _0x33a968 > 0 && _0x33a968 !== 1 && (taskThreads = _0x33a968);
    } catch {
      taskThreads = 1;
    }
    taskThreads = Math.min(taskThreads, maxThreads);
    $.waitTime = null;
    if (runInterval) {
      try {
        const _0x2a40ad = parseInt(runInterval);
        _0x2a40ad >= 0 && ($.waitTime = _0x2a40ad);
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }
    $.needRemoveCookieIndex = [];
    await common.concTask(taskThreads, cookiesArr, taskFnc);
    $.hasPrintActInfo = false;
    $.runEnd = false;
    $.needRemoveCookieIndex.length > 0 && (cookiesArr = cookiesArr.filter((_0x2dd312, _0x4516b2) => !$.needRemoveCookieIndex.includes(_0x4516b2 + 1)), $.needRemoveCookieIndex = []);
    const _0x5ece63 = notify.getMessage();
    _0x5ece63 && console.log("\n📣 运行结果\n" + _0x5ece63.replace(/：/g, " ➜ "));
  } catch (_0x1b0c98) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x1b0c98);
  }
}
async function taskFnc(_0x42b409, _0x287e09) {
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  const _0x111f37 = decodeURIComponent(common.getCookieValue(_0x42b409, "pt_pin"));
  function _0x5d2126(_0x583084, _0x1c81bc) {
    if (_0x583084.length <= 4) {
      return _0x583084;
    } else {
      const _0x7e7b52 = _0x583084.slice(0, 2),
        _0x3dd3f4 = _0x583084.slice(-2),
        _0x259416 = Math.max(_0x1c81bc - _0x7e7b52.length - _0x3dd3f4.length, 0),
        _0x36fb49 = "*".repeat(_0x259416);
      return _0x7e7b52 + _0x36fb49 + _0x3dd3f4;
    }
  }
  const _0x1b8744 = decodeURIComponent(_0x111f37),
    _0x56a887 = _0x5d2126(_0x1b8744, 6),
    _0x3ac944 = "【账号" + _0x287e09 + "】" + _0x56a887 + "：",
    _0x3adad8 = notify.create(_0x287e09, _0x111f37);
  if (pinFilter.length > 0 && (pinFilter.includes(_0x111f37) || pinFilter.includes(encodeURIComponent(_0x111f37)))) {
    _0x3adad8.fix("已设置跳过运行当前账号");
    console.log(_0x3adad8.getInlineContent());
    $.needRemoveCookieIndex.push(_0x287e09);
    return;
  }
  const _0x38bc69 = await common.getLoginStatus(_0x42b409);
  if (!_0x38bc69 && typeof _0x38bc69 === "boolean") {
    console.log(_0x3ac944 + "账号无效");
    _0x3adad8.fix("账号无效");
    $.needRemoveCookieIndex.push(_0x287e09);
    return;
  }
  const _0x4a3851 = common.genUA(_0x111f37);
  let _0xcceff8 = false,
    _0x172f82 = false,
    _0xc4de36 = 0,
    _0x1188ec,
    _0x56a845,
    _0x3131f6,
    _0x276f91,
    _0x5a4a94,
    _0x4457b6;
  await _0x1c8701("superLeagueHome");
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  if ($.runEnd || _0xcceff8) {
    return;
  }
  if (_0x1188ec) {
    _0xc4de36 = _0x1188ec.remainTimes;
    if (!hasGetBasicInfo && _0x1188ec.prizeItems) {
      hasGetBasicInfo = true;
      const _0x20e15d = _0x1188ec.prizeItems.map(_0x38ed4b => _0x38ed4b.prizeCode),
        _0x411d29 = _0x20e15d.join("，");
      console.log("活动奖品：" + _0x411d29 + "\n");
    }
    await _0x1c8701("apTaskList");
    let _0x380692 = false;
    if (_0x5a4a94 && Array.isArray(_0x5a4a94)) {
      for (let _0x20af43 = 0; _0x20af43 < _0x5a4a94.length; _0x20af43++) {
        _0x56a845 = _0x5a4a94[_0x20af43];
        _0x3131f6 = _0x56a845.taskSourceUrl;
        const _0xea8889 = _0x56a845.taskFinished,
          _0x2b76db = _0x56a845.taskLimitTimes,
          _0x2eff1c = _0x56a845.taskDoTimes,
          _0x52f085 = _0x56a845.taskType;
        if (!_0xea8889 && (_0x52f085.includes("BROWSE_") || _0x52f085.includes("FOLLOW_"))) {
          _0x52f085.includes("FOLLOW_") && (await _0x1c8701("userFollow"), await $.wait(parseInt(500)));
          if (_0x3131f6) {
            for (let _0x2b54cb = _0x2eff1c; _0x2b54cb < _0x2b76db; _0x2b54cb++) {
              _0x380692 = true;
              await _0x1c8701("apsDoTask");
              await $.wait(parseInt($.waitTime * 1 + 1500, 10));
            }
          } else {
            for (let _0x27c751 = 0; _0x27c751 < 1; _0x27c751++) {
              _0x380692 = true;
              await _0x1c8701("apTaskDetail");
              const _0x329241 = _0x4457b6?.["taskItemList"] || [],
                _0x577e87 = _0x4457b6?.["status"]?.["finishNeed"];
              for (let _0x21f04a = 0; _0x21f04a < _0x577e87; _0x21f04a++) {
                const _0x1b1b17 = _0x329241[_0x21f04a];
                _0x1b1b17 ? (_0x52f085.includes("FOLLOW_") ? _0x3131f6 = _0x1b1b17.itemName : _0x3131f6 = _0x1b1b17.itemId, _0x276f91 = _0x1b1b17.taskInsert, await _0x1c8701("apsDoTask"), await $.wait(parseInt($.waitTime * 1 + 1500, 10))) : console.log(_0x3ac944 + "任务失败，没有获取到任务ID");
              }
            }
          }
        } else {
          if (!_0xea8889 && _0x52f085.includes("SIGN")) {
            for (let _0x2b32cf = _0x2eff1c; _0x2b32cf < _0x2b76db; _0x2b32cf++) {
              _0x380692 = true;
              await _0x1c8701("apsDoTask");
              await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
            }
          } else {
            if (!_0xea8889 && _0x52f085.includes("SHARE_")) {
              for (let _0x459f1b = _0x2eff1c; _0x459f1b < _0x2b76db; _0x459f1b++) {
                _0x380692 = true;
                let _0x5e664c = _0x1188ec.userCode;
                if (!shareCodes.includes(_0x5e664c)) {
                  shareCodes.push(_0x5e664c);
                  if (shareCodes.length >= 3) {
                    for (let _0x4c99fa of shareCodes) {
                      inviteCode = _0x4c99fa;
                      await _0x1c8701("superLeagueHome_assist");
                      if (_0x172f82) {
                        break;
                      }
                      await $.wait(parseInt($.waitTimes * 1 + 2500, 10));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (needRemoveCodes.length > 0) {
      for (let _0x1ff6e1 of needRemoveCodes) {
        shareCodes.includes(_0x1ff6e1) && shareCodes.splice(shareCodes.indexOf(_0x1ff6e1), 1);
      }
    }
    if (_0xc4de36 > 0) {
      while (_0xc4de36--) {
        await _0x1c8701("superLeagueLottery");
        await $.wait(parseInt($.waitTime * 1 + 1500, 10));
      }
    }
  }
  if ($.runEnd) {
    return {
      runEnd: true
    };
  }
  await $.wait(parseInt($.waitTime * 1 + 500, 10));
  async function _0x39c59b(_0x26c40b, _0x415214) {
    try {
      switch (_0x26c40b) {
        case "superLeagueHome":
          if (_0x415214.code == 0 && _0x415214.success) {
            _0x1188ec = _0x415214.data;
          } else {
            if (_0x415214.errMsg) {
              console.log("" + _0x3ac944 + _0x415214.errMsg);
            } else {
              _0x415214.msg ? ["结束", "data does"].some(_0x41ccea => _0x415214.msg.includes(_0x41ccea)) ? (console.log(_0x3ac944 + "活动已经结束了~"), $.runEnd = true) : console.log("" + _0x3ac944 + _0x415214.msg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
            }
          }
          break;
        case "superLeagueHome_assist":
          if (_0x415214.code == 0 && _0x415214.success) {
            const _0x5c64dd = _0x415214.data.inviteResult;
            if (_0x5c64dd === 0) {
              console.log(_0x3ac944 + "助力[" + inviteCode.substring(0, 10) + "]成功 ✅ ");
            } else {
              if (!(_0x5c64dd === 101002)) {
                if (_0x5c64dd === 101001) {
                  _0x172f82 = true;
                } else {
                  if (_0x5c64dd === null) {
                    needRemoveCodes.push(inviteCode);
                  }
                }
              }
            }
          } else {
            if (_0x415214.errMsg) {
              console.log("" + _0x3ac944 + _0x415214.errMsg);
            } else {
              _0x415214.msg ? console.log("" + _0x3ac944 + _0x415214.msg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
            }
          }
          break;
        case "superLeagueLottery":
          if (_0x415214.code == 0 && _0x415214.success) {
            const _0x28bf91 = {
                0: "空气",
                1: _0x6eabe6 => _0x6eabe6?.["data"]?.["limitStr"] + "(" + _0x6eabe6?.["data"]?.["prizeDesc"] + "优惠券)",
                2: _0x5908f0 => (_0x5908f0?.["data"]?.["amount"] || "0") + "红包",
                3: _0x829832 => _0x829832?.["data"]?.["prizeConfigName"] || "京豆",
                5: _0x5aeba1 => "实物：" + _0x5aeba1?.["data"]?.["prizeConfigName"],
                22: _0x4bdcf9 => _0x4bdcf9?.["data"]?.["amount"] + "元超市卡"
              },
              _0x2796fc = _0x28bf91[_0x415214?.["data"]?.["prizeType"]] || _0x415214?.["data"]?.["prizeType"] + "-" + _0x415214?.["data"]?.["prizeConfigName"];
            if (typeof _0x2796fc === "function") {
              console.log("" + _0x3ac944 + _0x2796fc(_0x415214));
              _0x2796fc(_0x415214) !== "空气" && !_0x2796fc(_0x415214).includes("优惠券") && _0x3adad8.insert(_0x2796fc(_0x415214));
            } else {
              if (_0x415214?.["data"]?.["prizeType"] === 1) {
                console.log("" + _0x3ac944 + _0x415214?.["data"]?.["limitStr"] + "(" + _0x415214?.["data"]?.["prizeDesc"] + "优惠券)");
              } else {
                _0x415214.msg ? console.log("" + _0x3ac944 + _0x415214.msg) : console.log("" + _0x3ac944 + _0x2796fc);
              }
            }
          } else {
            _0x415214.errMsg ? console.log("" + _0x3ac944 + _0x415214.errMsg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
          }
          break;
        case "apTaskList":
          if (_0x415214.code == 0) {
            _0x5a4a94 = _0x415214?.["data"];
          } else {
            if (_0x415214.errMsg) {
              console.log("" + _0x3ac944 + _0x415214.errMsg);
            } else {
              _0x415214.msg ? console.log("" + _0x3ac944 + _0x415214.msg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
            }
          }
          break;
        case "apTaskDetail":
          if (_0x415214.code == 0) {
            _0x4457b6 = _0x415214?.["data"];
          } else {
            if (_0x415214.errMsg) {
              console.log("" + _0x3ac944 + _0x415214.errMsg);
            } else {
              _0x415214.msg ? console.log("" + _0x3ac944 + _0x415214.msg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
            }
          }
          break;
        case "apsDoTask":
          if (_0x415214.code == 0) {
            _0xc4de36++;
            console.log(_0x3ac944 + "\"" + _0x56a845.taskShowTitle + "\"完成，可抽奖" + _0xc4de36 + "次");
          } else {
            if (_0x415214.errMsg) {
              console.log("" + _0x3ac944 + _0x415214.errMsg);
            } else {
              _0x415214.msg ? console.log("" + _0x3ac944 + _0x415214.msg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
            }
          }
          break;
        case "userFollow":
          if (!(_0x415214.code === "0")) {
            _0x415214.resultMsg ? console.log("" + _0x3ac944 + _0x415214.resultMsg) : console.log("❓" + _0x26c40b + " " + JSON.stringify(_0x415214));
          }
          break;
      }
    } catch (_0x90dacf) {
      console.log("❌ 未能正确处理 " + _0x26c40b + " 请求响应 " + (_0x90dacf.message || _0x90dacf));
    }
  }
  async function _0x1c8701(_0x2172a7) {
    if ($.runEnd) {
      return;
    }
    let _0x18d705 = "",
      _0x132a96 = null,
      _0x6b907a = null,
      _0x52a2db = "POST",
      _0x30ddb5 = {},
      _0x1338be = {};
    switch (_0x2172a7) {
      case "superLeagueHome":
        _0x1338be = {
          appId: "b7d17",
          functionId: _0x2172a7,
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            linkId: linkId,
            taskId: "",
            inviter: "",
            inJdApp: true
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "superLeagueHome_assist":
        _0x1338be = {
          appId: "b7d17",
          functionId: "superLeagueHome",
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            linkId: linkId,
            taskId: _0x56a845.id,
            inviter: inviteCode,
            inJdApp: true
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "superLeagueLottery":
        _0x1338be = {
          appId: "60dc4",
          functionId: _0x2172a7,
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            linkId: linkId
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "apTaskList":
        _0x1338be = {
          appId: "c06b7",
          functionId: _0x2172a7,
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            linkId: linkId
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "apTaskDetail":
        _0x1338be = {
          appId: "ebecc",
          functionId: _0x2172a7,
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            taskType: _0x56a845.taskType,
            taskId: _0x56a845.id,
            channel: 4,
            checkVersion: true,
            linkId: linkId
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "apsDoTask":
        _0x1338be = {
          appId: "54ed7",
          functionId: _0x2172a7,
          appid: "activities_platform",
          clientVersion: common.getLatestAppVersion(),
          client: "ios",
          body: {
            taskType: _0x56a845.taskType,
            taskId: _0x56a845.id,
            channel: 4,
            checkVersion: true,
            linkId: linkId,
            itemId: _0x3131f6,
            taskInsert: _0x276f91
          },
          version: "4.7",
          ua: _0x4a3851,
          t: true
        };
        _0x30ddb5 = await H5st.getH5st(_0x1338be);
        _0x18d705 = "https://api.m.jd.com/api";
        _0x132a96 = _0x30ddb5.paramsData;
        break;
      case "userFollow":
        _0x18d705 = "https://api.m.jd.com/userFollow";
        _0x132a96 = {
          functionId: _0x2172a7,
          body: JSON.stringify({
            pin: encodeURIComponent(_0x111f37),
            type: "0",
            businessId: 1,
            themeId: 112,
            babelChannel: "ttt9",
            isJdApp: "1",
            isWx: "0"
          }),
          rfs: 0,
          appid: "jd-super-market",
          client: "m",
          t: Date.now()
        };
        break;
      default:
        console.log("❌ 未知请求 " + _0x2172a7);
        return;
    }
    const _0x3e10e3 = {};
    _0x132a96 && Object.assign(_0x132a96, _0x3e10e3);
    _0x6b907a && Object.assign(_0x6b907a, _0x3e10e3);
    const _0x4c0487 = {
      url: _0x18d705,
      method: _0x52a2db,
      headers: {
        origin: "https://prodev.m.jd.com",
        Referer: "https://pro.m.jd.com/mall/active/3xhqjGH1wMz5FaMgrfYhR22sFvqz/index.html",
        "User-Agent": _0x4a3851,
        Cookie: _0x42b409,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      params: _0x6b907a,
      data: _0x132a96,
      timeout: 30000
    };
    _0x52a2db === "GET" && (delete _0x4c0487.data, delete _0x4c0487.headers["Content-Type"]);
    const _0x15495a = 1;
    let _0xd3e32c = 0,
      _0x114a9a = null;
    while (_0xd3e32c < _0x15495a) {
      _0xd3e32c > 0 && (await $.wait(1000));
      const _0x434358 = await common.request(_0x4c0487);
      if (!_0x434358.success) {
        _0x114a9a = "🚫 " + _0x2172a7 + " 请求失败 ➜ " + _0x434358.error;
        _0xd3e32c++;
        continue;
      }
      if (!_0x434358.data) {
        _0x114a9a = "🚫 " + _0x2172a7 + " 请求失败 ➜ 无响应数据";
        _0xd3e32c++;
        continue;
      }
      await _0x39c59b(_0x2172a7, _0x434358.data);
      break;
    }
    _0xd3e32c >= _0x15495a && console.log(_0x114a9a);
  }
}
async function jsonurl(_0x4eb51b) {
  const _0xdac032 = await common.request({
      url: _0x4eb51b,
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      proxy: null,
      debug: false,
      timeout: 30000
    }),
    _0x3de9f0 = _0xdac032.data;
  return _0x3de9f0;
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