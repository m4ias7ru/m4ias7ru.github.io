import React, { useState, useEffect } from 'react';
import styles from './Whoami.module.css';

// Helper function to pause execution
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to "type" out the suffix
const typeSuffix = async (setter, suffix, speed = 80) => {
  const chars = suffix.split('');
  for (let i = 0; i < chars.length; i++) {
    setter(prev => [
      ...prev,
      { char: chars[i], index: prev.length, state: 'typed' }
    ]);
    await sleep(speed);
  }
};

// The main React Component
export default function Whoami() {
  const [topChars, setTopChars] = useState(
    'm4ias7ru'.split('').map((char, index) => ({ char, index, state: 'visible' }))
  );
  const [bottomChars, setBottomChars] = useState(
    'marius'.split('').map((char, index) => ({ char, index, state: 'hidden' }))
  );
  const [showTopLine, setShowTopLine] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  // Maps "m4ias7ru" indexes to "marius" indexes
  const nameMap = [
    { targetIndex: 0, originalIndex: 0 }, // m
    { targetIndex: 1, originalIndex: 3 }, // a
    { targetIndex: 2, originalIndex: 6 }, // r
    { targetIndex: 3, originalIndex: 2 }, // i
    { targetIndex: 4, originalIndex: 7 }, // u
    { targetIndex: 5, originalIndex: 4 }, // s
  ];
  // "Junk" letters to be faded
  const junkIndexes = [1, 5]; // '4' and '7'

  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      if (!isMounted) return;

      const part0_initial = 'm4ias7ru';
      const part1_target = 'marius';
      const part3_type_suffix = '-Alexandru Ulmeanu'; // Contains the space

      while (isMounted) {
        // --- Reset State ---
        setTopChars(part0_initial.split('').map((char, index) => ({ char, index, state: 'visible' })));
        setBottomChars(part1_target.split('').map((char, index) => ({ char, index, state: 'hidden' })));
        setShowTopLine(true);
        setShowCursor(false);
        await sleep(2000); // Initial pause

        // --- Phase 1: "Pull and Drop" Animation ---
        for (const item of nameMap) {
          if (!isMounted) return;
          // 1. Highlight
          setTopChars(prev => prev.map(c => 
            c.index === item.originalIndex ? { ...c, state: 'pulled' } : c
          ));
          await sleep(300);
          // 2. Fall away
          if (!isMounted) return;
          setTopChars(prev => prev.map(c => 
            c.index === item.originalIndex ? { ...c, state: 'hidden' } : c
          ));
          // 3. Drop in
          setBottomChars(prev => prev.map(c => 
            c.index === item.targetIndex ? { ...c, state: 'visible' } : c
          ));
          await sleep(400);
        }
        
        // --- Phase 2: Fade out junk ---
        await sleep(1000); // Pause on "marius"
        if (!isMounted) return;
        setTopChars(prev => prev.map(c => 
          junkIndexes.includes(c.index) ? { ...c, state: 'hidden' } : c
        ));
        await sleep(500);

        // --- Phase 3: Capitalize and Type ---
        setShowTopLine(false); // Fade out top line
        
        // "Glitch" the 'm' to 'M'
        setBottomChars(prev => prev.map((c, i) => 
          i === 0 ? { ...c, state: 'capitalizing' } : c
        ));
        await sleep(100);
        if (!isMounted) return;
        setBottomChars(prev => prev.map((c, i) => 
          i === 0 ? { ...c, char: 'M', state: 'capitalized' } : c
        ));
        await sleep(500); // Pause on "Marius"

        // Show cursor *before* typing
        if (!isMounted) return;
        setShowCursor(true);
        await typeSuffix(setBottomChars, part3_type_suffix, 80);
        
        // --- Phase 4: Loop ---
        await sleep(5000); // Long pause at the end
      }
    };

    runAnimation();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.promptLine}>
        <span className={styles.promptUser}>m4ias7ru@portfolio</span>
        <span className={styles.promptColon}>:</span>
        <span className={styles.promptPath}>~$</span>
        <span className={styles.promptCommand}> whoami</span>
      </div>
      
      <div className={styles.outputSection}>
        <div className={styles.topLine} style={{ opacity: showTopLine ? 1 : 0 }}>
          {topChars.map((item) => {
            let className = styles.topChar;
            if (item.state === 'pulled') className += ` ${styles.pulled}`;
            if (item.state === 'hidden') className += ` ${styles.hidden}`;
            if (junkIndexes.includes(item.index) && item.state === 'visible') className += ` ${styles.junk}`;

            return (
              <span key={item.index} className={className}>
                {item.char}
              </span>
            );
          })}
        </div>
        
        <div className={styles.bottomLine}>
          {bottomChars.map((item) => {
            let className = styles.bottomChar;
            if (item.state === 'visible') className += ` ${styles.visible}`;
            if (item.state === 'capitalizing') className += ` ${styles.capitalizing}`;
            if (item.state === 'capitalized') className += ` ${styles.capitalized}`;
            if (item.state === 'typed') className += ` ${styles.typed}`;
            
            return (
              <span key={item.index} className={className}>
                {item.char}
              </span>
            );
          })}
          
          {showCursor && (
            <span
              className={styles.cursor}
              style={{ animation: 'blink 1.4s infinite' }}>
              _
            </span>
          )}
        </div>
      </div>
    </div>
  );
}