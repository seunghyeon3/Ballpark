
const SERVICE_KEY = "QgHa6v2LSQ%2BqeGMmapD%2B%2FNH60g0vGKGvVKJsU4T0Msj9ooR8zRB4jtp6SN9PDRH19f7dSX2j1D2xqtCIxHsGlw%3D%3D";
const CORS_PROXY = "https://cors.isomorphic-git.org/";

const stadiumData = {
  "잠실": { nx: 60, ny: 127, team: "LG 트윈스 두산 베어스" },
  "고척": { nx: 58, ny: 125, team: "키움 히어로즈" },
  "문학": { nx: 55, ny: 124, team: "SSG 랜더스" },
  "수원": { nx: 60, ny: 121, team: "KT 위즈" },
  "대전": { nx: 67, ny: 100, team: "한화 이글스" },
  "대구": { nx: 89, ny: 90, team: "삼성 라이온즈" },
  "광주": { nx: 58, ny: 74, team: "KIA 타이거즈" },
  "사직": { nx: 98, ny: 76, team: "롯데 자이언츠" },
  "창원": { nx: 91, ny: 77, team: "NC 다이노스" }
};

function getBaseDateTime() {
  const now = new Date();
  const baseTimes = ["0200","0500","0800","1100","1400","1700","2000","2300"];

  let baseTime = "0200";

  for(let i=baseTimes.length-1; i>=0; i--){
    const hour = parseInt(baseTimes[i].substring(0,2));
    if(now.getHours() >= hour){
      baseTime = baseTimes[i];
      break;
    }
  }

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth()+1).padStart(2,'0');
  const dd = String(now.getDate()).padStart(2,'0');

  return {
    baseDate:`${yyyy}${mm}${dd}`,
    baseTime
  };
}

function weatherIcon(sky, pty){
  if(pty && pty !== "0") return "🌧";
  if(sky === "1") return "☀️";
  if(sky === "3") return "⛅";
  if(sky === "4") return "☁️";
  return "🌤";
}

async function loadWeather(stadium){
  const info = stadiumData[stadium];
  const { baseDate, baseTime } = getBaseDateTime();

  const apiUrl =
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=200&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${info.nx}&ny=${info.ny}`;

  try{
    const res = await fetch(CORS_PROXY + apiUrl);
    const json = await res.json();

    const items = json.response.body.items.item;
    const grouped = {};

    items.forEach(item => {
      if(!grouped[item.fcstTime]){
        grouped[item.fcstTime] = {};
      }
      grouped[item.fcstTime][item.category] = item.fcstValue;
    });

    const times = Object.keys(grouped).sort().slice(0,4);

    let html = `<h3>${stadium} 구장 단기예보</h3><div class="weather-grid">`;

    times.forEach(time => {
      const data = grouped[time];

      html += `
      <div class="weather-item">
        <div>${time.substring(0,2)}시</div>
        <div style="font-size:24px;">${weatherIcon(data.SKY,data.PTY)}</div>
        <div>${data.TMP}°C</div>
        <div>강수 ${data.POP}%</div>
        <div>습도 ${data.REH}%</div>
      </div>`;
    });

    html += "</div>";

    document.getElementById("weather-content").innerHTML = html;

  }catch(e){
    document.getElementById("weather-content").innerHTML = "날씨 데이터를 불러오지 못했습니다.";
  }
}

async function loadNews(stadium){
  const team = stadiumData[stadium].team;

  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(team + " KBO")}&hl=ko&gl=KR&ceid=KR:ko`;
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try{
    const res = await fetch(api);
    const data = await res.json();

    let html = "";

    data.items.slice(0,5).forEach(news => {
      html += `
      <div class="news-item">
        <a href="${news.link}" target="_blank">${news.title}</a>
        <div style="font-size:12px;color:#94a3b8;margin-top:6px;">${news.pubDate}</div>
      </div>`;
    });

    document.getElementById("news-content").innerHTML = html;

  }catch(e){
    document.getElementById("news-content").innerHTML = "뉴스 데이터를 불러오지 못했습니다.";
  }
}

document.querySelectorAll(".stadium-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const stadium = btn.dataset.stadium;

    document.getElementById("stadium-title").innerText = stadium + " 구장 정보";

    loadWeather(stadium);
    loadNews(stadium);
  });
});
