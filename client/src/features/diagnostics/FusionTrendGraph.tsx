import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Diagnostic, Severity } from './types/diagnostic';
import React, { useMemo } from 'react';
import { getSeverityColor, getSeverityValue, processTrendDataFromGrouped } from './utils/diagnosticUtils';
import CustomTooltip from '../../components/CustomTooltip';


export const FusionTrendGraph: React.FC<{
  groupedDiagnostics: Record<string, Diagnostic[]>;
  loading: boolean;
  fromDate: string;
  setFromDate: (date: string) => void;
}> = ({ groupedDiagnostics, loading, fromDate, setFromDate }) => {

  const trendData = useMemo(() => processTrendDataFromGrouped(groupedDiagnostics), [groupedDiagnostics]);
  return (
    <div className="mb-8 bg-gray-100 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
          <h2 className="text-lg font-medium">Fusion trend</h2>
        </div>
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
      </div>
      <div className="h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading data...</div>
          </div>
        ) : trendData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">No data available</div>
          </div>
        ) : (
          <ResponsiveContainer className='bg-white rounded-lg ' width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
              <XAxis dataKey="date" />
              <YAxis hide={true} reversed={true} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={(item: { severity: Severity }) => getSeverityValue(item.severity)}
                activeDot={{ r: 8 }}
                dot={(props: { cx: number; cy: number; payload: { severity: Severity } }) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={getSeverityColor(payload.severity)}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
