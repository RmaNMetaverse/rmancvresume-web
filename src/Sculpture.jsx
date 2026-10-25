import React, { useEffect, useRef, useState } from 'react';
import { logoUrl } from './brand';

let geometryPromise;
// Sample the actual PNG's alpha silhouette. Front/back faces and boundary walls
// form an extruded point-cloud solid, including the logo's transparent cutouts.
function loadLogoGeometry() {
  if (geometryPromise) return geometryPromise;
  geometryPromise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const size = 88;
        const mask = document.createElement('canvas');
        mask.width = mask.height = size;
        const context = mask.getContext('2d', { willReadFrequently: true });
        if (!context) throw new Error('Canvas unavailable');
        context.drawImage(image, 0, 0, size, size);
        const pixels = context.getImageData(0, 0, size, size).data;
        const filled = (x, y) => x >= 0 && y >= 0 && x < size && y < size && pixels[(y * size + x) * 4 + 3] > 128;
        const points = [];
        for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
          if (!filled(x, y)) continue;
          const px = ((x + .5) / size - .5) * 2;
          const py = ((y + .5) / size - .5) * 2;
          points.push({ x: px, y: py, z: -1, wall: false }, { x: px, y: py, z: 1, wall: false });
          if (!filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1)) {
            for (let layer = 1; layer < 9; layer++) points.push({ x: px, y: py, z: -1 + layer / 4.5, wall: true });
          }
        }
        if (!points.length) throw new Error('Empty logo mask');
        resolve(points);
      } catch (error) { reject(error); }
    };
    image.onerror = () => reject(new Error('Logo could not be loaded'));
    image.src = logoUrl;
  });
  return geometryPromise;
}

export default function Sculpture({ paused, mode, onShift }) {
  const ref = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const rotation = useRef(.32);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame, visible = true, disposed = false, width = 0, height = 0;
    let geometry = null, previousTime = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    function draw() {
      if (!geometry || !width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const angle = rotation.current + pointer.current.x * .35;
      const tilt = -.12 + pointer.current.y * .25;
      const scale = Math.min(width, height) * .36;
      const extrusion = [.15, .3, .22][mode];
      const sin = Math.sin(angle), cos = Math.cos(angle);
      const sinTilt = Math.sin(tilt), cosTilt = Math.cos(tilt);
      const points = geometry.map(p => {
        const z = p.z * extrusion;
        const x = p.x * cos + z * sin;
        const depthBeforeTilt = -p.x * sin + z * cos;
        const y = p.y * cosTilt - depthBeforeTilt * sinTilt;
        const depth = p.y * sinTilt + depthBeforeTilt * cosTilt;
        const perspective = 4.5 / (4.5 - depth);
        return { x: width / 2 + x * scale * perspective, y: height / 2 + y * scale * perspective, depth, wall: p.wall };
      }).sort((a, b) => a.depth - b.depth);
      for (const p of points) {
        const light = Math.max(0, Math.min(1, (p.depth + 1.3) / 2.6));
        const alpha = (p.wall ? .32 : .18) + light * .66;
        ctx.fillStyle = mode === 2 ? `rgba(187,166,255,${alpha})` : `rgba(205,246,117,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.wall ? .58 : .48) + light * .52, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    });
    function animate(time) {
      const delta = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      if (visible && !document.hidden && !paused && !reduced.matches) {
        rotation.current += delta * .00018;
        draw();
      }
      frame = requestAnimationFrame(animate);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(canvas); resize.observe(canvas);
    loadLogoGeometry().then(points => {
      if (disposed) return;
      geometry = points; draw(); setReady(true);
    }).catch(() => { if (!disposed) setReady(false); });
    frame = requestAnimationFrame(animate);
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); };
  }, [paused, mode]);
  return <>
    {!ready && <img className="sculpture-fallback" src={logoUrl} alt="RmaN logo" />}
    <canvas ref={ref} role="img" aria-label="Rotating 3D RmaN logo, extruded from its original silhouette and rendered in particles. Use the numbered buttons below to change its depth and color." onPointerMove={e => {
      const r = e.currentTarget.getBoundingClientRect();
      pointer.current = { x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 };
    }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }} onClick={onShift} />
  </>;
}
