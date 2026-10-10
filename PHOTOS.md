# Fotos del sitio

Coloca cada archivo en `public/images/` con el nombre indicado y cualquiera de estas extensiones: `.jpg`, `.jpeg`, `.webp`, `.png` o `.avif`. El componente `<Photo>` lo detecta en el build; mientras no exista, muestra un placeholder plano con la proporción correcta.

## Dirección de arte (todas las fotos)

- Consultorio luminoso, con luz natural de día. Cálido, no hospitalario: madera clara, plantas, textiles suaves; nada de pasillos de hospital ni luz fluorescente.
- El doctor: hombre de unos 40 años, bata blanca sobre ropa casual formal, trato cercano. Gestos reales (escuchar, explicar, señalar un documento), nunca poses de banco de imágenes.
- Una sola sesión fotográfica, con la misma luz y el mismo tratamiento de color en todas. Sin filtros fuertes ni viñetas.
- Pacientes de distintas edades, con ropa cotidiana. Sin batas de paciente ni escenas de dolor.
- Resolución mínima: 2400 px en el lado largo para `hero-doctor` y `doctor-retrato`; 1600 px para las demás.
- Deja aire alrededor del sujeto: las formas recortan esquinas (la forma firma recorta mucho la esquina inferior derecha). El valor `focal` indica qué punto debe quedar visible.

## Reglas de uso

- La forma **firma** solo la lleva la imagen principal de cada pantalla (hero de inicio, retrato en El doctor, cabecera del detalle de servicio). Todo lo demás usa la forma **suave**.
- Una foto nunca se repite dentro de la misma página. Entre páginas solo se repite la foto de un servicio: en su tarjeta (suave) y en la cabecera de su propio detalle (firma).

## Lista (16)

| Archivo | Proporción | Forma | Dónde se usa | Escena | focal |
| --- | --- | --- | --- | --- | --- |
| `hero-doctor` | 4:3 | firma | Inicio, hero | El doctor de pie o sentado en el consultorio, sonriendo de forma natural, con luz de ventana lateral. Espacio libre abajo a la izquierda para el chip de horario. | `60% 30%` |
| `doctor-inicio` | 4:5 | suave | Inicio, sección "Quién te atiende" | El doctor conversa con un paciente mayor sentado frente al escritorio; se ve que escucha. | `50% 35%` |
| `doctor-retrato` | 4:5 | firma | El doctor, cabecera | Retrato de medio cuerpo junto a la ventana, mirada a cámara, expresión tranquila. | `50% 25%` |
| `consultorio-recepcion` | 3:2 | suave | El doctor, "El consultorio" | Recepción con escritorio de madera clara, plantas y luz natural. Sin personas o con la asistente de espaldas. | `50% 50%` |
| `consultorio-consulta` | 3:2 | suave | El doctor, "El consultorio" | Sala de consulta completa: escritorio, mesa de exploración con sábana limpia y ventana amplia. | `50% 50%` |
| `consultorio-detalle` | 3:2 | suave | El doctor, "El consultorio" | Detalle: estetoscopio y libreta sobre el escritorio, fondo desenfocado cálido. | `50% 50%` |
| `consultorio-entrada` | 3:2 | suave | Ubicación y contacto | Fachada y entrada a nivel de calle, con la rampa visible y el número del local. | `50% 60%` |
| `consultorio-sala-espera` | 3:2 | suave | Ubicación y contacto | Sala de espera con sillas cómodas, plantas y luz natural. | `50% 50%` |
| `primera-consulta` | 3:2 | suave | Tu primera consulta, cabecera | Una paciente llega a recepción y entrega una carpeta con estudios previos. | `50% 45%` |
| `servicio-consulta-general` | 4:3 | suave en tarjetas, firma en su detalle | Tarjetas (Inicio, Servicios, relacionados) y cabecera de su detalle | El doctor conversa con una paciente sentada frente al escritorio. | `50% 40%` |
| `servicio-seguimiento-cronico` | 4:3 | suave / firma | Ídem | Toma de presión arterial en el brazo de un paciente adulto; el doctor explica la lectura. | `50% 50%` |
| `servicio-certificado-medico` | 4:3 | suave / firma | Ídem | Manos del doctor firmando un certificado sobre el escritorio. | `50% 55%` |
| `servicio-curaciones-menores` | 4:3 | suave / firma | Ídem | Material de curación estéril ordenado sobre una charola; sin heridas visibles. | `50% 50%` |
| `servicio-chequeo-basico` | 4:3 | suave / firma | Ídem | Tubos de muestra rotulados y una orden de estudios sobre una mesa clara. | `50% 50%` |
| `servicio-chequeo-completo` | 4:3 | suave / firma | Ídem | El doctor revisa resultados impresos junto con un paciente de unos 50 años. | `50% 45%` |
| `servicio-chequeo-escolar-deportivo` | 4:3 | suave / firma | Ídem | Un niño con uniforme deportivo en la mesa de exploración, acompañado por su mamá. | `50% 40%` |

Los textos alternativos (`alt`) y los `focal` viven en `src/data/photos.ts` y `src/data/services.ts`; actualízalos si la escena real cambia.
