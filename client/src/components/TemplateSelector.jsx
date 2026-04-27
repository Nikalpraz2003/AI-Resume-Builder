import { Layout, Check } from 'lucide-react';
import React, { useState } from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const templates = [
        {
            id : 'classic',
            name: 'Classic',
            preview: 'A clean, traditional resume layout with a focus on readability and structure. '
        },
    {
        id: 'modern',
        name: 'Modern',
        preview: 'A sleek, contemporary design with bold typography and a focus on visual appeal.'
    },
    {
        id: 'minimal-image',
        name: 'Minimal with Image',
        preview: 'A minimalist design that incorporates a profile image for a personal touch.'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        preview: 'Ultra-clean design that puts your content front and center with minimal distractions.'
    },
]
    return (
        <div className='relative'>
            <button onClick={()=> setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600
            bg-gradient-to-br from blue-50 to blue-100 ring-blue-300 hover:ring
            transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} /> <span className='max-sm:hidden'> Template </span>
            </button>
            {isOpen && (
                <div className='absolute top-full w-64 p-3 mt-2 space-y-3 z-10 bg-white
                rounded-md border border-gray-200 shadow-sm'>
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => {
                                onChange(template.id);
                                setIsOpen(false);
                            }}
                            className="relative p-3 border rounded cursor-pointer transition-all border-gray-200"
                        >
                            {selectedTemplate === template.id && (
                                <div className='absolute top-2 right-2'>
                                    {/* <Check className="w-3 h-3 text-white" /> */}
                                </div>
                            )}

                            <div className='space-y-1'>
                                <h4 className='font-medium text-gray-800'>{template.name}</h4>
                                <div className='mt-2 p-2 bg-blue-50 rounded text-xs
                                text-gray-500 italic'>{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TemplateSelector;