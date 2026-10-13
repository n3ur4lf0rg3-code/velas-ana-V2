export const BANK = {
  name: "BBVA México",
  holder: "Ana Martínez Rodríguez",
  clabe: "012180015678901234",
  clabeDisplay: "012 180 0156 7890 1234",
  account: "0156789012",
  accountDisplay: "0156 7890 12",
} as const;

export const STORE = {
  name: "Velas Ana",
  email: "info.velas.ana@gmail.com",
  city: "Ciudad de México y área metropolitana",
  whatsapp: "56 6857 4383",
  /** Solo dígitos con código de país (México 52) */
  whatsappE164: "525668574383",
  payment: "contra_entrega" as const,
  deliveryNote:
    "Entrega únicamente en CDMX y área metropolitana. Fecha, hora y punto de encuentro se acuerdan al confirmar el pedido.",
} as const;
