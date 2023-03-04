import { useEffect, useState, useRef } from 'react';
import words from './data/words.json';

function App() {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState(words[index]);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);
  const [wrong, setWrong] = useState('');
  const [save, setSave] = useState(false);
  const [answers, setAnswers] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('hdysApp')) {
      setAnswers(JSON.parse(localStorage.getItem('hdysApp')));
      setSave(1);
    }
  }, []);

  useEffect(() => {
    if (status === 'success') nextWord();
    if (status === 'fail') showWrong();
  }, [status]);

  useEffect(() => {
    setWord(words[index]);
  }, [index]);

  useEffect(() => {
    if (save === 1) {
      setIndex(answers.length);
      setSave(true);
      return;
    }
    handleSave();
  }, [save]);

  useEffect(() => {
    if (save) localStorage.setItem('hdysApp', JSON.stringify(answers));
  }, [answers]);

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
      setAnswers([...answers, answer]);
      setAnswer('');
      if (index + 1 === words.length) setIndex(0);
      else setIndex(index + 1);
      setStatus(null);
    }, 500);
  };

  const showWrong = () => {
    if (inputRef.current.placeholder !== 'Enter the answer') {
      inputRef.current.placeholder = 'Enter the answer';
    }
    setWrong(answer);
    setAnswer('');
    setStatus(null);
  };

  const handleSave = () => {
    if (save) localStorage.setItem('hdysApp', JSON.stringify(answers));
    else localStorage.removeItem('hdysApp');
  };

  return (
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
        <div className='btns'>
          <button type='button' onClick={revealAnswer} className='btn'>
            I don't know
          </button>
          <div className='save'>
            <label htmlFor='save' className='save-label'>
              Save progress
            </label>
            <input
              type='checkbox'
              id='save'
              className='save-input'
              checked={save}
              onChange={(e) => setSave(e.target.checked)}
            />
          </div>
        </div>
        <label className='counter'>
          {answers.length} of {words.length}
        </label>
      </form>
      <p className={wrong ? 'wrong wrong-active' : 'wrong'}>
        <span>{wrong}</span> is a wrong word.
      </p>
    </section>
  );
}

export default App;
