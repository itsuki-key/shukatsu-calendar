// ============================================================
// 28卒サマーインターン データ
// 更新時はこのファイルだけを差し替えればOK
// 最終更新: 2026年5月 (確度フィールドを追加)
//
// 各イベントの confidence:
//   'confirmed': 28卒公式が確定発表している日付
//   'likely':    28卒公式情報は出ているが、日付幅が広い等
//   'estimated': 過去年度の傾向からの推測 (省略時のデフォルト)
// ============================================================

const INDUSTRIES = {
  shosha: { label: '商社', color: '#534AB7' },
  dev:    { label: 'デベロッパー', color: '#0F6E56' },
  cons:   { label: 'コンサル', color: '#D85A30' },
  fin:    { label: '金融', color: '#185FA5' },
  ad:     { label: '広告', color: '#D4537E' },
  vc:     { label: 'ベンチャー/IT', color: '#BA7517' },
};

const COMPANIES = {
  // 商社
  '三菱商事':        { ind: 'shosha', recruit: 'https://www.mitsubishicorp.com/jp/ja/careers/recruit/new/', mypage: 'https://www.mitsubishicorp.com/jp/ja/careers/recruit/new/' },
  '三井物産':        { ind: 'shosha', recruit: 'https://career.mitsui.com/recruit/recruit/', mypage: 'https://mitsui.i-web.jpn.com/2028/' },
  '伊藤忠商事':      { ind: 'shosha', recruit: 'https://www.itochu.co.jp/ja/careers/recruit/', mypage: 'https://www.itochu.co.jp/ja/careers/recruit/' },
  '住友商事':        { ind: 'shosha', recruit: 'https://sumitomocorp-recruiting.com/recruit/new-graduate/', mypage: 'https://sumitomocorp-recruiting.com/' },
  '丸紅':            { ind: 'shosha', recruit: 'https://www.marubeni.com/jp/recruit/new-graduate/', mypage: 'https://www.marubeni.com/jp/recruit/new-graduate/' },

  // デベロッパー
  '三井不動産':      { ind: 'dev', recruit: 'https://recruit.mitsuifudosan.co.jp/shinsotsu/', mypage: 'https://recruit.mitsuifudosan.co.jp/shinsotsu/eventandintern/summer/' },
  '三菱地所':        { ind: 'dev', recruit: 'https://www.mec.co.jp/saiyo/', mypage: 'https://www.mec.co.jp/saiyo/' },
  '住友不動産':      { ind: 'dev', recruit: 'https://www.sumitomo-rd.co.jp/recruit/', mypage: 'https://www.sumitomo-rd.co.jp/recruit/' },
  '東急不動産':      { ind: 'dev', recruit: 'https://www.tokyu-land.co.jp/recruit/', mypage: 'https://www.tokyu-land.co.jp/recruit/' },

  // コンサル
  'マッキンゼー':            { ind: 'cons', recruit: 'https://www.mckinsey.com/jp/careers/students', mypage: 'https://www.mckinsey.com/jp/careers/students' },
  'BCG':                    { ind: 'cons', recruit: 'https://careers.bcg.com/jp/ja/japan-newgrads', mypage: 'https://careers.bcg.com/jp/ja/japan-newgrads' },
  'ベイン':                 { ind: 'cons', recruit: 'https://www.bain.com/ja/careers/find-a-role/students/japan/', mypage: 'https://www.bain.com/ja/careers/find-a-role/students/japan/' },
  'アクセンチュア戦略':       { ind: 'cons', recruit: 'https://www.accenture.com/jp-ja/careers/life-at-accenture/internships-students', mypage: 'https://www.accenture.com/jp-ja/careers/life-at-accenture/internships-students' },

  // 金融
  '三菱UFJ銀行':            { ind: 'fin', recruit: 'https://www.bk.mufg.jp/saiyou/shinsotsu/', mypage: 'https://www.bk.mufg.jp/saiyou/shinsotsu/' },
  '三井住友銀行':            { ind: 'fin', recruit: 'https://www.smbc-freshers.com/', mypage: 'https://www.smbc-freshers.com/internship/' },
  '野村證券':               { ind: 'fin', recruit: 'https://www.nomura.co.jp/recruit/', mypage: 'https://www.nomura.co.jp/recruit/career/student/' },
  '大和証券':               { ind: 'fin', recruit: 'https://www.daiwa-grp.jp/recruit/', mypage: 'https://www.daiwa-grp.jp/recruit/' },
  'ゴールドマン・サックス':   { ind: 'fin', recruit: 'https://www.goldmansachs.com/careers/students/programs', mypage: 'https://www.goldmansachs.com/careers/students/programs' },

  // 広告
  '電通':                   { ind: 'ad', recruit: 'https://www.career.dentsu.jp/', mypage: 'https://www.career.dentsu.jp/recruit/2028/recruit/internship.html' },
  '博報堂':                 { ind: 'ad', recruit: 'https://hakusuku.jp/recruit/', mypage: 'https://hakusuku.jp/recruit/information/internship/' },

  // ベンチャー/IT
  'サイバーエージェント':    { ind: 'vc', recruit: 'https://www.cyberagent.co.jp/careers/students/', mypage: 'https://www.cyberagent.co.jp/careers/students/event/' },
  'DeNA':                  { ind: 'vc', recruit: 'https://student.dena.com/', mypage: 'https://student.dena.com/internship/' },
  'キャディ':                { ind: 'vc', recruit: 'https://newgrads.caddi.com/', mypage: 'https://newgrads.caddi.com/jobs' },
};

const EVENTS = [
  // ===== 商社 =====
  // 商社系は28卒の公式日程未発表。例年6月締切→9月インターンの傾向から推測。
  { co: '三菱商事', month: 5, date: '5月下旬〜6月', kind: 'deadline', confidence: 'estimated', label: 'エントリー受付 (MC Academia / Summer Workshop)' },
  { co: '三菱商事', month: 9, date: '9月予定', kind: 'internship', confidence: 'estimated', label: '2days Summer Workshop' },
  { co: '三井物産', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'likely', label: 'エントリー締切 (ES＋WEBテスト)' },
  { co: '三井物産', month: 8, date: '8月下旬〜9月上旬', kind: 'internship', confidence: 'likely', label: '1day Internship (5コース日程)' },
  { co: '伊藤忠商事', month: 6, date: '6月下旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (Summer ES)' },
  { co: '伊藤忠商事', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: '1day / 複数days Internship' },
  { co: '住友商事', month: 6, date: '6月上〜中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (本選考一部免除あり)' },
  { co: '住友商事', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },
  { co: '丸紅', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切' },
  { co: '丸紅', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },

  // ===== デベロッパー =====
  // 三井不動産Summer Collegeは28卒公式が確定発表
  { co: '三井不動産', month: 6, date: '6月23日(火)', kind: 'deadline', confidence: 'confirmed', label: 'Summer College エントリー締切 (ES/TG-WEB)' },
  { co: '三井不動産', month: 7, date: '7月下旬', kind: 'selection', confidence: 'likely', label: '二次選考結果通知・参加決定' },
  { co: '三井不動産', month: 8, date: '8月17日〜9月10日', kind: 'internship', confidence: 'confirmed', label: 'Summer College (2days × 6日程)' },
  { co: '三菱地所', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (ES/Webテ/録画面接)' },
  { co: '三菱地所', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },
  { co: '住友不動産', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (ES/Webテ→集団面接)' },
  { co: '住友不動産', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },
  { co: '東急不動産', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (ES/Webテ→面接)' },
  { co: '東急不動産', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },

  // ===== コンサル =====
  { co: 'マッキンゼー', month: 5, date: '5月中旬', kind: 'deadline', confidence: 'estimated', label: '夏選考 プレエントリー/本応募締切' },
  { co: 'マッキンゼー', month: 8, date: '8月予定', kind: 'internship', confidence: 'estimated', label: 'Summer Associate (約1週間)' },
  // BCGは28卒公式が確定発表 (時刻まで明記)
  { co: 'BCG', month: 6, date: '6月4日(木) 15:00', kind: 'deadline', confidence: 'confirmed', label: 'エントリー締切 (厳守)' },
  { co: 'BCG', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship (東京)' },
  { co: 'ベイン', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: '夏選考エントリー締切' },
  { co: 'ベイン', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship + ジョブ' },
  { co: 'アクセンチュア戦略', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (夏のみ募集)' },
  { co: 'アクセンチュア戦略', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'ジョブ型 Summer Internship' },

  // ===== 金融 =====
  { co: '三菱UFJ銀行', month: 6, date: '6月上旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (複数コース)' },
  { co: '三菱UFJ銀行', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer IS (法人/IT/データ等)' },
  { co: '三井住友銀行', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (28卒は夏のみ)' },
  { co: '三井住友銀行', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'SMBC Summer Internship' },
  { co: '野村證券', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (部門別コース)' },
  { co: '野村證券', month: 7, date: '7月下旬', kind: 'internship', confidence: 'estimated', label: '3days Workshop / 各部門IS' },
  { co: '大和証券', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (5days等のコース別)' },
  { co: '大和証券', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship (IB/MD/AM等)' },
  { co: 'ゴールドマン・サックス', month: 5, date: '5月下旬', kind: 'deadline', confidence: 'estimated', label: '各部門 Summer IS 締切' },
  { co: 'ゴールドマン・サックス', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship (各部門)' },

  // ===== 広告 =====
  // 電通は28卒マイページ公開済み、詳細日程は未公開
  { co: '電通', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'likely', label: 'エントリー締切 (採用選考直結型あり)' },
  { co: '電通', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship (複数コース)' },
  { co: '博報堂', month: 6, date: '6月中旬〜下旬', kind: 'deadline', confidence: 'estimated', label: 'エントリー締切 (倍率10〜20倍)' },
  { co: '博報堂', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship' },

  // ===== ベンチャー/IT =====
  // BREAKERSは28卒公式が確定発表 (ただし終了済み)
  { co: 'サイバーエージェント', month: 2, date: '2/27(金)・3/13(金) 12:00', kind: 'deadline', confidence: 'confirmed', label: 'BREAKERS選抜エントリー締切 (1次/2次・終了済み)' },
  { co: 'サイバーエージェント', month: 6, date: '6月〜随時', kind: 'deadline', confidence: 'estimated', label: 'ビジネス/エンジニア各コース 順次募集' },
  { co: 'サイバーエージェント', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: 'Summer Internship (3days等)' },
  { co: 'DeNA', month: 6, date: '6月中旬', kind: 'deadline', confidence: 'estimated', label: '一括エントリー締切 (短期/就業型/早期選考)' },
  { co: 'DeNA', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: '短期Summer / 就業型(3週間〜)' },
  // キャディは公式が「通年エントリー」を明示
  { co: 'キャディ', month: 6, date: '通年エントリー受付中', kind: 'deadline', confidence: 'confirmed', label: '28卒本選考エントリー (1day/Summerもあり)' },
  { co: 'キャディ', month: 8, date: '8月〜9月', kind: 'internship', confidence: 'estimated', label: '1day/Summer Internship (応相談)' },
];

// FLOWS の各 step にも confidence を追加
// (省略時はestimated扱い、'confirmed' を明記したものだけ確定情報)
const FLOWS = [
  // 商社
  { co: '三菱商事', tag: 'MC Academia / 優遇なし', steps: [
    { l: 'エントリー', w: '5月下旬〜6月', d: 'ES＋WEBテスト(GAB)', confidence: 'estimated' },
    { l: '選考', w: '6月〜7月', d: '書類選考のみ', confidence: 'estimated' },
    { l: 'インターン', w: '9月予定', d: '2days Workshop', confidence: 'estimated' },
    { l: '本選考優遇', w: 'なし', d: '本選考は通常ルート', confidence: 'confirmed' },
  ]},
  { co: '三井物産', tag: '面接/GD免除など優遇あり', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋WEBテスト', confidence: 'likely' },
    { l: '選考', w: '7月', d: '書類＋動画/面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月下旬〜9月上旬', d: '1day × 5日程', confidence: 'likely' },
    { l: '本選考優遇', w: '優秀者', d: '面接免除等', confidence: 'estimated' },
  ]},
  { co: '伊藤忠商事', tag: 'OB訪問優先/限定イベント', steps: [
    { l: 'エントリー', w: '6月下旬', d: 'ES＋テストセンター', confidence: 'estimated' },
    { l: '選考', w: '7月〜8月', d: 'AI面接含む多段階', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '1day/複数days', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: 'OB訪問優先案内', confidence: 'estimated' },
  ]},
  { co: '住友商事', tag: '本選考一部免除', steps: [
    { l: 'エントリー', w: '6月上〜中旬', d: 'ES＋WEBテスト', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '書類＋面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '複数daysワーク', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '一次面接免除等', confidence: 'estimated' },
  ]},
  { co: '丸紅', tag: 'リクルーター面談あり', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋WEBテスト', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '書類＋面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '複数days', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '早期選考案内', confidence: 'estimated' },
  ]},

  // デベロッパー
  { co: '三井不動産', tag: 'Summer College / 優遇あり', steps: [
    { l: 'エントリー', w: '〜6/23(火)', d: 'ES＋TG-WEB＋AI面接', confidence: 'confirmed' },
    { l: '選考', w: '7月', d: '一次→二次選考', confidence: 'likely' },
    { l: 'インターン', w: '8/17〜9/10', d: '2days × 6日程', confidence: 'confirmed' },
    { l: '本選考優遇', w: 'ほぼ全員', d: 'GD/面接免除等', confidence: 'estimated' },
  ]},
  { co: '三菱地所', tag: '優遇あり', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋Webテ＋録画面接', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '面接1回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '複数days', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期選考ルート', confidence: 'estimated' },
  ]},
  { co: '住友不動産', tag: '集団面接型', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '集団面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'Summer IS', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '個別案内', confidence: 'estimated' },
  ]},
  { co: '東急不動産', tag: '少人数選考', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '面接1回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'Summer IS', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期選考案内', confidence: 'estimated' },
  ]},

  // コンサル
  { co: 'マッキンゼー', tag: 'チャレンジ実質1回', steps: [
    { l: 'エントリー', w: '5月中旬', d: 'プレエントリー＋本応募', confidence: 'estimated' },
    { l: '選考', w: '6月〜7月', d: 'ケース面接複数回', confidence: 'estimated' },
    { l: 'インターン', w: '8月予定', d: 'Summer Associate', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '内定直結ルート', confidence: 'estimated' },
  ]},
  { co: 'BCG', tag: 'チャレンジ複数回可', steps: [
    { l: 'エントリー', w: '〜6/4(木)15:00', d: 'ES＋オンライン課題', confidence: 'confirmed' },
    { l: '選考', w: '6月〜7月', d: 'ケース面接2〜3回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'Summer Internship', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '内定直結', confidence: 'confirmed' },
  ]},
  { co: 'ベイン', tag: 'チャレンジ最大4回', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋玉手箱', confidence: 'estimated' },
    { l: '選考', w: '6月〜8月', d: 'ケース面接4回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'ジョブ', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '内定直結', confidence: 'estimated' },
  ]},
  { co: 'アクセンチュア戦略', tag: '夏のみ募集/1回限り', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋玉手箱(空欄推測)', confidence: 'estimated' },
    { l: '選考', w: '7月', d: 'GD＋面接1回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'ジョブ型', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '内定直結', confidence: 'estimated' },
  ]},

  // 金融
  { co: '三菱UFJ銀行', tag: '部門別 / 優遇あり', steps: [
    { l: 'エントリー', w: '6月上旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '6月〜7月', d: '面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '法人/IT/データ等', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期ルート', confidence: 'estimated' },
  ]},
  { co: '三井住友銀行', tag: '28卒は夏のみ開催', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'コース別', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期選考', confidence: 'estimated' },
  ]},
  { co: '野村證券', tag: '部門別コース多数', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋玉手箱', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '面接/GD', confidence: 'estimated' },
    { l: 'インターン', w: '7月下旬〜', d: '3days Workshop等', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期ルート', confidence: 'estimated' },
  ]},
  { co: '大和証券', tag: 'IB/MD/AM等のコース別', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '書類＋面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '5days等コース別IS', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期選考案内', confidence: 'estimated' },
  ]},
  { co: 'ゴールドマン・サックス', tag: 'IBD/MD/AM等部門別', steps: [
    { l: 'エントリー', w: '5月下旬', d: '部門別ES', confidence: 'estimated' },
    { l: '選考', w: '6月〜7月', d: '複数回面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'Summer Analyst', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '内定直結', confidence: 'estimated' },
  ]},

  // 広告
  { co: '電通', tag: '採用選考直結型あり', steps: [
    { l: 'エントリー', w: '6月中旬', d: 'ES＋テストセンター (SPI/玉手箱等)', confidence: 'likely' },
    { l: '選考', w: '6月〜7月', d: '書類＋面接', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '複数コース (デザイン/ワカモン等)', confidence: 'estimated' },
    { l: '本選考優遇', w: '直結型参加者', d: '夏参加→10月内定の早期ルート', confidence: 'confirmed' },
  ]},
  { co: '博報堂', tag: '倍率10〜20倍 / 優遇あり', steps: [
    { l: 'エントリー', w: '6月中旬〜下旬', d: 'ES＋Webテ', confidence: 'estimated' },
    { l: '選考', w: '7月', d: '一次通過率28%→最終60%', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: 'クリエイティブワーク中心', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '早期選考→3月内定ルート', confidence: 'estimated' },
  ]},

  // ベンチャー/IT
  { co: 'サイバーエージェント', tag: 'BREAKERS等の早期内定直結あり', steps: [
    { l: 'エントリー', w: '2月〜随時', d: 'BREAKERS(終了済)、ビジネス/エンジニアは6月〜', confidence: 'likely' },
    { l: '選考', w: '通年', d: 'ES＋面接複数回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '3daysビジネス/エンジニア等', confidence: 'estimated' },
    { l: '本選考優遇', w: '優秀者', d: '最速で内定直結', confidence: 'confirmed' },
  ]},
  { co: 'DeNA', tag: '短期/就業型/早期選考の3併願可', steps: [
    { l: 'エントリー', w: '6月中旬', d: '一括ES＋Webテ (希望コース選択)', confidence: 'estimated' },
    { l: '選考', w: '6月〜7月', d: '面接複数回', confidence: 'estimated' },
    { l: 'インターン', w: '8月〜9月', d: '短期4daysまたは就業型3〜4週間', confidence: 'estimated' },
    { l: '本選考優遇', w: '参加者', d: '本選考スキップ等', confidence: 'estimated' },
  ]},
  { co: 'キャディ', tag: '通年エントリー / 本選考と並行', steps: [
    { l: 'エントリー', w: '通年', d: '本選考フォームから (28卒対応)', confidence: 'confirmed' },
    { l: '選考', w: '随時', d: '初回面談→Manager→HR→役員', confidence: 'confirmed' },
    { l: 'インターン', w: '応相談', d: '1day/Summer IS、状況に応じ案内', confidence: 'likely' },
    { l: '本選考優遇', w: '本選考と一体', d: 'インターン自体が選考プロセス', confidence: 'confirmed' },
  ]},
];

const SOURCES = [
  { label: '外資就活ドットコム — 28卒コンサル/商社/金融/広告まとめ', note: '締切・選考フロー比較記事', url: 'https://gaishishukatsu.com/' },
  { label: 'ワンキャリア — 業界別インターン一覧', note: 'ES・体験記・選考対策', url: 'https://www.onecareer.jp/events/internship' },
  { label: 'type就活 — 28卒大手比較記事', note: '業界別5社比較', url: 'https://typeshukatsu.jp/' },
  { label: 'unistyle — 総合商社/広告/コンサル対策', note: 'ES例文・選考レポート', url: 'https://unistyleinc.com/' },
  { label: '就活の名人 — 締切カレンダー', note: '日付別の締切一覧', url: 'https://vinc.co.jp/mag/summerintern-shimekiri/' },
];
