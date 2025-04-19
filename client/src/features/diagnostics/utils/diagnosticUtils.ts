import { z } from "zod";
import { Diagnostic, SelectOption, Severity } from "../types/diagnostic";

export function groupDiagnosticsByDate(data: Diagnostic[]) {
  return data.reduce((acc, diagnostic) => {
    const dateKey = new Date(diagnostic.created_at).toISOString().split("T")[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(diagnostic);
    return acc;
  }, {} as Record<string, Diagnostic[]>);
}

export function getSeverityValue(severity: Severity) {
  switch (severity) {
    case "critical":
      return 3;
    case "alarm":
      return 2;
    case "healthy":
      return 1;
    default:
      return 0;
  }
}

export function getSeverityColor(severity: Severity) {
  switch (severity) {
    case "critical":
      return "#FF0000";
    case "alarm":
      return "#FFA500";
    case "healthy":
      return "#00FF00";
    default:
      return "#999999";
  }
}

export const faultTypeOptions = [
  { value: "bearing", label: "Bearing" },
  { value: "gear", label: "Gear" },
  { value: "motor", label: "Motor" },
] as SelectOption<string>[];

export const severityOptions = [
  { value: "healthy", label: "Healthy" },
  { value: "alarm", label: "Alarm" },
  { value: "critical", label: "Critical" },
] as SelectOption<string>[];

export const diagnosticSchema = z.object({
  created_at: z.string().min(1, "Date is required"),
  type: z.enum(["bearing", "gear", "motor"], {
    required_error: "Fault type is required",
  }),
  severity: z.enum(["healthy", "alarm", "critical"], {
    required_error: "Severity is required",
  }),
});

export function processTrendDataFromGrouped(
  groupedByDate: Record<string, Diagnostic[]>
) {
  const trend = Object.entries(groupedByDate).map(([date, diagnostics]) => {
    const sortedDiagnostics = [...diagnostics].sort(
      (a, b) =>
        getSeverityValue(a.severity as Severity) -
        getSeverityValue(b.severity as Severity)
    );
    const mostSevere = sortedDiagnostics[0];
    const displayDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return {
      date: displayDate,
      fullDate: date,
      severity: mostSevere.severity,
      type: mostSevere.type,
    };
  });
  return trend.sort(
    (a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
  );
}