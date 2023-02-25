import { useEffect, useState, useRef } from 'react';
import words from './data/words.json';

function App() {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(words[index]);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);

  const inputRef = useRef();
  const pRef = useRef();

  useEffect(() => {
    if (status === 'success') nextWord();
    if (status === 'fail') wrongWord();
  }, [status]);

  useEffect(() => {
    setWord(words[index]);
  }, [index]);

  const handleAnswer = (e) => setAnswer(e.target.value.toLowerCase().trim());

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  };

  const handleBlur = () => checkAnswer();

  const checkAnswer = () => {
    if (answer === word.english) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  const revealAnswer = () => {
    inputRef.current.placeholder = `Type "${word.english}"`;
    pRef.current.innerHTML = null;
  };

  const nextWord = () => {
    if (inputRef.current.placeholder !== 'Enter the answer') {
      inputRef.current.placeholder = 'Enter the answer';
    }
    pRef.current.innerHTML = null;
    setAnswer('');
    setStatus(null);
    setIndex(index + 1);
  };

  const wrongWord = () => {
    answer
      ? (pRef.current.innerHTML = /*html*/ `<span className='wrong-word'>${answer}</span> is wrong word.`)
      : (pRef.current.innerHTML = 'Enter the answer.');
  };

  return (
    <>
      <h1 className='title'>How do you say ...</h1>
      <section className='card'>
        <p className='question'>
          How do you say <span className='question-word'>{word.spanish}</span>?
        </p>
        <form className='form'>
          <input
            type='text'
            placeholder='Enter the answer'
            ref={inputRef}
            value={answer}
            onChange={handleAnswer}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className='answer'
          />
          <div className='btns'>
            <button type='button' onClick={revealAnswer} className='btn'>
              I don't know
            </button>
          </div>
        </form>
        <p ref={pRef} className='wrong'></p>
      </section>
    </>
  );
}

export default App;
