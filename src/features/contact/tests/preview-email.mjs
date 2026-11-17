import { writeFileSync } from "node:fs";
import { loadModule } from "./load-module.mjs";
const output = process.argv[2];
if (!output) throw new Error("Indica la ruta de salida HTML.");
const { buildContactEmail } = await loadModule("../server/contact.email.ts");
const mail = buildContactEmail({
  name: "Andrea · Ejemplo de consulta",
  email: "visitante@example.com",
  phone: "+56 9 1234 5678",
  course: "Curso de Formación de Guardia de Seguridad",
  message:
    "Hola, me gustaría conocer las próximas fechas del curso y los requisitos de inscripción.\n¿Me pueden orientar sobre la modalidad online mixta y las formas de pago?\nMuchas gracias.",
});
writeFileSync(output, mail.html, "utf8");
console.log("Vista previa generada. No se envió ningún correo.");
