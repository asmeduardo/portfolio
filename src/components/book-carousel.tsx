"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Book = {
  title: string;
  author: string;
  href: string;
  cover: string;
};

type BookCarouselProps = {
  books: Book[];
};

export function BookCarousel({ books }: BookCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const moveTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || books.length === 0) return;

      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const firstAtEnd = Array.from(track.children).findIndex(
        (child) => (child as HTMLElement).offsetLeft >= maxScroll - 1,
      );
      const lastStartIndex = firstAtEnd < 0 ? books.length - 1 : firstAtEnd;
      const positionCount = lastStartIndex + 1;
      const nextIndex =
        ((index % positionCount) + positionCount) % positionCount;
      const target = track.children.item(nextIndex) as HTMLElement | null;
      if (!target) return;

      track.scrollTo({
        left: target.offsetLeft,
        behavior: reducedMotion ? "instant" : "smooth",
      });
      setActiveIndex(nextIndex);
    },
    [books.length, reducedMotion],
  );

  useEffect(() => {
    const root = rootRef.current;
    root?.setAttribute("data-ready", "true");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        const track = trackRef.current;
        if (track) {
          track.scrollTo({ left: track.scrollLeft, behavior: "instant" });
        }
      }
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => {
      root?.removeAttribute("data-ready");
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (books.length < 2 || paused || hovered || focused || reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        moveTo(activeIndex + 1);
      }
    }, 4500);

    return () => window.clearInterval(timer);
  }, [
    activeIndex,
    books.length,
    focused,
    hovered,
    moveTo,
    paused,
    reducedMotion,
  ]);

  if (books.length === 0) return null;

  return (
    <div
      className="book-carousel"
      ref={rootRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Livros lidos e estudados"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      <div className="book-carousel-heading">
        <div>
          <h3>Lidos e estudados</h3>
          <p>Capas das edições selecionadas; abra um livro para saber mais.</p>
        </div>
        <div className="book-carousel-controls">
          <button
            aria-label="Livro anterior"
            onClick={() => moveTo(activeIndex - 1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          {reducedMotion ? null : (
            <button
              aria-label={paused ? "Retomar rotação" : "Pausar rotação"}
              onClick={() => setPaused((value) => !value)}
              type="button"
            >
              {paused ? (
                <Play aria-hidden="true" size={17} />
              ) : (
                <Pause aria-hidden="true" size={17} />
              )}
            </button>
          )}
          <button
            aria-label="Próximo livro"
            onClick={() => moveTo(activeIndex + 1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
      <div className="book-carousel-track" ref={trackRef} aria-live="off">
        {books.map((book, index) => (
          <div
            className="book-card"
            key={book.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${books.length}: ${book.title}`}
          >
            <a
              href={book.href}
              rel="noreferrer"
              target="_blank"
              aria-label={`Ver ${book.title} na Amazon`}
            >
              <span className="book-cover">
                <Image
                  alt={`Capa do livro ${book.title}`}
                  fill
                  sizes="(max-width: 600px) 190px, 240px"
                  src={book.cover}
                />
              </span>
              <span className="book-card-title">{book.title}</span>
              <span className="book-card-author">{book.author}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
