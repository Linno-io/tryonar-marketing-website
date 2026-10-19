import type { Locale } from './config'

// UI text that lives in code rather than Sanity. Page content is translated in
// the Studio; only strings hardcoded in components belong here.

export type MakeupCategoryId =
    | 'lipstick' | 'lipliner' | 'eyeshadow' | 'eyeliner' | 'mascara' | 'eyebrows'
    | 'foundation' | 'concealer' | 'contour' | 'bronzer' | 'blush' | 'highlighter'


export type DemoProductId =
    | 'lipstick' | 'lipLiner' | 'eyeliner' | 'eyeShadow' | 'eyebrow'
    | 'foundation' | 'bronzer' | 'blush' | 'highlighter' | 'concealer'

interface DemoProductCopy {
    name: string
    description: string
    features: [string, string, string, string]
}

export interface Dictionary {
    languageSelector: { label: string }
    navigation: { toggleMenu: string; openMenu: string; closeMenu: string; signIn: string; contactUs: string }
    contactForm: { sentTitle: string; sentBody: string; sendAnother: string; sending: string; error: string; and: string }
    notFound: { title: string; home: string; demo: string }
    common: { loading: string; readMore: string; readLess: string; previousPlan: string; nextPlan: string; comingSoon: string; keyFeatures: string }
    demo: {
        before: string
        close: string
        phoneFrame: string
        tryOnYourself: string
        categories: Record<MakeupCategoryId, string>
    }
    makeupOptions: { title: string; close: string }
    productDemo: {
        tryOn: string
        productImageAlt: string
        stats: { conversion: string; fewerReturns: string; accuracy: string }
        products: Record<DemoProductId, DemoProductCopy>
    }
}

const en: Dictionary = {
    languageSelector: { label: 'Language' },
    navigation: { toggleMenu: 'Toggle Menu', openMenu: 'Open Menu', closeMenu: 'Close Menu', signIn: 'Sign In', contactUs: 'Contact Us' },
    contactForm: {
        sentTitle: 'Message sent!',
        sentBody: "Thanks for reaching out. We'll get back to you as soon as possible.",
        sendAnother: 'Send another message',
        sending: 'Sending…',
        error: 'Something went wrong. Please try again.',
        and: 'and',
    },
    notFound: { title: "The page you are looking for can't be found.", home: 'Go To Homepage', demo: 'View Demo' },
    common: { loading: 'Loading...', readMore: 'Read More', readLess: 'Read Less', previousPlan: 'Previous plan', nextPlan: 'Next plan', comingSoon: 'Coming Soon', keyFeatures: 'Key Features' },
    demo: {
        before: 'Before',
        close: 'Close',
        phoneFrame: 'Phone frame',
        tryOnYourself: 'Try on yourself',
        categories: {
            lipstick: 'Lipstick', lipliner: 'Lipliner', eyeshadow: 'Eyeshadow', eyeliner: 'Eyeliner', mascara: 'Mascara',
            eyebrows: 'Eyebrows', foundation: 'Foundation', concealer: 'Concealer', contour: 'Contour', bronzer: 'Bronzer',
            blush: 'Blush', highlighter: 'Highlighter',
        },
    },
    makeupOptions: {
        title: 'Beauty features',
        close: 'Close beauty features',
    },
    productDemo: {
        tryOn: 'Try on',
        productImageAlt: 'Product',
        stats: { conversion: 'Conversion', fewerReturns: 'Fewer returns', accuracy: 'Accuracy' },
        products: {
            lipstick: {
                name: 'Lipstick',
                description: 'Let shoppers try every shade before they buy. No guesswork, no wrong orders, no returns.',
                features: ['Real-time shade on live camera', 'Matte, satin & glossy finish simulation', 'Switch shades instantly', 'Precision lip boundary detection'],
            },
            lipLiner: {
                name: 'Lip Liner',
                description: 'Give customers the perfect pout preview. Define, overline, and blend in real time before a single product ships.',
                features: ['Sub-pixel lip-edge detection', 'Natural over-line simulation', 'Fade & blend shade preview', 'Accurate across all skin tones'],
            },
            eyeliner: {
                name: 'Eyeliner',
                description: 'From everyday to graphic, let shoppers test every liner look on their own eyes — live, with zero commitment.',
                features: ['Real-time lash-line detection', 'Winged, tightline & graphic presets', 'Adapts to any eye shape', 'Sub-millimeter line accuracy'],
            },
            eyeShadow: {
                name: 'Eye Shadow',
                description: 'Turn every palette into an instant try-on experience. Shoppers see full looks on their lids before they add to cart.',
                features: ['Multi-zone lid, crease & brow bone', 'Matte, shimmer & glitter finishes', 'Up to 6 shades simultaneously', 'Natural fade & transition rendering'],
            },
            eyebrow: {
                name: 'Eyebrow',
                description: 'Help customers find their perfect brow shape and shade. AI maps their unique brow structure for a naturally tailored preview.',
                features: ['AI-powered brow shape mapping', 'Natural hair-stroke fill simulation', 'Shape, arch & tail definition', 'Tint shade match for all types'],
            },
            foundation: {
                name: 'Foundation',
                description: "Eliminate shade guessing forever. AI matches each shopper's skin tone and undertone to the exact foundation they need.",
                features: ['AI skin tone match, 40+ shades', 'Light to full coverage simulation', 'Matte, natural & dewy finishes', 'Undertone detection for exact match'],
            },
            bronzer: {
                name: 'Bronzer',
                description: 'Let shoppers sculpt and sun-kiss their look in real time. See exactly how each bronzer lands on their face before buying.',
                features: ['Contour & sun-kissed simulation', 'Cheekbone, temple & nose placement', 'Matte and shimmer bronzer finishes', 'Natural gradient blending'],
            },
            blush: {
                name: 'Blush',
                description: 'From subtle flush to bold drape, shoppers can preview every blush placement and intensity on their own cheeks — instantly.',
                features: ['Real-time cheek flush simulation', 'Cheekbone, nose & draping placement', 'Sheer to intense buildable coverage', 'Works across all skin tones'],
            },
            highlighter: {
                name: 'Highlighter',
                description: 'Give every shopper their glow-up moment. Preview luminosity from barely-there shimmer to full-beam highlight — in real time.',
                features: ['Luminosity on facial high points', "Brow bone, nose bridge & cupid's bow", 'Subtle glow to blinding intensity', 'Shader-based light reflection simulation'],
            },
            concealer: {
                name: 'Concealer',
                description: "Help shoppers find the perfect match with confidence. Simulate coverage and shade blend on their actual skin, not a model's.",
                features: ['Under-eye circle coverage simulation', 'Blemish & redness concealing preview', 'Light to full coverage tones', 'Shade-matching AI for seamless blend'],
            },
        },
    },
}

const fr: Dictionary = {
    languageSelector: { label: 'Langue' },
    navigation: { toggleMenu: 'Afficher le menu', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', signIn: 'Connexion', contactUs: 'Nous contacter' },
    contactForm: {
        sentTitle: 'Message envoyé !',
        sentBody: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.',
        sendAnother: 'Envoyer un autre message',
        sending: 'Envoi…',
        error: 'Une erreur est survenue. Veuillez réessayer.',
        and: 'et',
    },
    notFound: { title: 'La page que vous recherchez est introuvable.', home: "Retour à l'accueil", demo: 'Voir la démo' },
    common: { loading: 'Chargement...', readMore: 'Lire la suite', readLess: 'Réduire', previousPlan: 'Offre précédente', nextPlan: 'Offre suivante', comingSoon: 'Bientôt disponible', keyFeatures: 'Fonctionnalités clés' },
    demo: {
        before: 'Avant',
        close: 'Fermer',
        phoneFrame: 'Cadre de téléphone',
        tryOnYourself: 'Essayez vous-même',
        categories: {
            lipstick: 'Rouge à lèvres', lipliner: 'Crayon à lèvres', eyeshadow: 'Fard à paupières', eyeliner: 'Eye-liner', mascara: 'Mascara',
            eyebrows: 'Sourcils', foundation: 'Fond de teint', concealer: 'Anti-cernes', contour: 'Contouring', bronzer: 'Poudre bronzante',
            blush: 'Blush', highlighter: 'Enlumineur',
        },
    },
    makeupOptions: {
        title: 'Fonctionnalités beauté',
        close: 'Fermer les fonctionnalités beauté',
    },
    productDemo: {
        tryOn: 'Essayer',
        productImageAlt: 'Produit',
        stats: { conversion: 'Conversion', fewerReturns: 'Moins de retours', accuracy: 'Précision' },
        products: {
            lipstick: {
                name: 'Rouge à lèvres',
                description: "Vos clients essaient toutes les teintes avant d'acheter. Pas de hasard, pas d'erreur de commande, pas de retour.",
                features: ['Teinte en temps réel sur la caméra', 'Simulation des finis mat, satiné et brillant', 'Changement de teinte instantané', 'Détection précise du contour des lèvres'],
            },
            lipLiner: {
                name: 'Crayon à lèvres',
                description: "Offrez à vos clients un aperçu parfait de leurs lèvres. Dessiner, redessiner et estomper en temps réel, avant même l'expédition du produit.",
                features: ['Détection du contour des lèvres au sous-pixel', 'Simulation naturelle du contour agrandi', 'Aperçu du dégradé et du fondu', 'Précis sur tous les teints'],
            },
            eyeliner: {
                name: 'Eye-liner',
                description: "Du quotidien au graphique, laissez vos clients tester chaque trait d'eye-liner sur leurs propres yeux, en direct et sans engagement.",
                features: ['Détection de la ligne des cils en temps réel', 'Préréglages étiré, intérieur et graphique', "S'adapte à toutes les formes d'yeux", 'Précision du trait au sous-millimètre'],
            },
            eyeShadow: {
                name: 'Fard à paupières',
                description: "Transformez chaque palette en essayage instantané. Vos clients voient le look complet sur leurs paupières avant de l'ajouter au panier.",
                features: ['Paupière, creux et arcade : plusieurs zones', 'Finis mat, irisé et pailleté', "Jusqu'à 6 teintes simultanées", 'Rendu naturel des dégradés et transitions'],
            },
            eyebrow: {
                name: 'Sourcils',
                description: "Aidez vos clients à trouver la forme et la teinte de sourcils idéales. L'IA cartographie la structure unique de leurs sourcils pour un aperçu naturel et sur mesure.",
                features: ['Cartographie de la forme des sourcils par IA', 'Simulation naturelle poil à poil', "Définition de la forme, de l'arche et de la queue", 'Teinte adaptée à tous les types'],
            },
            foundation: {
                name: 'Fond de teint',
                description: "Fini les erreurs de teinte. L'IA analyse le teint et le sous-ton de chaque client pour trouver le fond de teint qu'il lui faut.",
                features: ['Analyse du teint par IA, plus de 40 teintes', 'Simulation de couvrance légère à totale', 'Finis mat, naturel et lumineux', 'Détection du sous-ton pour une teinte exacte'],
            },
            bronzer: {
                name: 'Poudre bronzante',
                description: "Laissez vos clients sculpter et ensoleiller leur teint en temps réel. Ils voient exactement le rendu de chaque poudre sur leur visage avant d'acheter.",
                features: ['Simulation de contouring et effet bonne mine', 'Placement sur pommettes, tempes et nez', 'Finis bronzants mat et irisé', 'Fondu naturel en dégradé'],
            },
            blush: {
                name: 'Blush',
                description: "Du rose léger au draping intense, vos clients prévisualisent chaque placement et chaque intensité de blush sur leurs propres joues, instantanément.",
                features: ['Simulation du blush en temps réel', 'Placement sur pommettes, nez et draping', 'Couvrance modulable, du voile à l’intense', 'Pour tous les teints'],
            },
            highlighter: {
                name: 'Enlumineur',
                description: "Offrez à chaque client son moment glow. Prévisualisez l'éclat, du léger scintillement à l'illumination intense, en temps réel.",
                features: ['Éclat sur les points hauts du visage', "Arcade, arête du nez et arc de Cupidon", 'Du léger éclat à l’intensité maximale', 'Simulation des reflets de lumière par shaders'],
            },
            concealer: {
                name: 'Anti-cernes',
                description: "Aidez vos clients à trouver la teinte idéale en toute confiance. Simulez la couvrance et le fondu sur leur propre peau, pas sur celle d'un mannequin.",
                features: ['Simulation de la couvrance des cernes', 'Aperçu de la correction des imperfections et rougeurs', 'Teintes de couvrance légère à totale', 'IA de recherche de teinte pour un fondu parfait'],
            },
        },
    },
}

const es: Dictionary = {
    languageSelector: { label: 'Idioma' },
    navigation: { toggleMenu: 'Mostrar menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', signIn: 'Iniciar sesión', contactUs: 'Contáctanos' },
    contactForm: {
        sentTitle: '¡Mensaje enviado!',
        sentBody: 'Gracias por escribirnos. Te responderemos lo antes posible.',
        sendAnother: 'Enviar otro mensaje',
        sending: 'Enviando…',
        error: 'Algo salió mal. Inténtalo de nuevo.',
        and: 'y',
    },
    notFound: { title: 'No encontramos la página que buscas.', home: 'Ir al inicio', demo: 'Ver demo' },
    common: { loading: 'Cargando...', readMore: 'Leer más', readLess: 'Leer menos', previousPlan: 'Plan anterior', nextPlan: 'Plan siguiente', comingSoon: 'Próximamente', keyFeatures: 'Funciones clave' },
    demo: {
        before: 'Antes',
        close: 'Cerrar',
        phoneFrame: 'Marco de teléfono',
        tryOnYourself: 'Pruébatelo',
        categories: {
            lipstick: 'Labial', lipliner: 'Delineador de labios', eyeshadow: 'Sombras', eyeliner: 'Delineador', mascara: 'Máscara de pestañas',
            eyebrows: 'Cejas', foundation: 'Base', concealer: 'Corrector', contour: 'Contorno', bronzer: 'Bronceador',
            blush: 'Rubor', highlighter: 'Iluminador',
        },
    },
    makeupOptions: {
        title: 'Funciones de belleza',
        close: 'Cerrar funciones de belleza',
    },
    productDemo: {
        tryOn: 'Pruébatelo',
        productImageAlt: 'Producto',
        stats: { conversion: 'Conversión', fewerReturns: 'Menos devoluciones', accuracy: 'Precisión' },
        products: {
            lipstick: {
                name: 'Labial',
                description: 'Tus clientes prueban todos los tonos antes de comprar. Sin adivinar, sin pedidos equivocados y sin devoluciones.',
                features: ['Tono en tiempo real con la cámara', 'Simulación de acabados mate, satinado y brillante', 'Cambio de tono al instante', 'Detección precisa del contorno de labios'],
            },
            lipLiner: {
                name: 'Delineador de labios',
                description: 'Ofrece a tus clientes una vista previa perfecta de sus labios. Define, sobredibuja y difumina en tiempo real antes de enviar un solo producto.',
                features: ['Detección del borde de los labios a nivel de subpíxel', 'Simulación natural de labios sobredibujados', 'Vista previa de degradado y difuminado', 'Preciso en todos los tonos de piel'],
            },
            eyeliner: {
                name: 'Delineador',
                description: 'Del día a día al gráfico, tus clientes prueban cada delineado en sus propios ojos, en vivo y sin compromiso.',
                features: ['Detección de la línea de pestañas en tiempo real', 'Ajustes de ala, línea interior y gráfico', 'Se adapta a cualquier forma de ojo', 'Precisión de línea submilimétrica'],
            },
            eyeShadow: {
                name: 'Sombras',
                description: 'Convierte cada paleta en una prueba instantánea. Tus clientes ven el look completo en sus párpados antes de agregarlo al carrito.',
                features: ['Varias zonas: párpado, cuenca y arco de la ceja', 'Acabados mate, shimmer y glitter', 'Hasta 6 tonos a la vez', 'Degradados y transiciones naturales'],
            },
            eyebrow: {
                name: 'Cejas',
                description: 'Ayuda a tus clientes a encontrar la forma y el tono de cejas perfectos. La IA mapea su estructura única para una vista previa natural y a medida.',
                features: ['Mapeo de la forma de las cejas con IA', 'Simulación natural pelo a pelo', 'Definición de forma, arco y cola', 'Tono adaptado a todos los tipos'],
            },
            foundation: {
                name: 'Base',
                description: 'Olvídate para siempre de adivinar el tono. La IA analiza el tono y el subtono de piel de cada cliente para encontrar la base exacta que necesita.',
                features: ['Ajuste de tono de piel con IA, más de 40 tonos', 'Simulación de cobertura ligera a total', 'Acabados mate, natural y luminoso', 'Detección del subtono para un tono exacto'],
            },
            bronzer: {
                name: 'Bronceador',
                description: 'Tus clientes esculpen y broncean su look en tiempo real. Ven exactamente cómo les queda cada bronceador antes de comprar.',
                features: ['Simulación de contorno y efecto bronceado', 'Aplicación en pómulos, sienes y nariz', 'Acabados bronceadores mate y shimmer', 'Difuminado natural en degradado'],
            },
            blush: {
                name: 'Rubor',
                description: 'Del rubor sutil al draping intenso, tus clientes ven al instante cómo les queda cada rubor en sus propias mejillas.',
                features: ['Simulación de rubor en tiempo real', 'Aplicación en pómulos, nariz y draping', 'Cobertura modulable, de ligera a intensa', 'Funciona en todos los tonos de piel'],
            },
            highlighter: {
                name: 'Iluminador',
                description: 'Dale a cada cliente su momento glow. Previsualiza la luminosidad, desde un brillo sutil hasta un iluminado intenso, en tiempo real.',
                features: ['Luminosidad en los puntos altos del rostro', 'Arco de la ceja, puente de la nariz y arco de cupido', 'Del brillo sutil a la máxima intensidad', 'Simulación de reflejos de luz con shaders'],
            },
            concealer: {
                name: 'Corrector',
                description: 'Ayuda a tus clientes a encontrar el tono perfecto sin dudar. Simula la cobertura y el difuminado en su propia piel, no en la de una modelo.',
                features: ['Simulación de cobertura de ojeras', 'Vista previa de corrección de imperfecciones y rojeces', 'Tonos de cobertura ligera a total', 'IA de ajuste de tono para un acabado perfecto'],
            },
        },
    },
}

const nl: Dictionary = {
    languageSelector: { label: 'Taal' },
    navigation: { toggleMenu: 'Menu tonen', openMenu: 'Menu openen', closeMenu: 'Menu sluiten', signIn: 'Inloggen', contactUs: 'Neem contact op' },
    contactForm: {
        sentTitle: 'Bericht verzonden!',
        sentBody: 'Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.',
        sendAnother: 'Nog een bericht sturen',
        sending: 'Verzenden…',
        error: 'Er is iets misgegaan. Probeer het opnieuw.',
        and: 'en',
    },
    notFound: { title: 'De pagina die je zoekt, kan niet worden gevonden.', home: 'Naar de homepage', demo: 'Bekijk demo' },
    common: { loading: 'Laden...', readMore: 'Lees meer', readLess: 'Lees minder', previousPlan: 'Vorig abonnement', nextPlan: 'Volgend abonnement', comingSoon: 'Binnenkort', keyFeatures: 'Belangrijkste functies' },
    demo: {
        before: 'Voor',
        close: 'Sluiten',
        phoneFrame: 'Telefoonframe',
        tryOnYourself: 'Probeer het zelf',
        categories: {
            lipstick: 'Lippenstift', lipliner: 'Lipliner', eyeshadow: 'Oogschaduw', eyeliner: 'Eyeliner', mascara: 'Mascara',
            eyebrows: 'Wenkbrauwen', foundation: 'Foundation', concealer: 'Concealer', contour: 'Contour', bronzer: 'Bronzer',
            blush: 'Blush', highlighter: 'Highlighter',
        },
    },
    makeupOptions: {
        title: 'Beautyfuncties',
        close: 'Beautyfuncties sluiten',
    },
    productDemo: {
        tryOn: 'Probeer het uit',
        productImageAlt: 'Product',
        stats: { conversion: 'Conversie', fewerReturns: 'Minder retouren', accuracy: 'Nauwkeurigheid' },
        products: {
            lipstick: {
                name: 'Lippenstift',
                description: 'Laat klanten elke kleur uitproberen voordat ze kopen. Geen gokwerk, geen verkeerde bestellingen, geen retouren.',
                features: ['Tint in realtime op de live camera', 'Simulatie van matte, satijnen en glanzende finish', 'Direct van tint wisselen', 'Nauwkeurige detectie van de lipcontour'],
            },
            lipLiner: {
                name: 'Lipliner',
                description: 'Geef klanten een perfect voorbeeld van hun lippen. Definiëren, overlinen en blenden in realtime, nog voordat er een product wordt verzonden.',
                features: ['Detectie van de lipcontour op subpixelniveau', 'Natuurlijke overline-simulatie', 'Voorbeeld van verloop en blending', 'Nauwkeurig op alle huidtinten'],
            },
            eyeliner: {
                name: 'Eyeliner',
                description: 'Van alledaags tot grafisch: laat klanten elke eyeliner-look live op hun eigen ogen uitproberen, zonder verplichtingen.',
                features: ['Detectie van de wimperlijn in realtime', 'Presets voor wing, tightline en grafisch', 'Past zich aan elke oogvorm aan', 'Lijnnauwkeurigheid tot op de submillimeter'],
            },
            eyeShadow: {
                name: 'Oogschaduw',
                description: 'Maak van elk palet een directe try-on. Klanten zien de hele look op hun oogleden voordat ze iets in hun winkelwagen leggen.',
                features: ['Meerdere zones: ooglid, plooi en wenkbrauwboog', 'Matte, shimmer- en glitterfinishes', 'Tot 6 tinten tegelijk', 'Natuurlijke overgangen en verlopen'],
            },
            eyebrow: {
                name: 'Wenkbrauwen',
                description: 'Help klanten hun perfecte wenkbrauwvorm en -tint te vinden. AI brengt hun unieke wenkbrauwstructuur in kaart voor een natuurlijk voorbeeld op maat.',
                features: ['AI-mapping van de wenkbrauwvorm', 'Natuurlijke simulatie per haartje', 'Definitie van vorm, boog en staart', 'Tintmatch voor elk type'],
            },
            foundation: {
                name: 'Foundation',
                description: 'Nooit meer gokken naar de juiste tint. AI kijkt naar de huidtint en ondertoon van elke klant en vindt precies de juiste foundation.',
                features: ['AI-huidtintmatch, 40+ tinten', 'Simulatie van lichte tot volledige dekking', 'Matte, natuurlijke en dewy finishes', 'Ondertoondetectie voor een exacte match'],
            },
            bronzer: {
                name: 'Bronzer',
                description: 'Laat klanten hun look live contouren en een zongebruinde gloed geven. Ze zien precies hoe elke bronzer op hun gezicht valt vóór ze kopen.',
                features: ['Simulatie van contour en zongebruinde look', 'Plaatsing op jukbeenderen, slapen en neus', 'Matte en shimmer bronzerfinishes', 'Natuurlijke, vloeiende overgangen'],
            },
            blush: {
                name: 'Blush',
                description: 'Van subtiele blos tot uitgesproken draping: klanten zien meteen hoe elke blush op hun eigen wangen staat.',
                features: ['Simulatie van blos in realtime', 'Plaatsing op jukbeenderen, neus en draping', 'Opbouwbare dekking van licht tot intens', 'Werkt op alle huidtinten'],
            },
            highlighter: {
                name: 'Highlighter',
                description: 'Geef elke klant een glow-up-moment. Bekijk de glans in realtime, van een vleugje shimmer tot een intense highlight.',
                features: ['Glans op de hoogste punten van het gezicht', 'Wenkbrauwboog, neusbrug en cupidoboog', 'Van subtiele glow tot maximale intensiteit', 'Lichtreflectie gesimuleerd met shaders'],
            },
            concealer: {
                name: 'Concealer',
                description: 'Help klanten zonder twijfel de perfecte kleur te vinden. Simuleer dekking en blending op hun eigen huid, niet die van een model.',
                features: ['Simulatie van dekking voor donkere kringen', 'Voorbeeld van het camoufleren van onzuiverheden en roodheid', 'Tinten van lichte tot volledige dekking', 'AI-tintmatching voor een naadloze blend'],
            },
        },
    },
}

const dictionaries: Record<Locale, Dictionary> = { en, fr, es, nl }

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}

/** Localized makeup category name, falling back to the given English label for unknown ids. */
export function makeupCategoryLabel(dictionary: Dictionary, id: string, fallback: string): string {
    const categories: Record<string, string> = dictionary.demo.categories
    return categories[id] ?? fallback
}
