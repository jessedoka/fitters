import React from 'react'
import { ModeToggle } from '@/components/mode-toggle';

export default function Navbar({PageTitle}: {PageTitle: string}) {
    return (
        <nav>
            <div className="flex items-center justify-center md:justify-between pb-9">
                <div className='flex items-center space-x-4'>
                    <h1 className="cursor-pointer font-medium text-3xl rounded-lg px-2 py-1 border border-slate-800">{PageTitle}</h1>
                    <ModeToggle />
                </div>
            </div>
        </nav>
  )
}
