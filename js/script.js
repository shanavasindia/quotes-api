// Elements
const quoteWrapper = document.querySelector('.quote-wrapper');
const loader = document.querySelector('.loader')
const newQuoteBtn = document.querySelector('.newQuoteBtn');
const quoteText = document.querySelector('h1');
const quoteAuthor = document.querySelector('h6');
const twitterBtn = document.querySelector('.twitterBtn');

// Quotes Array
let quotesArray = [];

// Getting Quotes from API
async function getQuotes(){
    const quotesApiUrl = 'https://type.fit/api/quotes';
    try{
        loading();
        const response = await fetch(quotesApiUrl);
        quotesArray = await response.json();
        const singleQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        quoteText.textContent = singleQuote.text;
        quoteAuthor.textContent = singleQuote.author;
        loadingComplete();
    }catch(error){
        console.log(error);
    }
}
getQuotes();

// Manipulate HTML Element with quotes
function quote(){
    const singleQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    quoteText.textContent = singleQuote.text;
    if(!singleQuote.author){
        quoteAuthor.textContent = "Unknown";
    }else{
        quoteAuthor.textContent = singleQuote.author;
    }
}

// Loading...
function loading(){
    quoteWrapper.hidden = true;
    loader.hidden = false;
}
// Loading completed
function loadingComplete(){
    quoteWrapper.hidden = false;
    loader.hidden = true;
}

// Button click to get new quote
newQuoteBtn.addEventListener('click', quote);

// Quote will update automatically every 5 seconds
setInterval(quote, 5000);

// Twitter Post
function twitterQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', twitterQuote);