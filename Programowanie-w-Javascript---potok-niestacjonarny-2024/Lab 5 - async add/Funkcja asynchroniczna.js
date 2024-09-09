// Asynchroniczna funkcja dodająca dwie liczby z opóźnieniem 100 ms
const asyncAdd = async (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!');
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 100);
    });
};

// Funkcja sumująca liczby w sposób sekwencyjny
const asyncSumSequential = async (...args) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum = await asyncAdd(sum, args[i]);
    }
    return sum;
};

// Funkcja optymalizująca sumowanie przez zrównoleglone operacje
const asyncSumOptimized = async (...args) => {
    if (args.length === 0) return 0;

    // Dopóki mamy więcej niż jedną liczbę do zsumowania
    while (args.length > 1) {
        const promises = [];
        for (let i = 0; i < args.length; i += 2) {
            if (i + 1 < args.length) {
                // Sumujemy pary równolegle
                promises.push(asyncAdd(args[i], args[i + 1]));
            } else {
                // Ostatnia liczba przechodzi dalej bez zmian (jeśli jest nieparzysta liczba)
                promises.push(Promise.resolve(args[i]));
            }
        }
        args = await Promise.all(promises);
    }

    return args[0]; // Zwracamy ostateczną sumę
};

// Funkcja mierząca czas wykonania operacji
const measureTime = async (fn, ...args) => {
    const start = Date.now();
    const result = await fn(...args);
    const end = Date.now();
    console.log(`Czas wykonania: ${end - start} ms`);
    return result;
};

// Funkcja generująca losowe liczby
const generateRandomNumbers = (count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
};

// Funkcja testująca działanie obu podejść (sekwencyjne i zoptymalizowane)
const testAsyncSum = async () => {
    const numbers = generateRandomNumbers(100); // Generujemy 100 losowych liczb

    console.log('Suma sekwencyjna:');
    const sequentialResult = await measureTime(asyncSumSequential, ...numbers);
    console.log(`Wynik: ${sequentialResult}`);

    console.log('Suma zoptymalizowana:');
    const optimizedResult = await measureTime(asyncSumOptimized, ...numbers);
    console.log(`Wynik: ${optimizedResult}`);
};

// Wywołanie funkcji testowej
testAsyncSum();
