import React, { useState, useEffect, useCallback } from 'react';
import './Countdown.css';
import { Button, Modal, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Countdown = () => {
    const [remainingTime, setRemainingTime] = useState({
        days: 1,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [targetDate, setTargetDate] = useState(dayjs(new Date().getTime() + 1000 * 60 * 60 * 24));
    const [openModal, setOpenModal] = useState(false);
    const [newDate, setNewDate] = useState(dayjs(new Date()));
    const today = dayjs(new Date().getTime() + 1000 * 60 * 60 * 24);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            let days, hours, minutes, seconds;

            if (isValidNumber(distance)) {
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
            } else {
                days = hours = minutes = seconds = 0;
            }

            setRemainingTime({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(interval);
                setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDate]);

    const handleOpenModal = () => {
        setNewDate(targetDate);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDateChange = (newDate) => {
        setNewDate(new Date(newDate));
    };

    const handleSaveDate = () => {
        setTargetDate(newDate);
        handleCloseModal();
    };

    const isValidNumber = (value) => {
        return !isNaN(value) && isFinite(value);
    };

    const renderCountdown = () => {
        if ((remainingTime.days === 0 && remainingTime.hours === 0 && remainingTime.minutes === 0 && remainingTime.seconds === 0)) {
            return (
                <>
                    <h1 className="time-over">Temps écoulé</h1>
                </>
            )

        }

        const { days, hours, minutes, seconds } = remainingTime;

        return (
            <div className="countdown-wrapper">
                <div className="countdown-digit">
                    <span>{days < 10 ? `0${days}` : days}</span>
                    <p>Jour{days < 2 ? "" : "s"}</p>
                </div>
                <div className="countdown-digit">
                    <span>{hours < 10 ? `0${hours}` : hours}</span>
                    <p>Heure{hours < 2 ? "" : "s"}</p>
                </div>
                <div className="countdown-digit">
                    <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
                    <p>Minute{minutes < 2 ? "" : "s"}</p>
                </div>
                <div className="countdown-digit">
                    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <p>Seconde{seconds < 2 ? "" : "s"}</p>
                </div>

                <div>
                    <Button variant="contained" onClick={handleOpenModal}>
                        Editer la date
                    </Button>
                </div>

                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Edit the date</DialogTitle>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Nouvelle Date"
                                value={newDate}
                                onChange={(newValue) => handleDateChange(dayjs(newValue))}
                                name="date"
                                minDate={today}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <div style={{marginRight: "20px"}}>
                            <Button onClick={handleCloseModal}>Cancel</Button>
                            <Button variant="contained" onClick={handleSaveDate}>
                                Valider
                            </Button>
                        </div>
                    </DialogActions>
                </Dialog>

            </div>
        );
    };

    return (
        <div>
            {renderCountdown()}
        </div>
    );
};

export default Countdown;