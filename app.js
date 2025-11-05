// app.js

// Fallback sample in case API is blocked (keeps app working offline)
const sampleData = [
  {
    "name": "Jessica Taylor",
    "gender": "Female",
    "age": 28,
    "profile_picture": "https://fedskillstest.ct.digital/4.png",
    "date_of_birth": "1996-08-23",
    "phone_number": "(415) 555-1234",
    "emergency_contact": "(415) 555-5678",
    "insurance_type": "Sunrise Health Assurance",
    "diagnosis_history": [
      {"month":"Oct","year":2023,"blood_pressure":{"systolic":{"value":120},"diastolic":{"value":80}},"heart_rate":{"value":72},"respiratory_rate":{"value":18},"temperature":{"value":98.6}},
      {"month":"Nov","year":2023,"blood_pressure":{"systolic":{"value":130},"diastolic":{"value":82}},"heart_rate":{"value":76},"respiratory_rate":{"value":19},"temperature":{"value":99}},
      {"month":"Dec","year":2023,"blood_pressure":{"systolic":{"value":140},"diastolic":{"value":85}},"heart_rate":{"value":80},"respiratory_rate":{"value":20},"temperature":{"value":98.6}},
      {"month":"Jan","year":2024,"blood_pressure":{"systolic":{"value":150},"diastolic":{"value":82}},"heart_rate":{"value":79},"respiratory_rate":{"value":20},"temperature":{"value":98.4}},
      {"month":"Feb","year":2024,"blood_pressure":{"systolic":{"value":155},"diastolic":{"value":80}},"heart_rate":{"value":81},"respiratory_rate":{"value":20},"temperature":{"value":98.7}},
      {"month":"Mar","year":2024,"blood_pressure":{"systolic":{"value":160},"diastolic":{"value":78}},"heart_rate":{"value":78},"respiratory_rate":{"value":20},"temperature":{"value":98.6}}
    ],
    "diagnostic_list": [
  { "name": "Hypertension", "description": "Chronic high blood pressure", "status": "Under Observation" },
  { "name": "Type 2 Diabetes", "description": "Insulin resistance and elevated blood sugar", "status": "Cured" },
  { "name": "Asthma", "description": "Recurrent episodes of bronchial constriction", "status": "Inactive" },
  { "name": "Osteoarthritis", "description": "Degenerative joint disease", "status": "Under Treatment" },
  { "name": "Obesity", "description": "High body mass index and excessive fat", "status": "Ongoing" },
  { "name": "Anemia", "description": "Low hemoglobin count and iron deficiency", "status": "Monitored" },
  { "name": "Migraines", "description": "Severe headaches with sensitivity to light", "status": "Controlled" },
  { "name": "Hypothyroidism", "description": "Underactive thyroid causing fatigue", "status": "Stable" }
],

    "lab_results":["Blood Tests","CT Scans"]
  }
];

async function fetchJessicaData() {
  const username = "coalition";
  const password = "skills-test";
  const basic = btoa(`${username}:${password}`);
  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

  try{
     console.log(" Fetching data from Coalition API...");
    const res = await fetch(url, {
      headers: {
        "Authorization": `Basic ${basic}`
      }
    });

    // if CORS or network blocks, fallback to sample
   if (!res.ok) {
      console.warn(` API request failed (Status: ${res.status}). Using fallback data.`);
      return { data: sampleData[0], fromAPI: false };
    }

    const data = await res.json();
    const jessica = Array.isArray(data) ? data.find(p => p.name === "Jessica Taylor") : null;
    if (!jessica) {
      console.warn("Jessica not found in API response, using sample.");
      return sampleData[0];
    }
    return jessica;
  } catch (err) {
    console.warn("Fetch failed — falling back to sample data:", err);
    return sampleData[0];
  }
}

// populate DOM elements
function populateProfile(j) {
  document.getElementById('pname').textContent = j.name || "Jessica Taylor";
  document.getElementById('profilePic').src = j.profile_picture || "";
  document.getElementById('dob').textContent = j.date_of_birth || "--";
  document.getElementById('gender').textContent = j.gender || "--";
  document.getElementById('phone').textContent = j.phone_number || "--";
  document.getElementById('emergency').textContent = j.emergency_contact || "--";
  document.getElementById('insurance').textContent = j.insurance_type || "--";

  // Lab results
  const labs = document.getElementById('labResults');
labs.innerHTML = '';
if (Array.isArray(j.lab_results)) {
  j.lab_results.forEach(l => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${l}</span>
      <img src="assets/download.svg" alt="download" />
    `;
    labs.appendChild(li);
  });
}
}

// diagnostic table
function populateDiagnostics(j) {
  const tbody = document.querySelector('#diagnosticTable tbody');
  tbody.innerHTML = '';
  if (Array.isArray(j.diagnostic_list)) {
    j.diagnostic_list.forEach(d => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${d.name}</td><td>${d.description}</td><td>${d.status}</td>`;
      tbody.appendChild(tr);
    });
  }
}

// update stat cards with latest month (use last item)
function updateStatCards(j) {
  const last = j.diagnosis_history && j.diagnosis_history[j.diagnosis_history.length - 1];
  if (!last) return;
  document.getElementById('respRate').textContent = `${last.respiratory_rate?.value ?? '--'} bpm`;
  document.getElementById('temp').textContent = `${last.temperature?.value ?? '--'}°F`;
  document.getElementById('hr').textContent = `${last.heart_rate?.value ?? '--'} bpm`;
}

// create Chart.js BP chart
let bpChart = null;
function createBPChart(j) {
  const ctx = document.getElementById('bpChart').getContext('2d');
  const months = j.diagnosis_history.map(d => `${d.month} ${d.year}`);
  const systolic = j.diagnosis_history.map(d => d.blood_pressure.systolic.value);
  const diastolic = j.diagnosis_history.map(d => d.blood_pressure.diastolic.value);

  if (bpChart) {
    bpChart.destroy();
  }

  bpChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Systolic',
          data: systolic,
          tension: 0.35,
          borderWidth: 3,
          borderColor: '#c45af0',
          fill: false,
          pointRadius: 3
        },
        {
          label: 'Diastolic',
          data: diastolic,
          tension: 0.35,
          borderWidth: 3,
          borderColor: '#5ab9ea',
          fill: false,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend:{ display: false }
      },
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 50,
          suggestedMax: 180
        }
      }
    }
  });
}

// initialize app
async function init() {
  const jessica = await fetchJessicaData();
  populateProfile(jessica);
  populateDiagnostics(jessica);
  updateStatCards(jessica);
  createBPChart(jessica);
}

init();
