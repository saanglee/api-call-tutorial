/*
If you click on "Edit" button of any Tutorial, the app will direct you to Tutorial page.

getting data & update, delete the Tutorial
useParams : get Tutorial by id in the URL
*/
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialDataService from '../services/TutorialService';
import { TutorialData } from '../types/Tutorial';
const Tutorial: React.FC = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialTutorialState = {
    id: null,
    title: '',
    description: '',
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] =
    useState<TutorialData>(initialTutorialState);
  const [message, setMessage] = useState<string>('');

  const getTutorialById = (id: string) => {
    TutorialDataService.getById(id)
      .then((response: any) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id) getTutorialById(id);
  }, [id]);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };
  const updatePublished = (status: boolean) => {
    let data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };
    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        console.log('updatePublished : ', response.data);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage('The status was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage('The tutorial was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  // DELETE
  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then((response: any) => {
        console.log(response.data);
        navigate('/tutorials');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentTutorial ? (
        <div className='edit-form'>
          <h4>Tutorial</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='title'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? 'Published' : 'Pending'}
            </div>
          </form>
          {currentTutorial.published ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className='badge badge-danger mr-2' onClick={deleteTutorial}>
            Delete
          </button>
          <button
            type='submit'
            className='badge badge-success'
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
