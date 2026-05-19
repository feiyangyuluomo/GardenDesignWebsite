'use client'

import { useState } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterChipsProps {
  title: string
  options: FilterOption[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function FilterChips({ title, options, selected, onChange }: FilterChipsProps) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(s => s !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-stone">{title}</span>
        {selected.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-forest hover:text-forest-light transition-colors duration-300"
          >
            清除全部
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <button
              key={option.value}
              onClick={() => handleToggle(option.value)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                isSelected
                  ? 'bg-forest text-cream-warm'
                  : 'bg-cream border border-sage-light text-charcoal hover:border-forest hover:text-forest'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
