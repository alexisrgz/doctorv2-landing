# Validar con el cliente

Puntos que conviene confirmar con el médico real y con su asesor legal antes de publicar el sitio con datos reales. Todo lo que hoy aparece en el sitio es ficticio.

## Identidad profesional

- [ ] **Cédula profesional**: número real, verificable en el registro oficial de cédulas, y que corresponda al título que se menciona.
- [ ] **Título y especialidad**: el sitio dice "médico general". No anunciar una especialidad (ni usar palabras como "especialista") sin la cédula de especialidad correspondiente.
- [ ] **Formación y trayectoria**: nombres reales de universidad, sede del servicio social, hospitales y diplomados, con fechas. Hoy son inventados.
- [ ] **Visibilidad**: confirmar dónde debe mostrarse la cédula (hoy en Inicio y en El doctor) y si la regulación aplicable pide mostrarla en toda la publicidad.

## Publicidad de servicios de salud

- [ ] Revisar los textos contra la **Ley General de Salud**, su **reglamento en materia de publicidad** y los lineamientos de la autoridad sanitaria que corresponda (COFEPRIS o la autoridad estatal), incluido si se requiere aviso o permiso de publicidad.
- [ ] Confirmar que ningún texto promete resultados, curación ni superioridad sobre otros médicos.
- [ ] Revisar los nombres de los servicios y lo que incluye cada uno; que todo se ofrezca de verdad en el consultorio.

## Testimonios

- [ ] Usar solo testimonios reales, con **consentimiento por escrito** de cada paciente y conforme a la norma de publicidad.
- [ ] Los testimonios deben hablar del trato, no de diagnósticos ni de mejoría de una condición. Los tres actuales son ficticios y deben sustituirse o quitarse.

## Precios

- [ ] Confirmar si se publican precios y cuáles. Los actuales son ficticios.
- [ ] Confirmar qué incluye cada precio (por ejemplo, que el laboratorio se paga aparte en los chequeos) y la vigencia.

## Certificados médicos

- [ ] Confirmar qué tipos de certificado se emiten (escolar, laboral, deportivo), sus requisitos y si hay formatos de escuelas o empresas que deban aceptarse.

## Aviso de privacidad

- [ ] El texto de `/aviso-de-privacidad` es una **plantilla genérica**. Debe sustituirse por el aviso que redacte el cliente con su asesor legal, conforme a la **ley de protección de datos personales vigente** (datos de salud = datos sensibles).
- [ ] Definir el responsable, el medio para ejercer derechos y el tratamiento de datos recibidos por WhatsApp.

## Pagos y facturación

- [ ] Formas de pago reales (efectivo, tarjeta, transferencia) y si se emiten facturas (CFDI) y en qué plazo.
- [ ] Confirmar la redacción sobre seguros: el sitio dice que no hay convenio directo y que el paciente gestiona su reembolso con su aseguradora.

## Urgencias

- [ ] Confirmar el aviso: "Este consultorio no es servicio de urgencias. En una urgencia médica llama al 911." Hoy aparece en Tu primera consulta, Ubicación y en las preguntas frecuentes.

## Datos de contacto y operación

- [ ] Dirección, teléfono y número de WhatsApp reales (`src/config/site.ts`).
- [ ] Horario real (`src/data/hours.ts`), estacionamiento y accesibilidad (`src/data/practice.ts`).
- [ ] Política de cancelación (hoy: avisar con 3 horas de anticipación).
- [ ] Dominio definitivo (`NEXT_PUBLIC_SITE_URL`).
