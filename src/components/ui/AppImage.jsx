import React, { useState, useCallback, useMemo, memo } from 'react';

const AppImage = memo(function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false,
    quality = 85,
    placeholder = 'empty',
    blurDataURL,
    fill = false,
    sizes,
    onClick,
    fallbackSrc = '/logo.png',
    loading = 'lazy',
    unoptimized = false,
    ...props
}) {
    const [imageSrc, setImageSrc] = useState(src || fallbackSrc);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const isExternalUrl = useMemo(() => typeof imageSrc === 'string' && imageSrc.startsWith('http'), [imageSrc]);

    useEffect(() => {
        if (!src) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        } else {
            setImageSrc(src);
            setHasError(false);
        }
        setIsLoading(true);
    }, [src, fallbackSrc]);

    const handleError = useCallback(() => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    }, [hasError, imageSrc, fallbackSrc]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setHasError(false);
    }, []);

    const imageClassName = useMemo(() => {
        const classes = [className];
        if (isLoading) classes.push('bg-gray-200');
        if (hasError && imageSrc === fallbackSrc) classes.push('object-contain p-4'); // padding for fallback logo
        if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
        return classes.filter(Boolean).join(' ');
    }, [className, isLoading, onClick, hasError, imageSrc, fallbackSrc]);

    const imageProps = useMemo(() => {
        const baseProps = {
            src: imageSrc,
            alt,
            className: imageClassName,
            onError: handleError,
            onLoad: handleLoad,
            onClick,
        };

        if (priority) {
            baseProps.loading = 'eager';
        } else {
            baseProps.loading = loading;
        }

        return baseProps;
    }, [imageSrc, alt, imageClassName, priority, loading, handleError, handleLoad, onClick]);

    if (fill) {
        return (
            <div className="relative" style={{ width: '100%', height: '100%' }}>
                <img
                    {...imageProps}
                    style={{ width: '100%', height: '100%' }}
                    {...props}
                />
            </div>
        );
    }

    return (
        <img
            {...imageProps}
            width={width || 400}
            height={height || 300}
            {...props}
        />
    );
});

AppImage.displayName = 'AppImage';

export default AppImage;
