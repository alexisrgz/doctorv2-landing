/** Datos operativos del consultorio: pagos, instalaciones y avisos. */
export const practice = {
  emergencyNotice: "Este consultorio no es servicio de urgencias. En una urgencia médica llama al 911.",
  payments: {
    title: "Formas de pago y seguros",
    methods: ["Efectivo", "Tarjeta de débito y crédito", "Transferencia bancaria"],
    receipt: "Se entrega recibo de honorarios en cada consulta. Si necesitas factura, pídela al agendar.",
    insurance:
      "El consultorio no tiene convenio directo con aseguradoras. Con tu recibo puedes solicitar el reembolso; consulta con tu aseguradora qué cubre tu póliza.",
  },
  parking: {
    title: "Estacionamiento",
    text: "Dos cajones para pacientes frente al consultorio y lugares en la calle sobre la avenida.",
  },
  accessibility: {
    title: "Accesibilidad",
    items: ["Entrada a nivel de calle con rampa", "Consultorio y sala de espera en planta baja", "Baño accesible"],
  },
  /** Referencia para llegar. */
  directionsHint: "A media cuadra de la glorieta, frente a una farmacia.",
} as const;
