'use client'

import { useState } from 'react'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  children: (activeTab: string) => React.ReactNode
}

export default function Tabs({ tabs, defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className="space-y-6">
      {/* Tab Headers */}
      <div className="flex gap-2 border-b border-kalai-beige">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-kalai-sage'
                : 'text-kalai-brown/60 hover:text-kalai-brown'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-kalai-sage" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{children(activeTab)}</div>
    </div>
  )
}
