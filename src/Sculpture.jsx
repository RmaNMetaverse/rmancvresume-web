import React, { useEffect, useRef, useState } from 'react';
import { logoUrl } from './brand';

let geometryPromise;
function loadGeometry() {
  if (geometryPromise) return geometryPromise;
  geometryPromise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const size = 64;
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
          points.push([px, py, -.3, 0], [px, py, .3, 0]);
          if (!filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1)) {
            for (let layer = 1; layer < 5; layer++) points.push([px, py, -.3 + layer * .12, 1]);
          }
        }
        if (!points.length) throw new Error('Empty logo mask');
        resolve(points);
      } catch (error) { reject(error); }
    };
    image.onerror = () => reject(new Error('Logo could not be loaded'));
    image.src = logoUrl;
  }).catch(error => { geometryPromise = null; throw error; });
  return geometryPromise;
}

export default function Sculpture({ paused }) {
  const ref = useRef(null);
  const rotation = useRef({ x: -.12, y: .32 });
  const drag = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    let frame = 0, visible = false, disposed = false, width = 0, height = 0, geometry;
    let previousTime = 0, lastDraw = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(pointer: coarse)').matches;
    const interval = 1000 / (mobile ? 24 : 30);
    function draw() {
      if (!geometry || !width || !height) return;
      ctx.fillStyle = '#171b14';
      ctx.fillRect(0, 0, width, height);
      const { x: tilt, y: angle } = rotation.current;
      const sin = Math.sin(angle), cos = Math.cos(angle);
      const sinTilt = Math.sin(tilt), cosTilt = Math.cos(tilt);
      const scale = Math.min(width, height) * .36;
      const bands = [[], [], [], []];
      for (const [px, py, z, wall] of geometry) {
        const rx = px * cos + z * sin;
        const rz = -px * sin + z * cos;
        const ry = py * cosTilt - rz * sinTilt;
        const depth = py * sinTilt + rz * cosTilt;
        const perspective = 4.5 / (4.5 - depth);
        const band = Math.max(0, Math.min(3, Math.floor((depth + 1.2) / 2.4 * 4)));
        bands[band].push([width / 2 + rx * scale * perspective, height / 2 + ry * scale * perspective, wall]);
      }
      const colors = ['#6f8642', '#92b25a', '#b7da78', '#d2f69b'];
      bands.forEach((points, index) => {
        ctx.fillStyle = colors[index];
        for (const [x, y, wall] of points) ctx.fillRect(x, y, wall ? 1.6 : 1.3, wall ? 1.6 : 1.3);
      });
    }
    function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; previousTime = 0; }
    function tick(time) {
      frame = 0;
      if (!visible || document.hidden || paused || reduced.matches || drag.current) return;
      if (time - lastDraw >= interval) {
        rotation.current.y += Math.min(previousTime ? time - previousTime : 0, 50) * .00018;
        draw(); lastDraw = time;
      }
      previousTime = time;
      frame = requestAnimationFrame(tick);
    }
    function start() {
      if (visible && !document.hidden && !paused && !reduced.matches && !drag.current && !frame) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { draw(); start(); } else stop(); });
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    });
    const onVisibility = () => { if (document.hidden) stop(); else { draw(); start(); } };
    const onMotion = () => { draw(); if (reduced.matches) stop(); else start(); };
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onMotion);
    observer.observe(canvas); resize.observe(canvas);
    loadGeometry().then(points => { if (!disposed) { geometry = points; draw(); setReady(true); } }).catch(() => { if (!disposed) setReady(false); });
    canvas.drawSculpture = draw; canvas.stopSculpture = stop; canvas.startSculpture = start;
    return () => {
      disposed = true; stop(); observer.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onMotion);
      delete canvas.drawSculpture; delete canvas.stopSculpture; delete canvas.startSculpture;
    };
  }, [paused]);
  return <>
    {!ready && <img className="sculpture-fallback" src={logoUrl} alt="RmaN logo" />}
    <canvas ref={ref} role="img" aria-label="Interactive 3D relief of the RmaN logo. Drag with a mouse, touchpad, or finger to rotate it."
      onPointerDown={e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
        e.currentTarget.stopSculpture?.();
      }}
      onPointerMove={e => {
        if (!drag.current || drag.current.id !== e.pointerId) return;
        rotation.current.y += (e.clientX - drag.current.x) * .012;
        rotation.current.x = Math.max(-1.2, Math.min(1.2, rotation.current.x + (e.clientY - drag.current.y) * .012));
        drag.current.x = e.clientX; drag.current.y = e.clientY;
        e.currentTarget.drawSculpture?.();
      }}
      onPointerUp={e => { if (drag.current?.id === e.pointerId) { drag.current = null; e.currentTarget.startSculpture?.(); } }}
      onPointerCancel={e => { if (drag.current?.id === e.pointerId) { drag.current = null; e.currentTarget.startSculpture?.(); } }} />
  </>;
}
