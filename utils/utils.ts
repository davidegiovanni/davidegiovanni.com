// Map number x from range [a, b] to [c, d]
const map = (x: number, a: number, b: number, c: number, d: number) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const calcWinsize = () => {
    return {width: process.browser ? window.innerWidth : 0, height: process.browser ? window.innerHeight : 0};
};

// Gets the mouse position
const getMousePos = (e: { clientX: any; clientY: any; }) => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

const distance = (x1: number,y1: number,x2: number,y2: number) => {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.hypot(a,b);
}

// Generate a random float.
const getRandomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);

export { 
    map, 
    lerp, 
    calcWinsize, 
    getMousePos,
    distance,
    getRandomFloat
};