export default {

async fetch(request){

const url = new URL(request.url);

if(url.pathname === '/weather'){

return Response.json({
temp:22,
icon:'☀️'
},{
headers:{
'Access-Control-Allow-Origin':'*'
}
});

}

if(url.pathname === '/news'){

const team = url.searchParams.get('team');

return Response.json([
{
title:`${team} 경기 분석 기사`,
date:'방금 전'
},
{
title:`${team} 선발투수 관련 뉴스`,
date:'5분 전'
}
],{
headers:{
'Access-Control-Allow-Origin':'*'
}
});

}

return new Response('not found');

}

}
