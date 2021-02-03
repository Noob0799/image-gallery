import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Upload from './components/imageupload/Upload';
import Display from './components/imagedisplay/Display';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/upload" component={Upload}/>
        <Route exact path="/view" component={Display}/>
      </div>
    </Router>
  );
}

export default App;
