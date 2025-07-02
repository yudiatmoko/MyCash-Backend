function getOutletInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .map(word => word[0])
    .join('')
    .toLowerCase();
}

function formatDateToId(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function generateTransactionId(outletName, date, sequence) {
  const initials = getOutletInitials(outletName);
  const datePart = formatDateToId(date);
  const seqPart = String(sequence).padStart(4, '0');
  return `${initials}-${datePart}-${seqPart}`;
}

export default generateTransactionId;
