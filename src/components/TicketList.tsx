import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {Button} from '@mui/material';
import { Ticket } from '../types';
import styles from './styles.module.scss';


interface TicketListProps {
    tickets: Ticket[];
    currency: 'RUB' | 'USD' | 'EUR';
}

const TicketList: React.FC<TicketListProps> = ({ tickets, currency }) => {
    const formatPrice = (price: number, currency: 'RUB' | 'USD' | 'EUR') => {
        switch (currency) {
            case 'USD':
                return `$${price}`;
            case 'EUR':
                return `€${price}`;
            default:
                return `${price}₽`;
        }
    };

    return (
        <div className={styles.tickets}>
            {tickets.length === 0 ? (
                <p>Билеты не найдены</p>
            ) : (
                tickets.map(ticket => (
                    <div key={ticket.id} className={styles.tickets_item}>
                       <div className={styles.tickets_left}>
                           <p>Turkish Avialines</p>
                           <Button variant="contained" className={styles.tickets_price}>Купить за: {formatPrice(ticket.price, currency)}</Button>
                       </div>
                        <div className={styles.tickets_info}>
                            <p className={styles.tickets_departure}>Вылет: {format(new Date(ticket.departure), "HH:mm dd MMMM yyyy года, E", { locale: ru })}</p>
                            <p className={styles.tickets_transfer}>Пересадки: {ticket.transfers}</p>
                            <p className={styles.tickets_arrive}>Прилет: {format(new Date(ticket.arrival), "HH:mm dd MMMM yyyy года, E", { locale: ru })}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TicketList;

