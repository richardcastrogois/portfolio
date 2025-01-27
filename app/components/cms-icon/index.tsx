type CMSIconProps = {
  icon: string;
  scale?: number;
  className?: string;
};

export const CMSIcon = ({ icon, scale = 1, className }: CMSIconProps) => {
  return (
    <div
      className={`${className} transition-transform`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center",
        display: "inline-block",
      }}
      dangerouslySetInnerHTML={{
        __html: icon,
      }}
    />
  );
};
