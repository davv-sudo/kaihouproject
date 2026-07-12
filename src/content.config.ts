import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Miembros del equipo — repetible, un archivo .yaml por persona, por idioma
const team = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/team" }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      rol: z.string(),
      foto: image().optional(),
    }),
});

// Logos de proyectos ayudados — repetible, un archivo .yaml por proyecto, por idioma
const partners = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/partners" }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      logo: image().optional(),
      url: z.string().url(),
    }),
});

// Blog — repetible, un archivo .md por post, por idioma
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

// Páginas singleton — descripción del proyecto (md) y contacto (yaml)
const pages = defineCollection({
  loader: glob({
    pattern: "*.{md,yaml}",
    base: "./src/content/pages",
    generateId: ({ entry }) => entry.replace(/\.(md|yaml)$/, ""),
  }),
  schema: z.object({
    email: z.string().email().optional(),
    chat: z.string().optional(),
    intro: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    title: z.string().optional(),
  }),
});


// Servicios — repetible, un archivo .yaml por servicio, por idioma
const services = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/services" }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/faq" }),
  schema: z.object({
    pregunta: z.string(),
    respuesta: z.string(),
  }),
});

export const collections = { team, partners, blog, pages, services, faq };
