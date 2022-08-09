// search tutorial by title
// display tutorial array on the left & selected tutorial on the right
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import TutorialDataService from '../services/TutorialService';
import { TutorialData } from '../types/Tutorial';

const TutorialList: React.FC = () => {
  const [tutorials, setTutorials] = useState<TutorialData[]>([]);
  const [currentTutorial, setCurrentTutorial] = useState<TutorialData | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>('');
  useEffect(() => {
    retrieveTutorials();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // GET all tutorials
  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
        console.log('getAll : ', response.data);
      })
      .catch((event: Error) => {
        console.log(event);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial: TutorialData, index: number) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  // DELETE ALL
  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log('DELETE ALL : ', response.data);
        refreshList();
      })
      .catch((event: Error) => {
        console.log(event);
      });
  };

  // FIND
  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data); // 검색 결과 렌더링
        setCurrentTutorial(null);
        setCurrentIndex(-1);
        console.log('findeByTitle', response.data);
      })
      .catch((event: Error) => {
        console.log(event);
      });
  };

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            value={searchTitle}
            onChange={handleInputChange}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <h4>Tutorial Lists</h4>
        <ul className='list-group'>
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                key={index}
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveTutorial(tutorial, index)}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>
        <button
          className='m-3 btn btn-sm btn-danger'
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      <div className='col-md-6'>
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>
            <Link
              to={'/tutorials/' + currentTutorial.id}
              className='badge badge-warning'
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialList;
