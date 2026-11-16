// Unlike a layout, a template remounts on every navigation, which replays the fade.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
