import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import {userPastBookings, userUpcomingBookings, bookingsListingInfo} from './util/selectors';
import {fetchBookings} from './actions/booking_actions';
import moment from 'moment';


document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser){
    const preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      },
      session: {id: window.currentUser.id}
    }
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, root);

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.userPastBookings = userPastBookings;
  window.userUpcomingBookings = userUpcomingBookings;
  window.fetchBookings = fetchBookings;
  window.bookingListInfo = bookingsListingInfo;
  window.moment = moment;
 
})