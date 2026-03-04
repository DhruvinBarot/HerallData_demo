# Harell Data — GPU Compute Dashboard

> A working prototype of the Harell Data compute platform UI, built as part of my application for the Founding Fullstack Engineer role.

![Stack](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Stack](https://img.shields.io/badge/Chart.js-4.4-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Stack](https://img.shields.io/badge/CSS-Animations-7c6dfa?style=flat-square&logo=css3&logoColor=white)
![Stack](https://img.shields.io/badge/Deployed-GitHub_Pages-222?style=flat-square&logo=github)

---

## Why I Built This

When I came across Harell Data, I didn't just see a job description — I saw one of the most compelling infrastructure problems in modern AI. The physical sciences are bottlenecked not by lack of compute, but by fragmented, inaccessible proprietary data. Harell's approach of bringing compute *to* the data, rather than the other way around, is exactly the kind of 0-to-1 thinking that defines a category-defining company.

I wanted to show — not just tell — how I'd approach building the platform from the ground up. So I spent time designing and building what the core GPU compute dashboard could look like: the interface that researchers and operators would rely on every day to manage training runs, monitor node health, and understand their infrastructure costs.

This is how I think about product ownership. You'll see it in every component.

---

## What's Inside

### ⚡ Live GPU Node Grid
Eight H100 nodes rendered in real time, each showing:
- GPU utilization % with color-coded health (green → yellow → red)
- VRAM consumption with animated shimmer bars
- Core temperature with live threshold alerts
- Active job assignment per node

All metrics update every 1.2 seconds via a live simulation loop — designed to show how I'd handle real-time data visualization at scale.

### 🧪 Training Job Queue
A live job pipeline showing the full lifecycle of a training run:
- **Running** jobs with animated pulsing indicators and gradient progress bars
- **Queued** jobs with estimated start times
- **Completed** jobs with runtime summaries
- GPU allocation per job (e.g. 8× H100, 16× H100)

Jobs reference real scientific domains — drug discovery, materials science, climate modeling, genomics — because domain context matters in a product like this.

### 💳 Compute Cost Estimator
Itemized cost breakdown across H100 compute hours, storage, data egress, and orchestration — with a live estimated total. The kind of transparency that makes researchers and finance teams both happy.

### 📊 24h GPU Throughput Chart
A dual-line Chart.js visualization tracking TFLOPS and memory bandwidth over the last 24 hours. Designed to give operators an at-a-glance view of cluster performance trends without drilling into raw logs.

### 🧠 VRAM Allocation by Job
Horizontal allocation bars showing exactly which training job is consuming what share of cluster memory — critical for operators managing multi-tenant workloads.

### 📋 Live Event Log
A streaming terminal-style log that surfaces real cluster events in real time:
- Checkpoint saves and epoch completions
- Temperature spikes and VRAM pressure warnings
- Node provisioning and dataset fetches
- Learning rate schedule updates and gradient syncs

New events surface every 2.2 seconds, giving the dashboard a living, breathing quality that static mockups never have.

### 🕐 Real-Time Topbar
Live clock, burn rate ($/hr), active job count, and uptime — all updating continuously. The kind of detail that tells operators the system is alive without them having to refresh.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JS, HTML5, CSS3 |
| Charts | Chart.js 4.4 |
| Animations | CSS keyframes + JS-driven live updates |
| Deploy | GitHub Pages |

No frameworks, no build step, no dependencies beyond Chart.js. Intentionally lean — a founding engineer should be able to ship fast and clean without scaffolding overhead.

---

## Project Structure

```
harell-dashboard/
├── index.html    # Markup, layout, and all component structure
├── style.css     # Design system, CSS variables, animations
├── app.js        # GPU grid, chart init, clock, live update loops, event log
└── README.md
```

---

## Running Locally

```bash
git clone https://github.com/dhruvinbarot/HerallData_demo
cd harell-dashboard
open index.html
```

**Live demo →** [dhruvinbarot.github.io/HarellData_demo](#)

---

## About Me

**Dhruvin Barot** — Fullstack Engineer  
Certified in AWS Solutions Architect & Google Cloud Platform  
React · Next.js · TypeScript · Node.js · PostgreSQL · Supabase

[Portfolio](#) · [LinkedIn](#) · [GitHub](#)

---

*Built for Harell Data. Ready to own the 0-to-1.*
