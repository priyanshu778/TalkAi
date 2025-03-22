import React, { createContext, useState } from 'react'
import run from '../api'
export const contextData = createContext();

function UserContext({ children }) {
    const [input, setInput] = useState("")
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])

    function newChat() {
        setShowResult(false)
        setLoading(false)
    }

    async function sent(input) { 
        setResultData("")
        setShowResult(true)
        setRecentPrompt(input)
        setLoading(true)
        setPrevPrompt(previos => [...previos, input])
        let response = await run(input) // Uses updated API logic
        setResultData(response.split("**") && response.split("*"))
        setLoading(false)
        setInput("")
    }

    const data = {
        input,
        setInput,
        sent,
        loading,
        setLoading,
        showResult,
        setShowResult,
        resultData,
        setResultData,
        recentPrompt,
        prevPrompt,
        newChat
    }

    return (
        <>
            <contextData.Provider value={data}>
                {children}
            </contextData.Provider>
        </>
    )
}

export default UserContext
