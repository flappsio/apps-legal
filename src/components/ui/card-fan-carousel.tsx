"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./card-fan-carousel.css";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  description?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
  onSelect?: (card: CardItem) => void;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
}

export default function SocialCards({ cards, onSelect, label = "Screenshots", previousLabel = "Previous", nextLabel = "Next" }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(Math.min(3, Math.floor(cards.length / 2)));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = cards.length;
  const center = total ? centerIndex % total : 0;
  const visibleCount = Math.min(total, 7);
  const half = Math.floor(visibleCount / 2);
  const slots = cards.map((_, index) => total > 7
    ? (index - center + half + total) % total
    : index);
  const slotsKey = slots.join(",");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !total) return;
    const elements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let hovered: number | null = null;
    const currentSlots = slotsKey.split(",").map(Number);

    const layout = (instant = false) => {
      const width = container.clientWidth;
      const cardWidth = elements[0].offsetWidth;
      const spread = Math.max(0, (width - cardWidth * 1.3) / 2);
      const midpoint = (visibleCount - 1) / 2;
      elements.forEach((element, index) => {
        const slot = currentSlots[index];
        const visible = slot < visibleCount;
        const distance = midpoint ? (slot - midpoint) / midpoint : 0;
        const focused = hovered === index;
        const hoveredSlot = hovered === null ? null : currentSlots[hovered];
        const push = hoveredSlot === null || focused ? 0 : Math.sign(slot - hoveredSlot) * Math.min(width * 0.035, 32);
        const target = {
          x: distance * spread + push,
          y: Math.abs(distance) ** 2 * cardWidth * 0.28 - (focused ? 24 : 0),
          rotation: distance * 21,
          scale: (1 - 0.2244 * Math.abs(distance) ** 2) * (focused ? 1.06 : 1),
          opacity: visible ? 1 : 0,
          duration: instant || reduced.matches ? 0 : 0.5,
          ease: "power3.out",
          overwrite: true,
        };
        gsap.set(element, { zIndex: focused ? 20 : 10 - Math.ceil(Math.abs(slot - midpoint)), pointerEvents: visible ? "auto" : "none" });
        gsap.to(element, target);
      });
    };
    const handlers = elements.map((element, index) => {
      const enter = () => { if (finePointer.matches) { hovered = index; layout(); } };
      const focus = () => { hovered = index; layout(true); };
      const blur = () => { hovered = null; layout(true); };
      element.addEventListener("mouseenter", enter);
      element.addEventListener("focus", focus);
      element.addEventListener("blur", blur);
      return { element, enter, focus, blur };
    });
    const leave = () => { hovered = null; layout(); };
    const resize = new ResizeObserver(() => layout(true));
    const preferenceChange = () => layout(true);
    resize.observe(container);
    container.addEventListener("mouseleave", leave);
    reduced.addEventListener("change", preferenceChange);
    layout();
    return () => {
      resize.disconnect();
      reduced.removeEventListener("change", preferenceChange);
      container.removeEventListener("mouseleave", leave);
      handlers.forEach(({ element, enter, focus, blur }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("focus", focus);
        element.removeEventListener("blur", blur);
      });
      gsap.killTweensOf(elements);
    };
  }, [slotsKey, total, visibleCount, cards.map((c) => c.imgUrl).join(",")]);

  if (!total) return null;

  const cycle = (direction: number) => {
    setCenterIndex((previous) => (previous + direction + total) % total);
    setActiveIndex(null);
  };

  return (
    <section className="card-fan" aria-label={label} aria-roledescription="carousel">
      <div ref={containerRef} className="fan-layout">
        {cards.map((card, index) => {
          const hidden = slots[index] >= visibleCount;
          const content = <img src={card.imgUrl} alt={card.alt || `${label} ${index + 1}`} loading="lazy" draggable={false} />;
          const props = {
            className: "fan-card",
            "aria-hidden": hidden,
            tabIndex: hidden ? -1 : 0,
            onMouseEnter: () => setActiveIndex(index),
            onMouseLeave: () => setActiveIndex(null),
            onFocus: (event: React.FocusEvent<HTMLElement>) => {
              if (event.currentTarget.matches(":focus-visible")) setActiveIndex(index);
            },
            onBlur: () => setActiveIndex(null),
          };
          return card.linkUrl ? (
            <a {...props} key={card.imgUrl} href={card.linkUrl} target={card.linkUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{content}</a>
          ) : (
            <button {...props} key={card.imgUrl} type="button" onClick={() => onSelect?.(card)}>{content}</button>
          );
        })}
      </div>
      {total > 7 && (
        <div className="flex items-center justify-center gap-4 relative z-30">
          <button type="button" className="fan-arrow" onClick={() => cycle(-1)} aria-label={previousLabel}><ChevronLeft size={20} /></button>
          <div className="flex items-center gap-1">
            {cards.map((card, index) => (
              <button key={card.imgUrl} type="button" aria-label={card.alt || `${label} ${index + 1}`} aria-current={index === center ? "true" : undefined} className="flex h-8 w-5 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" onClick={() => { setCenterIndex(index); setActiveIndex(null); }}>
                <span className={`h-1.5 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none ${index === center ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
              </button>
            ))}
          </div>
          <button type="button" className="fan-arrow" onClick={() => cycle(1)} aria-label={nextLabel}><ChevronRight size={20} /></button>
        </div>
      )}
      <p className="mt-3 min-h-10 px-4 text-center text-xs leading-5 text-muted-foreground" aria-live="polite" aria-atomic="true">
        {activeIndex === null ? cards[center]?.alt : cards[activeIndex]?.description || cards[activeIndex]?.alt}
      </p>
    </section>
  );
}
