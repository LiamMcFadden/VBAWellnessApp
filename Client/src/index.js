import React from 'react';
import { AppRouter } from './AuthApp';
import { AuthProvider } from './components/Authentication/auth';
// import BottomTabs from './navigation/app-navigator';






const App = () => {


    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
};

export default App;