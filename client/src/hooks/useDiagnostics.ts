import { useState, useEffect, useCallback } from 'react';
import { Diagnostic, DiagnosticCreate } from '../features/diagnostics/types';
import { createDiagnostic, fetchDiagnostics } from '../api';

export function useDiagnostics(initialFromDate: string) {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState(initialFromDate);

  const loadDiagnostics = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDiagnostics(fromDate);
      setDiagnostics(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load diagnostics. Please try again later.');
      setLoading(false);
      console.error(err);
    }
  }, [fromDate]);

  useEffect(() => {
    loadDiagnostics();
  }, [loadDiagnostics]);

  const addDiagnostic = useCallback(async (diagnostic: DiagnosticCreate) => {
    const result = await createDiagnostic(diagnostic);
    const newDiagnostic = { diagnostic_id: result.diagnostic_id, ...diagnostic };
    setDiagnostics((prev) => [newDiagnostic, ...prev]);
    return newDiagnostic;
  }, []);

  return {
    diagnostics,
    loading,
    error,
    fromDate,
    setFromDate,
    reload: loadDiagnostics,
    addDiagnostic,
  };
}
