"use client";

import { useState, FormEvent } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface FormErrors {
  nom?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(form: HTMLFormElement): FormErrors {
    const data = new FormData(form);
    const errs: FormErrors = {};
    if (!String(data.get("nom") ?? "").trim()) {
      errs.nom = "Veuillez saisir votre nom et prénom.";
    }
    const email = String(data.get("email") ?? "").trim();
    if (!email) {
      errs.email = "Veuillez saisir votre adresse email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Veuillez saisir une adresse email valide.";
    }
    if (!String(data.get("message") ?? "").trim()) {
      errs.message = "Veuillez saisir votre message.";
    }
    return errs;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    // Simulation d'envoi (pas de backend dans ce prototype)
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  }

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />

      <h1 className="mb-8 text-3xl font-bold text-gray-900">Contact</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* ── Formulaire ─────────────────────────────────────────────── */}
        <section aria-labelledby="formulaire-titre">
          <h2 id="formulaire-titre" className="mb-4 text-xl font-semibold text-gray-800">
            Envoyer un message
          </h2>

          {status === "success" ? (
            <div
              role="alert"
              className="rounded-xl border border-primary-100 bg-primary-100 p-6 text-primary"
            >
              <p className="font-semibold">Message envoyé !</p>
              <p className="mt-1 text-sm">Nous vous répondrons dans les meilleurs délais.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 rounded text-sm underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="nom" className="mb-1 block text-sm font-medium text-gray-700">
                  Nom et prénom <span aria-hidden="true">*</span>
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={errors.nom ? true : undefined}
                  aria-describedby={errors.nom ? "nom-error" : undefined}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.nom && (
                  <p id="nom-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.nom}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Adresse email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="sujet" className="mb-1 block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choisir un sujet</option>
                  <option value="demande-info">Demande d&apos;information</option>
                  <option value="etat-civil">État civil</option>
                  <option value="urbanisme">Urbanisme</option>
                  <option value="voirie">Voirie et espaces publics</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  aria-required="true"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-500">
                <span aria-hidden="true">*</span> Champs obligatoires
              </p>

              <Button type="submit" loading={status === "submitting"} variant="primary" size="lg">
                Envoyer le message
              </Button>
            </form>
          )}
        </section>

        {/* ── Coordonnées & Horaires ─────────────────────────────────── */}
        <aside>
          {/* Coordonnées */}
          <section aria-labelledby="coordonnees-titre" className="mb-8">
            <h2 id="coordonnees-titre" className="mb-4 text-xl font-semibold text-gray-800">
              Coordonnées
            </h2>
            <address className="space-y-2 text-sm not-italic text-gray-700">
              <p className="font-medium text-gray-900">Mairie de La Saulsotte</p>
              <p>
                Place de la Mairie
                <br />
                10150 La Saulsotte
              </p>
              <p>
                Tél. :{" "}
                <a
                  href="tel:+33325700000"
                  className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {/* TODO: vérifier numéro réel de la mairie de La Saulsotte */}
                  03 25 70 00 00
                </a>
              </p>
              <p>
                Email :{" "}
                <a
                  href="mailto:mairie@lasaulsotte.fr"
                  className="rounded text-primary underline hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {/* TODO: confirmer l'adresse email officielle */}
                  mairie@lasaulsotte.fr
                </a>
              </p>
            </address>
          </section>

          {/* Horaires */}
          <section id="horaires" aria-labelledby="horaires-titre" className="mb-8">
            <h2 id="horaires-titre" className="mb-4 text-xl font-semibold text-gray-800">
              Horaires d&apos;ouverture
            </h2>
            <dl className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="font-medium">Lundi – Vendredi</dt>
                <dd>9h00 – 12h00</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                <dt className="font-medium">Lundi &amp; Mercredi</dt>
                <dd>14h00 – 17h00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium">Samedi &amp; Dimanche</dt>
                <dd className="text-gray-500">Fermé</dd>
              </div>
            </dl>
          </section>

          {/* Plan d'accès */}
          <section aria-labelledby="acces-titre">
            <h2 id="acces-titre" className="mb-4 text-xl font-semibold text-gray-800">
              Plan d&apos;accès
            </h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <iframe
                title="Carte OpenStreetMap — Mairie de La Saulsotte"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.5520%2C48.3550%2C3.5720%2C48.3650&amp;layer=mapnik&amp;marker=48.3600%2C3.5620"
                width="100%"
                height="260"
                loading="lazy"
                className="block"
                aria-label="Carte de localisation de la mairie de La Saulsotte"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              <a
                href="https://www.openstreetmap.org/?mlat=48.36&mlon=3.562#map=15/48.36/3.562"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Voir en plein écran sur OpenStreetMap
                <span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
              </a>
            </p>
          </section>
        </aside>
      </div>
    </PageLayout>
  );
}
