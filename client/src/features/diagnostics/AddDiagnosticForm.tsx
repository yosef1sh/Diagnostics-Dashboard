import React, { useState, useCallback } from 'react';
import { AddDiagnosticFormProps, DiagnosticCreate } from './types/diagnostic';
import { Select } from '../../components/Select';
import { diagnosticSchema, faultTypeOptions, severityOptions } from './utils/diagnosticUtils';


export const AddDiagnosticForm: React.FC<AddDiagnosticFormProps> = ({ onAdd, onCancel }) => {
  const [newDiagnostic, setNewDiagnostic] = useState<DiagnosticCreate>({
    created_at: '',
    type: '',
    severity: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const result = diagnosticSchema.safeParse(newDiagnostic);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }
    setSubmitting(true);
    try {
      await onAdd({
        ...newDiagnostic,
        created_at: new Date(newDiagnostic.created_at).toISOString(),
      });
      setNewDiagnostic({ created_at: '', type: '', severity: '' });
      setFormErrors({});
    } finally {
      setSubmitting(false);
    }
  }, [newDiagnostic, onAdd]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDiagnostic(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);


  return (
    <div className="p-4 bg-gray-50 mb-4 flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostic date</label>
            <input
              type="date"
              name="created_at"
              className={`w-full p-2 border-b rounded ${formErrors.created_at ? 'border-red-500' : 'border-gray-300'}`}
              value={newDiagnostic.created_at}
              onChange={handleChange}
            />
            {formErrors.created_at && <p className="text-red-500 text-xs mt-1">{formErrors.created_at}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fault type</label>
            <Select
              name="type"
              value={newDiagnostic.type}
              options={faultTypeOptions}
              onChange={val => setNewDiagnostic(prev => ({ ...prev, type: val }))}
              className={`w-full p-2 border-b rounded ${formErrors.type ? 'border-red-500' : 'border-gray-300'}`}
              error={formErrors.type}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <Select
              name="severity"
              value={newDiagnostic.severity}
              options={severityOptions}
              onChange={val => setNewDiagnostic(prev => ({ ...prev, severity: val }))}
              className={`w-full p-2 border-b rounded ${formErrors.severity ? 'border-red-500' : 'border-gray-300'}`}
              error={formErrors.severity}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="text-gray-600 px-4 py-2 mr-2"
            onClick={() => {
              setFormErrors({});
              setNewDiagnostic({ created_at: '', type: '', severity: '' });
              onCancel();
            }}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-600"
            disabled={submitting}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};