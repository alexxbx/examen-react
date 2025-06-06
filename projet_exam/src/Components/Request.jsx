import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Request({ apiUrl }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const apiData = response.data;
                const fetchedData = apiData.member || apiData['hydra:member'] || [];
                setData(fetchedData);
            })
            .catch(error => {
                console.error('Erreur:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiUrl]);

    return { data, loading, error };
}

export default Request;