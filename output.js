//Sat Sep 14 2024 07:24:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("新东东农场指定浇水");
const jdCookie = require("./jdCookie"),
  notify = require("./utils/Rebels_sendJDNotify"),
  common = require("./utils/Rebels_jdCommon"),
  {
    H5st
  } = require("./utils/Rebels_H"),
  pinFilterGoods = (process.env.jd_XinFarm_waterpin || "").split("@").filter(_0x115cd7 => _0x115cd7),
  retainWater = process.env.jd_XinFarm_retainWater === "true",
  isNotify = process.env.jd_XinFarm_Notify === "true",
  sign_linkId = "LCH-fV7hSnChB-6i5f4ayw",
  draw_linkId = "VssYBUKJOen7HZXpC8dRFA";
let pinMsg = "";
const award_map = {
  1: "水滴",
  2: "水滴"
};
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(_0x2e552b => jdCookie[_0x2e552b]).filter(_0xd2a0c6 => _0xd2a0c6);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("执行账号: [" + (pinFilterGoods.length ? pinFilterGoods.join(", ") : "全部账号执行") + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  notify.config({
    title: $.name
  });
  for (let _0x2a3aed = 0; _0x2a3aed < cookiesArr.length; _0x2a3aed++) {
    $.index = _0x2a3aed + 1;
    cookie = cookiesArr[_0x2a3aed];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.UUID = common.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    if (pinFilterGoods && pinFilterGoods.length > 0) {
      if (pinFilterGoods.includes(encodeURIComponent($.UserName))) {
        console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
        await Main();
      } else {
        pinMsg = "\n账号[" + pinFilterGoods + "] 不在账号列表中，请检查环境变量是否配置正确\n";
        continue;
      }
    } else {
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await Main();
    }
    common.unsetCookie();
    if ($.runEnd) {
      break;
    }
    await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
  }
  if (pinMsg) {
    console.log(pinMsg);
  }
  const _0x3db3cb = notify.getMessage();
  _0x3db3cb && (console.log("\n📣 运行结果\n" + _0x3db3cb.replace(/：/g, " ➜ ")), isNotify && (notify.appendContent("\n"), await notify.push()));
})().catch(_0x36aa17 => $.logErr(_0x36aa17)).finally(() => $.done());
async function Main() {
  $.canWatering = true;
  $.farmHot = false;
  $.fp = "";
  try {
    const _0x5c2dae = await common.getLoginStatus(cookie);
    if (!_0x5c2dae && typeof _0x5c2dae === "boolean") {
      console.log("账号无效");
      $.message.fix("账号无效");
      return;
    }
    await goWatering();
  } catch (_0x4aad9d) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x4aad9d);
  }
}
async function goWatering() {
  $.farm_home = "";
  await sendRequest("farm_home");
  if ($.farmHot) {
    return;
  }
  if ($.farm_home) {
    $.bottleWater = $.farm_home?.["result"]?.["bottleWater"] || 0;
    $.canFastWater = $.farm_home?.["result"]?.["canFastWater"] || false;
    console.log("当前剩余水滴：" + ($.bottleWater || 0) + "g💧，" + ($.canFastWater ? "可以快速浇水[" + (retainWater ? "开启" : "关闭") + "]" : "不能快速浇水"));
    $.message.insert("剩余水滴" + ($.bottleWater || 0) + "g");
    if ($.bottleWater < 10 || !$.canWatering) {
      return;
    }
    if (retainWater && $.canFastWater) {
      console.log("当前已经设置快速浇水，去快速浇水~");
      for (let _0x5a0c3a = 0; _0x5a0c3a < 50; _0x5a0c3a++) {
        $.waterType = 2;
        await sendRequest("farm_water");
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
        if (!$.canWatering) {
          break;
        }
      }
    } else {
      let _0x553b2e = parseInt($.bottleWater / 10);
      console.log("可以浇水" + (_0x553b2e || 0) + "次，去浇水~");
      const _0x365cc3 = 90;
      for (let _0x19d321 = 0; _0x19d321 * _0x365cc3 < _0x553b2e; _0x19d321++) {
        for (let _0xf8f45e = 0; _0xf8f45e < Math.min(_0x365cc3, _0x553b2e - _0x19d321 * _0x365cc3); _0xf8f45e++) {
          $.waterType = 1;
          await sendRequest("farm_water");
          await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
          if (!$.canWatering) {
            break;
          }
        }
        (_0x19d321 + 1) * _0x365cc3 < _0x553b2e && (await $.wait(parseInt(Math.random() * 60000 + 180000, 10)), await sendRequest("farm_home"));
      }
    }
    $.message.insert("剩余水滴" + ($.bottleWater || 0) + "g");
  }
}
function getGrowthWord(_0x28c3b3, _0x140e62) {
  if (_0x140e62 === "100" || _0x140e62 === 100) {
    switch (_0x28c3b3) {
      case 1:
        return "果树发芽了";
      case 2:
        return "果树长大了";
      case 3:
        return "果树开花了";
      case 4:
        return "果树结果了";
      case 5:
        return "果树成熟了";
    }
  } else {
    const _0x47b4f6 = (100 - _0x140e62).toFixed(2) + "%";
    let _0x47dc44 = 0;
    switch (_0x28c3b3) {
      case 1:
        _0x47dc44 = Math.floor(parseFloat(_0x47b4f6) * 100 / 333);
        return "距离长大还有" + _0x47b4f6 + "，还需浇" + _0x47dc44 + "次";
      case 2:
        _0x47dc44 = Math.ceil(parseFloat(_0x47b4f6) * 100 / 200);
        return "距离开花还有" + _0x47b4f6 + "，还需浇" + _0x47dc44 + "次";
      case 3:
        _0x47dc44 = Math.ceil(parseFloat(_0x47b4f6) * 100 / 167);
        return "距离结果还有" + _0x47b4f6 + "，还需浇" + _0x47dc44 + "次";
      case 4:
        _0x47dc44 = Math.floor(parseFloat(_0x47b4f6) * 1000 / 37);
        return "距离成熟还有" + _0x47b4f6 + "，还需浇" + _0x47dc44 + "次";
    }
  }
}
async function handleResponse(_0x41ddcc, _0x58e0d5) {
  try {
    switch (_0x41ddcc) {
      case "farm_home":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_home = _0x58e0d5.data;
          $.farmHot = false;
        } else {
          if (_0x58e0d5.data?.["bizMsg"]) {
            $.farm_home = _0x58e0d5.data;
            console.log("初始化异常 ➜ " + _0x58e0d5.data.bizMsg + "（状态码" + _0x58e0d5.data?.["bizCode"] + "）");
            $.farmHot = true;
          } else {
            _0x58e0d5.errMsg || _0x58e0d5.msg ? (console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)), $.farmHot = true) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_tree_board":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_tree_board = _0x58e0d5.data?.["result"];
        } else {
          if (_0x58e0d5.data?.["bizMsg"]) {
            console.log("" + _0x58e0d5.data?.["bizMsg"]);
          } else {
            _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_plant_tree":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farmHot = false;
          console.log("✅ 种植成功\n");
          $.message.insert("种植新作物成功");
        } else {
          if (_0x58e0d5.data?.["bizMsg"]) {
            console.log("❌ 种植失败：" + _0x58e0d5.data?.["bizMsg"] + "\n");
            $.message.insert("种植新作物失败");
          } else {
            _0x58e0d5.message ? (console.log("❌ 种植失败：" + _0x58e0d5.message + "\n"), $.message.insert("种植新作物失败")) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_water":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          const _0x7f7a54 = _0x58e0d5.data?.["result"],
            {
              currentProcess: _0x58d6ca,
              updateStage: _0x2a89bb,
              treeFullStage: _0xf4b17,
              finished: _0x6bc7f,
              waterNum: _0x11f6ff,
              bottleWater: _0x398893,
              stagePrize = null
            } = _0x7f7a54;
          $.bottleWater = _0x398893;
          let _0x4dd7bd = stagePrize?.["map"](_0x2560ce => _0x2560ce.value + "水滴") || [];
          if (_0x2a89bb) {
            let _0x32c7e7 = "🚿 已浇水" + _0x11f6ff + "g，" + getGrowthWord(_0xf4b17, 100);
            if (_0x4dd7bd.length) {
              _0x32c7e7 += "，奖励【" + _0x4dd7bd.join("、") + "】";
            }
            console.log(_0x32c7e7);
          } else {
            console.log("🚿 已浇水" + _0x11f6ff + "g，" + getGrowthWord(_0xf4b17, _0x58d6ca));
          }
          (_0x6bc7f || _0xf4b17 === 5) && ($.canWatering = false, console.log("\n🎉 果树成熟了~"), await notify.sendNotify($.name + "成熟通知", "【京东账号" + $.index + "】" + $.UserName + "\n种植的水果已成熟可以收获了~\n\n"));
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            if (_0x58e0d5.data?.["bizMsg"]) {
              console.log(_0x58e0d5.data?.["bizMsg"]);
              ["成熟", "没种树"].some(_0x42fc2c => _0x58e0d5.data.bizMsg.includes(_0x42fc2c)) && ($.canWatering = false);
              let _0x318144 = 0;
              _0x58e0d5.data.bizMsg.includes("火爆") && (_0x318144++, _0x318144 >= 5 && ($.canWatering = false));
            } else {
              console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
            }
          }
        }
        break;
      case "farm_task_list":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_task_list = _0x58e0d5.data?.["result"];
        } else {
          if (_0x58e0d5.data?.["bizMsg"]) {
            console.log("" + _0x58e0d5.data?.["bizMsg"]);
          } else {
            _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_task_detail":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_task_detail = _0x58e0d5.data?.["result"];
        } else {
          if (_0x58e0d5.data?.["bizCode"] === 6004) {
            $.farmHot = true;
            console.log("" + _0x58e0d5.data.bizMsg);
          } else {
            if (_0x58e0d5.data?.["bizMsg"]) {
              console.log("" + _0x58e0d5.data?.["bizMsg"]);
            } else {
              _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
            }
          }
        }
        break;
      case "farm_award_detail":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_award_detail = _0x58e0d5.data?.["result"];
        } else {
          if (_0x58e0d5.data?.["bizCode"] === 6004) {
            $.farmHot = true;
            console.log("" + _0x58e0d5.data.bizMsg);
          } else {
            if (_0x58e0d5.data?.["bizMsg"]) {
              console.log("" + _0x58e0d5.data?.["bizMsg"]);
            } else {
              _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
            }
          }
        }
        break;
      case "farm_assist_init_info":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_assist_init_info_hot = false;
          $.farm_assist_init_info = _0x58e0d5.data;
        } else {
          if (!_0x58e0d5.data?.["bizMsg"]) {
            _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_assist_receive_award":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          console.log("> 领取成功");
        } else {
          if (_0x58e0d5.data?.["bizMsg"]) {
            console.log("" + _0x58e0d5.data?.["bizMsg"]);
          } else {
            _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_pop_window":
      case "farm_do_task":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          console.log("> 任务完成");
        } else {
          if (_0x58e0d5.data?.["bizCode"] === 6004) {
            $.farmHot = true;
            console.log("> 任务失败 " + _0x58e0d5.data.bizMsg);
          } else {
            if (_0x58e0d5.data?.["bizMsg"]) {
              console.log("> 任务失败 " + _0x58e0d5.data.bizMsg);
            } else {
              _0x58e0d5.errMsg || _0x58e0d5.msg ? console.log("> 任务失败 " + (_0x58e0d5.errMsg || _0x58e0d5.msg)) : console.log("> 任务失败 " + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
            }
          }
        }
        break;
      case "farm_task_receive_award":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          let _0x7ec885 = _0x58e0d5.data?.["result"]?.["taskAward"]?.["map"](_0x570ed1 => "" + _0x570ed1.awardValue + (award_map[_0x570ed1.awardType] || "[type=" + awardType + "]"));
          console.log("> 领取成功，获得【" + _0x7ec885.join("、") + "】");
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg) {
            console.log("> 领取失败 " + (_0x58e0d5.errMsg || _0x58e0d5.msg));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log("> 领取失败 " + _0x58e0d5.data?.["bizMsg"]) : console.log("> 领取失败 " + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_rain_round_icon":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          $.farm_rain_round_icon = _0x58e0d5.data;
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_rain_page":
        if (!(_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0)) {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "farm_rain_reward":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data?.["bizCode"] === 0) {
          let _0xf4dfa = _0x58e0d5.data?.["result"]?.["waterRainPrize"]?.["map"](_0x150e5c => "" + _0x150e5c.value + _0x150e5c.prizeDesc);
          console.log("> 领取成功，获得【" + _0xf4dfa.join("、") + "】");
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "dongDongFarmSignHome":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          $.dongDongFarmSignHome = _0x58e0d5.data;
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "dongDongFarmSignIn":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          console.log("> 签到成功，获得奖励【" + _0x58e0d5.data?.["prizeConfigName"] + "】");
        } else {
          if (_0x58e0d5.errMsg) {
            $.farmHot = true;
            console.log("> 签到失败 " + _0x58e0d5.errMsg);
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log("> 签到失败 " + _0x58e0d5.data?.["bizMsg"]) : console.log("> 签到失败 " + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "wheelsHome":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          $.lotteryChances = _0x58e0d5?.["data"]?.["lotteryChances"];
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "apTaskList":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          $.apTaskList = _0x58e0d5?.["data"];
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "apsDoTask":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          console.log("> 任务完成");
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
      case "wheelsLottery":
        if (_0x58e0d5.code === 0 && _0x58e0d5.data) {
          let _0x3f9556 = _0x58e0d5.data?.["rewardType"];
          switch (_0x3f9556) {
            case 0:
            case null:
              console.log("> 抽到了空气");
              break;
            case 1:
            case 2:
              console.log("> 抽奖获得 " + _0x58e0d5.data?.["prizeName"]);
              break;
            case 18:
              console.log("> 抽奖获得 " + _0x58e0d5.data?.["prizeName"]["replace"]("水滴", "") + "💧");
              break;
            default:
              console.log("> 抽奖获得 " + _0x58e0d5.data?.["prizeName"]);
              return;
          }
        } else {
          if (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message) {
            console.log("" + (_0x58e0d5.errMsg || _0x58e0d5.msg || _0x58e0d5.message));
          } else {
            _0x58e0d5.data?.["bizMsg"] ? console.log(_0x58e0d5.data?.["bizMsg"]) : console.log("❓" + _0x41ddcc + " " + JSON.stringify(_0x58e0d5));
          }
        }
        break;
    }
  } catch (_0x56de2c) {
    console.log("❌ 未能正确处理 " + _0x41ddcc + " 请求响应 " + (_0x56de2c.message || _0x56de2c));
  }
}
async function sendRequest(_0x230283) {
  if ($.runEnd) {
    return;
  }
  let _0x2d2ad9 = "",
    _0x441bfa = null,
    _0x27fcdc = null,
    _0x3e73a5 = "POST",
    _0x393730 = {},
    _0x37c4f1 = {};
  switch (_0x230283) {
    case "farm_home":
      _0x37c4f1 = {
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
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_tree_board":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_tree_board",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_plant_tree":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_plant_tree",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          uid: $.plantSkuUid
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_water":
      _0x37c4f1 = {
        appId: "28981",
        functionId: "farm_water",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          waterType: $.waterType,
          babelChannel: "ttt7",
          lbsSwitch: false
        },
        version: "4.2",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_assist_init_info":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_assist_init_info",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_task_list":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_task_list",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          channel: 0,
          babelChannel: "ttt7",
          lbsSwitch: false
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_pop_window":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_pop_window",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_rain_round_icon":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_rain_round_icon",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_task_detail":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_task_detail",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_award_detail":
      _0x3e73a5 = "GET";
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x27fcdc = {
        functionId: "farm_award_detail",
        body: JSON.stringify({
          version: 3,
          type: 1
        }),
        t: Date.now(),
        appid: "signed_wh5",
        client: "ios",
        clientVersion: common.getLatestAppVersion()
      };
      break;
    case "farm_do_task":
      _0x37c4f1 = {
        appId: "28981",
        functionId: "farm_do_task",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          taskType: $.taskType,
          taskId: $.taskId,
          taskInsert: $.taskInsert,
          itemId: Buffer.from($.taskSourceUrl, "utf-8").toString("base64"),
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_task_receive_award":
      _0x37c4f1 = {
        appId: "33e0f",
        functionId: "farm_task_receive_award",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_assist_receive_award":
      _0x37c4f1 = {
        appId: "c4332",
        functionId: "farm_assist_receive_award",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "dongDongFarmSignHome":
      _0x37c4f1 = {
        appId: "deba1",
        functionId: "dongDongFarmSignHome",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          linkId: sign_linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/api";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "dongDongFarmSignIn":
      _0x37c4f1 = {
        appId: "65f9d",
        functionId: "dongDongFarmSignIn",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          linkId: sign_linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/api";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_rain_round_icon":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_rain_round_icon",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_rain_page":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_rain_page",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          token: $.curRoundToken
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "farm_rain_reward":
      _0x37c4f1 = {
        appId: "c57f6",
        functionId: "farm_rain_reward",
        appid: "signed_wh5",
        clientVersion: common.getLatestAppVersion(),
        client: "apple",
        body: {
          version: 3,
          token: $.curRoundToken,
          bcc: 48,
          scc: 0
        },
        version: "4.2",
        ua: $.UA,
        t: true,
        tokenCache: false
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/client.action";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "wheelsHome":
      _0x37c4f1 = {
        appId: "c06b7",
        functionId: "wheelsHome",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: draw_linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "http://api.m.jd.com/api";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "wheelsLottery":
      _0x37c4f1 = {
        appId: "bd6c8",
        functionId: "wheelsLottery",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          linkId: draw_linkId
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "http://api.m.jd.com/api";
      _0x441bfa = _0x393730.paramsData;
      break;
    case "apTaskList":
      _0x3e73a5 = "GET";
      _0x2d2ad9 = "https://api.m.jd.com/api";
      _0x27fcdc = {
        functionId: "apTaskList",
        body: JSON.stringify({
          linkId: draw_linkId
        }),
        t: Date.now(),
        appid: "activities_platform",
        client: "ios",
        clientVersion: common.getLatestAppVersion()
      };
      break;
    case "apsDoTask":
      _0x37c4f1 = {
        appId: "54ed7",
        functionId: "apsDoTask",
        appid: "activities_platform",
        clientVersion: common.getLatestAppVersion(),
        client: "ios",
        body: {
          taskType: $.taskType,
          taskId: $.taskId,
          channel: 4,
          checkVersion: true,
          linkId: draw_linkId,
          itemId: $.taskSourceUrl
        },
        version: "4.7",
        ua: $.UA,
        t: true
      };
      _0x393730 = await H5st.getH5st(_0x37c4f1);
      _0x2d2ad9 = "https://api.m.jd.com/api";
      _0x441bfa = _0x393730.paramsData;
      break;
    default:
      console.log("❌ 未知请求 " + _0x230283);
      return;
  }
  const _0x22cf46 = {
    wqDefault: "false",
    rfs: "0000",
    cthr: "1",
    loginType: "",
    loginWQBiz: "wegame",
    openudid: $.UUID,
    uuid: $.UUID,
    build: common.getLatestAppBuildVersion(),
    screen: "430*932",
    networkType: "wifi",
    d_brand: "iPhone",
    d_model: "iPhone16,2",
    lang: "zh_CN",
    osVersion: common.getLatestIOSVersion(),
    partner: ""
  };
  _0x441bfa && Object.assign(_0x441bfa, _0x22cf46);
  _0x27fcdc && Object.assign(_0x27fcdc, _0x22cf46);
  const _0xbe9627 = {
    url: _0x2d2ad9,
    method: _0x3e73a5,
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
    params: _0x27fcdc,
    data: _0x441bfa,
    timeout: 30000,
    httpsTlsOptions: ["wheelsHome", "wheelsLottery"].includes(_0x230283) ? common.useAppTls() : null
  };
  ["wheelsHome", "apsDoTask", "wheelsLottery", "apTaskList"].includes(_0x230283) && (_0xbe9627.headers.Referer = "https://lotterydraw-new.jd.com/?id=" + draw_linkId, _0xbe9627.headers.Origin = "https://lotterydraw-new.jd.com", _0xbe9627.headers["X-Referer-Page"] = "https://lotterydraw-new.jd.com/");
  _0x3e73a5 === "GET" && (delete _0xbe9627.data, delete _0xbe9627.headers["Content-Type"]);
  const _0x53a1ec = 1;
  let _0x1749cb = 0,
    _0x36411a = null,
    _0x40d69c = false;
  while (_0x1749cb < _0x53a1ec) {
    _0x1749cb > 0 && (await $.wait(1000));
    const _0x9e459b = await common.request(_0xbe9627);
    if (!_0x9e459b.success) {
      _0x36411a = "🚫 " + _0x230283 + " 请求失败 ➜ " + _0x9e459b.error;
      _0x1749cb++;
      _0x9e459b.status && _0x9e459b.status === 403 && ["wheelsLottery"].includes(_0x230283) && ($.wheelsLotteryHot = true);
      continue;
    }
    if (!_0x9e459b.data) {
      _0x36411a = "🚫 " + _0x230283 + " 请求失败 ➜ 无响应数据";
      _0x1749cb++;
      continue;
    }
    await handleResponse(_0x230283, _0x9e459b.data);
    _0x40d69c = false;
    break;
  }
  _0x1749cb >= _0x53a1ec && (console.log(_0x36411a), _0x40d69c && ($.outFlag = true, $.message && $.message.fix(_0x36411a)));
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