'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { DEFAULT_LOCALE, type Locale } from './config'
import { getDictionary, type Dictionary } from './dictionaries'

interface LocaleContextValue {
    locale: Locale
    dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: DEFAULT_LOCALE,
    dictionary: getDictionary(DEFAULT_LOCALE),
})

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
    return (
        <LocaleContext.Provider value={{ locale, dictionary: getDictionary(locale) }}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useLocale(): Locale {
    return useContext(LocaleContext).locale
}

export function useDictionary(): Dictionary {
    return useContext(LocaleContext).dictionary
}
