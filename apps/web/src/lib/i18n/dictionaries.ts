import type { Locale } from './config'

// UI text that lives in code rather than Sanity. Page content is translated in
// the Studio; only strings hardcoded in components belong here.
const en = {
    languageSelector: {
        label: 'Language',
    },
    contactForm: {
        sentTitle: 'Message sent!',
        sentBody: "Thanks for reaching out. We'll get back to you as soon as possible.",
        sendAnother: 'Send another message',
        sending: 'Sending…',
        error: 'Something went wrong. Please try again.',
        and: 'and',
    },
    notFound: {
        title: "The page you are looking for can't be found.",
        home: 'Go To Homepage',
        demo: 'View Demo',
    },
    common: {
        loading: 'Loading...',
    },
}

export type Dictionary = typeof en

const fr: Dictionary = {
    languageSelector: {
        label: 'Langue',
    },
    contactForm: {
        sentTitle: 'Message envoyé !',
        sentBody: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.',
        sendAnother: 'Envoyer un autre message',
        sending: 'Envoi…',
        error: 'Une erreur est survenue. Veuillez réessayer.',
        and: 'et',
    },
    notFound: {
        title: 'La page que vous recherchez est introuvable.',
        home: "Retour à l'accueil",
        demo: 'Voir la démo',
    },
    common: {
        loading: 'Chargement...',
    },
}

const es: Dictionary = {
    languageSelector: {
        label: 'Idioma',
    },
    contactForm: {
        sentTitle: '¡Mensaje enviado!',
        sentBody: 'Gracias por escribirnos. Te responderemos lo antes posible.',
        sendAnother: 'Enviar otro mensaje',
        sending: 'Enviando…',
        error: 'Algo salió mal. Inténtalo de nuevo.',
        and: 'y',
    },
    notFound: {
        title: 'No encontramos la página que buscas.',
        home: 'Ir al inicio',
        demo: 'Ver demo',
    },
    common: {
        loading: 'Cargando...',
    },
}

const nl: Dictionary = {
    languageSelector: {
        label: 'Taal',
    },
    contactForm: {
        sentTitle: 'Bericht verzonden!',
        sentBody: 'Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.',
        sendAnother: 'Nog een bericht sturen',
        sending: 'Verzenden…',
        error: 'Er is iets misgegaan. Probeer het opnieuw.',
        and: 'en',
    },
    notFound: {
        title: 'De pagina die je zoekt, kan niet worden gevonden.',
        home: 'Naar de homepage',
        demo: 'Bekijk demo',
    },
    common: {
        loading: 'Laden...',
    },
}

const dictionaries: Record<Locale, Dictionary> = { en, fr, es, nl }

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}
