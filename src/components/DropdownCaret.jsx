import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

const DropdownCaret = () => {
    const [isOpen, setIsOpen] = useState(false)
    const vals = [2, 4, 6]

    return (
        <details className="w-64 border p-2 rounded cursor-pointer" onToggle={(e) => setIsOpen(e.target.open)}>
            <summary><FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ""}`}/></summary>
            <ul>
                {vals?.map((val) => (
                    <li>{val}</li>
                ))}
            </ul>
        </details>
    )
}

export default DropdownCaret