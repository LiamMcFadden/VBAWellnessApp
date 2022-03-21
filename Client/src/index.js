import React, { useState } from 'react';
import { AuthApp } from './AuthApp';
import { AuthProvider } from './components/Authentication/auth';
// import BottomTabs from './navigation/app-navigator';






const App = () => {
    // const context = AuthContext;
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <AuthProvider>
            <AuthApp />
        </AuthProvider>
    )
};

export default App;