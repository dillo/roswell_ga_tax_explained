import type { Metadata, Viewport } from 'next';
import { Manrope, Archivo } from 'next/font/google';
import './globals.css';
const body = Manrope({variable:'--font-body',subsets:['latin']});
const display = Archivo({variable:'--font-display',subsets:['latin']});
export const metadata: Metadata = { title:'Roswell, explained — Your property taxes', description:'A plain-English, visual guide to who taxes your Roswell home, how the math works, and what to do next. Understand the annual tax process and find current official information.' };
export const viewport: Viewport = { width:'device-width', initialScale:1, viewportFit:'cover' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>}
