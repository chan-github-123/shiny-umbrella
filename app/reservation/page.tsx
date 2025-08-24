"use client";

import React, { useState, useEffect } from 'react';
import { getAvailableTimeSlots, TimeSlot } from '@/lib/firestoreService';

const ReservationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [requests, setRequests] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation submission logic here
    console.log('Reservation Submitted:', {
      name,
      contact,
      email,
      consultationType,
      date: selectedDate, // Use selectedDate here
      selectedTimeSlotId: time, // Use the time state to store the selected slot ID for now
      time,
      requests,
    });
    // Reset form or show confirmation message
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
    setTime(''); // Reset selected time when date changes
    setAvailableSlots([]); // Clear previous slots

    if (selectedDate) {
      setLoadingSlots(true);
      try {
        const slots = await getAvailableTimeSlots(selectedDate);
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching time slots:", error);
        // Optionally show an error message to the user
      } finally {
        setLoadingSlots(false);
      }
    }
  };

  // Basic styling (can be moved to a CSS module)
  const brightBlueStyle: React.CSSProperties = {
    color: '#007bff', // Example bright blue
    borderColor: '#007bff',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const slotButtonStyle: React.CSSProperties = {
    padding: '8px 12px',
    margin: '5px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: '#007bff',
    cursor: 'pointer',
  };

  const selectedSlotStyle: React.CSSProperties = {
    ...slotButtonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#007bff' }}>온라인 예약</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="contact" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>연락처:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="연락처를 입력하세요 (예: 010-1234-5678)"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="consultationType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>컨설팅 종류:</label>
          <select
            id="consultationType"
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          >
            <option value="">선택하세요</option>
            <option value="생기부">생기부 컨설팅 (고등학생)</option>
            <option value="자소서">자소서 컨설팅 (중학생)</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>예약 날짜:</label>
          <input
            type="text" // Simple text input for now
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="예약 날짜를 입력하세요 (예: 2023-10-27)"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </div>

        {loadingSlots && <div>예약 가능한 시간을 불러오는 중...</div>}

        {!loadingSlots && availableSlots.length > 0 && (
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>예약 가능한 시간:</label>
            <div>
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  style={slot.id === time ? selectedSlotStyle : slotButtonStyle} // Compare with slot.id
                  onClick={() => setTime(slot.id)} // Store the slot ID in the time state
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keep the time input for manual entry fallback or if no slots */}
        {/* <div>
          <label htmlFor="time" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>예약 시간 (선택된 시간):</label>
          <input
            type="text"
            id="time"
            value={time}
            readOnly // Make it read-only since time is selected from slots
            placeholder="예약 시간을 입력하세요 (예: 14:00)"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </div>

        <div>
          {/* Existing time input field is now less crucial if slots are shown */}
          <label htmlFor="requests" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>요청 사항 (선택 사항):</label>
          <textarea
            id="requests"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            placeholder="추가적인 요청 사항을 입력하세요"
            rows={4}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          ></textarea>
        </div>

        <button type="submit" style={buttonStyle}>
          예약 요청하기
        </button>
      </form>
    </div>
  );
};

export default ReservationPage;