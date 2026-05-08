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
          font-size:34px;
          margin:10px 0;
        ">
          ☀️
        </div>

        <div style="
          font-size:26px;
          font-weight:bold;
        ">
          ${22+i}°
        </div>

        <div style="
          margin-top:8px;
          font-size:12px;
          color:#cbd5e1;
        ">
          강수 ${10*i}%<br>
          습도 ${55+i}%
        </div>

      </div>
    `;
  }

  html += '</div>';

  document
    .getElementById('weather')
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
    .getElementById('news')
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

      activate(btn);

      const name =
        btn.dataset.name;

      document
        .getElementById('title')
        .innerText =
          name + ' 구장';

      renderWeather(name);
      renderNews(name);

    });

});

renderWeather('잠실');
renderNews('잠실');