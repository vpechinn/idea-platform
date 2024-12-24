import React, { useState, useEffect } from 'react';
import TicketList from './components/TicketList';
import Filter from './components/Filter';
import ticketsData from './tickets.json';
import { Ticket } from './types';

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [selectedTransfers, setSelectedTransfers] = useState<number[]>([]);

  useEffect(() => {
    setTickets(ticketsData);
    setFilteredTickets(ticketsData);
  }, []);

  const handleCurrencyChange = (currency: 'RUB' | 'USD' | 'EUR') => {
    setCurrency(currency);
    convertCurrency(currency);
  };

  const convertCurrency = (currency: 'RUB' | 'USD' | 'EUR') => {
    const conversionRates = { RUB: 1, USD: 0.013, EUR: 0.012 };
    const rate = conversionRates[currency];
    const updatedTickets = tickets.map(ticket => ({
      ...ticket,
      price: Math.round(ticket.price * rate),
    }));
    setFilteredTickets(updatedTickets);
  };

  const handleFilterChange = (transfers: number[]) => {
    setSelectedTransfers(transfers);

    if (transfers.length === 0 || transfers.includes(-1)) {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(ticket =>
          transfers.includes(ticket.transfers)
      );
      setFilteredTickets(filtered);
    }
  };

  const handleSortByPrice = () => {
    const sorted = [...filteredTickets].sort((a, b) => a.price - b.price);
    setFilteredTickets(sorted);
  };

  return (
      <div style={{display: 'flex'}}>
        <Filter
            onFilterChange={handleFilterChange}
            onSortByPrice={handleSortByPrice}
            onCurrencyChange={handleCurrencyChange}
        />
        <TicketList tickets={filteredTickets} currency={currency} />
      </div>
  );
};

export default App;



