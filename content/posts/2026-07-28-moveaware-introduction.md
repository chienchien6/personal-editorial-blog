---
title: "MoveAware 行得通：把無障礙路線資訊補上今天的現場狀態"
slug: "moveaware-introduction"
category: "作品介紹"
date: "2026-07-28"
readingTime: "7 分鐘"
description: "介紹 MoveAware 行得通，一個整合北北桃官方無障礙設施、每日施工資訊、accessibility.cloud 場所資料與社群回報的台灣無障礙通行輔助網站。"
projectUrl: "https://github.com/chienchien6/MoveAware"
siteUrl: "https://moveaware-tw.emil62y7.chatgpt.site"
tags:
  - 作品介紹
  - 無障礙
  - 地圖
  - Wheelmap
  - 台灣交通
---

# MoveAware 行得通：把無障礙路線資訊補上今天的現場狀態

`MoveAware｜行得通` 是我做的一個無障礙通行輔助網站。它不是要取代 Wheelmap，而是補上另一個很實際的問題：一條看起來可行的路線，今天真的走得通嗎？

網站連結：[https://moveaware-tw.emil62y7.chatgpt.site](https://moveaware-tw.emil62y7.chatgpt.site)

一般導航常常優先考慮距離和時間，但對輪椅使用者、推嬰兒車的人、帶大型行李的旅客、膝蓋受傷的人，或任何不方便使用階梯的人來說，真正的問題可能是電梯是否可用、坡道在哪裡、施工是否擋住通行、附近場所的無障礙資訊是否仍然有效。

MoveAware 的核心就是把這些資訊放在同一張地圖上，讓使用者可以在出門前多一層判斷。

## Wheelmap 是什麼

Wheelmap 是一個用來標記場所輪椅可及性的地圖服務。使用者可以查看餐廳、車站、商店、公共空間等地點是否適合輪椅進出，也可以透過社群補充資訊。

對輪椅使用者和不方便走樓梯的人來說，這類資料很重要，因為「目的地能不能進去」本身就是旅程是否成立的關鍵。

MoveAware 的定位不是重做 Wheelmap，而是做台灣情境下的補充。Wheelmap 和 accessibility.cloud 可以幫忙看場所本身的無障礙狀態；MoveAware 則把北北桃官方交通設施、臺北市每日施工資訊與社群即時回報放在一起，補上「今天路上能不能通」這一層。

## 我想解決的問題

無障礙資訊很容易過期。

一個出口平常有電梯，不代表今天沒有維修。一條平常好走的人行道，不代表今天沒有施工圍籬。地圖上標示為可進出的場所，也可能因為現場狀況改變而需要重新確認。

MoveAware 想做的不是給出絕對保證，而是提供更透明的判斷依據：

- 官方設施在哪裡
- 今日施工可能影響哪些地點
- 附近有哪些 Wheelmap 或 accessibility.cloud 的場所資料
- 社群最近有沒有回報現場狀況
- 回報是否被其他使用者確認、質疑或標記為已恢復

這些資訊合在一起，就能讓路線規劃不只看「怎麼走最快」，也能看「今天這樣走是否比較安心」。

## 目前的功能

MoveAware 目前的 MVP 涵蓋北北桃交通設施與全台灣場所資料：

- 臺北捷運官方電梯與坡道
- 桃園機捷官方電梯出入口
- 臺北市每日施工風險資訊
- Wheelmap 相容的 accessibility.cloud 場所資料
- 民眾現場回報
- 回報確認、質疑與恢復標記
- 點選目的地後連到 Google Maps 繼續完成路線規劃

網站用 MapLibre 呈現地圖，使用者可以搜尋站點、篩選電梯或坡道，也可以點選官方設施或任意地點提交限時現場回報。

## 為什麼要整合官方資料和社群回報

官方資料的優點是可信、結構穩定，適合當作地圖底層資料。像捷運電梯、坡道、機捷出入口，這些都應該盡量來自官方開放資料。

但官方資料不一定能即時反映現場狀態。施工、臨時封閉、電梯故障、人行道障礙，這些狀況更適合由現場使用者回報。

所以 MoveAware 採用一種混合方式：

- 官方資料提供基礎設施位置
- 每日施工資料提供風險提示
- 社群回報提供即時現場補充
- confirmation / dispute / recovered 機制讓資訊不會永遠停在單一回報

這樣做的重點是透明。使用者看到的不是一句「可通行」或「不可通行」，而是可以理解這個判斷背後有哪些資訊來源。

## AI 在這裡扮演什麼角色

MoveAware 有使用 OpenAI Responses API 和 Structured Outputs 來整理使用者回報。

使用者寫下的現場觀察可能很口語，例如「台北車站某個出口施工，輪椅可能要繞路」。模型會協助整理成較清楚的摘要、受影響族群與可能替代建議。

但路線判斷本身不交給 AI 任意決定。AI 的角色是結構化和解釋現場證據，應用程式規則才決定哪些資訊要顯示、如何標記風險。

如果沒有設定 API key，網站也會退回 deterministic parser，讓回報流程仍然可以使用。

## 技術筆記

這個網站使用的技術包括：

- Next.js 相容的 vinext application
- React 和 TypeScript
- Cloudflare D1
- Drizzle ORM
- MapLibre GL JS
- OpenFreeMap
- accessibility.cloud
- OpenAI Responses API
- Optional Cloudflare Turnstile
- PWA manifest

施工資料透過 GitHub Actions 每天同步，並用 `CONSTRUCTION_SYNC_SECRET` 保護同步入口。若來源下載、格式或座標驗證失敗，系統不會清空上一次成功資料，避免使用者看到空白或誤以為風險消失。

## 我喜歡這個作品的地方

MoveAware 對我來說不是一個單純的地圖練習，而是一次把「資料來源」、「使用者現場經驗」和「可解釋介面」放在一起的嘗試。

它提醒我，一個真正有用的工具不一定要宣稱自己可以完全解決問題。有時候更重要的是承認現實的不確定性，並把不確定性整理得比較容易判斷。

無障礙通行不是只有地圖上的點與線，而是每天都會變動的現場狀態。MoveAware 想做的，就是把這個「今天」補上去。
