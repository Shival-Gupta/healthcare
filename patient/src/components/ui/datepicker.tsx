import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerApp({ selected, onChange }: { selected: Date | null; onChange: (date: Date | null) => void }) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
    />
  );
}

export default DatePickerApp;
