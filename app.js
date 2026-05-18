// ============================================================
// レンダリングロジック（通常は触らない）
// 企業や日程を追加・変更したい場合は data.js を編集してください
// ============================================================

const KIND_LABEL = { deadline: '締切', selection: '選考結果', internship: '開催' };
const KIND_CLASS = { deadline: 'badge-dl', selection: 'badge-sel', internship: 'badge-ip' };
const MONTH_NAMES = ['', '1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const MONTH_HINT = {
  5: 'エントリー受付ピーク',
  6: 'ES締切が集中',
  7: '選考・面接',
  8: 'インターン本番①',
  9: 'インターン本番②',
};

let active = new Set(Object.keys(INDUSTRIES));
let currentTab = 'cal';

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============================================================
// Googleカレンダー連携 — イベントの date 文字列をパースして
// Googleカレンダーの "予定を作成" URL を生成する
// ============================================================

const CAL_YEAR = 2026; // データの基準年

// 「6月23日」「6月中旬」「8月17日〜9月10日」等を解析して
// { start: Date, end: Date, allDay: bool } を返す。解析不能なら null。
function parseEventDate(dateStr, month) {
  if (!dateStr) return null;
  // 通年・未定など特殊表記はスキップ
  if (/通年|未定|応相談|終了済|TBD|TBA/.test(dateStr)) return null;

  // "6月23日" 形式（具体的な日付）— 範囲の最初の日付を拾う
  const specificDay = dateStr.match(/(\d{1,2})月\s*(\d{1,2})日/);
  if (specificDay) {
    const m = parseInt(specificDay[1]);
    const d = parseInt(specificDay[2]);
    // 時刻表記も拾う ("15:00" 等)
    const timeMatch = dateStr.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hh = parseInt(timeMatch[1]);
      const mm = parseInt(timeMatch[2]);
      const start = new Date(CAL_YEAR, m - 1, d, hh, mm);
      const end = new Date(CAL_YEAR, m - 1, d, hh + 1, mm);
      return { start, end, allDay: false };
    }
    return { start: new Date(CAL_YEAR, m - 1, d), end: new Date(CAL_YEAR, m - 1, d), allDay: true };
  }

  // "X月上旬/中旬/下旬" — それぞれ5日/15日/25日として扱う
  const periodMap = { '上旬': 5, '中旬': 15, '下旬': 25 };
  const period = dateStr.match(/(\d{1,2})月\s*(上旬|中旬|下旬)/);
  if (period) {
    const m = parseInt(period[1]);
    const d = periodMap[period[2]];
    return { start: new Date(CAL_YEAR, m - 1, d), end: new Date(CAL_YEAR, m - 1, d), allDay: true };
  }

  // "X月〜Y月" や "X月" だけ — eventのmonthを優先して中旬扱い
  if (month) {
    return { start: new Date(CAL_YEAR, month - 1, 15), end: new Date(CAL_YEAR, month - 1, 15), allDay: true };
  }
  return null;
}

// Date を Googleカレンダー URL 用の文字列に変換
function fmtGoogleDate(d, allDay) {
  const pad = n => String(n).padStart(2, '0');
  if (allDay) {
    // 終日: YYYYMMDD 形式、endは翌日が必要
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  }
  // 時刻付き: YYYYMMDDTHHmmss
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

// Google カレンダー追加用URLを生成
function buildGoogleCalendarUrl(ev) {
  const parsed = parseEventDate(ev.date, ev.month);
  if (!parsed) return null;

  const co = COMPANIES[ev.co];
  const url = co ? (co.mypage || co.recruit) : '';

  // タイトル: 【締切】三井不動産 Summer College
  const kindLabel = KIND_LABEL[ev.kind] || '';
  const title = `【${kindLabel}】${ev.co} ${ev.label}`;

  // 詳細: 元の日付表記＋公式URL
  const details = `元の日程表記: ${ev.date}\n\n公式ページ: ${url}\n\n※このイベントは28卒サマーインターン カレンダーから追加されました`;

  let dates;
  if (parsed.allDay) {
    // 終日イベントは endが翌日でないとGoogle側で当日扱いされない
    const endDate = new Date(parsed.end);
    endDate.setDate(endDate.getDate() + 1);
    dates = `${fmtGoogleDate(parsed.start, true)}/${fmtGoogleDate(endDate, true)}`;
  } else {
    dates = `${fmtGoogleDate(parsed.start, false)}/${fmtGoogleDate(parsed.end, false)}`;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dates,
    details: details,
  });
  if (url) params.set('location', url);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function switchTab(t) {
  currentTab = t;
  ['cal','flow','src'].forEach(k => {
    document.getElementById('tab-'+k).classList.toggle('active', t === k);
    document.getElementById(k+'-view').style.display = t === k ? '' : 'none';
  });
  document.getElementById('filters').style.display = t === 'src' ? 'none' : '';
  render();
}

function toggleFilter(key) {
  if (active.has(key)) {
    if (active.size > 1) active.delete(key);
  } else {
    active.add(key);
  }
  render();
}

function renderFilters() {
  const el = document.getElementById('filters');
  el.innerHTML = '';
  Object.entries(INDUSTRIES).forEach(([k, v]) => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (active.has(k) ? ' active' : '');
    btn.innerHTML = `<span class="dot" style="background:${v.color}"></span>${v.label}`;
    btn.onclick = () => toggleFilter(k);
    el.appendChild(btn);
  });
}

function renderCalendar() {
  const el = document.getElementById('cal-view');
  // 動的に出現する月を取得（5月〜9月固定でなく、データに応じて自動）
  const monthsInData = [...new Set(EVENTS.map(e => e.month))].sort((a,b) => a-b);
  let html = '';
  for (const m of monthsInData) {
    const evs = EVENTS.filter(e => e.month === m && active.has(COMPANIES[e.co].ind));
    html += `<div class="month"><div class="month-h"><span>${MONTH_NAMES[m]}</span><span class="sub">${MONTH_HINT[m] || ''}</span></div><div class="events">`;
    if (evs.length === 0) {
      html += `<div class="empty">該当する予定はありません</div>`;
    } else {
      evs.sort((a, b) => {
        const order = { deadline: 0, selection: 1, internship: 2 };
        return order[a.kind] - order[b.kind];
      });
      for (const e of evs) {
        const co = COMPANIES[e.co];
        if (!co) { console.warn('Unknown company:', e.co); continue; }
        const c = INDUSTRIES[co.ind];
        const url = co.mypage || co.recruit;
        const gcalUrl = buildGoogleCalendarUrl(e);
        const gcalBtn = gcalUrl
          ? `<a class="link-btn link-btn-cal" href="${esc(gcalUrl)}" target="_blank" rel="noopener" title="Googleカレンダーに追加">📅 追加</a>`
          : `<span class="link-btn link-btn-disabled" title="日付が確定していないイベントは追加できません">📅 —</span>`;
        html += `<div class="ev">
          <span class="date">${esc(e.date)}</span>
          <span class="bar" style="background:${c.color}"></span>
          <span class="body">
            <span class="name">${esc(e.co)}</span>
            <span class="type">${esc(e.label)}</span>
          </span>
          <span class="badge ${KIND_CLASS[e.kind]}">${KIND_LABEL[e.kind]}</span>
          <a class="link-btn" href="${esc(url)}" target="_blank" rel="noopener">公式 ↗</a>
          ${gcalBtn}
        </div>`;
      }
    }
    html += `</div></div>`;
  }
  el.innerHTML = html;
}

function renderFlow() {
  const el = document.getElementById('flow-view');
  const groupOrder = Object.keys(INDUSTRIES);
  let html = '';
  for (const ind of groupOrder) {
    if (!active.has(ind)) continue;
    const flows = FLOWS.filter(f => COMPANIES[f.co] && COMPANIES[f.co].ind === ind);
    if (flows.length === 0) continue;
    const c = INDUSTRIES[ind];
    html += `<div style="font-size:13px;color:var(--text-secondary);margin:1rem 0 8px;display:flex;align-items:center;gap:8px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c.color};"></span>${c.label}</div>`;
    for (const f of flows) {
      const co = COMPANIES[f.co];
      html += `<div class="flow-card">
        <div class="flow-head">
          <span class="flow-name"><span class="ind-dot" style="background:${c.color}"></span>${esc(f.co)}</span>
          <span class="flow-tag">${esc(f.tag)}</span>
        </div>
        <div class="flow-steps">`;
      for (const s of f.steps) {
        html += `<div class="step">
          <div class="step-label">${esc(s.l)}</div>
          <div class="step-when">${esc(s.w)}</div>
          <div class="step-detail">${esc(s.d)}</div>
        </div>`;
      }
      html += `</div><div class="flow-links">
        <a class="link-btn" href="${esc(co.mypage)}" target="_blank" rel="noopener">マイページ/エントリー ↗</a>
        <a class="link-btn" href="${esc(co.recruit)}" target="_blank" rel="noopener">採用ページ ↗</a>
      </div></div>`;
    }
  }
  el.innerHTML = html || '<div class="empty">業界を選択してください</div>';
}

function renderSources() {
  const el = document.getElementById('src-view');
  let html = '';

  const groupOrder = Object.keys(INDUSTRIES);
  for (const ind of groupOrder) {
    const c = INDUSTRIES[ind];
    const companiesInInd = Object.entries(COMPANIES).filter(([_, v]) => v.ind === ind);
    if (companiesInInd.length === 0) continue;
    html += `<div class="src-section"><h3><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c.color};margin-right:8px;vertical-align:1px;"></span>${c.label} — 公式マイページ・採用ページ</h3><div class="src-list">`;
    companiesInInd.forEach(([name, info]) => {
      html += `<div class="src-item">
        <div class="src-body">
          <div class="src-label">${esc(name)}</div>
          <div class="src-note">28卒マイページ / 新卒採用ページ</div>
        </div>
        <div style="display:flex;gap:4px;flex-shrink:0;">
          <a class="link-btn" href="${esc(info.mypage)}" target="_blank" rel="noopener">マイページ ↗</a>
          <a class="link-btn" href="${esc(info.recruit)}" target="_blank" rel="noopener">採用 ↗</a>
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  html += `<div class="src-section"><h3>横断情報源 (締切カレンダー・選考体験記)</h3><div class="src-list">`;
  for (const item of SOURCES) {
    html += `<div class="src-item">
      <div class="src-body">
        <div class="src-label">${esc(item.label)}</div>
        <div class="src-note">${esc(item.note)}</div>
      </div>
      <a class="link-btn" href="${esc(item.url)}" target="_blank" rel="noopener">開く ↗</a>
    </div>`;
  }
  html += `</div></div>`;

  el.innerHTML = html;
}

function render() {
  renderFilters();
  if (currentTab === 'cal') renderCalendar();
  else if (currentTab === 'flow') renderFlow();
  else renderSources();
}

render();
