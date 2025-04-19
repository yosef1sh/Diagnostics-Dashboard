import React from 'react';
import { DatePickerProps } from './types';

export const FusionTrendDatePicker: React.FC<DatePickerProps> = ({ fromDate, setFromDate }) => (
  <div className="flex items-center">
    <input
      type="date"
      className="text-sm mr-2"
      value={fromDate ? fromDate.slice(0, 10) : ''}
      max={new Date().toISOString().slice(0, 10)}
      onChange={e => {
        const date = e.target.value;
        setFromDate(new Date(date).toISOString());
      }}
    />
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);
