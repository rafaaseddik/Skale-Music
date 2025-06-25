'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ifClass } from "@/shared/utils/react-dom-utils";

interface DropdownProps {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    className?: string;
}

export default function Dropdown({ options, selected, onSelect, className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown"
          >
              <span>{selected}</span>
              <ChevronDown size={16} />
          </button>
          <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="dropdown-list"
                >
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className={` ${ifClass(selected === option,'active')}`}
                        onClick={() => {
                            onSelect(option);
                            setIsOpen(false);
                        }}
                      >
                          {option}
                      </li>
                    ))}
                </motion.ul>
              )}
          </AnimatePresence>
      </div>
    );
};

