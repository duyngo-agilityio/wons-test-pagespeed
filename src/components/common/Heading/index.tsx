import { colors, fontSize } from '@/themes';

interface HeadingProps {
  title: string;
  size?: keyof typeof fontSize | string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  fontWeight?: string;
  color?: string;
}

const Heading = ({
  title,
  size = 'md',
  as: Component = 'h2',
  className = '',
  fontWeight = 'font-normal',
  color,
}: HeadingProps) => {
  const ariaLevels: { [key: string]: number } = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };

  const ariaLevel = ariaLevels[Component];

  const defaultColor = `text-${colors.blue[800]}`;
  const darkModeColor = `text-${colors.white}`;
  const textColor = color || defaultColor;

  return (
    <Component
      aria-level={ariaLevel}
      className={`text-${size} ${textColor} ${className} dark:${darkModeColor}`}
      style={{ fontWeight }}
    >
      {title}
    </Component>
  );
};

export default Heading;
