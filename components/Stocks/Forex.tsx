'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './forex.module.css'; // Import CSS module for styling

const ForexRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "54a14ec157cd41afa1ef8d5228c2e3b2"; // Replace with your Twelve Data API key
  const currencies = [
    { symbol: "USD/INR", name: "USD to INR" },
    { symbol: "EUR/INR", name: "EUR to INR" },
    { symbol: "GBP/INR", name: "GBP to INR" },
    { symbol: "CNY/INR", name: "CNY to INR" },
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const responses = await Promise.all(
          currencies.map((currency) =>
            axios.get(
              `https://api.twelvedata.com/exchange_rate?symbol=${currency.symbol}&apikey=${API_KEY}`
            )
          )
        );
        const fetchedRates: any = responses.map((response, index) => ({
          ...response.data,
          name: currencies[index].name,
        }));
        setRates(fetchedRates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className={`d-flex align-items-center ${styles.tickerContainer}`}>
      <div className={`badge bg-danger ${styles.liveBadge}`}>LIVE</div>
      <div className={`d-flex ${styles.tickerContent}`}>
        {rates.map((rate:any, index) => (
          <div key={index} className={`d-flex align-items-center ${styles.tickerItem}`}>
            <span className={styles.currencyName}>{rate.name}</span>
            <span
              className={`mx-2 ${
                parseFloat(rate.rate_change) > 0 ? styles.positive : styles.negative
              }`}
            >
              {parseFloat(rate.rate_change) > 0 ? "▲" : "▼"} {rate.rate}
            </span>
            {index < rates.length - 1 && <span className={styles.separator}>|</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForexRates;
