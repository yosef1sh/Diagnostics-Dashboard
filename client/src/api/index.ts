import { Diagnostic, DiagnosticCreate } from "../features/diagnostics/types/diagnostic";

const API_URL = 'http://localhost:8000';

export async function fetchDiagnostics(fromDate?: string): Promise<Diagnostic[]> {
  const url = new URL(`${API_URL}/insights`);
  if (fromDate) url.searchParams.append('from_date', fromDate);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch diagnostics');
  return res.json();
}


export async function createDiagnostic(data: DiagnosticCreate): Promise<{ diagnostic_id: string }> {
  const res = await fetch(`${API_URL}/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create diagnostic');
  return res.json();
}