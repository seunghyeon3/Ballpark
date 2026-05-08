function renderWeather(name){

  let html =
    '<div class="weather-grid">';

  for(let i=0;i<4;i++){

    html += `
      <div class="weather-item">

        <div>
          ${12+i}:00
        </div>

        <div style="
          font-size:32px;
          margin:10px 0;
        ">
          ☀️
        </div>

        <div style="
          font-size:24px;
          font-weight:bold;
        ">
          ${22+i}°
        </div>

        <div style="
          font-size:12px;
          color:#cbd5e1;
          margin-top:8px;
        ">
          강수 ${10*i}%<br>
          습도 ${55+i}%
        </div>

      </div>
    `;
  }

  html += '</div>';

  document
    .getElementById('weather-content')
    .innerHTML = html;
}

function renderNews(name){

  let html = '';

  for(let i=1;i<=5;i++){

    html += `
      <div class="news-item">

        <a href="#">
          ${name} 관련 뉴스 ${i}
        </a>

        <div class="news-date">
          2026-05-08
        </div>

      </div>
    `;
  }

  document
    .getElementById('news-content')
    .innerHTML = html;
}

function activate(btn){

  document
    .querySelectorAll('.stadium-btn')
    .forEach(b=>{
      b.classList.remove('active');
    });

  btn.classList.add('active');
}

document
  .querySelectorAll('.stadium-btn')
  .forEach(btn=>{

    btn.addEventListener('click', ()=>{

      const stadium =
        btn.dataset.stadium;

      activate(btn);

      document
        .getElementById('stadium-title')
        .innerText =
          stadium + ' 구장';

      renderWeather(stadium);

      renderNews(stadium);

    });

});

renderWeather('잠실');
renderNews('잠실');