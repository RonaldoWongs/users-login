import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersList = ({ users, selectUser, getUsers }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userSelected, setUserSelected] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (userSelected) {
      reset(userSelected);
    }
  }, [userSelected]);

  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud.academlo.tech/users/${id}/`)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleDeleteUser = (id) => {
    setUserIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      deleteUser(userIdToDelete);
    }
    setShowConfirmationModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleUpdateUser = (user) => {
    setUserSelected(user);
    setShowUpdateModal(true);
  };

  const submit = (data) => {
    if (userSelected) {
      axios
        .put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
        .then(() => {
          getUsers();
          setShowUpdateModal(false);
        })
        .catch((error) => console.log(error.response));
    } else {
      axios
        .post('https://users-crud.academlo.tech/users/', data)
        .then(() => {
          getUsers();
          setShowUpdateModal(false);
        })
        .catch((error) => console.log(error.response));
    }
    clear();
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
    setUserSelected(null);
  };

  return (
    <div className='List'>
      <h1 className='Title'>User List</h1>
      <div className="user-cards-container">
        {users.map((user) => (
          <div key={user.id} className='ListContainer'>
            <img src={user.image_url} alt='' />
            <div>
              <b>Email: </b>
              {user.email}
            </div>
            <div>
              <b>First Name: </b>
              {user.first_name}
            </div>
            <div>
              <b>Last Name: </b>
              {user.last_name}
            </div>
            <div>
              <b>Birthday: </b>
              {user.birthday}
            </div>
            <button onClick={() => handleUpdateUser(user)}>
              <i className='fa-regular fa-pen-to-square'></i>
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>
              <i className='fa-regular fa-trash-can'></i>
            </button>
          </div>
        ))}
      </div>
      {showUpdateModal && (
        <div className='update-overlay'>
          <div className='update'>
            <div className='update-container'>
              <div className='update-content'>
                <button className='close' onClick={() => setShowUpdateModal(false)}>
                  <i className='fa-solid fa-x'></i>
                </button>
                <h2 className='update-title'>Update User</h2>
                <form onSubmit={handleSubmit(submit)}>
                  <div className="input-container">
                    <label htmlFor="Image_url">ImageUrl:</label>
                    <input type="text" id="image_url" {...register("image_url")} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register("email")} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" {...register("password")} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" {...register("first_name")} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" {...register("last_name")} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="birthday">Birthday:</label>
                    <input type="date" id="birthday" {...register("birthday")} />
                  </div>
                  <button className='sumit'>Submit</button>
                  <button className='clear' onClick={clear} type="button">Clear</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className='Confirm-overlay'>
          <div className='anuncio'>
            <div className='anuncio-container'>
              <div className='anuncio-content'>
                <button className='close-button' onClick={handleCancelDelete}>
                  <i className='fa-solid fa-x'></i>
                </button>
                <h2 className='modal-title'>Confirm Deletion</h2>
                <p>Are you sure you want to delete this user?</p>
                <div className='anuncio-buttons'>
                  <button onClick={handleConfirmDelete}>Yes</button>
                  <button onClick={handleCancelDelete}>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
