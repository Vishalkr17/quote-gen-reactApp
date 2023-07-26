import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    getQuotes();
  }, []);

  async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      const quotesData = await response.json();

      // Modify the quotesData array to remove "type.fit" from the author names
      const modifiedQuotesData = quotesData.map((quote) => {
        if (quote.author && quote.author.includes("type.fit")) {
          const actualAuthor = quote.author.replace(", type.fit", "").trim();
          return { ...quote, author: actualAuthor };
        }
        return quote;
      });

      // Get a random quote from the modified quotesData
      const randomQuote = modifiedQuotesData[Math.floor(Math.random() * modifiedQuotesData.length)];
      setQuote({ text: randomQuote.text, author: randomQuote.author || "Unknown" });
    } catch (e) {
      console.log('Whoops, no quote', e);
    }
  }

  function newQuote() {
    getQuotes();
  }

  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    window.open(twitterUrl, '_blank');
  }

  return (

    <div className="App">
    <div className="quote-container" id="quote-container">
        <>
          {/* Quote */}
          <div className="quote-text">
            <FontAwesomeIcon icon={faQuoteLeft} className='fa-quote-left' />
            <span id="quote">{quote.text}</span>
            <FontAwesomeIcon icon={faQuoteRight} className='fa-quote-right' />
          </div>

          {/* Author */}
          <div className="quote-author">
            <span id="author">{quote.author !== null && quote.author !== 'type.fit' ? `- ${quote.author}` : ''}</span>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button className="twitter-button" id="twitter" title="Tweet This!" onClick={tweetQuote}>
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <button id="new-quote" onClick={newQuote}>
              New Quote
            </button>
          </div>
        </>
    </div>
    </div>
  );
}

export default App;
