interface LayoutProps {
  children: React.ReactNode;
}

const Laytout = ({ children }: LayoutProps) => {
  return <div className="min-h-screen flex items-center justify-center">{children}</div>;
};
export default Laytout;
