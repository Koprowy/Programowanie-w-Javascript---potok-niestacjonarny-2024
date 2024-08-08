function update() {
    let a = parseFloat(document.getElementById("value1").value) || 0;
    let b = parseFloat(document.getElementById("value2").value) || 0;
    let c = parseFloat(document.getElementById("value3").value) || 0;
    let d = parseFloat(document.getElementById("value4").value) || 0;

    let values = [a, b, c, d];
    let sum = (a + b + c + d);
    let average = ((a + b + c + d) / 4);
    let min = Math.min(...values);
    let max = Math.max(...values);


    document.getElementById('sum').textContent = sum;
    document.getElementById('average').textContent = average;
    document.getElementById('min').textContent = min;
    document.getElementById('max').textContent = max;
}

    //nasłuchiwanie live
    document.getElementById("value1").addEventListener('input',update);
    document.getElementById("value2").addEventListener('input',update);
    document.getElementById("value3").addEventListener('input',update);
    document.getElementById("value4").addEventListener('input',update);