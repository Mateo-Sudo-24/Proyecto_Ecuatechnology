// helpers/normalizeEmail.js
export function normalizeEmail(email) {
  const [local, domain] = email.trim().split("@");
  const normalizedLocal = local.replace(/\./g, ""); // eliminar puntos
  return `${normalizedLocal}@${domain}`;
}
