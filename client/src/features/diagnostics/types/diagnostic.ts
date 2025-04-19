export interface Diagnostic {
  diagnostic_id: string;
  created_at: string;
  type: string;
  severity: string;
}

export interface DiagnosticCreate {
  created_at: string;
  type: string;
  severity: string;
}

export type Severity = 'healthy' | 'alarm' | 'critical';

export interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: { type: string; severity: Severity } }[];
}

export interface DiagnosticsTableProps {
  groupedDiagnostics: Record<string, Diagnostic[]>;
  loading: boolean;
}

export interface DatePickerProps {
  fromDate: string;
  setFromDate: (date: string) => void;
}

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string> {
  name: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  error?: string;
}

export interface AddDiagnosticFormProps {
  onAdd: (diagnostic: DiagnosticCreate) => Promise<void>;
  onCancel: () => void;
}