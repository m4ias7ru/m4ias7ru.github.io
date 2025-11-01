import React from 'react';
import styles from './Tag.module.css';

/*
 * A simple tag component.
 * Usage in MDX: <Tag>Active Directory</Tag>
 * This will automatically render as "#Active Directory"
 */
export default function Tag({children}) {
  return (
    <span className={styles.tag}>
      #{children}
    </span>
  );
}