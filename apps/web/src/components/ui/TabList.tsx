"use client"

import { useState, useRef, useEffect } from "react"

interface TabItem {
  tabLabel: string
  _key: string
}

interface TabListProps {
  tabs: TabItem[]
  defaultActiveKey?: string
  onChange?: (key: string) => void
  className?: string
}

export function TabList({
  tabs,
  defaultActiveKey,
  onChange,
  className = "",
}: TabListProps) {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || tabs[0]?._key
  )

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })

  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeTab = tabRefs.current.get(activeKey)
    if (activeTab && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()

      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      })
    }
  }, [activeKey])

  const handleTabClick = (key: string) => {
    setActiveKey(key)
    onChange?.(key)
  }

  return (
    <div
      ref={containerRef}
      className={
        "relative inline-flex items-center gap-1 rounded-full bg-[#f0f0f0] p-1 md:p-1.5 " +
        className
      }
    >
      {/* Animated indicator */}
      <div
        className="absolute top-1 md:top-1.5 h-[calc(100%-8px)] md:h-[calc(100%-12px)] rounded-full bg-white shadow-sm transition-all duration-300 ease-out"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      {/* Tabs */}
      {tabs.map((tab) => (
        <button
          key={tab._key}
          ref={(el) => {
            if (el) tabRefs.current.set(tab._key, el)
          }}
          onClick={() => handleTabClick(tab._key)}
          className={
            "relative cursor-pointer font-semibold z-10 px-4 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 text-sm md:text-base lg:text-lg font-medium transition-colors duration-300 " +
            (activeKey === tab._key
              ? "text-[#2A2730]"
              : "text-[#838383] hover:text-[#6b7280]")
          }
        >
          {tab.tabLabel}
        </button>
      ))}
    </div>
  )
}
