import { useState, useEffect, useCallback } from 'react';
import { Diagnostic, DiagnosticCreate } from '../features/diagnostics/types/diagnostic';

const API_URL = 'http://localhost:8000';

async function fetchDiagnostics(fromDate?: string): Promise<Diagnostic[]> {
  const url = new URL(`${API_URL}/insights`);
  if (fromDate) url.searchParams.append('from_date', fromDate);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch diagnostics');
  return res.json();
}


async function createDiagnostic(data: DiagnosticCreate): Promise<{ diagnostic_id: string }> {
  const res = await fetch(`${API_URL}/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create diagnostic');
  return res.json();
}

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

  const addDiagnostic = async (diagnostic: DiagnosticCreate) => {
    const result = await createDiagnostic(diagnostic);
    const newDiagnostic = { diagnostic_id: result.diagnostic_id, ...diagnostic };
    setDiagnostics((prev) => [newDiagnostic, ...prev]);
    return newDiagnostic;
  };

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
