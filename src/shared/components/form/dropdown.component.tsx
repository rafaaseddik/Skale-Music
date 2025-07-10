'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ifClass } from "@/shared/utils/react-dom-utils";

export type DropdownOption<T extends string = string> = {
  value: T;
  label: string;
};
interface DropdownProps<T extends string = string> {
    options: DropdownOption<T>[];
    selected: DropdownOption<T>;
    onSelect: (value: DropdownOption<T>) => void;
    className?: string;
    prefix?: string;
    postfix?: string;
    label?: string;
}

export default function Dropdown({ options, selected, onSelect, className, prefix, postfix, label }: DropdownProps) {
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
      <div className={`dropdown relative inline-block text-left ${className}`} ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
          >
              {label && <span className="dropdown-label">{label}:</span>}
              <span>{[prefix,selected.label,postfix].filter(Boolean).join(" ")}</span>
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
                        className={` ${ifClass(selected.value === option.value,'active')}`}
                        onClick={() => {
                            onSelect(option);
                            setIsOpen(false);
                        }}
                      >
                          {[prefix,option.label,postfix].filter(Boolean).join(" ")}
                      </li>
                    ))}
                </motion.ul>
              )}
          </AnimatePresence>
      </div>
    );
};

