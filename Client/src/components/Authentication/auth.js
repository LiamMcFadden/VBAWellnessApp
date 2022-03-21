import React, { createContext, useEffect, useMemo, useReducer } from 'react';

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false
});

// Auth State
// Will likely need to update later to include
// Errors, tokens, and other info from server
const authState = {
    isLoading: false,
    isAuthenticated: false
}

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        (prev, action) => {
            console.log('👈 prev: ', prev)
            console.log('🧚 next: ', action)
            if (action.type === 'SIGNIN') {
                return ({
                    isLoading: false,
                    isAuthenticated: true
                })
            } else if (action.type === 'SIGNOUT') {
                return ({
                    isLoading: false,
                    isAuthenticated: false
                })
            }
        }, authState
    )

    /**
     * ** TODO IMPORTANT **
     * 
     * On first render, wil likely want to check if token
     * exists in some secure store (figure out how this works in React Native)
     * and if it is a valid token
     */
    useEffect(() => {

    }, [])

    /**
     * Since authentication will likely be a lengthy process
     * use memoized functions.  This also works well with
     * React context.
     * 
     * ** TODO IMPORTANT **
     * 
     * Need to add token fetch from API as well as 
     * Creating account methods
     * 
     * Sign In
     *      Send username and password to API and retrieve token
     *      Store token in state --> Need to add this to state JSON
     * 
     * Sign Out
     *      Send delete token and return to sign in page
     *      Since this is the only option that requires returning
     *      to login page will likely be able to store this
     *      in true-false value in state
     * 
     * Sign Up
     *      This will at the least require the same amount as Sign In
     *      However this can change depending on how sign up is implemented later
     *      Goal might be to have Sign up only called on completion, and handle
     *      the rest in its own component
     * 
     */
    authContextProvider = useMemo(() => ({
        signIn: async (data) => {
            dispatch({
                type: 'SIGNIN'
            });
        },
        signOut: async (data) => {
            dispatch({
                type: 'SIGNOUT'
            })
        },
        signUp: async (data) => {
            dispatch({
                type: 'SIGNIN'
            })
        }
    }), [])

    return (

        <AuthContext.Provider value={{ functions: authContextProvider, authData: state }}>
            {children}
        </AuthContext.Provider>
    )
}