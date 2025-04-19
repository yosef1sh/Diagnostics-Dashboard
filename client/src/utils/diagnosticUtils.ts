import { Diagnostic } from '../features/diagnostics/types/diagnostic';

export function groupDiagnosticsByDate(data: Diagnostic[]) {
  return data.reduce((acc, diagnostic) => {
    const dateKey = new Date(diagnostic.created_at).toISOString().split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(diagnostic);
    return acc;
  }, {} as Record<string, Diagnostic[]>);
}
