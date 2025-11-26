// Utility to ensure gradient text is always visible
// Detects if gradient text is invisible and shows fallback

export const ensureGradientTextVisibility = () => {
  // Check all gradient text elements
  const gradientTextElements = document.querySelectorAll(
    '[class*="bg-gradient"][class*="bg-clip-text"]'
  );

  gradientTextElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    
    // Check if element is effectively invisible
    const computedStyle = window.getComputedStyle(htmlElement);
    const textFillColor = computedStyle.webkitTextFillColor;
    const opacity = computedStyle.opacity;
    const visibility = computedStyle.visibility;
    
    // Check if text is invisible
    const isInvisible = 
      (textFillColor === 'transparent' || textFillColor === 'rgba(0, 0, 0, 0)') &&
      (opacity === '0' || visibility === 'hidden');
    
    // Check if the gradient background is actually visible
    const backgroundImage = computedStyle.backgroundImage;
    const hasGradient = backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('gradient');
    
    // If text fill is transparent and gradient is broken, show fallback
    if (textFillColor === 'transparent' || textFillColor === 'rgba(0, 0, 0, 0)') {
      if (!hasGradient || isInvisible) {
        // Gradient is broken - show violet fallback color
        htmlElement.style.webkitTextFillColor = 'hsl(270 100% 50%)';
        htmlElement.style.color = 'hsl(270 100% 50%)';
        htmlElement.style.opacity = '1';
        htmlElement.style.visibility = 'visible';
      } else {
        // Gradient exists but might not be visible - ensure it's visible
        htmlElement.style.webkitTextFillColor = 'transparent';
        htmlElement.style.opacity = '1';
        htmlElement.style.visibility = 'visible';
      }
    }
  });
};

// Enhanced function to handle Dark Reader toggling
const handleDarkReaderToggle = () => {
  // Run immediately
  ensureGradientTextVisibility();
  
  // Run after a short delay to catch any delayed changes
  setTimeout(ensureGradientTextVisibility, 100);
  setTimeout(ensureGradientTextVisibility, 500);
  setTimeout(ensureGradientTextVisibility, 1000);
};

// Run on page load and after a short delay to catch Dark Reader changes
if (typeof window !== 'undefined') {
  window.addEventListener('load', handleDarkReaderToggle);
  
  // Watch for DOM changes (Dark Reader modifies DOM)
  const observer = new MutationObserver(() => {
    handleDarkReaderToggle();
  });
  
  // Start observing when DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    });
  }
  
  // Also check periodically in case Dark Reader applies changes later
  setInterval(ensureGradientTextVisibility, 2000);
  
  // Listen for visibility changes
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      handleDarkReaderToggle();
    }
  });
}

