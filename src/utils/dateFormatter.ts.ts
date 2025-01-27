import moment from "moment";

/**
 * Formats a date string into a MM/DD/YYYY format
 * @param dateString The date string to format
 * @returns The formatted date in MM/DD/YYYY
 */
export const formatDate = (dateString: string) => {
  return moment(dateString).format("LL");
};
