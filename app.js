// ── GPU Node Data ──
const GPU_NODES = [
  { id: 'GPU-01', util: 92, mem: 74, temp: 81, job: 'DrugDiscovery-LLM-v3',     status: 'busy' },
  { id: 'GPU-02', util: 88, mem: 71, temp: 79, job: 'DrugDiscovery-LLM-v3',     status: 'busy' },
  { id: 'GPU-03', util: 95, mem: 78, temp: 84, job: 'DrugDiscovery-LLM-v3',     status: 'busy' },
  { id: 'GPU-04', util: 76, mem: 62, temp: 74, job: 'MaterialSci-Transformer',   status: 'busy' },
  { id: 'GPU-05', util: 83, mem: 68, temp: 77, job: 'MaterialSci-Transformer',   status: 'busy' },
  { id: 'GPU-06', util: 91, mem: 75, temp: 82, job: 'ClimateModel-BERT',         status: 'busy' },
  { id: 'GPU-07', util: 45, mem: 32, temp: 62, job: 'Idle',                      status: 'on'   },
  { id: 'GPU-08', util: 12, mem: 18, temp: 54, job: 'Idle',                      status: 'on'   },
];

// ── Event Log Messages ──
const LOG_EVENTS = [
  ['info', 'Checkpoint saved',   'DrugDiscovery-LLM-v3 · epoch 142/200'],
  ['ok',   'Job completed',      'ChemSynth-Encoder finished in 6h 14m'],
  ['info', 'Gradient sync',      'All 8 nodes synchronized · step 18,442'],
  ['warn', 'Temp spike',         'GPU-03 reached 84°C — throttling +2%'],
  ['info', 'Memory alloc',       '640GB reserved for DrugDiscovery-LLM-v3'],
  ['ok',   'Checkpoint',         'MaterialSci-Transformer · best val_loss: 0.0312'],
  ['info', 'Batch complete',     'ClimateModel-BERT · batch 4,210/4,600'],
  ['warn', 'Queue depth',        'GenomicsFoundation-v1 waiting — ETA 5h 12m'],
  ['ok',   'Node added',         'GPU-09 provisioned and joined us-east-1'],
  ['info', 'Dataset fetch',      'Pulling 48GB shard from secure vault · NOAA'],
  ['info', 'LR schedule',        'DrugDiscovery-LLM-v3 · lr decayed to 1.4e-5'],
  ['ok',   'Sync complete',      'eu-west-2 ↔ us-east-1 weight sync done'],
  ['warn', 'VRAM pressure',      'GPU-02 at 78% — consider sharding'],
  ['info', 'Metrics logged',     'TFLOPS: 742 · Mem BW: 458 GB/s'],
  ['ok',   'Job started',        'ClimateModel-BERT resumed from checkpoint'],
];

// ── Color Helpers ──
function utilColor(u) { return u > 85 ? '#f5c842' : u > 60 ? '#7c6dfa' : '#10e898'; }
function tempColor(t) { return t > 80 ? '#ff4d6a' : t > 70 ? '#f5c842' : '#10e898'; }

// ── Build GPU Grid ──
function buildGPUGrid() {
  const grid = document.getElementById('gpuGrid');

  GPU_NODES.forEach(g => {
    const uc = utilColor(g.util);
    const tc = tempColor(g.temp);
    const card = document.createElement('div');
    card.className = `gpu-card${g.status === 'busy' ? ' active' : ''}`;
    card.id = `gc-${g.id}`;
    card.innerHTML = `
      <div class="gc-header">
        <div class="gc-name">${g.id}</div>
        <div class="gc-status">
          <div class="gc-dot ${g.status === 'busy' ? 'busy' : 'on'}"></div>
          ${g.status === 'busy' ? 'Running' : 'Idle'}
        </div>
      </div>
      <div class="gc-metric">
        <div class="gc-metric-row">
          <span class="gc-metric-lbl">GPU Util</span>
          <span class="gc-metric-val" id="uv-${g.id}" style="color:${uc}">${g.util.toFixed(0)}%</span>
        </div>
        <div class="gc-bar"><div class="gc-fill" id="ub-${g.id}" style="width:${g.util}%;background:${uc}"></div></div>
      </div>
      <div class="gc-metric">
        <div class="gc-metric-row">
          <span class="gc-metric-lbl">VRAM</span>
          <span class="gc-metric-val" id="mv-${g.id}">${g.mem}%</span>
        </div>
        <div class="gc-bar"><div class="gc-fill" id="mb-${g.id}" style="width:${g.mem}%;background:#38b6ff"></div></div>
      </div>
      <div class="gc-metric">
        <div class="gc-metric-row">
          <span class="gc-metric-lbl">Temp</span>
          <span class="gc-metric-val" id="tv-${g.id}" style="color:${tc}">${g.temp.toFixed(0)}°C</span>
        </div>
        <div class="gc-bar"><div class="gc-fill" id="tb-${g.id}" style="width:${(g.temp / 1.1).toFixed(0)}%;background:${tc}"></div></div>
      </div>
      <div class="gc-job" title="${g.job}">${g.job}</div>`;
    grid.appendChild(card);
  });
}

// ── Throughput Chart ──
function initChart() {
  const ctx = document.getElementById('throughputChart').getContext('2d');
  const g1 = ctx.createLinearGradient(0, 0, 0, 90);
  g1.addColorStop(0, 'rgba(124,109,250,.22)'); g1.addColorStop(1, 'rgba(124,109,250,0)');
  const g2 = ctx.createLinearGradient(0, 0, 0, 90);
  g2.addColorStop(0, 'rgba(16,232,152,.14)');  g2.addColorStop(1, 'rgba(16,232,152,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
      datasets: [
        {
          label: 'TFLOPS',
          data: [280,310,295,340,380,420,395,450,480,510,490,540,560,520,580,610,590,640,620,680,710,690,730,750],
          borderColor: '#7c6dfa', borderWidth: 1.5,
          fill: true, backgroundColor: g1, tension: .4, pointRadius: 0,
        },
        {
          label: 'Mem BW (GB/s)',
          data: [180,200,190,220,240,260,250,280,300,320,310,340,350,330,360,380,370,400,390,420,440,430,450,460],
          borderColor: '#10e898', borderWidth: 1.5,
          fill: true, backgroundColor: g2, tension: .4, pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { boxWidth: 7, font: { size: 9 }, color: '#5c5c7a' } },
        tooltip: { backgroundColor: '#0c0c10', borderColor: '#1c1c26', borderWidth: 1, bodyColor: '#e2e4f0', titleColor: '#3d3d52' },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 8 }, color: '#2a2a38', maxTicksLimit: 8 } },
        y: { grid: { color: '#101015' }, ticks: { font: { size: 8 }, color: '#2a2a38' } },
      },
    },
  });
}

// ── Live Clock ──
function startClock() {
  const tick = () => {
    const n = new Date();
    document.getElementById('clock').textContent =
      [n.getHours(), n.getMinutes(), n.getSeconds()]
        .map(v => String(v).padStart(2, '0')).join(':');
  };
  tick();
  setInterval(tick, 1000);
}

// ── Live GPU Updates ──
function startLiveUpdates() {
  setInterval(() => {
    GPU_NODES.forEach(g => {
      if (g.status !== 'busy') return;
      g.util = Math.min(99, Math.max(50, g.util + (Math.random() * 6 - 3)));
      g.mem  = Math.min(95, Math.max(30, g.mem  + (Math.random() * 3 - 1.5)));
      g.temp = Math.min(90, Math.max(60, g.temp + (Math.random() * 2 - 1)));

      const uc = utilColor(g.util);
      const tc = tempColor(g.temp);

      const setEl = (id, style, text) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (style !== null) el.style.cssText = style;
        if (text  !== null) el.textContent = text;
      };

      setEl(`uv-${g.id}`, `color:${uc}`, g.util.toFixed(0) + '%');
      setEl(`ub-${g.id}`, `width:${g.util.toFixed(0)}%;background:${uc}`, null);
      setEl(`mv-${g.id}`, null, g.mem.toFixed(0) + '%');
      setEl(`mb-${g.id}`, `width:${g.mem.toFixed(0)}%;background:#38b6ff`, null);
      setEl(`tv-${g.id}`, `color:${tc}`, g.temp.toFixed(0) + '°C');
      setEl(`tb-${g.id}`, `width:${(g.temp / 1.1).toFixed(0)}%;background:${tc}`, null);
    });

    // Avg utilization
    const busy = GPU_NODES.filter(g => g.status === 'busy');
    const avg  = busy.reduce((s, g) => s + g.util, 0) / busy.length;
    document.getElementById('avg-util').textContent = avg.toFixed(0) + '%';

    // Status bar flicker
    document.getElementById('temp').textContent   = (70 + Math.random() * 6).toFixed(0) + '°C';
    document.getElementById('net').textContent    = (44 + Math.random() * 8).toFixed(1) + ' Gb/s';
    document.getElementById('tflops').textContent = (720 + Math.random() * 60).toFixed(0);
    document.getElementById('burn').textContent   = (0.80 + Math.random() * 0.08).toFixed(2);

    // Progress bars
    ['jp1', 'jp2', 'jp3'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const cur = parseFloat(el.style.width);
      if (cur < 99.5) el.style.width = Math.min(99.5, cur + Math.random() * 0.25).toFixed(2) + '%';
    });

  }, 1200);
}

// ── Event Log ──
let logIdx = 0;

function startEventLog() {
  const addLine = () => {
    const body = document.getElementById('logBody');
    const [lvl, title, detail] = LOG_EVENTS[logIdx % LOG_EVENTS.length];
    logIdx++;

    const now = new Date();
    const ts  = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(v => String(v).padStart(2, '0')).join(':');

    const lvlMap = { info: 'INFO', ok: 'OK', warn: 'WARN', err: 'ERR' };

    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-ts">${ts}</span>
      <span class="log-lvl ${lvl}">${lvlMap[lvl]}</span>
      <span class="log-msg"><span>${title}</span> · ${detail}</span>`;

    body.insertBefore(line, body.firstChild);
    while (body.children.length > 8) body.removeChild(body.lastChild);
  };

  addLine();
  setInterval(addLine, 2200);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  buildGPUGrid();
  initChart();
  startClock();
  startLiveUpdates();
  startEventLog();
});