import { useEffect, useState, useRef } from 'react';
import words from './data/words.json';
console.log(words);
function App() {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(words[index]);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    if (status === 'success') nextWord();
  }, [status]);

  useEffect(() => {
    setWord(words[index]);
  }, [index]);

  const handleAnswer = (e) => setAnswer(e.target.value);

  const checkAnswer = () => {
    if (answer === word.english) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  const revealAnswer = () => {
    inputRef.current.placeholder = `Type "${word.english}"`;
  };

  const nextWord = () => {
    if (inputRef.current.placeholder !== 'Enter the answer') {
      inputRef.current.placeholder = 'Enter the answer';
    }
    setAnswer('');
    setStatus(null);
    setIndex(index + 1);
  };

  return (
    <>
      <h1>How do you say ...</h1>
      <section>
        <p>{word.spanish}</p>
        <form>
          <input
            type='text'
            placeholder='Enter the answer'
            ref={inputRef}
            value={answer}
            onChange={handleAnswer}
          />
          <button type='button' onClick={checkAnswer}>
            Done
          </button>
          <button type='button' onClick={revealAnswer}>
            I don't know
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
