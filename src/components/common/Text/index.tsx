import { fontSize, colors } from '@/themes';

interface TextProps {
  text: string;
  size?: keyof typeof fontSize | string;
  className?: string;
  as?: keyof React.ReactHTML;
  fontWeight?: string;
  color?: string;
}

const Text = ({
  text,
  size = 'md',
  className = '',
  as = 'p',
  fontWeight = 'font-normal',
  color,
}: TextProps) => {
  const Component = as;

  const defaultColor = `text-${colors.blue[800]}`;
  const darkModeColor = `text-${colors.white}`;
  const textColor = color || defaultColor;

  return (
    <Component
      className={`text-${size} ${textColor} ${className} dark:${darkModeColor}`}
      style={{ fontWeight }}
    >
      {text}
    </Component>
  );
};

export default Text;
