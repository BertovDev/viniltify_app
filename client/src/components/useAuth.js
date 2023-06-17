import React, { useEffect, useState } from 'react'
import axios from "axios"


export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // const PORT = process.env.PORT || "http://localhost:3001";

    const LOGIN_URI = process.env.NODE_ENV !== "production" ? "http://localhost:3001" : "http://localhost:3001";

    useEffect(() => {
        axios.post(`${LOGIN_URI}/login`, {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }).catch(() => {
            window.location = "/"
        })

    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
          axios
            .post(`${LOGIN_URI}/refresh`, {
              refreshToken,
            })
            .then(res => {
              setAccessToken(res.data.accessToken)
              setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
              window.location = "/"
            })
        }, (expiresIn - 60) * 1000)
    
        return () => clearInterval(interval)
      }, [refreshToken, expiresIn])

    return accessToken
}
