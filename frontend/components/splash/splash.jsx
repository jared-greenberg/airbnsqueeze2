import React from 'react';
import SplashNavBar from '../nav/splash_nav_bar';
import SearchFormContainer from '../search/search_form_container';
import {clearQuery} from '../../actions/query_actions';

import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Splash extends React.Component{
  
  constructor(props){
    super(props);
    this.searchBy = this.searchBy.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  
  searchBy(location) {
    this.props.clearQuery();
    const query = {location}
    this.props.startQuery(query);
  }

  startSearch(){
    this.props.clearQuery();
    this.props.history.push("/listings")
  }

  render() {
  
    return (
      <>
        <div id="splash-top">
          <SplashNavBar />
          <img id="splash-img" src={window.splashImg}/>
          <SearchFormContainer history={this.props.history} />
          <section className="slogan">
            <h1>Go Tiny</h1>
            <div className="link-wrapper">
              <Link className="splash-index-link" onClick={() => this.props.clearQuery()} to="/listings">Explore tiny stays</Link>
            </div>
          </section>
        </div>
        <section className="location-links">
          <div className="ithaca-link" onClick={() => searchBy("Ithaca, NY")}>
            <img id="ithaca" src={window.ithaca}/>
            <div className="link-text">
              <h3>Ithaca</h3>
              <p>New York</p>
            </div>
          </div>
          <div className="boulder-link" onClick={() => searchBy("Boulder, CO")}>
            <img id="boulder" src={window.boulder}/>
            <div className="link-text">
              <h3>Boulder</h3>
              <p>Colorado</p>
            </div>
          </div>
          <div className="santacruz-link" onClick={() => searchBy("Santa Cruz, CA")}>
            <img id="santacruz" src={window.santaCruz}/>
            <div className="link-text">
              <h3>Santa Cruz</h3>
              <p>California</p>
            </div>
          </div>
        </section>

        <section className="lower-links">
          <h1 id="link-title">Downsize anywhere</h1>
          <div className="categories">
            <div className="category-link" onClick={this.startSearch}>
              <img src={window.luxury}/>
              <h3>Little and Luxurious</h3>
            </div>
            <div className="category-link" onClick={this.startSearch}>
              <img src={window.family}/>
              <h3>Family Fun</h3>
            </div>
            <div className="category-link" onClick={this.startSearch}>
              <img src={window.couples} />
              <h3>Intimate Retreat</h3>
            </div>
            <div className="category-link" onClick={this.startSearch}>  
              <img src={window.unique} />
              <h3>Unique Stays</h3>
            </div>
          </div>
        </section>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startQuery: query => dispatch(startQuery(query)),
  clearQuery: () => dispatch(clearQuery())
})

export default connect(null, mapDispatchToProps)(Splash)