import { useState, useEffect } from 'react';
import { resolveImageSrc, DEFAULT_FALLBACK_IMAGE } from '../lib/api';

export default function SafeImage({
  src,
  alt = '',
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  className = '',
  style,
  loading = 'lazy',
  onClick,
  ...props
}) {
  const resolved = resolveImageSrc(src, fallbackSrc);
  const [imgSrc, setImgSrc] = useState(resolved);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(resolveImageSrc(src, fallbackSrc));
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = (e) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={className}
      style={style}
      onClick={onClick}
      {...props}
    />
  );
}
