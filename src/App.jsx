import { useEffect, useState, useRef } from 'react';
import words from './data/words.json';

function App() {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(words[index]);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);
  const [wrong, setWrong] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (status === 'success') nextWord();
    if (status === 'fail') showWrong();
  }, [status]);

  useEffect(() => {
    setWord(words[index]);
  }, [index]);

  const handleAnswer = (e) => {
    if (wrong) setWrong('');
    setAnswer(e.target.value.toLowerCase().trim());
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (answer === word.english) setStatus('success');
    else setStatus('fail');
  };

  const revealAnswer = () => {
    inputRef.current.placeholder = `Type "${word.english}"`;
    inputRef.current.focus();
  };

  const nextWord = () => {
    if (inputRef.current.placeholder !== 'Enter the answer') {
      inputRef.current.placeholder = 'Enter the answer';
    }
    setTimeout(() => {
      setAnswer('');
      if (index + 1 === words.length) setIndex(0);
      else setIndex(index + 1);
      setStatus(null);
    }, 1000);
  };

  const showWrong = () => {
    if (inputRef.current.placeholder !== 'Enter the answer') {
      inputRef.current.placeholder = 'Enter the answer';
    }
    setWrong(answer);
    setAnswer('');
    setStatus(null);
  };

  return (
    <>
      <h1 className='title'>How do you say ...</h1>
      <section className={status === 'success' ? 'card success' : 'card'}>
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
            className='answer'
            autoFocus
          />
          <button type='button' onClick={revealAnswer} className='btn'>
            I don't know
          </button>
        </form>
        <p className={wrong ? 'wrong wrong-active' : 'wrong'}>
          <span>{wrong}</span> is a wrong word.
        </p>
      </section>
    </>
  );
}

export default App;
