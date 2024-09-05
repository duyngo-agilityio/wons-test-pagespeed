import clsx from 'clsx';
import { fontSize, colors } from '@/themes';
interface TextProps {
  text: string;
  size?: keyof typeof fontSize | string;
  className?: string;
  as?: keyof React.ReactHTML;
  fontWeight?: string;
  color?: string;
}

interface FontSizeConfig {
  [key: string]: [string, string];
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

  const fontSizeValue = (fontSize as FontSizeConfig)[size]?.[0];

  const lineHeightValue = (fontSize as FontSizeConfig)[size]?.[1];

  const defaultColor = `text-${colors.blue[800]}`;
  const darkModeColor = `text-${colors.white}`;
  const textColor = color || defaultColor;

  return (
    <Component
      className={clsx(textColor, className, `dark:${darkModeColor}`)}
      style={{
        fontSize: fontSizeValue,
        lineHeight: lineHeightValue,
        fontWeight,
      }}
    >
      {text}
    </Component>
  );
};

export default Text;
