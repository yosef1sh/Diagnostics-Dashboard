import React, { useState, useEffect, useMemo } from 'react';
import { DiagnosticsTableProps } from './types';

export const DiagnosticsTable: React.FC<DiagnosticsTableProps> = ({ groupedDiagnostics, loading }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const sortedDateKeys = useMemo(
    () => Object.keys(groupedDiagnostics).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
    [groupedDiagnostics]
  );
  const visibleDateKeys = useMemo(
    () => sortedDateKeys.slice(0, visibleCount),
    [sortedDateKeys, visibleCount]
  );

  useEffect(() => {
    const handleWindowScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, sortedDateKeys.length));
      }
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [sortedDateKeys.length]);

  useEffect(() => {
    setVisibleCount(10); 
  }, [groupedDiagnostics]);

  if (loading) {
    return <div className="p-4 text-center">Loading diagnostics...</div>;
  }
  return (
    <div className="overflow-x-auto bg-gray-100 rounded-lg flex justify-center">
      <table className="w-full divide-y-8 rounded-lg  divide-gray-100">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnostic date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fault type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
          </tr>
        </thead>
        <tbody className="bg-white rounded-lg  divide-y-8 divide-gray-100">
          {visibleDateKeys.map(key =>
            groupedDiagnostics[key].map((diagnostic) => (
              <tr className='gray-200 rounded-lg  p-4' key={diagnostic.diagnostic_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{diagnostic.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{diagnostic.severity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
