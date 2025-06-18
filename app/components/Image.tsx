interface MarginImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const MarginImage = ({ src, alt, className }: MarginImageProps) => {
  return <img className={className} src={src} alt={alt} />;
};

export default MarginImage;
