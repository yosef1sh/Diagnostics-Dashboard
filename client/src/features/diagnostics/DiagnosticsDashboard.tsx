import React, { useState, useMemo, useCallback } from 'react';
import { useDiagnostics } from '../../hooks/useDiagnostics';
import { FusionTrendGraph } from './FusionTrendGraph';
import { DiagnosticsTable } from './DiagnosticsTable';
import { AddDiagnosticForm } from './AddDiagnosticForm';
import { Plus } from 'lucide-react';
import { DiagnosticCreate } from './types';
import Modal from '../../components/Modal';
import { groupDiagnosticsByDate } from './utils';

const DEFAULT_FROM_DATE = '2025-04-01T18:47:40.387Z';

const DiagnosticsDashboard: React.FC = () => {
  const { diagnostics, loading, error, fromDate, setFromDate, addDiagnostic } = useDiagnostics(DEFAULT_FROM_DATE);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAdd = useCallback(async (diagnostic: DiagnosticCreate) => {
    setFormError(null);
    try {
      await addDiagnostic(diagnostic);
      setShowForm(false);
    } catch {
      setFormError('Failed to create diagnostic. Please try again.');
    }
  }, [addDiagnostic]);

  const groupedDiagnostics = useMemo(() => groupDiagnosticsByDate(diagnostics), [diagnostics]);

  return (
    <div className="p-4 max-w-full mx-auto">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      {formError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{formError}</p>
        </div>
      )}
      <FusionTrendGraph
        groupedDiagnostics={groupedDiagnostics}
        loading={loading}
        setFromDate={setFromDate}
        fromDate={fromDate}
      />
      <div className="bg-grey-100 rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-medium">Diagnostics</h2>
          <button
            className="w-36 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-600 flex items-center justify-center gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={16} />
            <span>Add new</span>
          </button>
        </div>
        {showForm && (
          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <AddDiagnosticForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
          </Modal>
        )}
        <DiagnosticsTable groupedDiagnostics={groupedDiagnostics} loading={loading} />
      </div>
    </div>
  );
};

export default DiagnosticsDashboard;
