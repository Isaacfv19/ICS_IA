const moneda = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export const formatoMoneda = (valor: number): string => moneda.format(valor);
