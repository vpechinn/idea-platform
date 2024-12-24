import React, { useState } from 'react';

import styles from './styles.module.scss';

interface FilterProps {
    onFilterChange: (transfers: number[]) => void;
    onSortByPrice: () => void;
    onCurrencyChange: (currency: 'RUB' | 'USD' | 'EUR') => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onSortByPrice, onCurrencyChange }) => {
    const [selectedCurrency, setSelectedCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
    const [selectedTransfers, setSelectedTransfers] = useState<number[]>([]);
    
    const handleCurrencyChange = (currency: 'RUB' | 'USD' | 'EUR') => {
        setSelectedCurrency(currency);
        onCurrencyChange(currency); // передаем выбранную валюту в родительский компонент
    };

    const handleTransferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);

        if (value === -1) {
            setSelectedTransfers([]);
            onFilterChange([]); // Сбрасываем фильтрацию
        } else {
            setSelectedTransfers(prev => {
                const updatedTransfers = event.target.checked
                    ? [...prev, value]  // Добавляем пересадку в список
                    : prev.filter(item => item !== value);  // Убираем пересадку из списка
                onFilterChange(updatedTransfers); // Передаем обновленный список в родительский компонент
                return updatedTransfers;
            });
        }
    };

    return (
            <div className={styles.filter}>
                <div>
                    <button onClick={() => handleCurrencyChange('RUB')}
                            className={selectedCurrency === 'RUB' ? 'active' : ''}>RUB
                    </button>
                    <button onClick={() => handleCurrencyChange('USD')}
                            className={selectedCurrency === 'USD' ? 'active' : ''}>USD
                    </button>
                    <button onClick={() => handleCurrencyChange('EUR')}
                            className={selectedCurrency === 'EUR' ? 'active' : ''}>EUR
                    </button>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            value={-1}  // Используем специальное значение для "Все"
                            checked={selectedTransfers.length === 0}  // Если нет выбранных фильтров, то "Все" активно
                            onChange={handleTransferChange}
                        />
                        Все
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={0}
                            checked={selectedTransfers.includes(0)}
                            onChange={handleTransferChange}
                        />
                        Без пересадок
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={1}
                            checked={selectedTransfers.includes(1)}
                            onChange={handleTransferChange}
                        />
                        1 пересадка
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={2}
                            checked={selectedTransfers.includes(2)}
                            onChange={handleTransferChange}
                        />
                        2 пересадки
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value={3}
                            checked={selectedTransfers.includes(3)}
                            onChange={handleTransferChange}
                        />
                        3 пересадки
                    </label>
                </div>

                <button onClick={onSortByPrice}>Сортировать по цене</button>
            </div>
    );
};

export default Filter;

