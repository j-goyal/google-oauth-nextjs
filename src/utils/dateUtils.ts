export const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  });
};

export const formatDateTime = (dateStr?: string | null): string => {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
};
