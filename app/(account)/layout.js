import "../globals.css";

export default function LoginLayout({ children }) {
  return (
    <div className="h-full">
      <div className="overlay w-full flex-grow">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
