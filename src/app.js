import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import AjuteurContainer from "./user/ajuteur-container";

class App extends React.Component {

    state = {
        userRole: "",
    }
    
    reload(){   
        window.location.reload(false);
    }
    handleCallback = (role) => {
        this.setState({userRole: role})
    }

    render() {
        let {userRole} = this.state;
        return (
            <div className={styles.back}>
            <Router>
                <div>
                   <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <AjuteurContainer />}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
