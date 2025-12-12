// Configuration
const SR = ["44.1", "48", "88.2", "96"];

const METHODS = [
  { key: "original", label: "Original RNN<br>(trained at 44.1kHz)" },
  { key: "stn",      label: "STN" },
  { key: "lidl",     label: "LIDL" },
  { key: "apdl",     label: "APDL" },
  { key: "cidl",     label: "CIDL" }
];

const DELAY_METHODS = METHODS.slice(1);

const INPUT_ROOT = 'inputs'
const FULL_ROOT = 'outputs_without_cmfb'
const A7_ROOT = 'outputs_alpha0.7/with_cmfb'
const A5_ROOT = 'outputs_alpha0.5/with_cmfb'

const FULL_FILE = 'Example2_RNN.wav'
const RCST_FILE = 'Example2_RNN_Reconstructed.wav'

//////////// Helper functions ////////////
// Lazy-loading audio cell
function audioCell(path, unavailable = false) {
  return unavailable
    ? `<td class="dash">–</td>`
    : `
      <td>
        <audio controls preload="none" data-src="${path}"></audio>
      </td>`;
}

//////////// Tables ////////////////
// Table 1: Full band
const fullTable = document.getElementById("fullTable");

fullTable.insertAdjacentHTML("beforeend", `
<tr class="top-header">
  <th rowspan="2" class="group-header">Inference SR</th>
  <th class="group-header" rowspan="2">${METHODS[0].label}</th>
  <th class="group-header" colspan="${DELAY_METHODS.length}">Delay-based methods</th>
</tr>
<tr>${DELAY_METHODS.map(m => `<th class="subheader">${m.label}</th>`).join("")}</tr>
`);

{
  const frag = document.createDocumentFragment();

  SR.forEach(sr => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><b>${sr} kHz</b></td>`;

    METHODS.forEach((method, idx) => {
      const unavailable = sr === "44.1" && idx > 0;
      const path = `${FULL_ROOT}/${method.key}/sr${sr}/${FULL_FILE}`;
      tr.innerHTML += audioCell(path, unavailable);
    });

    frag.appendChild(tr);
  });

  fullTable.appendChild(frag);
}


// Table 2: Alpha 0.7 Reconstructed Audio File
const a7RcstTable = document.getElementById("a7RcstTable");

a7RcstTable.insertAdjacentHTML("beforeend", `
<tr class="top-header">
  <th rowspan="2" class="group-header">Inference SR</th>
  <th class="group-header" rowspan="2">${METHODS[0].label}</th>
  <th class="group-header" colspan="${DELAY_METHODS.length}">Delay-based methods</th>
</tr>
<tr>${DELAY_METHODS.map(m => `<th class="subheader">${m.label}</th>`).join("")}</tr>
`);

{
  const frag = document.createDocumentFragment();

  SR.forEach(sr => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><b>${sr} kHz</b></td>`;
   
    METHODS.forEach((method, idx) => {
      const unavailable = sr === "44.1" && idx > 0;
      const path = `${A7_ROOT}/${method.key}/sr${sr}/${RCST_FILE}`;
      tr.innerHTML += audioCell(path, unavailable);
    });

    frag.appendChild(tr);
  });

  a7RcstTable.appendChild(frag);
}

// Table 3: Alpha 0.7 CMFB Channels 
const a7SubTable = document.getElementById("a7SubTable");

// Header
a7SubTable.insertAdjacentHTML("beforeend", `
<tr class="top-header">
    <th rowspan="2" class="group-header">Inference SR</th>
    <th rowspan="2" class="group-header">Channel</th>
    <th class="group-header" rowspan="2">${METHODS[0].label}</th>
    <th class="group-header" colspan="${DELAY_METHODS.length}">Delay-based methods</th>
</tr>
  <tr>
    ${DELAY_METHODS.map(m => `<th class="subheader">${m.label}</th>`).join("")}
</tr>
`);

// Build collapsible groups
SR.forEach(sr => {

  // 1. Collapsible heading row
  a7SubTable.insertAdjacentHTML(
    "beforeend",
    `<tr class="sr-toggle" data-sr="${sr}">
       <td colspan="${METHODS.length + 2}" class="sr-header">
         ▶ ${sr} kHz (click to expand)
       </td>
     </tr>`
  );

  // 2. Container for table rows
  const container = document.createElement("tbody");
  container.style.display = "none";
  container.dataset.srContent = sr;
  container.dataset.root = A7_ROOT;

  a7SubTable.appendChild(container);
});

// Table 4: Alpha 0.5 Reconstructed Audio File
const a5RcstTable = document.getElementById("a5RcstTable");

a5RcstTable.insertAdjacentHTML("beforeend", `
<tr>
  <th rowspan="2" class="group-header">Inference SR</th>
  <th class="group-header" rowspan="2">${METHODS[0].label}</th>
  <th class="group-header" colspan="${DELAY_METHODS.length}">Delay-based methods</th>
</tr>
<tr>${DELAY_METHODS.map(m => `<th class="subheader">${m.label}</th>`).join("")}</tr>
`);

{
  const frag = document.createDocumentFragment();

  SR.forEach(sr => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><b>${sr} kHz</b></td>`;

    METHODS.forEach((method, idx) => {
      const unavailable = sr === "44.1" && idx > 0;
      const path = `${A5_ROOT}/${method.key}/sr${sr}/${RCST_FILE}`;
      tr.innerHTML += audioCell(path, unavailable);
    });

    frag.appendChild(tr);
  });

  a5RcstTable.appendChild(frag);
}

// Table 5: Alpha 0.5 CMFB Channels 
const a5SubTable = document.getElementById("a5SubTable");

// Header
a5SubTable.insertAdjacentHTML("beforeend", `
<tr class="top-header">
    <th rowspan="2" class="group-header">Inference SR</th>
    <th rowspan="2" class="group-header">Channel</th>
    <th class="group-header" rowspan="2">${METHODS[0].label}</th>
    <th class="group-header" colspan="${DELAY_METHODS.length}">Delay-based methods</th>
</tr>
  <tr>
    ${DELAY_METHODS.map(m => `<th class="subheader">${m.label}</th>`).join("")}
</tr>
`);

// Build collapsible groups
SR.forEach(sr => {

  // 1. Collapsible heading row
  a5SubTable.insertAdjacentHTML(
    "beforeend",
    `<tr class="sr-toggle" data-sr="${sr}">
       <td colspan="${METHODS.length + 2}" class="sr-header">
         ▶ ${sr} kHz (click to expand)
       </td>
     </tr>`
  );

  // 2. Container for table rows
  const container = document.createElement("tbody");
  container.style.display = "none";
  container.dataset.srContent = sr;
  container.dataset.root = A5_ROOT;

  a5SubTable.appendChild(container);
});

// Subband Inputs
const subbandInput = document.getElementById("subbandInput");

// Header
subbandInput.insertAdjacentHTML("beforeend", `
<tr class="top-header">
    <th class="group-header">Channel</th>
    <th class="group-header">Audio Files</th>
</tr>
`);

for (let ch = 1; ch <= 8; ch++) {
    const file = `${INPUT_ROOT}/Subchannel_Audio_Example2/Channel_${ch}.wav`;
    subbandInput.innerHTML += `<td>${ch}</td><td><audio controls preload="none" data-src="${file}"></audio></td>`;
  }

//////////// Events /////////
// Toggle logic
document.addEventListener("click", e => {
  const srRow = e.target.closest(".sr-toggle");
  if (!srRow) return;

  const table = srRow.closest("table");     
  const sr = srRow.dataset.sr;

  const container = table.querySelector(
    `tbody[data-sr-content="${sr}"]`
  );

  if (!container) {
    console.error("No container found for SR:", sr);
    return;
  }

  const isHidden = container.style.display === "none";
  container.style.display = isHidden ? "" : "none";

  if (container.dataset.loaded) return;

  const root = container.dataset.root;
  const frag = document.createDocumentFragment();

  for (let ch = 1; ch <= 8; ch++) {
    const tr = document.createElement("tr");

    if (ch === 1) {
      tr.innerHTML += `<td rowspan="8" class="group-header">${sr} kHz</td>`;
    }

    tr.innerHTML += `<td>${ch}</td>`;

    METHODS.forEach(method => {
      const file = `${root}/${method.key}/sr${sr}/Channel_${ch}_RNN.wav`;
      tr.innerHTML += `<td><audio controls preload="none" data-src="${file}"></audio></td>`;
    });

    frag.appendChild(tr);
  }

  container.appendChild(frag);
  container.dataset.loaded = "true";
});

// lazy audio loading
document.addEventListener("play", (e) => {
  const audio = e.target;
  if (audio.tagName !== "AUDIO" || audio.dataset.loaded) return;

  const src = audio.dataset.src;
  const source = document.createElement("source");
  source.src = src;
  source.type = "audio/wav";

  audio.appendChild(source);
  audio.load();
  audio.dataset.loaded = "true";
}, true);