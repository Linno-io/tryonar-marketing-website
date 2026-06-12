'use client'

import { useState, FormEvent } from 'react'
import Container from '@/components/ui/Container'
import { ContactFormSection as ContactFormSectionType } from '@/lib/types/section'
import { DotBackground } from '../ui'

interface ContactFormSectionProps {
    data: ContactFormSectionType
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" className="w-3 h-3">
        <path d="M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 7.8V1H4.2" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default function ContactFormSection({ data }: ContactFormSectionProps) {
    const {
        nameLabel = 'Name',
        emailLabel = 'Email',
        subjectLabel = 'Subject',
        messageLabel = 'Message',
        messagePlaceholder = 'Describe your issue',
        submitButtonText = 'Submit Now',
        termsText = 'By submitting this form, you agree to our affiliate program',
        termsLinkText = 'Terms of services',
        termsLinkUrl = '#',
        privacyLinkText = 'Privacy & Policy',
        privacyLinkUrl = '#',
    } = data

    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            setStatus(res.ok ? 'success' : 'error')
        } catch {
            setStatus('error')
        }
    }

    const inputClass =
        'w-full h-[50px] border border-[#eae8ee] rounded-lg px-4 text-[#111827] text-sm placeholder:text-[#a6a6a6] focus:outline-none focus:border-[#202020] transition-colors duration-200 bg-white'

    const labelClass = 'text-[#111827] text-sm font-medium leading-none'

    return (
        <section className="tryon-contact-form-section relative w-full bg-white">
            {/* Top-right gradient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[-60px] right-0 w-[28vw] max-w-80 h-[90vw] max-h-175 sm:w-[22vw] sm:h-[75vw]"
                style={{
                    background: 'radial-gradient(ellipse 100% 60% at right center, rgba(196,168,255,0.45) 0%, rgba(220,204,255,0.18) 50%, transparent 75%)',
                }}
            />
            <Container className="p-0 flex">
                <DotBackground
                    dotSize={2}
                    gap={20}
                    color="bg-gray-300"
                    borderColor="border-[#eeedf2]"
                    className="border-y h-auto! max-w-27.5 hidden lg:block"
                />
                <form
                    onSubmit={handleSubmit}
                    className="w-full mx-auto max-w-176 flex flex-col gap-7.5 py-10 px-4 md:px-0 md:py-25"
                >
                    {/* Fields */}
                    <div className="flex flex-col gap-5">
                        {/* Name */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-name" className={labelClass}>
                                {nameLabel}<span className="text-[#ff1d38]">*</span>
                            </label>
                            <input
                                id="cf-name"
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-email" className={labelClass}>
                                {emailLabel}<span className="text-[#ff1d38]">*</span>
                            </label>
                            <input
                                id="cf-email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-subject" className={labelClass}>
                                {subjectLabel}<span className="text-[#ff1d38]">*</span>
                            </label>
                            <input
                                id="cf-subject"
                                name="subject"
                                type="text"
                                required
                                value={form.subject}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="cf-message" className={labelClass}>
                                {messageLabel}<span className="text-[#ff1d38]">*</span>
                            </label>
                            <textarea
                                id="cf-message"
                                name="message"
                                required
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                placeholder={messagePlaceholder}
                                className="w-full border border-[#eae8ee] rounded-[10px] px-5 pt-5 pb-5 text-[#111827] text-sm placeholder:text-[#a6a6a6] focus:outline-none focus:border-[#202020] transition-colors duration-200 bg-white resize-none min-h-[115px]"
                            />
                        </div>
                    </div>

                    {/* Submit + disclaimer */}
                    <div className="flex flex-col gap-5 items-center">
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full px-5 sm:px-9 py-3 sm:py-4.5 bg-[#151515] text-white font-bold text-sm sm:text-[18px] rounded-lg sm:rounded-2xl flex items-center justify-center gap-2.5 shadow-[20px_20px_30px_rgba(59,26,115,0.2)] hover:shadow-[20px_20px_30px_rgba(59,26,115,0)] transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {status === 'loading' ? 'Sending…' : status === 'success' ? 'Sent!' : submitButtonText}
                            {status !== 'loading' && status !== 'success' && <SendIcon />}
                        </button>

                        {status === 'error' && (
                            <p className="text-[#ff1d38] text-xs">Something went wrong. Please try again.</p>
                        )}

                        <p className="text-[12px] text-[#3e3e42] text-center leading-[22px] tracking-[-0.12px]">
                            {termsText}{' '}
                            <a
                                href={termsLinkUrl || '#'}
                                className="font-medium text-[#151515] underline underline-offset-2"
                            >
                                {termsLinkText}
                            </a>
                            {' '}and{' '}
                            <a
                                href={privacyLinkUrl || '#'}
                                className="font-medium text-[#151515] underline underline-offset-2"
                            >
                                {privacyLinkText}
                            </a>
                        </p>
                    </div>
                </form>
                <DotBackground
                    dotSize={2}
                    gap={20}
                    color="bg-gray-300"
                    borderColor="border-[#eeedf2]"
                    className="border-y max-w-27.5 h-auto! hidden lg:block"
                />
            </Container>
        </section>
    )
}
