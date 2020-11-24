import React from 'react';
import {createBooking} from '../../util/bookings_api_util';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './booking_calendar_custom.css'
import GuestDrop from './guest_drop';


class BookingForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {...props.booking, guestDropOn: false, showTotal: false};
    this.changeGuests = this.changeGuests.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCosts = this.updateCosts.bind(this);
  }


  changeGuests(val) {
    if (this.state.numGuests === 4 && val === 1) {
      alert("These homes are too tiny. You might want to try the real Airbnb!")
      return
    }
    this.setState({ numGuests: this.state.numGuests + val })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.currentUser) {
      this.props.openModal("login");
      return 
    }
    const listingId = this.props.match.params.listingId;
    const booking = {
      renter_id: this.props.currentUser,
      start_date: this.state.startDate.format('YYYY-MM-DD'),
      end_date: this.state.endDate.format('YYYY-MM-DD'),
      total_cost: this.state.totalCost,
      num_guests: this.state.numGuests
    }
    debugger
    createBooking(listingId, booking).then( (response) =>{
      alert(response)
    })
    
  }

  toggleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.guestDropOn && !e.target.classList.contains("drop")) {
      this.setState({ guestDropOn: false }, () => {
        document.removeEventListener("click", this.toggleDrop)
      })
    }
    else {
      this.setState({ guestDropOn: true }, () => {
        document.addEventListener("click", this.toggleDrop)
      })
    }
  }

  updateCosts(){
    if (this.state.focusedInput) {
      this.setState({showTotal: false})
    }
    else if (this.state.startDate === null || this.state.endDate === null){
      return
    }
    else {
      const nights = this.state.endDate.diff(this.state.startDate, 'days');
      const subtotal = (this.props.price * nights);
      const serviceFee = (this.props.price * nights * .12);
      const totalCost = subtotal + serviceFee;
      this.setState({
        nights,
        subtotal, 
        serviceFee,
        totalCost,
        showTotal: true
      })
    }
  }


  render(){

    const { numGuests, guestDropOn, nights } = this.state;
    const guestString = numGuests === 1 ? "guest" : "guests";
    const nightString = nights === 1 ? "night" : "nights";

    return (
      <div id="booking-form-wrapper">
        <form id="booking-form" onSubmit={this.handleSubmit}>
          <h3><strong>${this.props.price}</strong> / night</h3>
        
          <section className="booking-inputs">
            <div className="calendars">
              <label id="checkin-label">Check in</label>
              <label id="checkout-label">Check out</label>
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="search_start" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="search_end" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput =>{this.setState({ focusedInput }, this.updateCosts)}} // PropTypes.func.isRequired,
                startDatePlaceholderText="Add dates"
                endDatePlaceholderText="Add dates"
                noBorder={false}
                hideKeyboardShortcutsPanel={true}
                anchorDirection="right"
                block
                readOnly
                daySize={50}
              />
            </div>
            <div className="guest-options" onClick={this.toggleDrop}>
              <label id="guests-label">Guests</label>
              <h3 className="num-guests">{`${numGuests} ${guestString}`}</h3>
            </div>
            </section>
            {!guestDropOn ? null : (
              <GuestDrop changeGuests={this.changeGuests} numGuests={numGuests} type="booking" capacity={this.props.capacity} />
            )}

          <input type="submit" value="Reserve"/>
          <p>You won't be charged yet</p>
          { !this.state.showTotal ? null : (
            <div id="cost-info">
                <div className= "price-bar-1">
                    <div className="nightly-price">
                    <p>{`$${this.props.price} \u00D7 ${nights} ${nightString}`} </p>
                    <p>${this.state.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="service-fee">
                    <p>Service fee</p>
                    <p>${this.state.serviceFee.toFixed(2)}</p>
                    </div>
              </div>
                <div className="total">
                  <strong>Total</strong>
                  <strong>${this.state.totalCost.toFixed(2)}</strong>
                </div>
            </div>  
          )}
        </form>
      </div>
    )
  }
}

export default BookingForm;