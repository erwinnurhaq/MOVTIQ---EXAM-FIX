import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.scss';

//redux
import { useDispatch } from 'react-redux';
import { fetchMovies, getLocal } from './redux/allAction';

//components
import { ProtectedRoute } from './ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WarningDev from './pages/WarningDev';
import WarningPage from './pages/WarningPage';
import Registration from './pages/Registration';
import MovieManagement from './pages/MovieManagement';
import TransactionHistory from './pages/TransactionHistory';
import Movies from './pages/Movies';
import SeatReservation from './pages/SeatReservation';
import UserCart from './pages/UserCart';
import UserTickets from './pages/UserTickets';
import Profile from './pages/Profile';

function App() {

  const dispatch = useDispatch();

  dispatch(fetchMovies());
  dispatch(getLocal());


  return (
    <Router>
      <div className="App-container">
        <Navbar />
        <div className="content-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/registration" component={Registration} />
            <ProtectedRoute exact path="/moviemanagement" component={MovieManagement} />
            <ProtectedRoute exact path="/transactionhistory" component={TransactionHistory} />
            <Route path="/movies" component={Movies} />
            <Route path="/seatreservation/id=:selected" component={SeatReservation} />
            <Route path="/usercart" component={UserCart} />
            <Route path="/usertickets" component={UserTickets} />
            <Route path="/profile" component={Profile} />
            <Route path='/warningdev' component={WarningDev} />
            <Route path='*' component={WarningPage} />
          </Switch>
        </div>
      </div>
    </Router >
  );
}


export default App;
