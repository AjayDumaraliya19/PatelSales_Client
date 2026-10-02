import React from 'react';

export default function LegalContent({ sections }) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section key={section.title} className="app-card p-5 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm text-gray-600 leading-relaxed mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="mt-3 space-y-2">
              {section.list.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="text-[var(--secondary)] font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
