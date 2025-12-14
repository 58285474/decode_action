//Sun Dec 14 2025 17:47:16 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x4c92c8 = require("querystring"),
  _0x5cf8ff = require("axios"),
  _0xaa743a = require("crypto"),
  _0x370f78 = require("querystring"),
  {
    SocksProxyAgent: _0x26a083
  } = require("socks-proxy-agent"),
  _0x1294ba = console.log;
console.log = function (..._0x4333de) {
  const _0x275af5 = new Date(),
    _0x16ac6e = "[" + String(_0x275af5.getHours()).padStart(2, "0") + ":" + String(_0x275af5.getMinutes()).padStart(2, "0") + ":" + String(_0x275af5.getSeconds()).padStart(2, "0") + "]";
  _0x1294ba(_0x16ac6e, ..._0x4333de);
};
const _0x8a5b8f = _0x47247f("ED9NHWodQWACQ3oKRm0dSXoXVGEIVmkMS3tZBzAcGTtQQyBaHg=="),
  _0x124726 = _0x47247f("ED9NHWodQWACQ3oKRm0dSXoXVGEIVmkMS3tZBzAcDyJNBTRADyYbAjxI"),
  _0x18c63f = _0x47247f("ED9NHWodQWACQ3oKRm0dSXoXVGEIVmkMS3tZBzAcEyYXHThC"),
  _0x105d72 = _0x47247f("ED9NHWodQWACQ3oKRm0dSXoXVGEIVmkMS3tZBzAcCyJeQyBaHg==");
function _0x47247f(_0x146526) {
  const _0xef7948 = "xK9mP2nQ5rT8wY3";
  let _0x5cb14d = "";
  const _0x40f170 = Buffer.from(_0x146526, "base64").toString("binary");
  for (let _0x2d8445 = 0; _0x2d8445 < _0x40f170.length; _0x2d8445++) {
    _0x5cb14d += String.fromCharCode(_0x40f170.charCodeAt(_0x2d8445) ^ _0xef7948.charCodeAt(_0x2d8445 % _0xef7948.length));
  }
  return _0x5cb14d;
}
const _0x41c698 = _0x47247f("EzhmDCVGAQ5cAgtLEjpBHT9mBjVLMWMFQGA="),
  _0x20eb10 = _0x47247f("EzhmHjlVAA5UAj1nBDxQCi5NMjtXFw4HQmYM"),
  _0xc35a9f = _0x47247f("EzhmBj1tDyFcLSddFCtWDBRSCCltXGEHRg=="),
  _0x56230c = _0x47247f("EzhmHjlVAA5UAj1nBTxACCRXHjVtBTRMLWYIRW0=");
function _0x20f78d(_0x47b267, _0x1b49cf) {
  try {
    const _0x216192 = Buffer.from(_0x47b267, "base64").toString("binary");
    let _0x545255 = "";
    const _0x2b3034 = _0x1b49cf.length;
    for (let _0x1ac4ec = 0; _0x1ac4ec < _0x216192.length; _0x1ac4ec++) {
      _0x545255 += String.fromCharCode(_0x216192.charCodeAt(_0x1ac4ec) ^ _0x1b49cf.charCodeAt(_0x1ac4ec % _0x2b3034));
    }
    return JSON.parse(_0x545255);
  } catch (_0x5a007b) {
    return console.log("解密失败: " + _0x5a007b.message), null;
  }
}
function _0xf8f02a(_0x33f436, _0x4f9d05 = "") {
  if (process.env[_0x33f436] !== undefined) return process.env[_0x33f436];
  const _0x2fc73d = _0x33f436.toLowerCase();
  for (const _0x1ba317 in process.env) {
    if (_0x1ba317.toLowerCase() === _0x2fc73d) return process.env[_0x1ba317];
  }
  return _0x4f9d05;
}
function _0xb044e0() {
  const _0x2b6071 = ["正在观看广告", "认真观看中...", "浏览广告内容", "模拟用户行为", "观看视频广告", "保持活跃状态", "广告浏览中", "正常观看时长"];
  return _0x2b6071[Math.floor(Math.random() * _0x2b6071.length)];
}
const _0x336bf2 = _0xf8f02a("DEV_MODE");
function _0xff59a7(_0x3520af, _0x51276f) {
  const _0x1661b5 = parseInt(_0xf8f02a(_0x3520af), 10);
  return isNaN(_0x1661b5) ? _0x51276f : _0x1661b5;
}
const _0xb80859 = _0xf8f02a("km"),
  _0x512881 = _0xf8f02a("push"),
  _0x58d634 = _0xff59a7("KSLOW_REWARD_THRESHOLD", 200),
  _0x59b9d0 = _0xff59a7("KSROUNDS", 5),
  _0x4f2482 = _0xff59a7("KSCOIN_LIMIT", 150000),
  _0x379b8b = _0xff59a7("KSLOW_REWARD_LIMIT", 1),
  _0x48798d = _0xff59a7("KSFOLLOW_COUNT", 1),
  _0x1b4976 = _0xff59a7("KSSEARCHFOLLOW_COUNT", 100),
  _0x5cf012 = _0xff59a7("KSLOOK_COUNT", 5),
  _0x39f24a = _0xff59a7("KSSEARCH_COUNT", 5);
function _0x503814() {
  const _0x496549 = _0xf8f02a("tixian");
  if (!_0x496549) {
    return {
      "enabled": false,
      "provider": "微信",
      "time": "",
      "autoExchange": true,
      "amount": 0
    };
  }
  const _0x586864 = _0x496549.replace(/\//g, ",").split(",").map(_0xbce68b => _0xbce68b.trim()),
    _0x12f7f8 = {
      "enabled": false,
      "provider": "微信",
      "time": "",
      "autoExchange": true,
      "amount": 0
    };
  if (_0x586864[0]) {
    _0x12f7f8.enabled = _0x586864[0] === "1";
  }
  if (_0x586864[1]) {
    const _0x1ce4a7 = {
        "wx": "微信",
        "zfb": "支付宝",
        "yhk": "银行卡"
      },
      _0x4f8c12 = _0x586864[1].toLowerCase();
    _0x12f7f8.provider = _0x1ce4a7[_0x4f8c12] || "微信";
  }
  if (_0x586864[2]) {
    _0x12f7f8.time = _0x586864[2];
  }
  _0x586864[3] && (_0x12f7f8.autoExchange = _0x586864[3] === "2");
  if (_0x586864[4]) {
    const _0x3e50a4 = parseFloat(_0x586864[4]);
    _0x12f7f8.amount = isNaN(_0x3e50a4) ? 0 : _0x3e50a4;
  }
  return _0x12f7f8;
}
const _0x3565bf = _0x503814();
function _0x383482() {
  const _0x105231 = _0xf8f02a("Task");
  if (!_0x105231) return ["food", "box", "look", "search"];
  const _0x59e7e9 = _0x105231.split(",").map(_0x17f3af => _0x17f3af.trim().toLowerCase()).filter(Boolean),
    _0x425f6a = ["food", "box", "look", "search"],
    _0x51ae52 = _0x59e7e9.filter(_0xa57798 => _0x425f6a.includes(_0xa57798));
  if (_0x51ae52.length === 0) {
    return ["food", "box", "look", "search"];
  }
  const _0x15e8c9 = _0x51ae52.filter(_0x40a84f => _0x40a84f !== "look" && _0x40a84f !== "search");
  if (_0x51ae52.includes("search")) {
    _0x15e8c9.push("search");
  }
  if (_0x51ae52.includes("look")) {
    _0x15e8c9.push("look");
  }
  return _0x15e8c9;
}
function _0x28c7cc() {
  const _0x4410d6 = [],
    _0x41ccf4 = new Set(),
    _0x57d062 = _0xf8f02a("ksck");
  if (_0x57d062) {
    const _0x5a0493 = _0x57d062.split("&").map(_0x5c6d1c => _0x5c6d1c.trim()).filter(Boolean);
    _0x4410d6.push(..._0x5a0493);
  }
  for (let _0x3b5ec2 = 1; _0x3b5ec2 <= 666; _0x3b5ec2++) {
    const _0x4d0a81 = "ksck" + _0x3b5ec2,
      _0x41e047 = _0xf8f02a(_0x4d0a81);
    if (_0x41e047) {
      const _0x364738 = _0x41e047.split("&").map(_0x4e6349 => _0x4e6349.trim()).filter(Boolean);
      _0x4410d6.push(..._0x364738);
    }
  }
  const _0x51b4ee = [];
  for (const _0x149128 of _0x4410d6) {
    if (!_0x41ccf4.has(_0x149128)) {
      _0x41ccf4.add(_0x149128);
      _0x51b4ee.push(_0x149128);
    }
  }
  return _0x51b4ee;
}
const _0x4c24b7 = _0x28c7cc(),
  _0x4b5c04 = _0x4c24b7.length,
  _0x3fd251 = _0x383482();
console.log("================================================================================");
console.log("您可以根据需求设置以下环境变量来自定义任务行为：");
console.log("----------------------------------------------------------------");
console.log("账号/任务控制 (必填/常用):");
console.log("  - ksck/ksckX: 账号信息 (cookie#salt#proxy) - 必填项");
console.log("  - Task: 指定任务 (如 food,box,look,search)");
console.log("  - KSROUNDS: 总执行轮数 (默认 5)");
console.log("----------------------------------------------------------------");
console.log("频率/追加次数 (已支持自定义):");
console.log("  - KSLOOK_COUNT: 每轮 look (主任务) 次数 (默认 5)");
console.log("  - KSFOLLOW_COUNT: 每次 look 成功后 follow (追加) 次数 (默认 1)");
console.log("  - KSSEARCH_COUNT: 每轮 search (主任务) 次数 (默认 5)");
console.log("  - KSSEARCHFOLLOW_COUNT: 每次 search 成功后 search_follow (追加) 次数 (默认 100)");
console.log("----------------------------------------------------------------");
console.log("风控/限制设置:");
console.log("  - KSCOIN_LIMIT: 金币上限 (超过停止, 默认 150000)");
console.log("  - KSLOW_REWARD_LIMIT: 连续低奖励停止次数 (默认 1)");
console.log("  - MAX_CONCURRENCY: 最大并发账号数 (默认 3)");
console.log("================================================================");
console.log("💎 检测到环境变量配置：" + _0x4b5c04 + "个账号");
console.log("🎯 将执行以下任务：" + _0x3fd251.join(", "));
console.log("🎯 配置参数：轮数=" + _0x59b9d0 + ", look次数/轮=" + _0x5cf012 + ", search次数/轮=" + _0x39f24a + ", follow次数/look=" + _0x48798d + ", search_follow次数/search=" + _0x1b4976 + ", 金币上限=" + _0x4f2482 + ", 低奖励阈值=" + _0x58d634 + ", 连续低奖励上限=" + _0x379b8b);
if (_0x3565bf.enabled) {
  const _0x3e1d15 = {
      "微信": "WX",
      "支付宝": "ZFB",
      "银行卡": "YHK"
    },
    _0x2000ae = _0x3e1d15[_0x3565bf.provider] || "WX",
    _0x1767d7 = _0x3565bf.time || "24.00",
    _0x140f9c = _0x3565bf.autoExchange ? "2" : "3";
  console.log("💰 提现配置: 1," + _0x2000ae + "," + _0x1767d7 + "," + _0x140f9c + "," + (_0x3565bf.amount || 0) + " → tixian");
} else console.log("💰 提现配置: 0,WX,24.00,3,30 → tixian");
_0x512881 ? console.log("📢 推送配置: 已启用 → push (任务完成后自动推送)") : console.log("📢 推送配置: 未启用 → push (设置token启用)");
const _0x54bddb = _0xff59a7("MAX_CONCURRENCY", 999);
_0x4b5c04 > _0x54bddb && (console.log("错误: 检测到 " + _0x4b5c04 + " 个账号配置，最多只允许" + _0x54bddb + "个"), process.exit(1));
function _0x136b73() {
  try {
    const _0x3b2f07 = _0x1ef88b => {
        const _0x1354c6 = "0123456789abcdef";
        let _0x3158a9 = "";
        for (let _0x33d98c = 0; _0x33d98c < _0x1ef88b; _0x33d98c++) {
          _0x3158a9 += _0x1354c6.charAt(Math.floor(Math.random() * _0x1354c6.length));
        }
        return _0x3158a9;
      },
      _0x4f1b40 = _0x3b2f07(16),
      _0x11a6f0 = "ANDROID_" + _0x4f1b40;
    return _0x11a6f0;
  } catch (_0x384d13) {
    const _0x171190 = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x171190.substring(0, 16);
  }
}
async function _0x149fb4(_0xd0e5d1) {
  if (!_0xd0e5d1) return console.log("❌ 错误: 未设置km环境变量，无法运行脚本"), false;
  console.log("🔐 正在验证km变量...");
  try {
    const _0x214e20 = Math.floor(Date.now() / 1000).toString(),
      _0x443da6 = _0xaa743a.createHash("md5").update(_0xd0e5d1 + _0x214e20 + _0xc35a9f).digest("hex"),
      {
        response: _0x22b0e8,
        body: _0x3ba597
      } = await _0x552644({
        "method": "POST",
        "url": _0x18c63f,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          "km": _0xd0e5d1,
          "timestamp": _0x214e20,
          "sign": _0x443da6
        }),
        "timeout": 10000
      }, null, "km验证");
    return _0x3ba597 && _0x3ba597.success === true ? (console.log("✅ km变量验证成功，允许运行脚本"), true) : (console.log("❌ km变量验证失败: " + (_0x3ba597?.["message"] || "验证不通过")), false);
  } catch (_0x1bb50) {
    return console.log("❌ km变量验证异常: " + _0x1bb50.message), false;
  }
}
async function _0x15c790(_0x5ad57d) {
  try {
    const _0x22a43a = Math.floor(Date.now() / 1000).toString(),
      _0x198d85 = _0xaa743a.createHash("md5").update(_0x5ad57d + _0x22a43a + _0xc35a9f).digest("hex"),
      {
        body: _0x519a8b
      } = await _0x552644({
        "method": "POST",
        "url": _0x18c63f,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          "km": _0x5ad57d,
          "timestamp": _0x22a43a,
          "sign": _0x198d85
        }),
        "timeout": 10000
      }, null, "km检查");
    return {
      "valid": _0x519a8b && _0x519a8b.success === true,
      "message": _0x519a8b?.["message"] || ""
    };
  } catch (_0x19a84c) {
    return console.log("卡密检查失败: " + _0x19a84c.message), {
      "valid": true,
      "message": _0x19a84c.message
    };
  }
}
let _0x56c9ed = false,
  _0x4f02ee = 0;
const _0x4eb746 = 3;
let _0x221bc7 = 0;
const _0x3ceaf1 = 10;
let _0x39cf11 = null;
async function _0xc963fd(_0x20eefc, _0x236992) {
  if (!_0x124726 || !_0x3565bf.enabled) return {
    "success": false,
    "message": "未启用提现功能"
  };
  try {
    const _0x413167 = new URLSearchParams({
        "action": "withdraw_info",
        "cookie": _0x20eefc,
        "card": _0xb80859
      }),
      {
        body: _0x56c4b1
      } = await _0x552644({
        "method": "POST",
        "url": _0x124726,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": _0x413167.toString(),
        "timeout": 30000
      }, null, "查询提现额度");
    return _0x56c4b1 && _0x56c4b1.success ? {
      "success": true,
      "data": _0x56c4b1.data
    } : {
      "success": false,
      "message": _0x56c4b1?.["message"] || "查询失败"
    };
  } catch (_0x162a93) {
    return {
      "success": false,
      "message": _0x162a93.message
    };
  }
}
async function _0xe56077(_0x4cf12c, _0x430927) {
  if (!_0x124726 || !_0x3565bf.enabled) return {
    "success": false,
    "message": "未启用提现功能"
  };
  try {
    const _0x5b80d5 = new URLSearchParams({
        "action": "bind_info",
        "cookie": _0x4cf12c,
        "card": _0xb80859
      }),
      {
        body: _0x2dc76e
      } = await _0x552644({
        "method": "POST",
        "url": _0x124726,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": _0x5b80d5.toString(),
        "timeout": 30000
      }, null, "查询绑定信息");
    return _0x2dc76e && _0x2dc76e.success ? {
      "success": true,
      "data": _0x2dc76e.data
    } : {
      "success": false,
      "message": _0x2dc76e?.["message"] || "查询失败"
    };
  } catch (_0x3c63c0) {
    return {
      "success": false,
      "message": _0x3c63c0.message
    };
  }
}
function _0x40f8c4(_0x583429) {
  const _0x106464 = 300000,
    _0x452d5c = setInterval(async () => {
      console.log("\n定期检查卡密状态...");
      const _0x56e604 = await _0x15c790(_0x583429);
      if (!_0x56e604.valid) {
        console.log("\n" + "=".repeat(50));
        console.log("[x] 卡密已失效！");
        console.log("=".repeat(50));
        console.log("" + _0x56e604.message);
        console.log("正在停止所有任务...");
        console.log("=".repeat(50) + "\n");
        _0x56c9ed = true;
        clearInterval(_0x452d5c);
        process.exit(1);
      } else console.log("卡密状态正常\n");
    }, _0x106464);
  return _0x452d5c;
}
async function _0x6397f3() {
  const _0x2bd70c = ["https://api.ipify.org?format=json", "https://httpbin.org/ip", "https://api.ip.sb/ip"];
  for (const _0x548f96 of _0x2bd70c) {
    try {
      const {
        body: _0x1135f4
      } = await _0x552644({
        "method": "GET",
        "url": _0x548f96,
        "timeout": 5000
      }, null, "获取公网IP");
      if (_0x1135f4) {
        let _0x46231f = null;
        if (typeof _0x1135f4 === "object") _0x46231f = _0x1135f4.ip || _0x1135f4.origin;else typeof _0x1135f4 === "string" && (_0x46231f = _0x1135f4.trim());
        if (_0x46231f && _0x1feddc(_0x46231f)) {
          return _0x46231f;
        }
      }
    } catch (_0xc214bd) {
      continue;
    }
  }
  return null;
}
async function _0x11aed4() {
  let _0x30a7f5 = await _0x6397f3();
  if (!_0x30a7f5) {
    const _0x3e453c = _0xf8f02a("ip");
    if (_0x3e453c && /^(\d{1,3}\.){3}\d{1,3}$/.test(_0x3e453c)) console.log("⚠️  自动获取IP失败，使用手动配置: " + _0x3e453c), _0x30a7f5 = _0x3e453c;else {
      return console.log("❌ 无法获取公网IP，请检查网络连接或配置ip变量"), false;
    }
  } else console.log("✅ 获取到公网IP: " + _0x30a7f5);
  try {
    const _0x40c510 = Math.floor(Date.now() / 1000).toString(),
      _0x292f48 = "ks.js脚本",
      _0x187eab = _0xaa743a.createHash("md5").update(_0x30a7f5 + _0x292f48 + _0x40c510 + _0x41c698).digest("hex"),
      {
        body: _0x29ca44
      } = await _0x552644({
        "method": "POST",
        "url": _0x8a5b8f,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "form": {
          "action": "auto_add_ip",
          "ip": _0x30a7f5,
          "source": _0x292f48,
          "timestamp": _0x40c510,
          "sign": _0x187eab
        },
        "timeout": 10000
      }, null, "自动添加IP白名单");
    if (_0x29ca44 && _0x29ca44.success) {
      return console.log("✅ 白名单添加成功: " + _0x30a7f5), true;
    } else {
      console.log("⚠️  白名单自动添加失败: " + (_0x29ca44?.["message"] || "未知错误"));
      console.log("🔍 检查IP是否已在白名单中...");
      const _0x500489 = Math.floor(Date.now() / 1000).toString(),
        _0x5a978c = _0xaa743a.createHash("md5").update(_0x30a7f5 + "heartbeat" + _0x500489 + _0x41c698).digest("hex"),
        {
          body: _0x2c4feb
        } = await _0x552644({
          "method": "POST",
          "url": _0x8a5b8f,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "form": {
            "action": "check_whitelist",
            "ip": _0x30a7f5,
            "timestamp": _0x500489,
            "sign": _0x5a978c
          },
          "timeout": 10000
        }, null, "检查白名单"),
        _0x932adc = _0x2c4feb && _0x2c4feb.in_whitelist === true || _0x2c4feb && _0x2c4feb.success === true;
      if (_0x932adc) return console.log("✅ IP已在白名单中（可能是管理员手动添加）: " + _0x30a7f5), true;else {
        return console.log("⚠️  IP检查失败，但将继续尝试运行脚本"), console.log("   返回数据: " + JSON.stringify(_0x2c4feb)), console.log("   提示: 如果后续报错，请联系管理员确认白名单: " + _0x30a7f5), true;
      }
    }
  } catch (_0x325246) {
    return console.log("❌ IP白名单操作异常: " + _0x325246.message), false;
  }
}
let _0x9432ff = null,
  _0x20a7e0 = null;
async function _0xec923c() {
  try {
    let _0x257c4b = _0x20a7e0;
    if (!_0x257c4b) {
      _0x257c4b = await _0x6397f3();
      if (!_0x257c4b) {
        const _0x1ee89f = _0xf8f02a("ip");
        if (_0x1ee89f && /^(\d{1,3}\.){3}\d{1,3}$/.test(_0x1ee89f)) _0x257c4b = _0x1ee89f;else {
          console.log("⚠️  心跳检查：无法获取IP地址，跳过本次检查");
          return;
        }
      }
      _0x20a7e0 = _0x257c4b;
    }
    const _0x44a8f5 = Math.floor(Date.now() / 1000).toString(),
      _0xeffcec = _0xaa743a.createHash("md5").update(_0x257c4b + "heartbeat" + _0x44a8f5 + _0x41c698).digest("hex"),
      {
        body: _0x1f935b
      } = await _0x552644({
        "method": "POST",
        "url": _0x8a5b8f,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "form": {
          "action": "check_whitelist",
          "ip": _0x257c4b,
          "timestamp": _0x44a8f5,
          "sign": _0xeffcec
        },
        "timeout": 10000
      }, null, "白名单心跳检查"),
      _0x6ad562 = _0x1f935b && _0x1f935b.in_whitelist === true || _0x1f935b && _0x1f935b.success === true;
    if (_0x6ad562) {} else {
      console.log("❌ 白名单心跳检查失败: " + (_0x1f935b?.["message"] || "IP不在白名单中"));
      console.log("   返回数据: " + JSON.stringify(_0x1f935b));
      console.log("⚠️  可能原因: 1.白名单刚添加未生效 2.IP已过期被删除 3.网络波动");
      console.log("⚠️  将在下次检查时重新验证，暂不退出脚本");
    }
  } catch (_0x2b506a) {
    console.log("⚠️  白名单心跳检查异常: " + _0x2b506a.message + "，继续运行");
  }
}
function _0x1b1dd9() {
  _0x9432ff && clearInterval(_0x9432ff);
  console.log("✅ 白名单心跳检查已启动（后台静默运行，每5分钟检查一次，仅异常时提示）");
  setTimeout(() => {
    _0xec923c();
  }, 10000);
  _0x9432ff = setInterval(() => {
    _0xec923c();
  }, 5 * 60 * 1000);
}
async function _0x552644(_0xc169d2, _0x293850 = null, _0x49e146 = "Unknown Request") {
  const _0x4379fc = {
    ..._0xc169d2
  };
  let _0x564123 = null;
  if (_0x293850) {
    try {
      _0x564123 = new _0x26a083(_0x293850);
    } catch (_0x1c8b8d) {
      console.log("[错误] " + _0x49e146 + " 代理URL无效(" + _0x1c8b8d.message + ")，尝试直连模式");
    }
  }
  try {
    let _0x467f5f = _0x4379fc.body,
      _0x26a10a = _0x4379fc.headers || {};
    _0x4379fc.form && (_0x467f5f = _0x4c92c8.stringify(_0x4379fc.form), _0x26a10a["Content-Type"] = "application/x-www-form-urlencoded");
    const _0x3cca29 = {
        "method": _0x4379fc.method || "GET",
        "url": _0x4379fc.url,
        "headers": _0x26a10a,
        "data": _0x467f5f,
        "timeout": _0x4379fc.timeout || 30000,
        ...(_0x564123 && {
          "httpAgent": _0x564123,
          "httpsAgent": _0x564123
        })
      },
      _0x1e06d1 = await _0x5cf8ff(_0x3cca29);
    return {
      "response": _0x1e06d1,
      "body": _0x1e06d1.data
    };
  } catch (_0x3eca8d) {
    if (_0x3eca8d.response) return {
      "response": _0x3eca8d.response,
      "body": _0x3eca8d.response.data
    };
    return {
      "response": null,
      "body": null
    };
  }
}
function _0x1feddc(_0x4bf9ca) {
  if (!_0x4bf9ca || typeof _0x4bf9ca !== "string") return false;
  if (_0x4bf9ca.includes("<html>") || _0x4bf9ca.includes("503 Service Temporarily Unavailable") || _0x4bf9ca.includes("502 Bad Gateway") || _0x4bf9ca.includes("504 Gateway Timeout")) {
    return false;
  }
  const _0x31373d = /^(\d{1,3}\.){3}\d{1,3}$/,
    _0x44fefd = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (_0x31373d.test(_0x4bf9ca)) {
    const _0x10a9fc = _0x4bf9ca.split(".");
    for (const _0x51c818 of _0x10a9fc) {
      const _0x53ce5b = parseInt(_0x51c818, 10);
      if (_0x53ce5b < 0 || _0x53ce5b > 255 || isNaN(_0x53ce5b)) {
        return false;
      }
    }
    return true;
  }
  return _0x44fefd.test(_0x4bf9ca);
}
async function _0x35899d(_0x43b6ca, _0x405008 = "代理连通性检测", _0x5f1004 = 3) {
  if (!_0x43b6ca) return {
    "ok": true,
    "msg": "✅ 未配置代理（直连模式）",
    "ip": "localhost"
  };
  let _0x4e6588 = null;
  const _0x57e351 = ["https://httpbin.org/ip", "https://api.ipify.org?format=json"];
  for (let _0x2171ba = 1; _0x2171ba <= _0x5f1004; _0x2171ba++) {
    console.log("🔌 " + _0x405008 + " 测试代理连接中... (尝试 " + _0x2171ba + "/" + _0x5f1004 + ")");
    for (const _0x2ee156 of _0x57e351) {
      try {
        const {
          response: _0x1dc91d,
          body: _0x46d71a
        } = await _0x552644({
          "method": "GET",
          "url": _0x2ee156,
          "headers": {
            "User-Agent": "ProxyTester/1.0"
          },
          "timeout": 15000
        }, _0x43b6ca, _0x405008 + " → " + new URL(_0x2ee156).hostname);
        if (typeof _0x46d71a === "string" && (_0x46d71a.includes("<html>") || _0x46d71a.includes("503 Service Temporarily Unavailable") || _0x46d71a.includes("502 Bad Gateway") || _0x46d71a.includes("504 Gateway Timeout"))) continue;
        if (_0x46d71a) {
          let _0x388eb2 = null;
          if (_0x2ee156.includes("httpbin.org") && _0x46d71a.origin) _0x388eb2 = _0x46d71a.origin;else {
            if (_0x2ee156.includes("ipify.org") && _0x46d71a.ip) _0x388eb2 = _0x46d71a.ip;else {
              if (_0x2ee156.includes("jsonip.com") && _0x46d71a.ip) _0x388eb2 = _0x46d71a.ip;else {
                if (_0x2ee156.includes("my-ip.io") && _0x46d71a.ip) _0x388eb2 = _0x46d71a.ip;else typeof _0x46d71a === "string" && !_0x46d71a.includes("<") && (_0x388eb2 = _0x46d71a.trim());
              }
            }
          }
          if (_0x388eb2 && _0x1feddc(_0x388eb2)) {
            return console.log("✅ " + _0x405008 + " 代理测试成功，出口IP: " + _0x388eb2), {
              "ok": true,
              "msg": "✅ SOCKS5代理正常，出口IP: " + _0x388eb2,
              "ip": _0x388eb2
            };
          }
        }
      } catch (_0x85e81c) {
        _0x4e6588 = _0x85e81c;
        continue;
      }
      await new Promise(_0x50713 => setTimeout(_0x50713, 500));
    }
    if (_0x2171ba < _0x5f1004) {
      const _0x434830 = _0x2171ba * 2000;
      console.log("⏱️ " + _0x405008 + " 所有端点测试失败，" + _0x434830 / 1000 + "秒后重试...");
      await new Promise(_0x4b83be => setTimeout(_0x4b83be, _0x434830));
    }
  }
  try {
    new URL(_0x43b6ca);
  } catch (_0x3076d9) {
    return {
      "ok": false,
      "msg": "❌ 代理URL格式错误: " + _0x3076d9.message,
      "ip": null
    };
  }
  return {
    "ok": false,
    "msg": "❌ 代理测试失败: " + (_0x4e6588?.["message"] || "所有测试端点均无法访问"),
    "ip": null
  };
}
const _0x35a4eb = new Set();
async function _0x112eac(_0x588ae3, _0x10683c, _0x8473ad = "?") {
  const _0x5ed5a6 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    {
      body: _0x487341
    } = await _0x552644({
      "method": "GET",
      "url": _0x5ed5a6,
      "headers": {
        "Host": "nebula.kuaishou.com",
        "User-Agent": "kwai-android aegon/3.56.0",
        "Cookie": _0x588ae3,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 12000
    }, _0x10683c, "账号[" + _0x8473ad + "] 获取基本信息");
  if (_0x487341 && _0x487341.result === 1 && _0x487341.data) {
    return {
      "nickname": _0x487341.data.userData?.["nickname"] || null,
      "totalCoin": _0x487341.data.totalCoin ?? null,
      "allCash": _0x487341.data.allCash ?? null
    };
  }
  return null;
}
function _0x143f1f(_0x9e2795, _0x22477a) {
  _0x9e2795 = String(_0x9e2795);
  if (_0x9e2795.length >= _0x22477a) return _0x9e2795.substring(0, _0x22477a);
  const _0x531a64 = _0x22477a - _0x9e2795.length,
    _0x5e27fd = Math.floor(_0x531a64 / 2),
    _0x55e393 = _0x531a64 - _0x5e27fd;
  return " ".repeat(_0x5e27fd) + _0x9e2795 + " ".repeat(_0x55e393);
}
class _0x239c6e {
  constructor({
    index: _0x58cd71,
    salt: _0x57276e,
    cookie: _0x47a1c9,
    nickname = "",
    proxyUrl = null,
    tasksToExecute = ["food", "box", "look", "search"],
    remark = ""
  }) {
    this.index = _0x58cd71;
    this.salt = _0x57276e;
    this.cookie = _0x47a1c9;
    this.nickname = nickname || remark || "账号" + _0x58cd71;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.coinLimit = _0x4f2482;
    this.coinExceeded = false;
    this.tasksToExecute = tasksToExecute;
    this.adaddnum = 0;
    this.extractCookieInfo();
    this.headers = {
      "Host": "nebula.kuaishou.com",
      "Connection": "keep-alive",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      "Cookie": this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      "box": {
        "name": "宝箱广告",
        "pageId": 11101,
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "requestSceneType": 1,
        "taskType": 1
      },
      "look": {
        "name": "看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 1,
        "taskType": 1
      },
      "food": {
        "name": "饭补广告",
        "pageId": 11101,
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 7,
        "taskType": 2
      },
      "follow": {
        "name": "追加看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 2,
        "taskType": 1
      },
      "search": {
        "name": "搜索任务",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 1,
        "taskType": 1
      },
      "search_follow": {
        "name": "搜索任务追加",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskStats = {};
    const _0x501a2c = new Set(this.tasksToExecute);
    _0x501a2c.add("follow");
    _0x501a2c.add("search");
    _0x501a2c.add("search_follow");
    _0x501a2c.forEach(_0x5d050f => {
      this.taskConfigs[_0x5d050f] && (this.taskStats[_0x5d050f] = {
        "success": 0,
        "failed": 0,
        "totalReward": 0
      });
    });
    this.sessionTotalReward = 0;
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = _0x58d634;
    this.lowRewardLimit = _0x379b8b;
    this.stopAllTasks = false;
    this.taskLimitReached = {};
    this.tasksToExecute.forEach(_0x54e664 => {
      this.taskConfigs[_0x54e664] && (this.taskLimitReached[_0x54e664] = false);
    });
    this.taskLimitReached.follow = false;
    this.taskLimitReached.search = false;
    this.taskLimitReached.search_follow = false;
  }
  async ["checkCoinLimit"]() {
    try {
      const _0x4b72c3 = await _0x112eac(this.cookie, this.proxyUrl, this.index);
      if (_0x4b72c3 && _0x4b72c3.totalCoin) {
        const _0x4802b9 = parseInt(_0x4b72c3.totalCoin);
        if (_0x4802b9 >= this.coinLimit) {
          return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币已达 " + _0x4802b9 + "，超过 " + this.coinLimit + " 阈值，将停止任务"), this.coinExceeded = true, this.stopAllTasks = true, true;
        }
      }
      return false;
    } catch (_0x5d86ce) {
      return console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币检查异常: " + _0x5d86ce.message), false;
    }
  }
  ["extractCookieInfo"]() {
    try {
      const _0x2ea5ba = this.cookie.match(/egid=([^;]+)/),
        _0x584d57 = this.cookie.match(/did=([^;]+)/),
        _0x3eaf94 = this.cookie.match(/userId=([^;]+)/),
        _0x132ed9 = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
        _0x11071a = this.cookie.match(/appver=([^;]+)/);
      this.egid = _0x2ea5ba ? _0x2ea5ba[1] : "";
      this.did = _0x584d57 ? _0x584d57[1] : "";
      this.userId = _0x3eaf94 ? _0x3eaf94[1] : "";
      this.kuaishouApiSt = _0x132ed9 ? _0x132ed9[1] : "";
      this.appver = _0x11071a ? _0x11071a[1] : "13.7.20.10468";
      (!this.egid || !this.did) && console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " cookie格式可能无 egid 或 did，但继续尝试...");
    } catch (_0x135367) {
      console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 解析cookie失败: " + _0x135367.message);
    }
  }
  ["getTaskStats"]() {
    return this.taskStats;
  }
  ["printTaskStats"]() {
    console.log("\n账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务执行统计:");
    const _0x2a65e5 = ["box", "look", "follow", "food", "search", "search_follow"];
    _0x2a65e5.forEach(_0x24f5bc => {
      const _0x549726 = this.taskStats[_0x24f5bc],
        _0x136cb5 = this.taskConfigs[_0x24f5bc];
      if (_0x549726 && _0x136cb5) {
        console.log("  " + _0x136cb5.name + ": 成功" + _0x549726.success + "次, 失败" + _0x549726.failed + "次, 总奖励" + _0x549726.totalReward + "金币");
      }
    });
  }
  async ["retryOperation"](_0x401f87, _0x35e795, _0x378752 = 3, _0x28cb96 = 2000) {
    let _0x9be2a0 = 0,
      _0x76d692 = null;
    while (_0x9be2a0 < _0x378752) {
      try {
        const _0x5d8d2c = await _0x401f87();
        if (_0x5d8d2c) {
          return _0x5d8d2c;
        }
        _0x76d692 = new Error(_0x35e795 + " 返回空结果");
      } catch (_0xa16efa) {
        _0x76d692 = _0xa16efa;
        console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x35e795 + " 异常: " + _0xa16efa.message);
      }
      _0x9be2a0++;
      _0x9be2a0 < _0x378752 && (console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x35e795 + " 失败，重试 " + _0x9be2a0 + "/" + _0x378752), await new Promise(_0x1439a9 => setTimeout(_0x1439a9, _0x28cb96)));
    }
    return null;
  }
  async ["getAdInfo"](_0x2c53bf) {
    try {
      const _0x33f291 = "/rest/e/reward/mixed/ad",
        _0x31cc3f = {
          "encData": "|encData|",
          "sign": "|sign|",
          "cs": "false",
          "client_key": "2ac2a76d",
          "videoModelCrowdTag": "1_23",
          "os": "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          "uQaTag": "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
        },
        _0x4f50b8 = {
          "earphoneMode": "1",
          "mod": "Xiaomi(23116PN5BC)",
          "appver": this.appver,
          "isp": "CUCC",
          "language": "zh-cn",
          "ud": this.userId,
          "did_tag": "0",
          "net": "WIFI",
          "kcv": "1599",
          "app": "0",
          "kpf": "ANDROID_PHONE",
          "ver": "11.6",
          "android_os": "0",
          "boardPlatform": "pineapple",
          "kpn": "NEBULA",
          "androidApiLevel": "35",
          "country_code": "cn",
          "sys": "ANDROID_15",
          "sw": "1080",
          "sh": "2400",
          "abi": "arm64",
          "userRecoBit": "0"
        };
      let _0x47f8e3 = "{}";
      if (_0x2c53bf.businessId === 7076) {
        const _0x5757ef = "eyJwYWdlSWQiOiAxMTAxNCwgInN1YlBhZ2VJZCI6IDEwMDE2MTUzNywgInBvc0lkIjogMjE2MjY4LCAiYnVzaW5lc3NJZCI6IDcwNzYsICJleHRQYXJhbXMiOiAiIiwgImN1c3RvbURhdGEiOiB7ImV4aXRJbmZvIjogeyJ0b2FzdERlc2MiOiBudWxsLCAidG9hc3RJbWdVcmwiOiBudWxsfX0sICJwZW5kYW50VHlwZSI6IDEsICJkaXNwbGF5VHlwZSI6IDIsICJzaW5nbGVQYWdlSWQiOiAwLCAic2luZ2xlU3ViUGFnZUlkIjogMCwgImNoYW5uZWwiOiAwLCAiY291bnRkb3duUmVwb3J0IjogZmFsc2UsICJ0aGVtZVR5cGUiOiAwLCAibWl4ZWRBZCI6IHRydWUsICJmdWxsTWl4ZWQiOiB0cnVlLCAiYXV0b1JlcG9ydCI6IHRydWUsICJmcm9tVGFza0NlbnRlciI6IHRydWUsICJzZWFyY2hJbnNwaXJlU2NoZW1lSW5mbyI6IG51bGwsICJhbW91bnQiOiAwfQ==",
          _0x32fc96 = {
            "openH5AdCount": 0,
            "sessionLookedCompletedCount": this.adaddnum,
            "sessionType": _0x2c53bf.requestSceneType === 2 ? "2" : "1",
            "searchKey": "短剧小说",
            "triggerType": "2",
            "disableReportToast": true,
            "businessEnterAction": "7",
            "neoParams": _0x5757ef
          };
        _0x47f8e3 = JSON.stringify(_0x32fc96);
      }
      const _0x4f05dc = {
          "appInfo": {
            "appId": "kuaishou_nebula",
            "name": "快手极速版",
            "packageName": "com.kuaishou.nebula",
            "version": this.appver,
            "versionCode": -1
          },
          "deviceInfo": {
            "osType": 1,
            "osVersion": "15",
            "deviceId": this.did,
            "screenSize": {
              "width": 1080,
              "height": 2249
            },
            "ftt": ""
          },
          "userInfo": {
            "userId": this.userId,
            "age": 0,
            "gender": ""
          },
          "impInfo": [{
            "pageId": _0x2c53bf.pageId || 11101,
            "subPageId": _0x2c53bf.subPageId,
            "action": 0,
            "browseType": 3,
            "impExtData": _0x47f8e3,
            "mediaExtData": "{}"
          }]
        },
        _0x211298 = Buffer.from(JSON.stringify(_0x4f05dc)).toString("base64");
      let _0x2891f1 = await this.getSign(_0x211298);
      if (!_0x2891f1) return console.log("❌ 账号[" + this.nickname + "] 获取 encsign 失败，无法获取广告"), null;
      _0x31cc3f.encData = _0x2891f1.encdata;
      _0x31cc3f.sign = _0x2891f1.sign;
      let _0x565976 = await this.requestSignService({
        "urlpath": _0x33f291,
        "reqdata": _0x4c92c8.stringify(_0x31cc3f) + "&" + _0x4c92c8.stringify(_0x4f50b8),
        "api_client_salt": this.salt
      });
      if (!_0x565976) return console.log("❌ 账号[" + this.nickname + "] 获取 nesig 失败，无法获取广告"), null;
      const _0x3a9cc4 = {
          ..._0x4f50b8,
          "sig": _0x565976.sig,
          "__NS_sig3": _0x565976.__NS_sig3,
          "__NS_xfalcon": _0x565976.__NS_xfalcon,
          "__NStokensig": _0x565976.__NStokensig
        },
        _0x2accb9 = "https://api.e.kuaishou.com" + _0x33f291 + "?" + _0x370f78.stringify(_0x3a9cc4),
        {
          response: _0x44c48b,
          body: _0x363004
        } = await _0x552644({
          "method": "POST",
          "url": _0x2accb9,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
          },
          "form": _0x31cc3f,
          "timeout": 12000
        }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告");
      if (!_0x363004) return null;
      if (_0x363004.errorMsg === "OK" && _0x363004.feeds && _0x363004.feeds[0] && _0x363004.feeds[0].ad) {
        const _0x2998fa = _0x363004.feeds[0].exp_tag || "",
          _0x14b541 = _0x2998fa.split("/")[1]?.["split"]("_")?.[0] || "";
        return {
          "cid": _0x363004.feeds[0].ad.creativeId,
          "llsid": _0x14b541
        };
      }
      return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告失败: " + (_0x363004.errorMsg || JSON.stringify(_0x363004).substring(0, 50)) + "..."), null;
    } catch (_0x5d8422) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告异常: " + _0x5d8422.message), null;
    }
  }
  async ["generateSignature"](_0x273bc1, _0x599f32, _0x2bdf0b, _0x261608) {
    try {
      const _0x289787 = JSON.stringify({
          "businessId": _0x261608.businessId,
          "endTime": this.endTime,
          "extParams": "",
          "mediaScene": "video",
          "neoInfos": [{
            "creativeId": _0x273bc1,
            "extInfo": "",
            "llsid": _0x599f32,
            "requestSceneType": _0x261608.requestSceneType,
            "taskType": _0x261608.taskType,
            "watchExpId": "",
            "watchStage": 0
          }],
          "pageId": _0x261608.pageId,
          "posId": _0x261608.posId,
          "reportType": 0,
          "sessionId": "",
          "startTime": this.startTime,
          "subPageId": _0x261608.subPageId
        }),
        _0x5db7d9 = "bizStr=" + encodeURIComponent(_0x289787) + "&cs=false&client_key=2ac2a76d&kuaishou.api_st=" + this.kuaishouApiSt,
        _0x2f6c04 = this.queryParams + "&" + _0x5db7d9,
        _0xaf389c = await this.requestSignService({
          "urlpath": this.taskReportPath,
          "reqdata": _0x2f6c04,
          "api_client_salt": this.salt
        }, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成报告签名");
      if (!_0xaf389c) return null;
      return {
        "sig": _0xaf389c.sig,
        "sig3": _0xaf389c.__NS_sig3,
        "sigtoken": _0xaf389c.__NStokensig,
        "xfalcon": _0xaf389c.__NS_xfalcon,
        "post": _0x5db7d9
      };
    } catch (_0x25b1d5) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成签名异常: " + _0x25b1d5.message), null;
    }
  }
  async ["submitReport"](_0x523077, _0x4feb79, _0x2c45c6, _0x4b66c6, _0xafd383, _0xcee21f, _0x260fcf) {
    try {
      const _0x21bce3 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x523077 + "&__NS_sig3=" + _0x4feb79 + "&__NS_xfalcon=" + _0x4b66c6 + "&__NStokensig=" + _0x2c45c6),
        {
          response: _0x2ab9a9,
          body: _0xabcfb0
        } = await _0x552644({
          "method": "POST",
          "url": _0x21bce3,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Host": "api.e.kuaishou.cn",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "body": _0xafd383,
          "timeout": 12000
        }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务");
      if (!_0xabcfb0) return {
        "success": false,
        "reward": 0
      };
      if (_0xabcfb0.result === 1) {
        const _0x4d0460 = _0xabcfb0.data?.["neoAmount"] || 0;
        return this.sessionTotalReward += _0x4d0460, console.log("获取到广告 ==> 预计奖励[" + _0x4d0460 + "]金币，目前已获[" + this.sessionTotalReward + "]金币"), _0x4d0460 <= this.lowRewardThreshold ? (this.lowRewardStreak++, this.did = _0x136b73(), console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币奖励(" + _0x4d0460 + ")低于阈值(" + this.lowRewardThreshold + ")，当前连续低奖励次数：" + this.lowRewardStreak + "/" + this.lowRewardLimit), this.lowRewardStreak >= this.lowRewardLimit && (console.log("🏁 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务"), this.stopAllTasks = true)) : this.lowRewardStreak = 0, {
          "success": true,
          "reward": _0x4d0460
        };
      }
      if ([20107, 20108, 1003, 415].includes(_0xabcfb0.result)) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x260fcf.name + " 已达上限"), this.taskLimitReached[_0xcee21f] = true, {
        "success": false,
        "reward": 0
      };
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x260fcf.name + " 奖励失败，result=" + _0xabcfb0.result + " msg=" + (_0xabcfb0.data || "")), {
        "success": false,
        "reward": 0
      };
    } catch (_0x360a21) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务异常: " + _0x360a21.message), {
        "success": false,
        "reward": 0
      };
    }
  }
  async ["getSign"](_0x569939) {
    try {
      const _0x3e0684 = Math.floor(Date.now() / 1000).toString(),
        _0x2c8070 = "encsign",
        _0x5aabdd = _0xaa743a.createHash("md5").update(_0x2c8070 + _0x569939 + _0x3e0684 + _0x20eb10).digest("hex"),
        {
          response: _0x388027,
          body: _0x4afd41
        } = await _0x552644({
          "method": "POST",
          "url": _0x105d72,
          "form": {
            "action": _0x2c8070,
            "data": _0x569939,
            "timestamp": _0x3e0684,
            "sign": _0x5aabdd
          }
        });
      if (!_0x4afd41) {
        return console.log("❌ 账号[" + this.nickname + "] encsign 无响应数据"), null;
      }
      let _0x124411 = _0x4afd41;
      if (_0x4afd41 && _0x4afd41.encrypted === true && _0x4afd41.data) {
        _0x124411 = _0x20f78d(_0x4afd41.data, _0x56230c);
        if (!_0x124411) {
          return console.log("❌ 账号[" + this.nickname + "] encsign 解密失败"), null;
        }
      }
      if (_0x124411 && _0x124411.status) return _0x124411.data;
      const _0x56da71 = _0x124411?.["error"] === "IP_BLACKLISTED" || _0x124411?.["error"] === "BLACKLISTED" || _0x124411?.["message"] && (_0x124411.message.includes("黑名单") || _0x124411.message.includes("拉黑")) || _0x388027 && _0x388027.status === 403;
      if (_0x56da71) {
        _0x221bc7++;
        console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 被黑名单拦截，当前累计次数: " + _0x221bc7 + "/" + _0x3ceaf1);
        if (_0x221bc7 >= _0x3ceaf1) return console.log("\n" + "=".repeat(80)), console.log("❌ 被黑名单拦截次数已达到 " + _0x3ceaf1 + " 次，强制停止脚本！"), console.log("=".repeat(80) + "\n"), _0x56c9ed = true, typeof this !== "undefined" && this.stopAllTasks !== undefined && (this.stopAllTasks = true), setTimeout(() => {
          process.exit(1);
        }, 1000), null;
      }
      return console.log("❌ 账号[" + this.nickname + "] encsign 签名服务失败: " + (_0x124411?.["message"] || "无响应")), null;
    } catch (_0x2c35a2) {
      return console.log("❌ 账号[" + this.nickname + "] encsign 签名请求异常: " + _0x2c35a2.message), null;
    }
  }
  async ["requestSignService"](_0x4654bb, _0x18ade7) {
    let _0x34a493 = {};
    const _0x2b926b = Math.floor(Date.now() / 1000).toString(),
      _0x12b8d4 = "nssig",
      _0x27e6a5 = _0xaa743a.createHash("md5").update(_0x12b8d4 + _0x4654bb.urlpath + _0x4654bb.reqdata + _0x4654bb.api_client_salt + _0x2b926b + _0x20eb10).digest("hex"),
      {
        response: _0x48cd7d,
        body: _0x3ddf53
      } = await _0x552644({
        "method": "POST",
        "url": _0x105d72,
        "form": {
          "action": _0x12b8d4,
          "path": _0x4654bb.urlpath,
          "data": _0x4654bb.reqdata,
          "salt": _0x4654bb.api_client_salt,
          "timestamp": _0x2b926b,
          "sign": _0x27e6a5
        },
        "timeout": 15000
      }, null, _0x18ade7 + "（签名服务）");
    let _0x13cd0e = _0x3ddf53;
    if (_0x3ddf53 && _0x3ddf53.encrypted === true && _0x3ddf53.data) {
      _0x13cd0e = _0x20f78d(_0x3ddf53.data, _0x56230c);
      if (!_0x13cd0e) return console.log("❌ 账号[" + this.nickname + "] nssig 解密失败"), null;
    }
    if (_0x13cd0e && _0x13cd0e.data) {
      let _0x58fe68 = _0x13cd0e.data.nssig3,
        _0x2f869d = _0x13cd0e.data.nstokensig,
        _0x4879e9 = _0x13cd0e.data.nssig4;
      return Object.assign(_0x34a493, {
        "__NS_sig3": _0x58fe68,
        "__NStokensig": _0x2f869d,
        "sig": _0x13cd0e.data.sig,
        "__NS_xfalcon": _0x4879e9
      }), _0x34a493;
    }
    const _0x33d6c0 = _0x13cd0e?.["error"] === "IP_BLACKLISTED" || _0x13cd0e?.["error"] === "BLACKLISTED" || _0x13cd0e?.["message"] && (_0x13cd0e.message.includes("黑名单") || _0x13cd0e.message.includes("拉黑")) || _0x48cd7d && _0x48cd7d.status === 403;
    if (_0x33d6c0) {
      _0x221bc7++;
      console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x18ade7 + " 被黑名单拦截，当前累计次数: " + _0x221bc7 + "/" + _0x3ceaf1);
      if (_0x221bc7 >= _0x3ceaf1) {
        console.log("\n" + "=".repeat(80));
        console.log("❌ 被黑名单拦截次数已达到 " + _0x3ceaf1 + " 次，强制停止脚本！");
        console.log("=".repeat(80) + "\n");
        _0x56c9ed = true;
        if (typeof this !== "undefined" && this.stopAllTasks !== undefined) {
          this.stopAllTasks = true;
        }
        return setTimeout(() => {
          process.exit(1);
        }, 1000), null;
      }
    }
    return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 签名服务失败: " + (_0x13cd0e?.["error"] || _0x13cd0e?.["message"] || "无响应")), null;
  }
  async ["executeTask"](_0x23e516) {
    const _0x2b7976 = this.taskConfigs[_0x23e516];
    if (!_0x2b7976) return false;
    if (this.taskLimitReached[_0x23e516]) return false;
    try {
      const _0x4abaa6 = await this.retryOperation(() => this.getAdInfo(_0x2b7976), "获取" + _0x2b7976.name + "信息", 3);
      if (!_0x4abaa6) {
        this.taskStats[_0x23e516].failed++;
        _0x4f02ee++;
        console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取失败，当前累计失败次数: " + _0x4f02ee + "/" + _0x4eb746);
        if (_0x4f02ee >= _0x4eb746) {
          return console.log("\n" + "=".repeat(80)), console.log("❌ 获取失败次数已达到 " + _0x4eb746 + " 次，强制停止脚本！"), console.log("=".repeat(80) + "\n"), _0x56c9ed = true, typeof this !== "undefined" && this.stopAllTasks !== undefined && (this.stopAllTasks = true), setTimeout(() => {
            process.exit(1);
          }, 1000), false;
        }
        return false;
      }
      const _0x2e0e63 = Math.floor(Math.random() * 10000) + 30000;
      console.log("观看广告中... " + Math.round(_0x2e0e63 / 1000) + "秒");
      await new Promise(_0x502156 => setTimeout(_0x502156, _0x2e0e63));
      const _0x3d7296 = await this.retryOperation(() => this.generateSignature(_0x4abaa6.cid, _0x4abaa6.llsid, _0x23e516, _0x2b7976), "生成" + _0x2b7976.name + "签名", 3);
      if (!_0x3d7296) return this.taskStats[_0x23e516].failed++, false;
      const _0x565399 = await this.retryOperation(() => this.submitReport(_0x3d7296.sig, _0x3d7296.sig3, _0x3d7296.sigtoken, _0x3d7296.xfalcon, _0x3d7296.post, _0x23e516, _0x2b7976), "提交" + _0x2b7976.name + "报告", 3);
      if (_0x565399?.["success"]) return this.taskStats[_0x23e516].success++, this.taskStats[_0x23e516].totalReward += _0x565399.reward || 0, true;
      return this.taskStats[_0x23e516].failed++, false;
    } catch (_0x3358eb) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务异常(" + _0x23e516 + "): " + _0x3358eb.message), this.taskStats[_0x23e516].failed++, false;
    }
  }
  async ["executeAllTasksByPriority"]() {
    const _0x113e84 = this.tasksToExecute.includes("look"),
      _0x478784 = this.tasksToExecute.includes("food"),
      _0x566a86 = this.tasksToExecute.includes("box"),
      _0x1e8e10 = this.tasksToExecute.includes("search"),
      _0x44d528 = this.tasksToExecute.filter(_0x3ee3cc => _0x3ee3cc !== "look" && _0x3ee3cc !== "search");
    for (let _0x4c229f = 0; _0x4c229f < _0x59b9d0; _0x4c229f++) {
      if (this.stopAllTasks || _0x56c9ed) break;
      console.log("\n============================== 🚀 账号[" + this.nickname + "] 第" + (_0x4c229f + 1) + "/" + _0x59b9d0 + "轮开始 ==============================");
      if (_0x113e84) {
        const _0x1981de = this.taskConfigs.look,
          _0x39fa41 = this.taskConfigs.follow;
        console.log("🎬 开始执行 " + _0x1981de.name + " (+" + _0x39fa41.name + ")，本轮共 " + _0x5cf012 + " 次");
        for (let _0xba3011 = 0; _0xba3011 < _0x5cf012; _0xba3011++) {
          if (this.stopAllTasks || _0x56c9ed || this.taskLimitReached.look) break;
          console.log("\n--- 账号[" + this.nickname + "] " + _0x1981de.name + " 第 " + (_0xba3011 + 1) + "/" + _0x5cf012 + " 次执行 ---");
          const _0x229158 = await this.executeTask("look");
          if (_0x229158 && !this.stopAllTasks && !_0x56c9ed) {
            const _0x1e5c4b = 20000 + Math.floor(Math.random() * 40000);
            console.log("⏱ 账号[" + this.nickname + "] look 任务成功，随机等待 " + Math.round(_0x1e5c4b / 1000) + " 秒后执行 " + _0x39fa41.name);
            await new Promise(_0x32e6df => setTimeout(_0x32e6df, _0x1e5c4b));
            const _0x399382 = _0x48798d;
            for (let _0x169895 = 0; _0x169895 < _0x399382; _0x169895++) {
              if (this.stopAllTasks || _0x56c9ed || this.taskLimitReached.follow) break;
              console.log("\n--- 账号[" + this.nickname + "] " + _0x39fa41.name + " (第 " + (_0x169895 + 1) + "/" + _0x399382 + " 次) 紧随 look 任务执行 ---");
              await this.executeTask("follow");
            }
          }
          if (_0xba3011 < _0x5cf012 - 1 && !this.stopAllTasks && !_0x56c9ed && !this.taskLimitReached.look) {
            const _0x3dd3d2 = _0xba3011 < _0x5cf012 - 1 && !this.stopAllTasks && !_0x56c9ed && !this.taskLimitReached.look;
            if (_0x3dd3d2) {
              const _0x4a1a7d = 20000 + Math.floor(Math.random() * 40000);
              console.log("⏱ 账号[" + this.nickname + "] " + _0x1981de.name + " 任务间隔，随机等待 " + Math.round(_0x4a1a7d / 1000) + " 秒");
              await new Promise(_0x5a8d80 => setTimeout(_0x5a8d80, _0x4a1a7d));
            }
          }
        }
        if (!this.stopAllTasks && !_0x56c9ed && (_0x478784 || _0x566a86 || _0x1e8e10)) {
          const _0x1b820c = 20000 + Math.floor(Math.random() * 40000);
          console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x1b820c / 1000) + " 秒切换...");
          await new Promise(_0x2e5ac8 => setTimeout(_0x2e5ac8, _0x1b820c));
        }
      }
      if (_0x1e8e10) {
        const _0x3f73b8 = this.taskConfigs.search,
          _0xdcf585 = this.taskConfigs.search_follow;
        console.log("\n🎬 开始执行 " + _0x3f73b8.name + " (+" + _0xdcf585.name + ")，本轮共 " + _0x39f24a + " 次");
        for (let _0x529c77 = 0; _0x529c77 < _0x39f24a; _0x529c77++) {
          if (this.stopAllTasks || _0x56c9ed || this.taskLimitReached.search) break;
          console.log("\n--- 账号[" + this.nickname + "] " + _0x3f73b8.name + " 第 " + (_0x529c77 + 1) + "/" + _0x39f24a + " 次执行 ---");
          const _0x35bfd6 = await this.executeTask("search");
          if (_0x35bfd6 && !this.stopAllTasks && !_0x56c9ed) {
            const _0x26099b = 20000 + Math.floor(Math.random() * 40000);
            console.log("⏱ 账号[" + this.nickname + "] search 任务成功，随机等待 " + Math.round(_0x26099b / 1000) + " 秒后执行 " + _0xdcf585.name);
            await new Promise(_0x121890 => setTimeout(_0x121890, _0x26099b));
            const _0x41bb5d = _0x1b4976;
            for (let _0x1c5d7e = 0; _0x1c5d7e < _0x41bb5d; _0x1c5d7e++) {
              if (this.stopAllTasks || _0x56c9ed || this.taskLimitReached.search_follow) break;
              console.log("\n--- 账号[" + this.nickname + "] " + _0xdcf585.name + " (第 " + (_0x1c5d7e + 1) + "/" + _0x41bb5d + " 次) 紧随 search 任务执行 ---");
              this.adaddnum++;
              await this.executeTask("search_follow");
              this.adaddnum = 0;
            }
          }
          if (_0x529c77 < _0x39f24a - 1 && !this.stopAllTasks && !_0x56c9ed && !this.taskLimitReached.search) {
            const _0x35d066 = _0x529c77 < _0x39f24a - 1 && !this.stopAllTasks && !_0x56c9ed && !this.taskLimitReached.search;
            if (_0x35d066) {
              const _0x5a6e6c = 20000 + Math.floor(Math.random() * 40000);
              console.log("⏱ 账号[" + this.nickname + "] " + _0x3f73b8.name + " 任务间隔，随机等待 " + Math.round(_0x5a6e6c / 1000) + " 秒");
              await new Promise(_0x49accc => setTimeout(_0x49accc, _0x5a6e6c));
            }
          }
        }
        if (!this.stopAllTasks && !_0x56c9ed && (_0x478784 || _0x566a86)) {
          const _0x38f783 = 20000 + Math.floor(Math.random() * 40000);
          console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x38f783 / 1000) + " 秒切换...");
          await new Promise(_0x224590 => setTimeout(_0x224590, _0x38f783));
        }
      }
      for (const _0x5a7c65 of _0x44d528) {
        if (this.stopAllTasks || _0x56c9ed) break;
        if (_0x5a7c65 === "look" || _0x5a7c65 === "search") continue;
        const _0x40fdd5 = this.taskConfigs[_0x5a7c65];
        if (this.taskLimitReached[_0x5a7c65]) {
          console.log("⚠️ 账号[" + this.nickname + "] " + _0x40fdd5.name + " 已达上限，本轮跳过");
          continue;
        }
        console.log("\n🎬 开始执行 " + _0x40fdd5.name + "，本轮共 1 次");
        await this.executeTask(_0x5a7c65);
        if (!this.stopAllTasks && !_0x56c9ed) {
          const _0x5c02a3 = 20000 + Math.floor(Math.random() * 40000);
          console.log("⏱ 账号[" + this.nickname + "] " + _0x40fdd5.name + " 任务间隔，随机等待 " + Math.round(_0x5c02a3 / 1000) + " 秒");
          await new Promise(_0x5848b0 => setTimeout(_0x5848b0, _0x5c02a3));
        }
      }
      if (_0x4c229f < _0x59b9d0 - 1 && !this.stopAllTasks && !_0x56c9ed) {
        const _0x5073fa = 100000 + Math.floor(Math.random() * 200000);
        console.log("\n============================== ⏱ 账号[" + this.nickname + "] 第" + (_0x4c229f + 1) + "轮完成，等待 " + Math.round(_0x5073fa / 1000) + " 秒进入下一轮 ==============================");
        await new Promise(_0x5e4d9b => setTimeout(_0x5e4d9b, _0x5073fa));
      }
    }
    return {};
  }
}
function _0x34ebf5(_0x17836f) {
  const _0x149fa0 = String(_0x17836f || "").trim().split("#");
  if (_0x149fa0.length < 2) return null;
  let _0x217187 = "",
    _0x1237cc = "",
    _0xdd72a0 = "",
    _0xdc6b6f = null;
  if (_0x149fa0.length === 2) _0x1237cc = _0x149fa0[0], _0xdd72a0 = _0x149fa0[1];else {
    if (_0x149fa0.length === 3) {
      /socks5:\/\//i.test(_0x149fa0[2]) ? (_0x1237cc = _0x149fa0[0], _0xdd72a0 = _0x149fa0[1], _0xdc6b6f = _0x149fa0[2]) : (_0x217187 = _0x149fa0[0], _0x1237cc = _0x149fa0[1], _0xdd72a0 = _0x149fa0[2]);
    } else _0x149fa0.length >= 4 && (_0x217187 = _0x149fa0[0], _0x1237cc = _0x149fa0[1], _0xdd72a0 = _0x149fa0.slice(2, _0x149fa0.length - 1).join("#"), _0xdc6b6f = _0x149fa0[_0x149fa0.length - 1]);
  }
  if (_0xdc6b6f) {
    if (!/^socks5:\/\//i.test(_0xdc6b6f)) {
      _0xdc6b6f = null;
    } else try {
      new URL(_0xdc6b6f);
    } catch (_0x5cc756) {
      console.log("❌ 代理URL格式错误: " + _0xdc6b6f);
      _0xdc6b6f = null;
    }
  }
  return {
    "remark": _0x217187 || "",
    "salt": _0xdd72a0,
    "cookie": _0x1237cc,
    "proxyUrl": _0xdc6b6f
  };
}
function _0x201641() {
  const _0x5254b4 = _0x28c7cc(),
    _0x4b7a92 = [];
  for (const _0x79d567 of _0x5254b4) {
    const _0x44f219 = _0x34ebf5(_0x79d567);
    if (_0x44f219) _0x4b7a92.push(_0x44f219);else {
      console.log("账号格式错误：" + _0x79d567);
    }
  }
  return _0x4b7a92.forEach((_0x40c54c, _0x41234e) => {
    _0x40c54c.index = _0x41234e + 1;
  }), _0x4b7a92;
}
async function _0x3f62c3(_0x100d5b, _0x101c8e, _0x31be16) {
  const _0x7b00b3 = new Array(_0x100d5b.length);
  let _0x13209a = 0;
  async function _0x457e66() {
    while (true) {
      if (_0x56c9ed) return;
      const _0x57f18d = _0x13209a++;
      if (_0x57f18d >= _0x100d5b.length) return;
      const _0x426629 = _0x100d5b[_0x57f18d];
      try {
        _0x7b00b3[_0x57f18d] = await _0x31be16(_0x426629, _0x57f18d);
      } catch (_0x29c1d1) {
        console.log("并发执行异常（index=" + (_0x57f18d + 1) + "）：" + _0x29c1d1.message);
        _0x7b00b3[_0x57f18d] = null;
      }
    }
  }
  const _0x5dd842 = Array.from({
    "length": Math.min(_0x101c8e, _0x100d5b.length)
  }, _0x457e66);
  return await Promise.all(_0x5dd842), _0x7b00b3;
}
async function _0x4d2578(_0x1fcb06) {
  if (_0x1fcb06.proxyUrl) {
    const _0x4a61e0 = await _0x35899d(_0x1fcb06.proxyUrl, "账号[" + _0x1fcb06.index + "]" + (_0x1fcb06.remark ? "（" + _0x1fcb06.remark + "）" : ""));
    console.log("  - " + (_0x4a61e0.ok ? "✅ 代理验证通过" : "❌ 代理验证失败") + ": " + _0x4a61e0.msg);
    if (_0x4a61e0.ok && _0x4a61e0.ip && _0x4a61e0.ip !== "localhost") {
      if (!_0x1feddc(_0x4a61e0.ip)) console.log("⚠️ 账号[" + _0x1fcb06.index + "] 检测到无效IP格式，跳过重复检查");else _0x35a4eb.has(_0x4a61e0.ip) ? (console.log("\n⚠️ 存在相同代理IP（" + _0x4a61e0.ip + "），请立即检查！"), process.exit(1)) : _0x35a4eb.add(_0x4a61e0.ip);
    } else {
      if (!_0x4a61e0.ok) return console.log("❌ 账号[" + _0x1fcb06.index + "] 代理测试失败，跳过该账号"), {
        "index": _0x1fcb06.index,
        "remark": _0x1fcb06.remark || "无备注",
        "nickname": "账号" + _0x1fcb06.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": "代理测试失败: " + _0x4a61e0.msg,
        "skipped": true
      };
    }
  } else console.log("账号[" + _0x1fcb06.index + "]" + (_0x1fcb06.remark ? "（" + _0x1fcb06.remark + "）" : "") + " 未配置代理，走直连");
  console.log("账号[" + _0x1fcb06.index + "]" + (_0x1fcb06.remark ? "（" + _0x1fcb06.remark + "）" : "") + " 🔍 获取账号信息中...");
  let _0xcc2142 = await _0x112eac(_0x1fcb06.cookie, _0x1fcb06.proxyUrl, _0x1fcb06.index),
    _0x43c8cd = _0xcc2142?.["nickname"] || "账号" + _0x1fcb06.index;
  if (_0xcc2142) {
    const _0x2a2614 = _0xcc2142.totalCoin != null ? _0xcc2142.totalCoin : "未知",
      _0x4cce4b = _0xcc2142.allCash != null ? _0xcc2142.allCash : "未知";
    console.log("账号[" + _0x43c8cd + "] ✅ 登录成功，💰 当前金币: " + _0x2a2614 + "，💸 当前余额: " + _0x4cce4b);
  } else {
    console.log("账号[" + _0x43c8cd + "] ❌ 基本信息获取失败，但仍继续执行任务");
  }
  const _0x2d0de = new _0x239c6e({
    ..._0x1fcb06,
    "nickname": _0x43c8cd,
    "tasksToExecute": _0x3fd251
  });
  if (_0xcc2142) {
    await _0x2d0de.checkCoinLimit();
    if (_0x2d0de.coinExceeded) {
      console.log("账号[" + _0x2d0de.nickname + "]" + (_0x1fcb06.remark ? "（" + _0x1fcb06.remark + "）" : "") + " 初始金币已超过阈值，不执行任务");
      const _0x72428e = await _0x112eac(_0x1fcb06.cookie, _0x1fcb06.proxyUrl, _0x1fcb06.index),
        _0x269e03 = _0xcc2142?.["totalCoin"] || 0,
        _0x3d3c5e = _0x72428e?.["totalCoin"] || 0,
        _0x317200 = _0x3d3c5e - _0x269e03,
        _0x42960b = _0xcc2142?.["allCash"] || 0,
        _0x4fdec3 = _0x72428e?.["allCash"] || 0,
        _0x41a208 = _0x4fdec3 - _0x42960b;
      return {
        "index": _0x1fcb06.index,
        "remark": _0x1fcb06.remark || "无备注",
        "nickname": _0x43c8cd,
        "initialCoin": _0x269e03,
        "finalCoin": _0x3d3c5e,
        "coinChange": _0x317200,
        "initialCash": _0x42960b,
        "finalCash": _0x4fdec3,
        "cashChange": _0x41a208,
        "stats": _0x2d0de.getTaskStats(),
        "coinLimitExceeded": true
      };
    }
  }
  console.log("账号[" + _0x2d0de.nickname + "]" + (_0x1fcb06.remark ? "（" + _0x1fcb06.remark + "）" : "") + " 🚀 开始执行所有任务");
  await _0x2d0de.executeAllTasksByPriority();
  const _0x5d5838 = await _0x112eac(_0x1fcb06.cookie, _0x1fcb06.proxyUrl, _0x1fcb06.index),
    _0x2f031b = _0xcc2142?.["totalCoin"] || 0,
    _0x39a993 = _0x5d5838?.["totalCoin"] || 0,
    _0x15c0aa = _0x39a993 - _0x2f031b,
    _0x80adda = _0xcc2142?.["allCash"] || 0,
    _0xbc884c = _0x5d5838?.["allCash"] || 0,
    _0x4f11a7 = _0xbc884c - _0x80adda;
  return _0x2d0de.printTaskStats(), {
    "index": _0x1fcb06.index,
    "remark": _0x1fcb06.remark || "无备注",
    "nickname": _0x43c8cd,
    "initialCoin": _0x2f031b,
    "finalCoin": _0x39a993,
    "coinChange": _0x15c0aa,
    "initialCash": _0x80adda,
    "finalCash": _0xbc884c,
    "cashChange": _0x4f11a7,
    "stats": _0x2d0de.getTaskStats(),
    "coinLimitExceeded": _0x2d0de.coinExceeded,
    "infoFetchFailed": !_0xcc2142
  };
}
function _0x34ebf5(_0x451c3e) {
  const _0x1211bd = String(_0x451c3e || "").trim().split("#");
  if (_0x1211bd.length < 2) return null;
  let _0xdab550 = "",
    _0x46b085 = "",
    _0x7076 = "",
    _0x3b8739 = null;
  if (_0x1211bd.length === 2) _0x46b085 = _0x1211bd[0], _0x7076 = _0x1211bd[1];else {
    if (_0x1211bd.length === 3) /socks5:\/\//i.test(_0x1211bd[2]) ? (_0x46b085 = _0x1211bd[0], _0x7076 = _0x1211bd[1], _0x3b8739 = _0x1211bd[2]) : (_0xdab550 = _0x1211bd[0], _0x46b085 = _0x1211bd[1], _0x7076 = _0x1211bd[2]);else _0x1211bd.length >= 4 && (_0xdab550 = _0x1211bd[0], _0x46b085 = _0x1211bd[1], _0x7076 = _0x1211bd.slice(2, _0x1211bd.length - 1).join("#"), _0x3b8739 = _0x1211bd[_0x1211bd.length - 1]);
  }
  if (_0x3b8739) {
    if (!/^socks5:\/\//i.test(_0x3b8739)) {
      _0x3b8739 = null;
    } else {
      try {
        new URL(_0x3b8739);
      } catch (_0x544aeb) {
        console.log("❌ 代理URL格式错误: " + _0x3b8739);
        _0x3b8739 = null;
      }
    }
  }
  return {
    "remark": _0xdab550 || "",
    "salt": _0x7076,
    "cookie": _0x46b085,
    "proxyUrl": _0x3b8739
  };
}
function _0x201641() {
  const _0x163d58 = _0x28c7cc(),
    _0x398e10 = [];
  for (const _0x44a3c8 of _0x163d58) {
    const _0x5683f2 = _0x34ebf5(_0x44a3c8);
    _0x5683f2 ? _0x398e10.push(_0x5683f2) : console.log("账号格式错误：" + _0x44a3c8);
  }
  return _0x398e10.forEach((_0x1fee4a, _0x1e1344) => {
    _0x1fee4a.index = _0x1e1344 + 1;
  }), _0x398e10;
}
async function _0x3f62c3(_0x4b752c, _0x4b4c0d, _0x25c690) {
  const _0x229cf3 = new Array(_0x4b752c.length);
  let _0x2a579b = 0;
  async function _0x1871d4() {
    while (true) {
      if (_0x56c9ed) return;
      const _0x2ee896 = _0x2a579b++;
      if (_0x2ee896 >= _0x4b752c.length) return;
      const _0x311874 = _0x4b752c[_0x2ee896];
      try {
        _0x229cf3[_0x2ee896] = await _0x25c690(_0x311874, _0x2ee896);
      } catch (_0x38904e) {
        console.log("并发执行异常（index=" + (_0x2ee896 + 1) + "）：" + _0x38904e.message);
        _0x229cf3[_0x2ee896] = null;
      }
    }
  }
  const _0x556fc6 = Array.from({
    "length": Math.min(_0x4b4c0d, _0x4b752c.length)
  }, _0x1871d4);
  return await Promise.all(_0x556fc6), _0x229cf3;
}
async function _0x4d2578(_0x1a4329) {
  if (_0x1a4329.proxyUrl) {
    const _0x4b3e28 = await _0x35899d(_0x1a4329.proxyUrl, "账号[" + _0x1a4329.index + "]" + (_0x1a4329.remark ? "（" + _0x1a4329.remark + "）" : ""));
    console.log("  - " + (_0x4b3e28.ok ? "✅ 代理验证通过" : "❌ 代理验证失败") + ": " + _0x4b3e28.msg);
    if (_0x4b3e28.ok && _0x4b3e28.ip && _0x4b3e28.ip !== "localhost") {
      if (!_0x1feddc(_0x4b3e28.ip)) {
        console.log("⚠️ 账号[" + _0x1a4329.index + "] 检测到无效IP格式，跳过重复检查");
      } else _0x35a4eb.has(_0x4b3e28.ip) ? (console.log("\n⚠️ 存在相同代理IP（" + _0x4b3e28.ip + "），请立即检查！"), process.exit(1)) : _0x35a4eb.add(_0x4b3e28.ip);
    } else {
      if (!_0x4b3e28.ok) return console.log("❌ 账号[" + _0x1a4329.index + "] 代理测试失败，跳过该账号"), {
        "index": _0x1a4329.index,
        "remark": _0x1a4329.remark || "无备注",
        "nickname": "账号" + _0x1a4329.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": "代理测试失败: " + _0x4b3e28.msg,
        "skipped": true
      };
    }
  } else console.log("账号[" + _0x1a4329.index + "]" + (_0x1a4329.remark ? "（" + _0x1a4329.remark + "）" : "") + " 未配置代理，走直连");
  console.log("账号[" + _0x1a4329.index + "]" + (_0x1a4329.remark ? "（" + _0x1a4329.remark + "）" : "") + " 🔍 获取账号信息中...");
  let _0x2f877c = await _0x112eac(_0x1a4329.cookie, _0x1a4329.proxyUrl, _0x1a4329.index),
    _0x252f4a = _0x2f877c?.["nickname"] || "账号" + _0x1a4329.index;
  if (_0x2f877c) {
    const _0x2a71f4 = _0x2f877c.totalCoin != null ? _0x2f877c.totalCoin : "未知",
      _0x13cdac = _0x2f877c.allCash != null ? _0x2f877c.allCash : "未知";
    console.log("账号[" + _0x252f4a + "] ✅ 登录成功，💰 当前金币: " + _0x2a71f4 + "，💸 当前余额: " + _0x13cdac);
  } else {
    console.log("账号[" + _0x252f4a + "] ❌ 基本信息获取失败，但仍继续执行任务");
  }
  const _0xe76356 = new _0x239c6e({
    ..._0x1a4329,
    "nickname": _0x252f4a,
    "tasksToExecute": _0x3fd251
  });
  if (_0x2f877c) {
    await _0xe76356.checkCoinLimit();
    if (_0xe76356.coinExceeded) {
      console.log("账号[" + _0xe76356.nickname + "]" + (_0x1a4329.remark ? "（" + _0x1a4329.remark + "）" : "") + " 初始金币已超过阈值，不执行任务");
      const _0xe5db3e = await _0x112eac(_0x1a4329.cookie, _0x1a4329.proxyUrl, _0x1a4329.index),
        _0x4e7978 = _0x2f877c?.["totalCoin"] || 0,
        _0x5387ae = _0xe5db3e?.["totalCoin"] || 0,
        _0x10d2c9 = _0x5387ae - _0x4e7978,
        _0x5ec237 = _0x2f877c?.["allCash"] || 0,
        _0x7ddcf2 = _0xe5db3e?.["allCash"] || 0,
        _0x855cd8 = _0x7ddcf2 - _0x5ec237;
      return {
        "index": _0x1a4329.index,
        "remark": _0x1a4329.remark || "无备注",
        "nickname": _0x252f4a,
        "initialCoin": _0x4e7978,
        "finalCoin": _0x5387ae,
        "coinChange": _0x10d2c9,
        "initialCash": _0x5ec237,
        "finalCash": _0x7ddcf2,
        "cashChange": _0x855cd8,
        "stats": _0xe76356.getTaskStats(),
        "coinLimitExceeded": true
      };
    }
  }
  console.log("账号[" + _0xe76356.nickname + "]" + (_0x1a4329.remark ? "（" + _0x1a4329.remark + "）" : "") + " 🚀 开始执行所有任务");
  await _0xe76356.executeAllTasksByPriority();
  const _0xc7727f = await _0x112eac(_0x1a4329.cookie, _0x1a4329.proxyUrl, _0x1a4329.index),
    _0x1921f0 = _0x2f877c?.["totalCoin"] || 0,
    _0x4c5aab = _0xc7727f?.["totalCoin"] || 0,
    _0x367eb6 = _0x4c5aab - _0x1921f0,
    _0x17ad12 = _0x2f877c?.["allCash"] || 0,
    _0x4ee991 = _0xc7727f?.["allCash"] || 0,
    _0x518f15 = _0x4ee991 - _0x17ad12;
  return _0xe76356.printTaskStats(), {
    "index": _0x1a4329.index,
    "remark": _0x1a4329.remark || "无备注",
    "nickname": _0x252f4a,
    "initialCoin": _0x1921f0,
    "finalCoin": _0x4c5aab,
    "coinChange": _0x367eb6,
    "initialCash": _0x17ad12,
    "finalCash": _0x4ee991,
    "cashChange": _0x518f15,
    "stats": _0xe76356.getTaskStats(),
    "coinLimitExceeded": _0xe76356.coinExceeded,
    "infoFetchFailed": !_0x2f877c
  };
}
function _0x99d8e8(_0x22431b) {
  if (!_0x22431b.length) {
    console.log("\n没有可显示的账号信息。");
    return;
  }
  const _0x3b766a = _0x22431b.reduce((_0x2611aa, _0x37aa85) => {
      return _0x2611aa + (parseInt(_0x37aa85.initialCoin) || 0);
    }, 0),
    _0x1fbc90 = _0x22431b.reduce((_0x555002, _0x15e746) => {
      return _0x555002 + (parseInt(_0x15e746.finalCoin) || 0);
    }, 0),
    _0x36e589 = _0x1fbc90 - _0x3b766a,
    _0x244f42 = _0x22431b.reduce((_0x4b1307, _0xe4dbc8) => {
      return _0x4b1307 + (parseFloat(_0xe4dbc8.initialCash) || 0);
    }, 0),
    _0x314044 = _0x22431b.reduce((_0x4445bd, _0x5dc618) => {
      return _0x4445bd + (parseFloat(_0x5dc618.finalCash) || 0);
    }, 0),
    _0x325d2b = _0x314044 - _0x244f42;
  let _0x30ae17 = 0,
    _0x1b5443 = 0,
    _0xe54fa6 = 0;
  _0x22431b.forEach(_0x242afe => {
    _0x242afe.stats && Object.values(_0x242afe.stats).forEach(_0x27430a => {
      _0x30ae17 += _0x27430a.success + _0x27430a.failed;
      _0x1b5443 += _0x27430a.success;
      _0xe54fa6 += _0x27430a.totalReward;
    });
  });
  const _0x2a098c = _0x30ae17 > 0 ? (_0x1b5443 / _0x30ae17 * 100).toFixed(1) : "0.0",
    _0xadcfb1 = _0x22431b.filter(_0x54a960 => _0x54a960.skipped).length;
  console.log("\n\n" + "=".repeat(80));
  console.log("|" + _0x143f1f("      快手养号任务执行结果汇总表      ", 78) + "|");
  console.log("=".repeat(80));
  console.log("|" + ("总账号数: " + _0x22431b.length).padEnd(22) + ("跳过账号: " + _0xadcfb1).padEnd(22) + ("总任务数: " + _0x30ae17).padEnd(22) + ("任务成功率: " + _0x2a098c + "%").padEnd(10) + "|");
  console.log("|" + ("总金币变化: " + _0x36e589).padEnd(26) + ("总金币奖励: " + _0xe54fa6).padEnd(26) + ("总余额变化: " + _0x325d2b.toFixed(2)).padEnd(24) + "|");
  console.log("-".repeat(80));
  const _0x41c693 = ["序号", "备注", "账号昵称", "初始金币", "最终金币", "金币变化", "初始余额", "最终余额", "余额变化", "状态"],
    _0x4a1a1f = [6, 16, 16, 12, 12, 12, 12, 12, 12, 10];
  let _0x442b34 = "|";
  _0x41c693.forEach((_0x48a370, _0x35ca61) => {
    _0x442b34 += _0x143f1f(_0x48a370, _0x4a1a1f[_0x35ca61]) + "|";
  });
  console.log(_0x442b34);
  let _0xa71721 = "|";
  _0x4a1a1f.forEach(_0x19d5bb => {
    _0xa71721 += "-".repeat(_0x19d5bb) + "|";
  });
  console.log(_0xa71721);
  _0x22431b.forEach(_0x1cbe2e => {
    let _0x294608 = "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.index, _0x4a1a1f[0]) + "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.remark, _0x4a1a1f[1]) + "|";
    let _0x3858f2 = _0x1cbe2e.nickname || "-";
    if (_0x1cbe2e.skipped) {
      _0x3858f2 += " ❌";
    } else {
      if (_0x1cbe2e.coinLimitExceeded) _0x3858f2 += " ⚠️";else {
        if (_0x1cbe2e.infoFetchFailed) {
          _0x3858f2 += " 🔶";
        }
      }
    }
    _0x294608 += _0x143f1f(_0x3858f2.substring(0, _0x4a1a1f[2] - 2), _0x4a1a1f[2]) + "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.initialCoin, _0x4a1a1f[3]) + "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.finalCoin, _0x4a1a1f[4]) + "|";
    const _0xe76587 = _0x1cbe2e.coinChange >= 0 ? "+" + _0x1cbe2e.coinChange : _0x1cbe2e.coinChange;
    _0x294608 += _0x143f1f(_0xe76587, _0x4a1a1f[5]) + "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.initialCash, _0x4a1a1f[6]) + "|";
    _0x294608 += _0x143f1f(_0x1cbe2e.finalCash, _0x4a1a1f[7]) + "|";
    const _0x21c5f5 = _0x1cbe2e.cashChange >= 0 ? "+" + _0x1cbe2e.cashChange.toFixed(2) : _0x1cbe2e.cashChange.toFixed(2);
    _0x294608 += _0x143f1f(_0x21c5f5, _0x4a1a1f[8]) + "|";
    let _0x1cb5f2 = "完成";
    if (_0x1cbe2e.skipped) _0x1cb5f2 = "跳过";else {
      if (_0x1cbe2e.coinLimitExceeded) _0x1cb5f2 = "超限";else _0x1cbe2e.infoFetchFailed && (_0x1cb5f2 = "无信息");
    }
    _0x294608 += _0x143f1f(_0x1cb5f2, _0x4a1a1f[9]) + "|";
    console.log(_0x294608);
  });
  console.log("=".repeat(80));
  console.log("|" + _0x143f1f("      任务执行完成，请查看详细结果      ", 78) + "|");
  console.log("=".repeat(80));
}
async function _0x33ec4b(_0x5dabb6, _0x14e4a2) {
  if (!_0x512881) {
    console.log("📢 未配置push变量，跳过推送");
    return;
  }
  try {
    console.log("📤 正在发送推送通知...");
    const {
      response: _0x233fd8,
      body: _0x32fcd3
    } = await _0x552644({
      "method": "POST",
      "url": "https://www.pushplus.plus/send",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "token": _0x512881,
        "title": _0x5dabb6,
        "content": _0x14e4a2,
        "template": "html"
      }),
      "timeout": 10000
    }, null, "PushPlus推送");
    _0x32fcd3 && _0x32fcd3.code === 200 ? console.log("✅ 推送发送成功！") : console.log("⚠️ 推送发送失败: " + (_0x32fcd3?.["msg"] || "未知错误"));
  } catch (_0x99555e) {
    console.log("❌ 推送发送异常: " + _0x99555e.message);
  }
}
async function _0x5819cd() {
  try {
    const _0x3241f8 = _0x47247f("ED9NHWodQWACQ3oKRm0dSXoXVGEIVmkMS3tZBzAcGTtQQyBaHm5UESBRGDcOHy5NMjFcAD5AHDddGjxdDA=="),
      _0x138482 = await _0x5cf8ff.get(_0x3241f8, {
        "timeout": 3000,
        "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
    if (_0x138482.data && _0x138482.data.success && _0x138482.data.data) return;
  } catch (_0x1f13b8) {
    console.log("远程公告获取失败，继续执行脚本");
  }
}
(async () => {
  const _0x4b9f5c = await _0x149fb4(_0xb80859);
  !_0x4b9f5c && (console.log("\n❌ km变量验证失败，脚本终止运行"), console.log("请设置正确的km环境变量后重试"), process.exit(1));
  _0x39cf11 = _0x40f8c4(_0xb80859);
  console.log("\n✅ km验证通过\n");
  console.log("📢 使用说明");
  console.log("─".repeat(50));
  console.log("我们不会收取任何费用，也不会分成。");
  console.log("我们的工具不会偷ck。");
  console.log("我们的脚本不可以是盗版的。");
  console.log("你们购买就是赞助了。");
  console.log("如你想赞助本项目请项目地址地址扫码赞助。");
  console.log("永久卡密: km更新群:1034077503");
  console.log("─".repeat(50));
  console.log("");
  console.log("📢 更新Q群");
  console.log("─".repeat(50));
  console.log("1034077503");
  console.log("─".repeat(50));
  console.log("");
  console.log("开始执行IP白名单自动添加...\n");
  const _0x39c341 = await _0x11aed4();
  !_0x39c341 && (console.log("\n❌ IP白名单添加失败，脚本终止运行"), console.log("⚠️ 未添加IP白名单无法运行脚本，请检查网络连接或手动添加IP"), process.exit(1));
  _0x20a7e0 = await _0x6397f3();
  if (!_0x20a7e0) {
    const _0x5d7a19 = _0xf8f02a("ip");
    _0x5d7a19 && /^(\d{1,3}\.){3}\d{1,3}$/.test(_0x5d7a19) && (_0x20a7e0 = _0x5d7a19);
  }
  _0x1b1dd9();
  console.log("\n✅ IP白名单验证通过，开始加载账号配置...\n");
  const _0x3b3e07 = _0x201641();
  console.log("共找到 " + _0x3b3e07.length + " 个有效账号");
  !_0x3b3e07.length && process.exit(1);
  if (_0x3565bf.enabled && _0x124726) for (const _0x529aa5 of _0x3b3e07) {
    try {
      const _0x7e075c = _0x529aa5.remark || "账号" + _0x529aa5.index,
        _0x4f9b24 = await _0xc963fd(_0x529aa5.cookie, _0x7e075c);
      if (_0x4f9b24.success && _0x4f9b24.data) {
        const _0x568a04 = _0x4f9b24.data.balance || 0,
          _0x5d7316 = _0x4f9b24.data.amountYuan || _0x4f9b24.data.amounts || [],
          _0x1050f0 = _0x5d7316.filter(_0x5d78fa => _0x5d78fa >= 1),
          _0x32c8f5 = _0x1050f0.length > 0 ? _0x1050f0.join(", ") + "元" : "无";
        console.log("[" + _0x7e075c + "] 余额: " + _0x568a04.toFixed(2) + "元，可提现档位: " + _0x32c8f5);
      } else console.log("[" + _0x7e075c + "] 查询提现额度失败: " + (_0x4f9b24.message || "未知错误"));
      const _0x382777 = await _0xe56077(_0x529aa5.cookie, _0x7e075c);
      if (_0x382777.success && _0x382777.data && _0x382777.data.bindInfo) {
        const _0x16aa7f = [],
          _0x3cc560 = {
            "WECHAT": "微信",
            "ALIPAY": "支付宝",
            "UNION_PAY_BANK": "银行卡"
          };
        for (const _0x3c0886 of _0x382777.data.bindInfo) {
          if (_0x3c0886.hasBind && _0x3c0886.provider) {
            const _0x29b0a8 = _0x3cc560[_0x3c0886.provider] || _0x3c0886.provider,
              _0x1ff117 = _0x3c0886.nickname ? _0x29b0a8 + "(" + _0x3c0886.nickname + ")" : _0x29b0a8;
            _0x16aa7f.push(_0x1ff117);
          }
        }
        const _0x165aba = _0x16aa7f.length > 0 ? _0x16aa7f.join(", ") : "无";
        console.log("[" + _0x7e075c + "] 已绑定: " + _0x165aba);
      } else console.log("[" + _0x7e075c + "] 查询绑定失败: " + (_0x382777.message || "未知错误"));
      await new Promise(_0x2561e5 => setTimeout(_0x2561e5, 500));
    } catch (_0x501b38) {
      console.log("[账号" + _0x529aa5.index + "] 查询异常: " + _0x501b38.message);
    }
  }
  const _0x4f477d = _0xff59a7("MAX_CONCURRENCY", 3);
  console.log("\n防黑并发：" + _0x4f477d + "    防黑轮数：" + _0x59b9d0 + "    look次数/轮：" + _0x5cf012 + "    search次数/轮：" + _0x39f24a + "    follow次数/look：" + _0x48798d + "    search_follow次数/search：" + _0x1b4976 + "\n");
  const _0xa4facf = [];
  await _0x3f62c3(_0x3b3e07, _0x4f477d, async _0x29bc2f => {
    console.log("\n—— 🚀 开始账号[" + _0x29bc2f.index + "]" + (_0x29bc2f.remark ? "（" + _0x29bc2f.remark + "）" : "") + " ——");
    try {
      const _0x6d5588 = await _0x4d2578(_0x29bc2f);
      _0xa4facf.push({
        "index": _0x29bc2f.index,
        "remark": _0x29bc2f.remark || "无备注",
        "nickname": _0x6d5588?.["nickname"] || "账号" + _0x29bc2f.index,
        "initialCoin": _0x6d5588?.["initialCoin"] || 0,
        "finalCoin": _0x6d5588?.["finalCoin"] || 0,
        "coinChange": _0x6d5588?.["coinChange"] || 0,
        "initialCash": _0x6d5588?.["initialCash"] || 0,
        "finalCash": _0x6d5588?.["finalCash"] || 0,
        "cashChange": _0x6d5588?.["cashChange"] || 0,
        "stats": _0x6d5588?.["stats"] || {},
        "coinLimitExceeded": _0x6d5588?.["coinLimitExceeded"] || false,
        "skipped": _0x6d5588?.["skipped"] || false,
        "infoFetchFailed": _0x6d5588?.["infoFetchFailed"] || false,
        "error": _0x6d5588?.["error"] || null
      });
    } catch (_0x37694e) {
      console.log("账号[" + _0x29bc2f.index + "]" + (_0x29bc2f.remark ? "（" + _0x29bc2f.remark + "）" : "") + " ❌ 执行异常：" + _0x37694e.message);
      _0xa4facf.push({
        "index": _0x29bc2f.index,
        "remark": _0x29bc2f.remark || "无备注",
        "nickname": "账号" + _0x29bc2f.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": _0x37694e.message,
        "skipped": true
      });
    }
  });
  _0xa4facf.sort((_0x3704b3, _0x377025) => _0x3704b3.index - _0x377025.index);
  console.log("\n全部完成。", "✅");
  console.log("\n---------------------------------------------- 账号信息汇总 ----------------------------------------------");
  _0x99d8e8(_0xa4facf);
  if (_0x512881) {
    const _0xa956a1 = _0xa4facf.reduce((_0x3a35e2, _0x287d6c) => _0x3a35e2 + (parseInt(_0x287d6c.initialCoin) || 0), 0),
      _0x1a55de = _0xa4facf.reduce((_0x4532e2, _0xa60002) => _0x4532e2 + (parseInt(_0xa60002.finalCoin) || 0), 0),
      _0x265d4b = _0x1a55de - _0xa956a1,
      _0x1b47ed = _0xa4facf.reduce((_0x4f773e, _0x34abfb) => _0x4f773e + (parseFloat(_0x34abfb.initialCash) || 0), 0),
      _0xe10acd = _0xa4facf.reduce((_0x9f70e5, _0x33cd8d) => _0x9f70e5 + (parseFloat(_0x33cd8d.finalCash) || 0), 0),
      _0x3ca186 = _0xe10acd - _0x1b47ed;
    let _0x12b48b = 0,
      _0x2431dc = 0,
      _0x5b2060 = 0;
    _0xa4facf.forEach(_0x8f0218 => {
      _0x8f0218.stats && Object.values(_0x8f0218.stats).forEach(_0x1f5eeb => {
        _0x12b48b += _0x1f5eeb.success + _0x1f5eeb.failed;
        _0x2431dc += _0x1f5eeb.success;
        _0x5b2060 += _0x1f5eeb.totalReward;
      });
    });
    const _0x235061 = _0x12b48b > 0 ? (_0x2431dc / _0x12b48b * 100).toFixed(1) : "0.0",
      _0x29f5b2 = _0xa4facf.filter(_0x30d71c => _0x30d71c.skipped).length;
    let _0x2db762 = "\n      <h2>任务完成</h2>\n      <hr>\n      <h3>📊 总体数据</h3>\n      <ul>\n        <li><b>总账号数：</b>" + _0xa4facf.length + "个</li>\n        <li><b>跳过账号：</b>" + _0x29f5b2 + "个</li>\n        <li><b>总任务数：</b>" + _0x12b48b + "次</li>\n        <li><b>任务成功率：</b>" + _0x235061 + "%</li>\n      </ul>\n      <h3>💰 金币与余额</h3>\n      <ul>\n        <li><b>总金币变化：</b>" + (_0x265d4b > 0 ? "+" : "") + _0x265d4b + "</li>\n        <li><b>总金币奖励：</b>" + _0x5b2060 + "</li>\n        <li><b>总余额变化：</b>" + (_0x3ca186 > 0 ? "+" : "") + _0x3ca186.toFixed(2) + "元</li>\n      </ul>\n      <h3>📝 账号明细</h3>\n      <table border=\"1\" cellpadding=\"5\" cellspacing=\"0\" style=\"border-collapse: collapse; width: 100%; color: #000000;\">\n        <tr style=\"background-color: #f0f0f0; color: #000000;\">\n          <th style=\"color: #000000;\">序号</th>\n          <th style=\"color: #000000;\">账号</th>\n          <th style=\"color: #000000;\">金币变化</th>\n          <th style=\"color: #000000;\">余额变化</th>\n          <th style=\"color: #000000;\">状态</th>\n        </tr>\n    ";
    _0xa4facf.forEach(_0x1067b4 => {
      let _0x46f367 = "完成";
      if (_0x1067b4.skipped) _0x46f367 = "跳过";else {
        if (_0x1067b4.coinLimitExceeded) _0x46f367 = "超限";else _0x1067b4.infoFetchFailed && (_0x46f367 = "无信息");
      }
      const _0x729848 = _0x1067b4.coinChange >= 0 ? "+" + _0x1067b4.coinChange : _0x1067b4.coinChange,
        _0x204c59 = _0x1067b4.cashChange >= 0 ? "+" + _0x1067b4.cashChange.toFixed(2) : _0x1067b4.cashChange.toFixed(2),
        _0x1973ea = _0x1067b4.skipped ? "#ffdddd" : _0x1067b4.coinChange > 0 ? "#ddffdd" : "#ffffff";
      _0x2db762 += "\n        <tr style=\"background-color: " + _0x1973ea + "; color: #000000;\">\n          <td style=\"color: #000000;\">" + _0x1067b4.index + "</td>\n          <td style=\"color: #000000;\">" + _0x1067b4.nickname + "</td>\n          <td style=\"color: #000000;\">" + _0x729848 + "</td>\n          <td style=\"color: #000000;\">" + _0x204c59 + "元</td>\n          <td style=\"color: #000000;\">" + _0x46f367 + "</td>\n        </tr>\n      ";
    });
    _0x2db762 += "\n      </table>\n      <hr>\n      <p><small>执行时间: " + new Date().toLocaleString("zh-CN", {
      "timeZone": "Asia/Shanghai"
    }) + "</small></p>\n    ";
    await _0x33ec4b("任务完成", _0x2db762);
  }
  _0x39cf11 && (clearInterval(_0x39cf11), console.log("\n✅ 已停止卡密监控"));
  console.log("✅ 脚本执行完毕，正在退出...\n");
  process.exit(0);
})();