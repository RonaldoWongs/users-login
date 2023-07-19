import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ getUsers, userSelected, deselectUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    } else {
      clear();
    }
  }, [userSelected, reset]);

  const submit = (data) => {
    if (userSelected) {
      axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data);
    } else {
      axios
        .post(`https://users-crud.academlo.tech/users/`, data)
        .then(() => getUsers())
        .catch((error) => console.log(error.response));
    }
    handleCloseForm();
  };

  const clear = () => {
    reset({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      birthday: '',
      image_url: '',
    });
    deselectUser();
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <div className='modal show'>
          <div className='modal-content'>
            <h1>User Register</h1>
            <form onSubmit={handleSubmit(submit)}>
              <div className='input-container'>
                <label htmlFor='image_url'>ImageUrl:</label>
                <input type='text' id='image_url' {...register('image_url')} />
              </div>
              <div className='input-container'>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' {...register('email')} />
              </div>
              <div className='input-container'>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' {...register('password')} />
              </div>
              <div className='input-container'>
                <label htmlFor='first_name'>First Name:</label>
                <input type='text' id='first_name' {...register('first_name')} />
              </div>
              <div className='input-container'>
                <label htmlFor='last_name'>Last Name:</label>
                <input type='text' id='last_name' {...register('last_name')} />
              </div>
              <div className='input-container'>
                <label htmlFor='birthday'>Birthday:</label>
                <input type='date' id='birthday' {...register('birthday')} />
              </div>
              <button type='submit'>Submit</button>
              <button onClick={handleCloseForm} type='button'>
                Cancel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={handleOpenForm} className='custom-button'>
          Create User
        </button>
      )}
    </div>
  );
};

export default UserForm;