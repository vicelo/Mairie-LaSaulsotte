"use client";

import { useState, FormEvent } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { COMMUNE, HORAIRES, MAIRIE } from "@/lib/commune";

interface FormErrors {
  nom?: string;
  email?: string;
  message?: string;
}

export default function ContactClient() {
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
    const data = new FormData(form);
    const nom = String(data.get("nom") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const sujet = String(data.get("sujet") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const sujetLabel = sujet || "Demande via site mairie";
    const corps = `Nom : ${nom}\nEmail : ${email}\nSujet : ${sujetLabel}\n\n${message}`;
    const mailto = `mailto:${MAIRIE.email}?subject=${encodeURIComponent(sujetLabel)}&body=${encodeURIComponent(corps)}`;
    window.location.href = mailto;
    setStatus("success");
  }

  return (
    <PageLayout>
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />

      <h1 className="mb-8 text-[34px] leading-[1.1] nav:text-[52px]">Contact</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* ── Formulaire ─────────────────────────────────────────────── */}
        <section aria-labelledby="formulaire-titre">
          <h2 id="formulaire-titre" className="mb-4 text-[22px]">
            Envoyer un message
          </h2>

          {status === "success" ? (
            <div role="alert" className="border border-sable bg-sable-clair p-6 text-terre-fonce">
              <p className="font-semibold">Message envoyé !</p>
              <p className="mt-1 text-sm">Nous vous répondrons dans les meilleurs délais.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 rounded text-sm underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="nom" className="mb-1 block text-sm font-medium text-encre-courant">
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
                  className="block w-full rounded-md border border-sable px-3 py-2 text-sm shadow-sm focus:border-foret focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                />
                {errors.nom && (
                  <p id="nom-error" role="alert" className="mt-1 text-xs text-[#A32A1E]">
                    {errors.nom}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-encre-courant"
                >
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
                  className="block w-full rounded-md border border-sable px-3 py-2 text-sm shadow-sm focus:border-foret focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-[#A32A1E]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="sujet"
                  className="mb-1 block text-sm font-medium text-encre-courant"
                >
                  Sujet
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  className="block w-full rounded-md border border-sable px-3 py-2 text-sm shadow-sm focus:border-foret focus:outline-none focus:ring-2 focus:ring-terre-fonce"
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
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-encre-courant"
                >
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
                  className="block w-full rounded-md border border-sable px-3 py-2 text-sm shadow-sm focus:border-foret focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-[#A32A1E]">
                    {errors.message}
                  </p>
                )}
              </div>

              <p className="text-xs text-encre-secondaire">
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
            <h2 id="coordonnees-titre" className="mb-4 text-[22px]">
              Coordonnées
            </h2>
            <address className="space-y-2 text-sm not-italic text-encre-courant">
              <p className="font-medium text-encre">Mairie de {COMMUNE.nom}</p>
              <p>
                {MAIRIE.adresse}
                <br />
                {MAIRIE.codePostal} {MAIRIE.ville}
              </p>
              <p>
                Tél. :{" "}
                <a
                  href={`tel:${MAIRIE.telephoneLien}`}
                  className="rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                >
                  {MAIRIE.telephone}
                </a>
              </p>
              <p>
                Courriel :{" "}
                <a
                  href={`mailto:${MAIRIE.email}`}
                  className="break-all rounded text-terre-fonce underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
                >
                  {MAIRIE.email}
                </a>
              </p>
            </address>
          </section>

          {/* Horaires */}
          <section id="horaires" aria-labelledby="horaires-titre" className="mb-8">
            <h2 id="horaires-titre" className="mb-4 text-[22px]">
              Horaires d&apos;ouverture
            </h2>
            <dl className="space-y-3 text-sm text-encre-courant">
              {HORAIRES.map((creneau) => (
                <div
                  key={creneau.jours}
                  className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-sable-clair pb-2 last:border-b-0"
                >
                  <dt className="font-medium">{creneau.jours}</dt>
                  <dd className="text-right">
                    {creneau.horaire}
                    {creneau.precision && (
                      <span className="block text-xs text-encre-secondaire">
                        {creneau.precision}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-encre-secondaire">
              Fermée les mardi, vendredi et dimanche.
            </p>
          </section>

          {/* Plan d'accès */}
          <section aria-labelledby="acces-titre">
            <h2 id="acces-titre" className="mb-4 text-[22px]">
              Plan d&apos;accès
            </h2>
            <div className="overflow-hidden border border-sable">
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
            <p className="mt-2 text-xs text-encre-secondaire">
              <a
                href="https://www.openstreetmap.org/?mlat=48.36&mlon=3.562#map=15/48.36/3.562"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded underline hover:text-terre-fonce focus:outline-none focus:ring-2 focus:ring-terre-fonce"
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
