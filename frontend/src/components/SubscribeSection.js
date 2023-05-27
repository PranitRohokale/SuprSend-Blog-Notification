import React, { useState } from 'react';
import axios from 'axios';

const SubscribeSection = () => {

  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email?.trim()?.length <= 0) return

    axios.post(`${process.env.REACT_APP_BACKEND_API}/api/v1/subscribe`, { email: email?.trim() })
      .then(response => {
        const { success, subscribers } = response.data;
        if (success) {
          console.log(subscribers);
          alert("You Suscribed!")
        } else {
          console.log('An error occurred while fetching subscribers');
        }
        setEmail("")
      })
      .catch(error => {
        console.error(error);
        console.log('An error occurred while making the request');
      });
  }

  return (
    <>
      <div className="jumbotron jumbotron-fluid bg-light">
        <div className="container">
          <h1 className="display-4 text-center">Welcome To Suprsend Blog</h1>
          <p className="lead text-center">This is a modified jumbotron that occupies the entire horizontal space of its parent.SuprSend is a notification stack as a service platform for easily creating, managing and delivering notifications to your end users. </p>
        </div>
        <div class="container">
          <form>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-control" id="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubscribeSection;
