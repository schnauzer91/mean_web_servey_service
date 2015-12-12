$(document).ready(function(){
  new Morris.Bar({
    element: 'myfirstchart',
    data: [
      { y: '① 번', a: 5},
      { y: '② 번', a: 2},
      { y: '③ 번', a: 3}
    ],
    xkey: 'y',
    ykeys: 'a',
    labels: 'Series A'
  });
})

