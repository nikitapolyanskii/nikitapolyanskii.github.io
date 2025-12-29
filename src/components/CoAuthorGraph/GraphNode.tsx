"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CoAuthor, Position } from "./types";
import { getAuthorRing } from "./useCoAuthorData";

// Mapping of author names to their photo filenames
const AUTHOR_PHOTOS: Record<string, string> = {
  "Alexey Lebedev": "alexey-lebedev.png",
  "Andreas Lenz": "andreas-lenz.jpg",
  "Andreas Penzkofer": "andreas-penzkofer.jpg",
  "Anna Kuzina": "anna-kuzina.png",
  "Anna Voronina": "anna-voronina.png",
  "Anthony Macula": "anthony-macula.jpg",
  "Antonia Wachter-Zeh": "antonia-wachter-zeh.jpg",
  "Arkady Dyachkov": "arkady-dyachkov.jpg",
  "Can Umut Ileri": "can-umut-ileri.jpg",
  "Christian Deppe": "christian-deppe.jpg",
  "Daniil Goshkoder": "daniil-goshkoder.jpg",
  "Eitan Yaakobi": "eitan-yaakobi.jpg",
  "Georg Maringer": "georg-maringer.jpg",
  "German Svistunov": "german-svistunov.jpg",
  "Grigorii Melnikov": "grigorii-melnikov.jpg",
  "Gökberk Erdoğan": "gokberk-erdogan.jpg",
  "Hans Moog": "hans-moog.jpg",
  "Haodong Yang": "haodong-yang.png",
  "Hedongliang Liu": "hedongliang-liu.jpg",
  "Ilya Vorobyev": "ilya-vorobyev.jpg",
  "Jonas Theis": "jonas-theis.jpg",
  "Julia Volkova": "julia-volkova.png",
  "Kui Cai": "kui-cai.jpg",
  "Lorenz Welter": "lorenz-welter.jpg",
  "Lukas Holzbaur": "lukas-holzbaur.jpg",
  "Mars Davletshin": "mars-davletshin.jpg",
  "Mayank Raikwar": "mayank-raikwar.jpg",
  "Rawad Bitar": "rawad-bitar.jpg",
  "Rina Polyanskaya": "rina-polyanskaya.png",
  "Sebastian Müller": "sebastian-muller.png",
  "Serge Kas Hanna": "serge-kas-hanna.jpg",
  "Sergey Egorov": "sergey-egorov.png",
  "Sven Puchinger": "sven-puchinger.jpg",
  "Vasiliy Usatyuk": "vasiliy-usatyuk.jpg",
  "Venkata Gandikota": "venkata-gandikota.jpg",
  "Vladimir Lebedev": "vladimir-lebedev.png",
  "Vladimir Rykov": "vladimir-rykov.png",
  "Vladislav Shchukin": "vladislav-shchukin.jpg",
  "Wentu Song": "wentu-song.jpg",
  "William Sanders": "william-sanders.jpg",
  "Xuan He": "xuan-he.jpg",
  "Yihan Zhang": "yihan-zhang.jpg",
  "Yonatan Yehezkeally": "yonatan-yehezkeally.jpg",
  "Yury Yanovich": "yury-yanovich.jpg",
  "Zilin Jiang": "zilin-jiang.jpg",
};

interface GraphNodeProps {
  author: CoAuthor;
  position: Position;
  index: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
  onDragStart: () => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd: () => void;
  getSVGCoordinates: (clientX: number, clientY: number) => { x: number; y: number };
}

export default function GraphNode({
  author,
  position,
  index,
  isHovered,
  onHover,
  onDragStart,
  onDrag,
  onDragEnd,
  getSVGCoordinates,
}: GraphNodeProps) {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Handle pointer events for dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const coords = getSVGCoordinates(e.clientX, e.clientY);
    dragStartRef.current = coords;
    hasDraggedRef.current = false;
    setIsDragging(true);
    setIsPressed(true);
    onDragStart();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const coords = getSVGCoordinates(e.clientX, e.clientY);
    // Only count as drag if moved more than 5px (helps with mobile taps)
    const dx = coords.x - dragStartRef.current.x;
    const dy = coords.y - dragStartRef.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasDraggedRef.current = true;
    }
    onDrag(coords.x, coords.y);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);
    setIsPressed(false);
    dragStartRef.current = null;
    onDragEnd();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Don't navigate if we just finished dragging
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    router.push(`/?author=${encodeURIComponent(author.name)}#writings`);
  };

  const ring = getAuthorRing(author.count);
  const photoFile = AUTHOR_PHOTOS[author.name];
  const hasPhoto = !!photoFile;
  const clipId = `clip-${author.name.replace(/\s+/g, "-").toLowerCase()}`;

  // Current animated radius
  const currentRadius = isPressed
    ? author.radius * 0.9
    : isHovered
      ? author.radius * 1.2
      : author.radius;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0, x: position.x, y: position.y }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.02 },
        scale: { duration: 0.5, delay: index * 0.02 },
        x: { type: "tween", duration: 0 },
        y: { type: "tween", duration: 0 },
      }}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onHoverStart={() => !isDragging && onHover(author.name)}
      onHoverEnd={() => onHover(null)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      role="button"
      aria-label={`${author.name}: ${author.count} ${author.count === 1 ? "paper" : "papers"}. Drag to move, click to filter publications.`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {hasPhoto ? (
        <>
          {/* Pattern for photo fill */}
          <defs>
            <pattern
              id={clipId}
              patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={`/photos/coauthors/${photoFile}`}
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          {/* Circle filled with photo pattern */}
          <motion.circle
            cx={0}
            cy={0}
            r={author.radius}
            fill={`url(#${clipId})`}
            stroke="white"
            strokeWidth={isHovered ? 2 : 1}
            animate={{ r: currentRadius }}
            transition={{ duration: 0.15 }}
          />
        </>
      ) : (
        /* Fallback colored circle for authors without photos */
        <motion.circle
          cx={0}
          cy={0}
          r={author.radius}
          className={`
            ${ring === 0 ? "fill-blue-500 dark:fill-teal-400" : ""}
            ${ring === 1 ? "fill-blue-400 dark:fill-teal-500" : ""}
            ${ring === 2 ? "fill-blue-300 dark:fill-teal-600" : ""}
          `}
          stroke="white"
          strokeWidth={isHovered ? 2 : 1}
          animate={{ r: currentRadius }}
          transition={{ duration: 0.15 }}
        />
      )}
    </motion.g>
  );
}
