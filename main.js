document.addEventListener('DOMContentLoaded', function () {
    const out = document.querySelector('.calc-screen p');
    const currentTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-switch');
    const resultElement = document.querySelector('.fibonacci-result span');

    let a = '';
    let b = '';
    let sign = '';
    let finish = false;
    let key = '';

    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const action = ['+', '-', 'x', '/', '%'];

    // Функція очищення всіх значень
    function clearAll() {
        a = '';
        b = '';
        sign = '';
        finish = false;
        out.textContent = '0';
        resultElement.textContent = '';
    }

    // Обробник для кнопки AC
    document.querySelector('.ac').addEventListener('click', () => clearAll());

    // Обробники для кнопок "Факторіал" та "Фібоначчі"
    document.querySelector('.factorial').addEventListener('click', () => calculateFactorial());
    document.querySelector('.fibonacci').addEventListener('click', () => startFibonacciSequence());

    // Функція обчислення факторіалу
    function calculateFactorial() {
        if (a !== '' && !b && !sign) {
            a = factorial(+a);
            out.textContent = a;
            adjustFontSize();
        } else if (a !== '' && b !== '' && sign && !finish) {
            b = factorial(+b);
            out.textContent = b;
            adjustFontSize();
        }
    }

    // Функція початку послідовності чисел Фібоначчі
    function startFibonacciSequence() {
        if (a !== '') {
            const n = parseInt(a);
            if (!isNaN(n) && n >= 2 && n <= 30) {
                const sequence = calculateFibonacciNumberSequence(n);
                resultElement.textContent = sequence.join(', ');
                b = '';
                sign = '';
                adjustFontSize();
            } else {
                resultElement.textContent = 'Error: Enter a number between 2 and 30';
            }
        }
    }

    // Функція обчислення послідовності чисел Фібоначчі
    function calculateFibonacciNumberSequence(n) {
        const sequence = [0, 1];
        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence;
    }

    // Функція для обчислення факторіалу числа
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    // Функція автоматичного регулювання розміру шрифту
    function adjustFontSize() {
        const screenWidth = out.clientWidth;
        const maxChars = 9;
        const textLength = out.textContent.length;

        if (textLength > maxChars) {
            out.textContent = out.textContent.slice(0, maxChars);
        }

        const fontSize = (screenWidth / maxChars) * 2;
        const minFontSize = 40;
        const maxFontSize = 70;
        out.style.fontSize = Math.max(minFontSize, maxFontSize - (textLength * 2)) + 'px';
    }

    // Обробники подій для кнопок
    const clickbut = document.querySelector('.buttons');
    const clickbut2 = document.querySelector('.dopBlock');

    if (clickbut2) {
        clickbut2.addEventListener('click', commonClickHandler);
    }

    if (clickbut) {
        clickbut.addEventListener('click', commonClickHandler);
    }

    // Загальний обробник подій для кнопок
    function commonClickHandler(event) {
        if (!event.target.classList.contains('btn')) return;

        key = event.target.textContent;

        if (digit.includes(key)) {
            if (b === '' && sign === '') {
                a += key;
                out.textContent = a;
                adjustFontSize();
            } else if (a !== '' && b !== '' && finish) {
                b = key;
                finish = false;
                out.textContent = b;
                adjustFontSize();
            } else {
                b += key;
                out.textContent = b;
                adjustFontSize();
            }
        }

        if (action.includes(key)) {
            if (key === '%') {
                if (a !== '' && !b && !sign) {
                    a = (+a) / 100;
                    out.textContent = a;
                } else if (a !== '' && b !== '' && sign && !finish) {
                    b = (+b) / 100;
                    out.textContent = b;
                }
            } else {
                if (a !== '' && b === '') {
                    sign = key;
                    out.textContent = sign;
                } else if (a !== '' && b !== '') {
                    switch (sign) {
                        case "+":
                            a = (+a) + (+b);
                            break;
                        case "-":
                            a = (+a) - (+b);
                            break;
                        case "x":
                            a = (+a) * (+b);
                            break;
                        case "/":
                            if (b === '0') {
                                out.textContent = 'Error';
                                a = '';
                                b = '';
                                sign = '';
                                return;
                            }
                            a = (+a) / (+b);
                            break;
                    }
                    if (Number.isInteger(a)) {
                        out.textContent = a;
                    } else {
                        a = a.toFixed(1);
                        out.textContent = a;
                    }
                    b = '';
                    sign = key;
                }
            }
        }

        if (key === '√') {
            if (a !== '' && !b && !sign) {
                a = Math.floor(Math.sqrt(parseFloat(a)));
                out.textContent = a;
            } else if (a !== '' && b !== '' && sign && !finish) {
                b = Math.floor(Math.sqrt(parseFloat(b)));
                out.textContent = b;
            }
        }

        if (key === '=') {
            if (b !== '') {
                switch (sign) {
                    case "+":
                        a = (+a) + (+b);
                        break;
                    case "-":
                        a = (+a) - (+b);
                        break;
                    case "x":
                        a = (+a) * (+b);
                        break;
                    case "/":
                        if (b === '0') {
                            out.textContent = 'Error';
                            a = '';
                            b = '';
                            sign = '';
                            return;
                        }
                        a = (+a) / (+b);
                        break;
                }
                if (Number.isInteger(a)) {
                    out.textContent = a;
                } else {
                    a = a.toFixed(1);
                    out.textContent = a;
                }
                b = '';
            }
            finish = true;
            adjustFontSize();
        }
    }

    // Обробник для перемикання теми
    function toggleTheme() {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Встановлення теми з локального сховища
    function setThemeFromLocalStorage() {
        if (currentTheme === 'dark') {
            document.body.classList.add('dark');
            themeToggle.checked = true;
        } else {
            document.body.classList.add('light');
            themeToggle.checked = false;
        }
    }

    // Виклик функції для встановлення теми з локального сховища
    setThemeFromLocalStorage();

    // Обробник події зміни стану перемикача теми
    themeToggle.addEventListener('change', () => toggleTheme());
});

let isLeft40px = true;

// Функція для відкриття/закриття додаткового блоку
function openDMFunc() {
    const dopMain = document.querySelector('.dopBlock');
    dopMain.style.left = isLeft40px ? '120px' : '40px';
    isLeft40px = !isLeft40px;
}
