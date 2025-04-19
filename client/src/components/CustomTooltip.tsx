import React from 'react';
import { CustomTooltipProps } from '../features/diagnostics/types';


export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="text-gray-700"><b>{payload[0].payload.type}</b></p>
        <p className="text-gray-600">Severity: {payload[0].payload.severity}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
