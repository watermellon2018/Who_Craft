import React, { useRef, useEffect, useState } from 'react';

interface Offset {
    x: number;
    y: number;
}

interface ImageCanvas {
    imageUrl: string;
}

const ImageCanvas: React.FC<ImageCanvas> = ({imageUrl}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    const [isUrlWorked, setIsUrlWorked] = useState<boolean>(false);
    const [image, setImage] = useState<HTMLImageElement>(new Image());

    useEffect(() => {
        const imageCanvas = new Image();
        imageCanvas.onload = () => {
            setImageDimensions({ width: imageCanvas.width, height: imageCanvas.height });
        };
        imageCanvas.src = imageUrl;
        setImage(imageCanvas);
        setIsUrlWorked(true);


    }, [imageUrl]);


    useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');

            if (!context) return;

            const canvasWidth = canvas?.width || 0;
            const canvasHeight = canvas?.height || 0;
            setImageDimensions({width: image.width, height: image.height});

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(image, offset.x, offset.y, imageDimensions.width * zoom, imageDimensions.height * zoom);

    }, [zoom, offset, isUrlWorked, image, imageDimensions.width, imageDimensions.height]);

    const handlePan = (dx: number, dy: number) => {
        setOffset((prevOffset) => ({
            x: prevOffset.x + dx,
            y: prevOffset.y + dy,
        }));
    };

    const handleZoom = (delta: number) => {
        setZoom((zoom) => Math.max(0.1, zoom - delta / 200)); // Adjust the factor as needed
    };


    return (
        <div>
            <canvas
                ref={canvasRef}
                width={imageDimensions.width * zoom}
                height={imageDimensions.height * zoom}
                style={{ border: '1px solid #ccc', cursor: 'grab'}}
                onWheel={(e) => {
                    handleZoom(e.deltaY);
                }}
                onMouseDown={(e) => {
                    let startX = e.clientX;
                    let startY = e.clientY;

                    const handleMouseMove = (e: MouseEvent) => {
                        const dx = e.clientX - startX;
                        const dy = e.clientY - startY;
                        handlePan(dx, dy);

                        startX = e.clientX;
                        startY = e.clientY;
                    };

                    const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        if (canvasRef.current) {
                            canvasRef.current.style.cursor = 'grab';
                        }
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);

                    if (canvasRef.current) {
                        canvasRef.current.style.cursor = 'grabbing';
                    }
                }}
            />
        </div>
    );
};

export default ImageCanvas;
