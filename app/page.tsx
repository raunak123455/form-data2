"use client"

import { useState } from "react"
import ProductForm from "../components/ProductForm"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md mb-8 flex justify-end">
          <Button onClick={toggleDarkMode} variant="outline" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dynamic Product Form</h1>
        <ProductForm />
      </main>
    </div>
  )
}

