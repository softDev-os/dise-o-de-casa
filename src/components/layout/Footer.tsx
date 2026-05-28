interface FooterProps {
  text?: string;
}

export function Footer({ text = 'Cotización generada con diseño-de-casa' }: FooterProps) {
  return (
    <footer className="text-center py-4.5 border-t border-border text-[10px] text-muted tracking-[1px]">
      {text}
    </footer>
  );
}
