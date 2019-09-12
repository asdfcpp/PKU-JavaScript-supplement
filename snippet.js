refLim = ['#refreshLimit2929','#refreshLimit3030','#refreshLimit3131']
size = 3;
i = 0;
window.flag = false;
setInterval(() => {console.log(window.flag ? "刷出过名额":"未刷出过名额",i," ",refLim[i%size]); document.querySelector(refLim[i%size]).click(); i++;}, 5000);