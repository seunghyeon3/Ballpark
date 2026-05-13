const WORKER_URL = 'https://YOUR-WORKER.workers.dev';

const teams = {
LG:{name:'LG 트윈스',nx:60,ny:127},
키움:{name:'키움 히어로즈',nx:58,ny:126},
SSG:{name:'SSG 랜더스',nx:55,ny:124}
};

async function renderWeather(team){

const info = teams[team];

const res = await fetch(
`${WORKER_URL}/weather?nx=${info.nx}&ny=${info.ny}`
);

const data = await res.json();

document.getElementById('weather').innerHTML = `
<div class="weather-box">
<div style="font-size:60px;">${data.icon}</div>
<div style="font-size:42px;font-weight:bold;">${data.temp}°</div>
<div>${info.name} 현재 날씨</div>
</div>
`;
}

async function renderNews(team){

const res = await fetch(
`${WORKER_URL}/news?team=${encodeURIComponent(team)}`
);

const news = await res.json();

let html = '';

news.forEach(item=>{
html += `
<div class="news-item">
<div>${item.title}</div>
<div>${item.date}</div>
</div>
`;
});

document.getElementById('news').innerHTML = html;
}

document.querySelectorAll('.team')
.forEach(btn=>{

btn.addEventListener('click', async ()=>{

document.querySelectorAll('.team')
.forEach(b=>b.classList.remove('active'));

btn.classList.add('active');

const team = btn.dataset.team;

document.getElementById('teamTitle').innerText =
teams[team].name;

await renderWeather(team);
await renderNews(team);

});

});

renderWeather('LG');
renderNews('LG');
