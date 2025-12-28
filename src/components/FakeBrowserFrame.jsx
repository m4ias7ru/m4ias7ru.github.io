import React from "react";

export default function FakeBrowserFrame({ url, children }) {
  return (
    <div style={styles.container}>
      {/* Fake browser URL bar */}
      <div style={styles.browserBar}>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, backgroundColor: "#ff5f57" }} />
          <span style={{ ...styles.dot, backgroundColor: "#febc2e" }} />
          <span style={{ ...styles.dot, backgroundColor: "#28c840" }} />
        </div>
        <div style={styles.urlBar}>{url}</div>
      </div>

      {/* Image content */}
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#191d23", // Dark background
    border: "1px solid #2a3443",
    fontFamily: "var(--ifm-font-family-base, system-ui, sans-serif)",
    margin: "1rem 0",
  },
  browserBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "6px 10px",
    backgroundColor: "#2a2a2e",
    position: "sticky",
    top: 0,
    zIndex: 10,
    userSelect: "none",
  },
  dots: {
    display: "flex",
    gap: 8,
    flexShrink: 0,
    marginLeft: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
  },
  urlBar: {
    flex: 1,
    padding: "4px 8px",
    borderRadius: 4,
    backgroundColor: "#191d23",
    color: "var(--ifm-font-color-base)",
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxShadow: "inset 0 0 0 1px #2a3443",
  },
  content: {
    display: "block", // Ensures the image fills the space naturally
    margin: 0, // No padding or margin around the image
  },
};
