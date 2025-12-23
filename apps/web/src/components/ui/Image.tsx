import NextImage, { ImageProps as NextImageProps } from 'next/image'

export interface ImageProps extends Omit<NextImageProps, 'src'> {
  src?: string | null
  fallbackSrc?: string
  aspectRatio?: string
}

export default function Image({
  src,
  fallbackSrc = '/placeholder.svg',
  alt,
  aspectRatio = '4 / 5',
  className = '',
  ...props
}: ImageProps) {
  const imageSrc = src || fallbackSrc

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <NextImage
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover"
        {...props}
      />
    </div>
  )
}
