import './scss/index.scss';

let count = 0;
const imp = ['default', 'important', 'so-so'];
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
    count += 1;
    if (count >= imp.length) {
        count = 0;
    }
    console.log(' count: ', count);
    for (let i = 0; i < imp.length; i++) {
        if (count === i) {
            target.classList.add(imp[i]);
        } else {
            target.classList.remove(imp[i]);
        }
    }
});

//
// const formatsCSS = [
//     '.css',
//     '.scss',
//     '.sass',
//     '.suss',
//     '.sasss',
//     '.ssasss',
// ];
//
// const validCSSformats = /(\.(sa|c|sc)ss)$/g;
//
// for (let i = 0; i < formatsCSS.length; i++) {
//     const element = formatsCSS[i];
//     const match = element.match(validCSSformats);
//     console.log(' match: ', match, i);
// }