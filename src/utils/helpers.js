export const formatDate = (
  date
) => {
  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export const getStatusClass = (
  status
) => {
  switch (status) {
    case "Active":
      return "status-active";

    case "Inactive":
      return "status-inactive";

    case "Completed":
      return "status-completed";

    case "In Progress":
      return "status-progress";

    default:
      return "";
  }
};

export const truncateText = (
  text,
  length = 50
) => {
  if (!text) return "";

  return text.length > length
    ? text.slice(0, length) + "..."
    : text;
};

export const generateInitials = (
  name
) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase();
};