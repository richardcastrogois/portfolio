type TechBadgeProps = {
  name: string;
}

export const TechBadge = ({ name }: TechBadgeProps) => {
  return (
    <span className="text-emerald-200 bg-emerald-900/80 texte-sm py-1 px-3 rounded-lg">
      {name}
    </span>
  );
}