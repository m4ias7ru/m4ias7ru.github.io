import React, { useEffect, useRef } from 'react';
import 'asciinema-player/dist/bundle/asciinema-player.css';

const AsciinemaPlayer = ({ src, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    let playerInstance = null;
    let observer = null;

    // 1. Dynamic import
    import('asciinema-player').then((player) => {
      if (!currentRef) return;

      // 2. Create player instance
      playerInstance = player.create(src, currentRef, {
        autoPlay: false, // Disable default autoplay; we handle it via scroll
        loop: true,      // Enable looping
        preload: true,   // Needed so it's ready to play instantly
        ...props,
      });

      // 3. Create IntersectionObserver to toggle play/pause on scroll
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            playerInstance.play();
          } else {
            playerInstance.pause();
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the player is visible
      );

      // 4. Start observing
      observer.observe(currentRef);
    });

    // 5. Cleanup
    return () => {
      if (observer) observer.disconnect();
      if (playerInstance && typeof playerInstance.dispose === 'function') {
        playerInstance.dispose();
      }
    };
  }, [src, props]);

  return <div ref={ref} />;
};

export default AsciinemaPlayer;