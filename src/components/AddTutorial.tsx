// This component has a Form to submit new Tutorial with 2 fields: title & description.
import React, { useState, ChangeEvent } from 'react';
import TutorialDataService from '../services/TutorialService';
import { TutorialData } from '../types/Tutorial';

const AddTutorial: React.FC = () => {
  const initialTutorialState = {
    id: null,
    title: '',
    description: '',
    published: false,
  };
  const [tutorial, setTutorial] = useState<TutorialData>(initialTutorialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // track the values of the input and set that state for changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  // get tutorial state and send the POST request to the Web API
  const saveTutorial = () => {
    let data = {
      title: tutorial.title,
      description: tutorial.description,
    };
    TutorialDataService.create(data) // POST
      .then((response) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  // submitted state is ture -> show Add button for creating new Tutorial again
  // submitted state is false -> Submit button will display
  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name='title'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name='description'
            />
          </div>
          <button onClick={saveTutorial} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
